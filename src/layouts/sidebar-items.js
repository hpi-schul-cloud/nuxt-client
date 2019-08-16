export default [
	{
		title: "Übersicht",
		href: "/dashboard",
		icon: "th-large",
	},
	{
		title: "Kurse",
		href: "/courses",
		icon: "graduation-cap",
	},
	{ title: "Teams", href: "/teams", icon: "users" },
	{ title: "Aufgaben", href: "/homework", icon: "tasks" },
	{
		title: "Meine Dateien",
		href: "/files",
		icon: "folder-open",
	},
	{
		title: "Neuigkeiten",
		href: "/news",
		icon: "newspaper-o",
	},
	{ title: "Termine", href: "/calendar", icon: "table" },
	{ title: "Lern-store", href: "/content", icon: "search" },
	{
		title: "Verwaltung",
		href: "/administration",
		icon: "cogs",
		permission: "STUDENT_CREATE",
		excludedPermission: "ADMIN_VIEW",
	},
	{
		title: "Helpdesk",
		href: "/administration/helpdesk/",
		icon: "ticket",
		permission: "HELPDESK_VIEW",
	},
	{
		title: "Administration",
		href: "/administration/",
		icon: "cogs",
		permission: "ADMIN_VIEW",
	},
	{
		title: "Meine Materialien",
		href: "/my-material/",
		icon: "book",
		permission: "BETA_FEATURES",
	},
]
