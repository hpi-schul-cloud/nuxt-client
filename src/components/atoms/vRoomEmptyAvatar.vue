<template>
	<div @drop.prevent="dropAvatar" @dragover.prevent>
		<v-badge
			class="ma-0 badge-component"
			bordered
			color="var(--color-primary)"
			icon="mdi-lock"
			overlap
			:value="false"
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
			>
			</v-avatar>
		</v-badge>
		<div class="d-flex justify-center mt-1 sub-title"></div>
	</div>
</template>
<script>
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
	data() {
		return {
			hovered: false,
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
			this.$emit("drop");
		},
	},
};
</script>
<style scoped>
.outlined {
  border: 2px dashed;
  border-color: var(--color-secondary);
}

.hovered-avatar {
  border: 2px solid;
  border-color: var(--color-secondary);
}

.avatar-component-empty {
  /* stylelint-disable-next-line sh-waqar/declaration-use-variable */
  border-radius: 1em;
}

.sub-title {
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
