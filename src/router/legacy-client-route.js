const legacyPages = [
	"^/addons",
	"^/administration/?$",
	"^/administration/classes",
	"^/administration/students/.*/edit",
	"^/alerts",
	"^/calendar",
	"^/courses",
	"^/dashboard",
	"^/files",
	"^/help",
	"^/homework",
	"^/login",
	"^/logout",
	"^/news",
	"^/teams",
	"^/users/language",
];

const legacyAssets = [
	"^/$",
	"^/fonts/ptsans",
	"^/images",
	"^/locales",
	"^/scripts",
	"^/styles",
	"^/vendor-optimized",
	"^/vendor/feathersjs",
];

const legacyRoutes = [...legacyPages, ...legacyAssets];

const isLegacyClient = (path) => {
	return legacyRoutes.some((regex) => new RegExp(regex).exec(path));
};

const isLegacyClientPage = (path) => {
	return legacyPages.some((regex) => new RegExp(regex).exec(path));
};

module.exports = {
	isLegacyClientPage,
	isLegacyClient,
};
