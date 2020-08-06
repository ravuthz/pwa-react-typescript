const modulePathPrefix = 'workbox-v5.1.3';

importScripts(modulePathPrefix + "/workbox-sw.js");

// const baseUrl = 'http://localhost:8888';
const precacheManifest = [];

function storageEstimateWrapper() {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
        // We've got the real thing! Return its response.
        return navigator.storage.estimate();
    }

    if ('webkitTemporaryStorage' in navigator &&
        'queryUsageAndQuota' in navigator.webkitTemporaryStorage) {
        // Return a promise-based wrapper that will follow the expected interface.
        return new Promise(function (resolve, reject) {
            navigator.webkitTemporaryStorage.queryUsageAndQuota(
                function (usage, quota) {
                    resolve({usage: usage, quota: quota})
                },
                reject
            );
        });
    }

    // If we can't estimate the values, return a Promise that resolves with NaN.
    return Promise.resolve({usage: NaN, quota: NaN});
}

storageEstimateWrapper().then(({usage, quota}) => {
    console.log(`Using ${usage} out of ${quota} bytes.`);
    console.log(`Using ${(usage / 1048576)} out of ${(quota / 1048576)} megabytes.`);
});

self.addEventListener('install', (event) => {
    console.log('WorkBox.install: ', event);
    self.skipWaiting();
    // const channel = new BroadcastChannel('service-worker-chanel');
    // channel.postMessage({promptToReload: true});
    // channel.onmessage = (message) => {
    //     if (message.data.skipWaiting) {
    //         self.skipWaiting();
    //     }
    // };
});

if ('BackgroundFetchManager' in self) {
    console.log('This browser supports Background Fetch!');
}

self.addEventListener('backgroundfetchsuccess', (event) => {
    console.log('backgroundfetchsuccess: ', event);
});

self.addEventListener('backgroundfetchfail', (event) => {
    console.log('backgroundfetchfail: ', event);
});

self.addEventListener('backgroundfetchclick', (event) => {
    console.log('backgroundfetchclick: ', event);
});

// self.addEventListener('fetch',  (event) => {
//     const url = "http://localhost:8283/api/todo_list/getTodoList/327";
//     const req = event.request;
//     if (req.url.includes(url)) {
//         console.log('fetch.event: ', event);
//         const fetchData = fetch(req).then((res) => {
//             console.log('res: ', res);
//
//             caches.open('test-cache').then(testCache => {
//                 const cloned = res.clone();
//                 testCache.add(req, cloned);
//                 console.log('cloned: ', cloned);
//             });
//
//             return res;
//         });
//         event.respondWith(fetchData);
//     }
//     // http://localhost:8283/api/todo_list/getTodoList/327
// });

// self.addEventListener('fetch', event => {
//     console.log('fetch.event.request.url: ', event.request.url);
// });

// self.addEventListener('message', (event) => {
//     console.log('WorkBox.message: ', event);
// });

if (workbox) {
    console.log(`Wow! WorkBox is loaded 🎉`);
    workbox.setConfig({modulePathPrefix, debug: true});
    workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

    const dataCacheConfig = {
        cacheName: 'cache-data',
        plugins: [
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200]
            }),
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 years
                maxEntries: 10000,
                purgeOnQuotaError: true // Automatically cleanup if quota is exceeded.
            })
        ]
    };

    // const photoCacheConfig = {
    //     cacheName: 'cache-photos',
    // };
    //
    // const imageCacheConfig = {
    //     cacheName: 'cache-images',
    // };

    workbox.routing.registerRoute(
        ({url}) => {
            console.log('/api', url.pathname.startsWith('/api'));
            return url.pathname.startsWith('/api');
        },
        new workbox.strategies.StaleWhileRevalidate(dataCacheConfig),
        'GET'
    );

    // workbox.routing.registerRoute(
    //     ({url}) => url.origin === baseUrl && url.pathname.startsWith('/api'),
    //     new workbox.strategies.StaleWhileRevalidate(dataCacheConfig),
    //     'GET'
    // );

    // workbox.routing.registerRoute(
    //     ({url}) => url.origin === 'https://jsonplaceholder.typicode.com' && url.pathname.startsWith('/photos'),
    //     new workbox.strategies.CacheFirst(photoCacheConfig),
    //     'GET'
    // );
    //
    // workbox.routing.registerRoute(
    //     ({url}) => url.origin === 'https://api.unsplash.com' && url.pathname.startsWith('/photos'),
    //     new workbox.strategies.CacheFirst(imageCacheConfig),
    //     'GET'
    // );

    const handler = workbox.precaching.createHandlerBoundToURL('/index.html');
    workbox.routing.registerRoute(new workbox.routing.NavigationRoute(handler, {
        denylist: [/^\/_/, /\/[^/?]+\.[^/]+$/],
    }));
} else {
    console.log(`Sad! WorkBox didn't load 😬`);
}