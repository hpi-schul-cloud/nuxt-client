import { envConfigModule } from "@/store";
import { SidebarItems } from "./types";

const getSidebarItems = (
	isNewSchoolAdminPageDefault: boolean
): SidebarItems => [
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
	// TODO - merge these?
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
		icon: "$mdiFolderOpenOutline",
		testId: "Meine Dateien",
		activeForUrls: ["^/files($|/.*)"],
		children: [
			{
				title: "global.sidebar.filesPersonal",
				href: "/files/my/",
				testId: "persönliche Dateien",
				activeForUrls: ["^/files/my($|/.*)"],
			},
			{
				title: "global.sidebar.courses",
				href: "/files/courses/",
				testId: "Kurse",
				activeForUrls: ["^/files/courses($|/.*)"],
			},
			{
				title: "global.sidebar.teams",
				href: "/files/teams/",
				permission: "TEAMS_ENABLED",
				testId: "Teams",
				activeForUrls: ["^/files/teams($|/.*)"],
			},
			{
				title: "global.sidebar.filesShared",
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
		icon: "$mdiCogOutline",
		permission: "TEACHER_LIST",
		testId: "Verwaltung",
		activeForUrls: ["^/administration($|/.*)"],
		children: [
			{
				title: "global.sidebar.student",
				to: "/administration/students",
				permission: "STUDENT_LIST",
				testId: "Schüler:innen",
				activeForUrls: ["^/administration/students($|/.*)"],
			},
			{
				title: "global.sidebar.teacher",
				to: "/administration/teachers",
				testId: "Lehrkräfte",
				activeForUrls: ["^/administration/teachers($|/.*)"],
			},
			{
				title: "global.sidebar.courses",
				href: "/administration/courses",
				permission: "ADMIN_VIEW",
				testId: "Kurse",
				activeForUrls: ["^/administration/courses($|/.*)"],
			},
			envConfigModule.getEnv.FEATURE_SHOW_NEW_CLASS_VIEW_ENABLED
				? {
						title: "global.sidebar.classes",
						href: "/administration/groups/classes",
						testId: "Klassen",
						activeForUrls: ["^/administration/groups/classes($|/.*)"],
					}
				: {
						title: "global.sidebar.classes",
						href: "/administration/classes",
						testId: "Klassen",
						activeForUrls: ["^/administration/classes($|/.*)"],
					},
			{
				title: "global.sidebar.teams",
				href: "/administration/teams",
				permission: "ADMIN_VIEW",
				testId: "Teams",
				activeForUrls: ["^/administration/teams($|/.*)"],
			},
			isNewSchoolAdminPageDefault
				? {
						title: "global.sidebar.school",
						to: "/administration/school-settings",
						permission: "ADMIN_VIEW",
						testId: "Schule",
						activeForUrls: [
							"^/administration/school($|/.*)",
							"^/administration/school-settings($|/.*)",
						],
					}
				: {
						title: "global.sidebar.school",
						href: "/administration/school",
						permission: "ADMIN_VIEW",
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
		icon: "$mdiHelpCircleOutline",
		testId: "Hilfebereich",
		activeForUrls: ["^/help($|/.*)"],
		children: [
			{
				title: "global.topbar.actions.helpSection",
				href: "/help",
				target: "_self",
				testId: "help-articles",
				activeForUrls: ["^/help($|/.*)"],
			},
			{
				title: "global.topbar.actions.contactSupport",
				href: "/help/contact",
				target: "_self",
				testId: "contact",
				activeForUrls: ["^/help/contact($|/.*)"],
			},
			{
				title: "global.topbar.actions.releaseNotes",
				href: "/help/releases",
				target: "_self",
				testId: "releases",
				activeForUrls: ["^/help/releases($|/.*)"],
			},
			{
				title: "global.topbar.actions.training",
				href: "https://www.lernen.cloud/",
				target: "_blank",
				testId: "trainings",
			},
		],
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
