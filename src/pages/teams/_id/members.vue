<template>
	<!-- eslint-disable max-lines -->
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
				<!-- TODO -->
				<!-- <div class="column">
					<p>Lade Lehrer anderer Schulen und Experten per E-Mail ein.</p>
					<base-button
						class="button is-primary"
						@click="addInternalModalActive = true"
						>Externe Teilnehmer hinzufügen</base-button
					>
				</div> -->
			</div>
		</section>

		<section>
			<h3>Mitglieder</h3>
			<base-table
				v-slot:default="slotProps"
				:data="teamMembers"
				:columns="columns"
			>
				<base-icon
					icon="delete"
					class="cursor-pointer"
					@click.native="removeMember(slotProps.row.userId)"
				/>
				<base-icon
					icon="edit"
					class="cursor-pointer"
					@click.native="editMember(slotProps.row)"
				/>
			</base-table>
		</section>

		<section>
			<h3>Klassen</h3>
			<base-table
				v-slot:default="slotProps"
				:data="teamClasses"
				:columns="columnsClasses"
			>
				<base-icon
					icon="delete"
					class="cursor-pointer"
					@click.native="removeClass(slotProps.row._id)"
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
							></base-select>
						</p>
					</div>
					<div v-if="internalTab === 'addClass'">
						<p>
							<span
								>Füge eine oder mehrere Klassen deiner Schule zum Team
								hinzu</span
							>
							<base-select
								:value.sync="classesSelected"
								:options="classes"
								:allow-empty="false"
								:multiple="true"
								label="displayName"
								input-label="Nach dem Speichern werden alle Schüler automatisch hinzugefügt."
							></base-select>
						</p>
					</div>
				</div>
			</div>

			<div class="modal-footer">
				<base-button id="button" class="is-light" @click="addTeamMembers">
					Hinzufügen
				</base-button>
			</div>
		</base-modal>

		<base-modal ref="editMemberModal" :active.sync="editMemberModalActive">
			<div class="modal-header">
				<h3>Teilnehmer bearbeiten</h3>
			</div>

			<div class="modal-body">
				<p>Ändere die Rolle des Nutzers:</p>
				<base-select
					:value.sync="memberSelected.role"
					:options="teamRoles"
					track-by="_id"
					:allow-empty="false"
					label="label"
				></base-select>
			</div>

			<div class="modal-footer">
				<base-button id="button" class="is-light" @click="saveMember">
					Speichern
				</base-button>
			</div>
		</base-modal>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

const roleTranslations = {
	teammember: "Teilnehmer",
	teamexpert: "externer Experte",
	teamleader: "Leiter",
	teamadministrator: "Team-Admin",
	teamowner: "Team-Admin (Eigentümer)",
};

export default {
	data() {
		return {
			addInternalModalActive: false,
			addExternalModalActive: false,
			editMemberModalActive: false,
			internalTab: "addMember",
			membersSelected: [],
			members: [],
			classesSelected: [],
			classes: [],
			memberSelected: {},
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
					field: "role.label",
					label: "Rolle",
				},
			],
			columnsClasses: [
				{
					field: "displayName",
					label: "Name",
				},
				{
					field: "yearName",
					label: "Jahrgang",
				},
			],
		};
	},
	computed: {
		...mapGetters("teams", {
			team: "current",
		}),
		...mapGetters("roles", {
			roles: "list",
		}),
		teamRoles() {
			return this.roles
				.filter((r) => r.name.includes("team"))
				.map((r) => {
					r.label = roleTranslations[r.name];
					return r;
				});
		},
		teamMembers() {
			let members = this.team.userIds;
			members = members.map((m) => {
				if (typeof m.role === "object") {
					m.role.label = roleTranslations[m.role.name];
				}
				return m;
			});

			return members;
		},
		teamClasses() {
			let classes = this.team.classIds;

			classes = classes.map((c) => {
				if (typeof c === "object") {
					c.displayName = (c.gradeLevel ? c.gradeLevel.name : "") + c.name;
					c.yearName = c.year.name;
				}
				return c;
			});

			return classes;
		},
	},
	async created(ctx) {
		await this.$store.dispatch("roles/find", { query: { $limit: 1000 } });
		await this.getTeam();
		await this.getMembers();
		await this.getClasses();
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
		async getClasses() {
			let classes = (await this.$store.dispatch("classes/find", {
				query: {
					$limit: 10000,
				},
			})).data;

			classes = classes.filter((schoolClass) => {
				return !this.team.classIds.find((c) => {
					return c._id === schoolClass._id;
				});
			});

			this.classes = classes;
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

			let newClasses = this.classesSelected.map((c) => c._id);
			let currentClasses = this.team.classIds.map((c) => c._id);
			let classIds = newClasses.concat(currentClasses);

			await this.$store.dispatch("teams/patch", [
				this.team._id,
				{
					userIds,
					classIds,
				},
			]);

			this.membersSelected = [];
			this.classesSelected = [];

			await this.getTeam();
			this.getMembers();
			this.addInternalModalActive = false;
			this.$toast.success(
				(this.internalTab === "addMember" ? "Mitglied/er" : "Klasse/n") +
					" hinzugefügt"
			);
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

						this.$toast.success("Mitglied entfernt");
						await this.getTeam();
						this.getMembers();
					} catch (e) {
						this.$toast.error("Fehler beim Entfernen");
					}
				},
			});
		},
		editMember(teamMember) {
			this.editMemberModalActive = true;
			this.memberSelected = teamMember;
			this.memberSelected.role.label =
				roleTranslations[this.memberSelected.role.name];
		},
		async saveMember() {
			try {
				let userIds = [...this.team.userIds];
				userIds = userIds.map((u) => {
					u.role = u.role._id;
					u.userId = u.userId._id;

					if (u.userId === this.memberSelected.userId._id) {
						u.role = this.memberSelected.role._id;
					}
					return u;
				});

				this.memberSelected = {};

				await this.$store.dispatch("teams/patch", [
					this.team._id,
					{
						userIds,
					},
				]);

				await this.getTeam();
				await this.getMembers();
				this.editMemberModalActive = false;
				this.$toast.success("Änderung gespeichert");
			} catch (e) {
				this.$toast.error("Fehler beim Bearbeiten");
			}
		},
		removeClass(schoolClass) {
			this.$dialog.confirm({
				title: "Klasse entfernen",
				message:
					"Bist du sicher, dass du die Klasse" +
					schoolClass.displayName +
					" aus dem Team entfernen möchtest?",
				confirmText: "Klasse entfernen",
				type: "is-danger",
				hasIcon: true,
				onConfirm: async () => {
					try {
						let classIds = this.team.classIds.map((c) => c._id);
						classIds = classIds.filter((c) => c._id !== schoolClass._id);

						await this.$store.dispatch("teams/patch", [
							this.team._id,
							{
								classIds,
							},
						]);

						this.$toast.error("Klasse entfernt");
						await this.getTeam();
						this.getClasses();
					} catch (e) {
						this.$toast.error("Fehler beim Entfernen");
					}
				},
			});
		},
		async getTeam() {
			await this.$store.dispatch("teams/get", [
				this.$route.params.id,
				{
					query: {
						$populate: [
							{
								path: "userIds.userId",
								populate: ["schoolId"],
							},
							{
								path: "classIds",
								populate: ["year", "gradeLevel"],
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
