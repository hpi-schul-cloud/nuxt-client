<template>
	<section class="section">
		<base-breadcrumb :inputs="breadcrumbs" />
		<h1 class="mb--md h3">
			{{ this.$t("pages.administration.ldapEdit.headLines.title") }}
		</h1>

		<roles-section
			v-model="ldapConfigData"
			:validate="triggerValidation"
			data-testid="ldapRolesSection"
			@update:errors="updateValidationData"
		/>
		<!-- Place holder button to test input validation -->
		<base-button
			type="submit"
			class="w-20 mt--lg"
			data-testid="button_create-user_submit"
			@click="validateHandler"
		>
			validate
		</base-button>
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
			validationData: {},
			triggerValidation: false,
		};
	},
	computed: {
		...mapState("auth", {
			school: "school",
		}),
	},
	methods: {
		validateHandler() {
			this.triggerValidation = !this.triggerValidation;
		},
		updateValidationData(v, section) {
			this.validationData[section] = v;
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
