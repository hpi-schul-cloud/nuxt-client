export type SidebarItemBase = {
	title: string;
	icon: string;
	source?: "material" | "custom";
	testId: string;
	permission?: string;
	excludedPermission?: string;
	activeForUrls: string[];
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

const getSidebarItems = (
	isNewSchoolAdminPageDefault: boolean
): SidebarItemList => [
	{
		title: "global.sidebar.overview",
		href: "/dashboard",
		icon: "$mdiViewGridOutline",
		testId: "Übersicht",
		activeForUrls: ["^/dashboard($|/.*)"],
	},
	{
		title: "global.sidebar.courses",
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
		title: "global.sidebar.teams",
		href: "/teams",
		icon: "$mdiAccountGroupOutline",
		permission: "TEAMS_ENABLED",
		testId: "Teams",
		activeForUrls: ["^/teams($|/.*)"],
	},
	{
		title: "global.sidebar.tasks",
		to: "/tasks",
		icon: "$mdiFormatListChecks",
		permission: "TASK_DASHBOARD_VIEW_V3",
		testId: "Aufgaben",
		activeForUrls: ["^/tasks($|/.*)"],
	},
	{
		title: "global.sidebar.tasks",
		to: "/tasks",
		icon: "$mdiFormatListChecks",
		permission: "TASK_DASHBOARD_TEACHER_VIEW_V3",
		testId: "Aufgaben",
		activeForUrls: ["^/tasks($|/.*)"],
	},
	{
		title: "global.sidebar.files-old",
		excludedPermission: "COLLABORATIVE_FILES_ONLY",
		href: "/files",
		icon: "$mdiFolderOpenOutline",
		testId: "Meine Dateien",
		activeForUrls: ["^/files($|/.*)"],
		children: [
			{
				title: "global.sidebar.filesPersonal",
				icon: "$folder_open_user_outline",
				source: "custom",
				href: "/files/my/",
				testId: "persönliche Dateien",
				activeForUrls: ["^/files/my($|/.*)"],
			},
			{
				title: "global.sidebar.courses",
				icon: "$folder_open_courses_outline",
				source: "custom",
				href: "/files/courses/",
				testId: "Kurse",
				activeForUrls: ["^/files/courses($|/.*)"],
			},
			{
				title: "global.sidebar.teams",
				href: "/files/teams/",
				icon: "$folder_open_teams_outline",
				source: "custom",
				permission: "TEAMS_ENABLED",
				testId: "Teams",
				activeForUrls: ["^/files/teams($|/.*)"],
			},
			{
				title: "global.sidebar.filesShared",
				icon: "folder_open_shared_outline",
				source: "custom",
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
		icon: "$mdiFolderOpenOutline",
		testId: "Dateien",
		activeForUrls: ["^/cfiles($|/.*)"],
	},
	{
		title: "pages.news.title",
		href: "/news",
		icon: "$mdiNewspaperVariantOutline",
		testId: "Neuigkeiten",
		activeForUrls: ["^/news($|/.*)"],
	},
	{
		title: "global.sidebar.calendar",
		href: "/calendar",
		icon: "$mdiCalendarOutline",
		testId: "Termine",
		activeForUrls: ["^/calendar($|/.*)"],
	},
	{
		title: "common.words.lernstore",
		to: "/content",
		icon: "$lernstore_outline",
		source: "custom",
		permission: "LERNSTORE_VIEW",
		testId: "Lern-Store",
		activeForUrls: ["^/content($|/.*)"],
	},
	{
		title: "global.sidebar.addons",
		href: "/addons",
		icon: "$mdiPuzzleOutline",
		permission: "ADDONS_ENABLED",
		testId: "Add-ons",
		activeForUrls: ["^/addons($|/.*)"],
	},
	{
		title: "global.sidebar.management",
		href: "/administration",
		icon: "$mdiCogOutline",
		permission: "TEACHER_LIST",
		excludedPermission: "ADMIN_VIEW",
		testId: "Verwaltung",
		activeForUrls: ["^/administration($|/.*)"],
		children: [
			{
				title: "global.sidebar.student",
				icon: "students_outline",
				to: "/administration/students",
				permission: "STUDENT_LIST",
				testId: "Schüler:innen",
				activeForUrls: ["^/administration/students($|/.*)"],
			},
			{
				title: "global.sidebar.teacher",
				icon: "teacher",
				source: "custom",
				to: "/administration/teachers",
				testId: "Lehrkräfte",
				activeForUrls: ["^/administration/teachers($|/.*)"],
			},
			{
				title: "global.sidebar.classes",
				icon: "class",
				source: "custom",
				href: "/administration/classes",
				testId: "Klassen",
				activeForUrls: ["^/administration/classes($|/.*)"],
			},
		],
	},
	{
		title: "global.sidebar.management",
		href: "/administration",
		icon: "setting_outline",
		permission: "ADMIN_VIEW",
		testId: "Verwaltung",
		activeForUrls: ["^/administration($|/.*)"],
		children: [
			{
				title: "global.sidebar.student",
				icon: "students_outline",
				to: "/administration/students",
				testId: "Schüler:innen",
				activeForUrls: ["^/administration/students($|/.*)"],
			},
			{
				title: "global.sidebar.teacher",
				icon: "teacher",
				source: "custom",
				to: "/administration/teachers",
				testId: "Lehrkräfte",
				activeForUrls: ["^/administration/teachers($|/.*)"],
			},
			{
				title: "global.sidebar.courses",
				icon: "course_outline",
				href: "/administration/courses",
				testId: "Kurse",
				activeForUrls: ["^/administration/courses($|/.*)"],
			},
			{
				title: "global.sidebar.classes",
				icon: "class",
				source: "custom",
				href: "/administration/classes",
				testId: "Klassen",
				activeForUrls: ["^/administration/classes($|/.*)"],
			},
			{
				title: "global.sidebar.teams",
				icon: "team_outline",
				href: "/administration/teams",
				testId: "Teams",
				activeForUrls: ["^/administration/teams($|/.*)"],
			},
			isNewSchoolAdminPageDefault
				? {
						title: "global.sidebar.school",
						icon: "school_outline",
						source: "custom",
						to: "/administration/school-settings",
						testId: "Schule",
						activeForUrls: [
							"^/administration/school($|/.*)",
							"^/administration/school-settings($|/.*)",
						],
				  }
				: {
						title: "global.sidebar.school",
						icon: "school_outline",
						source: "custom",
						href: "/administration/school",
						testId: "Schule",
						activeForUrls: [
							"^/administration/school($|/.*)",
							"^/administration/school-settings($|/.*)",
						],
				  },
		],
	},
	{
		title: "global.sidebar.helpArea",
		href: "/help",
		icon: "help_area_outline",
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
export default getSidebarItems;
