import { SidebarGroupItem, SidebarItems, SidebarSingleItem } from "../types";
import { useAppStore } from "@data-app";
import { useEnvConfig } from "@data-env";

export const isSidebarCategoryItem = (item: SidebarSingleItem | SidebarGroupItem): item is SidebarGroupItem =>
	(item as SidebarGroupItem).children !== undefined;

/**
 * Which of the navigation entries the signed-in user may actually see. The sidebar and the quick
 * navigation both ask this, so an entry hidden by a permission, a feature flag or the theme cannot
 * reappear through the search.
 */
export const useSidebarItemsForUser = () => {
	const userHasPermission = (item: SidebarSingleItem | SidebarGroupItem) =>
		!item.permissions || item.permissions.some((permission) => useAppStore().userPermissions.includes(permission));

	const hasFeatureEnabled = (item: SidebarSingleItem | SidebarGroupItem) => {
		if (!item.feature) return true;

		return useEnvConfig().value[item.feature] === (item.featureValue ?? true);
	};

	const isEnabledForTheme = (item: SidebarSingleItem | SidebarGroupItem) => {
		if (!item.theme) return true;

		return item.theme.includes(useEnvConfig().value.SC_THEME);
	};

	const getItemsForUser = (items: SidebarItems) => {
		const sidebarItems = items.filter((item) => {
			if (isSidebarCategoryItem(item)) {
				item.children = item.children.filter(
					(child) => userHasPermission(child) && hasFeatureEnabled(child) && isEnabledForTheme(child)
				);
			}
			return userHasPermission(item) && hasFeatureEnabled(item) && isEnabledForTheme(item);
		});

		return sidebarItems;
	};

	return { getItemsForUser };
};
