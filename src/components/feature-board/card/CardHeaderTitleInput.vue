<template>
	<div class="d-flex flex-grow-1">
		<h3 class="d-sr-only" :aria-hidden="isEditMode">
			{{ value }}
		</h3>

		<VTextarea
			label="Titel"
			hide-details="auto"
			v-model="modelValue"
			solo
			dense
			:rows="1"
			auto-grow
			class="ml-n3 mb-0 w-full"
			flat
			background-color="transparent"
			:readonly="!isEditMode"
			:aria-hidden="!isEditMode"
		></VTextarea>
	</div>
</template>
<script lang="ts">
import { useVModel } from "@vueuse/core";
import { defineComponent } from "vue";
import { useContentElementInteractionHandler } from "../ContentElementInteractionHandler.composable";

export default defineComponent({
	name: "CardHeaderTitleInput",
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
		const onFocusCallback = () => {
			document.getSelection()?.collapseToEnd();
		};
		useContentElementInteractionHandler(onFocusCallback);

		return {
			modelValue,
		};
	},
});
</script>
