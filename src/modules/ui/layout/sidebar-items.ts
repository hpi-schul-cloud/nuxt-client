import { SidebarItems, SidebarSingleItem } from "./types";

export const pageLinks: SidebarItems = [
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
		permissions: ["TEAMS_ENABLED"],
		testId: "Teams",
		activeForUrls: ["^/teams($|/.*)"],
	},
	{
		title: "global.sidebar.item.tasks",
		to: "/tasks",
		icon: "$mdiFormatListChecks",
		permissions: ["TASK_DASHBOARD_VIEW_V3", "TASK_DASHBOARD_TEACHER_VIEW_V3"],
		testId: "Aufgaben",
		activeForUrls: ["^/tasks($|/.*)"],
	},
	{
		title: "global.sidebar.item.files-old",
		icon: "$mdiFolderOpenOutline",
		testId: "Meine Dateien",
		activeForUrls: ["^/files($|/.*)"],
		children: [
			{
				title: "global.sidebar.item.filesPersonal",
				href: "/files/my/",
				testId: "persönliche Dateien",
				activeForUrls: ["^/files/my($|/.*)"],
			},
			{
				title: "global.sidebar.item.courses",
				href: "/files/courses/",
				testId: "Kurse",
				activeForUrls: ["^/files/courses($|/.*)"],
			},
			{
				title: "global.sidebar.item.teams",
				href: "/files/teams/",
				permissions: ["TEAMS_ENABLED"],
				testId: "Teams",
				activeForUrls: ["^/files/teams($|/.*)"],
			},
			{
				title: "global.sidebar.item.filesShared",
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
		permissions: ["LERNSTORE_VIEW"],
		testId: "Lern-Store",
		activeForUrls: ["^/content($|/.*)"],
	},
	{
		title: "global.sidebar.item.addons",
		href: "/addons",
		icon: "$mdiPuzzleOutline",
		permissions: ["ADDONS_ENABLED"],
		testId: "Add-ons",
		activeForUrls: ["^/addons($|/.*)"],
	},
];

export const legalLinks: SidebarSingleItem[] = [
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
