<template lang="pug">
div(v-if="team")
  section.section
    h1 Team erstellen
    b-field(label="Name")
        b-input(type="text" v-model="team.name" placeholder="Dream Team" maxlength="30")
    b-field(label="Beschreibung")
        b-input(type="textarea" v-model="team.description" placeholder="Everything you have to know" maxlength="255")
    button.button.is-primary(@click="create()") Speichern
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
