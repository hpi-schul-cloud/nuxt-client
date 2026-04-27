<template>
	<DefaultWireframe max-width="full" :breadcrumbs="trashBreadcrumbs">
		<template #header>
			<h1 data-testid="folder-trash-title">
				{{ t("pages.folder.trash.title", { folderName }) }}
			</h1>
		</template>
		<div aria-live="polite" aria-atomic="true" data-testid="restore-status" class="d-sr-only">
			{{ restoreStatusMessage }}
		</div>
		<template v-if="isLoading">
			<VContainer class="loader" aria-busy="true" aria-live="polite">
				<VSkeletonLoader type="table-thead, table-tbody" class="mt-6" />
			</VContainer>
		</template>
		<template v-else-if="isForbiddenError">
			<EmptyState :title="t('error.403')" data-testid="trash-forbidden-state">
				<template #media>
					<PermissionErrorSvg />
				</template>
			</EmptyState>
		</template>
		<template v-else-if="fileStorageError">
			<EmptyState :title="t('components.board.notifications.errors.fileServiceNotAvailable')">
				<template #media>
					<BrokenPencilSvg />
				</template>
			</EmptyState>
		</template>
		<template v-else>
			<p class="mb-4 py-4 px-2" role="note" data-testid="trash-info-alert">
				{{ t("pages.folder.trash.infoText") }}
			</p>
			<template v-if="deletedFileRecords.length === 0">
				<EmptyState :title="t('pages.folder.trash.emptyState')">
					<template #media>
						<EmptyFolderSvg />
					</template>
				</EmptyState>
			</template>
			<template v-else>
				<DataTable :table-headers="headers" :items="fileRecordItems" :show-select="true">
					<template #[`item.preview`]="{ item }">
						<FilePreview :file-record="item" :data-testid="`file-preview-${item.name}`" />
					</template>
					<template #[`item.name`]="{ item }">
						<span :data-testid="`name-${item.name}`">
							{{ item.name }}
							<FileStatus :file-record="item" />
						</span>
					</template>
					<template #[`item.deletedSince`]="{ item }">
						<span :data-testid="`deleted-since-${item.name}`">
							{{ item.deletedSince ? d(item.deletedSince) : "" }}
						</span>
					</template>
					<template #[`item.size`]="{ item }">
						<span :data-testid="`size-${item.name}`">{{ formatFileSize(item.size) }}</span>
					</template>
					<template #[`item.actions`]="{ item }">
						<KebabMenu
							:data-testid="`kebab-menu-${item.name}`"
							:aria-label="t('pages.folder.trash.ariaLabels.actionMenu', { name: item.name })"
						>
							<KebabMenuAction
								:icon="mdiRestore"
								data-testid="kebab-menu-action-restore"
								@click="onRestoreFiles([item])"
							>
								{{ t("common.actions.restore") }}
							</KebabMenuAction>
						</KebabMenu>
					</template>

					<template #action-menu-items="{ selectedIds }">
						<KebabMenuAction :icon="mdiRestore" data-testid="action-menu-restore" @click="onRestoreByIds(selectedIds)">
							{{ t("common.actions.restore") }}
						</KebabMenuAction>
					</template>
				</DataTable>
			</template>
		</template>
	</DefaultWireframe>
</template>

<script setup lang="ts">
import EmptyFolderSvg from "./file-table/EmptyFolderSvg.vue";
import FilePreview from "./file-table/FilePreview.vue";
import FileStatus from "./file-table/FileStatus.vue";
import BrokenPencilSvg from "@/assets/img/BrokenPencilSvg.vue";
import PermissionErrorSvg from "@/assets/img/PermissionErrorSvg.vue";
import { FileRecord, FileRecordParent } from "@/types/file/File";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { formatFileSize } from "@/utils/fileHelper";
import { useFileTrash } from "@data-file";
import { useFolderState } from "@data-folder";
import { mdiRestore } from "@icons/material";
import { DataTable } from "@ui-data-table";
import { EmptyState } from "@ui-empty-state";
import { KebabMenu, KebabMenuAction } from "@ui-kebab-menu";
import { DefaultWireframe } from "@ui-layout";
import { HttpStatusCode } from "axios";
import { computed, onMounted, ref, toRef, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t, d } = useI18n();

const props = defineProps({
	folderId: {
		type: String,
		required: true,
	},
});

const emit = defineEmits<{
	(e: "update:folder-name", value: string): void;
}>();

const folderId = toRef(props, "folderId");

const { breadcrumbs: folderBreadcrumbs, folderName, fetchFileFolderElement } = useFolderState();
const { deletedFileRecords, fetchDeletedFiles, restoreFiles } = useFileTrash();

const isLoading = ref(true);
const fileStorageError = ref(false);
const isForbiddenError = ref(false);
const restoreStatusMessage = ref("");

const announceRestore = (success: boolean): void => {
	restoreStatusMessage.value = success
		? t("pages.folder.trash.restore.success")
		: t("pages.folder.trash.restore.error");
	setTimeout(() => {
		restoreStatusMessage.value = "";
	}, 3000);
};

const trashBreadcrumbs = computed(() => {
	const items = folderBreadcrumbs.value.map((crumb, index, arr) => {
		// Make the last breadcrumb (folder) clickable linking back to folder
		if (index === arr.length - 1) {
			return { title: crumb.title, to: `/folder/${folderId.value}` };
		}

		return crumb;
	});

	items.push({ title: t("pages.folder.trash.breadcrumb"), disabled: true });

	return items;
});

const headers = [
	{ title: t("pages.folder.columns.preview"), key: "preview", sortable: false },
	{ title: t("pages.folder.columns.name"), key: "name" },
	{ title: t("pages.folder.trash.columns.deletedAt"), key: "deletedSince" },
	{ title: t("pages.folder.columns.size"), key: "size" },
	{
		title: t("ui.actionMenu.actions"),
		key: "actions",
		sortable: false,
		width: 50,
	},
];

const fileRecordItems = computed(() =>
	deletedFileRecords.value.map((item) => ({
		...item,
		isSelectable: true,
	}))
);

const handleError = (error: unknown): void => {
	const responseError = mapAxiosErrorToResponseError(error);
	if (responseError.code === HttpStatusCode.Forbidden) {
		isForbiddenError.value = true;
	} else {
		fileStorageError.value = true;
	}
};

const onRestoreFiles = async (fileRecords: FileRecord[]): Promise<void> => {
	try {
		await restoreFiles(fileRecords);
		announceRestore(true);
	} catch {
		announceRestore(false);
	}
};

const onRestoreByIds = async (selectedIds: string[]): Promise<void> => {
	const toRestore = deletedFileRecords.value.filter((r) => selectedIds.includes(r.id));

	try {
		await restoreFiles(toRestore);
		announceRestore(true);
	} catch {
		announceRestore(false);
	}
};

watch(
	folderName,
	(newName) => {
		emit("update:folder-name", newName);
	},
	{ immediate: true }
);

onMounted(async () => {
	await fetchFileFolderElement(folderId.value);

	try {
		await fetchDeletedFiles(folderId.value, FileRecordParent.BOARDNODES);
	} catch (error) {
		handleError(error);
	}

	isLoading.value = false;
});
</script>
