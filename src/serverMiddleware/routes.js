// Whitelisted Vue routes
// everything else will be forwarded to the legacy client
// using the ./proxy.js serverMiddleware

// const id = "[a-z0-9]+";
// const mongoId = "[a-z0-9]{24}";

module.exports = [
	`^/error/`,
	`^/impressum`,
	//`^/courses`,
	// `^/news`,
	// or: `^/news/${mongoId}/edit`,
];
