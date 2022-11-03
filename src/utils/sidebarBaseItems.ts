export type SidebarItem = {
	title: string;
	href?: string;
	to?: string;
	source?: string;
	icon: string;
	testId?: string;
	permission?: string;
	excludedPermission?: string;
	activeForUrls?: string[];
	children?: SidebarItem[];
};

const sidebarBaseItems: SidebarItem[] = [
	{
		title: "global.sidebar.overview",
		href: "/dashboard",
		icon: "th-large",
		testId: "Übersicht",
		activeForUrls: ["^/dashboard($|/.*)"],
	},
	{
		title: "global.sidebar.courses",
		to: "/rooms-overview",
		icon: "graduation-cap",
		testId: "Course-Overview",
		activeForUrls: [
			"^/rooms-overview($|/.*)",
			"^/rooms($|/.*)",
			"^/rooms-list($|/.*)",
		],
	},
	{
		title: "global.sidebar.teams",
		href: "/teams",
		icon: "users",
		permission: "TEAMS_ENABLED",
		testId: "Teams",
		activeForUrls: ["^/teams($|/.*)"],
	},
	{
		title: "global.sidebar.tasks",
		to: "/tasks",
		icon: "tasks",
		source: "custom",
		permission: "TASK_DASHBOARD_VIEW_V3",
		testId: "Aufgaben",
		activeForUrls: ["^/tasks($|/.*)"],
	},
	{
		title: "global.sidebar.tasks",
		to: "/tasks",
		icon: "tasks",
		source: "custom",
		permission: "TASK_DASHBOARD_TEACHER_VIEW_V3",
		testId: "Aufgaben",
		activeForUrls: ["^/tasks($|/.*)"],
	},
	{
		title: "global.sidebar.files-old",
		excludedPermission: "COLLABORATIVE_FILES_ONLY",
		href: "/files",
		icon: "folder-open",
		testId: "Meine Dateien",
		activeForUrls: ["^/files($|/.*)"],
		children: [
			{
				title: "global.sidebar.filesPersonal",
				icon: "folder-open-o",
				href: "/files/my/",
				testId: "persönliche Dateien",
				activeForUrls: ["^/files/my($|/.*)"],
			},
			{
				title: "global.sidebar.courses",
				icon: "folder-open-o",
				href: "/files/courses/",
				testId: "Kurse",
				activeForUrls: ["^/files/courses($|/.*)"],
			},
			{
				title: "global.sidebar.teams",
				href: "/files/teams/",
				icon: "folder-open-o",
				permission: "TEAMS_ENABLED",
				testId: "Teams",
				activeForUrls: ["^/files/teams($|/.*)"],
			},
			{
				title: "global.sidebar.filesShared",
				icon: "folder-open-o",
				href: "/files/shared/",
				testId: "geteilte Dateien",
				activeForUrls: ["^/files/shared($|/.*)"],
			},
		],
	},
	{
		title: "global.sidebar.files",
		permission: "COLLABORATIVE_FILES",
		href: "/cfiles",
		icon: "folder-open",
		testId: "Dateien",
		activeForUrls: ["^/cfiles($|/.*)"],
	},
	{
		title: "pages.news.title",
		href: "/news",
		icon: "newspaper-o",
		testId: "Neuigkeiten",
		activeForUrls: ["^/news($|/.*)"],
	},
	{
		title: "global.sidebar.calendar",
		href: "/calendar",
		icon: "table",
		testId: "Termine",
		activeForUrls: ["^/calendar($|/.*)"],
	},
	{
		title: "common.words.lernstore",
		to: "/content",
		icon: "search",
		permission: "LERNSTORE_VIEW",
		testId: "Lern-Store",
		activeForUrls: ["^/content($|/.*)"],
	},
	{
		title: "global.sidebar.addons",
		href: "/addons",
		icon: "puzzle-piece",
		permission: "ADDONS_ENABLED",
		testId: "Add-ons",
		activeForUrls: ["^/addons($|/.*)"],
	},
	{
		title: "global.sidebar.management",
		href: "/administration",
		icon: "cogs",
		permission: "TEACHER_LIST",
		excludedPermission: "ADMIN_VIEW",
		testId: "Verwaltung",
		activeForUrls: ["^/administration($|/.*)"],
		children: [
			{
				title: "global.sidebar.student",
				icon: "odnoklassniki",
				to: "/administration/students",
				permission: "STUDENT_LIST",
				testId: "Schüler:innen",
				activeForUrls: ["^/administration/students($|/.*)"],
			},
			{
				title: "global.sidebar.teacher",
				icon: "user",
				to: "/administration/teachers",
				testId: "Lehrkräfte",
				activeForUrls: ["^/administration/teachers($|/.*)"],
			},
			{
				title: "global.sidebar.classes",
				icon: "users",
				href: "/administration/classes",
				testId: "Klassen",
				activeForUrls: ["^/administration/classes($|/.*)"],
			},
		],
	},
	{
		title: "global.sidebar.management",
		href: "/administration",
		icon: "cogs",
		permission: "ADMIN_VIEW",
		testId: "Verwaltung",
		activeForUrls: ["^/administration($|/.*)"],
		children: [
			{
				title: "global.sidebar.student",
				icon: "odnoklassniki",
				to: "/administration/students",
				testId: "Schüler:innen",
				activeForUrls: ["^/administration/students($|/.*)"],
			},
			{
				title: "global.sidebar.teacher",
				icon: "user",
				to: "/administration/teachers",
				testId: "Lehrkräfte",
				activeForUrls: ["^/administration/teachers($|/.*)"],
			},
			{
				title: "global.sidebar.courses",
				icon: "graduation-cap",
				href: "/administration/courses",
				testId: "Kurse",
				activeForUrls: ["^/administration/courses($|/.*)"],
			},
			{
				title: "global.sidebar.classes",
				icon: "users",
				href: "/administration/classes",
				testId: "Klassen",
				activeForUrls: ["^/administration/classes($|/.*)"],
			},
			{
				title: "global.sidebar.teams",
				icon: "users",
				href: "/administration/teams",
				testId: "Teams",
				activeForUrls: ["^/administration/teams($|/.*)"],
			},
			{
				title: "global.sidebar.school",
				icon: "building",
				href: "/administration/school",
				testId: "Schule",
				activeForUrls: ["^/administration/school($|/.*)"],
			},
		],
	},
	{
		title: "global.sidebar.helpArea",
		href: "/help",
		icon: "question-circle",
		testId: "Hilfebereich",
		activeForUrls: ["^/help($|/.*)"],
	},
	{
		title: "global.sidebar.myMaterial",
		href: "/my-material/",
		icon: "book",
		permission: "BETA_FEATURES",
		testId: "Meine Materialien",
		activeForUrls: ["^/my-material($|/.*)"],
	},
];
export default sidebarBaseItems;
