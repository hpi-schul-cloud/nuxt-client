<template>
	<div @drop.prevent="dropAvatar" @dragover.prevent>
		<v-avatar
			class="ma-0 pa-1 avatar-component-empty"
			:class="addBorder"
			:size="size"
			@dragleave="dragLeave"
			@dragenter="dragEnter"
		>
		</v-avatar>
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
			type: String,
			default: "",
		},
	},
	data() {
		return {
			hovered: false,
		};
	},
	computed: {
		addBorder() {
			return this.hovered ? "hovered-avatar" : "avatar-component-empty ";
		},
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
