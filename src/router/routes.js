const REGEX_ID = "[a-z0-9]{24}";
const REGEX_UUID =
	"[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}";
const REGEX_ACTIVATION_CODE = "[a-z0-9]+";

function interopDefault(promise) {
	return promise.then((m) => m.default || m);
}

export const routes = [
	{
		path: `/activation/:activationCode(${REGEX_ACTIVATION_CODE})`,
		component: () => interopDefault(import("../pages/ActivationCode.page.vue")),
		name: "activation-activationCode",
	},
	{
		path: "/administration/ldap/activate",
		component: () =>
			interopDefault(import("../pages/administration/LDAPActivate.page.vue")),
		name: "administration-ldap-activate",
	},
	{
		path: "/administration/ldap/config",
		component: () =>
			interopDefault(import("../pages/administration/LDAPConfig.page.vue")),
		name: "administration-ldap-config",
	},
	{
		path: "/administration/migration",
		component: () =>
			interopDefault(import("../pages/administration/Migration.page.vue")),
		name: "administration-migration",
	},
	{
		path: "/administration/school-settings",
		component: () =>
			interopDefault(import("../pages/administration/SchoolSettings.page.vue")),
		name: "administration-school-settings",
	},
	{
		path: "/administration/students",
		component: () =>
			interopDefault(
				import("../pages/administration/StudentOverview.page.vue")
			),
		name: "administration-students",
	},
	{
		path: "/administration/students/consent",
		component: () =>
			interopDefault(import("../pages/administration/StudentConsent.page.vue")),
		name: "administration-students-consent",
	},
	{
		path: "/administration/students/new",
		component: () =>
			interopDefault(import("../pages/administration/StudentCreate.page.vue")),
		name: "administration-students-new",
	},
	{
		path: "/administration/teachers",
		component: () =>
			interopDefault(
				import("../pages/administration/TeacherOverview.page.vue")
			),
		name: "administration-teachers",
	},
	{
		path: "/administration/teachers/new",
		component: () =>
			interopDefault(import("../pages/administration/TeacherCreate.page.vue")),
		name: "administration-teachers-new",
	},
	{
		path: "/content",
		component: () =>
			interopDefault(import("../pages/LernStoreOverview.page.vue")),
		name: "content",
	},
	{
		path: `/content/:id(${REGEX_UUID})`,
		component: () =>
			interopDefault(import("../pages/LernStoreDetails.page.vue")),
		name: "content-id",
	},
	{
		path: "/error/proxy",
		component: () => interopDefault(import("../pages/ProxyError.page.vue")),
		name: "error-proxy",
	},
	{
		path: "/imprint",
		component: () => interopDefault(import("../pages/Imprint.page.vue")),
		name: "imprint",
	},
	// deprecated?
	{
		path: "/insights",
		component: () => interopDefault(import("../pages/Insights.page.vue")),
		name: "insights",
	},
	{
		path: "/login-instances",
		component: () => interopDefault(import("../pages/LoginInstances.page.vue")),
		name: "login-instances",
	},
	{
		path: "/news/new",
		component: () => interopDefault(import("../pages/NewsCreate.page.vue")),
		name: "news-new",
	},
	{
		path: `/news/:id(${REGEX_ID})/edit`,
		component: () => interopDefault(import("../pages/NewsEdit.page.vue")),
		name: "news-id-edit",
	},
	// can this be removed?
	{
		path: "/poc-files",
		component: () => interopDefault(import("../pages/POCFiles.page.vue")),
		name: "poc-files",
	},
	{
		path: `/rooms/:id(${REGEX_ID})`,
		component: () => interopDefault(import("../pages/RoomDetails.page.vue")),
		name: "rooms-id",
	},
	{
		path: "/rooms-list",
		component: () => interopDefault(import("../pages/RoomList.page.vue")),
		name: "rooms-list",
	},
	{
		path: "/rooms-overview",
		component: () => interopDefault(import("../pages/RoomOverview.page.vue")),
		name: "rooms-overview",
	},
	{
		path: "/tasks",
		component: () => interopDefault(import("../pages/TaskOverview.page.vue")),
		name: "tasks",
	},
	// deprecated?
	{
		path: "/termsofuse",
		component: () => interopDefault(import("../pages/TermsOfUse.vue")),
		name: "termsofuse",
	},
	{
		path: "/cfiles",
		component: () =>
			interopDefault(import("@pages/files/FilesOverview.page.vue")),
		name: "files",
	},
	{
		path: "/cfiles/teams",
		component: () =>
			interopDefault(import("@pages/files/FilesOverview.page.vue")),
		name: "teamfiles",
	},
	{
		path: "/cfiles/teams/:catchAll(.*)",
		component: () =>
			interopDefault(import("@pages/files/FilesOverview.page.vue")),
		name: "teamfiles",
	},
];
