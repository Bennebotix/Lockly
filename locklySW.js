self.addEventListener("fetch", (event) => {
  event.waitUntil(
    (async () => {
      if (!event.clientId) return;
      const client = await self.clients.get(event.clientId);
      if (!client) return;
      client.postMessage({
        msg: "Hey I just got a fetch from you!",
        url: event.request
      });
    })()
  );
});
