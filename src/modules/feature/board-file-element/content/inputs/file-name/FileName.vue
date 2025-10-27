<template>
	<VTextField
		v-model="nameRef"
		data-testid="file-name-input"
		:label="t('common.labels.fileName')"
		:rules="[rules.isRequired, rules.validateOnOpeningTag]"
		@click.stop
		@keydown.enter.stop
	/>
</template>

<script setup lang="ts">
import { getFileExtension, removeFileExtension } from "@/utils/fileHelper";
import { isRequired, useOpeningTagValidator } from "@util-validators";
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

type Props = {
	name?: string;
};

const props = withDefaults(defineProps<Props>(), {
	name: "",
});

const { validateOnOpeningTag } = useOpeningTagValidator();

const emit = defineEmits<{
	(e: "update:name", name: string): void;
}>();

const { t } = useI18n();

const nameInput = ref<string | undefined>(undefined);
const nameRef = computed({
	get: () => {
		if (nameInput.value !== undefined) {
			return removeFileExtension(nameInput.value);
		}
		return removeFileExtension(props.name);
	},
	set: (value) => (nameInput.value = value),
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

const updateName = (value: string) => {
	emit("update:name", value);
};

watch(nameRef, (newValue) => {
	const nameWithExtension = addFileExtension(newValue);

	const isNameValid = rules.validateOnOpeningTag(nameWithExtension) === true && rules.isRequired(newValue) === true;

	if (isNameValid) {
		updateName(nameWithExtension);
	}
});
</script>
