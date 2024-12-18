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
    "f6a5a99f56ff082b24369731f69fbb764ca33d2ef817a534cf6ca4d2d5dd1a7d" ===
      Array.from(new Uint8Array(e))
        .map((e) => e.toString(16).padStart(2, "0"))
        .join("") &&
      (
        // Register sevice worker and redirect to the main page
      );
  });
