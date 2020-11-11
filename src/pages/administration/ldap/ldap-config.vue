<template>
	<section class="section">
		<base-breadcrumb :inputs="breadcrumbs" />
		<h1 class="mb--md h3">
			{{ this.$t("pages.administration.ldapEdit.headLines.title") }}
		</h1>

		<roles-section v-model="ldapConfigData" data-testid="ldapRolesSection" />
	</section>
</template>

<script>
import { mapState } from "vuex";
import RolesSection from "@components/organisms/Ldap/LdapRolesSection.vue";

export default {
	components: {
		RolesSection,
	},
	data() {
		return {
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
			ldapConfigData: {
				member: "description",
				student: "cn=schueler,ou=rolle",
				teacher: "cn=lehrer,ou=rolle",
				admin: "cn=admin,ou=rolle",
				user: "cn=ehemalige,ou=rolle",
			},
		};
	},
	computed: {
		...mapState("auth", {
			school: "school",
		}),
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
