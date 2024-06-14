<template>
	<VNavigationDrawer>
		<VList open-strategy="multiple">
			<div class="d-flex align-center">
				<VBtn
					class="ml-1"
					:icon="mdiMenuOpen"
					@click="() => $emit('update:modelValue', false)"
					size="default"
					flat
				/>
				<CloudLogo class="mt-1" />
			</div>
			<div class="pb-3">
				<template v-for="item in pageItems" :key="item.title">
					<SidebarCategoryItem
						v-if="isSidebarCategoryItem(item)"
						:item="item"
					/>
					<SidebarItem v-else :item="item" :draggable="false" />
				</template>
			</div>
			<VDivider aria-hidden="true" />
			<div class="py-3">
				<SidebarCategoryItem
					v-for="link in metaItems"
					:key="link.title"
					:item="link"
				/>
			</div>
			<VDivider aria-hidden="true" />
			<div class="pt-3">
				<SidebarItem
					v-for="link in legalItems"
					:key="link.title"
					:item="link"
					:draggable="false"
				/>
			</div>
		</VList>
		<div data-testid="sidebar-instance-name" class="ml-4 pb-3 text-disabled">
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
import CloudLogo from "../CloudLogo.vue";
import SidebarItem from "./SidebarItem.vue";
import SidebarCategoryItem from "./SidebarCategoryItem.vue";
import { SidebarGroupItem, SidebarSingleItem, SidebarItems } from "../types";
import { useSidebarItems } from "./SidebarItems.composable";
import { mdiMenuOpen } from "@mdi/js";

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

				return userHasPermission(child) && childHasFeature;
			});
		}

		const categoryHasFeature = hasFeatureEnabled(item);

		return userHasPermission(item) && categoryHasFeature;
	});

	return pageItems;
};

const currentYear = computed(() => new Date().getFullYear());

const legalItems = computed(
	() => getItemsForUser(legalLinks.value) as SidebarSingleItem[]
);
const metaItems = computed(
	() => getItemsForUser(metaLinks.value) as SidebarGroupItem[]
);
const pageItems = computed(() => getItemsForUser(pageLinks.value));
</script>
