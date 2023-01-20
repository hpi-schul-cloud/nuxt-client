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
import { HttpStatusCode } from "../store/types/http-status-code.enum";
import {provide} from "@vue/composition-api";
import {useStorage} from "@/composables/locale-storage.composable";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ErrorPage",
	components: {
		ErrorContent,
	},
	head: {},
	setup() {
		const { get, set , remove} = useStorage();
		const performanceNavigation = window.performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
		const applicationErrorStatusCode = get("applicationErrorStatusCode");
		const applicationErrorTranslationKey = get("applicationErrorTranslationKey")

		if ((applicationErrorStatusCode || applicationErrorTranslationKey) && performanceNavigation.type === "reload") {
			const storedApplicationErrorModule = new ApplicationErrorModule({});
			if (applicationErrorStatusCode) {
				storedApplicationErrorModule.setStatusCode(Number(applicationErrorStatusCode) as HttpStatusCode);
			}
			storedApplicationErrorModule.setTranslationKey(applicationErrorTranslationKey);

			provide<ApplicationErrorModule>("applicationErrorModule", storedApplicationErrorModule);
		}

		remove("applicationErrorStatusCode");
		remove("applicationErrorTranslationKey");

		const permissionErrors: Array<HttpStatusCode> = [HttpStatusCode.BadRequest, HttpStatusCode.Unauthorized, HttpStatusCode.Forbidden];
		const applicationErrorModule = inject<ApplicationErrorModule | undefined>(
				"applicationErrorModule"
		)
		const i18n = inject<VueI18n | undefined>("i18n");

		if (applicationErrorModule === undefined || i18n === undefined) {
			return;
		}

		window.onbeforeunload = function() {
			if (applicationErrorModule?.getStatusCode)
				set("applicationErrorStatusCode", JSON.stringify(applicationErrorModule?.getStatusCode));

			if (applicationErrorModule?.getTranslationKey)
				set("applicationErrorTranslationKey", applicationErrorModule!.getTranslationKey);
		};

		useMeta({
			title: i18n?.t("error.generic") + " - " + Theme.short_name,
		});

		const onBackClick = () => {
			window.location.assign("/dashboard");
		};

		const appErrorTranslationKey = computed(() => {
			return applicationErrorModule.getTranslationKey;
		});
		const appErrorStatusCode = computed(() => {
			return applicationErrorModule.getStatusCode;
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
