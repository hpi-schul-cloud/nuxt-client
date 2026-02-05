<template>
	<DefaultWireframe :headline="$t('pages.administration.ldap.title')" :breadcrumbs="breadcrumbs" max-width="short">
		<section class="section">
			<p class="subtitle-text">
				{{ $t("pages.administration.ldap.subtitle.one") }}
			</p>
			<p class="subtitle-text">
				{{ $t("pages.administration.ldap.subtitle.two") }}
			</p>
			<div class="help-section">
				{{ $t("pages.administration.ldap.subtitle.help") }}
				<a href="https://docs.dbildungscloud.de/x/PgBVAw" target="_blank">
					{{ $t("pages.administration.ldap.subtitle.helping.link") }}.
				</a>
			</div>
			<VForm ref="form" validate-on="submit" @submit.prevent="validateHandler">
				<div class="form-container">
					<LdapConnectionSection v-model="systemData" data-testid="ldapConnectionSection" />
					<LdapUsersSection v-model="systemData" data-testid="ldapUsersSection" />
					<LdapRolesSection v-model="systemData" data-testid="ldapRolesSection" />
					<LdapClassesSection
						v-model="systemData"
						data-testid="ldapClassesSection"
						@update:inputs="clearClassesSectionData"
					/>
				</div>
				<div class="errors-container">
					<InfoMessage v-if="validationError" :message="validationError" type="bc-error" />
					<span v-for="(error, index) in verificationErrors" :key="index">
						<InfoMessage :message="error" type="bc-error" />
					</span>
				</div>
				<div class="buttons-container">
					<VBtn variant="text" data-testid="ldapResetInputsButton" @click="clearInputsHandler">
						{{ $t("pages.administration.ldap.index.buttons.reset") }}
					</VBtn>
					<VBtn
						color="primary"
						variant="flat"
						type="submit"
						data-testid="ldapVerifyButton"
						:disabled="status === 'pending'"
						@click="validateHandler"
					>
						{{ $t("pages.administration.ldap.index.buttons.verify") }}
					</VBtn>
				</div>
			</VForm>
		</section>
	</DefaultWireframe>
</template>

<script>
import InfoMessage from "@/components/administration/InfoMessage.vue";
import LdapClassesSection from "@/components/administration/ldap/LdapClassesSection.vue";
import LdapConnectionSection from "@/components/administration/ldap/LdapConnectionSection.vue";
import LdapRolesSection from "@/components/administration/ldap/LdapRolesSection.vue";
import LdapUsersSection from "@/components/administration/ldap/LdapUsersSection.vue";
import { unchangedPassword } from "@/utils/ldapConstants";
import { ldapErrorHandler } from "@/utils/ldapErrorHandling";
import { buildPageTitle } from "@/utils/pageTitle";
import { notifySuccess } from "@data-app";
import { DefaultWireframe } from "@ui-layout";
import { defineComponent, ref } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
	components: {
		DefaultWireframe,
		LdapRolesSection,
		LdapConnectionSection,
		LdapUsersSection,
		LdapClassesSection,
		InfoMessage,
	},
	setup() {
		const form = ref(null);
		return {
			form,
		};
	},
	data() {
		return {
			breadcrumbs: [
				{
					title: this.$t("pages.administration.school.index.title"),
					to: "/administration/school-settings",
				},
				{
					title: this.$t("pages.administration.ldap.index.title"),
					disabled: true,
				},
			],
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
			return !this.form.isValid;
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
						await this.$store.dispatch("ldap-config/verifyData", this.systemData);
					}

					if (!this.verified.ok) {
						return;
					} else {
						notifySuccess(this.$t("pages.administration.ldap.index.verified"));
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
});
</script>

<style lang="scss" scoped>
@use "sass:map";
@use "@/styles/settings.scss" as *;

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
