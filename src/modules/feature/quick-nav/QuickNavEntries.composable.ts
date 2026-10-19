import { QuickNavEntry, QuickNavKind } from "./types";
import { Permission } from "@api-server";
import { useAppStore, useAppStoreRefs } from "@data-app";
import { mdiFormatListChecks, mdiNewspaperVariantOutline, mdiPlus, mdiSchoolOutline } from "@icons/material";
import {
	isSidebarCategoryItem,
	SidebarGroupItem,
	SidebarSingleItem,
	useSidebarItems,
	useSidebarItemsForUser,
} from "@ui-layout";
import { computed, ComputedRef } from "vue";
import { useI18n } from "vue-i18n";

// file pages would suggest that files can be searched, which the palette cannot do yet
const EXCLUDED_SIDEBAR_ITEMS = ["sidebar-files"];

/**
 * The entries the palette knows without asking the server: the pages of the main navigation and a
 * handful of things a user starts often. They are available the moment the palette opens, which is
 * what lets ⌘K replace reaching for the sidebar.
 */
export const useQuickNavEntries = () => {
	const { t } = useI18n();
	const { pageLinks } = useSidebarItems();
	const { getItemsForUser } = useSidebarItemsForUser();
	const { isStudent } = useAppStoreRefs();

	/** read the same way the sidebar reads it, so both agree on what the user may do */
	const hasPermission = (permission: Permission) => useAppStore().userPermissions.includes(permission);

	const toEntry = (item: SidebarSingleItem, parent?: SidebarGroupItem): QuickNavEntry => ({
		id: `navigation:${item.testId}`,
		kind: QuickNavKind.NAVIGATION,
		title: t(item.title),
		subtitle: parent ? t(parent.title) : undefined,
		// only the top level carries icons in the sidebar; without the fallback the rows would not line up
		icon: item.icon ?? parent?.icon ?? "",
		to: item.to,
		href: item.href,
	});

	/** a group in the sidebar is one click away there, so in the palette its children stand alone */
	const flatten = (item: SidebarSingleItem | SidebarGroupItem): QuickNavEntry[] => {
		if (isSidebarCategoryItem(item)) {
			return item.children.map((child) => toEntry(child, item));
		}

		return [toEntry(item)];
	};

	const navigationEntries: ComputedRef<QuickNavEntry[]> = computed(() =>
		getItemsForUser(pageLinks.value)
			.filter((item) => !EXCLUDED_SIDEBAR_ITEMS.includes(item.testId))
			.flatMap(flatten)
	);

	const actionEntries: ComputedRef<QuickNavEntry[]> = computed(() => {
		const entries: QuickNavEntry[] = [];

		if (hasPermission(Permission.SCHOOL_CREATE_ROOM)) {
			entries.push({
				id: "action:create-room",
				kind: QuickNavKind.ACTION,
				title: t("pages.rooms.fab.title"),
				icon: mdiPlus,
				to: "/rooms/new",
			});
		}

		if (hasPermission(Permission.COURSE_CREATE)) {
			entries.push({
				id: "action:create-course",
				kind: QuickNavKind.ACTION,
				title: t("pages.rooms.fab.create.course"),
				icon: mdiSchoolOutline,
				href: "/courses/add",
			});
		}

		// same rule as the add button on the task overview
		if (!isStudent.value && hasPermission(Permission.HOMEWORK_CREATE)) {
			entries.push({
				id: "action:create-task",
				kind: QuickNavKind.ACTION,
				title: t("components.organisms.TasksDashboardMain.fab.createTask"),
				icon: mdiFormatListChecks,
				href: "/homework/new?returnUrl=tasks",
			});
		}

		if (hasPermission(Permission.NEWS_CREATE)) {
			entries.push({
				id: "action:create-news",
				kind: QuickNavKind.ACTION,
				title: t("pages.news.index.new"),
				icon: mdiNewspaperVariantOutline,
				to: "/news/new",
			});
		}

		return entries;
	});

	return { navigationEntries, actionEntries };
};
