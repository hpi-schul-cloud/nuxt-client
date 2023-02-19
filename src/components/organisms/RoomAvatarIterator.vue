<template>
	<v-data-iterator
		:items="items"
		:items-per-page.sync="maxItems"
		hide-default-footer
		no-data-text=""
	>
		<template #default="props">
			<v-container>
				<v-row align="center">
					<v-col
						v-for="item in props.items"
						:key="item.id"
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
						></vRoomAvatar>
					</v-col>
				</v-row>
			</v-container>
		</template>
	</v-data-iterator>
</template>

<script lang="ts">
import Vue from "vue";
import vRoomAvatar from "@/components/atoms/vRoomAvatar.vue";

// eslint-disable-next-line vue/require-direct-export
export default Vue.extend({
	components: {
		vRoomAvatar,
	},
	props: {
		items: {
			type: Array,
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
	},
});
</script>
