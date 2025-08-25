<template>
	<div class="d-flex flex-row">
		<v-textarea
			v-model="modelValue"
			data-testid="file-alttext-input"
			rows="1"
			auto-grow
			:persistent-hint="true"
			:hint="$t('components.cardElement.fileElement.altDescription')"
			:label="$t('components.cardElement.fileElement.alternativeText')"
			:rules="[rules.validateOnOpeningTag]"
		/>
		<div class="align-self-center pl-2">
			<button
				data-testid="save-alternative-text"
				@click.prevent.stop="onConfirm"
			>
				<v-icon aria-hidden="true"> {{ mdiCheck }}</v-icon>
				<span class="d-sr-only">{{ $t("common.actions.save") }}</span>
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useOpeningTagValidator } from "@/utils/validation";
import { mdiCheck } from "@icons/material";
import { onMounted, reactive, ref } from "vue";

type Props = {
	alternativeText?: string;
	isEditMode: boolean;
};

const props = withDefaults(defineProps<Props>(), {
	alternativeText: undefined,
});

const emit = defineEmits<{
	(e: "update:alternativeText", alternativeText: string): void;
}>();

const { validateOnOpeningTag } = useOpeningTagValidator();

const modelValue = ref("");

onMounted(() => {
	if (props.alternativeText !== undefined) {
		modelValue.value = props.alternativeText;
	}
});

const rules = reactive({
	validateOnOpeningTag: (value: string) => {
		return validateOnOpeningTag(value);
	},
});

const onConfirm = () => {
	const isValid = rules.validateOnOpeningTag(modelValue.value) === true;

	if (isValid) {
		emit("update:alternativeText", modelValue.value);
	}
};
</script>
