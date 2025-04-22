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
	<template v-else-if="isEmpty">
		<EmptyState :title="t('pages.folder.emptyState')">
			<template v-slot:media>
				<EmptyFolderSvg />
			</template>
		</EmptyState>
	</template>
	<template v-else>
		<div
			class="d-flex justify-space-between align-center ga-2 mb-2 table-title-header"
			:class="{ sticky: isMobileDevice, 'flex-column': isExtraSmallDisplay }"
		>
			<ActionMenu
				v-if="selectedIds.length"
				class="multi-action-menu"
				:class="{ 'order-2': isExtraSmallDisplay }"
				:selected-ids="selectedIds"
				@reset:selected="onResetSelectedMembers"
			/>
			<v-spacer />
			<v-text-field
				v-model="search"
				density="compact"
				flat
				hide-details
				max-width="400px"
				mobile-breakpoint="sm"
				single-line
				variant="solo-filled"
				:class="{ 'order-1 w-100 mt-1': isExtraSmallDisplay }"
				:label="t('common.labels.search')"
				:prepend-inner-icon="mdiMagnify"
				:aria-label="t('pages.folder.ariaLabels.filter')"
			/>
		</div>
		<v-data-table
			v-model:search="search"
			v-model="selectedIds"
			data-testid="file-records-table"
			hover
			item-value="id"
			mobile-breakpoint="sm"
			:items="fileRecords"
			item-selectable="isSelectable"
			:headers="headers"
			:items-per-page-options="[5, 10, 25, 50, 100]"
			:items-per-page="50"
			:mobile="null"
			:show-select="true"
			:sort-asc-icon="mdiMenuDown"
			:sort-desc-icon="mdiMenuUp"
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
			<template #[`item.preview`]>
				<v-icon>{{ mdiFileOutline }}</v-icon>
			</template>
			<template #[`item.createdAt`]="{ item }">
				{{ new Date(item.createdAt ?? "").toLocaleDateString() }}
			</template>
			<template #[`item.size`]="{ item }">
				{{ formatFileSize(item.size) }}
			</template>
			<template #[`item.actions`]="{ item, index }">
				<KebabMenu
					:data-testid="`kebab-menu-${index}`"
					:aria-label="getKebabMenuAriaLabel(item.name)"
				>
					<KebabMenuAction />
				</KebabMenu>
			</template>
		</v-data-table>
	</template>
</template>

<script setup lang="ts">
import { FileRecordResponse } from "@/fileStorageApi/v3";
import { convertFileSize } from "@/utils/fileHelper";
import {
	mdiFileOutline,
	mdiMagnify,
	mdiMenuDown,
	mdiMenuUp,
} from "@icons/material";
import { EmptyState } from "@ui-empty-state";
import { KebabMenu } from "@ui-kebab-menu";
import { defineProps, PropType, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify/lib/framework.mjs";
import ActionMenu from "../room/RoomMembers/ActionMenu.vue";
import EmptyFolderSvg from "./EmptyFolderSvg.vue";

const { t, n } = useI18n();

// Define props for the component
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
});

const selectedIds = ref<string[]>([]);

const { xs: isExtraSmallDisplay, mdAndDown: isMobileDevice } = useDisplay();

const headers = [
	{ title: "", key: "preview" },
	{ title: t("pages.folder.columns.name"), key: "name" },
	{ title: t("pages.folder.columns.createdat"), key: "createdAt" },
	{ title: t("pages.folder.columns.size"), key: "size" },
	{ title: "", key: "actions" },
];

const search = ref("");

const onResetSelectedMembers = () => {
	selectedIds.value = [];
};

const formatFileSize = (size: number) => {
	const { convertedSize, unit } = convertFileSize(size);
	const localizedFileSize = n(convertedSize, "fileSize");

	return `${localizedFileSize} ${unit}`;
};

const getKebabMenuAriaLabel = (name: string) => {
	return t("pages.folder.ariaLabels.actionMenu", {
		name,
	});
};

/* const onUpdateFilter = (filteredMembers: RoomMember[]) => {
	membersFilterCount.value =
		search.value === "" ? memberList.value.length : filteredMembers.length;
};  */
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
</style>
