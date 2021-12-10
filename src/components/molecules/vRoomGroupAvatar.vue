<template>
	<div
		draggable="true"
		class="group-avatar"
		:class="isDragging ? 'dragging' : 'group-avatar'"
		:style="{ width: size }"
		@dragstart="startDragAvatar"
		@dragend="dragend"
		@drop.prevent="dropAvatar"
		@dragover.prevent
	>
		<v-badge
			class="badge-component avatar-badge"
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
					ref="avatar-iterator"
					:items="data.groupElements"
					condense-layout
					item-size="0.8em"
					:col-count="itemSpecs.columnCount"
					:max-items="itemSpecs.maxItem"
				/>
			</v-card>
			<div class="justify-left mt-1 sub-title">
				{{ data.title }}
			</div>
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
		device: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			hovered: false,
			isDragging: false,
		};
	},
	computed: {
		hasNotifications() {
			return this.data.groupElements.some((item) => item.notification == true);
		},
		itemSpecs() {
			return {
				columnCount: this.device == "large" || this.device == "desktop" ? 3 : 4,
				maxItem: this.device == "large" || this.device == "desktop" ? 16 : 9,
			};
		},
	},

	methods: {
		startDragAvatar() {
			this.isDragging = true;
			this.$emit("startDrag", this.data);
		},
		dragLeave() {
			this.hovered = false;
		},
		dragEnter() {
			this.hovered = true;
			this.isDragging = false;
		},
		dropAvatar() {
			this.$emit("drop");
		},
		dragend() {
			this.$emit("dragend");
			this.isDragging = false;
		},
	},
};
</script>
<style scoped>
.sub-title {
	height: var(--space-lg);
	overflow: hidden;
	text-align: center;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.card-component {
	/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
	border-radius: 0.5em;
}
.avatar-badge {
	max-width: 100%;
}
.dragging {
	opacity: 0.5;
}
</style>
