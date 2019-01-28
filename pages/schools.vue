<template>
	<section class="section">
		<div class="columns is-mobile">
			<button @click="find()">Schulen laden</button>

			<div v-for="(school, i) of schools" :key="i" class="column">
				<div class="card">
					<header class="card-header">
						<p class="card-header-title has-text-grey">{{ school.name }}</p>
					</header>
					<div class="card-content">
						<div class="content">{{ school.description }}</div>
					</div>
					<footer class="card-footer">
						<div class="card-footer-item">
							<nuxt-link :to="{ name: 'schools-id', params: { id: school.id } }"
								>Öffnen</nuxt-link
							>
						</div>
					</footer>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	// asyncData () {
	//     return {
	//         teams: teams || []
	//     };
	// },
	computed: {
		...mapGetters('schools', {
			schools: 'list',
		}),
	},
	created(ctx) {
		// Query users from Feathers
	},
	methods: {
		find() {
			this.$store.dispatch('schools/find');
		},
		...mapActions('auth', ['logout']),
	},
};
</script>
