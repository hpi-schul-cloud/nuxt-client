// Whitelisted Vue routes
// everything else will be forwarded to the legacy client
// using the ./proxy.js serverMiddleware

// const id = "[a-z0-9]+";
//const mongoId = "[a-z0-9]{24}";

module.exports = [
	`^/error/`,
	`^/courses/`,
	`^/mint-ec/?`,
	`^/imprint/?`,
	// `^/news/${mongoId}/?$`,
	//`^/news/${mongoId}/edit`,
	`^/news/new`,
	`^/nuxtversion/?$`,
];
