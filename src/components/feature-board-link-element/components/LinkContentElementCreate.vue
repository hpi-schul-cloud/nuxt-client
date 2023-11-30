<template>
	<v-card class="pa-4 elevation-0" tabindex="-1">
		<v-form @submit.prevent.stop="onSubmit" ref="form" :lazy-validation="true">
			<div class="d-flex flex-row">
				<v-textarea
					v-model="url"
					:rules="rules"
					:label="$t('components.cardElement.LinkElement.label')"
					type="text"
					:autofocus="true"
					:auto-grow="true"
					rows="1"
					@keydown.enter.prevent.stop="onKeydownEnter"
					class="text"
				/>

				<div class="align-self-center pl-2">
					<button type="submit" ref="submit">
						<v-icon aria-hidden="true"> {{ mdiCheck }}</v-icon>
						<span class="d-sr-only">{{ $t("common.actions.save") }}</span>
					</button>
				</div>

				<div class="align-self-center menu">
					<slot />
				</div>
			</div>
		</v-form>
	</v-card>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref } from "vue";
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

		const isValidationActive = ref(false);
		const rules = computed(() => {
			if (isValidationActive.value === true) {
				return [
					isRequired(t("common.validation.required2")),
					isValidUrl(t("util-validators-invalid-url")),
				];
			}
			return [];
		});

		const onSubmit = async () => {
			isValidationActive.value = true;
			await nextTick();
			if (form?.value?.validate()) emit("create:url", url.value);
		};

		const onKeydownSubmit = () => onSubmit();

		const onKeydownEnter = () => onSubmit();

		return {
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
	margin-right: -6px;
}
</style>
