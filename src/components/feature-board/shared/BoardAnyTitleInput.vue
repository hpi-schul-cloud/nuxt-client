<template>
	<div class="d-flex flex-grow-1">
		<div
			role="heading"
			:aria-level="ariaLevel"
			class="d-sr-only"
			:aria-hidden="isEditMode"
		>
			{{ value }}
		</div>

		<VTextarea
			:label="label"
			hide-details="auto"
			v-model="modelValue"
			solo
			dense
			:rows="1"
			auto-grow
			flat
			class="ml-n3 mb-0 w-full"
			:placeholder="placeholder"
			background-color="transparent"
			:tabindex="isEditMode ? 0 : -1"
			:readonly="!isEditMode"
			:aria-hidden="!isEditMode"
		></VTextarea>
	</div>
</template>

<script lang="ts">
import { useVModel } from "@vueuse/core";
import { computed, defineComponent, PropType } from "vue";
import { useInlineEditInteractionHandler } from "./InlineEditInteractionHandler.composable";

export default defineComponent({
	name: "BoardAnyTitleInput",
	props: {
		isEditMode: {
			type: Boolean,
			required: true,
		},
		value: {
			type: String,
			required: true,
		},
		placeholder: {
			type: String,
			required: true,
		},
		scope: {
			type: String as PropType<"card" | "column" | "board">,
			required: true,
		},
	},
	emits: ["update:value"],
	setup(props, { emit }) {
		const modelValue = useVModel(props, "value", emit);

		useInlineEditInteractionHandler(() => {
			document.getSelection()?.collapseToEnd();
		});

		const ariaLevel = computed(() => {
			switch (props.scope) {
				case "board":
					return 1;
				case "column":
					return 2;
				case "card":
					return 3;
				default:
					return 1;
			}
		});
		const label = computed(() => {
			switch (props.scope) {
				case "board":
					return "BoardTitle";
				case "column":
					return "ColumnTitle";
				case "card":
					return "CardTitle";
				default:
					return "UnknownTitle";
			}
		});
		const fontSizeClass = computed(() => {
			switch (props.scope) {
				case "board":
					return { "text-h3": true };
				case "column":
					return { "text-h4": true };
				case "card":
					return { "text-h5": true };
				default:
					return { anyClass: false };
			}
		});

		return {
			modelValue,
			ariaLevel,
			label,
			fontSizeClass,
		};
	},
});
</script>
