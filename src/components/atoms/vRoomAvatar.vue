<template>
	<div
		class="rounded-xl"
		:draggable="!groupAvatar"
		@dragstart="startDragAvatar"
		@drop.prevent="dropAvatar"
		@dragover.prevent
		@dragend="dragEnd"
	>
		<v-badge
			class="ma-0 badge-component rounded-xl"
			bordered
			color="var(--color-primary)"
			icon="mdi-lock"
			overlap
			:value="displayBadge"
		>
			<v-avatar
				class="ma-0 pa-1 avatar-component"
				:color="item.displayColor"
				:size="calculatedSize"
				:class="groupAvatar ? 'rounded' : 'rounded-xl'"
				@click="$emit('click', item)"
				@dragleave="dragLeave"
				@dragenter.prevent.stop="dragEnter"
			>
				<span :class="groupAvatar ? 'group-avatar' : 'single-avatar'">{{
					avatarTitle
				}}</span>
			</v-avatar>
			<span v-if="!groupAvatar" class="d-flex justify-center mt-1 sub-title">{{
				item.title
			}}</span>
		</v-badge>
	</div>
</template>
<script>
export default {
	props: {
		item: {
			type: Object,
			required: true,
		},
		size: {
			type: Number || String,
			required: true,
		},
		groupAvatar: {
			type: Boolean,
		},
		isGroupAvatarList: {
			type: Boolean,
		},
		showBadge: {
			type: Boolean,
		},
		// eslint-disable-next-line vue/require-default-prop
		location: {
			type: Object,
		},
	},
	data() {
		return {
			hovered: false,
			isDragging: false,
		};
	},
	computed: {
		avatarTitle() {
			const title = this.item.title || "";
			return (
				title.charAt(0).toUpperCase() +
				title.slice(1).toLowerCase().substring(0, 1)
			);
		},
		displayBadge() {
			return this.showBadge === true && this.item.notification === true;
		},
		calculatedSize() {
			return this.isGroupAvatarList && !this.isDragging
				? this.size * 0.75
				: this.size;
		},
	},
	methods: {
		startDragAvatar() {
			this.isDragging = true;
			this.$emit(
				"startDrag",
				this.item,
				this.isGroupAvatarList ? { x: -1, y: -1 } : this.location
			);
		},
		dragLeave() {
			this.hovered = false;
		},
		dragEnter() {
			this.hovered = true;
			this.isDragging = false;
		},
		dragEnd() {
			this.isDragging = false;
		},
		dropAvatar() {
			this.$emit("drop", this.location);
		},
	},
};
</script>
<style scoped>
.v-avatar {
	cursor: pointer;
}
.single-avatar {
	/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
	font-size: 3em;
	user-select: none;
}
.sub-title {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.group-avatar {
	/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
	font-size: 0.5em;
	user-select: none;
}
</style>
