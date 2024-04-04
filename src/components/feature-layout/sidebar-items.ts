import { envConfigModule } from "@/store";
import { SidebarItems, SidebarLinkItem, SidebarGroupItem } from "./types";

export const pageLinks: SidebarItems = [
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
		permissions: ["TEAMS_ENABLED"],
		testId: "Teams",
		activeForUrls: ["^/teams($|/.*)"],
	},
	{
		title: "global.sidebar.tasks",
		to: "/tasks",
		icon: "$mdiFormatListChecks",
		permissions: ["TASK_DASHBOARD_VIEW_V3", "TASK_DASHBOARD_TEACHER_VIEW_V3"],
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
				permissions: ["TEAMS_ENABLED"],
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
		permissions: ["LERNSTORE_VIEW"],
		testId: "Lern-Store",
		activeForUrls: ["^/content($|/.*)"],
	},
	{
		title: "global.sidebar.addons",
		href: "/addons",
		icon: "$mdiPuzzleOutline",
		permissions: ["ADDONS_ENABLED"],
		testId: "Add-ons",
		activeForUrls: ["^/addons($|/.*)"],
	},
];

export const metaLinks: SidebarGroupItem[] = [
	{
		title: "global.sidebar.management",
		icon: "$mdiCogOutline",
		permissions: ["TEACHER_LIST", "ADMIN_VIEW"],
		testId: "Verwaltung",
		activeForUrls: ["^/administration($|/.*)"],
		children: [
			{
				title: "global.sidebar.student",
				to: "/administration/students",
				permissions: ["STUDENT_LIST"],
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
				permissions: ["ADMIN_VIEW"],
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
				permissions: ["ADMIN_VIEW"],
				testId: "Teams",
				activeForUrls: ["^/administration/teams($|/.*)"],
			},
			envConfigModule.getNewSchoolAdminPageAsDefault
				? {
						title: "global.sidebar.school",
						to: "/administration/school-settings",
						permissions: ["ADMIN_VIEW"],
						testId: "Schule",
						activeForUrls: [
							"^/administration/school($|/.*)",
							"^/administration/school-settings($|/.*)",
						],
					}
				: {
						title: "global.sidebar.school",
						href: "/administration/school",
						permissions: ["ADMIN_VIEW"],
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
				title: "global.topbar.actions.training",
				href: "https://www.lernen.cloud/",
				target: "_blank",
				testId: "trainings",
			},
			{
				title: "global.topbar.actions.releaseNotes",
				href: "/help/releases",
				target: "_self",
				testId: "releases",
				activeForUrls: ["^/help/releases($|/.*)"],
			},
		],
	},
];

export const legalLinks: SidebarLinkItem[] = [
	{
		to: "/imprint",
		title: "components.legacy.footer.imprint",
		testId: "imprint",
	},
	{
		href: "/termsofuse",
		title: "components.legacy.footer.terms",
		target: "_blank",
		rel: "noopener",
		testId: "terms-of-use",
	},
	{
		href: "/privacypolicy",
		title: "components.legacy.footer.privacy_policy",
		target: "_blank",
		rel: "noopener",
		testId: "privacy-policy",
	},
];
