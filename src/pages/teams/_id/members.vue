<!-- eslint-disable max-lines -->
<!-- TODO refactor to reduce lines -->
<template>
	<div v-if="team">
		<section class="section">
			<base-breadcrumb :inputs="breadcrumbs" />
			<h1>Mitglieder Übersicht</h1>
		</section>

		<section class="section">
			<div>
				<div
					v-if="hasTeamPermission('ADD_SCHOOL_MEMBERS')"
					class="mb--lg column"
				>
					<p>Füge Lehrer und Schüler aus deiner Schule zum Team hinzu.</p>
					<base-button design="primary" @click="addInternalModalActive = true"
						>Interne Teilnehmer hinzufügen</base-button
					>
				</div>
				<div v-if="hasTeamPermission('INVITE_EXPERTS')" class="mb--lg column">
					<p>Lade Lehrer anderer Schulen und Experten per E-Mail ein.</p>
					<base-button design="primary" @click="addExternalModalActive = true"
						>Externe Teilnehmer einladen</base-button
					>
				</div>
				<!-- TODO -->
				<!-- <div class="column">
					<p>Lade Lehrer anderer Schulen und Experten per E-Mail ein.</p>
					<base-button
						design="primary"
						@click="addInternalModalActive = true"
						>Externe Teilnehmer hinzufügen</base-button
					>
				</div> -->
			</div>
		</section>

		<section class="section">
			<h3>Ausstehende Einladungen</h3>
			<base-table
				v-slot:default="slotProps"
				:data="invitedMembers"
				:columns="columnsInvited"
			>
				<base-icon
					source="material"
					icon="mail"
					class="cursor-pointer"
					@click.native="resendInvitation(slotProps.row.email)"
				/>
				<base-icon
					source="material"
					icon="delete"
					class="cursor-pointer"
					@click.native="deleteInvitation(slotProps.row.email)"
				/>
			</base-table>
		</section>

		<section class="section">
			<h3>Mitglieder</h3>
			<base-table
				v-slot:default="slotProps"
				:data="teamMembers"
				:columns="columns"
				:paginated="true"
				:pagination-state="stateMembers"
				:skip.sync="membersSkip"
				:total="stateMembers.total"
			>
				<base-icon
					source="material"
					icon="delete"
					class="cursor-pointer"
					@click.native="removeMember(slotProps.row.userId)"
				/>
				<base-icon
					source="material"
					icon="edit"
					class="cursor-pointer"
					@click.native="editMember(slotProps.row)"
				/>
			</base-table>
		</section>

		<section class="section">
			<h3>Klassen</h3>
			<base-table
				v-slot:default="slotProps"
				:data="teamClasses"
				:columns="columnsClasses"
			>
				<base-icon
					source="material"
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
						:design="tabs.internal === 'addMember' ? 'primary' : ''"
						@click="tabs.internal = 'addMember'"
					>
						Person hinzufügen
					</base-button>
					<base-button
						:design="tabs.internal === 'addClass' ? 'primary' : ''"
						@click="tabs.internal = 'addClass'"
					>
						Klasse hinzufügen
					</base-button>
				</div>

				<div>
					<div v-if="tabs.internal === 'addMember'">
						<p>
							<span>Füge Lehrer und Schüler deiner Schule zum Team hinzu</span>
							<base-select
								v-model="membersSelected"
								:options="members"
								:allow-empty="false"
								:multiple="true"
								option-label="fullName"
								label="Name"
							></base-select>
						</p>
					</div>
					<div v-if="tabs.internal === 'addClass'">
						<p>
							<span
								>Füge eine oder mehrere Klassen deiner Schule zum Team
								hinzu</span
							>
							<base-select
								v-model="classesSelected"
								:options="classes"
								:allow-empty="false"
								:multiple="true"
								option-label="displayName"
								label="Nach dem Speichern werden alle Schüler automatisch hinzugefügt."
							></base-select>
						</p>
					</div>
				</div>
			</div>

			<div class="modal-footer">
				<base-button id="button" design="text" @click="addTeamMembers">
					Hinzufügen
				</base-button>
			</div>
		</base-modal>

		<base-modal :active.sync="addExternalModalActive">
			<div class="modal-header">
				<h3>Externen Teilnehmer einladen</h3>
			</div>

			<div class="modal-body">
				<section class="section">
					<h3>Wen möchtest du ins Team einladen?</h3>
					<div class="d-flex">
						<base-button
							:design="tabs.who === 'teacher' ? 'primary' : ''"
							@click="tabs.who = 'teacher'"
						>
							Lehrer anderer Schulen
						</base-button>
						<base-button
							:design="tabs.who === 'expert' ? 'primary' : ''"
							@click="tabs.who = 'expert'"
						>
							Externe Experten
						</base-button>
					</div>
				</section>

				<div>
					<div v-if="tabs.who === 'teacher'">
						<section class="section">
							<h3>Lehrer anderer Schulen einladen</h3>
							<p>
								Wähle eine Lehrkraft anderer Schulen aus einem zentralen
								Verzeichnis aus oder gib die E-Mail-Adresse an, mit der sie
								registriert ist. Nach Beitritt zu deinem Team kann sie Schüler
								und Lehrer ihrer Schule zum Team hinzufügen.
							</p>
							<div class="d-flex">
								<base-button
									:design="tabs.from === 'directory' ? 'primary' : ''"
									@click="tabs.from = 'directory'"
								>
									Aus Verzeichnis auswählen
								</base-button>
								<base-button
									:design="tabs.from === 'email' ? 'primary' : ''"
									@click="tabs.from = 'email'"
								>
									per E-Mail einladen
								</base-button>
							</div>
						</section>

						<div v-if="tabs.from === 'directory'">
							<h3>Lehrer auswählen und hinzufügen</h3>
							<p>Bundesland wählen</p>
							<base-select
								v-if="federalStates && federalStates.length > 0"
								v-model="externalInvite.teacher.federalState"
								:options="federalStates"
								track-by="_id"
								:allow-empty="false"
								option-label="name"
								label="Bundesländer"
								placeholder="Bitte wähle ein Bundesland aus"
							></base-select>

							<div
								v-if="
									externalInvite &&
										externalInvite.teacher &&
										externalInvite.teacher.federalState &&
										externalInvite.teacher.federalState._id
								"
							>
								<div v-if="schools.length > 0">
									<p>Schule auswählen ({{ schools.length }} verfügbar)</p>
									<base-select
										v-if="schools && schools.length > 0"
										v-model="externalInvite.teacher.school"
										:options="schools"
										track-by="_id"
										:allow-empty="false"
										option-label="name"
										label="Schulen"
									></base-select>
								</div>
								<div v-else>
									<p>
										Keine Schulen in
										{{ externalInvite.teacher.federalState.name }} gefunden.
									</p>
								</div>
							</div>

							<div v-if="externalInvite.teacher.school._id">
								<div v-if="teachers.length > 0">
									<p>Lehrer auswählen ({{ teachers.length }} verfügbar)</p>
									<base-select
										v-model="externalInvite.teacher.user"
										:options="teachers"
										track-by="_id"
										:allow-empty="false"
										option-label="fullName"
									></base-select>
								</div>
								<div v-else>
									<p>Keine Lehrer gefunden.</p>
								</div>
							</div>
						</div>

						<div v-if="tabs.from === 'email'">
							<h3>Lehrer per E-Mail einladen</h3>
							<p>
								Gebe die E-Mail des Lehrers ein, an welchen die Einladung
								verschickt wird.
							</p>
							<base-input
								v-model="externalInvite.teacher.email"
								type="email"
								label="E-Mail eingeben"
							/>
						</div>
					</div>
					<div v-if="tabs.who === 'expert'">
						<h3>Externen Experten einladen</h3>
						<p>
							Gebe die E-Mail des Experten ein, an welchen die Einladung
							verschickt wird.
						</p>
						<base-input
							v-model="externalInvite.expert.email"
							type="email"
							label="E-Mail eingeben"
						/>
					</div>
				</div>
			</div>

			<div class="modal-footer">
				<base-button id="button" @click="addExternalMember">
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
					v-if="memberSelected && memberSelected.role"
					v-model="memberSelected.role"
					:options="teamRoles"
					track-by="_id"
					:allow-empty="false"
					option-label="label"
				></base-select>
			</div>

			<div class="modal-footer">
				<base-button id="button" design="primary" @click="saveMember">
					Speichern
				</base-button>
			</div>
		</base-modal>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import dayjs from "dayjs";

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
			externalInvite: {
				teacher: {
					federalState: {},
					school: {},
					user: {},
					email: "",
				},
				expert: {
					email: "",
				},
			},
			tabs: {
				internal: "addMember",
				who: "teacher",
				from: "directory",
			},
			membersSelected: [],
			membersSkip: 0,
			members: [],
			memberSelected: {},
			classesSelected: [],
			classes: [],
			columns: [
				{
					field: "userId.firstName",
					label: "First Name",
					sortable: true,
				},
				{
					field: "userId.lastName",
					label: "Last Name",
					sortable: true,
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
			columnsInvited: [
				{
					field: "email",
					label: "E-Mail",
				},
				{
					field: "createdAt",
					label: "Eingeladen am",
				},
				{
					field: "roleName",
					label: "Rolle",
				},
			],
		};
	},
	computed: {
		invitedMembers() {
			return this.team.invitedUserIds.map((invite) => {
				invite.createdAt = dayjs(invite.createdAt).format("DD.MM.YYYY");
				invite.roleName = roleTranslations[invite.role];
				return invite;
			});
		},
		stateMembers() {
			return {
				total: this.team ? this.team.userIds.length : 0,
				limit: 10,
				skip: this.membersSkip,
			};
		},
		...mapGetters("teams", {
			team: "current",
			hasTeamPermission: "hasTeamPermission",
		}),
		...mapGetters("roles", {
			roles: "list",
		}),
		...mapGetters("federal-states", {
			federalStates: "list",
		}),
		...mapGetters("schools", {
			schools: "list",
			getSchool: "get",
		}),
		...mapGetters("public-teachers", {
			teachersResult: "list",
		}),
		teachers() {
			let teachers = this.teachersResult;
			teachers = teachers.map((t) => {
				t.fullName = t.firstName + " " + t.lastName;
				return t;
			});
			return teachers;
		},
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
	watch: {
		"externalInvite.teacher.federalState": async function() {
			await this.$store.dispatch("schools/find", {
				query: {
					federalState: this.externalInvite.teacher.federalState._id,
					$limit: 10000,
				},
			});
		},
		"externalInvite.teacher.school": async function() {
			await this.$store.dispatch("public-teachers/find", {
				query: {
					$limit: false,
					schoolId: this.externalInvite.teacher.school._id,
					$sort: "firstName",
				},
			});
		},
	},
	async created(ctx) {
		await this.$store.dispatch("teams/find", { query: { $limit: 1000 } });
		await this.$store.dispatch("roles/find", { query: { $limit: 1000 } });
		await this.$store.dispatch("federal-states/find", {
			query: {
				$sort: "name",
				$limit: 10000,
			},
		});
		await this.getTeam();
		await this.getMembers();
		await this.getClasses();
	},
	methods: {
		async getMembers() {
			try {
				let members = (
					await this.$store.dispatch("users/find", {
						query: {
							$limit: 10000,
						},
					})
				).data;

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
			} catch (e) {
				this.$toast.error("Fehler beim Laden der Mitglieder");
				return;
			}
		},
		async getClasses() {
			try {
				let classes = (
					await this.$store.dispatch("classes/find", {
						query: {
							$limit: 10000,
						},
					})
				).data;

				classes = classes.filter((schoolClass) => {
					return !this.team.classIds.find((c) => {
						return c._id === schoolClass._id;
					});
				});

				this.classes = classes;
			} catch (e) {
				this.$toast.error("Fehler beim Laden der Schulen");
				return;
			}
		},
		async addTeamMembers() {
			const newMembers = this.membersSelected.map((m) => {
				return {
					userId: m._id,
				};
			});

			const currentMembers = this.team.userIds.map((u) => {
				u.role = u.role._id;
				u.userId = u.userId._id;
				return u;
			});

			const userIds = newMembers.concat(currentMembers);

			const newClasses = this.classesSelected.map((c) => c._id);
			const currentClasses = this.team.classIds.map((c) => c._id);
			const classIds = newClasses.concat(currentClasses);

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
				(this.tabs.internal === "addMember" ? "Mitglied/er" : "Klasse/n") +
					" hinzugefügt"
			);
		},
		async resendInvitation(email) {
			this.$dialog.confirm({
				title: "Einladung erneut versenden",
				message:
					"Möchtest du die Einladung wirklich nochmal per E-Mail verschicken?",
				confirmText: "Einladung versenden",
				onConfirm: async () => {
					try {
						await this.$store.dispatch("teams/resendInvitation", {
							teamId: this.team._id,
							email,
						});
						this.$toast.success("Einladung erfolgreich nochmals verschickt!");
					} catch (e) {
						this.$toast.error("Fehler beim Versenden der Einladung.");
					}
				},
			});
		},
		async deleteInvitation(email) {
			this.$dialog.confirm({
				title: "Einladung löschen",
				message: "Möchtest du die Einladung löschen möchtest?",
				confirmText: "Einladung löschen",
				onConfirm: async () => {
					try {
						await this.$store.dispatch("teams/deleteInvitation", {
							teamId: this.team._id,
							email,
						});
						this.$toast.success("Einladung erfolgreich gelöscht!");
						this.getTeam();
					} catch (e) {
						this.$toast.error("Fehler beim Löschen der Einladung.");
					}
				},
			});
		},
		async addExternalMember() {
			try {
				await this.$store.dispatch("teams/inviteExternal", {
					teamId: this.team._id,
					userId: this.externalInvite.teacher.user._id,
					email:
						this.tabs.who === "teacher"
							? this.externalInvite.teacher.email
							: this.externalInvite.expert.email,
					role: this.tabs.who === "teacher" ? "teamadministrator" : "expert",
				});
				this.$toast.success("Einladung erfolgreich verschickt");
				this.resetExternalInvite();
				this.addExternalModalActive = false;
			} catch (e) {
				this.$toast.error("Fehler beim Versand der Einladung");
			}
		},
		resetExternalInvite() {
			this.externalInvite = {
				teacher: {
					federalState: {},
					school: {},
					user: {},
					email: "",
				},
				expert: {
					email: "",
				},
			};
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
			this.memberSelected = Object.assign({}, teamMember);
			this.memberSelected.role.label =
				roleTranslations[this.memberSelected.role.name];
		},
		async saveMember() {
			try {
				let userIds = [...this.team.userIds];
				userIds = userIds.map((u) => {
					u.role = u.role._id;
					u.userId = u.userId._id;

					if (u.userId == this.memberSelected.userId._id) {
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

<style lang="scss" scoped>
.d-flex {
	display: flex;
}

.section {
	margin: var(--space-lg) 0;
}
</style>
