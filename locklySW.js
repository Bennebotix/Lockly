addEventListener("fetch", (event) => {
  // Check if the request is for HTML
  const isHtmlRequest = event.request.headers.get("Accept")?.includes("text/html");
  
  if (isHtmlRequest) {
    // Respond with 'test' if it's an HTML request
    event.respondWith(new Response("test", { status: 200 }));
  } else {
    // Handle other request types here if necessary
    event.respondWith(new Response("Not HTML", { status: 404 }));
  }
});
