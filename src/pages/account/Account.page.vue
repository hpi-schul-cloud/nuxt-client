<template>
	<DefaultWireframe :headline="t('pages.account.title')" max-width="native">
		<div v-if="successNotification" class="mb-6">
			<SuccessAlert data-testid="notification">{{ successNotification }}</SuccessAlert>
		</div>
		<div v-if="errorNotification" class="mb-6">
			<ErrorAlert data-testid="error-alert">{{ errorNotification }}</ErrorAlert>
		</div>

		<div v-if="isLoading && !profile" class="d-flex justify-center pa-8">
			<VProgressCircular indeterminate color="primary" />
		</div>

		<template v-else-if="profile">
			<ProfileForm
				:initial-data="profile"
				:is-s-s-o="isSSO"
				:is-student="isStudent"
				:can-edit-password="canEditPassword"
				:loading="isUpdating"
				@submit="handleProfileSubmit"
			/>

			<DirectoryVisibilityCard
				v-if="showVisibilitySection"
				:initial-discoverable="profile.discoverable"
				:loading="isUpdating"
				@submit="handleVisibilitySubmit"
			/>

			<OAuthConsentPanel
				:sessions="consentSessions"
				:revoking-id="revokingId"
				:has-load-error="hasConsentSessionsError"
				@revoke="handleRevokeConsent"
			/>
		</template>
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
import { ErrorAlert, SuccessAlert } from "@ui-alert";
import { DefaultWireframe } from "@ui-layout";
import { useTitle } from "@vueuse/core";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const appStore = useAppStore();
const { isStudent } = useAppStoreRefs();

const {
	profile,
	consentSessions,
	hasConsentSessionsError,
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

// Legacy gated this on TEACHER_VISIBILITY_FOR_EXTERNAL_TEAM_INVITATION, which is "opt-in" in every
// instance but not exposed by the public config endpoint, so only the opt-in variant is supported
const showVisibilitySection = !isStudent.value;

onMounted(async () => {
	const [loadedProfile] = await Promise.all([loadProfile(), loadConsentSessions()]);
	if (!loadedProfile) {
		errorNotification.value = t("pages.account.notifications.loadError");
	}
});

const showResult = (
	success: boolean,
	successMessage: string,
	errorMessage = t("pages.account.notifications.error")
) => {
	successNotification.value = success ? successMessage : "";
	errorNotification.value = success ? "" : errorMessage;
};

const handleProfileSubmit = async (payload: UpdateProfilePayload) => {
	const { success, errorMessage } = await updateProfile(payload);
	showResult(success, t("pages.account.notifications.success"), errorMessage);
};

const handleVisibilitySubmit = async (discoverable: boolean) => {
	const success = await updateVisibility(discoverable);
	showResult(success, t("pages.account.notifications.visibilitySuccess"));
};

const handleRevokeConsent = async (clientId: string) => {
	revokingId.value = clientId;
	const success = await revokeConsentSession(clientId);
	revokingId.value = "";
	showResult(success, t("pages.account.notifications.revokeSuccess"), t("pages.account.notifications.revokeError"));
};
</script>
