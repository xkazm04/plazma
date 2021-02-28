
// importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');

// workbox.routing.registerRoute(
//     ({request}) => request.destination === 'image',
//     new workbox.strategies.NetworkFirst()
// )

console.warn('ws file is public folder');

let cacheData = "appV1";
this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                '/static/js/main.chunk.js',
                // '/static/js/0.chunk.js',
                // '/static/js/bundle.js',
                // '/static/css/main.chunk.css',
                // '/index.html',
                // '/profile',
                // '/dashboard',
                // '/reservations',
                '/',
            ])
        })
    )
})

// this.addEventListener("fetch", (event) => {
//     event.respondWith(
//         caches.match(event.request).then((resp)=> {
//             if(resp)
//             {
//                 return resp
//             }
//         })
//     )

// })


