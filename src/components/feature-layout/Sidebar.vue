<template>
	<v-navigation-drawer :width="SIDEBAR_WIDTH">
		<SidebarLogo />
		<v-list open-strategy="multiple">
			<template v-for="item in sidebarItems" :key="item.title">
				<SidebarCategoryItem v-if="isSidebarCategoryItem(item)" :item="item" />
				<SidebarItem v-else :item="item" />
			</template>
		</v-list>
	</v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
	AUTH_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	injectStrict,
} from "@/utils/inject";
import SidebarLogo from "./SidebarLogo.vue";
import SidebarItem from "./SidebarItem.vue";
import SidebarCategoryItem from "./SidebarCategoryItem.vue";
import { SidebarGroupItem, SidebarSingleItem } from "./types";
import getSidebarItems from "./sidebar-items";

const SIDEBAR_WIDTH = 241;

const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
const authModule = injectStrict(AUTH_MODULE_KEY);

const isSidebarCategoryItem = (
	item: SidebarSingleItem | SidebarGroupItem
): item is SidebarGroupItem => {
	return (item as SidebarGroupItem).children !== undefined;
};

const sidebarItems = computed(() => {
	let sidebarItems = getSidebarItems(
		envConfigModule.getNewSchoolAdminPageAsDefault
	);

	sidebarItems = sidebarItems.filter((item) => {
		if (isSidebarCategoryItem(item)) {
			item.children = item.children.filter((child) => {
				return (
					!child.permission ||
					authModule.getUserPermissions.includes(child.permission.toLowerCase())
				);
			});
		}

		const hasRequiredPermission = item.permission
			? authModule.getUserPermissions.includes(item.permission.toLowerCase())
			: false;

		return !item.permission || hasRequiredPermission;
	});

	return sidebarItems;
});
</script>

<style lang=""></style>
