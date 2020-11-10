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
			<connection :errors="errors" />
			<users :errors="errors" />
			<roles :errors="errors" :ldapdata="mockData" :data="mockData" />
			<classes :errors="errors" />
		</div>
	</section>
</template>

<script>
import { mapState } from "vuex";
import Connection from "@components/organisms/Ldap/Connection.vue";
import Users from "@components/organisms/Ldap/Users.vue";
import Roles from "@components/organisms/Ldap/Roles.vue";
import Classes from "@components/organisms/Ldap/Classes.vue";
export default {
	components: {
		Connection,
		Users,
		Roles,
		Classes,
	},
	props: {
		someProps: {
			type: Boolean,
		},
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
