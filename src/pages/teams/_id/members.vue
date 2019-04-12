<template>
	<div v-if="team">
		<section class="section">
			<base-breadcrumb :inputs="breadcrumbs" />

			<h1>Mitglieder Übersicht</h1>
		</section>
		<section class="section">
			<div class="columns">
				<div class="column">
					<p>Füge Lehrer und Schüler aus deiner Schule zum Team hinzu.</p>
					<button
						class="button is-primary"
						@click="
							$router.push({
								name: 'teams-id-members',
								params: { id: team._id },
							})
						"
						>Interne Teilnehmer hinzufügen</button
					>
				</div>
				<div class="column">
					<p>Lade Lehrer anderer Schulen und Experten per E-Mail ein.</p>
					<button
						class="button is-primary"
						@click="
							$router.push({
								name: 'teams-id-members',
								params: { id: team._id },
							})
						"
						>Externe Teilnehmer hinzufügen</button
					>
				</div>
			</div>
		</section>
		<section>
			<button
				:disabled="!selected"
				class="button field is-danger"
				@click="selected = null"
			>
				<base-icon icon="close"></base-icon>
				<span>Clear selected</span>
			</button>
		</section>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	data() {
		return {
			selected: null,
			columns: [
				{
					field: "_id",
					label: "ID",
					width: "40",
					numeric: true,
				},
				{
					field: "firstName",
					label: "First Name",
				},
				{
					field: "lastNAme",
					label: "Last Name",
				},
			],
		};
	},
	computed: {
		...mapGetters("teams", {
			team: "current",
		}),
		breadcrumbs() {
			return [
				{ text: "Teams", to: { name: "teams" } },
				{
					text: this.team.name,
					to: { name: "teams-id", params: { id: this.team._id } },
				},
				{ text: "Mitglieder" },
			];
		},
	},
	created(ctx) {
		this.get(this.$route.params.id);
	},
	methods: {
		get(id) {
			this.$store.dispatch("teams/get", [
				id,
				{
					query: {
						$populate: [
							{
								path: "userIds.userId",
								populate: ["schoolId"],
							},
							{
								path: "userIds.role",
							},
						],
					},
				},
			]);
		},
	},
};
</script>
