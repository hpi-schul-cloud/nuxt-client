<template>
	<div>
		<VTextarea
			hide-details="auto"
			v-model="modelValue"
			solo
			dense
			:rows="1"
			auto-grow
			flat
			class="mx-n3 mb-n2"
			:placeholder="$t('common.labels.title').toString()"
			background-color="transparent"
			ref="titleInput"
			:readonly="!isEditMode"
			role="heading"
			:aria-level="ariaLevel"
			@keydown.enter="onEnter"
		></VTextarea>
	</div>
</template>

<script lang="ts">
import { useVModel } from "@vueuse/core";
import { computed, defineComponent, PropType, ref, watch } from "vue";
import { useBoardPermissions } from "../shared/BoardPermissions.composable";
import { useInlineEditInteractionHandler } from "./InlineEditInteractionHandler.composable";
import { VTextarea } from "vuetify/lib";

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
	emits: ["update:value", "enter"],
	setup(props, { emit }) {
		const modelValue = useVModel(props, "value", emit);
		const { hasEditPermission } = useBoardPermissions();
		const titleInput = ref<InstanceType<typeof VTextarea> | null>(null);

		useInlineEditInteractionHandler(() => {
			setFocusOnEdit();
		});

		const textarea = computed(() => {
			if (titleInput.value === null) return;

			return titleInput.value.$refs.input as HTMLTextAreaElement;
		});

		const setFocusOnEdit = async () => {
			if (!hasEditPermission) return;
			if (!textarea.value) return;

			textarea.value.focus();
		};

		watch(
			() => props.isEditMode,
			(newVal, oldVal) => {
				if (props.scope !== "column") return;
				if (newVal && !oldVal) {
					setFocusOnEdit();
				}
			}
		);

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

		const onEnter = ($event: KeyboardEvent) => {
			if (props.scope !== "card") return;
			if (!textarea.value) return;

			if (modelValue.value.length === textarea.value.selectionStart) {
				$event.preventDefault();
				emit("enter");
			}
		};

		return {
			ariaLevel,
			fontSize,
			modelValue,
			titleInput,
			hasValue,
			onEnter,
		};
	},
});
</script>

<style scoped>
:deep(div.v-input__slot) {
	padding: 0;
	font-family: var(--font-accent);
}

:deep(textarea) {
	font-size: var(--heading-5);
	background: transparent !important;
}
:deep(input) {
	font-size: v-bind(fontSize);
}
:deep(textarea[readonly]) {
	cursor: pointer;
}

/** Edge */
:deep(textarea)::-ms-input-placeholder {
	color: var(--v-black) !important;
	opacity: 1;
}
/** Other common browsers */
:deep(textarea)::placeholder {
	color: var(--v-black) !important;
	opacity: 1;
}
</style>
