<template>
	<VCardTitle
		class="d-block text-break-word pb-2"
		:class="{ 'pointer-events-none': !isEditMode }"
		v-if="isEditMode || value !== ''"
	>
		<BoardAnyTitleInput
			scope="card"
			:value="modelValue"
			:isEditMode="isEditMode"
			:placeholder="
				$t('components.cardElement.titleElement.placeholder').toString()
			"
			:isFocused="isFocused"
			@update:value="onUpdateValue"
			@enter="onEnter"
			data-testid="card-title"
		/>
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
			default: "",
		},
		isEditMode: {
			type: Boolean,
			required: true,
		},
		isFocused: {
			type: Boolean,
		},
	},
	emits: ["update:value", "enter"],
	setup(props, { emit }) {
		const modelValue = useVModel(props, "value", emit);
		const onUpdateValue = (newValue: string) => (modelValue.value = newValue);
		const onEnter = () => {
			emit("enter");
		};

		return {
			modelValue,
			onUpdateValue,
			onEnter,
		};
	},
});
</script>

<style scoped>
.text-break-word {
	word-break: break-word;
}

.pointer-events-none {
	pointer-events: none;
}
</style>
