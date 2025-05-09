<template>
	<div @drop.prevent="dropAvatar" @dragover.prevent>
		<v-badge
			class="ma-0 badge-component"
			bordered
			color="rgba(var(--v-theme-primary))"
			:icon="mdiLock"
			:model-value="false"
		>
			<v-avatar
				class="ma-0 pa-1 avatar-component-empty"
				:class="{
					'hovered-avatar': hovered,
					'avatar-component-empty': !hovered,
					outlined: showOutline,
				}"
				:size="size"
				@dragleave="dragLeave"
				@dragenter.prevent.stop="dragEnter"
			/>
		</v-badge>
		<div class="d-flex justify-center mt-1 subtitle" />
	</div>
</template>
<script>
import { mdiLock } from "@icons/material";
export default {
	props: {
		size: {
			type: String,
			required: true,
		},
		showOutline: {
			type: Boolean,
			required: false,
		},
	},
	emits: ["dropEmptyAvatar"],
	data() {
		return {
			hovered: false,
			mdiLock,
		};
	},
	methods: {
		dragLeave() {
			this.hovered = false;
		},
		dragEnter() {
			this.hovered = true;
		},
		dropAvatar() {
			this.$emit("dropEmptyAvatar");
		},
	},
};
</script>
<style scoped>
.outlined {
	border: 2px dashed;
}

.hovered-avatar {
	border: 2px solid;
}

.avatar-component-empty {
	/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
	border-radius: 1em;
}

.subtitle {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	height: var(--space-xl);
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
