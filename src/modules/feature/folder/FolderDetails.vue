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
		<DataTable
			:table-headers="headers"
			:items="fileRecords"
			:show-select="true"
		>
			<template
				#[`header.data-table-select`]="{ someSelected, allSelected, selectAll }"
			>
				<VCheckboxBtn
					:model-value="allSelected"
					:indeterminate="someSelected && !allSelected"
					:aria-label="t('pages.folder.ariaLabels.select.all')"
					@click="selectAll(!allSelected)"
				/>
			</template>
			<template #[`item.preview`]="{ item }">
				<FilePreview :filerecord="item" />
			</template>
			<template #[`item.createdAt`]="{ item }">
				{{ new Date(item.createdAt ?? "").toLocaleDateString() }}
			</template>
			<template #[`item.size`]="{ item }">
				{{ formatFileSize(item.size) }}
			</template>

			<template #left-of-search>
				<FileUploadProgress :upload-progress="uploadProgress" />
			</template>
		</DataTable>
	</template>
</template>

<script setup lang="ts">
import { FileRecordResponse } from "@/fileStorageApi/v3";
import { convertFileSize } from "@/utils/fileHelper";
import { DataTable } from "@ui-data-table";
import { EmptyState } from "@ui-empty-state";
import { defineProps, PropType, ref } from "vue";
import { useI18n } from "vue-i18n";
import EmptyFolderSvg from "./EmptyFolderSvg.vue";
import FilePreview from "./FilePreview.vue";
import FileUploadProgress from "./FileUploadProgress.vue";

const { t, n } = useI18n();

defineProps({
	isLoading: {
		type: Boolean,
		required: true,
	},
	isEmpty: {
		type: Boolean,
		required: true,
	},
	fileRecords: {
		type: Array as PropType<FileRecordResponse[]>,
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

const headers = [
	{ title: "", key: "preview" },
	{ title: t("pages.folder.columns.name"), key: "name" },
	{ title: t("pages.folder.columns.createdat"), key: "createdAt" },
	{ title: t("pages.folder.columns.size"), key: "size" },
	{ title: "", key: "actions" },
];

const areUploadStatsVisible = ref(false);

const formatFileSize = (size: number) => {
	const { convertedSize, unit } = convertFileSize(size);
	const localizedFileSize = n(convertedSize, "fileSize");

	return `${localizedFileSize} ${unit}`;
};
</script>

<style lang="scss" scoped>
:deep(.v-data-table-header__content) {
	color: rgba(var(--v-theme-primary-darken-1));
	font-weight: bold;
}

/* table header for mobile view */
:deep(.v-data-table__td-title) {
	font-weight: bold;
}

:deep(.v-data-table__td .v-selection-control--disabled) {
	color: rgba(var(--v-theme-on-surface), var(--v-disabled-opacity));
}

.table-title-header {
	min-height: 50px;
}

.multi-action-menu {
	display: flex;
	align-items: center;
	background-color: rgba(var(--v-theme-primary), 0.12);
	border-radius: 0.25rem;
	min-height: 40px;
}

.sticky {
	position: sticky;
	z-index: 1;
	background: rgb(var(--v-theme-white));
	$space-left-right: calc(var(--space-base-vuetify) * 6);
	right: $space-left-right;
	left: $space-left-right;
	width: 100%;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s ease-out;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
