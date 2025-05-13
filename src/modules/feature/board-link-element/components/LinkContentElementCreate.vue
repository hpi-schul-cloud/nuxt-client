<template>
	<div data-testid="board-link-element-create" tabindex="-1">
		<v-card-text>
			<v-form ref="form" validate-on="submit" @submit.prevent.stop="onSubmit">
				<div class="d-flex flex-row">
					<v-textarea
						v-model="url"
						:rules="rules"
						:label="$t('components.cardElement.LinkElement.label')"
						type="text"
						data-testid="input-link"
						:autofocus="true"
						:auto-grow="true"
						rows="1"
						class="text"
						@keydown="onKeydown"
					/>

					<div class="align-self-center pl-2">
						<button ref="submit" type="submit" data-testid="save-link-in-card">
							<v-icon aria-hidden="true"> {{ mdiCheck }}</v-icon>
							<span class="d-sr-only">{{ $t("common.actions.save") }}</span>
						</button>
					</div>

					<div class="align-self-center menu">
						<slot />
					</div>
				</div>
			</v-form>
		</v-card-text>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import { isRequired, isValidUrl } from "@util-validators";
import { mdiCheck } from "@icons/material";

type VuetifyFormApi = {
	validate: () => { valid: boolean };
	resetValidation: () => void;
};

export default defineComponent({
	name: "LinkContentElementCreate",
	components: {},
	emits: ["create:url"],
	setup(props, { emit }) {
		const { t } = useI18n();
		const url = ref<string>("");
		const form = ref<VuetifyFormApi | null>(null);

		const rules = [
			isRequired(t("common.validation.required2")),
			isValidUrl(t("util-validators-invalid-url")),
		];

		const onSubmit = async () => {
			if (form?.value) {
				const { valid } = await form.value.validate();
				if (valid) {
					emit("create:url", url.value);
				}
			}
		};

		const onKeydownSubmit = () => onSubmit();

		const onKeydown = (e: KeyboardEvent) => {
			if (e.key === "enter" || e.key === "Enter") {
				e.preventDefault();
				onSubmit();
			} else if (form?.value) {
				form.value.resetValidation();
			}
		};

		return {
			onKeydown,
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
}
.menu {
	margin-right: -6px;
}
</style>
