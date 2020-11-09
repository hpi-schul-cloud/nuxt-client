<template>
	<section class="section">
		<base-breadcrumb :inputs="breadcrumbs" />
		<h1 class="mb--md h3">
			Manage Schools
		</h1>

		<roles :errors="errors" :data="mockData" />
	</section>
</template>

<script>
import { mapState } from "vuex";
import Roles from "@components/organisms/Ldap/Roles.vue";

export default {
	components: {
		Roles,
	},
	data() {
		return {
			firstName: "",
			lastName: "",
			breadcrumbs: [
				{
					// text: this.$t("pages.administration.index.title"),
					text: "Administration",
					to: "/administration/",
					icon: { source: "fa", icon: "cog" },
				},
				{
					// text: this.$t("pages.administration.students.index.title"),
					text: "Schools",
				},
			],
			errors: {
				firstErr: "firstError",
				secondErr: "secondError",
			},
			mockData: {
				member: "0",
				student: "1",
				teacher: "2",
				admin: "3",
				noSchoolCloud: "4",

				alias: "5",
				type: [
					{ value: "value_1", label: "select #1" },
					{ value: "value_2", label: "select #2" },
				],
				url: "https://",
				rootPath: "root path info",
				searchUser: "pass",
				roleType: [
					{ value: "value_1", label: "select #1" },
					{ value: "value_2", label: "select #2" },
				],
			},
		};
	},
	layout: "loggedInFull",
	computed: {
		...mapState("auth", {
			school: "school",
		}),
	},
	watch: {},
	created(ctx) {},
	methods: {
		// updateModel(e, model) {
		// 	console.log("config page e", e);
		// 	console.log("config page model", model);
		// },
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
