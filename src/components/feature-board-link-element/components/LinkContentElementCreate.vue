<template>
	<v-card-text>
		<v-form
			@submit.prevent="onSubmit(url)"
			ref="form"
			:lazy-validation="true"
			validate-on="submit"
		>
			<div class="d-flex flex-row">
				<v-textarea
					v-model="url"
					:rules="rules"
					:label="$t('components.cardElement.LinkElement.label')"
					type="text"
					:autofocus="true"
					:auto-grow="true"
					rows="1"
					@keydown.enter.prevent="onKeydownEnter"
					@keydown="onKeydown"
					class="text"
				>
					<template v-slot:append>
						<button type="submit" ref="submit">
							<v-icon aria-hidden="true"> {{ mdiCheck }}</v-icon>
							<span class="d-sr-only">{{ $t("common.actions.save") }}</span>
						</button>
					</template>
				</v-textarea>

				<div class="align-self-center menu">
					<slot />
				</div>
			</div>
		</v-form>
	</v-card-text>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useI18n } from "@/composables/i18n.composable";
import { isRequired, isValidUrl } from "@util-validators";
import { mdiCheck } from "@mdi/js";

type VuetifyFormApi = {
	/**
	 * Runs the validation and returns if all fields are valid
	 * @see https://v2.vuetifyjs.com/en/components/forms/#validation-with-submit-26-clear
	 */
	validate: () => boolean;
};

export default defineComponent({
	name: "LinkContentElementCreate",
	components: {},
	emits: ["create:url"],
	setup(props, { emit }) {
		const { t } = useI18n();
		const url = ref<string>("");
		const form = ref<VuetifyFormApi | null>(null);
		const rules = [(value: string) => validate(value)];
		const isValidationActive = ref(false);

		const validate = (value: string) => {
			// vue3: with vuetify3 we can use validate-on="submit" instead of preventing validation programmatically
			if (isValidationActive.value === true) {
				const rules: Array<(value: any) => string | true> = [
					isRequired(t("common.validation.required2")),
					isValidUrl(t("util-validators-invalid-url")),
				];
				const results = rules.map((rule) => rule(value));
				const errorMessages = results.filter((isValid) => isValid !== true);
				if (errorMessages.length > 0) {
					return errorMessages[0];
				}
			}
			return true;
		};

		const onSubmit = (url: string) => {
			isValidationActive.value = true;
			if (form?.value?.validate()) emit("create:url", url);
		};

		const onKeydownSubmit = (event: KeyboardEvent, url: string) => {
			event.stopPropagation();
			onSubmit(url);
		};

		const onKeydownEnter = (event: KeyboardEvent) => {
			event.stopPropagation();
			onSubmit(url.value);
		};

		const onKeydown = () => (isValidationActive.value = false);

		return {
			onKeydown,
			onKeydownEnter,
			onSubmit,
			onKeydownSubmit,
			form,
			url,
			rules,
			mdiCheck,
		};
	},
});
</script>

<style scoped>
.v-textarea textarea {
	padding-top: 8px;
	line-height: 1.375rem;
}
.menu {
	margin-right: -12px;
}
</style>
