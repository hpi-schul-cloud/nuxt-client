<template>
	<VDialog data-testid="board-layout-dialog" width="360">
		<VCard>
			<VCardTitle class="text-h4 text-break px-6 pt-4">
				{{ $t("pages.room.dialog.boardLayout.title") }}
			</VCardTitle>
			<VCardText
				class="d-flex flex-column flex-sm-row align-items-center justify-sm-space-around"
			>
				<ExtendedIconBtn
					v-for="(item, key) in boardLayouts"
					:key="key"
					:data-testid="item.dataTestId"
					:icon="item.icon"
					:label="item.label"
					@click.stop="$emit(item.eventName)"
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
import { useI18n } from "vue-i18n";
import { PickerOption } from "./types";
import { ExtendedIconBtn } from "@ui-extended-icon-btn";

const { t } = useI18n();

const boardLayouts: PickerOption[] = [
	{
		label: t("pages.room.dialog.boardLayout.multiColumn"),
		icon: "$mdiViewDashboardOutline",
		eventName: "select:multi-column",
		dataTestId: "dialog-add-multi-column-board",
		ariaLabel: t("pages.room.dialog.boardLayout.multiColumn"),
	},
	{
		label: t("pages.room.dialog.boardLayout.singleColumn"),
		icon: "$mdiCustomGridOutline",
		eventName: "select:single-column",
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
</style>
