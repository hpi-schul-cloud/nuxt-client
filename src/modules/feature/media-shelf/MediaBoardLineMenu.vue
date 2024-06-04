<template>
	<VBtn
		v-show="true"
		variant="text"
		:ripple="false"
		:icon="collapsed ? mdiChevronUp : mdiChevronDown"
		size="small"
		style="height: 36px; width: 36px"
		@click="collapsed = !collapsed"
		data-testid="collapse-line-btn"
	/>
	<VMenu location="bottom end" min-width="250">
		<template v-slot:activator="{ props }">
			<VBtn
				variant="text"
				:ripple="false"
				v-bind="props"
				icon
				@click.stop.prevent="() => {}"
				@dblclick.stop.prevent="() => {}"
				@keydown.enter.stop
				@keydown.left.right.up.down.stop="() => {}"
				size="small"
				style="height: 36px; width: 36px"
			>
				<VIcon class="text-grey-darken-2">
					{{ mdiDotsVertical }}
				</VIcon>
			</VBtn>
		</template>
		<VList>
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
				<template v-slot:activator="{ props }">
					<VListItem
						v-bind="props"
						:prepend-icon="mdiPalette"
						@click.stop.prevent="() => {}"
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
				/>
			</VListGroup>
			<VListItem
				v-if="lineId"
				@click="$emit('delete:line', lineId)"
				:prepend-icon="mdiTrashCanOutline"
				data-testid="action-delete-line"
			>
				<VListItemTitle>
					<span>{{ $t("common.actions.remove") }}</span>
				</VListItemTitle>
			</VListItem>
		</VList>
	</VMenu>
</template>

<script setup lang="ts">
import { MediaBoardColors } from "@/serverApi/v3";
import {
	mdiChevronDown,
	mdiChevronUp,
	mdiDotsVertical,
	mdiPalette,
	mdiRenameOutline,
	mdiTrashCanOutline,
} from "@mdi/js";
import { computed, ComputedRef, ModelRef, PropType } from "vue";
import { ColorShade, MediaBoardColorMapper } from "./utils";

defineProps({
	lineId: {
		type: String,
		required: false,
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
