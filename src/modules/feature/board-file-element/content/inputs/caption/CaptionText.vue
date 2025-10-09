<template>
	<InputWrapperWithCheckmark @confirm="onConfirm">
		<VTextarea
			v-model="modelValue"
			data-testid="file-caption-input"
			rows="1"
			auto-grow
			:label="t('components.cardElement.fileElement.caption')"
			:rules="[rules.validateOnOpeningTag]"
			@click.stop
		/>
	</InputWrapperWithCheckmark>
</template>

<script setup lang="ts">
import { useOpeningTagValidator } from "@/utils/validation";
import { InputWrapperWithCheckmark } from "@ui-input";
import { onMounted, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";

type Props = {
	caption?: string;
	isEditMode: boolean;
};

const props = withDefaults(defineProps<Props>(), {
	caption: undefined,
});

const emit = defineEmits<{
	(e: "update:caption", caption: string): void;
}>();

const { t } = useI18n();
const { validateOnOpeningTag } = useOpeningTagValidator();

const modelValue = ref("");

onMounted(() => {
	if (props.caption !== undefined) {
		modelValue.value = props.caption;
	}
});

const rules = reactive({
	validateOnOpeningTag: (value: string) => validateOnOpeningTag(value),
});

const onConfirm = () => {
	const isNameValid = rules.validateOnOpeningTag(modelValue.value) === true;

	if (isNameValid) {
		emit("update:caption", modelValue.value);
	}
};
</script>
