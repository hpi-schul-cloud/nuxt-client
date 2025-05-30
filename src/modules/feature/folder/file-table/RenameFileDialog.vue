<template>
	<Dialog
		v-model:is-dialog-open="isDialogOpen"
		:message="t('ui.rename.dialog.title', { entity: entityName })"
		:confirm-btn-disabled="!isNameValid"
		@cancel="onCancel"
		@confirm="onConfirm"
	>
		<template #content>
			<v-text-field
				v-model="nameRef"
				data-testid="rename-dialog-input"
				class="mt-8"
				density="compact"
				flat
				:aria-label="$t('common.labels.name.new')"
				:label="t('common.labels.name.new')"
				:rules="[
					rules.required,
					rules.validateOnOpeningTag,
					rules.checkDuplicatedNames,
				]"
			/>
		</template>
	</Dialog>
</template>

<script setup lang="ts">
import { FileRecord } from "@/types/file/File";
import { getFileExtension, removeFileExtension } from "@/utils/fileHelper";
import { useOpeningTagValidator } from "@/utils/validation";
import { Dialog } from "@ui-dialog";
import { computed, PropType, reactive, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { fileRecords, name } = defineProps({
	entityName: { type: String, required: false, default: "" },
	fileRecords: {
		type: Array as PropType<FileRecord[]>,
		required: true,
	},
	name: { type: String, required: false, default: "" },
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
		nameRef.value = removeFileExtension(newName);
	},
	{ immediate: true }
);

const { t } = useI18n();

const { validateOnOpeningTag } = useOpeningTagValidator();

const rules = reactive({
	required: (value: string) => !!value || t("common.validation.required"),
	validateOnOpeningTag: (value: string) => {
		return validateOnOpeningTag(value);
	},
	checkDuplicatedNames: (value: string) => {
		const fileExtension = getFileExtension(name);
		const nameWithExtension = `${value}.${fileExtension}`;

		return (
			!fileRecords.find(
				(item) => item.name === nameWithExtension && item.name !== name
			) || t("pages.folder.rename-file-dialog.validation.duplicate-file-name")
		);
	},
});

const isNameValid = computed(() => {
	return (
		rules.required(nameRef.value) === true &&
		rules.validateOnOpeningTag(nameRef.value) === true &&
		rules.checkDuplicatedNames(nameRef.value) === true
	);
});

const onCancel = () => {
	emit("cancel");
};
const onConfirm = () => {
	if (isNameValid.value) {
		emit("confirm", nameRef.value);
	}
};
</script>
