<template>
	<div>
		<template v-for="(item, index) of classes" :key="index">
			<v-checkbox v-model="selected" :value="item" :label="item" hide-details />
		</template>
	</div>

	<FilterActionButtons
		class="ma-2"
		@remove:filter="onRemoveFilter"
		@dialog-closed="onClose"
		@update:filter="onUpdateFilter"
	/>
</template>
<script setup lang="ts">
import { ref } from "vue";
import FilterActionButtons from "./FilterActionButtons.vue";

defineProps({
	classes: {
		type: Array<string>,
		required: true,
	},
});

const emit = defineEmits(["update:filter", "dialog-closed", "remove:filter"]);

const selected = ref([]);

const onUpdateFilter = () => {
	if (!selected.value.length) {
		emit("dialog-closed", false);
		return;
	}

	emit("update:filter", selected.value);
};

const onClose = () => {
	emit("dialog-closed", false);
};

const onRemoveFilter = () => {
	emit("remove:filter");
};
</script>
