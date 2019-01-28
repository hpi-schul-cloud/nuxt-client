<template>
	<div v-if="team">
		<section class="section">
			<h1>Team erstellen</h1>
			<b-field label="Name">
				<b-input
					v-model="team.name"
					type="text"
					placeholder="Dream Team"
					maxlength="30"
				></b-input>
			</b-field>
			<b-field label="Beschreibung">
				<b-input
					v-model="team.description"
					type="textarea"
					placeholder="Everything you have to know"
					maxlength="255"
				></b-input>
			</b-field>
			<button class="button is-primary" @click="create()">Speichern</button>
		</section>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
	data() {
		return {
			team: {
				name: '',
				description: '',
			},
		};
	},
	computed: {
		...mapState('auth', {
			user: 'user',
		}),
	},
	methods: {
		async create(id) {
			try {
				const team = await this.$store.dispatch('teams/create', {
					schoolId: this.user.schoolId,
					name: this.team.name,
					description: this.team.description,
				});

				this.$toast.open({
					message: 'Team erstellt',
					type: 'is-success',
				});

				this.$router.push({ name: 'teams-id', params: { id: team._id } });
			} catch (e) {
				this.$toast.open({
					message: 'Fehler beim Erstellen des Teams',
					type: 'is-danger',
				});
			}
		},
		...mapActions('auth', ['logout']),
	},
};
</script>
