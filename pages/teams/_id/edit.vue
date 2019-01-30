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
			<button class="button is-danger" @click="confirmDelete">Löschen</button>
		</section>
		<section class="section">
			<BField label="Name">
				<BInput
					v-model="team.name"
					type="text"
					placeholder="Dream Team"
					maxlength="30"
				></BInput>
			</BField>
			<BField label="Beschreibung">
				<BInput
					v-model="team.description"
					type="textarea"
					placeholder="Everything you have to know"
					maxlength="255"
				></BInput>
			</BField>
			<button class="button is-primary" @click="save()">Speichern</button>
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
						this.$toast.open("Team gelöscht");
						this.$router.push({ name: "teams" });
					} catch (e) {
						this.$toast.open({
							message: "Fehler beim löschen",
							type: "is-danger",
						});
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
				this.$toast.open({
					message: "Team gespeichert",
					type: "is-success",
				});
			} catch (e) {
				this.$toast.open({
					message: "Fehler beim Speichern",
					type: "is-danger",
				});
			}
		},
	},
};
</script>
