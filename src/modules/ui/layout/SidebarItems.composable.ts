import {
	ENV_CONFIG_MODULE_KEY,
	FILE_PATHS_MODULE_KEY,
	injectStrict,
} from "@/utils/inject";
import { SidebarGroupItem, SidebarItems, SidebarSingleItem } from "./types";
import { SchulcloudTheme } from "@/serverApi/v3";
import { ComputedRef, computed } from "vue";

export const useSidebarItems = () => {
	const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
	const filePathsModule = injectStrict(FILE_PATHS_MODULE_KEY);

	const pageLinks: ComputedRef<SidebarItems> = computed(() => [
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
	]);

	const legalLinks: ComputedRef<SidebarSingleItem[]> = computed(() => [
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
	]);

	const systemLinks: SidebarSingleItem[] = [
		{
			title: "components.legacy.footer.github",
			href: "https://github.com/hpi-schul-cloud",
			testId: "github",
			target: "_blank",
		},
	];
	if (envConfigModule.getEnv.ALERT_STATUS_URL) {
		systemLinks.push({
			href: envConfigModule.getEnv.ALERT_STATUS_URL,
			title: "components.legacy.footer.status",
			testId: "status",
			target: "_blank",
			rel: "noopener",
		});
	}
	if (envConfigModule.getTheme === SchulcloudTheme.Default) {
		systemLinks.push({
			href: "/security",
			title: "components.legacy.footer.security",
			testId: "security",
		});
	}

	// TODO - adjust language keys, when old components are removed
	const accessibilityGroup: SidebarGroupItem = {
		title: "global.sidebar.item.accessibility",
		icon: "$mdiHuman",
		testId: "accessibility",
		children: [],
	};
	if (envConfigModule.getEnv.ACCESSIBILITY_REPORT_EMAIL) {
		accessibilityGroup.children.push({
			href:
				"mailto:" +
				envConfigModule.getEnv.ACCESSIBILITY_REPORT_EMAIL +
				"?subject=" +
				"components.legacy.footer.accessibility.report",
			title: "components.legacy.footer.accessibility.report",
			testId: "report-accessibility",
			target: "_blank",
			rel: "noopener",
		});
	}
	accessibilityGroup.children.push({
		href: filePathsModule.getSpecificFiles.accessibilityStatement as string,
		title: "components.legacy.footer.accessibility.statement",
		testId: "accessibility-statement",
		target: "_blank",
		rel: "noopener",
	});

	const metaLinks: ComputedRef<SidebarGroupItem[]> = computed(() => [
		{
			title: "global.sidebar.item.management",
			icon: "$mdiCogOutline",
			permissions: ["TEACHER_LIST", "ADMIN_VIEW"],
			testId: "Verwaltung",
			activeForUrls: ["^/administration($|/.*)"],
			children: [
				{
					title: "global.sidebar.item.student",
					to: "/administration/students",
					permissions: ["STUDENT_LIST"],
					testId: "Schüler:innen",
					activeForUrls: ["^/administration/students($|/.*)"],
				},
				{
					title: "global.sidebar.item.teacher",
					to: "/administration/teachers",
					testId: "Lehrkräfte",
					activeForUrls: ["^/administration/teachers($|/.*)"],
				},
				{
					title: "global.sidebar.item.courses",
					href: "/administration/courses",
					permissions: ["ADMIN_VIEW"],
					testId: "Kurse",
					activeForUrls: ["^/administration/courses($|/.*)"],
				},
				envConfigModule.getEnv.FEATURE_SHOW_NEW_CLASS_VIEW_ENABLED
					? {
							title: "global.sidebar.item.classes",
							href: "/administration/groups/classes",
							testId: "Klassen",
							activeForUrls: ["^/administration/groups/classes($|/.*)"],
						}
					: {
							title: "global.sidebar.item.classes",
							href: "/administration/classes",
							testId: "Klassen",
							activeForUrls: ["^/administration/classes($|/.*)"],
						},
				{
					title: "global.sidebar.item.teams",
					href: "/administration/teams",
					permissions: ["ADMIN_VIEW"],
					testId: "Teams",
					activeForUrls: ["^/administration/teams($|/.*)"],
				},
				envConfigModule.getNewSchoolAdminPageAsDefault
					? {
							title: "global.sidebar.item.school",
							to: "/administration/school-settings",
							permissions: ["ADMIN_VIEW"],
							testId: "Schule",
							activeForUrls: [
								"^/administration/school($|/.*)",
								"^/administration/school-settings($|/.*)",
							],
						}
					: {
							title: "global.sidebar.item.school",
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
			title: "global.sidebar.item.helpArea",
			icon: "$mdiHelpCircleOutline",
			testId: "Hilfebereich",
			activeForUrls: ["^/help($|/.*)"],
			// TODO - adjust language keys, when old components are removed
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
		{
			title: "global.sidebar.item.system",
			icon: "$mdiApplicationBracketsOutline",
			testId: "system",
			activeForUrls: ["^/security($|/.*)"],
			children: systemLinks,
		},
	]);

	if (envConfigModule.getTheme !== SchulcloudTheme.Default) {
		metaLinks.value.push(accessibilityGroup);
	}

	return { pageLinks, legalLinks, metaLinks };
};
