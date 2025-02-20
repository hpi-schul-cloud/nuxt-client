<template>
	<VDialog v-model="isOpen" width="360">
		<VCard data-testid="board-layout-dialog">
			<VCardTitle
				class="text-h4 text-break px-6 pt-4"
				data-testid="board-layout-dialog-title"
			>
				{{ $t("pages.room.dialog.boardLayout.title") }}
			</VCardTitle>
			<VCardText
				class="d-flex flex-row flex-wrap align-items-center justify-space-around"
			>
				<ExtendedIconBtn
					v-for="(item, key) in boardLayouts"
					:key="key"
					:data-testid="item.dataTestId"
					:icon="item.icon"
					:label="item.label"
					:class="{ selected: currentLayout === item.type }"
					@click.stop="$emit('select', item.type)"
				/>
			</VCardText>
			<VCardActions class="mb-2 px-6">
				<VBtn
					data-testid="dialog-close"
					variant="outlined"
					@click="$emit('update:modelValue', false)"
				>
					{{ $t("common.labels.close") }}
				</VBtn>
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script setup lang="ts">
import { BoardLayout } from "@/serverApi/v3";
import { mdiViewAgendaOutline, mdiViewDashboardOutline } from "@icons/material";
import { ExtendedIconBtn } from "@ui-extended-icon-btn";
import { PropType } from "vue";
import { useI18n } from "vue-i18n";
import { PickerOption } from "./types";

const isOpen = defineModel({
	type: Boolean,
	required: true,
});

defineProps({
	currentLayout: {
		type: String as PropType<BoardLayout>,
	},
});

defineEmits<{ (e: "select", layout: BoardLayout): void }>();

const { t } = useI18n();

const boardLayouts: PickerOption[] = [
	{
		label: t("pages.room.dialog.boardLayout.multiColumn"),
		icon: mdiViewDashboardOutline,
		type: BoardLayout.Columns,
		dataTestId: "dialog-add-multi-column-board",
		ariaLabel: t("pages.room.dialog.boardLayout.multiColumn"),
	},
	{
		label: t("pages.room.dialog.boardLayout.singleColumn"),
		icon: mdiViewAgendaOutline,
		type: BoardLayout.List,
		dataTestId: "dialog-add-single-column-board",
		ariaLabel: t("pages.room.dialog.boardLayout.singleColumn"),
	},
];
</script>

<style scoped>
.subtitle {
	overflow-wrap: break-word;
	white-space: normal;
}

.button-max-width {
	max-width: 100px;
}

.selected {
	border: 1px solid rgba(var(--v-theme-on-surface));
}
</style>
