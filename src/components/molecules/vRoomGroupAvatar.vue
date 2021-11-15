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
				outlined
				class="ma-0 card-component"
				@click.prevent="$emit('clicked', data.id)"
				@dragleave="dragLeave"
				@dragenter.prevent.stop="dragEnter"
			>
				<room-avatar-iterator
					:items="data.groupElements"
					condense-layout
					item-size="1em"
					:col-count="4"
					:max-items="9"
					modal-view
				/>
			</v-card>
			<span class="d-flex justify-center mt-1 sub-title">{{ data.title }}</span>
		</v-badge>
	</div>
</template>
<script>
import RoomAvatarIterator from "@components/organisms/RoomAvatarIterator.vue";
export default {
	components: {
		RoomAvatarIterator,
	},
	props: {
		data: {
			type: Object,
			required: true,
		},
		size: {
			type: String,
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

.card-component {
	/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
	border-radius: 0.5em;
}
</style>
