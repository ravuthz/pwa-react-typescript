const modulePathPrefix = 'workbox-v5.1.3';

importScripts(modulePathPrefix + "/workbox-sw.js");

const MEGABYTE = 1048576;

// const queue = new workbox.backgroundSync.Queue('failRequestQueues');

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
    console.log("===============================================================");
    console.log(`Using ${usage} B (${formatToMB(usage)}) out of ${quota} B (${formatToMB(quota)}).`);
    console.log(`Remaining ${remain} B (${formatToMB(remain)}).`);
    console.log("===============================================================");
});

self.addEventListener('install', (event) => {
    console.log('[ServiceWorker] Install');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] Activate');
    return self.clients.claim();
});

// self.addEventListener('fetch', (event) => {
//     if (event.request.clone().method === 'POST') {
//         console.log('[Service Worker] Fetch', event.request.url);
//         console.log('POST', event.request.clone());
//         // event.respondWith(fetch(event.request.clone())
//         //     .catch(error => {
//         //         savePostRequests(event.request.clone().url, form_data)
//         //     });
//
//         // const promiseChain = fetch(event.request.clone()).catch((err) => {
//         //     console.log('Add failed request to failRequestQueues');
//         //     return queue.pushRequest({request: event.request});
//         // });
//         //
//         // event.waitUntil(promiseChain);
//     }
// });
//
// self.addEventListener('sync', (event) => {
//     console.log('[Service Worker] Sync', event, event.tag);
//     // if (event.tag === 'comment_updated') {
//     //     event.waitUntil(addComment());
//     // }
// });


// if ('BackgroundFetchManager' in self) {
//     console.log('This browser supports Background Fetch!');
//     self.addEventListener('backgroundfetchsuccess', (event) => {
//         console.log('backgroundfetchsuccess: ', event);
//     });
//
//     self.addEventListener('backgroundfetchfail', (event) => {
//         console.log('backgroundfetchfail: ', event);
//     });
//
//     self.addEventListener('backgroundfetchclick', (event) => {
//         console.log('backgroundfetchclick: ', event);
//     });
// }

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
    // workbox.core.setCacheNameDetails({prefix: "i-collector-pwa"});
    workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

    // const queue = new workbox.backgroundSync.Queue('queue-create-comment');

    // self.addEventListener('fetch', (event) => {
    //     // Clone the request to ensure it's safe to read when adding to the Queue.
    //     const promiseChain = fetch(event.request.clone())
    //         .catch(err => {
    //             // console.log('fetch.error: ', err);
    //             return queue.pushRequest({request: event.request});
    //         });
    //
    //     event.waitUntil(promiseChain);
    // });
    //
    // self.addEventListener('sync', (event) => {
    //     console.log('sync.event: ', event.tag, event);
    //     console.log('sync.event: ', event.request);
    //
    //     if (event.tag === 'queue-create-comment') {
    //         event.waitUntil(queue.replayRequests());
    //             event.waitUtil(addComment())
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

    const showNotification = () => {
        alert("Post sent");
        self.registration.showNotification('Post Sent', {
            body: 'You are back online and your post was successfully sent!',
            // icon: 'assets/icon/256.png',
            // badge: 'assets/icon/32png.png'
        });
    };

    const expirationPlugin = new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 31, // 1 (31 days) month
        maxEntries: 1000000,
        purgeOnQuotaError: true // Automatically cleanup if quota is exceeded.
    });

    const cacheableResponsePlugin = new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200]
    });

    const getDataCacheConfig = {
        cacheName: 'cache-data',
        plugins: [
            cacheableResponsePlugin,
            expirationPlugin
        ]
    };

    const getImageCacheConfig = {
        cacheName: 'cache-image',
        plugins: [
            cacheableResponsePlugin,
            expirationPlugin
        ]
    };

    const postDataCacheConfig = {
        cacheName: 'cache-comment',
        plugins: [
            new workbox.backgroundSync.BackgroundSyncPlugin('comment_updated', {
                // maxRetentionTime: '1', // 60 * 24 = 24 hours
                maxRetentionTime: Infinity, // 60 * 24 = 24 hours
                callbacks: {
                    queueDidReplay: showNotification
                },
            })
        ],
        fetchOptions: {
            credentials: 'include',
            // credentials: "same-origin"
        }
    };

    // workbox.routing.registerRoute(
    //     ({url}) => url.pathname.startsWith('/api')
    //         && !url.pathname.startsWith('/api/docs')
    //         && !url.pathname.startsWith('/api/todo_list/getIloanDoc')
    //         && !url.pathname.startsWith('/api/todo_list/getDocument')
    //         && !url.pathname.startsWith('/api/todo_list/createComment'),
    //     new workbox.strategies.StaleWhileRevalidate(getDataCacheConfig),
    //     'GET'
    // );

    // http://192.168.99.83:8080/api/todo_list/getUser
    // http://192.168.99.83:8080/api/todo_list/getTodo
    // http://192.168.99.83:8080/api/todo_list/getTodoList
    // http://192.168.99.83:8080/api/todo_list/getResult
    // http://192.168.99.83:8080/api/todo_list/getStatusMorakot


    // ({url}) => url.origin === baseUrl && url.pathname.startsWith('/api'),
    // ({url}) => url.origin === 'https://api.unsplash.com' && url.pathname.startsWith('/photos'),
    // ({url}) => url.origin === 'https://jsonplaceholder.typicode.com' && url.pathname.startsWith('/photos'),

    workbox.routing.registerRoute(
        ({url}) => url.pathname.startsWith('/api/docs'),
        new workbox.strategies.StaleWhileRevalidate(getDataCacheConfig),
        'GET'
    );

    workbox.routing.registerRoute(
        ({url}) => url.pathname.startsWith('/api/todo_list'),
        new workbox.strategies.StaleWhileRevalidate(getDataCacheConfig),
        'GET'
    );

    workbox.routing.registerRoute(
        ({url}) => url.pathname.startsWith('/api/todo_list/createComment'),
        new workbox.strategies.NetworkOnly(postDataCacheConfig),
        'POST'
    );

    const handler = workbox.precaching.createHandlerBoundToURL('/index.html');
    workbox.routing.registerRoute(new workbox.routing.NavigationRoute(handler, {
        denylist: [/^\/_/, /\/[^/?]+\.[^/]+$/],
    }));
} else {
    console.log(`Sad! WorkBox didn't load 😬`);
}