crypto.subtle
  .digest(
    "SHA-256",
    new TextEncoder().encode(
      decodeURIComponent(
        (a = RegExp("key=[^;]+").exec(document.cookie))
          ? a.toString().replace(/^[^=]+./, "")
          : "",
      ) || "",
    ),
  )
  .then((e) => {
    "f6a5a99f56ff082b24369731f69fbb764ca33d2ef817a534cf6ca4d2d5dd1a7d" !==
      Array.from(new Uint8Array(e))
        .map((e) => e.toString(16).padStart(2, "0"))
        .join("") &&
      (window.stop(),
      (document.documentElement.innerHTML = ""),
      document.write(
        '<head><meta name="color-scheme" content="light dark"></head><body><pre style="word-wrap: break-word; white-space: pre-wrap;">Page inaccessible. Please contact the administrator for access.</pre></body>',
      ),
      document.close(),
      (window.location.href = "about:blank"),
      window.history.forward(),
      (window.onbeforeunload = function () {
        return "Warning: Leaving this page may result in loss of data.";
      }));
  });
