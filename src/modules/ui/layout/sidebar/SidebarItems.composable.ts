import {
	ENV_CONFIG_MODULE_KEY,
	FILE_PATHS_MODULE_KEY,
	injectStrict,
} from "@/utils/inject";
import { SidebarGroupItem, SidebarItems, SidebarSingleItem } from "../types";
import { SchulcloudTheme } from "@/serverApi/v3";
import { ComputedRef, computed } from "vue";
import { mdiBookshelf } from "@mdi/js";
import { useI18n } from "vue-i18n";

export const useSidebarItems = () => {
	const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
	const filePathsModule = injectStrict(FILE_PATHS_MODULE_KEY);
	const { t } = useI18n();

	const pageLinks: ComputedRef<SidebarItems> = computed(() => [
		{
			title: "global.sidebar.item.overview",
			href: "/dashboard",
			icon: "$mdiViewGridOutline",
			testId: "Übersicht",
		},
		{
			title: "global.sidebar.item.courses",
			to: "/rooms-overview",
			icon: "$mdiSchoolOutline",
			testId: "Course-Overview",
		},
		{
			title: "global.sidebar.item.teams",
			href: "/teams",
			icon: "$mdiAccountGroupOutline",
			permissions: ["TEAMS_ENABLED"],
			testId: "Teams",
		},
		{
			title: "global.sidebar.item.tasks",
			to: "/tasks",
			icon: "$mdiFormatListChecks",
			permissions: ["TASK_DASHBOARD_VIEW_V3", "TASK_DASHBOARD_TEACHER_VIEW_V3"],
			testId: "Aufgaben",
		},
		{
			title: "global.sidebar.item.files-old",
			icon: "$mdiFolderOpenOutline",
			testId: "Dateien",
			children: [
				{
					title: "global.sidebar.item.filesPersonal",
					href: "/files/my/",
					testId: "persönliche Dateien",
				},
				{
					title: "global.sidebar.item.courses",
					href: "/files/courses/",
					testId: "Kurse",
				},
				{
					title: "global.sidebar.item.teams",
					href: "/files/teams/",
					permissions: ["TEAMS_ENABLED"],
					testId: "Teams",
				},
				{
					title: "global.sidebar.item.filesShared",
					href: "/files/shared/",
					testId: "geteilte Dateien",
				},
			],
		},
		{
			title: "pages.news.title",
			href: "/news",
			icon: "$mdiNewspaperVariantOutline",
			testId: "Neuigkeiten",
		},
		{
			title: "global.sidebar.item.calendar",
			href: "/calendar",
			icon: "$mdiCalendarOutline",
			testId: "Termine",
		},
		{
			title: "common.words.lernstore",
			to: "/content",
			icon: "$lernstore_outline",
			permissions: ["LERNSTORE_VIEW"],
			testId: "Lern-Store",
		},
		{
			title: "feature.media-shelf.title",
			href: "/media-shelf",
			icon: mdiBookshelf,
			feature: "FEATURE_MEDIA_SHELF_ENABLED",
			testId: "Media-shelf",
		},
		{
			title: "global.sidebar.item.addons",
			href: "/addons",
			icon: "$mdiPuzzleOutline",
			permissions: ["ADDONS_ENABLED"],
			testId: "Add-ons",
		},
	]);

	const legalLinks: ComputedRef<SidebarSingleItem[]> = computed(() => [
		{
			href:
				"mailto:" +
				envConfigModule.getEnv.ACCESSIBILITY_REPORT_EMAIL +
				"?subject=" +
				t("components.legacy.footer.accessibility.report"),
			title: "components.legacy.footer.accessibility.report",
			testId: "report-accessibility",
			target: "_blank",
			rel: "noopener",
			feature: "ACCESSIBILITY_REPORT_EMAIL",
			featureValue: `${envConfigModule.getEnv.ACCESSIBILITY_REPORT_EMAIL}`,
		},
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
			title: "components.legacy.footer.privacy_policy_thr",
			target: "_blank",
			rel: "noopener",
			testId: "privacy-policy",
		},
	]);

	const systemLinks: SidebarSingleItem[] = [
		{
			href: `${envConfigModule.getEnv.ALERT_STATUS_URL}`,
			title: "components.legacy.footer.status",
			testId: "status",
			target: "_blank",
			rel: "noopener",
			feature: "ALERT_STATUS_URL",
			featureValue: `${envConfigModule.getEnv.ALERT_STATUS_URL}`,
		},
		{
			title: "global.topbar.actions.releaseNotes",
			href: "/help/releases",
			target: "_self",
			testId: "releases",
		},
		{
			href: filePathsModule.getSpecificFiles.accessibilityStatement as string,
			title: "components.legacy.footer.accessibility.statement",
			testId: "accessibility-statement",
			target: "_blank",
			rel: "noopener",
			feature: "SC_THEME",
			featureValue:
				SchulcloudTheme.Brb || SchulcloudTheme.N21 || SchulcloudTheme.Thr,
		},
		{
			title: "components.legacy.footer.github",
			href: "https://github.com/hpi-schul-cloud",
			testId: "github",
			target: "_blank",
		},
		{
			href: "/security",
			title: "components.legacy.footer.security",
			testId: "security",
			feature: "SC_THEME",
			featureValue: SchulcloudTheme.Default,
		},
	];

	const metaLinks: ComputedRef<SidebarGroupItem[]> = computed(() => [
		{
			title: "global.sidebar.item.management",
			icon: "$mdiCogOutline",
			permissions: ["TEACHER_LIST", "ADMIN_VIEW"],
			testId: "Verwaltung",
			children: [
				{
					title: "global.sidebar.item.student",
					to: "/administration/students",
					permissions: ["STUDENT_LIST"],
					testId: "Schüler:innen",
				},
				{
					title: "global.sidebar.item.teacher",
					to: "/administration/teachers",
					testId: "Lehrkräfte",
				},
				{
					title: "global.sidebar.item.courses",
					href: "/administration/courses",
					permissions: ["ADMIN_VIEW"],
					testId: "Kurse",
				},
				{
					title: "global.sidebar.item.classes",
					href: "/administration/groups/classes",
					testId: "Klassen",
					permissions: ["ADMIN_VIEW", "TEACHER_LIST"],
					feature: "FEATURE_SHOW_NEW_CLASS_VIEW_ENABLED",
				},
				{
					title: "global.sidebar.item.classes",
					href: "/administration/classes",
					testId: "Klassen",
					permissions: ["ADMIN_VIEW", "TEACHER_LIST"],
					feature: "FEATURE_SHOW_NEW_CLASS_VIEW_ENABLED",
					featureValue: false,
				},
				{
					title: "global.sidebar.item.teams",
					href: "/administration/teams",
					permissions: ["ADMIN_VIEW"],
					testId: "Teams",
				},
				{
					title: "global.sidebar.item.school",
					to: "/administration/school-settings",
					testId: "Schule",
					permissions: ["ADMIN_VIEW"],
					feature: "FEATURE_NEW_SCHOOL_ADMINISTRATION_PAGE_AS_DEFAULT_ENABLED",
				},
				{
					title: "global.sidebar.item.school",
					href: "/administration/school",
					testId: "Schule",
					permissions: ["ADMIN_VIEW"],
					feature: "FEATURE_NEW_SCHOOL_ADMINISTRATION_PAGE_AS_DEFAULT_ENABLED",
					featureValue: false,
				},
			],
		},
		{
			title: "global.sidebar.item.helpArea",
			icon: "$mdiHelpCircleOutline",
			testId: "Hilfebereich",
			// TODO - adjust language keys, when old components are removed
			children: [
				{
					title: "global.topbar.actions.helpSection",
					href: "/help",
					target: "_self",
					testId: "help-articles",
				},
				{
					title: "global.topbar.actions.contactSupport",
					href: "/help/contact",
					target: "_self",
					testId: "contact",
				},
			],
		},
		{
			title: "global.sidebar.item.system",
			icon: "$mdiApplicationBracketsOutline",
			testId: "system",
			children: systemLinks,
		},
	]);

	return { pageLinks, legalLinks, metaLinks };
};
