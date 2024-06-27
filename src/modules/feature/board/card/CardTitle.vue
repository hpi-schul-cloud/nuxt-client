<template>
	<VCardTitle
		class="d-block text-break-word pb-2"
		:class="{ 'pointer-events-none': !isEditMode }"
		v-if="isEditMode || value !== ''"
	>
		{{ isFocused }}
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
// import { useVModel } from "@vueuse/core";
import { defineComponent, ref, onMounted, watch } from "vue";
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
		const modelValue = ref("");
		const onUpdateValue = (newValue: string) => (modelValue.value = newValue);
		const onEnter = () => {
			emit("enter");
		};

		onMounted(() => {
			if (props.value !== undefined) {
				modelValue.value = props.value;
			}
		});

		watch(modelValue, (newValue) => {
			if (newValue !== props.value) {
				emit("update:value", newValue);
			}
		});

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
