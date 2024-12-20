self.addEventListener("message", (event) => {
  self.key = JSON.parse(atob(event.data.key));
});

self.addEventListener("fetch", (event) => {
  function reject() {
    let msg = event.request.headers.get("Accept")?.includes("text/html")
      ? "Page not accessible, please contact administrator."
      : "";
    event.respondWith(new Response(msg, { status: 404 }));
  }

  function resolve(request) {
    const newUrl = new URL(
      "/data" + request.url.substring(self.location.origin.length),
      self.location.origin,
    );
    event.respondWith(
      (async () => {
        const response = await fetch(newUrl);
        const encryptedContent = await response.arrayBuffer();

        const decryptedData = await decrypt(encryptedContent);
        return new Response(decryptedData, {
          headers: response.headers,
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
    (async () => {
      event.respondWith(await fetch(event.request));
    })();
  }
});

function send(msg, event) {
  (async () => {
    if (!event.clientId) return;
    const client = await self.clients.get(event.clientId);
    if (!client) return;

    client.postMessage({
      msg: msg,
    });
  })();
}

async function decrypt(encryptedContent) {
  const enc = new TextEncoder();
  const salt = self.key.salt;
  const iv = self.key.iv;
  const pwd = self.key.pwd;

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(pwd),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"],
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
    ["decrypt"],
  );

  const decryptedData = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
      tagLength: 128,
    },
    aesKey,
    encryptedContent,
  );

  return new TextDecoder().decode(decryptedData);
}
