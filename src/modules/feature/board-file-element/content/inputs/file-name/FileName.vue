<template>
	<InputWrapperWithCheckmark @confirm="onConfirm">
		<VTextField
			v-model="nameRef"
			data-testid="file-name-input"
			:label="t('common.labels.fileName')"
			:rules="[rules.isRequired, rules.validateOnOpeningTag]"
			@click.stop
			@keydown.enter.stop="onConfirm"
		/>
	</InputWrapperWithCheckmark>
</template>

<script setup lang="ts">
import { getFileExtension, removeFileExtension } from "@/utils/fileHelper";
import { useOpeningTagValidator } from "@/utils/validation";
import { InputWrapperWithCheckmark } from "@ui-input";
import { isRequired } from "@util-validators";
import { onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

type Props = {
	name?: string;
	isEditMode: boolean;
};

const props = withDefaults(defineProps<Props>(), {
	name: "",
});

const { validateOnOpeningTag } = useOpeningTagValidator();

const emit = defineEmits<{
	(e: "update:name", name: string): void;
}>();

const modelValue = ref("");

const { t } = useI18n();

const nameRef = ref<string>("");

watch(
	() => props.name,
	(newName) => {
		if (newName !== "") {
			nameRef.value = removeFileExtension(newName);
		}
	},
	{ immediate: true }
);

onMounted(() => {
	if (props.name !== undefined) {
		modelValue.value = props.name;
	}
});

const rules = {
	validateOnOpeningTag: (value: string) => {
		const fileExtension = getFileExtension(props.name);
		const nameWithExtension = `${value}.${fileExtension}`;

		return validateOnOpeningTag(nameWithExtension);
	},
	isRequired: (value: string) => isRequired(t("common.validation.required"))(value),
};

const addFileExtension = (name: string) => {
	const fileExtension = getFileExtension(props.name);
	const nameWithExtension = `${name}.${fileExtension}`;

	return nameWithExtension;
};

const onConfirm = () => {
	const nameWithExtension = addFileExtension(nameRef.value);

	const isNameValid =
		rules.validateOnOpeningTag(nameWithExtension) === true && rules.isRequired(nameRef.value) === true;

	if (isNameValid) {
		emit("update:name", nameWithExtension);
	}
};
</script>
