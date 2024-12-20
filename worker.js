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
        const response = await fetch(request);
        const encryptedContent = await response.arrayBuffer();

        const decryptedData = await decrypt(encryptedContent);
        return new Response(decryptedData, {
          headers: { 'Content-Type': 'application/octet-stream' }
        });
      })(),
    );
  }

  if (key) {
    resolve(event.request); 
  } else {
    reject(); 
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
