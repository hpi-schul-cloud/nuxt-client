<template>
	<div v-if="team">
		<section class="section">
			<base-link :to="{ name: 'teams-id', params: { id: team._id } }">
				<h4>{{ team.name }}</h4>
			</base-link>
			<h2>Mitglieder Übersicht</h2>
		</section>
		<section class="section">
			<div class="columns">
				<div class="column">
					<p>Füge Lehrer und Schüler aus deiner Schule zum Team hinzu.</p>
					<base-button
						class="button is-primary"
						@click="addInternalModalActive = true"
						>Interne Teilnehmer hinzufügen</base-button
					>
				</div>
				<div class="column">
					<p>Lade Lehrer anderer Schulen und Experten per E-Mail ein.</p>
					<base-button
						class="button is-primary"
						@click="addInternalModalActive = true"
						>Externe Teilnehmer hinzufügen</base-button
					>
				</div>
			</div>
		</section>
		<section>
			<h3>Tabelle</h3>
			<base-table :data="team.userIds" :columns="columns"></base-table>
		</section>

		<base-modal :active.sync="addInternalModalActive">
			<div class="modal-header">
				<h3>Internen Teilnehmer hinzufügen</h3>
			</div>

			<div class="modal-body">
				<div class="d-flex">
					<base-button
						:class="{ 'is-primary': internalTab === 'addMember' }"
						@click="internalTab = 'addMember'"
					>
						Person hinzufügen
					</base-button>
					<base-button
						:class="{ 'is-primary': internalTab === 'addClass' }"
						@click="internalTab = 'addClass'"
					>
						Klasse hinzufügen
					</base-button>
				</div>

				<div>
					<div v-if="internalTab === 'addMember'">
						<p>Mitglied</p>
					</div>
					<div v-if="internalTab === 'addClass'">
						<p>Klasse</p>
					</div>
				</div>
			</div>

			<div class="modal-footer">
				<base-button
					id="button"
					class="is-light"
					@click="addInternalModalActive = false"
				>
					Hinzufügen
				</base-button>
			</div>
		</base-modal>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	data() {
		return {
			addInternalModalActive: false,
			addExternalModalActive: false,
			internalTab: "addMember",
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
					field: "lastName",
					label: "Last Name",
				},
			],
		};
	},
	computed: {
		...mapGetters("teams", {
			team: "current",
		}),
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
