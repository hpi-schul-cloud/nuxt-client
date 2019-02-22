<template>
	<div v-if="team">
		<section class="section">
			<h1>Team erstellen</h1>
			<BaseInput
				v-model="team.name"
				label="Name"
				type="text"
				name="name"
				placeholder="Dream Team"
				maxlength="30"
			></BaseInput>
			<BaseInput
				v-model="team.description"
				label="Beschreibung"
				type="text"
				name="description"
				placeholder="Everything you have to know"
				maxlength="255"
			></BaseInput>
			<BaseButton class="is-primary" @click="create()">Speichern</BaseButton>
		</section>
	</div>
</template>

<script>
export default {
	data () {
		const { Team } = this.$FeathersVuex;
		const team = new Team()

		return {
			team
		};
	},
	methods: {
		async create(id) {
			const { Team } = this.$FeathersVuex;
			this.team.schoolId = this.$user.schoolId;

			try {
				const team = await this.team.create(); 

				// this.$toast.open({
				// 	message: "Team erstellt",
				// 	type: "is-success",
				// });

				this.$router.push({ name: "teams-id", params: { id: team._id } });
			} catch (e) {
				// console.log(e)

				// this.$toast.open({
				// 	message: "Fehler beim Erstellen des Teams",
				// 	type: "is-danger",
				// });
			}
		}
	},
};
</script>
