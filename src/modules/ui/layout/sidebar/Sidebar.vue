<template>
	<VNavigationDrawer v-model="sidebarExpanded">
		<VList open-strategy="multiple">
			<div class="d-flex align-center">
				<VBtn
					class="ml-1"
					:icon="mdiMenuOpen"
					size="default"
					flat
					data-testid="sidebar-toggle-close"
					@click="sidebarExpanded = false"
				/>
				<CloudLogo class="mt-1" />
			</div>
			<div class="pb-3">
				<template v-for="item in pageItems" :key="item.title">
					<SidebarCategoryItem v-if="isSidebarCategoryItem(item)" :item="item" />
					<SidebarItem v-else :item="item" :draggable="false" />
				</template>
			</div>
			<VDivider aria-hidden="true" />
			<div class="py-3">
				<SidebarCategoryItem v-for="link in metaItems" :key="link.title" :item="link" />
			</div>
			<VDivider aria-hidden="true" />
			<div class="pt-3">
				<SidebarItem v-for="link in legalItems" :key="link.title" :item="link" :draggable="false" />
			</div>
		</VList>
	</VNavigationDrawer>
</template>

<script setup lang="ts">
import CloudLogo from "../CloudLogo.vue";
import { SidebarGroupItem, SidebarItems, SidebarSingleItem } from "../types";
import SidebarCategoryItem from "./SidebarCategoryItem.vue";
import SidebarItem from "./SidebarItem.vue";
import { useSidebarItems } from "./SidebarItems.composable";
import { AUTH_MODULE_KEY, injectStrict } from "@/utils/inject";
import { useEnvConfig } from "@data-env";
import { mdiMenuOpen } from "@icons/material";
import { computed } from "vue";

const sidebarExpanded = defineModel({
	type: Boolean,
	required: true,
});

const authModule = injectStrict(AUTH_MODULE_KEY);

const { pageLinks, legalLinks, metaLinks } = useSidebarItems();

const isSidebarCategoryItem = (item: SidebarSingleItem | SidebarGroupItem): item is SidebarGroupItem =>
	(item as SidebarGroupItem).children !== undefined;

const userHasPermission = (item: SidebarSingleItem | SidebarGroupItem) =>
	!item.permissions ||
	item.permissions.some((permission: string) => authModule.getUserPermissions.includes(permission.toLowerCase()))
	);

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

const legalItems = computed(() => getItemsForUser(legalLinks.value) as SidebarSingleItem[]);
const metaItems = computed(() => getItemsForUser(metaLinks.value) as SidebarGroupItem[]);
const pageItems = computed(() => getItemsForUser(pageLinks.value));
</script>

<style>
@supports (scrollbar-color: auto) {
	.v-navigation-drawer__content {
		scrollbar-color: transparent transparent;
	}

	.v-navigation-drawer__content:hover {
		scrollbar-color: initial;
	}
}

@supports selector(::-webkit-scrollbar) {
	.v-navigation-drawer__content::-webkit-scrollbar-thumb {
		background-color: transparent;
	}

	.v-navigation-drawer__content:hover::-webkit-scrollbar-thumb {
		background-color: rgba(var(--v-theme-on-surface), 0.6);
	}

	.v-navigation-drawer__content::-webkit-scrollbar-thumb:hover {
		background-color: rgba(var(--v-theme-on-surface), 0.8);
	}
}
</style>
