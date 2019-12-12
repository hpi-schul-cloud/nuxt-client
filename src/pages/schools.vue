<template>
	<section>
		<base-button @click="find">Schulen laden</base-button>

		<base-card v-for="(school, i) of schools" :key="i" class="school-card">
			<p slot="header">{{ school.name }}</p>
			<div>{{ school.description }}</div>
			<p slot="footer">
				<base-link :to="{ name: 'schools-id', params: { id: school.id } }">
					Öffnen
				</base-link>
			</p>
		</base-card>
	</section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
	// asyncData () {
	//     return {
	//         teams: teams || []
	//     };
	// },
	computed: {
		...mapGetters("schools", {
			schools: "list",
		}),
	},
	created(ctx) {
		// Query users from Feathers
	},
	methods: {
		find() {
			this.$store.dispatch("schools/find");
		},
		...mapActions("auth", ["logout"]),
	},
};
</script>

<style lang="scss" scoped>
.school-card {
	padding: var(--space-xs);
}
</style>
