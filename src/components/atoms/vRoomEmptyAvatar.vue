<template>
	<div @drop.prevent="dropAvatar" @dragover.prevent>
		<v-avatar
			class="ma-0 pa-1 avatar-component-empty"
			:class="{ 'hovered-avatar': hovered, 'avatar-component-empty': !hovered }"
			:size="size"
			@dragleave="dragLeave"
			@dragenter.prevent.stop="dragEnter"
		>
		</v-avatar>
		<span class="mt-1"></span>
	</div>
</template>
<script>
export default {
	props: {
		size: {
			type: Number || String,
			required: true,
		},
		location: {
			type: Object,
			required: true,
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
			this.$emit("drop", this.location);
		},
	},
};
</script>
<style scoped>
.hovered-avatar {
	border: 1px solid;
}
.avatar-component-empty {
	/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
	border-radius: 24px;
}
</style>
