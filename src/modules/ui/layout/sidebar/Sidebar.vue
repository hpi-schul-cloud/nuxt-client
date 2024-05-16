<template>
	<VNavigationDrawer>
		<SidebarLogo />
		<VList open-strategy="multiple">
			<div class="pb-3">
				<template v-for="item in pageItems" :key="item.title">
					<SidebarCategoryItem
						v-if="isSidebarCategoryItem(item)"
						:item="item"
					/>
					<SidebarItem v-else :item="item" />
				</template>
			</div>
			<v-divider />
			<div class="py-3">
				<SidebarCategoryItem
					v-for="link in metaItems"
					:key="link.title"
					:item="link"
				/>
			</div>
			<VDivider />
			<div class="pt-3">
				<SidebarItem
					v-for="link in legalItems"
					:key="link.title"
					:item="link"
				/>
			</div>
		</VList>
		<div data-testid="instanz-sidebar" class="ml-4" style="color: #c6c6c6">
			&#169; {{ currentYear }} {{ theme.name }}
		</div>
	</VNavigationDrawer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
	AUTH_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	injectStrict,
	THEME_KEY,
} from "@/utils/inject";
import SidebarLogo from "./SidebarLogo.vue";
import SidebarItem from "./SidebarItem.vue";
import SidebarCategoryItem from "./SidebarCategoryItem.vue";
import { SidebarGroupItem, SidebarSingleItem, SidebarItems } from "../types";
import { useSidebarItems } from "./SidebarItems.composable";

const authModule = injectStrict(AUTH_MODULE_KEY);
const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
const theme = injectStrict(THEME_KEY);

const { pageLinks, legalLinks, metaLinks } = useSidebarItems();

const isSidebarCategoryItem = (
	item: SidebarSingleItem | SidebarGroupItem
): item is SidebarGroupItem => {
	return (item as SidebarGroupItem).children !== undefined;
};

const userHasPermission = (item: SidebarSingleItem | SidebarGroupItem) => {
	return (
		!item.permissions ||
		item.permissions.some((permission: string) => {
			return authModule.getUserPermissions.includes(permission.toLowerCase());
		})
	);
};

const hasFeatureEnabled = (item: SidebarSingleItem | SidebarGroupItem) => {
	if (!item.feature) {
		return true;
	}

	return envConfigModule.getEnv[item.feature] === (item.featureValue ?? true);
};

const getItemsForUser = (items: SidebarItems) => {
	const pageItems = items.filter((item) => {
		if (isSidebarCategoryItem(item)) {
			item.children = item.children.filter((child) => {
				const childHasFeature = hasFeatureEnabled(child);

				return userHasPermission(child) && (!child.feature || childHasFeature);
			});
		}

		const categoryHasFeature = hasFeatureEnabled(item);

		return userHasPermission(item) && (!item.feature || categoryHasFeature);
	});

	return pageItems;
};

const pageItems = computed(() => getItemsForUser(pageLinks.value));
const metaItems = computed(
	() => getItemsForUser(metaLinks.value) as SidebarGroupItem[]
);
const legalItems = computed(
	() => getItemsForUser(legalLinks.value) as SidebarSingleItem[]
);

const currentYear = computed(() => new Date().getFullYear());
</script>
