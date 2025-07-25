// Whitelisted Vue routes
// everything else will be forwarded to the legacy client
// using the ./proxy.js serverMiddleware

const mongoId = "[a-z0-9]{24}";
const h5pId = "[a-z0-9]+";
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
	`^/administration/school-settings/?$`,
	`^/administration/school-settings/tool-configuration/?$`,
	`^/administration/school-settings/tool-configuration/${mongoId}/?$`,
	`^/administration/school-settings/provisioning-options/?$`,
	`^/administration/migration/?$`,
	`^/administration/groups/classes/?$`,
	`^/administration/groups/classes/${mongoId}/?$`,
	`^/administration/rooms/new/?$`,
	`^/boards/${mongoId}/?$`,
	`^/collabora/${mongoId}/?$`,
	`^/content/?$`,
	`^/content/${uuid}/?$`,
	`^/error/?$`,
	`^/h5p/player/${h5pId}/?$`,
	`^/h5p/editor/?$`,
	`^/h5p/editor/${h5pId}/?$`,
	`^/imprint/?$`,
	`^/licenses/?$`,
	`^/migration/?$`,
	`^/migration/success/?$`,
	`^/migration/error/?$`,
	`^/media-shelf/?$`,
	`^/news/new/?$`,
	`^/news/${mongoId}/edit/?$`,
	`^/poc-files/?$`,
	`^/folder/${mongoId}/?$`,
	`^/rooms/invitation-link/${mongoId}?$`,
	`^/rooms/?$`,
	`^/rooms/new/?$`,
	`^/rooms/${mongoId}/?$`,
	`^/rooms/${mongoId}/board/?$`,
	`^/rooms/${mongoId}/edit/?$`,
	`^/rooms/${mongoId}/members/?$`,
	`^/rooms/courses-list/?$`,
	`^/rooms/courses-overview/?$`,
	`^/rooms-overview/?$`,
	`^/tasks/?$`,
	`^/tools/context/tool-configuration/?$`,
	`^/tools/context/tool-configuration/${mongoId}/?$`,
	`^/@`,
	`^/src/`,
	`^/node_modules/`,
];

const isVueClient = (path) => {
	return vueRoutes.some((regex) => new RegExp(regex).exec(path));
};

export { isVueClient };
