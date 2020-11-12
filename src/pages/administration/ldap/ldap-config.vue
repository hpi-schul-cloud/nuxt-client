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
				data-testid="ldapConnectionSection"
			/>
			<users-section v-model="ldapConfigData" data-testid="ldapUsersSection" />
			<classes-section
				v-model="ldapConfigData"
				data-testid="ldapClassesSection"
			/>
		</div>
	</section>
</template>

<script>
import { mapState } from "vuex";
import ConnectionSection from "@components/organisms/Ldap/LdapConnectionSection.vue";
import UsersSection from "@components/organisms/Ldap/LdapUsersSection.vue";
import ClassesSection from "@components/organisms/Ldap/LdapClassesSection.vue";
export default {
	components: {
		ConnectionSection,
		UsersSection,
		ClassesSection,
	},
	data() {
		return {
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
				rootPath: "",
				basisPfad: "",
				searchUser: "",
				searchUserPassword: "",
				// Classes Section Data
				classPfad: "",
				nameAttribute: "description",
				participantAttribute: "member",
				// Users Sections Data
				userPfad: "",
				firstName: "givenName",
				familyName: "sn",
				email: "mail",
				uid: "uid",
				uuid: "uuid",
			},
		};
	},
	layout: "loggedInFull",
	computed: {
		...mapState("auth", {
			school: "school",
		}),
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
