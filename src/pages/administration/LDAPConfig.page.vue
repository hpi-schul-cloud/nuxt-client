<template>
	<default-wireframe
		:headline="$t('pages.administration.ldap.title')"
		:breadcrumbs="breadcrumbs"
		max-width="short"
	>
		<section class="section">
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
					href="https://docs.dbildungscloud.de/x/PgBVAw"
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
					@update:inputs="clearClassesSectionData"
				/>
			</div>
			<div class="errors-container">
				<info-message
					v-if="validationError"
					:message="validationError"
					type="bc-error"
				/>
				<span v-for="(error, index) in verificationErrors" :key="index">
					<info-message :message="error" type="bc-error" />
				</span>
			</div>
			<div class="buttons-container">
				<v-btn
					variant="text"
					data-testid="ldapResetInputsButton"
					@click="clearInputsHandler"
				>
					{{ $t("pages.administration.ldap.index.buttons.reset") }}
				</v-btn>
				<v-btn
					color="primary"
					variant="flat"
					data-testid="ldapVerifyButton"
					:disabled="status === 'pending'"
					@click="validateHandler"
				>
					{{ $t("pages.administration.ldap.index.buttons.verify") }}
				</v-btn>
			</div>
		</section>
	</default-wireframe>
</template>

<script>
import { mapGetters } from "vuex";
import { ldapErrorHandler } from "@/utils/ldapErrorHandling";
import { unchangedPassword } from "@/utils/ldapConstants";
import DefaultWireframe from "@/components/templates/DefaultWireframe.vue";
import RolesSection from "@/components/organisms/Ldap/LdapRolesSection.vue";
import ConnectionSection from "@/components/organisms/Ldap/LdapConnectionSection.vue";
import UsersSection from "@/components/organisms/Ldap/LdapUsersSection.vue";
import ClassesSection from "@/components/organisms/Ldap/LdapClassesSection.vue";
import InfoMessage from "@/components/administration/InfoMessage";
import { notifierModule } from "@/store";
import { buildPageTitle } from "@/utils/pageTitle";

export default {
	components: {
		DefaultWireframe,
		RolesSection,
		ConnectionSection,
		UsersSection,
		ClassesSection,
		InfoMessage,
	},
	data() {
		return {
			breadcrumbs: [
				{
					title: this.$t("pages.administration.index.title"),
					disabled: true,
				},
				{
					title: this.$t("pages.administration.school.index.title"),
					to: "/administration/school-settings",
				},
				{
					title: this.$t("pages.administration.ldap.index.title"),
					disabled: true,
				},
			],
			isInvalidData: {
				connection: null,
				users: null,
				roles: null,
				classes: null,
			},
			triggerValidation: false,
			validationError: "",
			systemData: {
				// default input values
				member: "memberOf",
				groupOption: "group",
			},
		};
	},
	computed: {
		...mapGetters("ldap-config", {
			data: "getData",
			verified: "getVerified",
			temp: "getTemp",
			status: "getStatus",
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
		verificationErrors() {
			return ldapErrorHandler(this.verified.errors, this);
		},
	},
	async created() {
		const { id } = this.$route.query;

		if (Object.keys(this.temp).length) {
			this.systemData = { ...this.temp };
		} else if (id) {
			await this.$store.dispatch("ldap-config/getData", id);
			this.systemData = { ...this.data };
		}
	},
	mounted() {
		window.scrollTo({ top: 0, behavior: "smooth" });
		document.title = buildPageTitle(this.$t("pages.administration.ldap.title"));
	},
	methods: {
		validateHandler() {
			this.triggerValidation = !this.triggerValidation;
			this.validationError = "";

			const systemId = this.$route.query.id;

			this.$nextTick(async () => {
				if (!this.isInvalid) {
					if (systemId) {
						if (this.systemData.searchUserPassword === unchangedPassword) {
							this.systemData.searchUserPassword = undefined;
						}

						await this.$store.dispatch("ldap-config/verifyExisting", {
							systemId: systemId,
							systemData: this.systemData,
						});
					} else {
						await this.$store.dispatch(
							"ldap-config/verifyData",
							this.systemData
						);
					}

					if (!this.verified.ok) {
						return;
					} else {
						notifierModule.show({
							text: this.$t("pages.administration.ldap.index.verified"),
							status: "success",
							timeout: 5000,
						});
						if (systemId) {
							this.$router.push({
								path: `/administration/ldap/activate?id=${systemId}`,
							});
						} else {
							this.$router.push({
								path: "/administration/ldap/activate",
							});
						}
						return;
					}
				}

				this.validationError = this.$t("common.validation.invalid");
			});
		},
		updateValidationData(v, section) {
			this.isInvalidData[section] = v;
		},
		clearInputsHandler() {
			this.systemData = {
				// default input values
				member: "memberOf",
				groupOption: "group",
			};
		},
		clearClassesSectionData() {
			this.systemData = {
				...this.systemData,
				classPath: undefined,
				nameAttribute: undefined,
				participantAttribute: undefined,
			};
		},
	},
};
</script>

<style lang="scss" scoped>
@use "sass:map";
@use "@/styles/settings.scss" as *;

.link-style {
	color: rgba(var(--v-theme-primary));
	text-decoration: none;
}

.subtitle-text {
	margin-bottom: 32px;
}

.help-section {
	margin-bottom: 84px;
}

.form-container {
	margin: 0;

	@media #{map.get($display-breakpoints, 'sm-and-up')} {
		margin: 0 84px;
	}
}

.buttons-container {
	display: flex;
	justify-content: flex-end;
	margin: 32px 0 84px 0;

	@media #{map.get($display-breakpoints, 'sm-and-up')} {
		margin: 40px 84px;
	}
}

.errors-container {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	margin: 40px 0;

	@media #{map.get($display-breakpoints, 'sm-and-up')} {
		margin: 40px 84px;
	}
}
</style>
