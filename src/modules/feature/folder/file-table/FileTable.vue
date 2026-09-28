<template>
	<template v-if="isLoading">
		<VContainer class="loader">
			<VSkeletonLoader ref="skeleton-loader" type="table-thead, table-tbody" class="mt-6" />
		</VContainer>
	</template>
	<template v-else-if="fileStorageError">
		<EmptyState :title="t('components.board.notifications.errors.fileServiceNotAvailable')">
			<template #media>
				<BrokenPencilSvg />
			</template>
		</EmptyState>
	</template>
	<template v-else-if="isEmpty && !areUploadStatsVisible">
		<template v-if="props.hasEditPermission">
			<div
				class="drop-zone-empty d-flex flex-column align-center justify-center mt-4 py-10 px-6 rounded"
				:class="{ 'drop-zone-empty--active': props.isOverDropZone }"
				data-testid="drop-zone-empty-state"
			>
				<VIcon :icon="mdiTrayArrowUp" size="48" color="primary" class="mb-4" aria-hidden="true" />
				<p class="drop-zone-empty__title ma-0 mb-1 font-weight-medium text-on-surface">
					{{ t("pages.folder.dropZone.emptyState.title") }}
				</p>
				<p class="drop-zone-empty__subtitle ma-0 text-on-surface">
					{{ t("pages.folder.dropZone.emptyState.orText") }}
					<button
						type="button"
						class="drop-zone-empty__browse-link bg-transparent pa-0 cursor-pointer text-primary"
						@click="emit('click:browse')"
					>
						{{ t("pages.folder.dropZone.emptyState.browse") }}
					</button>
				</p>
			</div>
		</template>
		<template v-else>
			<EmptyState :title="t('pages.folder.emptyState')">
				<template #media>
					<EmptyFolderSvg />
				</template>
			</EmptyState>
		</template>
	</template>
	<template v-else>
		<div class="mt-2">
			<DataTable :table-headers="headers" :items="fileRecordItems" :show-select="true">
				<template #[`item.preview`]="{ item }">
					<button
						v-if="item.isFolder"
						type="button"
						class="folder-interactive-area bg-transparent pa-0 cursor-pointer"
						:aria-label="t('pages.folder.ariaLabels.openFolder', { name: item.name })"
						@click="onNavigateIntoFolder(item)"
					>
						<VIcon :icon="mdiFolderOpenOutline" :data-testid="`folder-preview-${item.name}`" />
					</button>
					<FileInteractionHandler v-else :file-record-item="item" :has-edit-permission="props.hasEditPermission">
						<FilePreview
							:file-record="item"
							:data-testid="`file-preview-${item.name}`"
							:class="{ 'text-disabled': !item.isSelectable }"
						/>
					</FileInteractionHandler>
				</template>
				<template #[`item.name`]="{ item }">
					<button
						v-if="item.isFolder"
						type="button"
						class="folder-interactive-area bg-transparent pa-0 cursor-pointer text-left"
						:data-testid="`name-${item.name}`"
						@click="onNavigateIntoFolder(item)"
					>
						{{ item.name }}
					</button>
					<FileInteractionHandler v-else :file-record-item="item" :has-edit-permission="props.hasEditPermission">
						<span :data-testid="`name-${item.name}`" :class="{ 'text-disabled': !item.isSelectable }">
							{{ item.name }}
							<FileStatus :file-record="item" />
						</span>
					</FileInteractionHandler>
				</template>
				<template #[`item.contentLastModifiedAt`]="{ item }">
					<span :data-testid="`content-modified-at-${item.name}`" :class="{ 'text-disabled': !item.isSelectable }">
						{{ getLastModifiedDate(item) }}
					</span>
				</template>
				<template #[`item.size`]="{ item }">
					<span :data-testid="`size-${item.name}`" :class="{ 'text-disabled': !item.isSelectable }"
						>{{ item.isFolder ? "—" : formatFileSize(item.size) }}
					</span>
				</template>
				<template #[`item.actions`]="{ item }">
					<KebabMenu :data-testid="`kebab-menu-${item.name}`" :aria-label="buildActionMenuAriaLabel(item)">
						<KebabMenuActionDownloadFiles
							v-if="!item.isFolder"
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
						<KebabMenuAction
							v-if="props.hasEditPermission"
							:icon="mdiFolderMoveOutline"
							:disabled="!item.isSelectable"
							:aria-label="t('common.actions.move')"
							@click="onMoveButtonClick(item)"
						>
							{{ t("common.actions.move") }}
						</KebabMenuAction>
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
			<RenameFileDialog
				v-model:is-dialog-open="isRenameDialogOpen"
				:file-records="fileRecords"
				:name="fileRecordToRename?.name"
				:is-folder="fileRecordToRename?.isFolder"
				:entity-name="fileRecordToRename?.isFolder ? t('pages.folder.title') : t('components.cardElement.fileElement')"
				@cancel="onRenameDialogCancel"
				@confirm="onRenameDialogConfirm"
			/>
			<DeleteFileDialog
				v-model:is-dialog-open="isDeleteFilesDialogOpen"
				:file-records="fileRecordsToDelete"
				@confirm="onDeleteFilesConfirm"
				@cancel="onDeleteFilesCancel"
			/>
			<MoveFileDialog
				v-model:is-dialog-open="isMoveDialogOpen"
				:available-folders="availableMoveTargets"
				:is-at-root="!props.currentFolderId"
				@confirm="onMoveDialogConfirm"
				@cancel="onMoveDialogCancel"
			/>
		</div>
	</template>
</template>

<script setup lang="ts">
import MoveFileDialog from "../MoveFileDialog.vue";
import DeleteFileDialog from "./DeleteFileDialog.vue";
import EmptyFolderSvg from "./EmptyFolderSvg.vue";
import FileInteractionHandler from "./FileInteractionHandler.vue";
import FilePreview from "./FilePreview.vue";
import FileStatus from "./FileStatus.vue";
import FileUploadProgress from "./FileUploadProgress.vue";
import KebabMenuActionDeleteFiles from "./KebabMenuActionDeleteFiles.vue";
import KebabMenuActionDownloadFiles from "./KebabMenuActionDownloadFiles.vue";
import RenameFileDialog from "./RenameFileDialog.vue";
import BrokenPencilSvg from "@/assets/img/BrokenPencilSvg.vue";
import { FileRecord } from "@/types/file/File";
import { formatFileSize, getFileExtension, isScanStatusBlocked } from "@/utils/fileHelper";
import { mdiFolderMoveOutline, mdiFolderOpenOutline, mdiTrayArrowUp } from "@icons/material";
import { DataTable } from "@ui-data-table";
import { EmptyState } from "@ui-empty-state";
import { KebabMenu, KebabMenuAction, KebabMenuActionRename } from "@ui-kebab-menu";
import { computed, PropType, ref } from "vue";
import { useI18n } from "vue-i18n";

const { t, d } = useI18n();

const props = defineProps({
	isLoading: {
		type: Boolean,
		required: true,
	},
	isEmpty: {
		type: Boolean,
		required: true,
	},
	fileStorageError: {
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
	isOverDropZone: {
		type: Boolean,
		default: false,
	},
	currentFolderId: {
		type: String,
		default: undefined,
	},
});

const emit = defineEmits([
	"delete-files",
	"update:name",
	"reset-upload-progress",
	"download-file",
	"download-files-as-archive",
	"click:browse",
	"navigate-into-folder",
	"move-record",
]);

const headers = [
	{ title: t("pages.folder.columns.preview"), key: "preview", sortable: false },
	{ title: t("pages.folder.columns.name"), key: "name" },
	{ title: t("pages.folder.columns.lastModifiedAt"), key: "contentLastModifiedAt" },
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
const fileRecordToMove = ref<FileRecord | undefined>(undefined);
const isMoveDialogOpen = ref(false);

const availableMoveTargets = computed(() =>
	props.fileRecords.filter((record) => record.isFolder && record.id !== fileRecordToMove.value?.id)
);

const fileRecordItems = computed(() =>
	props.fileRecords.map((item) => ({
		...item,
		isSelectable: !isScanStatusBlocked(item.securityCheckStatus),
	}))
);

const getLastModifiedDate = (item: FileRecord): string => {
	if (item.contentLastModifiedAt) {
		return d(item.contentLastModifiedAt);
	}
	if (item.createdAt) {
		return d(item.createdAt);
	}
	return "";
};

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

	const finalName = fileRecordToRename.value.isFolder
		? newName
		: `${newName}.${getFileExtension(fileRecordToRename.value.name)}`;

	if (fileRecordToRename.value.name !== finalName) {
		emit("update:name", finalName, fileRecordToRename.value);
	}

	isRenameDialogOpen.value = false;
	fileRecordToRename.value = undefined;
};

const onNavigateIntoFolder = (item: FileRecord) => {
	emit("navigate-into-folder", item);
};

const onMoveButtonClick = (item: FileRecord) => {
	fileRecordToMove.value = item;
	isMoveDialogOpen.value = true;
};

const onMoveDialogConfirm = (targetFolderId: string | undefined) => {
	if (fileRecordToMove.value) {
		emit("move-record", fileRecordToMove.value, targetFolderId);
	}

	isMoveDialogOpen.value = false;
	fileRecordToMove.value = undefined;
};

const onMoveDialogCancel = () => {
	isMoveDialogOpen.value = false;
	fileRecordToMove.value = undefined;
};

const buildActionMenuAriaLabel = (item: FileRecord): string =>
	t("pages.folder.ariaLabels.actionMenu", {
		name: item.name,
	});
</script>

<style scoped>
.folder-interactive-area {
	border: none;
	width: 100%;
}

.drop-zone-empty {
	min-height: 240px;
	border: 2px dashed rgb(var(--v-theme-primary));
	transition:
		background-color 0.15s ease,
		border-color 0.15s ease;
}

.drop-zone-empty--active {
	border-color: rgb(var(--v-theme-primary));
	background-color: rgba(var(--v-theme-primary), 0.08);
}

.drop-zone-empty__title {
	font-size: 1.125rem;
}

.drop-zone-empty__browse-link {
	border: none;
	font-size: inherit;
	text-decoration: underline;
}

.drop-zone-empty__browse-link:hover {
	text-decoration: none;
}
</style>
