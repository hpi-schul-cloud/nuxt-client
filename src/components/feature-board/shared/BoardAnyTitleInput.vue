<template>
	<div class="d-flex flex-grow-1">
		<VTextarea
			v-if="isEditMode"
			hide-details="auto"
			v-model="modelValue"
			solo
			dense
			:rows="1"
			auto-grow
			flat
			class="ml-n3 mb-0 w-full"
			:placeholder="$t('common.labels.title').toString()"
			background-color="transparent"
			tabindex="0"
			:autofocus="true"
		></VTextarea>
		<div
			v-else-if="value && value !== ''"
			:aria-level="ariaLevel"
			role="heading"
			class="heading"
			tabindex="-1"
		>
			{{ value }}
		</div>
		<div v-else class="heading blue-grey--text darken-1">
			{{ placeholder }}
		</div>
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
		scope: {
			type: String as PropType<"card" | "column" | "board">,
			required: true,
		},
		placeholder: {
			type: String,
			default: "",
			required: false,
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

		const fontSize = computed(() => {
			switch (props.scope) {
				case "board":
					return "var(--heading-3)";
				case "column":
					return "var(--heading-5)";
				case "card":
					return "var(--heading-6)";
				default:
					return "--heading-6";
			}
		});

		return {
			ariaLevel,
			fontSize,
			modelValue,
		};
	},
});
</script>

<style scoped>
:deep(textarea) {
	font-size: v-bind(fontSize);
}
.heading {
	font-size: v-bind(fontSize);
	margin-top: 10px;
	letter-spacing: normal;
	padding-right: 15px;
}

.heading:focus {
	outline: none;
}
</style>
