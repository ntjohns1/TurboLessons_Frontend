import { useEffect } from "react";
import { useAuth, attachBearer, tokenProviderFromManager } from "@ntjohns1/react-oidc";
import api from "../service/axiosConfig";

/**
 * Attaches a fresh Keycloak bearer to the shared axios instance for every
 * request — covering the RTK Query baseQuery and the legacy service modules —
 * so API calls authenticate without each component calling setAccessToken.
 * Renders nothing.
 */
export default function ApiAuthBridge() {
  const { userManager } = useAuth();
  useEffect(() => {
    if (!userManager) return undefined;
    return attachBearer(api, tokenProviderFromManager(userManager));
  }, [userManager]);
  return null;
}
