<template>
	<!-- default template = loggedin view -->
	<div>
		<div class="page">
			<the-top-bar
				:title="pageTitle"
				class="topbar"
				:actions="topBarActions"
				:fullscreen-mode="fullscreenMode"
				@action="handleTopAction"
			/>
			<the-sidebar
				v-if="!fullscreenMode"
				class="sidebar"
				:routes="sidebarItems"
			/>
			<main class="content">
				<Nuxt />
			</main>
			<the-footer class="footer" />
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import TheTopBar from "@components/TheTopBar";
import TheSidebar from "@components/TheSidebar";
import TheFooter from "@components/TheFooter";

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
				},
				// {
				// 	label: "Intro",
				// 	icon: "map-signs",
				// 	action: "/",
				// },
				{
					label: "Wunsch oder Problem senden",
					icon: "pencil",
					action: "/help?activeForm=team#contact-form",
				},
				{
					label: "Admin deiner Schule kontaktieren",
					icon: "comment",
					action: "/help?activeForm=admin#contact-form",
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
	},
	data() {
		return {
			sidebarBaseItems: [
				{
					title: "Übersicht",
					href: "/dashboard",
					icon: "th-large",
				},
				{
					title: "Kurse",
					href: "/courses",
					icon: "graduation-cap",
				},
				{ title: "Teams", href: "/teams", icon: "users" },
				{ title: "Aufgaben", href: "/homework", icon: "tasks" },
				{
					title: "Meine Dateien",
					href: "/files",
					icon: "folder-open",
				},
				{
					title: "Neuigkeiten",
					href: "/news",
					icon: "newspaper-o",
				},
				{ title: "Termine", href: "/calendar", icon: "table" },
				{ title: "Lern-store", href: "/content", icon: "search" },
				{
					title: "Verwaltung",
					href: "/administration",
					icon: "cogs",
					permission: 'STUDENT_CREATE',
        			excludedPermission: 'ADMIN_VIEW',
				},
				{
					title: 'Helpdesk',
					href: '/administration/helpdesk/',
        			icon: 'ticket',
       				permission: 'HELPDESK_VIEW'
				},
				{
					title: 'Administration',
       				href: '/administration/',
        			icon: 'cogs',
        			permission: 'ADMIN_VIEW',
				},
				{
					title: 'Meine Materialien',
       				href: '/my-material/',
					icon: 'book',
        			permission: 'BETA_FEATURES'
				},
			],
			pageTitle: this.$theme.short_name,
			fullscreenMode: false,
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

			const sidebarItems = this.sidebarBaseItems.filter(
				(item) => {
					const hasRequiredPermission = this.user.permissions && this.user.permissions.includes(item.permission);
					const hasExcludedPermission = this.user.permissions && this.user.permissions.includes(item.excludedPermission);

					return !item.permission || (hasRequiredPermission && !hasExcludedPermission);
				});

			const teamsEnabled = process.env.FEATURE_TEAMS_ENABLED === 'true';

			if (teamsEnabled) {
        		sidebarItems.splice(2, 0, {
					title: 'Teams',
					icon: 'users',
					href: '/teams/',
				});
				// sidebarItems.find(i => i.name === 'Meine Dateien').children.splice(2, 0, {
				// 	title: 'Teams',
				// 	icon: 'folder-open-o',
				// 	href: '/files/teams/',
			}

			return sidebarItems.map((item) => {
				item.active = this.$route.path.includes(item.href);
				return item;
			});
		},
	},
	watch: {
		$route: function(to) {
			try {
				this.pageTitle = this.$children[2].$children[0].$metaInfo.title;
			} catch {
				this.pageTitle = to.name;
			}
		},
	},
	methods: {
		...mapActions("auth", ["logout"]),
		handleTopAction(event) {
			if (event === "logout") {
				this.logout();
				this.$router.push({ name: "login" });
			}
			if (event === "fullscreen") {
				this.fullscreenMode = !this.fullscreenMode;
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
		"top top"
		"side content"
		"footer footer";
	grid-template-rows: auto 1fr auto;
	grid-template-columns: auto 1fr;
	width: 100%;
	min-height: 100vh;
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
.content {
	grid-area: content;
	min-width: var(--size-content-width-min);
	max-width: var(--size-content-width-max);
	margin: var(--space-md) auto;
}
</style>
