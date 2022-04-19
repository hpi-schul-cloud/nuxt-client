<template>
	<!-- default template = loggedin view -->
	<div>
		<skip-links></skip-links>
		<div class="page" :style="style" :class="{ inline: isInline }">
			<div class="topbar">
				<user-has-role :role="isDemoRole">
					<demo-banner v-if="!fullscreenMode"></demo-banner>
				</user-has-role>

				<the-top-bar
					v-if="!isInline"
					:title="pageTitle"
					:actions="topBarActions"
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
import AuthModule from "@/store/auth";
import Schools from "@/store/schools";
import TheTopBar from "@components/legacy/TheTopBar";
import TheSidebar from "@components/legacy/TheSidebar";
import TheFooter from "@components/legacy/TheFooter";
import UserHasRole from "@components/helpers/UserHasRole";
import DemoBanner from "@components/legacy/DemoBanner";
import autoLogoutWarning from "@components/organisms/AutoLogoutWarning";
import sidebarBaseItems from "@utils/sidebarBaseItems.js";
import toastsFromQueryString from "@mixins/toastsFromQueryString";
import MatrixMessenger from "@components/organisms/Messenger/MatrixMessenger";
import SkipLinks from "../components/molecules/SkipLinks.vue";
import EnvConfigModule from "@store/env-config";

export default {
	components: {
		TheTopBar,
		TheSidebar,
		TheFooter,
		DemoBanner,
		UserHasRole,
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
			topbarBaseActions: [
				{
					type: "popupIcon",
					title: "QR-Code",
					icon: "qrcode",
					component: "menu-qr-code",
				},
				{
					type: "popupIcon",
					title: "Hilfe",
					icon: "question",
					component: "help-dropdown",
					config: {
						menuItems: [
							{
								label: this.$t("global.topbar.actions.help"),
								icon: "question-circle",
								action: "/help",
								source: "fa",
								target: "_self",
							},
							// TODO: implement intro for nuxt-client
							// {
							// 	label: "Intro",
							// 	icon: "map-signs",
							// 	action: "/",
							// },
							{
								label: this.$t("global.topbar.actions.contactSupport"),
								icon: "pencil",
								action: "/help/contact",
								source: "fa",
								target: "_self",
							},
							{
								label: this.$t("global.topbar.actions.training"),
								icon: "fortbildung",
								action: "https://www.lernen.cloud/",
								source: "custom",
								target: "_blank",
							},
						],
					},
				},
			],
		};
	},
	computed: {
		user() {
			return AuthModule.getUser;
		},
		school() {
			return Schools.getSchool;
		},
		authenticated() {
			return AuthModule.getAuthenticated;
		},
		topBarActions() {
			return [...this.topbarBaseActions];
		},
		sidebarItems() {
			const showLegacyCourse =
				EnvConfigModule.getEnv.LEGACY_COURSE_OVERVIEW_ENABLED || false;
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

			return sidebarItems.map((item) => {
				const isActive =
					this.$route.path.includes(item.href) ||
					this.$route.path.includes(item.to);
				item.childActive = false;
				if (item.children) {
					item.children.forEach((childItem) => {
						childItem.active =
							this.$route.path.includes(childItem.href) ||
							this.$route.path.includes(childItem.to);
						item.childActive = item.childActive || childItem.active;
					});
				}
				item.active = isActive && !item.childActive;

				if (item.linkType == "legacyCourse" && showLegacyCourse) {
					item.visibility = "true";
				}

				if (item.linkType == "nuxtCourse" && !showLegacyCourse) {
					item.visibility = "true";
				}

				return item;
			});
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
		isDemoRole(roles) {
			return roles.some((role) => role.startsWith("demo"));
		},
		handleTopAction(event) {
			if (event === "logout") {
				// TODO temporary workaround until $cookies are accessible from TS modules
				this.$cookies.remove("jwt");
				AuthModule.logout();
				this.$router.push({ path: "/logout" });
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
