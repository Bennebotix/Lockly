self.addEventListener("fetch", (event) => {
  event.waitUntil(
    clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage(`Request URL: ${event.request.url}`);
      });
    })
  );

  event.respondWith(fetch(event.request));
});
