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
import {
	computed,
	inject,
	defineComponent,
	useMeta,
} from "@nuxtjs/composition-api";
import VueI18n from "vue-i18n";
import Theme from "@theme/config";
import ErrorContent from "@components/error-handling/ErrorContent.vue";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ErrorPage",
	components: {
		ErrorContent,
	},
	head: {},
	setup() {
		const permissionErrors: Array<Number> = [400, 401, 403];
    let applicationErrorModule: ApplicationErrorModule | undefined;

    if ("applicationErrorModule" in localStorage) {
      if (window.performance.getEntriesByType("navigation")[0].type === 'reload') {
        applicationErrorModule = JSON.parse(localStorage.getItem("applicationErrorModule"));
      }
      localStorage.removeItem("applicationErrorModule");
    } else {
      applicationErrorModule = inject<ApplicationErrorModule | undefined>(
          "applicationErrorModule"
      );
    }
		const i18n = inject<VueI18n | undefined>("i18n");

		if (applicationErrorModule === undefined || i18n === undefined) {
			return;
		}

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

    window.onbeforeunload = function () {
      localStorage.setItem("applicationErrorModule", JSON.stringify(applicationErrorModule));
    }

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
