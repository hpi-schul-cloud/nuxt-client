// Whitelisted Vue routes
// everything else will be forwarded to the legacy client
// using the ./proxy.js serverMiddleware

// const id = "[a-z0-9]+";
//const mongoId = "[a-z0-9]{24}";
const activationCode = "[a-z0-9]+";

module.exports = [
	// `^/account/?$`,
	`^/account/email/edit/?$`,
	`^/account/name/edit/?$`,
	`^/account/password/edit/?$`,
	`^/account/password/edit/?$`,
	`^/activation/${activationCode}/?$`,
	// `^/administration/datasources?`,
	// `^/administration/students/?$`,
	// `^/administration/students/new/?$`,
	// `^/administration/teachers/?$`,
	// `^/administration/teachers/new/?$`,
	`^/login-instances/?`,
	// `^/content/`,
	`^/error/`,
	`^/imprint/?`,
	`^/termsofuse/?`,
	`^/mint-ec/?`,
	// `^/news/${mongoId}/?$`,
	`^/insights`,
	// `^/news/${mongoId}/edit`,
	`^/news/new`,
	`^/nuxtversion/?$`,
];
