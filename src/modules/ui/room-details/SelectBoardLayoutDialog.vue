<template>
	<VDialog data-testid="board-layout-dialog" width="360">
		<VCard>
			<VCardTitle class="text-h4 text-break px-6 pt-4">
				{{ $t("pages.room.dialog.boardType.title") }}
			</VCardTitle>
			<VCardText class="d-flex justify-center">
				<v-btn
					v-for="(item, key) in boardLayouts"
					:key="key"
					variant="text"
					size="large"
					:height="85"
					:width="125"
					:data-testid="item.dataTestId"
					@click.stop="$emit(item.eventName)"
				>
					<span class="d-flex flex-column justify-center button-max-width">
						<span>
							<v-icon size="x-large">{{ item.icon }}</v-icon>
						</span>
						<span class="subtitle mt-1">{{ $t(item.label) }}</span>
					</span>
				</v-btn>
			</VCardText>
			<VCardActions class="mb-2 px-6">
				<VBtn
					data-testid="dialog-close"
					variant="outlined"
					@click="$emit('dialog-closed')"
				>
					{{ $t("common.labels.close") }}
				</VBtn>
			</VCardActions>
		</VCard>
	</VDialog>
</template>

<script setup lang="ts">
import { PickerOption } from "./types";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const boardLayouts: PickerOption[] = [
	{
		label: t("pages.room.dialog.boardType.multiColumn"),
		icon: "$mdiViewDashboardOutline",
		eventName: "select:multi-column",
		dataTestId: "dialog-add-multi-column-board",
		ariaLabel: t("pages.room.dialog.boardType.multiColumn"),
	},
	{
		label: t("pages.room.dialog.boardType.singleColumn"),
		icon: "$mdiCustomGridOutline",
		eventName: "select:single-column",
		dataTestId: "dialog-add-single-column-board",
		ariaLabel: t("pages.room.dialog.boardType.singleColumn"),
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
