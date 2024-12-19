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

async function encrypt(file, key) {
  const nativeKey = await crypto.importKey(
    "raw",
    key,
    { name: "RSA-OAEP" },
    false,
    ["encrypt", "decrypt"],
  );
  return await crypto.decrypt({ name: "RSA-OAEP" }, nativeKey, file);
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

async function decrypt(data, password) {
  const enc = new TextEncoder();
  const salt = data.salt;
  const iv = data.iv;
  const encryptedContent = data.data;

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
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

  return decryptedData;
}
