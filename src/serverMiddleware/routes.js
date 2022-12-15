// Whitelisted Vue routes
// everything else will be forwarded to the legacy client
// using the ./proxy.js serverMiddleware

const mongoId = "[a-z0-9]{24}";
const activationCode = "[a-z0-9]+";

const routes = [
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
	`^/cfiles/?$`,
	`^/cfiles/teams/?$`,
	`^/cfiles/teams/.+`,
	`^/error/`,
	`^/imprint/?`,
	`^/login-instances/?`,
	`^/news/new`,
	`^/news/${mongoId}/edit`,
	`^/poc-files/?$`,
	`^/rooms-overview/?$`,
	`^/rooms-list/?$`,
	`^/rooms/${mongoId}/?$`,
	`^/tasks/?$`,
	`^/tasks/new/?$`,
	`^/termsofuse/?`,
	`^/error/?`,
];

const uuid =
	"[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}";
routes.push(`^/content/?$`);
routes.push(`^/content/${uuid}/?$`);

module.exports = routes;
