import { H5PContentParentType } from "@/h5pEditorApi/v3";
import { Layouts } from "@/layouts/types";
import { Multiguard, validateQueryParameters } from "@/router/guards";
import { createPermissionGuard } from "@/router/guards/permission.guard";
import { ToolContextType } from "@/serverApi/v3";
import {
	REGEX_ACTIVATION_CODE,
	REGEX_H5P_ID,
	REGEX_ID,
	REGEX_UUID,
	isEnum,
	isMongoId,
	isOfficialSchoolNumber,
} from "@/utils/validationUtil";
import { isDefined } from "@vueuse/core";
import { RouteLocationNormalized, RouteRecordRaw } from "vue-router";

// routes configuration sorted in alphabetical order
export const routes: Readonly<RouteRecordRaw[]> = [
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
				component: () =>
					import(
						"@/pages/administration/school-external-tool/SchoolExternalToolConfigurator.page.vue"
					),
			},
		],
		props: (to: RouteLocationNormalized) => ({
			configId: to.params.configId,
		}),
	},
	{
		path: "/administration/school-settings/provisioning-options",
		component: () =>
			import("@/components/administration/ProvisioningOptionsPage.vue"),
		name: "provivisioning-options-page",
		beforeEnter: createPermissionGuard([
			"school_system_view",
			"school_system_edit",
		]),
		props: (to: RouteLocationNormalized) => ({
			systemId: to.query.systemId,
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
		path: "/administration/groups/classes",
		component: () => import("@/pages/administration/ClassOverview.page.vue"),
		name: "administration-groups-classes",
		beforeEnter: createPermissionGuard(["class_list", "group_list"]),
		props: (route: RouteLocationNormalized) => ({
			tab: route.query.tab,
		}),
	},
	{
		path: `/administration/groups/classes/:groupId(${REGEX_ID})`,
		name: "administration-groups-classes-members",
		component: async () =>
			(await import("@page-class-members")).ClassMembersPage,
		beforeEnter: createPermissionGuard(["group_view"]),
		props: (to: RouteLocationNormalized) => ({
			groupId: to.params.groupId,
		}),
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
		meta: {
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
		props: (to: RouteLocationNormalized) => ({
			sourceSchoolNumber: to.query.sourceSchoolNumber,
			targetSchoolNumber: to.query.targetSchoolNumber,
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
		beforeEnter: validateQueryParameters({
			targetSystem: isMongoId,
		}),
		props: (to: RouteLocationNormalized) => ({
			targetSystem: to.query.targetSystem,
		}),
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
		props: (route: RouteLocationNormalized) => ({
			boardId: route.params.id,
		}),
	},
	{
		path: `/rooms/:id(${REGEX_ID})/create/board`,
		component: async () => (await import("@page-board")).CreateColumnBoardPage,
		name: "rooms-new-board",
		props: (route: RouteLocationNormalized) => ({
			courseId: route.params.id,
		}),
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
				component: () =>
					import(
						"@/pages/context-external-tool/ContextExternalToolConfigurator.page.vue"
					),
			},
		],
		props: (to: RouteLocationNormalized) => ({
			contextId: to.query.contextId,
			contextType: to.query.contextType,
			configId: to.params.configId,
		}),
	},
	{
		path: `/h5p/player/:id(${REGEX_H5P_ID})`,
		component: () => import("../pages/h5p/H5PPlayer.page.vue"),
		name: "h5pPlayer",
		//beforeEnter: createPermissionGuard(["H5P"]),
	},
	{
		path: `/h5p/editor/:id(${REGEX_H5P_ID})?`,
		component: () => import("../pages/h5p/H5PEditor.page.vue"),
		name: "h5pEditor",
		beforeEnter: validateQueryParameters({
			parentType: isEnum(H5PContentParentType),
			parentId: isMongoId,
		}),
		props: (to: RouteLocationNormalized) => ({
			parentId: to.query.parentId,
			parentType: to.query.parentType,
		}),
	},
];
