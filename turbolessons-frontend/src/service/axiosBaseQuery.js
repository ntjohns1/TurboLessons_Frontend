import api from "./axiosConfig";

/**
 * RTK Query baseQuery backed by the shared axios instance, so RTK Query reuses
 * the same `/api` base URL, auth header (set via attachBearer/setAccessToken),
 * and interceptors as the rest of the app.
 *
 * Usage:
 *   createApi({ baseQuery: axiosBaseQuery(), ... })
 *
 * Endpoint `query` returns: { url, method?, data?, params? }
 */
export const axiosBaseQuery =
  () =>
  async ({ url, method = "get", data, params }) => {
    try {
      const result = await api({ url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
