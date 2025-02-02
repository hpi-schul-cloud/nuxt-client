import { SchulcloudTheme } from "@/serverApi/v3";
import {
	ENV_CONFIG_MODULE_KEY,
	FILE_PATHS_MODULE_KEY,
	injectStrict,
} from "@/utils/inject";
import {
	mdiAccountGroupOutline,
	mdiAccountSupervisorCircleOutline,
	mdiApplicationBracketsOutline,
	mdiBookshelf,
	mdiCalendarOutline,
	mdiCogOutline,
	mdiFolderOpenOutline,
	mdiFormatListChecks,
	mdiHelpCircleOutline,
	mdiNewspaperVariantOutline,
	mdiPuzzleOutline,
	mdiSchoolOutline,
	mdiViewGridOutline,
} from "@icons/material";
import { computed, ComputedRef } from "vue";
import { useI18n } from "vue-i18n";
import { SidebarGroupItem, SidebarItems, SidebarSingleItem } from "../types";

export const useSidebarItems = () => {
	const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
	const filePathsModule = injectStrict(FILE_PATHS_MODULE_KEY);
	const { t } = useI18n();

	const pageLinks: ComputedRef<SidebarItems> = computed(() => [
		{
			title: "global.sidebar.item.overview",
			href: "/dashboard",
			icon: mdiViewGridOutline,
			testId: "Übersicht",
		},
		{
			title: "global.sidebar.item.rooms",
			to: "/rooms",
			icon: mdiAccountSupervisorCircleOutline,
			feature: "FEATURE_ROOMS_ENABLED",
			permissions: ["ROOM_CREATE"],
			testId: "Rooms",
		},
		{
			title: "global.sidebar.item.courses",
			to: "/rooms/courses-overview",
			icon: mdiSchoolOutline,
			testId: "Course-Overview",
		},
		{
			title: "global.sidebar.item.teams",
			href: "/teams",
			icon: mdiAccountGroupOutline,
			permissions: ["TEAMS_ENABLED"],
			testId: "Teams",
		},
		{
			title: "global.sidebar.item.tasks",
			to: "/tasks",
			icon: mdiFormatListChecks,
			permissions: ["TASK_DASHBOARD_VIEW_V3", "TASK_DASHBOARD_TEACHER_VIEW_V3"],
			testId: "Aufgaben",
		},
		{
			title: "global.sidebar.item.files-old",
			icon: mdiFolderOpenOutline,
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
			icon: mdiNewspaperVariantOutline,
			testId: "Neuigkeiten",
		},
		{
			title: "global.sidebar.item.calendar",
			href: "/calendar",
			icon: mdiCalendarOutline,
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
			to: "/media-shelf",
			icon: mdiBookshelf,
			feature: "FEATURE_MEDIA_SHELF_ENABLED",
			testId: "Media-shelf",
		},
		{
			title: "global.sidebar.item.addons",
			href: "/addons",
			icon: mdiPuzzleOutline,
			permissions: ["ADDONS_ENABLED"],
			testId: "Add-ons",
		},
	]);

	// TODO - adjust language keys, when old footer is removed
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
			theme: [SchulcloudTheme.Brb, SchulcloudTheme.N21, SchulcloudTheme.Thr],
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
			href: filePathsModule.getSpecificFiles.accessibilityStatement as string,
			title: "components.legacy.footer.accessibility.statement",
			testId: "accessibility-statement",
			target: "_blank",
			rel: "noopener",
			theme: [SchulcloudTheme.Brb, SchulcloudTheme.N21, SchulcloudTheme.Thr],
		},
		{
			title: "global.sidebar.item.releaseNotes",
			href: "/system/releases",
			target: "_self",
			testId: "releases",
		},
		{
			title: "components.legacy.footer.github",
			href: "https://github.com/hpi-schul-cloud",
			testId: "github",
			target: "_blank",
			theme: [
				SchulcloudTheme.Brb,
				SchulcloudTheme.Default,
				SchulcloudTheme.Thr,
			],
		},
		{
			href: "/security",
			title: "components.legacy.footer.security",
			testId: "security",
			theme: [SchulcloudTheme.Default],
		},
	];

	const metaLinks: ComputedRef<SidebarGroupItem[]> = computed(() => [
		{
			title: "global.sidebar.item.management",
			icon: mdiCogOutline,
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
					to: "/administration/rooms/new",
					testId: "Kurse",
					permissions: ["ADMIN_VIEW"],
					feature: "FEATURE_SHOW_NEW_ROOMS_VIEW_ENABLED",
				},
				{
					title: "global.sidebar.item.courses",
					href: "/administration/courses",
					testId: "Kurse",
					permissions: ["ADMIN_VIEW"],
					feature: "FEATURE_SHOW_NEW_ROOMS_VIEW_ENABLED",
					featureValue: false,
				},
				{
					title: "global.sidebar.item.classes",
					to: "/administration/groups/classes",
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
			icon: mdiHelpCircleOutline,
			testId: "Hilfebereich",
			children: [
				{
					title: "global.sidebar.item.helpSection",
					href: "/help",
					target: "_self",
					testId: "help-articles",
				},
				{
					title: "global.sidebar.item.contactSupport",
					href: "/help/contact",
					target: "_self",
					testId: "contact",
				},
				{
					title: "global.sidebar.item.training",
					href: `${envConfigModule.getEnv.TRAINING_URL}`,
					target: "_blank",
					rel: "noopener",
					testId: "training",
					feature: "TRAINING_URL",
					featureValue: `${envConfigModule.getEnv.TRAINING_URL}`,
				},
			],
		},
		{
			title: "global.sidebar.item.system",
			icon: mdiApplicationBracketsOutline,
			testId: "system",
			children: systemLinks,
		},
	]);

	return { pageLinks, legalLinks, metaLinks };
};
