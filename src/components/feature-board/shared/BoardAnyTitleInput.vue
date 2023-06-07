<template>
	<div>
		<VTextarea
			v-if="scope === 'card'"
			hide-details="auto"
			v-model="modelValue"
			solo
			dense
			:rows="1"
			auto-grow
			flat
			class="w-full mx-n3 mb-n2"
			:placeholder="$t('common.labels.title').toString()"
			background-color="transparent"
			ref="titleInput"
			:readonly="!isEditMode"
			:aria-hidden="!isEditMode"
		></VTextarea>

		<v-text-field
			v-if="scope === 'column'"
			ref="titleInput"
			class="w-full mx-n3 pt-2 d-block"
			:placeholder="placeholder"
			v-model="modelValue"
			hide-details="auto"
			solo
			dense
			flat
		></v-text-field>
		<!-- <div class="w-full" v-show="isEditMode">
				<div
					role="textbox"
					contenteditable
					type="text"
					class="heading w-full d-block"
					@input="onInput"
				>
					{{ modelValue }}
				</div>
			</div> -->
		<!-- </template> -->
		<!-- <template v-else> </template> -->
		<!-- <pre
			v-show="!isEditMode && hasValue"
			:aria-level="ariaLevel"
			role="heading"
			class="heading"
		>
			{{ value }}
		</pre
		>
		<div
			v-show="!isEditMode && !hasValue"
			class="heading blue-grey--text darken-1"
		>
			{{ placeholder }}
		</div> -->
		<!-- </div> -->
		<div
			class="d-sr-only"
			role="heading"
			:aria-level="ariaLevel"
			:aria-hidden="isEditMode"
		>
			{{ modelValue }}
		</div>
	</div>
</template>

<script lang="ts">
import { useFocus, useVModel } from "@vueuse/core";
import { computed, defineComponent, PropType, ref } from "vue";
import { useInlineEditInteractionHandler } from "./InlineEditInteractionHandler.composable";
import { useBoardPermissions } from "../shared/BoardPermissions.composable";

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
		const { hasEditPermission } = useBoardPermissions();
		const titleInput = ref<HTMLInputElement | null>(null);

		useInlineEditInteractionHandler(() => {
			if (!hasEditPermission) return;
			isFocused.value = true;
			document.getSelection()?.collapseToEnd();
		});

		const { focused: isFocused } = useFocus(titleInput);

		const hasValue = computed<boolean>(
			() => props.value !== "" && !!props.value
		);

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
			titleInput,
			isFocused,
			hasValue,
		};
	},
});
</script>

<style scoped>
:deep(div.v-input__slot) {
	padding: 0;
	color: red !important;
}

:deep(textarea) {
	font-size: v-bind(fontSize);
}
:deep(input) {
	font-size: v-bind(fontSize);
}
:deep(textarea[readonly]) {
	cursor: pointer;
}
</style>
