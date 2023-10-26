<template>
	<v-data-iterator
		:items="items"
		:items-per-page="maxItems"
		hide-default-footer
		no-data-text=""
	>
		<template #default>
			<v-container>
				<v-row align="center">
					<v-col
						v-for="(item, key) in items"
						:key="key"
						class="d-flex justify-center ma-0 mt-1 mb-0.5 pa-0"
						:cols="colCount"
					>
						<vRoomAvatar
							:draggable="canDraggable"
							class="room-avatar"
							:item="item"
							:size="itemSize"
							:show-badge="true"
							:condense-layout="condenseLayout"
							@startDrag="$emit('startDrag', $event)"
						/>
					</v-col>
				</v-row>
			</v-container>
		</template>
	</v-data-iterator>
</template>

<script setup lang="ts">
import vRoomAvatar from "@/components/atoms/vRoomAvatar.vue";

type ItemType = {
	id: string;
	title: string;
	shortTitle: string;
	displayColor: string;
	xPosition: number;
	yPosition: number;
	to: string;
};

defineProps({
	items: {
		type: Array<ItemType>,
		default: () => [{}],
	},
	colCount: {
		type: Number,
		default: 4,
	},
	condenseLayout: {
		type: Boolean,
	},
	itemSize: {
		type: String,
		default: "3em",
	},
	maxItems: {
		type: Number,
		default: 9,
	},
	canDraggable: {
		type: Boolean,
	},
});
defineEmits(["startDrag"]);
</script>
