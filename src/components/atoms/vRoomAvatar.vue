<template>
	<div
		class="room-avatar"
		:data-testid="item.id"
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
				:aria-label="`${$t('common.labels.course')} ${item.title}`"
				:size="size"
				:tile="condenseLayout"
				:tabindex="condenseLayout ? '-1' : '0'"
				@click="onClick"
				@dragleave="dragLeave"
				@dragenter.prevent.stop="dragEnter"
				@keypress.enter="onClick"
			>
				<span
					class="white--text text-h7"
					:class="
						condenseLayout ? 'group-avatar text-h7' : 'single-avatar text-h3'
					"
					>{{ item.shortTitle }}</span
				>
			</v-avatar>
			<div v-if="!condenseLayout" class="justify-center mt-1 sub-title">
				{{ item.title }}
			</div>
			<div
				v-if="!condenseLayout && item.titleDate"
				class="justify-center sub-title date-title mt-1"
			>
				{{ item.titleDate }}
			</div>
		</v-badge>
	</div>
</template>
<script>
import EnvConfigModule from "@store/env-config";

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
		displayBadge() {
			return this.showBadge === true && this.item.notification === true;
		},
	},
	methods: {
		onClick() {
			const showRoomView = EnvConfigModule.getEnv.ROOM_VIEW_ENABLED || false;
			if (!this.condenseLayout) {
				if (this.item.to) {
					if (showRoomView) {
						this.$router.push({
							path: `/rooms/${this.item.id}`,
						});
						return;
					}
					this.$router.push({
						path: this.item.to,
					});
					return;
				}
				if (this.item.href) {
					if (showRoomView) {
						window.location = `/rooms/${this.item.id}`;
						return;
					}
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
<style lang="scss" scoped>
@import "@utils/multiline-ellipsis.scss";
@import "~vuetify/src/styles/styles.sass";
@import "@styles";
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
.single-avatar::first-letter {
	text-transform: capitalize;
}
.sub-title {
	margin-right: calc(var(--space-base-vuetify) * -5);
	margin-left: calc(var(--space-base-vuetify) * -5);
	color: var(--color-black);
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
		color: var(--color-black);
	}
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
