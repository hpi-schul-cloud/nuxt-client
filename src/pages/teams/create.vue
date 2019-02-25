<template>
	<div v-if="team">
		<section class="section">
			<h1>Team erstellen</h1>
			<BaseInput
				v-model="team.name"
				label="Name"
				name="name"
				type="text"
				placeholder="Dream Team"
				maxlength="30"
			></BaseInput>
			<BaseInput
				v-model="team.description"
				label="Beschreibung"
				name="description"
				type="text"
				placeholder="Everything you have to know"
				maxlength="255"
			></BaseInput>
			<BaseButton class="is-primary" @click="create()">Speichern</BaseButton>
		</section>
	</div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
	data() {
		return {
			team: {
				name: "",
				description: "",
			},
		};
	},
	computed: {
		...mapState("auth", {
			user: "user",
		}),
	},
	methods: {
		async create(id) {
			try {
				const team = await this.$store.dispatch("teams/create", {
					schoolId: this.user.schoolId,
					name: this.team.name,
					description: this.team.description,
				});

				this.$toasted.success("Team erstellt");

				this.$router.push({ name: "teams-id", params: { id: team._id } });
			} catch (e) {
				this.$toasted.error("Fehler beim Erstellen des Teams");
			}
		},
	},
};
</script>
