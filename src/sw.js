const modulePathPrefix = 'workbox-v5.1.3';

importScripts(modulePathPrefix + "/workbox-sw.js");

const MEGABYTE = 1048576;
const precacheManifest = [];

function formatToMB(val) {
    let result;
    const opts = {
        maximumFractionDigits: 0,
    };

    try {
        result = new Intl.NumberFormat('en-us', opts).format(val / MEGABYTE);
    } catch (ex) {
        result = Math.round(val / MEGABYTE);
    }
    return `${result} MB`;
}

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
    const remain = quota - usage;

    // window.diskQuotaTotal = formatToMB(quota);
    // window.diskQuotaUsed = formatToMB(usage);
    // window.diskQuotaRemain = formatToMB(remain);

    console.log(`Using ${usage} out of ${quota} bytes.`);
    console.log(`Using ${formatToMB(usage)} out of ${formatToMB(quota)} megabytes.`);
});

self.addEventListener('install', (event) => {
    console.log('[ServiceWorker] Install');
    self.skipWaiting();
});

self.addEventListener('activate', (event) =>{
    console.log('[ServiceWorker] Activate');
    return self.clients.claim();
});

// self.addEventListener('fetch', (event) => {
//     console.log('[Service Worker] Fetch', event.request.url);
//     e.respondWith(fetch(e.request));
// });

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
    workbox.setConfig({modulePathPrefix, debug: true}); // debug: true
    workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

    // const queue = new workbox.backgroundSync.Queue('queue-create-comment');

    // self.addEventListener('fetch', (event) => {
    //     // Clone the request to ensure it's safe to read when
    //     // adding to the Queue.
    //     // console.log('fetch.event: ', event);
    //
    //     const promiseChain = fetch(event.request.clone())
    //         .catch((err) => {
    //             // console.log('fetch.error: ', err);
    //             return queue.pushRequest({request: event.request});
    //         });
    //
    //     event.waitUntil(promiseChain);
    // });

    // self.addEventListener('sync', (event) => {
    //     console.log('sync.event: ', event);
    // console.log('sync.event.tag: ', event.tag);

    //
    //     if (event.tag === 'post-comment') {
    //         event.waitUntil(addComment());
    //     }
    // });

    // function addComment() {
    //     const data = {
    //         action: "Visit",
    //         lcId: "LC20031600013",
    //         remark: "Test Post by Sync",
    //         result: "No Service",
    //         situationFromAction: "Can contact",
    //         to: "Mobile Phone",
    //         who: "Lessee",
    //     };
    //     const url = "http://localhost:8283/api/todo_list/createComment";
    //     return fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json;charset=UTF-8',
    //             'Authorization': 'bearer be45d55b-a91a-46b9-9acf-bf37b2564ed0'
    //         },
    //         body: JSON.stringify(data)
    //     })
    //         .then(() => Promise.resolve())
    //         .catch(() => Promise.reject());
    // }

    const dataCacheConfig = {
        cacheName: 'cache-data',
        plugins: [
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200]
            }),
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 years
                maxEntries: 1000000,
                purgeOnQuotaError: true // Automatically cleanup if quota is exceeded.
            })
        ]
    };

    const imageCacheConfig = {
        cacheName: 'cache-image',
        plugins: [
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200]
            }),
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 years
                maxEntries: 1000000,
                purgeOnQuotaError: true // Automatically cleanup if quota is exceeded.
            })
        ]
    }

    const postDataCacheConfig = {
        cacheName: 'cache-comment',
        plugins: [
            new workbox.backgroundSync.BackgroundSyncPlugin('queue-comment', {
                maxRetentionTime: '1', // 60 * 24 = 24 hours
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

    // workbox.routing.registerRoute(
    //     ({url}) => url.pathname.startsWith('/api')
    //         && !url.pathname.startsWith('/api/docs')
    //         && !url.pathname.startsWith('/api/todo_list/getIloanDoc')
    //         && !url.pathname.startsWith('/api/todo_list/getDocument')
    //         && !url.pathname.startsWith('/api/todo_list/createComment'),
    //     new workbox.strategies.StaleWhileRevalidate(dataCacheConfig),
    //     'GET'
    // );

    workbox.routing.registerRoute(
        ({url}) => url.pathname.startsWith('/api/')
            // && !url.pathname.startsWith('/api/docs')
            // && !url.pathname.startsWith('/api/todo_list/getIloanDoc')
            // && !url.pathname.startsWith('/api/todo_list/getDocument')
            && !url.pathname.startsWith('/api/todo_list/createComment'),
        new workbox.strategies.StaleWhileRevalidate(dataCacheConfig),
        'GET'
    );

    // /api/todo_list/getIloanDoc/
    // /api/todo_list/getDocument/
    // /api/docs/

    // workbox.routing.registerRoute(
    //     ({url}) => url.pathname.startsWith('/api/todo_list/getIloanDoc'),
    //     new workbox.strategies.CacheFirst(imageCacheConfig),
    //     'GET'
    // );
    //
    // workbox.routing.registerRoute(
    //     ({url}) => url.pathname.startsWith('/api/todo_list/getDocument'),
    //     new workbox.strategies.CacheFirst(imageCacheConfig),
    //     'GET'
    // );
    //
    // workbox.routing.registerRoute(
    //     ({url}) => url.pathname.startsWith('/api/docs'),
    //     new workbox.strategies.CacheFirst(imageCacheConfig),
    //     'GET'
    // );

    workbox.routing.registerRoute(
        ({url}) => url.pathname.startsWith('/api/todo_list/createComment'),
        new workbox.strategies.NetworkOnly(postDataCacheConfig),
        'POST'
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