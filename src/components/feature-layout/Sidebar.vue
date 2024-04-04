<template>
	<v-navigation-drawer :width="SIDEBAR_WIDTH">
		<SidebarLogo />
		<v-list open-strategy="multiple">
			<template v-for="item in sidebarItems" :key="item.title">
				<SidebarCategoryItem v-if="isSidebarCategoryItem(item)" :item="item" />
				<SidebarItem v-else :item="item" />
			</template>
		</v-list>
		<v-divider />
		<v-list>
			<SidebarItem v-for="link in legalLinks" :key="link.title" :item="link" />
		</v-list>
	</v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { AUTH_MODULE_KEY, injectStrict } from "@/utils/inject";
import SidebarLogo from "./SidebarLogo.vue";
import SidebarItem from "./SidebarItem.vue";
import SidebarCategoryItem from "./SidebarCategoryItem.vue";
import { SidebarGroupItem, SidebarSingleItem, SidebarLinkItem } from "./types";
import { getSidebarItems, legalLinks } from "./sidebar-items";

const SIDEBAR_WIDTH = 241;

const authModule = injectStrict(AUTH_MODULE_KEY);

const isSidebarCategoryItem = (
	item: SidebarSingleItem | SidebarGroupItem
): item is SidebarGroupItem => {
	return (item as SidebarGroupItem).children !== undefined;
};

const sidebarItems = computed(() => {
	let sidebarItems = getSidebarItems();

	const hasPermission = (
		item: SidebarSingleItem | SidebarGroupItem | SidebarLinkItem
	) => {
		return (
			!item.permissions ||
			item.permissions.some((permission: string) => {
				return authModule.getUserPermissions.includes(permission.toLowerCase());
			})
		);
	};

	sidebarItems = sidebarItems.filter((item) => {
		if (isSidebarCategoryItem(item)) {
			item.children = item.children.filter((child) => {
				return hasPermission(child);
			});
		}

		return hasPermission(item);
	});

	return sidebarItems;
});
</script>

<style lang=""></style>
