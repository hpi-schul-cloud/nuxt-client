<template>
	<DefaultWireframe :headline="t('pages.account.title')" max-width="native">
		<!-- Success notification for Cypress test compatibility -->
		<VAlert
			v-if="successNotification"
			type="success"
			variant="tonal"
			class="mb-6"
			closable
			data-testid="notification"
			@click:close="successNotification = ''"
		>
			{{ successNotification }}
		</VAlert>

		<VAlert
			v-if="errorNotification"
			type="error"
			variant="tonal"
			class="mb-6"
			closable
			data-testid="error-alert"
			@click:close="errorNotification = ''"
		>
			{{ errorNotification }}
		</VAlert>

		<div v-if="isLoading && !profile" class="d-flex justify-center pa-8">
			<VProgressCircular indeterminate color="primary" />
		</div>

		<div v-else-if="profile">
			<ProfileForm
				:initial-data="profile"
				:is-s-s-o="isSSO"
				:is-student="isStudent"
				:can-edit-password="canEditPassword"
				:loading="isUpdating"
				@submit="handleProfileSubmit"
			/>

			<DirectoryVisibilityCard
				v-if="showVisibilityCard"
				:initial-discoverable="profile.discoverable"
				:loading="isUpdating"
				@submit="handleVisibilitySubmit"
			/>

			<OAuthConsentPanel :sessions="consentSessions" :revoking-id="revokingId" @revoke="handleRevokeConsent" />
		</div>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import DirectoryVisibilityCard from "@/components/account/DirectoryVisibilityCard.vue";
import OAuthConsentPanel from "@/components/account/OAuthConsentPanel.vue";
import ProfileForm from "@/components/account/ProfileForm.vue";
import { buildPageTitle } from "@/utils/pageTitle";
import { Permission } from "@api-server";
import { UpdateProfilePayload, useAccount } from "@data-account";
import { useAppStore, useAppStoreRefs } from "@data-app";
import { useEnvConfig } from "@data-env";
import { DefaultWireframe } from "@ui-layout";
import { useTitle } from "@vueuse/core";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const appStore = useAppStore();
const { isStudent } = useAppStoreRefs();
const env = useEnvConfig();

const {
	profile,
	consentSessions,
	isLoading,
	isUpdating,
	isSSO,
	loadProfile,
	updateProfile,
	updateVisibility,
	loadConsentSessions,
	revokeConsentSession,
} = useAccount();

useTitle(buildPageTitle(t("pages.account.title")));

const successNotification = ref("");
const errorNotification = ref("");
const revokingId = ref("");

const canEditPassword = appStore.hasPermission(Permission.PASSWORD_EDIT);

const showVisibilityCard = computed(() => {
	if (isStudent.value) return false;
	return Boolean(env.value?.TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE);
});

onMounted(async () => {
	await Promise.all([loadProfile(), loadConsentSessions()]);
});

const handleProfileSubmit = async (payload: UpdateProfilePayload) => {
	successNotification.value = "";
	errorNotification.value = "";

	const ok = await updateProfile(payload);
	if (ok) {
		successNotification.value = t("pages.account.notifications.success");
	} else {
		errorNotification.value = t("pages.account.notifications.error");
	}
};

const handleVisibilitySubmit = async (discoverable: boolean) => {
	successNotification.value = "";
	errorNotification.value = "";

	const ok = await updateVisibility(discoverable);
	if (ok) {
		successNotification.value = t("pages.account.notifications.visibilitySuccess");
	} else {
		errorNotification.value = t("pages.account.notifications.error");
	}
};

const handleRevokeConsent = async (clientId: string) => {
	revokingId.value = clientId;
	try {
		await revokeConsentSession(clientId);
	} finally {
		revokingId.value = "";
	}
};
</script>
