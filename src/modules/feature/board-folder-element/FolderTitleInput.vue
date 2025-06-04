<template>
	<v-form ref="form" validate-on="submit" @submit.prevent.stop="onSubmit">
		<div class="d-flex flex-row">
			<v-textarea
				v-model="modelValue"
				:rules="rules"
				:label="t('pages.folder.ariaLabels.menu.action.edit')"
				type="text"
				data-testid="input-folder-title"
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
</template>

<script lang="ts" setup>
import { mdiCheck } from "@icons/material";
import { isRequired } from "@util-validators";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

type VuetifyFormApi = {
	validate: () => { valid: boolean };
	resetValidation: () => void;
};

const props = defineProps({
	title: { type: String, required: true },
});

const emit = defineEmits<{
	(e: "update:title", title: string): void;
}>();

const { t } = useI18n();

const rules = [isRequired(t("common.validation.required2"))];
const form = ref<VuetifyFormApi | null>(null);
const modelValue = ref("");

onMounted(() => {
	if (props.title !== undefined) {
		modelValue.value = props.title;
	}
});

const onSubmit = async () => {
	if (form?.value) {
		const { valid } = await form.value.validate();
		if (valid) {
			emit("update:title", modelValue.value);
		}
	}
};

const onKeydown = (e: KeyboardEvent) => {
	if (e.key === "enter" || e.key === "Enter") {
		e.preventDefault();
		onSubmit();
	} else if (form?.value) {
		form.value.resetValidation();
	}
};
</script>
