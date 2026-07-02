<template>
	<VCardTitle v-if="isEditMode || value !== ''" class="d-block text-break-word pt-0 pb-0">
		<BoardAnyTitleInput
			ref="titleInput"
			scope="card"
			:value="modelValue"
			:is-edit-mode="isEditMode"
			:has-edit-permission="allowedOperations.updateCardTitle"
			:is-focused="isFocused"
			data-testid="card-title"
			@update:value="onUpdateValue"
			@enter="onEnter"
		/>
	</VCardTitle>
</template>

<script setup lang="ts">
import BoardAnyTitleInput from "../shared/BoardAnyTitleInput.vue";
import { useBoardAllowedOperations } from "@data-board";
import { useVModel } from "@vueuse/core";
import { useTemplateRef } from "vue";

const { allowedOperations } = useBoardAllowedOperations();

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

const titleInput = useTemplateRef("titleInput");

const modelValue = useVModel(props, "value", emit);
const onUpdateValue = (newValue: string) => (modelValue.value = newValue);
const onEnter = () => emit("enter");

const focusIn = async () => {
	await titleInput.value?.focusIn();
};

defineExpose({ focusIn });
</script>

<style scoped>
.text-break-word {
	word-break: break-word;
}

.v-card-title h3,
.v-card-title :deep(.other-title-input textarea) {
	font-weight: bold !important;
}
</style>
