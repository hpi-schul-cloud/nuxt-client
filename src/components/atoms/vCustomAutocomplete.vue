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
		@change="($event) => $emit('selected-course', $event)"
	/>
</template>

<script>
export default {
	model: {
		prop: "value",
		event: "selected-course",
	},
};
</script>
