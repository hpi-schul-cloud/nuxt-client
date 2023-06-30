<template>
	<!-- default template = loggedin view -->
	<div>
		<skip-links />
		<div class="page" :style="style" :class="{ inline: isInline }">
			<div class="topbar">
				<the-top-bar
					v-if="!isInline"
					:fullscreen-mode="fullscreenMode"
					:expanded-menu="expandedMenu"
					:user="user"
					:school="school"
					@action="handleTopAction"
				/>
			</div>
			<the-sidebar
				v-if="!fullscreenMode && !isInline"
				class="sidebar"
				:expanded-menu="expandedMenu"
				:routes="sidebarItems"
			/>
			<slot />
			<keep-alive>
				<autoLogoutWarning />
			</keep-alive>
			<the-footer v-if="!fullscreenMode" class="footer" />
		</div>
	</div>
</template>

<script>
import { authModule, envConfigModule, schoolsModule } from "@/store";
import TheTopBar from "@/components/legacy/TheTopBar";
import TheSidebar from "@/components/legacy/TheSidebar";
import TheFooter from "@/components/legacy/TheFooter";
import autoLogoutWarning from "@/components/organisms/AutoLogoutWarning";
import getSidebarItems from "@/utils/sidebar-base-items";
import toastsFromQueryString from "@/mixins/toastsFromQueryString";
import SkipLinks from "../components/molecules/SkipLinks.vue";

export default {
	components: {
		TheTopBar,
		TheSidebar,
		TheFooter,
		autoLogoutWarning,
		SkipLinks,
	},
	mixins: [toastsFromQueryString],
	data() {
		return {
			fullscreenMode: sessionStorage.getItem("fullscreen") === "true",
			expandedMenu: false,
		};
	},
	computed: {
		user() {
			return authModule.getUser;
		},
		school() {
			return schoolsModule.getSchool;
		},
		authenticated() {
			return authModule.getAuthenticated;
		},
		topBarActions() {
			return [...this.topbarBaseActions];
		},
		sidebarItems() {
			let sidebarItems = getSidebarItems(
				envConfigModule.getNewSchoolAdminPageAsDefault
			);

			sidebarItems = sidebarItems.filter((item) => {
				// Check permissions for all children
				if ((item.children || []).length >= 1) {
					item.children = item.children.filter(
						(child) =>
							!child.permission ||
							this.user?.permissions?.includes?.(child.permission)
					);
				}

				const hasRequiredPermission = this.user?.permissions?.includes?.(
					item.permission
				);
				const hasExcludedPermission = this.user?.permissions?.includes?.(
					item.excludedPermission
				);

				return (
					!item.permission || (hasRequiredPermission && !hasExcludedPermission)
				);
			});

			return sidebarItems;
		},
		style() {
			return this.fullscreenMode ? "display: inherit;" : "";
		},

		isInline() {
			return !!this.$route.query.inline;
		},
	},
	methods: {
		handleTopAction(event) {
			if (event === "logout") {
				authModule.logout();
			}
			if (event === "fullscreen") {
				this.fullscreenMode = !this.fullscreenMode;
			}
			if (event === "expandMenu") {
				this.expandedMenu = !this.expandedMenu;
			}
		},
	},
};
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
