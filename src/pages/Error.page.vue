<template>
	<div class="text-centered mt-8">
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
			@click="onBackClick"
		>
			{{ $t("error.action.back") }}
		</v-btn>
	</div>
</template>
<script lang="ts">
import ErrorContent from "@/components/error-handling/ErrorContent.vue";
import { useStorage } from "@/composables/locale-storage.composable";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { APPLICATION_ERROR_KEY, injectStrict } from "@/utils/inject";
import { buildPageTitle } from "@/utils/pageTitle";
import { useTitle } from "@vueuse/core";
import { computed, defineComponent, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
	name: "ErrorPage",
	components: {
		ErrorContent,
	},
	setup() {
		const storage = useStorage();
		const permissionErrors: Array<HttpStatusCode> = [
			HttpStatusCode.BadRequest,
			HttpStatusCode.Unauthorized,
			HttpStatusCode.Forbidden,
		];
		const { t } = useI18n();
		const applicationErrorModule = injectStrict(APPLICATION_ERROR_KEY);
		const performanceNavigation =
			window.performance.getEntriesByType("navigation")[0];

		const getError = () => {
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
				statusCode: Number(applicationErrorModule.getStatusCode),
				translationKey: applicationErrorModule.getTranslationKey,
			};
		};

		addEventListener("pagehide", (event) => {
			storage.remove("applicationErrorTldraw");
			if (event.persisted) return;

			if (applicationErrorModule.getStatusCode) {
				storage.set(
					"applicationErrorStatusCode",
					JSON.stringify(applicationErrorModule.getStatusCode)
				);

				storage.set(
					"applicationErrorTranslationKey",
					applicationErrorModule.getTranslationKey
				);
			}
		});

		useTitle(buildPageTitle(t("error.generic")));

		const onBackClick = () => {
			window.location.assign("/dashboard");
		};

		const appErrorTranslationKey = computed(() => {
			return getError().translationKey;
		});
		const appErrorStatusCode = computed(() => {
			return getError().statusCode;
		});

		const isPermissionError = computed(() => {
			return permissionErrors.includes(Number(appErrorStatusCode.value));
		});

		const isGenericError = computed(() => {
			return (
				appErrorStatusCode.value === 500 || appErrorStatusCode.value === null
			);
		});

		const translatedErrorMessage = computed(() => {
			const translationKey = appErrorTranslationKey.value || "";

			const translatedError = t(translationKey);

			const result =
				translatedError !== translationKey
					? translatedError
					: t("error.generic");
			return result;
		});

		onUnmounted(() => {
			applicationErrorModule.resetError();
		});

		return {
			onBackClick,
			appErrorStatusCode,
			translatedErrorMessage,
			isPermissionError,
			isGenericError,
		};
	},
	head: {},
});
</script>

<style lang="scss" scoped>
.text-centered {
	text-align: center;
}
</style>
