<template>
	<VCardTitle
		v-if="isEditMode || value !== ''"
		class="d-block text-break-word pt-0 pb-0"
		:class="{ 'pointer-events-none': !isEditMode }"
	>
		<BoardAnyTitleInput
			scope="card"
			:value="modelValue"
			:is-edit-mode="isEditMode"
			:is-focused="isFocused"
			data-testid="card-title"
			@update:value="onUpdateValue"
			@enter="onEnter"
		/>
	</VCardTitle>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import BoardAnyTitleInput from "../shared/BoardAnyTitleInput.vue";

const props = defineProps({
	value: {
		type: String,
		default: "",
	},
	isEditMode: {
		type: Boolean,
		required: true,
	},
	isFocused: {
		type: Boolean,
	},
});
const emit = defineEmits(["update:value", "enter"]);

const modelValue = useVModel(props, "value", emit);
const onUpdateValue = (newValue: string) => (modelValue.value = newValue);
const onEnter = () => emit("enter");
</script>

<style scoped>
.text-break-word {
	word-break: break-word;
}

.pointer-events-none {
	pointer-events: none;
}
</style>
