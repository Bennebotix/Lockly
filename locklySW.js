var data;

self.addEventListener("fetch", (event) => {
  function reject() {
    if (event.request.headers.get("Accept")?.includes("text/html")) {
      event.respondWith(new Response('Page not accessible, please contact administrator.', { status: 404 }));
    } else {
      event.respondWith(new Response('', { status: 404 }));
    }
  }

  function resolve() {
    event.respondWith(
      (async () => {
        return fetch(event.request);
      })(),
    );
  }

  if (data == 'test') {
    resolve();
    send('Accepted with key: ' + data, event);
  } else {
    reject();
    send('rejected with key: ' + data, event);
  }
});

function send(msg, event) {
  (async () => {
    if (!event.clientId) return;
    const client = await self.clients.get(event.clientId);
    if (!client) return;

    client.postMessage({
      msg: msg
    });
  })()
}

self.addEventListener('message', (event) => {
  if (event.data.type === 'LOCAL_STORAGE_KEY') {
    data = event.data.data;
  }
});
