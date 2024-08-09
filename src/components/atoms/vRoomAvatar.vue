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
			color="rgba(var(--v-theme-primary))"
			:model-value="!!badgeIcon"
			:icon="badgeIcon"
		>
			<v-avatar
				:color="avatarColor"
				:class="avatarClass"
				:aria-label="avatarAriaLabel"
				:rounded="condenseLayout ? 0 : 'lg'"
				:size="size"
				:tabindex="condenseLayout ? '-1' : '0'"
				@click="onClick"
				@dragenter.prevent.stop="dragEnter"
				@keypress.enter="onClick"
				role="button"
				data-testid="course-icon"
			>
				<span :class="avatarTextClass" data-testid="course-short-title">
					{{ item.shortTitle }}
				</span>
			</v-avatar>
		</v-badge>
		<div
			v-if="!condenseLayout"
			aria-hidden="true"
			:class="titleClasses"
			data-testid="course-title"
		>
			{{ title }}
		</div>
	</div>
</template>
<script>
import { mdiLock } from "@/components/icons/material";
import { defineComponent } from "vue";
import { mdiSync } from "@mdi/js";

export default defineComponent({
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
			isDragging: false,
			mdiLock,
		};
	},
	computed: {
		badgeIcon() {
			if (this.showBadge && this.item.notification === true) {
				return mdiLock;
			}

			if (this.item.isSynchronized) {
				return mdiSync;
			}

			return null;
		},
		stillBeingCopied() {
			return this.item.copyingSince !== undefined;
		},
		avatarAriaLabel() {
			const course = this.$t("common.labels.course");
			if (this.stillBeingCopied) {
				const ariaLabelSuffix = this.$t(
					"components.molecules.copyResult.courseCopy.ariaLabelSuffix"
				);
				return `${course} ${this.item.title}: ${ariaLabelSuffix}`;
			}
			return `${course} ${this.item.title}`;
		},
		avatarTextClass() {
			const classes = ["text-h7"];
			if (this.condenseLayout) {
				classes.push("group-avatar", "text-h7");
			} else {
				classes.push("single-avatar", "text-h3");
			}
			if (this.stillBeingCopied) {
				classes.push("text-grey", "text-darken-1");
			} else {
				classes.push("text-white");
			}
			return classes;
		},
		avatarClass() {
			return this.stillBeingCopied ? ["grey-lighten-2"] : [];
		},
		avatarColor() {
			return this.stillBeingCopied ? undefined : this.item.displayColor;
		},
		title() {
			if (this.item.copyingSince) {
				return this.$t("components.molecules.copyResult.courseCopy.info");
			}
			if (this.item.titleDate) {
				return `${this.item.title}\n${this.item.titleDate}`;
			}
			return this.item.title;
		},
		titleClasses() {
			const marginClass = this.item.titleDate ? "mb-5" : "mb-7";
			const copyingClass = this.stillBeingCopied
				? ["text-grey", "text-darken-1"]
				: [];
			return [
				"justify-center",
				"mt-2",
				"subtitle",
				marginClass,
				...copyingClass,
			];
		},
	},
	methods: {
		onClick() {
			if (!this.condenseLayout && this.stillBeingCopied === false) {
				if (this.item.to) {
					this.$router.push({
						path: `/rooms/${this.item.id}`,
					});
					return;
				}
				if (this.item.href) {
					window.location = `/rooms/${this.item.id}`;
				}
			}
		},
		startDragAvatar() {
			this.isDragging = true;
			if (this.draggable) {
				this.$emit("startDrag", this.item);
			}
		},
		dragEnter() {
			this.isDragging = false;
		},
		dragend() {
			this.isDragging = false;
			this.$emit("dragendAvatar");
		},
		dropAvatar() {
			this.$emit("dropAvatar");
		},
	},
});
</script>

<style lang="scss" scoped>
@import "@/styles/settings.scss";
@import "@/utils/multiline-ellipsis.scss";

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

.subtitle {
	margin-right: calc(var(--space-base-vuetify) * -5);
	margin-left: calc(var(--space-base-vuetify) * -5);
	text-align: center;
	overflow-wrap: break-word;
	white-space: pre-wrap;

	@include excerpt(
		$font-size: calc(var(--space-base-vuetify) * 4),
		$line-height: var(--line-height-lg),
		$lines-to-show: 4
	);
}

@media #{map-get($display-breakpoints, 'xs')} {
	.subtitle {
		/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
		margin-right: unset;
		/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
		margin-left: unset;
		/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
		font-size: 14px;
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
