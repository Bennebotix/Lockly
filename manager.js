self.addEventListener('install', (event) => {
    console.log('Service Worker: Installed');
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activated');
});

self.addEventListener('fetch', (event) => {
    const checkOtherWorker = async () => {
        const registration = await navigator.serviceWorker.getRegistration('/data/');
        
        if (registration) {
            console.log('Another Service Worker is registered at /data/. Redirecting...');
            event.respondWith(
                Response.redirect('/data/index.html')
            );
        } else {
            console.log('No Service Worker found at /data/');
        }
    };

    if (event.request.url.endsWith('/')) {
        event.respondWith(checkOtherWorker());
    }
});
