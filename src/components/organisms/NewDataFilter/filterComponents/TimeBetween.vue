<template>
	{{ dateSelection }}
	<FilterActionButtons
		class="ma-4"
		@remove:filter="onRemoveFilter"
		@dialog-closed="onClose"
		@update:filter="onUpdateFilter"
	/>
</template>
<script setup lang="ts">
import FilterActionButtons from "./FilterActionButtons.vue";
const dateSelection = {
	$gte: "01.01.2001",
	$lte: "01.01.2023",
};

const emit = defineEmits(["update:filter", "dialog-closed", "remove:filter"]);

const onUpdateFilter = () => {
	emit("update:filter", dateSelection);
};

const onClose = () => {
	emit("dialog-closed", false);
};

const onRemoveFilter = () => {
	emit("remove:filter");
};
</script>
