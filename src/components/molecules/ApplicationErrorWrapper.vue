<template>
	<div class="application-error-wrapper">
		<div v-if="hasError" class="text-centered mt-8">
			<error-content
				:status-code="appErrorStatusCode"
				:error-text="translatedErrorMessage"
				data-testid="error-content"
			/>
		</div>
		<slot v-else></slot>
	</div>
</template>
<script lang="ts">
import { injectStrict, APPLICATION_ERROR_KEY, I18N_KEY } from "@/utils/inject";
import { computed, defineComponent } from "vue";
import ErrorContent from "@/components/error-handling/ErrorContent.vue";

export default defineComponent({
	name: "ApplicationErrorRouting",
	components: {
		ErrorContent,
	},
	setup() {
		const applicationErrorModule = injectStrict(APPLICATION_ERROR_KEY);
		const i18n = injectStrict(I18N_KEY);

		const hasError = computed(
			() => applicationErrorModule.getStatusCode !== null
		);

		const appErrorStatusCode = computed(() =>
			Number(applicationErrorModule.getStatusCode)
		);
		const translatedErrorMessage = computed(() =>
			hasError.value
				? i18n.t(applicationErrorModule.getTranslationKey).toString()
				: ""
		);

		return {
			hasError,
			appErrorStatusCode,
			translatedErrorMessage,
		};
	},
});
</script>
<style lang="scss" scoped>
.text-centered {
	text-align: center;
}
</style>
