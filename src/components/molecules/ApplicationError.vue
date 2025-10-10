<template>
	<div class="application-error-wrapper">
		<div v-if="hasError" class="text-centered mt-8">
			<ErrorContent :status-code="statusCode" :error-text="errorText" data-testid="error-content" />
			<v-btn ref="btn-back" class="mt-4" color="primary" variant="flat" data-testid="btn-back" href="/dashboard">
				{{ $t("error.action.back") }}
			</v-btn>
		</div>
		<slot v-else />
	</div>
</template>
<script setup lang="ts">
import ErrorContent from "@/components/error-handling/ErrorContent.vue";
import { useAppStoreRefs } from "@data-app";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const { applicationError } = useAppStoreRefs();

const hasError = computed(() => applicationError.value?.status !== undefined);
const errorText = computed(() =>
	hasError.value ? t(applicationError.value?.translationKeyOrText ?? "error.generic") : ""
);

const statusCode = computed(() => applicationError.value?.status);
</script>
<style lang="scss" scoped>
.text-centered {
	text-align: center;
}
</style>
