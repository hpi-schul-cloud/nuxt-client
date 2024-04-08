<template>
	<v-navigation-drawer>
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
import { SidebarGroupItem, SidebarSingleItem, SidebarItems } from "./types";
import { useSidebarItems } from "./SidebarItems.composable";

const authModule = injectStrict(AUTH_MODULE_KEY);

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

const getItemsForUser = (items: SidebarItems) => {
	const pageItems = items.filter((item) => {
		if (isSidebarCategoryItem(item)) {
			item.children = item.children.filter((child) => {
				return userHasPermission(child);
			});
		}

		return userHasPermission(item);
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
</script>
