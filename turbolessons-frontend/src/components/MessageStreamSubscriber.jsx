import { useAuth } from "@ntjohns1/react-oidc";
import { useGetMessageStreamQuery } from "../service/messagesApi";

/**
 * Keeps the single per-user WebSocket open for the lifetime of the authenticated
 * app. Mounted once near the root. The socket lives in the RTK Query cache entry
 * for getMessageStream(principle); it opens on first subscribe and closes when
 * this unmounts (logout/navigation away). Renders nothing.
 */
export default function MessageStreamSubscriber() {
  const { claims } = useAuth();
  const principle = claims?.name;
  useGetMessageStreamQuery(principle, { skip: !principle });
  return null;
}
