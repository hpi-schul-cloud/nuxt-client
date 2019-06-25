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

const topbarBaseActions = [];

export default {
	components: {
		TheTopBar,
		TheSidebar,
		TheFooter,
	},
	data() {
		return {
			sidebarItems: [
				{ title: "News", to: { name: "news" } },
				{ title: "Teams", to: { name: "teams" } },
				{ title: "Kurse", to: { name: "courses" } },
				{ title: "Termine", to: { name: "events" } },
				{ title: "Aufgaben", to: { name: "tasks" } },
				{ title: "Dateien", to: { name: "files" } },
				{ title: "Lernstore", to: { name: "content" } },
				{ title: "Verwaltung", to: { name: "administration" } },
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
			this.updateTopBarActions;
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
		},
		updateTopBarActions(isAuthenticated) {
			if (isAuthenticated) {
				this.topBarActions = [
					...topbarBaseActions,
					{
						event: "logout",
						title: this.firstName,
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
