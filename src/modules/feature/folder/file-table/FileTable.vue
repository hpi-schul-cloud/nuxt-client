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
						isSelectable: isFileSelectable(item),
					}))
				"
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
				<template #[`item.actions`]="{ item, index }">
					<KebabMenu
						:data-testid="`kebab-menu-${index}`"
						:aria-label="buildActionMenuAriaLabel(item)"
					>
						<KebabMenuActionDownloadFiles
							:disabled="!item.isSelectable"
							:file-records="fileRecords"
							:selected-ids="[item.id]"
							:aria-label="
								t('pages.folder.ariaLabels.menu.action.file.download')
							"
						/>
						<KebabMenuActionDeleteFiles
							:file-records="fileRecords"
							:selected-ids="[item.id]"
							:aria-label="t('pages.folder.ariaLabels.menu.action.file.delete')"
							@delete-files="onDeleteFiles"
						/>
					</KebabMenu>
				</template>

				<template #left-of-search>
					<FileUploadProgress :upload-progress="uploadProgress" />
				</template>

				<template #action-menu-items="{ selectedIds }">
					<KebabMenuActionDownloadFiles
						v-if="!isMobileDevice"
						:file-records="fileRecords"
						:selected-ids="selectedIds"
						:aria-label="t('pages.folder.ariaLabels.menu.action.file.download')"
					/>
					<KebabMenuActionDeleteFiles
						:file-records="fileRecords"
						:selected-ids="selectedIds"
						:aria-label="t('pages.folder.ariaLabels.menu.action.file.delete')"
						@delete-files="onDeleteFiles"
					/>
				</template>
			</DataTable>
		</div>
	</template>
</template>

<script setup lang="ts">
import { printDateFromStringUTC } from "@/plugins/datetime";
import { FileRecord } from "@/types/file/File";
import { convertFileSize, isDownloadAllowed } from "@/utils/fileHelper";
import { DataTable } from "@ui-data-table";
import { EmptyState } from "@ui-empty-state";
import { KebabMenu } from "@ui-kebab-menu";
import { computed, defineProps, PropType } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import EmptyFolderSvg from "./EmptyFolderSvg.vue";
import FilePreview from "./FilePreview.vue";
import FileUploadProgress from "./FileUploadProgress.vue";
import KebabMenuActionDeleteFiles from "./KebabMenuActionDeleteFiles.vue";
import KebabMenuActionDownloadFiles from "./KebabMenuActionDownloadFiles.vue";

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

const emit = defineEmits(["delete-files"]);

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

const { mdAndDown: isMobileDevice } = useDisplay();

const areUploadStatsVisible = computed(() => {
	return props.uploadProgress.total > 0;
});

const formatFileSize = (size: number) => {
	const { convertedSize, unit } = convertFileSize(size);
	const localizedFileSize = n(convertedSize, "fileSize");

	return `${localizedFileSize} ${unit}`;
};

const isFileSelectable = (fileRecord: FileRecord) => {
	const result = isDownloadAllowed(fileRecord.securityCheckStatus);

	return result;
};

const onDeleteFiles = (
	selectedFileRecords: FileRecord[],
	confirmationPromise: Promise<boolean>
) => {
	emit("delete-files", selectedFileRecords, confirmationPromise);
};

const buildActionMenuAriaLabel = (item: FileRecord): string => {
	return t("pages.folder.ariaLabels.actionMenu", {
		name: item.name,
	});
};
</script>
