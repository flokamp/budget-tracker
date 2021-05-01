const APP_PREFIX = "budget_tracker-";
const VERSION = "version_01";
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = ["./index.html", "./js/index.js", "./css/styles.css"];

// Respond with cached resources
self.addEventListener("fetch", function (event) {
	console.log("fetch request : " + event.request.url);
	event.respondWith(
		caches.match(event.request).then(function (request) {
			if (request) {
				// if cache is available, respond with cache
				console.log("responding with cache : " + event.request.url);
				return request;
			} else {
				// if there are no cache, try fetching request
				console.log("file is not cached, fetching : " + event.request.url);
				return fetch(event.request);
			}

			// You can omit if/else for console.log & put one line below like this too.
			// return request || fetch(e.request)
		})
	);
});

// Cache resources
self.addEventListener("install", function (event) {
	event.waitUntil(
		caches.open(CACHE_NAME).then(function (cache) {
			console.log("installing cache : " + CACHE_NAME);
			return cache.addAll(FILES_TO_CACHE);
		})
	);
});
