<template>
	<v-switch
		:input-value="modelValue"
		:label="label"
		:aria-label="ariaLabel"
		inset
		flat
		density="compact"
		:color="color"
		v-bind="$attrs"
		@update:modelValue="updateValue"
	></v-switch>
</template>

<script setup lang="ts">
defineProps({
	// v-switch accepts any type as a value, thus we shouldn't restrict it
	modelValue: { required: true },
	label: {
		type: String,
		required: true,
	},
	ariaLabel: {
		type: String,
		required: false,
		default: () => "toggle switch",
	},
	color: {
		type: String,
		default: () => "primary",
	},
});
const emit = defineEmits(["update:modelValue"]);

const updateValue = (value: unknown) => {
	emit("update:modelValue", value);
};
</script>
