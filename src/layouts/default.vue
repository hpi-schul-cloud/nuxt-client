<template>
	<!-- default template = loggedin view -->
	<div>
		<div class="page">
			<the-top-bar
				:title="pageTitle"
				class="topbar"
				:actions="topBarActions"

				@action="handleTopAction"
			/>
			<the-sidebar class="sidebar" :routes="sidebarItems" />
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
	{ title: "Fullscreen", icon:"solid/expand", event:"fullscreen" },
	{ title: "QR-Code", icon:"solid/qrcode" },
	{ title: "Hilfe", icon:"solid/question" },
	{ title: "HPI Schul-Cloud Schule" }
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
				// @TODO: hier fehlt noch ein Name
				{ title: "Übersicht", to: { name: "" }, icon: "solid/th-large" },
				{ title: "Kurse", to: { name: "courses" }, icon: "solid/graduation-cap" },
				{ title: "Aufgaben", to: { name: "tasks" }, icon: "solid/tasks" },
				{ title: "Meine Dateien", to: { name: "files" }, icon: "solid/folder-open" },
				{ title: "Neuigkeiten", to: { name: "news" }, icon: "regular/newspaper" },
				{ title: "Termine", to: { name: "events" }, icon: "solid/table" },
				{ title: "Lern-store", to: { name: "content" }, icon: "solid/search" },
				// { title: "Teams", to: { name: "teams" }, icon: "school" },
				// { title: "Verwaltung", to: { name: "administration" }, icon: "school" },
			],
			topBarActions: topbarBaseActions,
			pageTitle: this.$theme.short_name,
		};
	},
	computed: mapState({
		firstName: (state) =>
			state.auth && state.auth.user ? state.auth.user.firstName : "",
		authenticated: (state) => (state.auth ? state.auth.accessToken : ""),
	}),
	watch: {
		$route: function(to) {
			// TODO get page title from `this.$metaInfo.title`
			this.pageTitle = to.name;
		},
		authenticated: function() {
			this.updateTopBarActions(this.authenticated);
		},
	},
	created() {
		this.updateTopBarActions(this.authenticated);
	},
	methods: {
		...mapActions("auth", ["logout"]),
		handleTopAction(event) {
			if (event === "logout") {
				this.logout();
				this.$router.push({ name: "login" });
			}
			if (event === "fullscreen") {
				// implement functionality
			}
		},
		updateTopBarActions(isAuthenticated) {
			if (isAuthenticated) {
				this.topBarActions = [
					...topbarBaseActions,
					{
						title: this.firstName,
						event: "logout",
					},
				];
			} else {
				this.topBarActions = [...topbarBaseActions];
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
	margin: 0 auto;
}
</style>
