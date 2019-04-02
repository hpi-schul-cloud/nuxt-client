<template src="./members.html"></template>

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
			classesSelected: [],
			classes: [],
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
