import { ConfigResponse } from "@/serverApi/v3/api";
import { mdiBookshelf } from "@mdi/js";

export type SidebarItemBase = {
	title: string;
	icon: string;
	testId: string;
	permission?: string;
	excludedPermission?: string;
	activeForUrls: string[];
	feature?: keyof ConfigResponse;
	featureValue?: string | number | boolean;
};

export type SidebarItemExternalLink = {
	href: string;
};

export type SidebarItemRouterLink = {
	to: string;
};

export type SidebarItem = SidebarItemBase &
	(SidebarItemExternalLink | SidebarItemRouterLink);

export type SidebarCategoryItem = SidebarItem & {
	children: SidebarItem[];
};

export type SidebarItemList = (SidebarItem | SidebarCategoryItem)[];

/**
 * @deprecated use useSidebarItems composable
 */
const getSidebarItems = (): SidebarItemList => [
	{
		title: "global.sidebar.item.overview",
		href: "/dashboard",
		icon: "$mdiViewGridOutline",
		testId: "Übersicht",
		activeForUrls: ["^/dashboard($|/.*)"],
	},
	{
		title: "global.sidebar.item.courses",
		to: "/rooms-overview",
		icon: "$mdiSchoolOutline",
		testId: "Course-Overview",
		activeForUrls: [
			"^/rooms-overview($|/.*)",
			"^/rooms($|/.*)",
			"^/rooms-list($|/.*)",
		],
	},
	{
		title: "global.sidebar.item.teams",
		href: "/teams",
		icon: "$mdiAccountGroupOutline",
		permission: "TEAMS_ENABLED",
		testId: "Teams",
		activeForUrls: ["^/teams($|/.*)"],
	},
	{
		title: "global.sidebar.item.tasks",
		to: "/tasks",
		icon: "$mdiFormatListChecks",
		permission: "TASK_DASHBOARD_VIEW_V3",
		testId: "Aufgaben",
		activeForUrls: ["^/tasks($|/.*)"],
	},
	{
		title: "global.sidebar.item.tasks",
		to: "/tasks",
		icon: "$mdiFormatListChecks",
		permission: "TASK_DASHBOARD_TEACHER_VIEW_V3",
		testId: "Aufgaben",
		activeForUrls: ["^/tasks($|/.*)"],
	},
	{
		title: "global.sidebar.item.files-old",
		href: "/files",
		icon: "$mdiFolderOpenOutline",
		testId: "Dateien",
		activeForUrls: ["^/files($|/.*)"],
		children: [
			{
				title: "global.sidebar.item.filesPersonal",
				icon: "$folder_open_user_outline",
				href: "/files/my/",
				testId: "persönliche Dateien",
				activeForUrls: ["^/files/my($|/.*)"],
			},
			{
				title: "global.sidebar.item.courses",
				icon: "$folder_open_courses_outline",
				href: "/files/courses/",
				testId: "Kurse",
				activeForUrls: ["^/files/courses($|/.*)"],
			},
			{
				title: "global.sidebar.item.teams",
				href: "/files/teams/",
				icon: "$folder_open_teams_outline",
				permission: "TEAMS_ENABLED",
				testId: "Teams",
				activeForUrls: ["^/files/teams($|/.*)"],
			},
			{
				title: "global.sidebar.item.filesShared",
				icon: "$folder_open_shared_outline",
				href: "/files/shared/",
				testId: "geteilte Dateien",
				activeForUrls: ["^/files/shared($|/.*)"],
			},
		],
	},
	{
		title: "pages.news.title",
		href: "/news",
		icon: "$mdiNewspaperVariantOutline",
		testId: "Neuigkeiten",
		activeForUrls: ["^/news($|/.*)"],
	},
	{
		title: "global.sidebar.item.calendar",
		href: "/calendar",
		icon: "$mdiCalendarOutline",
		testId: "Termine",
		activeForUrls: ["^/calendar($|/.*)"],
	},
	{
		title: "common.words.lernstore",
		to: "/content",
		icon: "$lernstore_outline",
		permission: "LERNSTORE_VIEW",
		testId: "Lern-Store",
		activeForUrls: ["^/content($|/.*)"],
	},
	{
		title: "feature.media-shelf.title",
		to: "/media-shelf",
		icon: mdiBookshelf,
		testId: "Media-shelf",
		activeForUrls: ["^/media-shelf($|/.*)"],
		feature: "FEATURE_MEDIA_SHELF_ENABLED",
	},
	{
		title: "global.sidebar.item.addons",
		href: "/addons",
		icon: "$mdiPuzzleOutline",
		permission: "ADDONS_ENABLED",
		testId: "Add-ons",
		activeForUrls: ["^/addons($|/.*)"],
	},
	{
		title: "global.sidebar.item.management",
		href: "/administration",
		icon: "$mdiCogOutline",
		permission: "TEACHER_LIST",
		excludedPermission: "ADMIN_VIEW",
		testId: "Verwaltung",
		activeForUrls: ["^/administration($|/.*)"],
		children: [
			{
				title: "global.sidebar.item.student",
				icon: "$mdiAccountSchoolOutline",
				to: "/administration/students",
				permission: "STUDENT_LIST",
				testId: "Schüler:innen",
				activeForUrls: ["^/administration/students($|/.*)"],
			},
			{
				title: "global.sidebar.item.teacher",
				icon: "$teacher",
				to: "/administration/teachers",
				testId: "Lehrkräfte",
				activeForUrls: ["^/administration/teachers($|/.*)"],
			},
			{
				title: "global.sidebar.item.classes",
				icon: "$class",
				to: "/administration/groups/classes",
				testId: "Klassen",
				activeForUrls: ["^/administration/groups/classes($|/.*)"],
			},
			// {
			// 	title: "global.sidebar.item.classes",
			// 	icon: "$class",
			// 	href: "/administration/classes",
			// 	testId: "Klassen",
			// 	activeForUrls: ["^/administration/classes($|/.*)"],
			// 	feature: "FEATURE_SHOW_NEW_CLASS_VIEW_ENABLED",
			// 	featureValue: false,
			// },
		],
	},
	{
		title: "global.sidebar.item.management",
		href: "/administration",
		icon: "$mdiCogOutline",
		permission: "ADMIN_VIEW",
		testId: "Verwaltung",
		activeForUrls: ["^/administration($|/.*)"],
		children: [
			{
				title: "global.sidebar.item.student",
				icon: "$mdiAccountSchoolOutline",
				to: "/administration/students",
				testId: "Schüler:innen",
				activeForUrls: ["^/administration/students($|/.*)"],
			},
			{
				title: "global.sidebar.item.teacher",
				icon: "$teacher",
				to: "/administration/teachers",
				testId: "Lehrkräfte",
				activeForUrls: ["^/administration/teachers($|/.*)"],
			},
			{
				title: "global.sidebar.item.courses",
				icon: "$mdiSchoolOutline",
				href: "/administration/courses",
				testId: "Kurse",
				activeForUrls: ["^/administration/courses($|/.*)"],
			},
			{
				title: "global.sidebar.item.classes",
				icon: "$class",
				to: "/administration/groups/classes",
				testId: "Klassen",
				activeForUrls: ["^/administration/groups/classes($|/.*)"],
				feature: "FEATURE_SHOW_NEW_CLASS_VIEW_ENABLED",
			},
			// {
			// 	title: "global.sidebar.item.classes",
			// 	icon: "$class",
			// 	href: "/administration/classes",
			// 	testId: "Klassen",
			// 	activeForUrls: ["^/administration/classes($|/.*)"],
			// 	feature: "FEATURE_SHOW_NEW_CLASS_VIEW_ENABLED",
			// 	featureValue: false,
			// },
			{
				title: "global.sidebar.item.teams",
				icon: "$mdiAccountGroupOutline",
				href: "/administration/teams",
				testId: "Teams",
				activeForUrls: ["^/administration/teams($|/.*)"],
			},
			{
				title: "global.sidebar.item.school",
				icon: "$school_outline",
				to: "/administration/school-settings",
				testId: "Schule",
				activeForUrls: [
					"^/administration/school($|/.*)",
					"^/administration/school-settings($|/.*)",
				],
				feature: "FEATURE_NEW_SCHOOL_ADMINISTRATION_PAGE_AS_DEFAULT_ENABLED",
			},
			{
				title: "global.sidebar.item.school",
				icon: "$school_outline",
				href: "/administration/school",
				testId: "Schule",
				activeForUrls: [
					"^/administration/school($|/.*)",
					"^/administration/school-settings($|/.*)",
				],
				feature: "FEATURE_NEW_SCHOOL_ADMINISTRATION_PAGE_AS_DEFAULT_ENABLED",
				featureValue: false,
			},
		],
	},
	{
		title: "global.sidebar.item.helpArea",
		href: "/help",
		icon: "$mdiHelpCircleOutline",
		testId: "Hilfebereich",
		activeForUrls: ["^/help($|/.*)"],
	},
];

export default getSidebarItems;
