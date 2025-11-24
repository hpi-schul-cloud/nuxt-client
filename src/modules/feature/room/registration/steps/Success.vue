<template>
	<div class="mb-10">
		<h2 class="mb-4 heading" data-testid="success-heading">
			{{ t("pages.registrationExternalMembers.steps.success.heading") }}
		</h2>
		{{ t("pages.registrationExternalMembers.steps.success.copy") }}
	</div>
	<div>
		<VBtn variant="flat" color="primary" data-testid="success-continue-button" @click="onContinue">
			{{ t("pages.registrationExternalMembers.steps.success.button") }}
		</VBtn>
	</div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
const LOGIN_URI = "/";

const onContinue = () => {
	window.location.href = LOGIN_URI;
};

const { t } = useI18n();
</script>
