<template>
	<section class="section">
		<base-breadcrumb :inputs="breadcrumbs" />
		<h1 class="mb--md h3">
			{{ $t("pages.administration.ldap.title") }}
		</h1>

		<p class="subtitle-text">
			{{ $t("pages.administration.ldap.subtitle.one") }}
		</p>
		<p class="subtitle-text">
			{{ $t("pages.administration.ldap.subtitle.two") }}
		</p>
		<div class="help-section">
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
		</div>

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
		<div class="buttons-container">
			<!-- Placeholder butttons until design decision is made -->
			<base-button design="primary outline" class="ml--sm">Cancel</base-button>
			<base-button design="primary" class="ml--sm" @click="validateHandler"
				>Verify</base-button
			>
			<base-button :disabled="isInvalid" design="primary outline" class="ml--sm"
				>Save Changes</base-button
			>
		</div>
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
	meta: {
		requiredPermissions: ["ADMIN_VIEW", "SCHOOL_EDIT"],
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
				basisPath: "",
				searchUser: "",
				searchUserPassword: "",
				// Classes Section Data
				classPath: "",
				nameAttribute: "",
				participantAttribute: "",
				// Users Sections Data
				userPath: "",
				firstName: "",
				familyName: "",
				email: "",
				uid: "",
				uuid: "",
			},
			isInvalidData: {
				roles: true,
				connection: true,
				classes: true,
				users: true,
			},
			triggerValidation: false,
		};
	},
	computed: {
		...mapState("auth", {
			school: "school",
		}),
		isInvalid() {
			if (
				!Object.keys(this.isInvalidData).some(
					(section) => this.isInvalidData[section] === true
				)
			) {
				return false;
			}
			return true;
		},
	},
	methods: {
		validateHandler() {
			this.triggerValidation = !this.triggerValidation;
		},
		updateValidationData(v, section) {
			this.isInvalidData[section] = v;
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

.help-section {
	margin-bottom: var(--space-xl-4);
}

.form-container {
	margin: 0;

	@include breakpoint(tablet) {
		margin: 0 var(--space-xl-4);
	}
}
.buttons-container {
	display: flex;
	justify-content: flex-end;
	margin: var(--space-xl-4) 0 var(--space-xl-4) 0;
}
</style>
