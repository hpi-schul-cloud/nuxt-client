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
			<main class="full-width-content">
				<Nuxt />
			</main>
			<the-footer class="footer" />
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import TheTopBar from "@components/legacy/TheTopBar";
import TheSidebar from "@components/legacy/TheSidebar";
import TheFooter from "@components/legacy/TheFooter";

export default {
	components: {
		TheTopBar,
		TheSidebar,
		TheFooter,
	},
	data() {
		return {
			sidebarItems: [
				{ title: "Übersicht", href: "/dashboard" },
				{ title: "Kurse", href: "/courses" },
				{ title: "Teams", href: "/teams" },
				{ title: "Aufgaben", href: "/homework" },
				{ title: "Dateien", href: "/files" },
				{ title: "News", to: { name: "news" } },
				{ title: "Termine", href: "/calendar" },
				{ title: "Lern-Store", href: "/content" },
				{ title: "Verwaltung", href: "/administration" },
			],
			pageTitle: this.$theme.short_name,
		};
	},
	computed: {
		topBarActions() {
			const actions = [];
			if (this.authenticated) {
				actions.push({
					event: "logout",
					title: this.firstName,
				});
			}
			return actions;
		},
		...mapState("auth", {
			authenticated: (state) => state.accessToken || false,
			user: (state) => state.user,
		}),
		firstName() {
			return this.user && this.user.firstName
				? this.user.firstName
				: "Unknown User";
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
.full-width-content {
	grid-area: content;
	min-width: var(--size-content-width-min);
	margin: var(--space-md);
}
</style>
