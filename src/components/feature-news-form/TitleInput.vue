<template>
	<base-input
		v-bind="{ ...$attrs, ...$props }"
		v-model="value"
		classes="h1"
		:label-hidden="true"
	/>
</template>
<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
	modelValue: {
		type: [String, Number],
		required: true,
	},
});

const emit = defineEmits(["update:modelValue"]);

const value = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit("update:modelValue", value);
	},
});
</script>
