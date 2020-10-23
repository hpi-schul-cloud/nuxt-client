export default [
	{
		title: "global.sidebar.overview",
		href: "/dashboard",
		icon: "th-large",
	},
	{
		title: "global.sidebar.courses",
		href: "/courses",
		icon: "graduation-cap",
	},
	{
		title: "global.sidebar.teams",
		href: "/teams",
		icon: "users",
		permission: "TEAMS_ENABLED",
	},
	{
		title: "global.sidebar.tasks",
		href: "/homework",
		icon: "tasks",
		children: [
			{
				title: "global.sidebar.tasks.assignedTasks",
				icon: "bullhorn",
				href: "/homework/asked/",
			},
			{
				title: "global.sidebar.tasks.tasksDrafts",
				icon: "lock",
				href: "/homework/private/",
			},
			{
				title: "global.sidebar.tasks.archive",
				icon: "archive",
				href: "/homework/archive/",
			},
		],
	},
	{
		title: "global.sidebar.files",
		href: "/files",
		icon: "folder-open",
		children: [
			{
				title: "global.sidebar.filesPersonal",
				icon: "folder-open-o",
				href: "/files/my/",
			},
			{
				title: "global.sidebar.courses",
				icon: "folder-open-o",
				href: "/files/courses/",
			},
			{
				title: "global.sidebar.teams",
				href: "/files/teams/",
				icon: "folder-open-o",
				permission: "TEAMS_ENABLED",
			},
			{
				title: "global.sidebar.filesShared",
				icon: "folder-open-o",
				href: "/files/shared/",
			},
		],
	},
	{
		title: "pages.news.title",
		href: "/news",
		icon: "newspaper-o",
	},
	{
		title: "global.sidebar.calendar",
		href: "/calendar",
		icon: "table",
	},
	{
		title: "global.sidebar.lernstore",
		href: "/content",
		icon: "search",
		permission: "LERNSTORE_VIEW",
	},
	{
		title: "global.sidebar.addons",
		href: "/addons",
		icon: "puzzle-piece",
		permission: "ADDONS_ENABLED",
	},
	{
		title: "global.sidebar.management",
		href: "/administration",
		icon: "cogs",
		permission: "TEACHER_LIST",
		excludedPermission: "ADMIN_VIEW",
		children: [
			{
				title: "global.sidebar.student",
				icon: "odnoklassniki",
				href: "/administration/students/",
				permission: "STUDENT_LIST",
			},
			{
				title: "global.sidebar.teacher",
				icon: "user",
				href: "/administration/teachers/",
			},
			{
				title: "global.sidebar.classes",
				icon: "users",
				href: "/administration/classes/",
			},
		],
	},
	{
		title: "global.sidebar.helpDesk",
		href: "/helpdesk/",
		icon: "ticket",
		permission: "HELPDESK_VIEW",
	},
	{
		title: "global.sidebar.management",
		href: "/administration/",
		icon: "cogs",
		permission: "ADMIN_VIEW",
		children: [
			{
				title: "global.sidebar.student",
				icon: "odnoklassniki",
				href: "/administration/students/",
			},
			{
				title: "global.sidebar.teacher",
				icon: "user",
				href: "/administration/teachers/",
			},
			{
				title: "global.sidebar.courses",
				icon: "graduation-cap",
				href: "/administration/courses/",
			},
			{
				title: "global.sidebar.classes",
				icon: "users",
				href: "/administration/classes/",
			},
			{
				title: "global.sidebar.teams",
				icon: "users",
				href: "/administration/teams/",
			},
			{
				title: "global.sidebar.school",
				icon: "building",
				href: "/administration/school/",
			},
		],
	},
	{
		title: "global.sidebar.helpArea",
		href: "/help",
		icon: "question-circle",
	},
	{
		title: "global.sidebar.myMaterial",
		href: "/my-material/",
		icon: "book",
		permission: "BETA_FEATURES",
	},
];
