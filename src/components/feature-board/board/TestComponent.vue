<template>
	<div>
		<v-text-field v-timeInputMask v-model="modelValue" />
		<br />
		{{ modelValue }}
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { timeInputMask } from "@util-input-masks";

export default defineComponent({
	name: "TestComponent",
	directives: {
		timeInputMask,
	},
	setup() {
		const modelValue = ref("");

		return {
			modelValue,
		};
	},
});
</script>
