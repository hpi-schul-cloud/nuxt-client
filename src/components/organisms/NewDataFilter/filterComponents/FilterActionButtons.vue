<template>
	<div class="d-flex justify-space-between">
		<v-btn variant="flat" @click="onRemoveFilter">Remove</v-btn>
		<div>
			<v-btn variant="flat" @click="onCancel">Cancel</v-btn>
			<v-btn variant="flat" color="primary" @click="onAddFilter">Add</v-btn>
		</div>
	</div>
</template>
<script setup lang="ts">
const emit = defineEmits(["remove:filter", "update:filter", "dialog-closed"]);

const onRemoveFilter = () => {
	emit("remove:filter");
};
const onCancel = () => {
	emit("dialog-closed");
};
const onAddFilter = () => {
	emit("update:filter");
};
</script>
