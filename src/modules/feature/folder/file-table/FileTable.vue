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
		<div class="mt-2">
			<DataTable
				:table-headers="headers"
				:items="fileRecordItems"
				:show-select="true"
			>
				<template #[`item.preview`]="{ item }">
					<FileInteractionHandler :file-record-item="item">
						<FilePreview
							:file-record="item"
							:data-testid="`file-preview-${item.name}`"
							:class="{ 'text-disabled': !item.isSelectable }"
						/>
					</FileInteractionHandler>
				</template>
				<template #[`item.name`]="{ item }">
					<FileInteractionHandler :file-record-item="item">
						<span
							:data-testid="`name-${item.name}`"
							:class="{ 'text-disabled': !item.isSelectable }"
						>
							{{ item.name }}
							<FileStatus :file-record="item" />
						</span>
					</FileInteractionHandler>
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
							:selected-ids="[item.id]"
							:aria-label="t('common.actions.download')"
							@download="onDownloadFile"
						/>
						<KebabMenuActionRename
							v-if="props.hasEditPermission"
							:disabled="!item.isSelectable"
							:aria-label="t('common.actions.rename')"
							@click="onRenameButtonClick(item)"
						/>
						<KebabMenuActionDeleteFiles
							v-if="props.hasEditPermission"
							:file-records="fileRecords"
							:selected-ids="[item.id]"
							:aria-label="t('common.actions.delete')"
							@delete-files="onDeleteFiles"
						/>
					</KebabMenu>
				</template>

				<template #left-of-search>
					<FileUploadProgress
						:upload-progress="uploadProgress"
						:are-upload-stats-visible="areUploadStatsVisible"
						@reset-upload-progress="() => emit('reset-upload-progress')"
					/>
				</template>

				<template #action-menu-items="{ selectedIds }">
					<KebabMenuActionDownloadFiles
						:selected-ids="selectedIds"
						:aria-label="t('common.actions.download')"
						@download="onDownloadFilesAsArchive"
					/>
					<KebabMenuActionDeleteFiles
						v-if="props.hasEditPermission"
						:file-records="fileRecords"
						:selected-ids="selectedIds"
						:aria-label="t('common.actions.delete')"
						@delete-files="onDeleteFiles"
					/>
				</template>
			</DataTable>
			<FileStatusLegend />
			<RenameFileDialog
				v-model:is-dialog-open="isRenameDialogOpen"
				:file-records="fileRecords"
				:name="fileRecordToRename?.name"
				:entity-name="t('components.cardElement.fileElement')"
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
	formatFileSize,
	getFileExtension,
	isScanStatusBlocked,
} from "@/utils/fileHelper";
import { DataTable } from "@ui-data-table";
import { EmptyState } from "@ui-empty-state";
import { KebabMenu, KebabMenuActionRename } from "@ui-kebab-menu";
import { computed, PropType, ref } from "vue";
import { useI18n } from "vue-i18n";
import DeleteFileDialog from "./DeleteFileDialog.vue";
import EmptyFolderSvg from "./EmptyFolderSvg.vue";
import FileInteractionHandler from "./FileInteractionHandler.vue";
import FilePreview from "./FilePreview.vue";
import FileStatus from "./FileStatus.vue";
import FileStatusLegend from "./FileStatusLegend.vue";
import FileUploadProgress from "./FileUploadProgress.vue";
import KebabMenuActionDeleteFiles from "./KebabMenuActionDeleteFiles.vue";
import KebabMenuActionDownloadFiles from "./KebabMenuActionDownloadFiles.vue";
import RenameFileDialog from "./RenameFileDialog.vue";

const { t } = useI18n();

const props = defineProps({
	isLoading: {
		type: Boolean,
		required: true,
	},
	isEmpty: {
		type: Boolean,
		required: true,
	},
	hasEditPermission: {
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
	areUploadStatsVisible: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits([
	"delete-files",
	"update:name",
	"reset-upload-progress",
	"download-file",
	"download-files-as-archive",
]);

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
		isSelectable: isScanStatusBlocked(item.securityCheckStatus),
	}));
});

const onDownloadFile = (selectedIds: string[]) => {
	emit("download-file", selectedIds);
};

const onDownloadFilesAsArchive = (selectedIds: string[]) => {
	emit("download-files-as-archive", selectedIds);
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
	fileRecordToRename.value = { ...item };
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
