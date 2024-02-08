<template>
	<VBtn
		variant="text"
		:ripple="false"
		:icon="collapsed ? mdiChevronUp : mdiChevronDown"
		size="small"
		style="height: 36px; width: 36px"
		@click="collapsed = !collapsed"
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
			<VListItem @click="$emit('delete:line', lineId)">
				<VListItemTitle><span>Delete</span></VListItemTitle>
			</VListItem>
			<VListItem @click="gridMode = !gridMode">
				<VListItemTitle>
					<VIcon v-if="gridMode" size="small" class="mr-1">
						{{ mdiCheck }}
					</VIcon>
					<span>Toggle Grid Mode</span>
				</VListItemTitle>
			</VListItem>
			<VListItem>
				<v-color-picker
					v-model="lineColor"
					style="background-color: #f8f8f8"
					mode="hex"
					show-swatches
					hide-inputs
					:swatches="[
						['#FFFFFF'],
						['#FFE4F1'],
						['#E2F1FF'],
						['#F3F2F1'],
						['#FFF7D1'],
						['#E4F9E0'],
						['#F2E6FF'],
					]"
					@click.stop.prevent
				/>
			</VListItem>
		</VList>
	</VMenu>
</template>

<script setup lang="ts">
import {
	mdiCheck,
	mdiChevronDown,
	mdiChevronUp,
	mdiDotsVertical,
} from "@mdi/js";
import { ModelRef } from "vue";

const lineColor: ModelRef<string> = defineModel("color", {
	type: String,
	default: "#FFFFFF",
});
const gridMode: ModelRef<boolean> = defineModel("gridMode", {
	type: Boolean,
	default: false,
});
const collapsed: ModelRef<boolean> = defineModel("collapsed", {
	type: Boolean,
	default: false,
});

defineProps({
	lineId: {
		type: String,
		required: true,
	},
});

defineEmits<{
	(e: "delete:line", lineId: string): void;
}>();
</script>

<style scoped lang="scss"></style>
