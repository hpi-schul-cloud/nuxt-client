<template>
	<!-- default template = loggedin view -->
	<div>
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
import { mapState, mapActions } from "vuex";
import TheTopBar from "@components/legacy/TheTopBar";
import TheSidebar from "@components/legacy/TheSidebar";
import TheFooter from "@components/legacy/TheFooter";
import UserHasRole from "@components/helpers/UserHasRole";
import DemoBanner from "@components/legacy/DemoBanner";
import autoLogoutWarning from "@components/organisms/AutoLogoutWarning";
import sidebarBaseItems from "@utils/sidebarBaseItems.js";
import toastsFromQueryString from "@mixins/toastsFromQueryString";

const topbarBaseActions = [
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
					label: "Hilfebereich",
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
					label: "Wunsch oder Problem senden",
					icon: "pencil",
					action: "/help?activeForm=team#contact-form",
					source: "fa",
					target: "_self",
				},
				{
					label: "Admin deiner Schule kontaktieren",
					icon: "comment",
					action: "/help?activeForm=admin#contact-form",
					source: "fa",
					target: "_self",
				},
				{
					label: "Fortbildungen",
					icon: "fortbildung",
					action: "https://www.lernen.cloud/",
					source: "custom",
					target: "_blank",
				},
			],
		},
	},
];

export default {
	components: {
		TheTopBar,
		TheSidebar,
		TheFooter,
		DemoBanner,
		UserHasRole,
		autoLogoutWarning,
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
		...mapState("auth", {
			authenticated: (state) => state.accessToken || false,
			user: (state) => state.user,
		}),
		firstName() {
			return this.user && this.user.firstName
				? this.user.firstName
				: "Unknown User";
		},
		lastName() {
			return this.user && this.user.lastName
				? this.user.lastName
				: "Unknown User";
		},
		role() {
			return this.user && this.user.roles && this.user.roles.includes("teacher")
				? "Lehrer"
				: "Schüler";
		},
		schoolName() {
			return this.user && this.user.schoolName ? this.user.schoolName : "";
		},
		topBarActions() {
			return this.authenticated
				? [
						...topbarBaseActions,
						{ type: "text", title: this.schoolName },
						{
							type: "popupWithInitials",
							firstname: this.firstName,
							lastname: this.lastName,
							role: this.role,
							event: "logout",
						},
				  ]
				: [...topbarBaseActions];
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

			return sidebarItems.map((item) => {
				const isActive = this.$route.path.includes(item.href);
				item.childActive = item.children
					? item.children.some((child) => this.$route.path.includes(child.href))
					: false;
				item.active = isActive && !item.childActive;
				item.title = this.$t(`${item.title}`);

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
		...mapActions("auth", ["logout"]),
		isDemoRole(roles) {
			return roles.some((role) => role.startsWith("demo"));
		},
		handleTopAction(event) {
			if (event === "logout") {
				this.logout();
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
