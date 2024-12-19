var key;

self.addEventListener("fetch", (event) => {
  function reject() {
    if (event.request.headers.get("Accept")?.includes("text/html")) {
      event.respondWith(new Response('Page not accessible, please contact administrator.', { status: 404 }));
    } else {
      event.respondWith(new Response('', { status: 404 }));
    }
  }

  function resolve(request) {
    event.respondWith(
      (async () => {
        return fetch(request);
      })(),
    );
  }

  if (key) {
    resolve(event.request);
    // send('Accepted with key: ' + data, event);
  } else {
    reject();
    // send('rejected with key: ' + data, event);
  }
});

function decript(key, event) {
  return new Response('', { status: 200 });
}

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
    key = event.data.data;
  }
});
