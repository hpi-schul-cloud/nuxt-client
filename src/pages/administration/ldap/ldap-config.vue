<template>
	<section class="section">
		<base-breadcrumb :inputs="breadcrumbs" />
		<h1 class="mb--md h3">
			{{ this.$t("pages.administration.ldapEdit.headLines.title") }}
		</h1>

		<roles-section :data="ldapConfigData" @inputChange="updateLdapData" />
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
				member: "",
				student: "",
				teacher: "",
				admin: "",
				user: "",
			},
		};
	},
	computed: {
		...mapState("auth", {
			school: "school",
		}),
	},
	watch: {},
	created(ctx) {},
	methods: {
		updateLdapData(key, value) {
			this.ldapConfigData[key] = value;
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
