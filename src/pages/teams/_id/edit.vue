<template>
	<div v-if="team">
		<section class="section">
			<h4>
				<span>
					<base-link :to="{ name: 'teams' }">Teams</base-link>
				</span>
				<span>
					<base-link :to="{ name: 'teams-id', params: { id: team._id } }"
						>/ {{ team.name }}</base-link
					>
				</span>
				<span>/ Bearbeiten</span>
			</h4>
			<base-button
				v-if="team.user && team.user.permissions.includes('DELETE_TEAM')"
				class="is-danger"
				@click="confirmDelete"
				>Löschen</base-button
			>
		</section>
		<section class="section">
			<base-input
				v-model="team.name"
				label="Name"
				name="name"
				type="text"
				placeholder="Dream Team"
				maxlength="30"
			></base-input>
			<base-input
				v-model="team.description"
				name="description"
				label="Beschreibung"
				type="textarea"
				placeholder="Everything you have to know"
				maxlength="255"
			></base-input>
			<base-button class="is-primary" @click="save">Speichern</base-button>
		</section>
		<section class="section">
			<h2>{{ team.name }}</h2>
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
