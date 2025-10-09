<template>
	<InputWrapperWithCheckmark @confirm="onConfirm">
		<v-textarea
			v-model="modelValue"
			data-testid="file-alttext-input"
			rows="1"
			auto-grow
			:persistent-hint="true"
			:hint="t('components.cardElement.fileElement.altDescription')"
			:label="t('components.cardElement.fileElement.alternativeText')"
			:rules="[rules.validateOnOpeningTag]"
		/>
	</InputWrapperWithCheckmark>
</template>

<script setup lang="ts">
import { useOpeningTagValidator } from "@/utils/validation";
import { InputWrapperWithCheckmark } from "@ui-input";
import { onMounted, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";

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

const { t } = useI18n();

const { validateOnOpeningTag } = useOpeningTagValidator();

const modelValue = ref("");

onMounted(() => {
	if (props.alternativeText !== undefined) {
		modelValue.value = props.alternativeText;
	}
});

const rules = reactive({
	validateOnOpeningTag: (value: string) => validateOnOpeningTag(value),
});

const onConfirm = () => {
	const isValid = rules.validateOnOpeningTag(modelValue.value) === true;

	if (isValid) {
		emit("update:alternativeText", modelValue.value);
	}
};
</script>
