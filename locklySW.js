self.addEventListener("fetch", (event) => {
  event.respondWith(event.request);
});
