<template>
	<div class="application-error-wrapper">
		<div v-if="!hasError" class="text-centered mt-8">
			<error-content
				:status-code="appErrorStatusCode"
				:error-text="translatedErrorMessage"
				data-testid="error-content"
			/>
			<v-btn
				ref="btn-back"
				class="mt-4"
				color="primary"
				variant="flat"
				data-testid="btn-back"
				href="/dashboard"
			>
				{{ $t("error.action.back") }}
			</v-btn>
		</div>
		<slot v-else />
	</div>
</template>
<script setup lang="ts">
import { injectStrict, APPLICATION_ERROR_KEY } from "@/utils/inject";
import { computed } from "vue";
import ErrorContent from "@/components/error-handling/ErrorContent.vue";
import { useI18n } from "vue-i18n";

const applicationErrorModule = injectStrict(APPLICATION_ERROR_KEY);
const { t } = useI18n();

const hasError = computed(() => applicationErrorModule.getStatusCode !== null);

const appErrorStatusCode = computed(() =>
	Number(applicationErrorModule.getStatusCode)
);
const translatedErrorMessage = computed(() =>
	hasError.value ? t(applicationErrorModule.getTranslationKey).toString() : ""
);
</script>
<style lang="scss" scoped>
.text-centered {
	text-align: center;
}
</style>
