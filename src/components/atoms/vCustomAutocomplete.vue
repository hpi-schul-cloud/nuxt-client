<template>
	<v-autocomplete
		small-chips
		deletable-chips
		multiple
		clearable
		solo
		rounded
		:menu-props="{ closeOnContentClick: false }"
		v-bind="$attrs"
		data-test-id="courseFilter"
		@change="($event) => $emit('selected-item', $event)"
	/>
</template>

<script>
export default {
	model: {
		prop: "value",
		event: "selected-item",
	},
};
</script>
