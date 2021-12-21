<template>
	<div
		class="room-avatar"
		:class="isDragging ? 'dragging' : 'room-avatar'"
		:draggable="draggable"
		:style="{ width: size }"
		@dragstart="startDragAvatar"
		@drop.prevent="dropAvatar"
		@dragover.prevent
		@dragend="dragend"
	>
		<v-badge
			class="ma-0 badge-component rounded avatar-badge"
			bordered
			color="var(--color-primary)"
			icon="mdi-lock"
			overlap
			:value="displayBadge"
		>
			<v-avatar
				:color="item.displayColor"
				:size="size"
				:tile="condenseLayout"
				@click="onClick"
				@dragleave="dragLeave"
				@dragenter.prevent.stop="dragEnter"
			>
				<span
					class="white--text text-h7"
					:class="
						condenseLayout ? 'group-avatar text-h7' : 'single-avatar text-h4'
					"
					>{{ avatarTitle }}</span
				>
			</v-avatar>
			<div v-if="!condenseLayout" class="justify-center mt-1 sub-title">
				{{ item.title }}
			</div>
			<div
				v-if="!condenseLayout && item.titleDate"
				class="justify-center sub-title date-title"
				:class="{ 'ma-n1': $vuetify.breakpoint.xs }"
			>
				{{ item.titleDate }}
			</div>
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
			type: String,
			default: "3em",
		},
		draggable: {
			type: Boolean,
		},
		showBadge: {
			type: Boolean,
		},
		condenseLayout: {
			type: Boolean,
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
	},
	methods: {
		onClick() {
			if (!this.condenseLayout) {
				if (this.item.to) {
					this.$router.push({
						path: this.item.to,
					});
					return;
				}
				if (this.item.href) {
					window.location = this.item.href;
				}
			}
		},
		startDragAvatar() {
			this.isDragging = true;
			if (this.draggable) {
				this.$emit("startDrag", this.item);
			}
		},
		dragLeave() {
			this.hovered = false;
		},
		dragEnter() {
			this.hovered = true;
			this.isDragging = false;
		},
		dragend() {
			this.isDragging = false;
			this.$emit("dragend");
		},
		dropAvatar() {
			this.$emit("drop");
		},
	},
};
</script>
<style scoped>
.v-avatar {
	/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
	width: 500px;
	cursor: pointer;
	/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
	border-radius: 0.5em;
}
.single-avatar {
	/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
	font-size: 3em;
	user-select: none;
}
.sub-title {
	height: var(--space-lg);
	overflow: hidden;
	text-align: center;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.group-avatar {
	/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
	font-size: 0.5em;
	user-select: none;
}
.rounded-xl {
	background-color: transparent;
}
.avatar-badge {
	max-width: 100%;
}
.dragging {
	opacity: 0.5;
}
</style>
