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
				@click="$emit('update:line-title', lineId)"
				:prepend-icon="mdiRenameOutline"
				data-testid="action-update-line-title"
				><VListItemTitle>
					<span>{{ $t("common.actions.rename") }}</span>
				</VListItemTitle></VListItem
			>
			<VListItem :prepend-icon="mdiPalette">
				<VListItemTitle>
					<span>{{ $t("common.actions.pickColor") }}</span>
				</VListItemTitle></VListItem
			>
			<div>
				<v-color-picker
					hide-sliders
					hide-inputs
					hide-canvas
					v-model="color"
					:swatches="swatches"
					class="ma-2"
					show-swatches
					@update:modelValue="color = $event"
					@click="onUpdateColor(color)"
				/>
			</div>
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
import {
	mdiChevronDown,
	mdiChevronUp,
	mdiDotsVertical,
	mdiPalette,
	mdiRenameOutline,
	mdiTrashCanOutline,
} from "@mdi/js";
import { ModelRef } from "vue";

const collapsed: ModelRef<boolean> = defineModel("collapsed", {
	type: Boolean,
	default: false,
});

defineProps({
	lineId: {
		type: String,
		required: false,
	},
});

const swatches = [
	["#FBE9E7", "#FFEBEE", "#FCE4EC", "#F3E5F5"],
	["#EDE7F6", "#E8EAF6", "#E3F2FD", "#E1F5FE"],
	["#E0F7FA", "#E0F2F1", "#E8F5E9", "#F1F8E9"],
	["#F9FBE7", "#FFFDE7", "#FFF8E1", "#FFF3E0"],
	["#FAFAFA", "#EFEBE9", "#ECEFF1", "#000000"],
];

const color: ModelRef<string> = defineModel("color", {
	type: String,
	default: "0000AA",
});

// const state: Ref<boolean> = ref(false);

//const showColorPicker = () => {
//	state.value = !state.value;
// };

const emit = defineEmits<{
	(e: "delete:line", lineId: string): void;
	(e: "update:line-title", lineId: string): void;
	(e: "update:line-background-color", color: string): void;
}>();

const onUpdateColor = (color: string) => {
	emit("update:line-background-color", color);
};
</script>
