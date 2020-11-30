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
				v-model="systemData"
				:validate="triggerValidation"
				data-testid="ldapConnectionSection"
				@update:errors="updateValidationData"
			/>
			<users-section
				v-model="systemData"
				:validate="triggerValidation"
				data-testid="ldapUsersSection"
				@update:errors="updateValidationData"
			/>
			<roles-section
				v-model="systemData"
				:validate="triggerValidation"
				data-testid="ldapRolesSection"
				@update:errors="updateValidationData"
			/>
			<classes-section
				v-model="systemData"
				:validate="triggerValidation"
				data-testid="ldapClassesSection"
				@update:errors="updateValidationData"
			/>
		</div>
		<div class="buttons-container">
			<base-button
				design="text"
				class="ml--sm"
				data-testid="ldapResetInputsButton"
				@click="clearInputsHandler"
				>{{
					this.$t("pages.administration.ldap.index.buttons.reset")
				}}</base-button
			>
			<base-button
				design="secondary"
				class="ml--sm"
				data-testid="ldapVerifyButton"
				@click="validateHandler"
				>{{
					this.$t("pages.administration.ldap.index.buttons.verify")
				}}</base-button
			>
		</div>
	</section>
</template>

<script>
import { mapState } from "vuex";
import errorHandling from "@mixins/ldapErrorHandling";
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
	mixins: [errorHandling],
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
		...mapState("ldap-config", {
			verified: "verified",
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
		systemData: {
			get() {
				const tempData = this.$store.getters["ldap-config/tempGetter"];
				return Object.keys(tempData).length
					? tempData
					: this.$store.getters["ldap-config/dataGetter"];
			},
			set(value) {
				if (this.$options.debounce) {
					clearInterval(this.$options.debounce);
				}
				this.$options.debounce = setInterval(() => {
					this.$store.commit("ldap-config/updateData", value);

					clearInterval(this.$options.debounce);
				}, 200);
			},
		},
	},
	created() {
		const { id } = this.$route.query;

		if (id) this.$store.dispatch("ldap-config/getData", id);
	},
	methods: {
		validateHandler() {
			if (this.$options.debounce) {
				clearInterval(this.$options.debounce);
			}
			this.triggerValidation = !this.triggerValidation;

			this.$options.debounce = setInterval(() => {
				if (!this.isInvalid) {
					this.$store.dispatch("ldap-config/verifyData", this.systemData);

					if (!this.verified.ok) {
						this.errorHandler(this.verified.errors).forEach((message) => {
							this.$toast.error(message);
						});
						clearInterval(this.$options.debounce);
						return;
					}

					this.$toast.success(
						this.$t("pages.administration.ldap.index.verified")
					);
					this.$router.push({
						path: `/administration/ldap/activate`,
					});
					clearInterval(this.$options.debounce);
					return;
				}

				this.$toast.error(this.$t("common.validation.invalid"));
				clearInterval(this.$options.debounce);
			}, 500);
		},
		updateValidationData(v, section) {
			this.isInvalidData[section] = v;
		},
		clearInputsHandler() {
			this.$store.commit("ldap-config/clearData");
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
