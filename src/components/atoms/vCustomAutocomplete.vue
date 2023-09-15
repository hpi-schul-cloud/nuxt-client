<template>
	<v-autocomplete
		small-chips
		deletable-chips
		multiple
		clearable
		variant="solo"
		rounded
		:menu-props="{ closeOnContentClick: false, zIndex: 30 }"
		v-bind="$attrs"
		data-testid="courseFilter"
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
