<template>
	<div
		class="rounded-xl delete-avatar"
		:class="{ 'hovered-delete-avatar': hovered, 'delete-avatar': !hovered }"
		@drop.prevent="deleteAvatar"
		@dragover.prevent.stop="dragEnter"
		@dragleave="dragLeave"
		@dragenter.prevent.stop="dragEnter"
	>
		<span class="d-flex justify-center ma-3">Delete !</span>
	</div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
	(e: "deleteAvatar"): void;
}>();
import { ref } from "vue";

const hovered = ref(false);

const deleteAvatar = () => {
	emit("deleteAvatar");
};

const dragLeave = () => {
	hovered.value = false;
};
const dragEnter = () => {
	hovered.value = true;
};
</script>

<style scoped>
.delete-avatar {
	position: absolute;
	top: 0;
	right: 40%;
	left: 40%;
	width: 200px;
	height: 50px;
	background: rgba(var(--v-theme-error));
}

.hovered-delete-avatar {
	position: absolute;
	top: 0;
	right: 40%;
	left: 40%;
	width: 250px;
	height: 75px;
	background: rgba(var(--v-theme-error));
	border: 1px solid;
}
</style>
