self.addEventListener("install", (event) => {
  client.postMessage('Service Worker Registered!');
});

self.addEventListener("fetch", (event) => {
  event.waitUntil(
    clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage(`"${event.request.host}"`);// vs. "${window.location.host}"`);
      });
    })
  );

  event.respondWith(fetch(event.request));
});
