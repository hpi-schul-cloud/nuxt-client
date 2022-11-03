<template>
	<!-- default template = loggedin view -->
	<div>
		<skip-links />
		<div class="page" :style="style" :class="{ inline: isInline }">
			<div class="topbar">
				<the-top-bar
					v-if="!isInline"
					:title="pageTitle"
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
			<matrix-messenger />
		</div>
	</div>
</template>

<script>
import { authModule, schoolsModule } from "@/store";
import TheTopBar from "@components/legacy/TheTopBar";
import TheSidebar from "@components/legacy/TheSidebar";
import TheFooter from "@components/legacy/TheFooter";
import autoLogoutWarning from "@components/organisms/AutoLogoutWarning";
import sidebarBaseItems from "@utils/sidebarBaseItems";
import toastsFromQueryString from "@mixins/toastsFromQueryString";
import MatrixMessenger from "@components/organisms/Messenger/MatrixMessenger";
import SkipLinks from "../components/molecules/SkipLinks.vue";

export default {
	components: {
		TheTopBar,
		TheSidebar,
		TheFooter,
		autoLogoutWarning,
		MatrixMessenger,
		SkipLinks,
	},
	mixins: [toastsFromQueryString],
	data() {
		return {
			sidebarBaseItems: sidebarBaseItems,
			pageTitle: this.$theme.short_name,
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
			const sidebarItems = this.sidebarBaseItems.filter((item) => {
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

      // Sidebar highlights
      const { path } = this.$route;
      const isActive = (item) => item.activeForUrls && item.activeForUrls.some((activeFor) => new RegExp(activeFor).test(path));

      sidebarItems.forEach((item) => {
        item.childActive = false;
        if (item.children) {
          item.children.forEach((childItem) => {
            childItem.active = isActive(childItem);
            item.childActive = item.childActive || childItem.active;
          });
        }
        item.active = isActive(item) && !item.childActive;
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
	watch: {
		$route: function (to) {
			try {
				this.pageTitle = this.$children[2].$children[0].$metaInfo.title;
			} catch {
				this.pageTitle = to.name;
			}
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
@import "@styles";

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
