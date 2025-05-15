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
				:items="
					fileRecords.map((item) => ({
						...item,
					}))
				"
				:show-select="true"
			>
				<template #[`item.preview`]="{ item }">
					<FilePreview
						:file-record="item"
						:data-testid="`file-preview-${item.name}`"
					/>
				</template>
				<template #[`item.createdAt`]="{ item }">
					<span :data-testid="`created-at-${item.name}`">{{
						printDateFromStringUTC(item.createdAt)
					}}</span>
				</template>
				<template #[`item.size`]="{ item }">
					<span :data-testid="`size-${item.name}`"
						>{{ formatFileSize(item.size) }}
					</span>
				</template>
				<template #[`item.actions`]="{ item }">
					<KebabMenu
						:data-testid="`kebab-menu-${item.name}`"
						:aria-label="buildAriaLabel(item)"
					>
						<KebabMenuActionDeleteFiles
							:file-records="fileRecords"
							:selected-ids="[item.id]"
							:aria-label="t('pages.folder.ariaLabels.menu.action.file.delete')"
							@delete-files="onDeleteFiles"
						/>
						<KebabMenuActionRename
							:aria-label="t('pages.folder.ariaLabels.menu.action.file.rename')"
							@click="onRenameButtonClick(item)"
						/>
					</KebabMenu>
				</template>

				<template #action-menu-items="{ selectedIds }">
					<KebabMenuActionDeleteFiles
						:file-records="fileRecords"
						:selected-ids="selectedIds"
						:aria-label="t('pages.folder.ariaLabels.menu.action.file.delete')"
						@delete-files="onDeleteFiles"
					/>
				</template>

				<template #left-of-search>
					<FileUploadProgress :upload-progress="uploadProgress" />
				</template>
			</DataTable>
			<RenameDialog
				v-model:is-dialog-open="isDialogOpen"
				:name="fileRecordToRenameName"
				:entity-name="$t('components.cardElement.fileElement')"
				@cancel="onRenameDialogCancel"
				@confirm="onRenameDialogConfirm"
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
	removeFileExtension,
} from "@/utils/fileHelper";
import { DataTable } from "@ui-data-table";
import { RenameDialog } from "@ui-dialog";
import { EmptyState } from "@ui-empty-state";
import { KebabMenu, KebabMenuActionRename } from "@ui-kebab-menu";
import { computed, defineProps, PropType, ref } from "vue";
import { useI18n } from "vue-i18n";
import EmptyFolderSvg from "./EmptyFolderSvg.vue";
import FilePreview from "./FilePreview.vue";
import FileUploadProgress from "./FileUploadProgress.vue";
import KebabMenuActionDeleteFiles from "./KebabMenuActionDeleteFiles.vue";

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
	{ title: "", key: "actions", sortable: false },
];

const fileRecordToRename = ref<FileRecord | undefined>(undefined);
const isDialogOpen = ref(false);

const areUploadStatsVisible = computed(() => {
	return props.uploadProgress.total > 0;
});
const fileRecordToRenameName = computed(() => {
	return removeFileExtension(fileRecordToRename.value?.name || "");
});

const formatFileSize = (size: number) => {
	const { convertedSize, unit } = convertFileSize(size);
	const localizedFileSize = n(convertedSize, "fileSize");

	return `${localizedFileSize} ${unit}`;
};

const onDeleteFiles = (
	selectedFileRecords: FileRecord[],
	confirmationPromise: Promise<boolean>
) => {
	emit("delete-files", selectedFileRecords, confirmationPromise);
};

const onRenameButtonClick = (item: FileRecord) => {
	isDialogOpen.value = true;
	fileRecordToRename.value = item;
};
const onRenameDialogCancel = () => {
	isDialogOpen.value = false;
	fileRecordToRename.value = undefined;
};
const onRenameDialogConfirm = (newName: string) => {
	const fileExtension = getFileExtension(fileRecordToRename.value?.name || "");
	const nameWithExtension = `${newName}.${fileExtension}`;
	emit("update:name", nameWithExtension, fileRecordToRename.value);

	isDialogOpen.value = false;
	fileRecordToRename.value = undefined;
};

const buildAriaLabel = (item: FileRecord): string => {
	return t("pages.folder.ariaLabels.actionMenu", {
		name: item.name,
	});
};
</script>
