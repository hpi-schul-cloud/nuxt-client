<template>
	<div class="text-centered mt-8">
		<error-content
			:is-generic-error="isGenericError"
			:is-permission-error="isPermissionError"
			:error-text="translatedErrorMessage"
			data-testid="error-content"
		/>
		<v-btn
			class="mt-4"
			color="primary"
			depressed
			data-testid="btn-back"
			@click="onBackClick"
		>
			{{ $t("error.action.back") }}
		</v-btn>
	</div>
</template>
<script lang="ts">
import ApplicationErrorModule from "@store/application-error";
import {computed, defineComponent, inject, onBeforeUnmount, onMounted, useMeta,} from "@nuxtjs/composition-api";
import VueI18n from "vue-i18n";
import Theme from "@theme/config";
import ErrorContent from "@components/error-handling/ErrorContent.vue";
import {HttpStatusCode} from "@store/types/http-status-code.enum";
import {onBeforeMount, provide} from "@vue/composition-api";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ErrorPage",
	components: {
		ErrorContent,
	},
	head: {},
	setup() {
		const performanceNavigation = window.performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
		const applicationErrorStatusCode = localStorage.getItem("applicationErrorStatusCode");
		const applicationErrorTranslationKey = localStorage.getItem("applicationErrorTranslationKey")
		console.log(performanceNavigation.type);
		console.log(applicationErrorStatusCode);
		console.log(applicationErrorTranslationKey);

		if ((applicationErrorStatusCode || applicationErrorTranslationKey) && performanceNavigation.type === "reload"){
			const storedApplicationErrorModule = new ApplicationErrorModule({});
			if (applicationErrorStatusCode) {
				storedApplicationErrorModule.setStatusCode(HttpStatusCode[applicationErrorStatusCode as keyof typeof HttpStatusCode]);
			}
			storedApplicationErrorModule.setTranslationKey(applicationErrorTranslationKey);

			console.log("provide error module")
			provide<ApplicationErrorModule>("applicationErrorModule", storedApplicationErrorModule);
		}

		const permissionErrors: Array<Number> = [400, 401, 403];
		const applicationErrorModule = inject<ApplicationErrorModule | undefined>(
				"applicationErrorModule"
		)
		const i18n = inject<VueI18n | undefined>("i18n");

		onMounted(() => {
			console.log("clear localStorage");
			localStorage.removeItem("applicationErrorStatusCode");
			localStorage.removeItem("applicationErrorTranslationKey");
		});

		onBeforeUnmount(() => {
			if (applicationErrorModule?.getStatusCode)
				localStorage.setItem("applicationErrorStatusCode", HttpStatusCode[applicationErrorModule?.getStatusCode]);

			if (applicationErrorModule?.getTranslationKey)
				localStorage.setItem("applicationErrorTranslationKey", applicationErrorModule!.getTranslationKey);
		})

		if (applicationErrorModule === undefined || i18n === undefined) {
			return;
		}

		console.log(applicationErrorModule!.getTranslationKey);
		console.log(applicationErrorModule!.getStatusCode);
		console.log(applicationErrorModule!.getStatusCode.value);
		window.onbeforeunload = function () {
			if (applicationErrorModule?.getStatusCode)
				localStorage.setItem("applicationErrorStatusCode", HttpStatusCode[applicationErrorModule?.getStatusCode]);

			if (applicationErrorModule?.getTranslationKey)
				localStorage.setItem("applicationErrorTranslationKey", applicationErrorModule!.getTranslationKey);
		}

		useMeta({
			title: i18n?.t("error.generic") + " - " + Theme.short_name,
		});

		const onBackClick = () => {
			window.location.assign("/dashboard");
		};

		const appErrorTranslationKey = computed(() => {
			return applicationErrorModule!.getTranslationKey;
		});
		const appErrorStatusCode = computed(() => {
			return applicationErrorModule!.getStatusCode;
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
			const translationKey = appErrorTranslationKey.value;

			const translatedError = i18n.t(translationKey).toString();

			const result =
				translatedError !== translationKey
					? translatedError
					: i18n.t("error.generic").toString();
			return result;
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
