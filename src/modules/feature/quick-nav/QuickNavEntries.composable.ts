import { QuickNavEntry, QuickNavKind } from "./types";
import { Permission } from "@api-server";
import { useAppStore, useAppStoreRefs } from "@data-app";
import { mdiFormatListChecks, mdiPlus, mdiSchoolOutline } from "@icons/material";
import {
	isSidebarCategoryItem,
	SidebarGroupItem,
	SidebarSingleItem,
	useSidebarItems,
	useSidebarItemsForUser,
} from "@ui-layout";
import { computed, ComputedRef } from "vue";
import { useI18n } from "vue-i18n";

const HELP_SIDEBAR_GROUP = "sidebar-helpsection";

/**
 * The entries the palette knows without asking the server: the help pages and a handful of things a
 * user starts often. The other pages of the sidebar are left to the sidebar, so the palette stays
 * with finding rooms, courses and tasks.
 */
export const useQuickNavEntries = () => {
	const { t } = useI18n();
	const { metaLinks } = useSidebarItems();
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

	const helpEntries: ComputedRef<QuickNavEntry[]> = computed(() =>
		getItemsForUser(metaLinks.value)
			.filter(isSidebarCategoryItem)
			.filter((group) => group.testId === HELP_SIDEBAR_GROUP)
			.flatMap((group) =>
				group.children.map((child) => ({ ...toEntry(child, group), subtitle: undefined, target: child.target }))
			)
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

		return entries;
	});

	return { actionEntries, helpEntries };
};
