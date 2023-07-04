<template>
	<div>
		<skip-links />
		<div class="page" :style="style" :class="{ inline: isInline }">
			<div class="topbar">
				<the-top-bar
					v-if="!isInline"
					:fullscreen-mode="fullScreenMode"
					:expanded-menu="expandedMenu"
					:user="user"
					:school="school"
					@action="handleTopAction"
				/>
			</div>
			<the-sidebar
				v-if="!fullScreenMode && !isInline"
				class="sidebar"
				:expanded-menu="expandedMenu"
				:routes="sidebarItems"
			/>
			<slot />
			<keep-alive>
				<autoLogoutWarning />
			</keep-alive>
			<the-footer v-if="!fullScreenMode" class="footer" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useRoute } from "vue-router/composables";
import { authModule, envConfigModule, schoolsModule } from "@/store";
import getSidebarItems, {
	SidebarCategoryItem,
	SidebarItem,
} from "@/utils/sidebar-base-items";
import toastsFromQueryString from "@/mixins/toastsFromQueryString";
import TheTopBar from "@/components/topbar/TheTopBar.vue";
import TheSidebar from "@/components/legacy/TheSidebar.vue";
import TheFooter from "@/components/legacy/TheFooter.vue";
import autoLogoutWarning from "@/components/organisms/AutoLogoutWarning.vue";
import SkipLinks from "../components/molecules/SkipLinks.vue";

export default defineComponent({
	components: {
		TheTopBar,
		TheSidebar,
		TheFooter,
		autoLogoutWarning,
		SkipLinks,
	},
	mixins: [toastsFromQueryString],
	setup() {
		const route = useRoute();
		const expandedMenu = ref(false);
		const fullScreenMode = ref(sessionStorage.getItem("fullscreen") === "true");

		const handleTopAction = (event: string) => {
			if (event === "logout") {
				authModule.logout();
			}
			if (event === "fullscreen") {
				fullScreenMode.value = !fullScreenMode.value;
			}
			if (event === "expandMenu") {
				expandedMenu.value = !expandedMenu.value;
			}
		};

		const user = computed(() => {
			return authModule.getUser;
		});
		const school = computed(() => {
			return schoolsModule.getSchool;
		});
		const authenticated = computed(() => {
			return authModule.getAuthenticated;
		});
		const style = computed(() => {
			return fullScreenMode.value ? "display: inherit;" : "";
		});
		const isInline = computed(() => {
			return !!route.query.inline;
		});

		const sidebarItems = computed(() => {
			let sidebarItems = getSidebarItems(
				envConfigModule.getNewSchoolAdminPageAsDefault
			);

			const isSidebarCategoryItem = (
				item: SidebarItem | SidebarCategoryItem
			) => {
				return (item as SidebarCategoryItem).children !== undefined;
			};

			sidebarItems = sidebarItems.filter((item) => {
				// Check permissions for all children
				if (isSidebarCategoryItem(item)) {
					const sidebarCategoryItem = item as SidebarCategoryItem;
					if (sidebarCategoryItem.children.length >= 1) {
						sidebarCategoryItem.children = sidebarCategoryItem.children.filter(
							(child) =>
								!child.permission ||
								user.value?.permissions?.includes?.(child.permission)
						);
					}
				}

				const hasRequiredPermission = item.permission
					? user.value?.permissions?.includes?.(item.permission)
					: false;
				const hasExcludedPermission = item.excludedPermission
					? user.value?.permissions?.includes?.(item.excludedPermission)
					: false;

				return (
					!item.permission || (hasRequiredPermission && !hasExcludedPermission)
				);
			});

			return sidebarItems;
		});

		return {
			fullScreenMode,
			expandedMenu,
			handleTopAction,
			user,
			school,
			authenticated,
			style,
			isInline,
			sidebarItems,
		};
	},
});
</script>

<style lang="scss" scoped>
@import "@/styles/mixins";

.page {
	display: grid;
	grid-template-areas:
		"side top"
		"side content"
		"side footer";
	grid-template-rows: auto 1fr auto;
	grid-template-columns: 0 1fr;
	max-width: 100%;
	min-height: 100vh;

	&.inline {
		display: inline;
	}

	@include breakpoint(tablet) {
		grid-template-columns: var(--sidebar-width-tablet) 1fr;
	}

	@include breakpoint(desktop) {
		grid-template-columns: var(--sidebar-width) 1fr;
	}
}

.topbar {
	grid-area: top;
}

.sidebar {
	grid-area: side;
}

.footer {
	grid-area: footer;
}
</style>
