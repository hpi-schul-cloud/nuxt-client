<template>
	<section class="section">
		<base-breadcrumb :inputs="breadcrumbs" />
		<h1>
			{{ $t("pages.administration.ldap.title") }}
		</h1>

		<p class="subtitle-text">
			{{ $t("pages.administration.ldap.subtitle.one") }}
		</p>
		<p class="subtitle-text">
			{{ $t("pages.administration.ldap.subtitle.two") }}
		</p>
		{{ $t("pages.administration.ldap.subtitle.help") }}
		<base-link
			class="link-style"
			to="/"
			href="https://docs.schul-cloud.org/x/PgBVAw"
			target="_blank"
			:no-styles="true"
			traget="_blank"
		>
			{{ $t("pages.administration.ldap.subtitle.helping.link") }}.
		</base-link>
		<div class="form-container">
			<connection-section
				v-model="ldapConfigData"
				:validate="triggerValidation"
				data-testid="ldapConnectionSection"
				@update:errors="updateValidationData"
			/>

			<users-section
				v-model="ldapConfigData"
				:validate="triggerValidation"
				data-testid="ldapUsersSection"
				@update:errors="updateValidationData"
			/>
			<users-section />
			<roles-section
				v-model="ldapConfigData"
				:validate="triggerValidation"
				data-testid="ldapRolesSection"
				@update:errors="updateValidationData"
			/>
			<classes-section
				v-model="ldapConfigData"
				:validate="triggerValidation"
				data-testid="ldapClassesSection"
				@update:errors="updateValidationData"
			/>
		</div>
		<!-- Place holder button to test input validation -->
		<base-button
			type="submit"
			class="w-20 mt--lg"
			data-testid="button_create-user_submit"
			@click="validateHandler"
		>
			Validate
		</base-button>
	</section>
</template>

<script>
import { mapState } from "vuex";
import RolesSection from "@components/organisms/Ldap/LdapRolesSection.vue";
import ConnectionSection from "@components/organisms/Ldap/LdapConnectionSection.vue";
import UsersSection from "@components/organisms/Ldap/LdapUsersSection.vue";
import ClassesSection from "@components/organisms/Ldap/LdapClassesSection.vue";

export default {
	components: {
		RolesSection,
		ConnectionSection,
		UsersSection,
		ClassesSection,
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
				// Roles Section Data
				groupOption: "ldap_group",
				member: "",
				student: "",
				teacher: "",
				admin: "",
				user: "",
				// Connection Section Data
				url: "",
				basisPfad: "",
				searchUser: "",
				searchUserPassword: "",
				// Classes Section Data
				classPfad: "",
				nameAttribute: "",
				participantAttribute: "",
				// Users Sections Data
				userPfad: "",
				firstName: "",
				familyName: "",
				email: "",
				uid: "",
				uuid: "",
			},
			validationData: {},
			triggerValidation: false,
		};
	},
	layout: "loggedInFull",
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

.link-style {
	color: var(--color-primary);
	text-decoration: none;
}
.subtitle-text {
	margin-bottom: var(--space-xl);
}

.form-container {
	margin: 0;

	@include breakpoint(tablet) {
		margin: 0 var(--space-xl-5);
	}
}
</style>
