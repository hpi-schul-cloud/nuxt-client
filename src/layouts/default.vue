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
		icon: "solid/qrcode",
		component: "menu-qr-code",
	},
	{
		type: "popupIcon",
		title: "Hilfe",
		icon: "solid/question",
		component: "help-dropdown",
		config: {
			menuItems: [
				{
					label: "Hilfebereich",
					icon: "solid/question-circle",
					action: "/help",
				},
				{
					label: "Intro",
					icon: "solid/map-signs",
					action: "#",
				},
				{
					label: "Wunsch oder Problem senden",
					icon: "solid/pencil",
					action: "#",
				},
				{
					label: "Admin deiner Schule kontaktieren",
					icon: "solid/comment",
					action: "#",
				},
			],
		},
	},
	{ type: "text", schoolname: "HPI Schul-Cloud Schule" },
];

export default {
	components: {
		TheTopBar,
		TheSidebar,
		TheFooter,
	},
	data() {
		return {
			sidebarItems: [
				{
					title: "Übersicht",
					href: "/dashboard",
					icon: "solid/th-large",
				},
				{
					title: "Kurse",
					href: "/courses",
					icon: "solid/graduation-cap",
				},
				{ title: "Teams", href: "/teams", icon: "solid/users" },
				{ title: "Aufgaben", href: "/homework", icon: "solid/tasks" },
				{
					title: "Meine Dateien",
					href: "/files",
					icon: "solid/folder-open",
				},
				{
					title: "Neuigkeiten",
					href: "/news",
					icon: "regular/newspaper",
				},
				{ title: "Termine", href: "/calendar", icon: "solid/table" },
				{ title: "Lern-store", href: "/content", icon: "solid/search" },
				// { title: "Verwaltung", href: "/administration", icon: "school" },
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
		topBarActions() {
			return this.authenticated
				? [
						...topbarBaseActions,
						{
							type: "popupWithInitials",
							title: this.firstName,
							event: "logout",
						},
				  ]
				: [...topbarBaseActions];
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
