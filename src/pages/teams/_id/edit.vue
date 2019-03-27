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
				type="text"
				placeholder="Dream Team"
				maxlength="30"
			></BaseInput>
			<BaseInput
				v-model="team.description"
				label="Beschreibung"
				type="textarea"
				placeholder="Everything you have to know"
				maxlength="255"
			></BaseInput>
			<BaseButton class="is-primary" @click="save">Speichern</BaseButton>
		</section>
		<section class="section">
			<h1>{{ team.name }}</h1>
			<h5>{{ team.description }}</h5>
		</section>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
	computed: {
		...mapGetters("teams", {
			team: "current",
		}),
	},
	created(ctx) {
		this.get(this.$route.params.id);
	},
	methods: {
		...mapActions("teams", ["remove"]),
		confirmDelete() {
			this.$dialog.confirm({
				title: "Team löschen",
				message: "Bist du sicher, dass du das Team löschen möchtest?",
				confirmText: "Team löschen",
				type: "is-danger",
				hasIcon: true,
				onConfirm: async () => {
					try {
						await this.remove(this.team._id);
						this.$toast.error("Team gelöscht");
						this.$router.push({ name: "teams" });
					} catch (e) {
						this.$toast.error("Fehler beim Löschen");
					}
				},
			});
		},
		get(id) {
			this.$store.dispatch("teams/get", id);
		},
		async save() {
			try {
				await this.$store.dispatch("teams/patch", [
					this.$route.params.id,
					{
						name: this.team.name,
						description: this.team.description,
					},
				]);
				this.$toast.success("Team gespeichert");
			} catch (e) {
				this.$toast.error("Fehler beim Speichern");
			}
		},
	},
};
</script>
