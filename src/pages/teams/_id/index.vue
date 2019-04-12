<template>
	<div v-if="team">
		<section class="section">
			<base-breadcrumb :inputs="breadcrumbs" />

			<base-button
				class="button is-info"
				@click="$router.push({ name: 'teams-id-edit' })"
			>
				Team bearbeiten
			</base-button>
		</section>
		<section v-if="team.userIds" class="section">
			<h3>Teilnehmer</h3>
			<p>Es befinden sich {{ team.userIds.length }} Teilnehmer im Team</p>
			<base-button
				class="button is-info"
				@click="
					$router.push({ name: 'teams-id-members', params: { id: team._id } })
				"
			>
				Zur Teilnehmer-Übersicht
			</base-button>
		</section>
		<section class="section">
			<h3>News</h3>
		</section>
		<section class="section">
			<h3>Dateien & Ordner</h3>
			<h4>Ordner</h4>
			<h4>Dateien</h4>
		</section>
		<section class="section">
			<h3>Termine</h3>
		</section>
		<section class="section">
			<h3>Themen & Aufgaben</h3>
		</section>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	data() {
		return {};
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
				},
			];
		},
	},
	created(ctx) {
		this.get(this.$route.params.id);
	},
	methods: {
		get(id) {
			this.$store.dispatch("teams/get", id);
		},
	},
};
</script>
