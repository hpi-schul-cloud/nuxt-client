<template>
	<SvsDialog
		v-model="isOpen"
		title="pages.rooms.ccImportCourse.title"
		data-testid="common-cartridge-import-modal"
		confirm-btn-lang-key="common.actions.import"
		:confirm-btn-disabled="importButtonDisabled"
		@cancel="onCancel"
		@confirm="onConfirm"
	>
		<template #content>
			<p class="text-body-2 mb-4">
				{{ t("pages.rooms.ccImportCourse.maxFileSize", { maxSize: formattedMaxFileSize }) }}
			</p>
			<VFileInput
				v-model="file"
				class="truncate-file-input"
				:label="t('pages.rooms.ccImportCourse.fileInputLabel')"
				:prepend-icon="mdiTrayArrowUp"
				:rules="fileSizeRules"
				accept=".imscc, .zip"
				clearable
				show-size
				data-testid="dialog-file-input"
			/>
		</template>
	</SvsDialog>
</template>

<script setup lang="ts">
import { formatBytes } from "@/utils/fileSize";
import { useEnvConfig } from "@data-env";
import { mdiTrayArrowUp } from "@icons/material";
import { SvsDialog } from "@ui-dialog";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { VFileInput } from "vuetify/components";

const { t } = useI18n();

// Default max file size: 1 GB in bytes
const DEFAULT_MAX_FILE_SIZE_BYTES = 1073741824;

const envConfig = useEnvConfig();

const maxFileSizeBytes = computed(
	() =>
		((envConfig.value as Record<string, unknown>).FEATURE_COMMON_CARTRIDGE_COURSE_IMPORT_MAX_FILE_SIZE as
			| number
			| undefined) ?? DEFAULT_MAX_FILE_SIZE_BYTES
);

const formattedMaxFileSize = computed(() => formatBytes(maxFileSizeBytes.value));

const isOpen = defineModel({
	type: Boolean,
	required: true,
});

const emit = defineEmits<{
	import: [file: File];
}>();

const file = ref<File | undefined>();

const isFileSizeValid = computed(() => {
	if (!file.value) return true;
	return file.value.size <= maxFileSizeBytes.value;
});

const fileSizeRules = [
	(value: File | File[] | undefined) => {
		if (!value) return true;

		// Handle array of files
		if (Array.isArray(value)) {
			const totalSize = value.reduce((acc, current) => acc + current.size, 0);
			return (
				totalSize <= maxFileSizeBytes.value ||
				t("pages.rooms.ccImportCourse.fileSizeExceeded", { maxSize: formattedMaxFileSize.value })
			);
		}

		// Handle single file
		return (
			value.size <= maxFileSizeBytes.value ||
			t("pages.rooms.ccImportCourse.fileSizeExceeded", { maxSize: formattedMaxFileSize.value })
		);
	},
];

const importButtonDisabled = computed(() => !file.value || !isFileSizeValid.value);

const onCancel = () => {
	file.value = undefined;
};

const onConfirm = () => {
	if (file.value && isFileSizeValid.value) {
		emit("import", file.value);
		file.value = undefined;
	}
};
</script>

<style lang="scss" scoped>
:deep(.truncate-file-input .v-field__input) {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	display: block;
	max-width: 100%;
}
</style>
