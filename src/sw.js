const modulePathPrefix = 'workbox-v5.1.3';

importScripts(modulePathPrefix + "/workbox-sw.js");

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

self.addEventListener('message', (event) => {
    console.log('WorkBox.message: ', event);
});

if (workbox) {
    // workbox.skipWaiting();
    console.log(`Wow! WorkBox is loaded 🎉`);
    workbox.setConfig({modulePathPrefix, debug: true});
    // workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);
    workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

    const dataCacheConfig = {
        cacheName: 'cache-data'
    };

    const photoCacheConfig = {
        cacheName: 'cache-photos',
    };

    const imageCacheConfig = {
        cacheName: 'cache-images',
        // plugins: [
        //     new workbox.cacheableResponse.Plugin({
        //         statuses: [0, 200]
        //     })
        // ]
    };

    workbox.routing.registerRoute(
        ({url}) => url.origin === 'https://jsonplaceholder.typicode.com' && url.pathname.startsWith('/photos'),
        new workbox.strategies.CacheFirst(photoCacheConfig),
        'GET'
    );

    workbox.routing.registerRoute(
        ({url}) => url.origin === 'https://api.unsplash.com' && url.pathname.startsWith('/photos'),
        new workbox.strategies.CacheFirst(imageCacheConfig),
        'GET'
    );

    const handler = workbox.precaching.createHandlerBoundToURL('/index.html');
    const navigationRoute = new workbox.routing.NavigationRoute(handler, {
        denylist: [/^\/_/, /\/[^/?]+\.[^/]+$/],
    });
    workbox.routing.registerRoute(navigationRoute);
} else {
    console.log(`Sad! WorkBox didn't load 😬`);
}