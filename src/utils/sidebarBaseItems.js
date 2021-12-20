export default [
	{
		title: "global.sidebar.overview",
		href: "/dashboard",
		icon: "th-large",
		testId: "Übersicht",
	},
	{
		title: "global.sidebar.newCourses",
		href: "/rooms-overview",
		icon: "book",
		testId: "Aktuelle Kurse",
	},
	{
		title: "global.sidebar.courses",
		href: "/courses",
		icon: "graduation-cap",
		testId: "Kurse",
	},
	{
		title: "global.sidebar.teams",
		href: "/teams",
		icon: "users",
		permission: "TEAMS_ENABLED",
		testId: "Teams",
	},
	{
		title: "global.sidebar.tasks",
		to: "/tasks",
		icon: "tasks",
		source: "custom",
		permission: "TASK_DASHBOARD_VIEW_V3",
		testId: "Aufgaben",
	},
	{
		title: "global.sidebar.tasks",
		to: "/tasks",
		icon: "tasks",
		source: "custom",
		permission: "TASK_DASHBOARD_TEACHER_VIEW_V3",
		testId: "Aufgaben",
	},
	{
		title: "global.sidebar.files",
		href: "/files",
		icon: "folder-open",
		testId: "Meine Dateien",
		children: [
			{
				title: "global.sidebar.filesPersonal",
				icon: "folder-open-o",
				href: "/files/my/",
				testId: "persönliche Dateien",
			},
			{
				title: "global.sidebar.courses",
				icon: "folder-open-o",
				href: "/files/courses/",
				testId: "Kurse",
			},
			{
				title: "global.sidebar.teams",
				href: "/files/teams/",
				icon: "folder-open-o",
				permission: "TEAMS_ENABLED",
				testId: "Teams",
			},
			{
				title: "global.sidebar.filesShared",
				icon: "folder-open-o",
				href: "/files/shared/",
				testId: "geteilte Dateien",
			},
		],
	},
	{
		title: "pages.news.title",
		href: "/news",
		icon: "newspaper-o",
		testId: "Neuigkeiten",
	},
	{
		title: "global.sidebar.calendar",
		href: "/calendar",
		icon: "table",
		testId: "Termine",
	},
	{
		title: "global.sidebar.lernstore",
		to: "/content",
		icon: "search",
		permission: "LERNSTORE_VIEW",
		testId: "Lern-Store",
	},
	{
		title: "global.sidebar.addons",
		href: "/addons",
		icon: "puzzle-piece",
		permission: "ADDONS_ENABLED",
		testId: "Add-ons",
	},
	{
		title: "global.sidebar.management",
		href: "/administration",
		icon: "cogs",
		permission: "TEACHER_LIST",
		excludedPermission: "ADMIN_VIEW",
		testId: "Verwaltung",
		children: [
			{
				title: "global.sidebar.student",
				icon: "odnoklassniki",
				to: "/administration/students/",
				permission: "STUDENT_LIST",
				testId: "Schüler:innen",
			},
			{
				title: "global.sidebar.teacher",
				icon: "user",
				to: "/administration/teachers/",
				testId: "Lehrkräfte",
			},
			{
				title: "global.sidebar.classes",
				icon: "users",
				href: "/administration/classes/",
				testId: "Klassen",
			},
		],
	},
	{
		title: "global.sidebar.management",
		href: "/administration/",
		icon: "cogs",
		permission: "ADMIN_VIEW",
		testId: "Verwaltung",
		children: [
			{
				title: "global.sidebar.student",
				icon: "odnoklassniki",
				to: "/administration/students/",
				testId: "Schüler:innen",
			},
			{
				title: "global.sidebar.teacher",
				icon: "user",
				to: "/administration/teachers/",
				testId: "Lehrkräfte",
			},
			{
				title: "global.sidebar.courses",
				icon: "graduation-cap",
				href: "/administration/courses/",
				testId: "Kurse",
			},
			{
				title: "global.sidebar.classes",
				icon: "users",
				href: "/administration/classes/",
				testId: "Klassen",
			},
			{
				title: "global.sidebar.teams",
				icon: "users",
				href: "/administration/teams/",
				testId: "Teams",
			},
			{
				title: "global.sidebar.school",
				icon: "building",
				href: "/administration/school/",
				testId: "Schule",
			},
		],
	},
	{
		title: "global.sidebar.helpArea",
		href: "/help",
		icon: "question-circle",
		testId: "Hilfebereich",
	},
	{
		title: "global.sidebar.myMaterial",
		href: "/my-material/",
		icon: "book",
		permission: "BETA_FEATURES",
		testId: "Meine Materialien",
	},
];
