<template>
	<div
		class="d-flex justify-space-between align-center ga-2 mb-2 table-title-header"
		:class="{ sticky: isMobileDevice, 'flex-column': isExtraSmallDisplay }"
		:style="stickyStyle"
	>
		<ActionMenu
			v-if="selectedIds.length"
			class="multi-action-menu"
			:class="{ 'order-2': isExtraSmallDisplay }"
			:selected-ids="selectedIds"
			@reset:selected="onResetSelectedMembers"
		>
			<slot name="action-menu-items" />
		</ActionMenu>

		<v-spacer v-else />

		<slot name="left-of-search" />
		<v-text-field
			v-model="search"
			density="compact"
			flat
			hide-details
			max-width="400px"
			mobile-breakpoint="sm"
			single-line
			variant="solo-filled"
			:class="{ 'order-1 w-100 mt-2': isExtraSmallDisplay }"
			:label="t('common.labels.search')"
			:prepend-inner-icon="mdiMagnify"
			:aria-label="t('pages.rooms.members.filter')"
		/>
	</div>

	<v-divider role="presentation" />

	<v-data-table
		v-model:search="search"
		v-model="selectedIds"
		data-testid="participants-table"
		hover
		:item-value="selectItemKey"
		mobile-breakpoint="sm"
		:items="items"
		item-selectable="isSelectable"
		:headers="tableHeaders"
		:items-per-page-options="[5, 10, 25, 50, 100]"
		:items-per-page="50"
		:mobile="null"
		:show-select="showSelect"
		:sort-asc-icon="mdiMenuDown"
		:sort-desc-icon="mdiMenuUp"
	>
		<template v-for="slot in Object.keys($slots)" #[slot]="scope">
			<slot :name="slot" v-bind="scope" />
		</template>
	</v-data-table>
</template>

<script setup lang="ts">
import { mdiMagnify, mdiMenuDown, mdiMenuUp } from "@icons/material";
import { computed, PropType, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify/lib/framework.mjs";
import ActionMenu from "./ActionMenu.vue";

const props = defineProps({
	headerBottom: {
		type: Number,
		default: 0,
	},
	tableHeaders: {
		type: Array as PropType<
			{
				title: string;
				key: string;
			}[]
		>,
		isRequired: true,
		default: () => [],
	},
	items: {
		type: Array as PropType<unknown[]>,
		isRequired: true,
		default: () => [],
	},
	showSelect: {
		type: Boolean,
		default: false,
	},
	selectItemKey: {
		type: String,
		default: "id",
	},
});

const { t } = useI18n();
const { xs: isExtraSmallDisplay, mdAndDown: isMobileDevice } = useDisplay();

const selectedIds = ref<string[]>([]);

const search = ref("");
const stickyStyle = computed(() => ({
	top: `${props.headerBottom}px`,
}));

const onResetSelectedMembers = () => {
	selectedIds.value = [];
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
</style>
