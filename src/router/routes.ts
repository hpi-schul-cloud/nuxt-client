import { H5PContentParentType } from "@/h5pEditorApi/v3";
import { Layouts } from "@/layouts/types";
import {
	checkFolderFeature,
	checkRoomsFeature,
	validateQueryParameters,
	roomPermissionGuard,
} from "@/router/guards";
import { createPermissionGuard } from "@/router/guards/permission.guard";
import { ToolContextType } from "@/serverApi/v3";
import {
	isEnum,
	isMongoId,
	isOfficialSchoolNumber,
	REGEX_ACTIVATION_CODE,
	REGEX_ID,
	REGEX_UUID,
} from "@/utils/validation";
import { isDefined } from "@vueuse/core";
import { RouteLocationNormalized, RouteRecordRaw } from "vue-router";

export const routes: Readonly<RouteRecordRaw>[] = [
	{
		path: `/activation/:activationCode(${REGEX_ACTIVATION_CODE})`,
		component: () => import("@/pages/ActivationCode.page.vue"),
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
		path: "/administration/rooms/new",
		component: () => import("@/pages/administration/RoomsOverview.page.vue"),
		name: "administration-rooms-new",
		beforeEnter: createPermissionGuard(["course_administration"]),
		props: (route: RouteLocationNormalized) => ({
			tab: route.query.tab,
		}),
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
			multipleUsersFound: to.query.multipleUsersFound,
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
		path: `/folder/:id(${REGEX_ID})`,
		component: async () => (await import("@page-folder")).FolderPage,
		beforeEnter: [checkFolderFeature],
		name: "folder-id",
		props: (route: RouteLocationNormalized) => ({
			folderId: route.params.id,
		}),
	},
	{
		path: `/rooms`,
		component: async () => (await import("@page-room")).RoomsPage,
		beforeEnter: [
			checkRoomsFeature,
			roomPermissionGuard(["school_create_room"]),
		],
		name: "rooms",
	},
	{
		path: `/rooms/new`,
		component: async () => (await import("@page-room")).RoomCreatePage,
		beforeEnter: [
			checkRoomsFeature,
			createPermissionGuard(["school_create_room"]),
		],
		name: "rooms-new",
	},
	{
		path: `/rooms/:id(${REGEX_ID})`,
		component: async () => (await import("@page-room")).RoomDetailsSwitchPage,
		name: "room-details",
	},
	{
		path: `/rooms/:id(${REGEX_ID})/edit`,
		component: async () => (await import("@page-room")).RoomEditPage,
		beforeEnter: [checkRoomsFeature],
		name: "room-edit",
	},
	{
		path: `/rooms/:id(${REGEX_ID})/members`,
		component: async () => (await import("@page-room")).RoomMembersPage,
		beforeEnter: [
			checkRoomsFeature,
			roomPermissionGuard(["school_create_room"]),
		],
		name: "room-members",
		props: (route: RouteLocationNormalized) => ({
			tab: route.query.tab,
		}),
	},
	{
		path: "/rooms/courses-list",
		component: () => import("@/pages/course-rooms/CourseRoomList.page.vue"),
		name: "course-room-list",
	},
	{
		path: "/rooms-overview",
		redirect: { name: "course-room-overview" },
		name: "rooms-overview",
	},
	{
		path: "/rooms/courses-overview",
		component: () => import("@/pages/course-rooms/CourseRoomOverview.page.vue"),
		name: "course-room-overview",
	},
	{
		path: `/rooms/:id(${REGEX_ID})/board`,
		redirect: { name: "boards-id" },
		name: "rooms-board",
	},
	{
		path: `/boards/:id(${REGEX_ID})`,
		component: async () => (await import("@page-board")).ColumnBoardPage,
		name: "boards-id",
		props: (route: RouteLocationNormalized) => ({
			boardId: route.params.id,
		}),
	},
	{
		path: `/rooms/invitation-link/:id(${REGEX_ID})`,
		component: async () =>
			(await import("@page-room")).RoomInvitationLinkStatusPage,
		name: "rooms-invitation-link-id",
		props: (route: RouteLocationNormalized) => ({
			invitationLinkId: route.params.id,
		}),
	},
	{
		path: "/tasks",
		component: () => import("@/pages/tasks/TaskOverview.page.vue"),
		name: "tasks",
	},
	{
		path: `/tools/context/tool-configuration`,
		component: () =>
			import(
				"@/pages/context-external-tool/CourseContextExternalToolConfigurator.page.vue"
			),
		name: "context-external-tool-configuration",
		beforeEnter: [
			createPermissionGuard(["context_tool_admin"]),
			validateQueryParameters({
				contextId: isMongoId,
				contextType: isEnum(ToolContextType),
			}),
		],
		children: [
			{
				path: ":configId",
				name: "context-external-tool-configuration-edit",
				component: () =>
					import(
						"@/pages/context-external-tool/CourseContextExternalToolConfigurator.page.vue"
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
		path: `/h5p/player/:contentId(${REGEX_ID})`,
		component: () => import("@/pages/h5p/H5PPlayer.page.vue"),
		name: "h5pPlayer",
		beforeEnter: validateQueryParameters({
			parentType: isEnum(H5PContentParentType),
		}),
		props: (to: RouteLocationNormalized) => ({
			parentType: to.query.parentType,
			contentId: to.params.contentId,
		}),
		meta: {
			layout: Layouts.BORDERLESS,
		},
	},
	{
		path: `/h5p/editor/:contentId(${REGEX_ID})?`,
		component: () => import("@/pages/h5p/H5PEditor.page.vue"),
		name: "h5pEditor",
		beforeEnter: validateQueryParameters({
			parentType: isEnum(H5PContentParentType),
			parentId: isMongoId,
		}),
		props: (to: RouteLocationNormalized) => ({
			parentId: to.query.parentId,
			parentType: to.query.parentType,
			contentId: to.params.contentId || undefined,
		}),
		meta: {
			layout: Layouts.BORDERLESS,
		},
	},
	{
		path: `/media-shelf`,
		component: async () => (await import("@page-media-shelf")).MediaShelfPage,
		name: "media-shelf",
	},
	{
		path: "/licenses",
		component: async () => await import("@/pages/LicenseList.page.vue"),
		name: "licenses",
		meta: {
			isPublic: true,
		},
	},
	{
		path: "/",
		component: () => import("@/pages/Home.page.vue"),
		name: "home",
	},
];
