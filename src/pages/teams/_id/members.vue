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
			<base-table
				v-slot:default="slotProps"
				:data="team.userIds"
				:columns="columns"
			>
				<base-icon
					icon="delete"
					class="cursor-pointer"
					@click.native="removeMember(slotProps.row.userId)"
				/>
			</base-table>
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
						<p>
							<span>Füge Lehrer und Schüler deiner Schule zum Team hinzu</span>
							<base-select
								:value.sync="membersSelected"
								:options="members"
								:allow-empty="false"
								:multiple="true"
								label="fullName"
								input-label="Tag"
							></base-select>
						</p>
					</div>
					<div v-if="internalTab === 'addClass'">
						<p>Klasse</p>
					</div>
				</div>
			</div>

			<div class="modal-footer">
				<base-button id="button" class="is-light" @click="addTeamMembers">
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
			membersSelected: [],
			members: [],
			columns: [
				{
					field: "userId.firstName",
					label: "First Name",
				},
				{
					field: "userId.lastName",
					label: "Last Name",
				},
				{
					field: "role.name",
					label: "Rolle",
				},
			],
		};
	},
	computed: {
		...mapGetters("teams", {
			team: "current",
		}),
	},
	async created(ctx) {
		await this.getTeam();
		await this.getMembers();
	},
	methods: {
		async getMembers() {
			let members = (await this.$store.dispatch("users/find", {
				query: {
					$limit: 10000,
				},
			})).data;

			members = members.filter((member) => {
				return !this.team.userIds.find((user) => {
					return member._id === user.userId._id;
				});
			});

			members = members.map((member) => {
				member.fullName = member.firstName + " " + member.lastName;
				return member;
			});

			this.members = members;
		},
		async addTeamMembers() {
			let newMembers = this.membersSelected.map((m) => {
				return {
					userId: m._id,
				};
			});

			let currentMembers = this.team.userIds.map((u) => {
				u.role = u.role._id;
				u.userId = u.userId._id;
				return u;
			});

			let userIds = newMembers.concat(currentMembers);

			await this.$store.dispatch("teams/patch", [
				this.team._id,
				{
					userIds,
				},
			]);

			this.membersSelected = [];
			await this.getTeam();
			this.getMembers();
			this.addInternalModalActive = false;
		},
		removeMember(user) {
			this.$dialog.confirm({
				title: "Mitglied entfernen",
				message:
					"Bist du sicher, dass du " +
					user.firstName +
					" " +
					user.lastName +
					" aus dem Team entfernen möchtest?",
				confirmText: "Mitglied entfernen",
				type: "is-danger",
				hasIcon: true,
				onConfirm: async () => {
					try {
						let userIds = this.team.userIds.map((u) => {
							u.role = u.role._id;
							u.userId = u.userId._id;
							return u;
						});
						userIds = userIds.filter((m) => m.userId !== user._id);

						await this.$store.dispatch("teams/patch", [
							this.team._id,
							{
								userIds,
							},
						]);

						this.$toast.error("Mitglied entfernt");
						await this.getTeam();
						this.getMembers();
					} catch (e) {
						this.$toast.error("Fehler beim Entfernen");
					}
				},
			});
		},
		getTeam() {
			this.$store.dispatch("teams/get", [
				this.$route.params.id,
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
