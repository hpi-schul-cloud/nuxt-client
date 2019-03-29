<template>
	<div>
		<section class="section">
			<base-button @click="$router.push({ name: 'teams-create' })">
				Neues Team erstellen
			</base-button>
		</section>
		<section class="section">
			<base-card v-for="(team, i) of teams" :key="i">
				<h1 slot="header" class="h4">{{ team.name }}</h1>
				<p>{{ team.description }}</p>
				<base-link
					slot="footer"
					:to="{ name: 'teams-id', params: { id: team._id } }"
				>
					Anschauen
				</base-link>
			</base-card>
		</section>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import isAuthenticated from "@middleware/is-authenticated";

export default {
	head() {
		return {
			title: "Teams",
		};
	},
	middleware: [isAuthenticated],
	computed: {
		...mapGetters("teams", {
			teams: "list",
		}),
	},
	created(ctx) {
		this.find();
	},
	methods: {
		find() {
			this.$store.dispatch("teams/find");
		},
	},
};
</script>
