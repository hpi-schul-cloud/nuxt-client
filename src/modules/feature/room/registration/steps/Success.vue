<template>
	<div class="mb-10">
		{{
			t("pages.registrationExternalMembers.steps.success.explanation", {
				applicationName: applicationName,
			})
		}}
	</div>
	<div>
		<VBtn variant="flat" color="primary" data-testid="success-continue-button" :to="LOGIN_URI">
			{{ t("pages.registrationExternalMembers.steps.success.button") }}
		</VBtn>
	</div>
</template>

<script setup lang="ts">
import { useEnvConfig } from "@data-env";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const LOGIN_URI = "/";
const applicationName = computed(() => {
	const isNbc = useEnvConfig().value.SC_THEME === "n21";
	const scName = useEnvConfig().value.SC_TITLE;

	return isNbc ? scName.replace("Niedersächsische", "Niedersächsischen") : scName;
});

const { t } = useI18n();
</script>
