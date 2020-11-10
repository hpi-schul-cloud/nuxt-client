<template>
	<section class="section">
		<base-breadcrumb :inputs="breadcrumbs" />
		<h1 class="mb--md h3">
			{{ this.$t("pages.administration.ldapEdit.headLines.title") }}
		</h1>

		<roles-section :errors="errors" :data="fetchedData" />
	</section>
</template>

<script>
import { mapState } from "vuex";
import RolesSection from "@components/organisms/Ldap/RolesSection.vue";

export default {
	components: {
		RolesSection,
	},
	data() {
		return {
			firstName: "",
			lastName: "",
			breadcrumbs: [
				{
					text: this.$t("pages.administration.index.title"),
					to: "/administration/",
					icon: { source: "fa", icon: "cog" },
				},
				{
					text: this.$t("pages.administration.ldap.index.title"),
				},
			],
			errors: {
				firstErr: "firstError",
				secondErr: "secondError",
			},
			fetchedData: {
				member: "description",
				student: "cn=schueler,ou=rolle",
				teacher: "cn=lehrer,ou=rolle",
				admin: "cn=admin,ou=rolle",
				user: "cn=ehemalige,ou=rolle",
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
	methods: {},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
