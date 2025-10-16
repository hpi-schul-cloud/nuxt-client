<template>
	<VTextField
		v-model="modelValue"
		data-testid="file-alttext-input"
		:persistent-hint="true"
		:hint="t('components.cardElement.fileElement.altDescription')"
		:label="t('components.cardElement.fileElement.alternativeText')"
		:rules="rules"
	/>
</template>

<script setup lang="ts">
import { useOpeningTagValidator } from "@/utils/validation";
import { onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

type Props = {
	alternativeText?: string;
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

const rules = [(value: string) => validateOnOpeningTag(value)];

watch(modelValue, (newValue) => {
	const isValid = rules.every((rule) => rule(newValue) === true);

	if (isValid) {
		emit("update:alternativeText", newValue);
	}
});
</script>
