import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
import config from "../config";

/**
 * Messages server-state, owned by RTK Query — REST + realtime in one place.
 *
 * - getConversation: initial load of a conversation (REST).
 * - sendMessage: POST; the saved message is pushed into the sender's
 *   conversation cache (so the sender sees it immediately).
 * - getMessageStream: holds the single per-user WebSocket open via
 *   onCacheEntryAdded. Inbound messages are pushed straight into the relevant
 *   getConversation cache entry — no refetch, no separate socket state/context.
 *
 * This replaces the message slices' server state AND WebSocketContext.
 */

const toMessage = (m) => ({
  id: m.id,
  sender: m.sender,
  recipient: m.recipient ?? m.receiver,
  msg: m.msg,
  timestamp: m.timestamp,
});

const byTime = (a, b) => new Date(a.timestamp) - new Date(b.timestamp);

export const messagesApi = createApi({
  reducerPath: "messagesApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Message"],
  endpoints: (build) => ({
    getConversation: build.query({
      query: ({ sender, receiver }) => ({
        url: `/messages/${sender}/to/${receiver}`,
      }),
      transformResponse: (response) => response.map(toMessage).sort(byTime),
      providesTags: (result, error, { sender, receiver }) => [
        { type: "Message", id: `${sender}:${receiver}` },
      ],
    }),

    sendMessage: build.mutation({
      query: ({ sendTo, message }) => ({
        url: `/messages/${sendTo}`,
        method: "post",
        data: message,
      }),
      // Push the sent message into the sender's view of the conversation.
      async onQueryStarted({ sendTo, message }, { dispatch, queryFulfilled }) {
        try {
          const { data: saved } = await queryFulfilled;
          const normalized = toMessage(saved || message);
          dispatch(
            messagesApi.util.updateQueryData(
              "getConversation",
              { sender: message.sender, receiver: sendTo },
              (draft) => {
                if (!draft.some((x) => x.id != null && x.id === normalized.id)) {
                  draft.push(normalized);
                  draft.sort(byTime);
                }
              }
            )
          );
        } catch {
          // mutation failed; nothing to merge
        }
      },
    }),

    // Owns the single per-user WebSocket. Subscribe once (app-level) while authed.
    getMessageStream: build.query({
      // No HTTP request — this query only exists to host the socket lifecycle.
      queryFn: () => ({ data: null }),
      async onCacheEntryAdded(
        principle,
        { cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) {
        if (!principle) return;
        let socket;
        try {
          await cacheDataLoaded;
          socket = new WebSocket(
            config.resourceServer.socketUri + encodeURIComponent(principle)
          );
          socket.addEventListener("open", () => socket.send("ping"));
          socket.addEventListener("message", (event) => {
            let parsed;
            try {
              parsed = JSON.parse(event.data);
            } catch {
              return; // non-JSON frames (e.g. ping/pong)
            }
            if (!parsed || !parsed.sender) return;
            const m = toMessage(parsed);
            // Inbound m.sender -> me (principle): patch that conversation cache.
            dispatch(
              messagesApi.util.updateQueryData(
                "getConversation",
                { sender: principle, receiver: m.sender },
                (draft) => {
                  if (!draft.some((x) => x.id != null && x.id === m.id)) {
                    draft.push(m);
                    draft.sort(byTime);
                  }
                }
              )
            );
          });
        } catch {
          // cacheEntryRemoved can win the race on teardown
        }
        await cacheEntryRemoved;
        if (socket) socket.close();
      },
    }),
  }),
});

export const {
  useGetConversationQuery,
  useSendMessageMutation,
  useGetMessageStreamQuery,
} = messagesApi;
