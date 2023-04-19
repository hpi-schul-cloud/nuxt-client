<template>
	<BoardAnyTitleInput
		scope="card"
		:value="modelValue"
		:isEditMode="isEditMode"
		:placeholder="''"
		@update:value="onUpdateValue"
	></BoardAnyTitleInput>
</template>
<script lang="ts">
import { useVModel } from "@vueuse/core";
import { defineComponent } from "vue";
import BoardAnyTitleInput from "../shared/BoardAnyTitleInput.vue";

export default defineComponent({
	name: "CardHeaderTitleInput",
	components: {
		BoardAnyTitleInput,
	},
	props: {
		value: {
			type: String,
			required: true,
		},
		isEditMode: {
			type: Boolean,
			required: true,
		},
	},
	emits: ["update:value"],
	setup(props, { emit }) {
		const modelValue = useVModel(props, "value", emit);
		const onUpdateValue = (newValue: string) => (modelValue.value = newValue);

		return {
			modelValue,
			onUpdateValue,
		};
	},
});
</script>
