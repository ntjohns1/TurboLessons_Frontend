export const useHeartbeat = (stompClient, endpoint, interval = 10000) => {
        const timeoutId = setInterval(() => {
            stompClient.send(endpoint, {}, "", headers => {
                const sessionId = headers.session;
                console.log("Session id: ", sessionId);
            });
        }, interval);
        return () => {
            clearInterval(timeoutId);
        };
};
