var key;

self.addEventListener("fetch", (event) => {
  if (event.request.host)
  function reject() {
    let msg = event.request.headers.get("Accept")?.includes("text/html") ? 'Page not accessible, please contact administrator.' : '';
    event.respondWith(new Response(msg, { status: 404 }));
  }

  function resolve(request) {
    const newUrl = new URL('/data' + request.url.substring(self.location.origin.length), self.location.origin);
      event.respondWith(
        (async () => {
          const response = await fetch(newUrl);
          const encryptedContent = await response.arrayBuffer();

          const decryptedData = await decrypt(encryptedContent);
          return new Response(decryptedData, {
            headers: { 'Content-Type': 'application/octet-stream' }
          });
        })(),
      );
    }

  const requestUrl = new URL(event.request.url);
  const isLocal = requestUrl.origin === self.location.origin;

  if (isLocal) {
    if (key) {
      resolve(event.request);
    } else {
      reject(); 
    }
  } else {
    event.respondWith(await fetch(event.request))
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
    key = event.data.key;
  }
});

async function decrypt(encryptedContent) {
  const enc = new TextEncoder();
  const salt = key.salt;
  const iv = key.iv;
  const pwd = key.b64Pwd;

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(atob(pwd)),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"]
  );

  const aesKey = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );

  const decryptedData = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
      tagLength: 128,
    },
    aesKey,
    encryptedContent
  );

  return new TextDecoder().decode(decryptedData);
}
