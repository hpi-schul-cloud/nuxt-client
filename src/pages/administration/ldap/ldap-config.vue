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
			<!-- placeholder for translations -->
			<base-button design="secondary text" class="ml--sm"
				>Eingaben zurücksetzen</base-button
			>
			<base-button design="secondary" class="ml--sm" @click="validateHandler"
				>Eingaben prüfen</base-button
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
				// Connection Section Data
				url: "ldaps://ldap.schul-cloud.org",
				basisPath: "dc=schul-cloud,dc=org",
				searchUser: "cn=ldapadmin,dc=schul-cloud,dc=org",
				searchUserPassword: "Naivi4Ahghee",
				// Users Sections Data
				userPath: "ou=users",
				firstName: "givenName",
				familyName: "sn",
				email: "qweqwe@de.de",
				uid: "uidNumber",
				uuid: "uid",
				// Roles Section Data
				groupOption: "ldap_group",
				member: "description",
				student: "cn=student,ou=roles,ou=groups,dc=schul-cloud,dc=org",
				teacher: "cn=teacher,ou=roles,ou=groups,dc=schul-cloud,dc=org",
				admin: "cn=admin,ou=roles,ou=groups,dc=schul-cloud,dc=org",
				user: "no-sc",
				// Classes Section Data
				classPath: "ou=classes,ou=groups",
				nameAttribute: "description",
				participantAttribute: "member",
			},
			isInvalidData: {
				connection: null,
				users: null,
				roles: null,
				classes: null,
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
					(section) =>
						this.isInvalidData[section] === true ||
						this.isInvalidData[section] === null
				)
			) {
				return false;
			}
			return true;
		},
	},
	methods: {
		validateHandler() {
			if (this.$options.debounce) {
				clearInterval(this.$options.debounce);
			}
			this.triggerValidation = !this.triggerValidation;
			this.$options.debounce = setInterval(async () => {
				if (!this.isInvalid) {
					this.$store.dispatch(
						"ldap-config/verifyData",
						this.ldapConfigData,
						this.school._id
					);
				}
				clearInterval(this.$options.debounce);
			}, 500);
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

	@include breakpoint(tablet) {
		margin: var(--space-xl-4);
	}
}
</style>
