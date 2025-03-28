<template>
	<VBtn
		v-show="true"
		variant="text"
		:ripple="false"
		:icon="collapsed ? mdiChevronDown : mdiChevronUp"
		size="small"
		style="height: 36px; width: 36px"
		@click="collapsed = !collapsed"
		data-testid="collapse-line-btn"
	/>
	<KebabMenu data-testid="line-menu-btn">
		<VListItem
			v-if="lineId"
			@click="$emit('rename-title', lineId)"
			:prepend-icon="mdiRenameOutline"
			data-testid="action-update-line-title"
		>
			<VListItemTitle>
				<span>{{ $t("common.actions.rename") }}</span>
			</VListItemTitle>
		</VListItem>
		<VListGroup>
			<template #activator="{ props }">
				<VListItem
					v-bind="props"
					:prepend-icon="mdiPalette"
					@click.stop.prevent="() => {}"
					data-testid="color-picker-btn"
				>
					<VListItemTitle>
						<span>{{ $t("common.actions.pickColor") }}</span>
					</VListItemTitle>
				</VListItem>
			</template>
			<VColorPicker
				hide-sliders
				hide-inputs
				hide-canvas
				elevation="0"
				:model-value="colorValue"
				:swatches="swatches"
				class="ma-2"
				@update:model-value="onUpdateColor"
				show-swatches
				data-testid="line-color-picker"
			/>
		</VListGroup>
		<VListItem
			v-if="lineId"
			@click="$emit('delete:line', lineId)"
			:prepend-icon="mdiTrashCanOutline"
			data-testid="action-delete-line"
		>
			<VListItemTitle>
				<span>{{ $t("common.actions.delete") }}</span>
			</VListItemTitle>
		</VListItem>
	</KebabMenu>
</template>

<script setup lang="ts">
import { MediaBoardColors } from "@/serverApi/v3";
import {
	mdiChevronDown,
	mdiChevronUp,
	mdiPalette,
	mdiRenameOutline,
	mdiTrashCanOutline,
} from "@icons/material";
import { computed, ComputedRef, ModelRef, PropType } from "vue";
import { ColorShade, MediaBoardColorMapper } from "./utils";
import { KebabMenu } from "@ui-kebab-menu";

defineProps({
	lineId: {
		type: String,
		required: false,
		default: undefined,
	},
});

const collapsed: ModelRef<boolean> = defineModel("collapsed", {
	type: Boolean,
	default: false,
});

const color: ModelRef<MediaBoardColors> = defineModel("color", {
	type: String as PropType<MediaBoardColors>,
	default: MediaBoardColors.Transparent,
});

const swatchShade: ColorShade = "lighten4";

const colorValue: ComputedRef<string> = computed(() =>
	MediaBoardColorMapper.mapColorToHex(color.value, swatchShade)
);

const onUpdateColor = (value: string) => {
	color.value =
		MediaBoardColorMapper.mapHexToColor(value) ?? MediaBoardColors.Transparent;
};

const swatchColors = Object.values(MediaBoardColors).map(
	(colorName: MediaBoardColors) =>
		MediaBoardColorMapper.mapColorToHex(colorName, swatchShade)
);

const swatches: ComputedRef<string[][]> = computed(() => {
	const swatchesPerLine = 4;
	const swatchRows = [];

	for (let i = 0; i < swatchColors.length; i += swatchesPerLine) {
		swatchRows.push(swatchColors.slice(i, i + swatchesPerLine));
	}

	return swatchRows;
});

defineEmits<{
	(e: "delete:line", lineId: string): void;
	(e: "rename-title", lineId: string): void;
}>();
</script>

<style scoped>
:deep(.v-color-picker-swatches__color) {
	border: 1px solid lightgray;
}
</style>
