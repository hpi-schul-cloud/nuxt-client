import { RouteConfig } from "vue-router";

const REGEX_ID = "[a-z0-9]{24}";
const REGEX_UUID =
	"[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}";
const REGEX_ACTIVATION_CODE = "[a-z0-9]+";

export const routes: Array<RouteConfig> = [
	{
		path: `/activation/:activationCode(${REGEX_ACTIVATION_CODE})`,
		component: () => import("../pages/ActivationCode.page.vue"),
		name: "activation-activationCode",
	},
	{
		path: "/administration/ldap/activate",
		component: () => import("../pages/administration/LDAPActivate.page.vue"),
		name: "administration-ldap-activate",
	},
	{
		path: "/administration/ldap/config",
		component: () => import("../pages/administration/LDAPConfig.page.vue"),
		name: "administration-ldap-config",
	},
	{
		path: "/administration/migration",
		component: () => import("../pages/administration/Migration.page.vue"),
		name: "administration-migration",
	},
	{
		path: "/administration/school-settings",
		component: () => import("../pages/administration/SchoolSettings.page.vue"),
		name: "administration-school-settings",
	},
	{
		path: "/administration/students",
		component: () => import("../pages/administration/StudentOverview.page.vue"),
		name: "administration-students",
	},
	{
		path: "/administration/students/consent",
		component: () => import("../pages/administration/StudentConsent.page.vue"),
		name: "administration-students-consent",
	},
	{
		path: "/administration/students/new",
		component: () => import("../pages/administration/StudentCreate.page.vue"),
		name: "administration-students-new",
	},
	{
		path: "/administration/teachers",
		component: () => import("../pages/administration/TeacherOverview.page.vue"),
		name: "administration-teachers",
	},
	{
		path: "/administration/teachers/new",
		component: () => import("../pages/administration/TeacherCreate.page.vue"),
		name: "administration-teachers-new",
	},
	{
		path: "/content",
		component: () => import("../pages/LernStoreOverview.page.vue"),
		name: "content",
	},
	{
		path: `/content/:id(${REGEX_UUID})`,
		component: () => import("../pages/LernStoreDetails.page.vue"),
		name: "content-id",
	},
	{
		path: "/error/proxy",
		component: () => import("../pages/ProxyError.page.vue"),
		name: "error-proxy",
	},
	{
		path: "/imprint",
		component: () => import("../pages/Imprint.page.vue"),
		name: "imprint",
	},
	// deprecated?
	{
		path: "/insights",
		component: () => import("../pages/Insights.page.vue"),
		name: "insights",
	},
	{
		path: "/login-instances",
		component: () => import("../pages/LoginInstances.page.vue"),
		name: "login-instances",
	},
	{
		path: "/news/new",
		component: () => import("../pages/NewsCreate.page.vue"),
		name: "news-new",
	},
	{
		path: `/news/:id(${REGEX_ID})/edit`,
		component: () => import("../pages/NewsEdit.page.vue"),
		name: "news-id-edit",
	},
	// can this be removed?
	{
		path: "/poc-files",
		component: () => import("../pages/POCFiles.page.vue"),
		name: "poc-files",
	},
	{
		path: `/rooms/:id(${REGEX_ID})`,
		component: () => import("../pages/RoomDetails.page.vue"),
		name: "rooms-id",
	},
	{
		path: "/rooms-list",
		component: () => import("../pages/RoomList.page.vue"),
		name: "rooms-list",
	},
	{
		path: "/rooms-overview",
		component: () => import("../pages/RoomOverview.page.vue"),
		name: "rooms-overview",
	},
	{
		path: "/tasks",
		component: () => import("../pages/TaskOverview.page.vue"),
		name: "tasks",
	},
	// deprecated?
	{
		path: "/termsofuse",
		component: () => import("../pages/TermsOfUse.vue"),
		name: "termsofuse",
	},
];
