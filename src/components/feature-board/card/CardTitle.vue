<template>
	<VCardTitle
		class="d-flex align-start justify-space-between"
		v-if="isEditMode || value !== ''"
	>
		<BoardAnyTitleInput
			scope="card"
			:value="modelValue"
			:isEditMode="isEditMode"
			:isFocused="isFocused"
			@update:value="onUpdateValue"
		></BoardAnyTitleInput>
	</VCardTitle>
</template>
<script lang="ts">
import { useVModel } from "@vueuse/core";
import { defineComponent } from "vue";
import BoardAnyTitleInput from "../shared/BoardAnyTitleInput.vue";

export default defineComponent({
	name: "CardTitle",
	components: { BoardAnyTitleInput },
	props: {
		value: {
			type: String,
			required: true,
		},
		isEditMode: {
			type: Boolean,
			required: true,
		},
		isFocused: {
			type: Boolean,
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
