import { SidebarGroupItem, SidebarItems, SidebarSingleItem } from "../types";
import { SchulcloudTheme } from "@/serverApi/v3";
import { FILE_PATHS_MODULE_KEY, injectStrict } from "@/utils/inject";
import { useEnvConfig } from "@data-env";
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

export const useSidebarItems = () => {
	const filePathsModule = injectStrict(FILE_PATHS_MODULE_KEY);
	const { t } = useI18n();

	const pageLinks: ComputedRef<SidebarItems> = computed(() => [
		{
			title: "global.sidebar.item.overview",
			href: "/dashboard",
			icon: mdiViewGridOutline,
			testId: "sidebar-dashboard",
		},
		{
			title: "global.sidebar.item.rooms",
			to: "/rooms",
			icon: mdiAccountSupervisorCircleOutline,
			testId: "sidebar-rooms",
		},
		{
			title: "global.sidebar.item.courses",
			to: "/rooms/courses-overview",
			icon: mdiSchoolOutline,
			testId: "sidebar-courses",
		},
		{
			title: "global.sidebar.item.teams",
			href: "/teams",
			icon: mdiAccountGroupOutline,
			permissions: ["TEAMS_ENABLED"],
			testId: "sidebar-teams",
		},
		{
			title: "global.sidebar.item.tasks",
			to: "/tasks",
			icon: mdiFormatListChecks,
			permissions: ["TASK_DASHBOARD_VIEW_V3", "TASK_DASHBOARD_TEACHER_VIEW_V3"],
			testId: "sidebar-tasks",
		},
		{
			title: "global.sidebar.item.files-old",
			icon: mdiFolderOpenOutline,
			testId: "sidebar-files",
			children: [
				{
					title: "global.sidebar.item.filesPersonal",
					href: "/files/my/",
					testId: "sidebar-files-personalfiles",
				},
				{
					title: "global.sidebar.item.courses",
					href: "/files/courses/",
					testId: "sidebar-files-coursefiles",
				},
				{
					title: "global.sidebar.item.teams",
					href: "/files/teams/",
					permissions: ["TEAMS_ENABLED"],
					testId: "sidebar-files-teamfiles",
				},
				{
					title: "global.sidebar.item.filesShared",
					href: "/files/shared/",
					testId: "sidebar-files-sharedfiles",
				},
			],
		},
		{
			title: "pages.news.title",
			href: "/news",
			icon: mdiNewspaperVariantOutline,
			testId: "sidebar-news",
		},
		{
			title: "global.sidebar.item.calendar",
			href: "/calendar",
			icon: mdiCalendarOutline,
			testId: "sidebar-calendar",
		},
		{
			title: "common.words.lernstore",
			to: "/content",
			icon: "$lernstore_outline",
			permissions: ["LERNSTORE_VIEW"],
			testId: "sidebar-learningstore",
		},
		{
			title: "feature.media-shelf.title",
			to: "/media-shelf",
			icon: mdiBookshelf,
			feature: "FEATURE_MEDIA_SHELF_ENABLED",
			testId: "sidebar-mediashelf",
		},
		{
			title: "global.sidebar.item.addons",
			href: "/addons",
			icon: mdiPuzzleOutline,
			permissions: ["ADDONS_ENABLED"],
			testId: "sidebar-addons",
		},
	]);

	// TODO - adjust language keys, when old footer is removed
	const legalLinks: ComputedRef<SidebarSingleItem[]> = computed(() => [
		{
			href:
				"mailto:" +
				useEnvConfig().value.ACCESSIBILITY_REPORT_EMAIL +
				"?subject=" +
				t("components.legacy.footer.accessibility.report"),
			title: "components.legacy.footer.accessibility.report",
			testId: "sidebar-accessibilityfeedback",
			target: "_blank",
			rel: "noopener",
			feature: "ACCESSIBILITY_REPORT_EMAIL",
			featureValue: `${useEnvConfig().value.ACCESSIBILITY_REPORT_EMAIL}`,
			theme: [SchulcloudTheme.Brb, SchulcloudTheme.N21, SchulcloudTheme.Thr],
		},
		{
			to: "/imprint",
			title: "components.legacy.footer.imprint",
			testId: "sidebar-imprint",
		},
		{
			href: "/termsofuse",
			title: "components.legacy.footer.terms",
			target: "_blank",
			rel: "noopener",
			testId: "sidebar-termsofuse",
		},
		{
			href: "/privacypolicy",
			title: "components.legacy.footer.privacy_policy_thr",
			target: "_blank",
			rel: "noopener",
			testId: "sidebar-privacypolicy",
		},
		{
			to: "/licenses",
			title: "global.sidebar.item.licenses",
			feature: "LICENSE_SUMMARY_URL",
			featureValue: `${useEnvConfig().value.LICENSE_SUMMARY_URL}`,
			testId: "sidebar-licenses",
		},
	]);

	const systemLinks: SidebarSingleItem[] = [
		{
			href: `${useEnvConfig().value.ALERT_STATUS_URL}`,
			title: "components.legacy.footer.status",
			testId: "sidebar-system-status",
			target: "_blank",
			rel: "noopener",
			feature: "ALERT_STATUS_URL",
			featureValue: `${useEnvConfig().value.ALERT_STATUS_URL}`,
		},
		{
			href: filePathsModule.getSpecificFiles.accessibilityStatement as string,
			title: "components.legacy.footer.accessibility.statement",
			testId: "sidebar-system-accessibilitystatement",
			target: "_blank",
			rel: "noopener",
			theme: [SchulcloudTheme.Brb, SchulcloudTheme.N21, SchulcloudTheme.Thr],
		},
		{
			title: "global.sidebar.item.releaseNotes",
			href: "/system/releases",
			target: "_self",
			testId: "sidebar-system-releases",
		},
		{
			title: "components.legacy.footer.github",
			href: "https://github.com/hpi-schul-cloud",
			testId: "sidebar-system-github",
			target: "_blank",
			theme: [SchulcloudTheme.Brb, SchulcloudTheme.Default, SchulcloudTheme.Thr],
		},
		{
			href: "/security",
			title: "components.legacy.footer.security",
			testId: "sidebar-system-security",
			theme: [SchulcloudTheme.Default],
		},
	];

	const metaLinks: ComputedRef<SidebarGroupItem[]> = computed(() => [
		{
			title: "global.sidebar.item.management",
			icon: mdiCogOutline,
			permissions: ["TEACHER_LIST", "ADMIN_VIEW"],
			testId: "sidebar-management",
			children: [
				{
					title: "global.sidebar.item.student",
					to: "/administration/students",
					permissions: ["STUDENT_LIST"],
					testId: "sidebar-management-students",
				},
				{
					title: "global.sidebar.item.teacher",
					to: "/administration/teachers",
					testId: "sidebar-management-teachers",
				},
				{
					title: "pages.rooms.title",
					to: "/administration/rooms/manage",
					feature: "FEATURE_ADMINISTRATE_ROOMS_ENABLED",
					permissions: useEnvConfig().value.FEATURE_ADMINISTRATE_ROOMS_ENABLED
						? ["SCHOOL_ADMINISTRATE_ROOMS"]
						: undefined,
					testId: "sidebar-room-management",
				},
				{
					title: "global.sidebar.item.courses",
					to: "/administration/rooms/new",
					testId: "sidebar-management-courses",
					permissions: ["ADMIN_VIEW"],
				},
				{
					title: "global.sidebar.item.classes",
					to: "/administration/groups/classes",
					testId: "sidebar-management-classes",
					permissions: ["ADMIN_VIEW", "TEACHER_LIST"],
				},
				{
					title: "global.sidebar.item.teams",
					href: "/administration/teams",
					permissions: ["ADMIN_VIEW"],
					testId: "sidebar-management-teams",
				},
				{
					title: "global.sidebar.item.school",
					to: "/administration/school-settings",
					testId: "sidebar-management-school",
					permissions: ["ADMIN_VIEW"],
				},
			],
		},
		{
			title: "global.sidebar.item.helpArea",
			icon: mdiHelpCircleOutline,
			testId: "sidebar-helpsection",
			children: [
				{
					title: "global.sidebar.item.helpSection",
					href: "/help",
					target: "_self",
					testId: "sidebar-helpsection-helparticles",
				},
				{
					title: "global.sidebar.item.contactSupport",
					href: "/help/contact",
					target: "_self",
					testId: "sidebar-helpsection-contact",
				},
				{
					title: "global.sidebar.item.training",
					href: `${useEnvConfig().value.TRAINING_URL}`,
					target: "_blank",
					rel: "noopener",
					testId: "sidebar-helpsection-trainings",
					feature: "TRAINING_URL",
					featureValue: `${useEnvConfig().value.TRAINING_URL}`,
				},
			],
		},
		{
			title: "global.sidebar.item.system",
			icon: mdiApplicationBracketsOutline,
			testId: "sidebar-system",
			children: systemLinks,
		},
	]);

	return { pageLinks, legalLinks, metaLinks };
};
