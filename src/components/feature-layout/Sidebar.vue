<template>
	<v-navigation-drawer :permanent="isDesktop" :width="SIDEBAR_WIDTH">
		<SidebarLogo />
		<v-list>
			<SidebarItem
				v-for="item in sidebarItems"
				:key="item.title"
				:item="item"
			/>
		</v-list>
	</v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDisplay } from "vuetify";
import {
	AUTH_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	injectStrict,
} from "@/utils/inject";
import SidebarLogo from "./SidebarLogo.vue";
import SidebarItem from "./SidebarItem.vue";
import { getSidebarItemsNew } from "@/utils/sidebar-base-items";

const SIDEBAR_WIDTH = 241;

const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
const authModule = injectStrict(AUTH_MODULE_KEY);

// const { mdAndDown, xs, lgAndUp } = useDisplay();
const { lgAndUp } = useDisplay();

// const isTablet = computed(() => {
// 	return mdAndDown.value && !xs.value;
// });

const isDesktop = computed(() => {
	return lgAndUp.value;
});

// console.log(getSidebarItems());

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
		const hasExcludedPermission = item.excludedPermission
			? authModule.getUserPermissions.includes(
					item.excludedPermission.toLowerCase()
				)
			: false;

		return (
			!item.permission || (hasRequiredPermission && !hasExcludedPermission)
		);
	});

	return sidebarItems;
});
</script>

<style lang=""></style>
