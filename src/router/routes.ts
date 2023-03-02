import { isString } from "@vueuse/core";
import { isDef } from "@vueuse/shared";
import { Route, RouteConfig } from "vue-router";
import { createPermissionGuard } from "@/router/guards/permission.guard";
import { Layouts } from "@/layouts/types";
import { NavigationGuardNext } from "vue-router/types/router";
import { useApplicationError } from "@/composables/application-error.composable";
import { applicationErrorModule } from "@/store";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";

const REGEX_ID = "[a-z0-9]{24}";
const REGEX_UUID =
	"[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}";
const REGEX_ACTIVATION_CODE = "[a-z0-9]+";
const isMongoId = (val: unknown) =>
	isDef(val) && isString(val) && new RegExp(REGEX_ID).test(val);

export const routes: Array<RouteConfig> = [
	{
		path: `/activation/:activationCode(${REGEX_ACTIVATION_CODE})`,
		component: () => import("../pages/ActivationCode.page.vue"),
		name: "activation-activationCode",
		meta: {
			isPublic: true,
			layout: Layouts.LOGGED_OUT,
		},
	},
	{
		path: "/administration/ldap/activate",
		component: () => import("../pages/administration/LDAPActivate.page.vue"),
		name: "administration-ldap-activate",
		beforeEnter: createPermissionGuard(["admin_view", "school_edit"]),
	},
	{
		path: "/administration/ldap/config",
		component: () => import("../pages/administration/LDAPConfig.page.vue"),
		name: "administration-ldap-config",
		beforeEnter: createPermissionGuard(["admin_view", "school_edit"]),
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
		beforeEnter: createPermissionGuard(["school_edit"]),
	},
	{
		path: "/administration/school-settings/tool",
		component: () =>
			import(
				"../pages/administration/external-tool/ExternalToolConfigOverview.page.vue"
			),
		name: "administration-tool-config-overview",
		beforeEnter: createPermissionGuard(["school_tool_admin"]),
	},
	{
		path: "/administration/students",
		component: () => import("../pages/administration/StudentOverview.page.vue"),
		name: "administration-students",
		beforeEnter: createPermissionGuard(["student_list"]),
	},
	{
		path: "/administration/students/consent",
		component: () => import("../pages/administration/StudentConsent.page.vue"),
		name: "administration-students-consent",
		beforeEnter: createPermissionGuard(["student_edit", "student_list"]),
	},
	{
		path: "/administration/students/new",
		component: () => import("../pages/administration/StudentCreate.page.vue"),
		name: "administration-students-new",
		beforeEnter: createPermissionGuard(["student_create"]),
	},
	{
		path: "/administration/teachers",
		component: () => import("../pages/administration/TeacherOverview.page.vue"),
		name: "administration-teachers",
		beforeEnter: createPermissionGuard(["teacher_list"]),
	},
	{
		path: "/administration/teachers/new",
		component: () => import("../pages/administration/TeacherCreate.page.vue"),
		name: "administration-teachers-new",
		beforeEnter: createPermissionGuard(["teacher_create"]),
	},
	{
		path: "/content",
		component: () => import("../pages/LernStoreOverview.page.vue"),
		name: "content",
		beforeEnter: createPermissionGuard(["lernstore_view"]),
	},
	{
		path: `/content/:id(${REGEX_UUID})`,
		component: () => import("../pages/LernStoreDetails.page.vue"),
		name: "content-id",
		meta: {
			layout: Layouts.LERN_STORE,
		},
		beforeEnter: createPermissionGuard(["lernstore_view"]),
	},
	{
		path: "/error",
		component: () => import("@/pages/Error.page.vue"),
		name: "error",
		meta: {
			isPublic: true,
		},
	},
	{
		path: "/error/proxy",
		component: () => import("../pages/ProxyError.page.vue"),
		name: "error-proxy",
		meta: {
			isPublic: true,
		},
	},
	{
		path: "/imprint",
		component: () => import("../pages/Imprint.page.vue"),
		name: "imprint",
		meta: {
			isPublic: true,
		},
	},
	// deprecated?
	{
		path: "/login-instances",
		component: () => import("../pages/LoginInstances.page.vue"),
		name: "login-instances",
		meta: {
			isPublic: true,
			layout: Layouts.LOGGED_OUT,
		},
	},
	{
		path: "/news/new",
		component: () => import("../pages/NewsCreate.page.vue"),
		name: "news-new",
		beforeEnter: createPermissionGuard(["news_create"]),
	},
	{
		path: `/news/:id(${REGEX_ID})/edit`,
		component: () => import("../pages/NewsEdit.page.vue"),
		name: "news-id-edit",
		beforeEnter: createPermissionGuard(["news_edit"]),
	},
	{
		path: `/rooms/:id(${REGEX_ID})`,
		component: () => import("../pages/RoomDetails.page.vue"),
		name: "rooms-id",
	},
	{
		path: `/rooms/:id(${REGEX_ID})/board`,
		component: () => import("../components/feature-board/Board.vue"),
		name: "rooms-board",
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
	{
		path: `/task-cards/:id(${REGEX_ID})/edit`,
		component: () => import("../pages/TaskCard.page.vue"),
		name: "task-card-edit",
		beforeEnter: createPermissionGuard(["task_card_edit"]),
	},
	{
		path: "/task-cards/new",
		component: () => import("../pages/TaskCard.page.vue"),
		name: "task-card-new",
		beforeEnter: createPermissionGuard(["task_card_edit"]),
	},
	// deprecated?
	{
		path: "/termsofuse",
		component: () => import("../pages/TermsOfUse.vue"),
		name: "termsofuse",
		meta: {
			isPublic: true,
			layout: Layouts.LOGGED_OUT,
		},
	},
	{
		path: "/cfiles",
		component: () => import("@/pages/files/FilesOverview.page.vue"),
		name: "files",
		beforeEnter: createPermissionGuard(["collaborative_files"], "/tasks"),
	},
	{
		path: "/cfiles/teams/:catchAll(.*)",
		component: () => import("@/pages/files/FilesOverview.page.vue"),
		name: "teamfiles",
		beforeEnter: createPermissionGuard(["collaborative_files"], "/tasks"),
	},
	{
		path: "/migration",
		component: () =>
			import("@/pages/user-login-migration/UserLoginMigrationConsent.page.vue"),
		name: "user-login-migration-consent",
		beforeEnter: (to: Route, from: Route, next: NavigationGuardNext) => {
			const { createApplicationError } = useApplicationError();

			if (
				isMongoId(to.query.sourceSystem) &&
				isMongoId(to.query.targetSystem) &&
				isMongoId(to.query.origin) &&
				(to.query.origin === to.query.sourceSystem ||
					to.query.origin === to.query.targetSystem)
			) {
				return next();
			}

			applicationErrorModule.setError(
				createApplicationError(HttpStatusCode.BadRequest)
			);
		},
		props: (route: Route) => ({
			sourceSystem: route.query.sourceSystem,
			targetSystem: route.query.targetSystem,
			origin: route.query.origin,
			mandatory: route.query.mandatory === "true",
		}),
		meta: {
			isPublic: true,
			layout: Layouts.LOGGED_OUT,
		},
	},
	{
		path: "/migration/success",
		component: () =>
			import("@/pages/user-login-migration/UserLoginMigrationSuccess.page.vue"),
		name: "user-login-migration-success",
		beforeEnter: (to: Route, from: Route, next: NavigationGuardNext) => {
			const { createApplicationError } = useApplicationError();

			if (
				isMongoId(to.query.sourceSystem) &&
				isMongoId(to.query.targetSystem)
			) {
				return next();
			}

			applicationErrorModule.setError(
				createApplicationError(HttpStatusCode.BadRequest)
			);
		},
		props: (route: Route) => ({
			sourceSystem: route.query.sourceSystem,
			targetSystem: route.query.targetSystem,
		}),
		meta: {
			isPublic: true,
			layout: Layouts.LOGGED_OUT,
		},
	},
];
