<template>
	<div
		draggable="true"
		class="group-avatar"
		@dragstart="startDragAvatar"
		@drop.prevent="dropAvatar"
		@dragover.prevent
	>
		<v-badge
			class="badge-component"
			bordered
			color="var(--color-primary)"
			icon="mdi-lock"
			overlap
			:value="hasNotifications"
		>
			<v-card
				:height="size"
				:width="size"
				class="rounded-xl ma-0 card-component"
				outlined
				@click.prevent="$emit('clicked', data.id)"
				@dragleave="dragLeave"
				@dragenter.prevent.stop="dragEnter"
			>
				<v-row class="ma-1 pa-1">
					<v-col
						v-for="item in itemsLimited"
						:key="item.id"
						cols="6"
						class="ma-0 pa-1"
					>
						<vRoomAvatar
							class="ma-0 pa-1 group-avatar-component"
							:item="item"
							:size="size / 3"
							:draggable="false"
							condense-layout
						></vRoomAvatar>
					</v-col>
				</v-row>
			</v-card>
			<span class="d-flex justify-center mt-1 sub-title">{{ data.title }}</span>
		</v-badge>
	</div>
</template>
<script>
import vRoomAvatar from "@components/atoms/vRoomAvatar";
export default {
	components: {
		vRoomAvatar,
	},
	props: {
		data: {
			type: Object,
			required: true,
		},
		size: {
			type: Number || String,
			required: true,
		},
		maxItems: {
			type: Number || String,
			default: 4,
		},
	},
	data() {
		return {
			hovered: false,
		};
	},
	computed: {
		hasNotifications() {
			return this.data.groupElements.some((item) => item.notification == true);
		},
		itemsLimited() {
			return this.data.groupElements.slice(0, this.maxItems);
		},
	},
	methods: {
		startDragAvatar() {
			this.$emit("startDrag", this.data);
		},
		dragLeave() {
			this.hovered = false;
		},
		dragEnter() {
			this.hovered = true;
		},
		dropAvatar() {
			this.$emit("drop");
		},
	},
};
</script>
<style scoped>
.sub-title {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
