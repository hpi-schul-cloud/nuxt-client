const REGEX_ID = "[a-z0-9]{24}";
const REGEX_UUID =
	"[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}";
const REGEX_ACTIVATION_CODE = "[a-z0-9]+";

export const routes = [
	{
		path: "/content",
		component: () => import("../pages/content/index.vue"),
		name: "content",
	},
	{
		path: "/imprint",
		component: () => import("../pages/imprint.vue"),
		name: "imprint",
	},
	{
		path: "/insights",
		component: () => import("../pages/insights/index.vue"),
		name: "insights",
	},
	{
		path: "/login-instances",
		component: () => import("../pages/login-instances/index.vue"),
		name: "login-instances",
	},
	{
		path: "/news",
		component: () => import("../pages/news/index.vue"),
		name: "news",
	},
	{
		path: "/poc-files",
		component: () => import("../pages/poc-files/index.vue"),
		name: "poc-files",
	},
	{
		path: "/rooms-list",
		component: () => import("../pages/rooms-list.vue"),
		name: "rooms-list",
	},
	{
		path: "/rooms-overview",
		component: () => import("../pages/rooms-overview.vue"),
		name: "rooms-overview",
	},
	{
		path: "/tasks",
		component: () => import("../pages/tasks/index.vue"),
		name: "tasks",
	},
	{
		path: "/termsofuse",
		component: () => import("../pages/TermsOfUse.vue"),
		name: "TermsOfUse",
	},
	{
		path: "/administration/migration",
		component: () => import("../pages/administration/migration/index.vue"),
		name: "administration-migration",
	},
	{
		path: "/administration/school-settings",
		component: () => import("../pages/administration/school-settings.vue"),
		name: "administration-school-settings",
	},
	{
		path: "/administration/students",
		component: () => import("../pages/administration/students/index.vue"),
		name: "administration-students",
	},
	{
		path: "/administration/teachers",
		component: () => import("../pages/administration/teachers/index.vue"),
		name: "administration-teachers",
	},
	{
		path: "/error/proxy",
		component: () => import("../pages/error/proxy.vue"),
		name: "error-proxy",
	},
	{
		path: "/news/new",
		component: () => import("../pages/news/new.vue"),
		name: "news-new",
	},
	{
		path: "/administration/ldap/activate",
		component: () => import("../pages/administration/ldap/activate.vue"),
		name: "administration-ldap-activate",
	},
	{
		path: "/administration/ldap/config",
		component: () => import("../pages/administration/ldap/config.vue"),
		name: "administration-ldap-config",
	},
	{
		path: "/administration/students/consent",
		component: () => import("../pages/administration/students/consent.vue"),
		name: "administration-students-consent",
	},
	{
		path: "/administration/students/new",
		component: () => import("../pages/administration/students/new.vue"),
		name: "administration-students-new",
	},
	{
		path: "/administration/teachers/new",
		component: () => import("../pages/administration/teachers/new.vue"),
		name: "administration-teachers-new",
	},
	{
		path: `/activation/:activationCode(${REGEX_ACTIVATION_CODE})`,
		component: () => import("../pages/activation/_activationCode/index.vue"),
		name: "activation-activationCode",
	},
	{
		path: `/content/:id(${REGEX_UUID})`,
		component: () => import("../pages/content/_id/index.vue"),
		name: "content-id",
	},
	{
		path: `/mint-ec/:article?(${REGEX_ID})`,
		component: () => import("../pages/mint-ec/_article.vue"),
		name: "mint-ec-article",
	},
	{
		path: `/news/:id(${REGEX_ID})`,
		component: () => import("../pages/news/_id/index.vue"),
		name: "news-id",
	},
	{
		path: `/rooms/:id(${REGEX_ID})`,
		component: () => import("../pages/rooms/_id/index.vue"),
		name: "rooms-id",
	},
	{
		path: `/news/:id(${REGEX_ID})/edit`,
		component: () => import("../pages/news/_id/edit.vue"),
		name: "news-id-edit",
	},
];
