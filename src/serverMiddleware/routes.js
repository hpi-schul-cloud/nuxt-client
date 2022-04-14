// Whitelisted Vue routes
// everything else will be forwarded to the legacy client
// using the ./proxy.js serverMiddleware

// const id = "[a-z0-9]+";
const mongoId = "[a-z0-9]{24}";
const activationCode = "[a-z0-9]+";
// const courseId = "[a-f0-9]{24}";
const routes = [
	// `^/account/?$`,
	// `^/courses/${courseId}/?$`,
	// `^/account/email/edit/?$`,
	// `^/account/name/edit/?$`,
	// `^/account/password/edit/?$`,
	// `^/account/password/edit/?$`,
	// `^/account/locale/edit/?$`,
	`^/activation/${activationCode}/?$`,
	`^/administration/students/?$`,
	`^/administration/students/new/?$`,
	`^/administration/students/consent/?$`,
	`^/administration/teachers/?$`,
	`^/administration/teachers/new/?$`,
	`^/administration/ldap/config/?$`,
	`^/administration/ldap/activate/?$`,
	`^/administration/school-settings$`,
	`^/administration/migration`,
	`^/tasks/?$`,
	`^/tasks/open/?$`,
	`^/tasks/assigned/?$`,
	`^/homework/?$`,
	`^/homework/asked/?$`,
	`^/homework/private/?$`,
	`^/homework/archive/?$`,
	`^/login-instances/?`,
	//`^/calendar/?`,
	`^/error/`,
	`^/imprint/?`,
	`^/termsofuse/?`,
	`^/mint-ec/?`,
	`^/insights`,
	//`^/news`,
	`^/news/new`,
	//`^/news/${mongoId}/?$`,
	`^/news/${mongoId}/edit`,
	`^/nuxtversion/?$`,
	`^/rooms-overview/?$`,
	`^/rooms-list/?$`,
	`^/rooms/${mongoId}/?$`,
	// `^/courses/?$`,
	`^/poc-files/?$`,
];

const uuid =
	"[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}";
routes.push(`^/content/?$`);
routes.push(`^/content/${uuid}/?$`);

module.exports = routes;
