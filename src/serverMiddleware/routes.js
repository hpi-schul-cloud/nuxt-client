// Whitelisted Vue routes
// everything else will be forwarded to the legacy client
// using the ./proxy.js serverMiddleware

// const id = "[a-z0-9]+";
//const mongoId = "[a-z0-9]{24}";

module.exports = [
	`^/administration/datasources?`,
	`^/administration/students/?$`,
	`^/administration/students/new/?$`,
	`^/administration/teachers/?$`,
	`^/administration/teachers/new/?$`,
	// `^/content/`,
	`^/error/`,
	`^/imprint/?`,
	`^/insights`,
	`^/mint-ec/?`,
	// `^/news/${mongoId}/?$`,
	// `^/news/${mongoId}/edit`,
	`^/news/new`,
	`^/nuxtversion/?$`,
];
