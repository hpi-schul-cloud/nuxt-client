<template>
	<div>
		<VTextarea
			label="Text-Element"
			placeholder="Schreibe deinen Text..."
			hide-details="auto"
			v-model="modelValue"
			:autofocus="autofocus"
			solo
			dense
			:rows="1"
			auto-grow
			class="ml-n3 mb-0 w-full"
			flat
			background-color="transparent"
			ref="input"
		></VTextarea>
	</div>
</template>
<script lang="ts">
import { useVModel } from "@vueuse/core";
import { defineComponent } from "vue";

export default defineComponent({
	name: "TextContentElementDisplay",
	props: {
		value: {
			type: String,
			required: true,
		},
		autofocus: {
			type: Boolean,
			required: true,
		},
	},
	emits: ["update:value"],
	setup(props, { emit }) {
		const modelValue = useVModel(props, "value", emit);
		return { modelValue };
	},
});
</script>
