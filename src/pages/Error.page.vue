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
import { computed, defineComponent, inject } from "vue";
import VueI18n from "vue-i18n";
import Theme from "@/theme.config";
import ErrorContent from "@/components/error-handling/ErrorContent.vue";
import { useApplicationError } from "@/composables/application-error.composable";
import { useTitle } from "@vueuse/core";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "ErrorPage",
	components: {
		ErrorContent,
	},
	setup() {
		const applicationErrorModule = inject<ApplicationErrorModule | undefined>(
			"applicationErrorModule"
		);
		const i18n = inject<VueI18n | undefined>("i18n");

		const { createApplicationError } = useApplicationError();

		if (applicationErrorModule === undefined || i18n === undefined) {
			throw createApplicationError(500);
		}

		useTitle(i18n.tc("error.generic") + " - " + Theme.short_name);

		const onBackClick = () => {
			console.log('CALLED ----- onBackClick');
			window.location.assign("/dashboard");
		};

		const appErrorTranslationKey = computed(() => {
			return applicationErrorModule.getTranslationKey;
		});
		const appErrorStatusCode = computed(() => {
			return applicationErrorModule.getStatusCode;
		});

		const translatedErrorMessage = computed(() => {
			const translationKey = appErrorTranslationKey.value;

			const translatedError = i18n.tc(translationKey);

			return translatedError !== translationKey
				? translatedError
				: i18n.tc("error.generic");
		});

		return {
			appErrorStatusCode,
			translatedErrorMessage,
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
