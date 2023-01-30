<template>
	<div class="text-centered mt-8">
		<error-content
			:status-code="appErrorStatusCode"
			:error-text="translatedErrorMessage"
			data-testid="error-content"
		/>
		<v-btn
			class="mt-4"
			color="primary"
			depressed
			ref="btn-back"
			data-testid="btn-back"
			@click="onBackClick"
		>
			{{ $t("error.action.back") }}
		</v-btn>
	</div>
</template>
<script lang="ts">
import ApplicationErrorModule from "@/store/application-error";
import { computed, defineComponent, inject, onUnmounted } from "vue";
import VueI18n from "vue-i18n";
import Theme from "@/theme.config";
import ErrorContent from "@/components/error-handling/ErrorContent.vue";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { useTitle } from "@vueuse/core";
import { useStorage } from "@/composables/locale-storage.composable";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ErrorPage",
	components: {
		ErrorContent,
	},
	head: {},
	setup() {
		const storage = useStorage();
		const permissionErrors: Array<HttpStatusCode> = [
			HttpStatusCode.BadRequest,
			HttpStatusCode.Unauthorized,
			HttpStatusCode.Forbidden,
		];
		const i18n = inject<VueI18n | undefined>("i18n");
		const applicationErrorModule = inject<ApplicationErrorModule | undefined>(
			"applicationErrorModule"
		);
		const performanceNavigation = window.performance.getEntriesByType(
			"navigation"
		)[0] as PerformanceNavigationTiming;

		const getError = () => {
			if (performanceNavigation.type === "reload") {
				const [statusCode, translationKey] = storage.getMultiple([
					"applicationErrorStatusCode",
					"applicationErrorTranslationKey",
				]);
				return {
					statusCode: Number(statusCode),
					translationKey,
				};
			}

			storage.remove("applicationErrorStatusCode");
			storage.remove("applicationErrorTranslationKey");
			return {
				statusCode: Number(applicationErrorModule?.getStatusCode),
				translationKey: applicationErrorModule?.getTranslationKey,
			};
		};

		if (applicationErrorModule === undefined || i18n === undefined) {
			return;
		}

		addEventListener("pagehide", (event) => {
			if (event.persisted) return;

			if (applicationErrorModule?.getStatusCode) {
				storage.set(
					"applicationErrorStatusCode",
					JSON.stringify(applicationErrorModule?.getStatusCode)
				);

				storage.set(
					"applicationErrorTranslationKey",
					applicationErrorModule?.getTranslationKey
				);
			}
		});

		useTitle(i18n.tc("error.generic") + " - " + Theme.short_name);

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

			const translatedError = i18n.t(translationKey).toString();

			const result =
				translatedError !== translationKey
					? translatedError
					: i18n.t("error.generic").toString();
			return result;
		});

		onUnmounted(() => {
			applicationErrorModule?.resetError();
		});

		return {
			onBackClick,
			appErrorStatusCode,
			translatedErrorMessage,
			isPermissionError,
			isGenericError,
		};
	},
});
</script>

<style lang="scss" scoped>
.text-centered {
	text-align: center;
}
</style>
