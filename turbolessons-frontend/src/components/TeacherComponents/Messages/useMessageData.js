import { useAuth } from "@ntjohns1/react-oidc";
import {
  useGetConversationQuery,
  useSendMessageMutation,
} from "../../../service/messagesApi";

/**
 * Conversation facade for a chat with `otherUser`.
 * Server state (the conversation + send) is RTK Query; realtime updates arrive
 * via the app-level message stream (see MessageStreamSubscriber) which pushes
 * inbound messages into this same cache. UI state (selection, draft text) stays
 * in the message slice.
 */
export default function useMessageData(otherUser) {
  const { claims } = useAuth();
  const principle = claims.name;

  const {
    data: messages = [],
    isLoading,
    isError,
  } = useGetConversationQuery(
    { sender: principle, receiver: otherUser },
    { skip: !principle || !otherUser }
  );

  const [sendMessageMutation, sendState] = useSendMessageMutation();

  const send = (text) =>
    sendMessageMutation({
      sendTo: otherUser,
      message: {
        sender: principle,
        receiver: otherUser,
        msg: text,
        timestamp: new Date().toISOString(),
      },
    });

  return { principle, messages, isLoading, isError, send, sendState };
}
