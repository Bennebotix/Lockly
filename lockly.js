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
        if ("serviceWorker" in navigator) {
          window.addEventListener("load", function() {
            navigator.serviceWorker
            .register("/locklySW.js")
            .then(res => {        
              console.log("service worker registered", res);      
                window.serviceWorkerRegistration = res;
            })
            .catch(err => console.log("service worker not registered", err))
          })
        }
        
        window.rebootServiceWorker = () => {
          if (navigator.onLine) {
            serviceWorkerRegistration.unregister();
            localStorage.clear();
            window.location.reload();
          } else {
            console.error('Client is not online or "navigator.onLine" is not availible');
          }
        }
      );
  });
