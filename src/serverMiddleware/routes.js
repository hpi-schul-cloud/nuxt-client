// Whitelisted Vue routes
// everything else will be forwarded to the legacy client
// using the ./proxy.js serverMiddleware

// const id = "[a-z0-9]+";
//const mongoId = "[a-z0-9]{24}";
const activationCode = "[a-z0-9]+";
const routes = [
	// `^/account/?$`,
	`^/account/email/edit/?$`,
	`^/account/name/edit/?$`,
	`^/account/password/edit/?$`,
	`^/account/password/edit/?$`,
	`^/account/locale/edit/?$`,
	`^/activation/${activationCode}/?$`,
	// `^/administration/datasources?`,
	// `^/administration/students/?$`,
	// `^/administration/students/new/?$`,
	// `^/administration/students/consent/?$`,
	// `^/administration/teachers/?$`,
	// `^/administration/teachers/new/?$`,
	`^/login-instances/?`,
	`^/content/`,
	//`^/calendar/?`,
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
if (process.env.LERNSTORE_MODE === "EDUSHARING") {
	const uuid =
		"[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}";
	routes.push(`^/content/?$`);
	routes.push(`^/content/${uuid}/?$`);
}

module.exports = routes;
