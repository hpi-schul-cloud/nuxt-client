import { Route, RouteConfig } from "vue-router";
import { createPermissionGuard } from "@/router/guards/permission.guard";
import { Layouts } from "@/layouts/types";
import { Multiguard, validateQueryParameters } from "@/router/guards";
import {
	isEnum,
	isMongoId,
	isOfficialSchoolNumber,
	REGEX_ACTIVATION_CODE,
	REGEX_ID,
	REGEX_UUID,
} from "@/utils/validationUtil";
import { isDefined } from "@vueuse/core";
import { ToolContextType } from "@/store/external-tool/tool-context-type.enum";

// routes configuration sorted in alphabetical order
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
		component: () => import("@/pages/administration/LDAPActivate.page.vue"),
		name: "administration-ldap-activate",
		beforeEnter: createPermissionGuard(["admin_view", "school_edit"]),
	},
	{
		path: "/administration/ldap/config",
		component: () => import("@/pages/administration/LDAPConfig.page.vue"),
		name: "administration-ldap-config",
		beforeEnter: createPermissionGuard(["admin_view", "school_edit"]),
	},
	{
		path: "/administration/migration",
		component: () => import("@/pages/administration/Migration.page.vue"),
		name: "administration-migration",
	},
	{
		path: "/administration/school-settings",
		component: () => import("@/pages/administration/SchoolSettings.page.vue"),
		name: "administration-school-settings",
		beforeEnter: createPermissionGuard(["school_edit"]),
	},
	{
		path: "/administration/school-settings/tool-configuration",
		component: () =>
			import(
				"@/pages/administration/school-external-tool/SchoolExternalToolConfigurator.page.vue"
			),
		name: "administration-tool-config-overview",
		beforeEnter: createPermissionGuard(["school_tool_admin"]),
		children: [
			{
				path: ":configId",
				name: "administration-tool-config-edit",
			},
		],
		props: (route: Route) => ({
			configId: route.params.configId,
		}),
	},
	{
		path: "/administration/students",
		component: () => import("@/pages/administration/StudentOverview.page.vue"),
		name: "administration-students",
		beforeEnter: createPermissionGuard(["student_list"]),
	},
	{
		path: "/administration/students/consent",
		component: () => import("@/pages/administration/StudentConsent.page.vue"),
		name: "administration-students-consent",
		beforeEnter: createPermissionGuard(["student_edit", "student_list"]),
	},
	{
		path: "/administration/students/new",
		component: () => import("@/pages/administration/StudentCreate.page.vue"),
		name: "administration-students-new",
		beforeEnter: createPermissionGuard(["student_create"]),
	},
	{
		path: "/administration/teachers",
		component: () => import("@/pages/administration/TeacherOverview.page.vue"),
		name: "administration-teachers",
		beforeEnter: createPermissionGuard(["teacher_list"]),
	},
	{
		path: "/administration/teachers/new",
		component: () => import("@/pages/administration/TeacherCreate.page.vue"),
		name: "administration-teachers-new",
		beforeEnter: createPermissionGuard(["teacher_create"]),
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
		path: "/content",
		component: () => import("@/pages/LernStoreOverview.page.vue"),
		name: "content",
		beforeEnter: createPermissionGuard(["lernstore_view"]),
	},
	{
		path: `/content/:id(${REGEX_UUID})`,
		component: () => import("@/pages/LernStoreDetails.page.vue"),
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
		component: () => import("@/pages/ProxyError.page.vue"),
		name: "error-proxy",
		meta: {
			isPublic: true,
		},
	},
	{
		path: "/imprint",
		component: () => import("@/pages/Imprint.page.vue"),
		name: "imprint",
		meta: {
			isPublic: true,
		},
	},
	{
		path: "/migration",
		component: () =>
			import("@/pages/user-login-migration/UserLoginMigrationConsent.page.vue"),
		name: "user-login-migration-consent",
		beforeEnter: validateQueryParameters({
			origin: (value: unknown, to: Route) =>
				!isDefined(value) ||
				(isMongoId(value) &&
					(value === to.query.sourceSystem || value === to.query.targetSystem)),
		}),
		props: (route: Route) => ({
			origin: route.query.origin,
		}),
		meta: {
			isPublic: true,
			layout: Layouts.LOGGED_OUT,
		},
	},
	{
		path: "/migration/error",
		component: () =>
			import("@/pages/user-login-migration/UserLoginMigrationError.page.vue"),
		name: "user-login-migration-error",
		beforeEnter: validateQueryParameters({
			sourceSchoolNumber: (value: unknown) =>
				!isDefined(value) || isOfficialSchoolNumber(value),
			targetSchoolNumber: (value: unknown) =>
				!isDefined(value) || isOfficialSchoolNumber(value),
		}),
		props: (route: Route) => ({
			sourceSchoolNumber: route.query.sourceSchoolNumber,
			targetSchoolNumber: route.query.targetSchoolNumber,
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
		meta: {
			isPublic: true,
			layout: Layouts.LOGGED_OUT,
		},
	},
	{
		path: "/news/new",
		component: () => import("@/pages/NewsCreate.page.vue"),
		name: "news-new",
		beforeEnter: createPermissionGuard(["news_create"]),
	},
	{
		path: `/news/:id(${REGEX_ID})/edit`,
		component: () => import("@/pages/NewsEdit.page.vue"),
		name: "news-id-edit",
		beforeEnter: createPermissionGuard(["news_edit"]),
	},
	{
		path: `/rooms/:id(${REGEX_ID})`,
		component: () => import("@/pages/rooms/RoomDetails.page.vue"),
		name: "rooms-id",
	},
	{
		path: `/rooms/:id(${REGEX_ID})/board`,
		component: async () => (await import("@page-board")).ColumnBoardPage,
		name: "rooms-board",
	},
	{
		path: "/rooms-list",
		component: () => import("@/pages/rooms/RoomList.page.vue"),
		name: "rooms-list",
	},
	{
		path: "/rooms-overview",
		component: () => import("@/pages/rooms/RoomOverview.page.vue"),
		name: "rooms-overview",
	},
	{
		path: "/tasks",
		component: () => import("../pages/tasks/TaskOverview.page.vue"),
		name: "tasks",
	},
	{
		path: `/tools/context/tool-configuration`,
		component: () =>
			import(
				"@/pages/context-external-tool/ContextExternalToolConfigurator.page.vue"
			),
		name: "context-external-tool-configuration",
		beforeEnter: Multiguard([
			createPermissionGuard(["context_tool_admin"]),
			validateQueryParameters({
				contextId: isMongoId,
				contextType: isEnum(ToolContextType),
			}),
		]),
		children: [
			{
				path: ":configId",
				name: "context-external-tool-configuration-edit",
			},
		],
		props: (route: Route) => ({
			contextId: route.query.contextId,
			contextType: route.query.contextType,
			configId: route.params.configId,
		}),
	},
	{
		// deprecated?
		path: "/termsofuse",
		component: () => import("@/pages/TermsOfUse.vue"),
		name: "termsofuse",
		meta: {
			isPublic: true,
			layout: Layouts.LOGGED_OUT,
		},
	},
];
