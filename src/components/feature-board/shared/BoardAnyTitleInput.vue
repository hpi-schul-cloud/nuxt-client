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
			:placeholder="placeholder"
			background-color="transparent"
			ref="titleInput"
			:readonly="!isEditMode"
			role="heading"
			:aria-level="ariaLevel"
			@keydown.enter="onEnter"
			:tabindex="isEditMode ? 0 : -1"
		/>
	</div>
</template>

<script lang="ts">
import { useVModel } from "@vueuse/core";
import {
	computed,
	defineComponent,
	nextTick,
	onMounted,
	PropType,
	ref,
	watch,
} from "vue";
import { VTextarea } from "vuetify/lib";
import { useBoardPermissions } from "@data-board";
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
		isFocused: {
			type: Boolean,
		},
	},
	emits: ["update:value", "enter"],
	setup(props, { emit }) {
		const modelValue = useVModel(props, "value", emit);
		const { hasEditPermission } = useBoardPermissions();
		const titleInput = ref<InstanceType<typeof VTextarea> | null>(null);

		useInlineEditInteractionHandler(async () => {
			setFocusOnEdit();
			await nextTick();
		});
		const setFocusOnEdit = () => {
			if (!hasEditPermission) return;
			if (!textarea.value) return;
			textarea.value.focus();
		};

		const textarea = computed(() => {
			if (titleInput.value === null) return null;
			return titleInput.value.$refs.input as HTMLTextAreaElement;
		});

		onMounted(() => {
			if (props.isFocused && props.isEditMode) setFocusOnEdit();
		});

		watch(
			() => props.isEditMode,
			async (newVal, oldVal) => {
				if (props.scope !== "column" && !props.isFocused) return;
				if (newVal && !oldVal) {
					await nextTick();
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

		const titleLength = () => {
			if (!textarea.value) return;
			return textarea.value.value.length;
		};

		const onEnter = ($event: KeyboardEvent) => {
			if (props.scope !== "card") return;
			if (!textarea.value) return;

			if (titleLength() === textarea.value.selectionStart) {
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
			titleLength,
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
	color: var(--v-secondary-base) !important;
	opacity: 1;
}
/** Other common browsers */
:deep(textarea)::placeholder {
	color: var(--v-secondary-base) !important;
	opacity: 1;
}
</style>
@data-board";
