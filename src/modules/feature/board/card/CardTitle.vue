<template>
	<VCardTitle v-if="isEditMode || value !== ''" class="d-block text-break-word pt-0 pb-0" @dblclick="onDblClick">
		<BoardAnyTitleInput
			ref="titleInputRef"
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
import { CardEditModeKey } from "@/types/board/Card";
import { useBoardAllowedOperations } from "@data-board";
import { useVModel } from "@vueuse/core";
import { inject, nextTick, useTemplateRef } from "vue";

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

const modelValue = useVModel(props, "value", emit);
const titleInputRef = useTemplateRef<InstanceType<typeof BoardAnyTitleInput>>("titleInputRef");
const cardEditMode = inject(CardEditModeKey, undefined);

const onUpdateValue = (newValue: string) => (modelValue.value = newValue);
const onEnter = () => emit("enter");

const onDblClick = async () => {
	if (cardEditMode && !cardEditMode.isEditMode.value) {
		cardEditMode.startEditMode();
	}
	await nextTick();
	titleInputRef.value?.focus();
};
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
