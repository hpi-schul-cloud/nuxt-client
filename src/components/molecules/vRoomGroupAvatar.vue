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
			color="rgba(var(--v-theme-primary)"
			:icon="mdiLock"
			:model-value="hasNotifications"
		>
			<v-card
				:height="size"
				:width="size"
				variant="outlined"
				class="ma-0 card-component"
				:aria-label="
					$t('pages.rooms.a11y.group.text', {
						title: data.title,
						itemCount: data.groupElements.length,
					})
				"
				role="button"
				tabindex="0"
				@click.prevent="$emit('clicked', data.id)"
				@dragleave="dragLeave"
				@dragenter.prevent.stop="dragEnter"
				@keypress.enter="$emit('clicked', data.id)"
			>
				<room-avatar-iterator
					ref="avatar-iterator"
					:avatars="data.groupElements"
					condense-layout
					item-size="0.8em"
					:can-draggable="draggable"
					:col-count="itemSpecs.columnCount"
					:max-items="itemSpecs.maxItem"
					tabindex="-1"
					:show-badge="false"
				/>
			</v-card>
		</v-badge>
		<div aria-hidden="true" class="mt-2 subtitle">
			{{ data.title }}
		</div>
	</div>
</template>

<script>
import RoomAvatarIterator from "@/components/organisms/RoomAvatarIterator.vue";
import { mdiLock } from "@icons/material";

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
	emits: ["clicked", "startDrag", "dropGroupAvatar", "dragendGroupAvatar"],
	data() {
		return {
			hovered: false,
			isDragging: false,
			mdiLock,
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
			this.$emit("dropGroupAvatar");
		},
		dragend() {
			this.$emit("dragendGroupAvatar");
			this.isDragging = false;
		},
	},
};
</script>

<style lang="scss" scoped>
@use "sass:map";
@use "@/styles/settings.scss" as *;
@use "@/utils/multiline-ellipsis.scss" as *;

.subtitle {
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

@media #{map.get($display-breakpoints, 'xs')} {
	.subtitle {
		/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
		margin-right: unset;
		/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
		margin-left: unset;
		/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
		font-size: 14px;
	}
}

.group-avatar .card-component {
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
