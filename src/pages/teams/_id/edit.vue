<template>
	<div v-if="team">
		<section class="section">
			<h4>
				<span>
					<BaseLink :to="{ name: 'teams' }">Teams</BaseLink>
				</span>
				<span>
					<BaseLink :to="{ name: 'teams-id', params: { id: team._id } }"
						>/ {{ team.name }}</BaseLink
					>
				</span>
				<span>/ Bearbeiten</span>
			</h4>
			<h1>Team bearbeiten</h1>
			<BaseButton class="is-danger" @click="confirmDelete">Löschen</BaseButton>
		</section>
		<section class="section">
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
			<BaseButton class="is-primary" @click="save()">Speichern</BaseButton>
		</section>
		<section class="section">
			<h1>{{ team.name }}</h1>
			<h5>{{ team.description }}</h5>
		</section>
	</div>
</template>

<script>
export default {
	data () {
		return {
			team: {}
		};
	},
	async created () {
		const { Team } = this.$FeathersVuex;
		this.team = await Team.get(this.$route.params.id)
	},
	methods: {
		async confirmDelete() {
			// TODO: Dialog

			// this.$dialog.confirm({
			// 	title: "Team löschen",
			// 	message: "Bist du sicher, dass du das Team löschen möchtest?",
			// 	confirmText: "Team löschen",
			// 	type: "is-danger",
			// 	hasIcon: true,
			// 	onConfirm: async () => {
			// 		try {
			// 			await this.remove(this.team._id);
			// 			this.$toast.open("Team gelöscht");
			// 			this.$router.push({ name: "teams" });
			// 		} catch (e) {
			// 			this.$toast.open({
			// 				message: "Fehler beim löschen",
			// 				type: "is-danger",
			// 			});
			// 		}
			// 	},
			// });

			try {
				await this.team.remove()
	
				this.$router.push({ name: "teams" });
			} catch (e) {
				// console.log(e)
			}
		},
		async save() {
			try {
				await this.team.save();

				// this.$toast.open({
				// 	message: "Team gespeichert",
				// 	type: "is-success",
				// });

				this.$router.push({ name: "teams-id", params: { id: this.team._id } });
			} catch (e) {
				// console.log(e)
				// this.$toast.open({
				// 	message: "Fehler beim Speichern",
				// 	type: "is-danger",
				// });
			}
		},
	},
};
</script>
