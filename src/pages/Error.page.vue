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
import ApplicationErrorModule from "@/store/application-error";
import { computed, defineComponent, inject } from "vue";
import VueI18n from "vue-i18n";
import Theme from "@/theme.config";
import ErrorContent from "@/components/error-handling/ErrorContent.vue";
import { useApplicationError } from "@/composables/application-error.composable";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ErrorPage",
	components: {
		ErrorContent,
	},
	setup() {
		const permissionErrors: Array<number> = [400, 401, 403];
		const applicationErrorModule = inject<ApplicationErrorModule | undefined>(
			"applicationErrorModule"
		);
		const i18n = inject<VueI18n | undefined>("i18n");

		const { createApplicationError } = useApplicationError();

		if (applicationErrorModule === undefined || i18n === undefined) {
			throw createApplicationError(500);
		}
		document.title = i18n.t("error.generic") + " - " + Theme.short_name;

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

			const translatedError = i18n.tc(translationKey);

			return translatedError !== translationKey
				? translatedError
				: i18n.tc("error.generic");
		});
		const testValue = "";
		return {
			testValue,
			appErrorStatusCode,
			translatedErrorMessage,
			isPermissionError,
			isGenericError,
			onBackClick,
		};
	},
});
</script>

<style lang="scss" scoped>
.text-centered {
	text-align: center;
}
</style>
