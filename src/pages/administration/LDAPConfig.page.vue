<template>
	<DefaultWireframe :headline="$t('pages.administration.ldap.title')" :breadcrumbs="breadcrumbs" max-width="short">
		<section class="section">
			<p class="subtitle-text">
				{{ t("pages.administration.ldap.subtitle.one") }}
			</p>
			<p class="subtitle-text">
				{{ t("pages.administration.ldap.subtitle.two") }}
			</p>
			<div class="help-section">
				{{ t("pages.administration.ldap.subtitle.help") }}
				<a href="https://docs.dbildungscloud.de/x/PgBVAw" target="_blank">
					{{ t("pages.administration.ldap.subtitle.helping.link") }}.
				</a>
			</div>
			<VForm ref="ldapForm" validate-on="submit" @submit.prevent.stop="validateHandler">
				<div class="form-container">
					<LdapConnectionSection v-model="ldapFormData" data-testid="ldapConnectionSection" />
					<LdapUsersSection v-model="ldapFormData" data-testid="ldapUsersSection" />
					<LdapRolesSection v-model="ldapFormData" data-testid="ldapRolesSection" />
					<LdapClassesSection
						v-model="ldapFormData"
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
					<VBtn variant="text" data-testid="ldapResetInputsButton" @click="onReset">
						{{ t("pages.administration.ldap.index.buttons.reset") }}
					</VBtn>
					<VBtn
						color="primary"
						variant="flat"
						type="submit"
						data-testid="ldapVerifyButton"
						:disabled="status === 'pending'"
					>
						{{ t("pages.administration.ldap.index.buttons.verify") }}
					</VBtn>
				</div>
			</VForm>
		</section>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import InfoMessage from "@/components/administration/InfoMessage.vue";
import LdapClassesSection from "@/components/administration/ldap/LdapClassesSection.vue";
import LdapConnectionSection from "@/components/administration/ldap/LdapConnectionSection.vue";
import LdapRolesSection from "@/components/administration/ldap/LdapRolesSection.vue";
import LdapUsersSection from "@/components/administration/ldap/LdapUsersSection.vue";
import { ldapErrorHandler } from "@/utils/ldap-error-handling.utils";
import { unchangedPassword } from "@/utils/ldapConstants";
import { buildPageTitle } from "@/utils/pageTitle";
import { isValidOrFocusFirstInvalidInput } from "@/utils/validation";
import { notifySuccess } from "@data-app";
import { useLdapConfigStore } from "@data-ldap";
import { Breadcrumb, DefaultWireframe } from "@ui-layout";
import { useTitle } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref, useTemplateRef } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

const { t } = useI18n();

const route = useRoute();
const router = useRouter();

const ldapForm = useTemplateRef("ldapForm");

const ldapConfigStore = useLdapConfigStore();
const { verified, ldapFormData, status } = storeToRefs(ldapConfigStore);
const { verifyExistingLdapConfig, verifyNewLdapConfig, initializeStore, resetLdapFormData } = ldapConfigStore;

const pageTitle = buildPageTitle(t("pages.administration.ldap.title"));
useTitle(pageTitle);

const breadcrumbs = computed<Breadcrumb[]>(() => [
	{
		title: t("pages.administration.school.index.title"),
		to: "/administration/school-settings",
	},
	{
		title: t("pages.administration.ldap.index.title"),
		disabled: true,
	},
]);

const validationError = ref("");

const validateHandler = async () => {
	validationError.value = "";

	const isValid = await isValidOrFocusFirstInvalidInput(ldapForm);
	if (isValid) {
		const systemId = route.query.id as string | undefined;
		if (systemId) {
			if (ldapFormData.value.searchUserPassword === unchangedPassword) {
				ldapFormData.value.searchUserPassword = undefined;
			}

			await verifyExistingLdapConfig(systemId, ldapFormData.value);
		} else {
			await verifyNewLdapConfig(ldapFormData.value);
		}

		if (!verified.value?.ok) return;

		notifySuccess(t("pages.administration.ldap.index.verified"));
		router.push({
			path: "/administration/ldap/activate",
			query: systemId ? { id: systemId } : {},
		});
		return;
	}

	validationError.value = t("common.validation.invalid");
};

const onReset = () => {
	resetLdapFormData();
};

const clearClassesSectionData = () => {
	ldapFormData.value.classPath = undefined;
	ldapFormData.value.nameAttribute = undefined;
	ldapFormData.value.participantAttribute = undefined;
};

const verificationErrors = computed(() => ldapErrorHandler(verified.value?.errors, t));

onMounted(async () => {
	const { id } = route.query;
	await initializeStore(id as string | undefined);
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
