<template>
	<div
		:draggable="draggable"
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
			color="var(--v-primary-base)"
			icon="mdi-lock"
			overlap
			:value="hasNotifications"
		>
			<v-card
				:height="size"
				:width="size"
				outlined
				class="ma-0 card-component"
				:aria-label="
					$t('pages.rooms.a11y.group.text', {
						title: data.title,
						itemCount: data.groupElements.length,
					})
				"
				@click.prevent="$emit('clicked', data.id)"
				@dragleave="dragLeave"
				@dragenter.prevent.stop="dragEnter"
				@keypress.enter="$emit('clicked', data.id)"
			>
				<room-avatar-iterator
					ref="avatar-iterator"
					:items="data.groupElements"
					condense-layout
					item-size="0.8em"
					:can-draggable="draggable"
					:col-count="itemSpecs.columnCount"
					:max-items="itemSpecs.maxItem"
					tabindex="-1"
				/>
			</v-card>
			<div class="justify-left mt-1 sub-title">
				{{ data.title }}
			</div>
		</v-badge>
	</div>
</template>
<script>
import RoomAvatarIterator from "@/components/organisms/RoomAvatarIterator.vue";
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
		draggable: {
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
			if (this.draggable) {
				this.$emit("startDrag", this.data);
			}
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
<style lang="scss" scoped>
@import "@/utils/multiline-ellipsis.scss";
@import "~vuetify/src/styles/styles.sass";
@import "@styles";

.sub-title {
	margin-right: calc(var(--space-base-vuetify) * -5);
	margin-left: calc(var(--space-base-vuetify) * -5);
	text-align: center;
	overflow-wrap: break-word;

	@include excerpt(
		$font-size: calc(var(--space-base-vuetify) * 4),
		$line-height: var(--line-height-md),
		$lines-to-show: 2
	);
}

@media #{map-get($display-breakpoints, 'xs-only')} {
	.sub-title {
		margin-right: calc(var(--space-base-vuetify) * -3);
		margin-left: calc(var(--space-base-vuetify) * -3);
		/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
		font-size: 14px;
	}
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
