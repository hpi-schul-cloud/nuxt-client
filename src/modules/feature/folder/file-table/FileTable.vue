<template>
	<template v-if="isLoading">
		<VContainer class="loader">
			<VSkeletonLoader
				ref="skeleton-loader"
				type="table-thead, table-tbody"
				class="mt-6"
			/>
		</VContainer>
	</template>
	<template v-else-if="isEmpty && !areUploadStatsVisible">
		<EmptyState :title="t('pages.folder.emptyState')">
			<template #media>
				<EmptyFolderSvg />
			</template>
		</EmptyState>
	</template>
	<template v-else>
		<div class="mt-8">
			<DataTable
				:table-headers="headers"
				:items="fileRecordItems"
				:show-select="true"
			>
				<template #[`item.preview`]="{ item }">
					<FilePreview
						:file-record="item"
						:data-testid="`file-preview-${item.name}`"
						:disabled="!item.isSelectable"
					/>
				</template>
				<template #[`item.name`]="{ item }">
					<span
						:data-testid="`name-${item.name}`"
						:class="{ 'text-disabled': !item.isSelectable }"
						>{{ item.name }}</span
					>
				</template>
				<template #[`item.createdAt`]="{ item }">
					<span
						:data-testid="`created-at-${item.name}`"
						:class="{ 'text-disabled': !item.isSelectable }"
						>{{ printDateFromStringUTC(item.createdAt) }}</span
					>
				</template>
				<template #[`item.size`]="{ item }">
					<span
						:data-testid="`size-${item.name}`"
						:class="{ 'text-disabled': !item.isSelectable }"
						>{{ formatFileSize(item.size) }}
					</span>
				</template>
				<template #[`item.actions`]="{ item }">
					<KebabMenu
						:data-testid="`kebab-menu-${item.name}`"
						:aria-label="buildActionMenuAriaLabel(item)"
					>
						<KebabMenuActionDownloadFiles
							:disabled="!item.isSelectable"
							:file-records="fileRecords"
							:selected-ids="[item.id]"
							:aria-label="t('common.actions.download')"
						/>
						<KebabMenuActionRename
							:disabled="!item.isSelectable"
							:aria-label="t('common.actions.rename')"
							@click="onRenameButtonClick(item)"
						/>
						<KebabMenuActionDeleteFiles
							:file-records="fileRecords"
							:selected-ids="[item.id]"
							:aria-label="t('common.actions.delete')"
							@delete-files="onDeleteFiles"
						/>
					</KebabMenu>
				</template>

				<template #left-of-search>
					<FileUploadProgress :upload-progress="uploadProgress" />
				</template>

				<template #action-menu-items="{ selectedIds }">
					<KebabMenuActionDeleteFiles
						:file-records="fileRecords"
						:selected-ids="selectedIds"
						:aria-label="t('common.actions.delete')"
						@delete-files="onDeleteFiles"
					/>
				</template>
			</DataTable>
			<RenameFileDialog
				v-model:is-dialog-open="isRenameDialogOpen"
				:file-records="fileRecords"
				:name="fileRecordToRenameName"
				:entity-name="$t('components.cardElement.fileElement')"
				@cancel="onRenameDialogCancel"
				@confirm="onRenameDialogConfirm"
			/>
			<DeleteFileDialog
				v-model:is-dialog-open="isDeleteFilesDialogOpen"
				:file-records="fileRecordsToDelete"
				@confirm="onDeleteFilesConfirm"
				@cancel="onDeleteFilesCancel"
			/>
		</div>
	</template>
</template>

<script setup lang="ts">
import { printDateFromStringUTC } from "@/plugins/datetime";
import { FileRecord } from "@/types/file/File";
import {
	convertFileSize,
	getFileExtension,
	isDownloadAllowed,
} from "@/utils/fileHelper";
import { DataTable } from "@ui-data-table";
import { EmptyState } from "@ui-empty-state";
import { KebabMenu, KebabMenuActionRename } from "@ui-kebab-menu";
import { computed, PropType, ref } from "vue";
import { useI18n } from "vue-i18n";
import DeleteFileDialog from "./DeleteFileDialog.vue";
import EmptyFolderSvg from "./EmptyFolderSvg.vue";
import FilePreview from "./FilePreview.vue";
import FileUploadProgress from "./FileUploadProgress.vue";
import KebabMenuActionDeleteFiles from "./KebabMenuActionDeleteFiles.vue";
import KebabMenuActionDownloadFiles from "./KebabMenuActionDownloadFiles.vue";
import RenameFileDialog from "./RenameFileDialog.vue";

const { t, n } = useI18n();

const props = defineProps({
	isLoading: {
		type: Boolean,
		required: true,
	},
	isEmpty: {
		type: Boolean,
		required: true,
	},
	fileRecords: {
		type: Array as PropType<FileRecord[]>,
		required: true,
	},
	uploadProgress: {
		type: Object as PropType<{
			uploaded: number;
			total: number;
		}>,
		required: true,
	},
});

const emit = defineEmits(["delete-files", "update:name"]);

const headers = [
	{ title: "", key: "preview", sortable: false },
	{ title: t("pages.folder.columns.name"), key: "name" },
	{ title: t("pages.folder.columns.createdat"), key: "createdAt" },
	{ title: t("pages.folder.columns.size"), key: "size" },
	{
		title: t("ui.actionMenu.actions"),
		key: "actions",
		sortable: false,
		width: 50,
	},
];

const fileRecordToRename = ref<FileRecord | undefined>(undefined);
const isRenameDialogOpen = ref(false);
const isDeleteFilesDialogOpen = ref(false);
const fileRecordsToDelete = ref<FileRecord[]>([]);

const fileRecordItems = computed(() => {
	return props.fileRecords.map((item) => ({
		...item,
		isSelectable: isDownloadAllowed(item.securityCheckStatus),
	}));
});

const areUploadStatsVisible = computed(() => {
	return props.uploadProgress.total > 0;
});
const fileRecordToRenameName = computed(
	() => fileRecordToRename.value?.name || ""
);

const formatFileSize = (size: number) => {
	const { convertedSize, unit } = convertFileSize(size);
	const localizedFileSize = n(convertedSize, "fileSize");

	return `${localizedFileSize} ${unit}`;
};

const onDeleteFiles = (selectedFileRecords: FileRecord[]) => {
	isDeleteFilesDialogOpen.value = true;
	fileRecordsToDelete.value = selectedFileRecords;
};

const onDeleteFilesConfirm = () => {
	emit("delete-files", fileRecordsToDelete.value);
	fileRecordsToDelete.value = [];
	isDeleteFilesDialogOpen.value = false;
};
const onDeleteFilesCancel = () => {
	isDeleteFilesDialogOpen.value = false;
	fileRecordsToDelete.value = [];
};

const onRenameButtonClick = (item: FileRecord) => {
	isRenameDialogOpen.value = true;
	fileRecordToRename.value = item;
};
const onRenameDialogCancel = () => {
	isRenameDialogOpen.value = false;
	fileRecordToRename.value = undefined;
};
const onRenameDialogConfirm = (newName: string) => {
	if (!fileRecordToRename.value) return;

	const fileExtension = getFileExtension(fileRecordToRename.value.name);
	const nameWithExtension = `${newName}.${fileExtension}`;

	if (fileRecordToRename.value.name !== nameWithExtension) {
		emit("update:name", nameWithExtension, fileRecordToRename.value);
	}

	isRenameDialogOpen.value = false;
	fileRecordToRename.value = undefined;
};

const buildActionMenuAriaLabel = (item: FileRecord): string => {
	return t("pages.folder.ariaLabels.actionMenu", {
		name: item.name,
	});
};
</script>
