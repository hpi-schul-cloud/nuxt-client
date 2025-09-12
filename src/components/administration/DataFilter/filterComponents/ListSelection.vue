<template>
	<div>
		<template v-for="(item, index) of selectionList" :key="index">
			<v-checkbox
				v-model="selected"
				:value="item.value"
				:label="item.label"
				hide-details
				data-testid="list-selection"
			/>
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
import { ref, onMounted } from "vue";
import FilterActionButtons from "./FilterActionButtons.vue";
import { SelectOptionsType } from "../types";

const props = defineProps({
	selectionList: {
		type: Array<SelectOptionsType>,
		required: true,
	},
	selectedList: {
		type: Array<string>,
		default: undefined,
	},
});

const emit = defineEmits(["update:filter", "dialog-closed", "remove:filter"]);

const selected = ref<string[]>([]);

const onUpdateFilter = () => {
	if (selected.value.length === 0) {
		emit("remove:filter");
		emit("dialog-closed", false);
		return;
	}
	emit("update:filter", selected.value);
	emit("dialog-closed", false);
};

const onClose = () => {
	emit("dialog-closed", false);
};

const onRemoveFilter = () => {
	emit("remove:filter");
};

onMounted(() => {
	if (props.selectedList) selected.value = props.selectedList;
});
</script>
