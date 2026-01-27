<template>
	<SvsDialog
		v-model="isOpen"
		no-confirm
		max-width="360"
		title="pages.room.dialog.boardLayout.title"
		data-testid="board-layout-dialog"
	>
		<template #content>
			<div class="d-flex flex-wrap justify-space-around">
				<ExtendedIconBtn
					v-for="(item, key) in boardLayouts"
					:key="key"
					:data-testid="item.dataTestId"
					:icon="item.icon"
					:label="item.label"
					:class="{ selected: currentLayout === item.type }"
					@click.stop="$emit('select', item.type)"
				/>
			</div>
		</template>
	</SvsDialog>
</template>

<script setup lang="ts">
import { PickerOption } from "./types";
import { BoardLayout } from "@/serverApi/v3";
import { mdiViewAgendaOutline, mdiViewDashboardOutline } from "@icons/material";
import { SvsDialog } from "@ui-dialog";
import { ExtendedIconBtn } from "@ui-extended-icon-btn";
import { PropType } from "vue";
import { useI18n } from "vue-i18n";

const isOpen = defineModel({
	type: Boolean,
	required: true,
});

defineProps({
	currentLayout: {
		type: String as PropType<BoardLayout>,
		default: "",
	},
});

defineEmits<{
	(e: "select", layout: BoardLayout): void;
}>();

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
.selected {
	border: 1px solid rgba(var(--v-theme-on-surface));
}
</style>
