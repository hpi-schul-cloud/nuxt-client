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
			class="ml-n3 mb-0 w-full"
			flat
			:placeholder="placeholder"
			background-color="transparent"
			:readonly="!isEditMode"
			:aria-hidden="!isEditMode"
		></VTextarea>
	</div>
</template>

<script lang="ts">
import { useVModel } from "@vueuse/core";
import { computed, defineComponent, PropType } from "vue";

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

		return {
			modelValue,
			ariaLevel,
			label,
		};
	},
});
</script>
