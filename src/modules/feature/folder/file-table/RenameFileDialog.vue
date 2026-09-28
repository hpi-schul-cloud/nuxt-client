<template>
	<SvsDialog
		v-model="isDialogOpen"
		:title="t('ui.rename.dialog.title', { entity: entityName })"
		:confirm-btn-disabled="!isNameValid"
		data-testid="rename-file-dialog"
		@cancel="onCancel"
		@confirm="onConfirm"
	>
		<template #content>
			<VTextField
				v-model="nameRef"
				data-testid="rename-dialog-input"
				density="compact"
				flat
				:aria-label="$t('common.labels.name.new')"
				:label="t('common.labels.name.new')"
				:rules="[rules.required, rules.validateOnOpeningTag, rules.checkDuplicatedNames, rules.checkInvalidCharacters]"
			/>
		</template>
	</SvsDialog>
</template>

<script setup lang="ts">
import { FileRecord } from "@/types/file/File";
import { getFileExtension, removeFileExtension } from "@/utils/fileHelper";
import { SvsDialog } from "@ui-dialog";
import { useInvalidCharactersValidator, useOpeningTagValidator } from "@util-validators";
import { computed, PropType, reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { fileRecords, name, isFolder } = defineProps({
	entityName: { type: String, required: false, default: "" },
	fileRecords: {
		type: Array as PropType<FileRecord[]>,
		required: true,
	},
	name: { type: String, required: false, default: "" },
	isFolder: { type: Boolean, required: false, default: false },
});

const isDialogOpen = defineModel("is-dialog-open", {
	type: Boolean,
	default: false,
});

const emit = defineEmits(["confirm", "cancel"]);

const nameRef = ref<string>("");

watch(
	() => name,
	(newName) => {
		if (newName !== "") {
			nameRef.value = isFolder ? newName : removeFileExtension(newName);
		}
	},
	{ immediate: true }
);

const { t } = useI18n();

const { validateOnOpeningTag } = useOpeningTagValidator();
const { validateInvalidCharacters } = useInvalidCharactersValidator();

const buildComparableName = (value: string): string => {
	if (isFolder) return value;

	const fileExtension = getFileExtension(name);

	return `${value}.${fileExtension}`;
};

const rules = reactive({
	required: (value: string) => !!value || t("common.validation.required"),
	validateOnOpeningTag: (value: string) => validateOnOpeningTag(buildComparableName(value)),
	checkDuplicatedNames: (value: string) => {
		const comparableName = buildComparableName(value);

		return (
			!fileRecords.find((item) => item.name === comparableName && item.name !== name) ||
			t("pages.folder.rename-file-dialog.validation.duplicate-file-name")
		);
	},
	checkInvalidCharacters: (value: string) => validateInvalidCharacters(value, ["/"]),
});

const isNameValid = computed(
	() =>
		rules.required(nameRef.value) === true &&
		rules.validateOnOpeningTag(nameRef.value) === true &&
		rules.checkDuplicatedNames(nameRef.value) === true &&
		rules.checkInvalidCharacters(nameRef.value) === true
);

const onCancel = () => {
	emit("cancel");
};
const onConfirm = () => {
	if (isNameValid.value) {
		emit("confirm", nameRef.value);
	}
};
</script>
