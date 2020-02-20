<template>
	<section>
		<base-button @click="find">Schulen laden</base-button>

		<base-card v-for="(school, i) of schools" :key="i" class="school-card">
			<template v-slot:header>
				<p>{{ school.name }}</p>
			</template>
			<template v-slot:default>
				<div>{{ school.description }}</div>
			</template>
			<template v-slot:footer>
				<p>
					<base-link :to="{ name: 'schools-id', params: { id: school.id } }">
						Öffnen
					</base-link>
				</p>
			</template>
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
