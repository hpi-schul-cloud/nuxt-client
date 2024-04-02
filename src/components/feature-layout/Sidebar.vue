<template>
	<v-navigation-drawer :width="SIDEBAR_WIDTH">
		<SidebarLogo />
		<v-list>
			<template v-for="item in sidebarItems" :key="item.title">
				<SidebarCategoryItem v-if="item.children" :item="item" />
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
import { getSidebarItemsNew } from "@/utils/sidebar-base-items";

const SIDEBAR_WIDTH = 241;

const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
const authModule = injectStrict(AUTH_MODULE_KEY);

const sidebarItems = computed(() => {
	let sidebarItems = getSidebarItemsNew(
		envConfigModule.getNewSchoolAdminPageAsDefault
	);

	sidebarItems = sidebarItems.filter((item) => {
		if (item.children) {
			if (item.children.length >= 1) {
				item.children = item.children.filter((child) => {
					return (
						!child.permission ||
						authModule.getUserPermissions.includes(
							child.permission.toLowerCase()
						)
					);
				});
			}
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
