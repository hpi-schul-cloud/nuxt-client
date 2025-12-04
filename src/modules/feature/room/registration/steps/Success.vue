<template>
	<div class="mb-10">
		{{ t("pages.registrationExternalMembers.steps.success.explanation") }}
	</div>
	<div>
		<VBtn variant="flat" color="primary" data-testid="success-continue-button" :to="LOGIN_URI">
			{{ t("pages.registrationExternalMembers.steps.success.button") }}
		</VBtn>
	</div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const LOGIN_URI = "/";

const { t } = useI18n();
</script>
