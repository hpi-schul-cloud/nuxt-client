// Whitelisted Vue routes
// everything else will be forwarded to the legacy client
// using the ./proxy.js serverMiddleware

const mongoId = "[a-z0-9]{24}";
const activationCode = "[a-z0-9]+";
const uuid =
	"[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}";

const vueRoutes = [
	`^/favicon.png$`,
	`^/_nuxt/*`,
	`^/runtime.config.json`,
	`^/activation/${activationCode}/?$`,
	`^/administration/students/?$`,
	`^/administration/students/new/?$`,
	`^/administration/students/consent/?$`,
	`^/administration/teachers/?$`,
	`^/administration/teachers/new/?$`,
	`^/administration/ldap/config/?$`,
	`^/administration/ldap/activate/?$`,
	`^/administration/school-settings$`,
	`^/administration/school-settings/tool`,
	`^/administration/migration`,
	`^/cfiles/?$`,
	`^/cfiles/teams/?$`,
	`^/cfiles/teams/.+`,
	`^/content/?$`,
	`^/content/${uuid}/?$`,
	`^/error/`,
	`^/imprint/?`,
	`^/termsofuse/?`,
	`^/news/new`,
	`^/news/${mongoId}/edit`,
	`^/poc-files/?$`,
	`^/rooms-overview/?$`,
	`^/rooms-list/?$`,
	`^/rooms/${mongoId}/?$`,
	`^/rooms/${mongoId}/board?$`,
	`^/rooms/${mongoId}/create-task-card/?$`,
	`^/tasks/?$`,
	`^/task-cards/${mongoId}/edit/?$`,
	`^/termsofuse/?`,
	`^/login-instances/?$`,
	`^/error/?$`,
	`^/migration/?$`,
];

const isVueClient = (path) => {
	return vueRoutes.some((regex) => new RegExp(regex).exec(path));
};

module.exports = {
	isVueClient,
};
