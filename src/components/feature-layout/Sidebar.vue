<template>
	<v-navigation-drawer :width="SIDEBAR_WIDTH">
		<SidebarLogo />
		<v-list open-strategy="multiple">
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
			<v-divider />
			<div class="py-3">
				<SidebarItem
					v-for="link in legalItems"
					:key="link.title"
					:item="link"
				/>
			</div>
		</v-list>
	</v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { AUTH_MODULE_KEY, injectStrict } from "@/utils/inject";
import SidebarLogo from "./SidebarLogo.vue";
import SidebarItem from "./SidebarItem.vue";
import SidebarCategoryItem from "./SidebarCategoryItem.vue";
import {
	SidebarGroupItem,
	SidebarSingleItem,
	SidebarLinkItem,
	SidebarItems,
} from "./types";
import { pageLinks, legalLinks } from "./sidebar-items";
import { metaLinks } from "./meta-links";

const SIDEBAR_WIDTH = 241;

const authModule = injectStrict(AUTH_MODULE_KEY);

const isSidebarCategoryItem = (
	item: SidebarSingleItem | SidebarGroupItem | SidebarLinkItem
): item is SidebarGroupItem => {
	return (item as SidebarGroupItem).children !== undefined;
};

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

const getFilteredItems = (items: SidebarItems | SidebarLinkItem[]) => {
	const pageItems = items.filter((item) => {
		if (isSidebarCategoryItem(item)) {
			item.children = item.children.filter((child) => {
				return hasPermission(child);
			});
		}

		return hasPermission(item);
	});

	return pageItems;
};

const pageItems = computed(() => getFilteredItems(pageLinks));
const metaItems = computed(
	() => getFilteredItems(metaLinks) as SidebarGroupItem[]
);
const legalItems = computed(
	() => getFilteredItems(legalLinks) as SidebarLinkItem[]
);
</script>

<style lang=""></style>
