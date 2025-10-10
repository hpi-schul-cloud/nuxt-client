<template>
	<div class="text-centered mt-8">
		<ErrorContent :status-code="error.statusCode" :error-text="translatedErrorMessage" data-testid="error-content" />
		<v-btn ref="btn-back" class="mt-4" color="primary" variant="flat" data-testid="btn-back" @click="onBackClick">
			{{ $t("error.action.back") }}
		</v-btn>
	</div>
</template>
<script lang="ts" setup>
import ErrorContent from "@/components/error-handling/ErrorContent.vue";
import { useStorage } from "@/composables/locale-storage.composable";
import { buildPageTitle } from "@/utils/pageTitle";
import { useAppStore, useAppStoreRefs } from "@data-app";
import { useTitle } from "@vueuse/core";
import { computed, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";

const { clearApplicationError } = useAppStore();
const { applicationError } = useAppStoreRefs();
const storage = useStorage();
const { t } = useI18n();
const performanceNavigation = window.performance.getEntriesByType("navigation")[0];

const error = computed(() => {
	const [statusCode, translationKey, isTldrawError] = storage.getMultiple([
		"applicationErrorStatusCode",
		"applicationErrorTranslationKey",
		"applicationErrorTldraw",
	]);

	if (
		performanceNavigation.entryType === "reload" ||
		(performanceNavigation.entryType === "navigate" && isTldrawError)
	) {
		return {
			statusCode: Number(statusCode),
			translationKey,
		};
	}

	storage.remove("applicationErrorStatusCode");
	storage.remove("applicationErrorTranslationKey");
	storage.remove("applicationErrorTldraw");

	return {
		statusCode: Number(applicationError.value?.status),
		translationKey: applicationError.value?.translationKeyOrText,
	};
});

addEventListener("pagehide", (event) => {
	storage.remove("applicationErrorTldraw");
	if (event.persisted) return;

	if (applicationError.value?.status) {
		storage.set("applicationErrorStatusCode", JSON.stringify(applicationError.value?.status));
		storage.set("applicationErrorTranslationKey", applicationError.value.translationKeyOrText ?? "");
	}
});

useTitle(buildPageTitle(t("error.generic")));

const onBackClick = () => {
	window.location.assign("/dashboard");
};

const translatedErrorMessage = computed(() => {
	const translationKey = error.value.translationKey ?? "";
	const translatedError = t(translationKey);

	return translatedError !== translationKey ? translatedError : t("error.generic");
});

onUnmounted(() => {
	clearApplicationError();
});
</script>

<style lang="scss" scoped>
.text-centered {
	text-align: center;
}
</style>
