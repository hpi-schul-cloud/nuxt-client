<template>
	<VTextField
		v-if="scope === 'board'"
		hide-details="auto"
		v-model="modelValue"
		variant="solo"
		density="compact"
		flat
		:placeholder="placeholder"
		bg-color="transparent"
		ref="titleInput"
		:readonly="!isEditMode"
		role="heading"
		:aria-level="ariaLevel"
		:tabindex="isEditMode ? 0 : -1"
		:autofocus="internalIsFocused"
		:maxlength="maxLength"
		@keydown.enter="onEnter"
	/>
	<VTextarea
		v-else
		hide-details="auto"
		v-model="modelValue"
		variant="solo"
		density="compact"
		:rows="1"
		auto-grow
		flat
		class="mx-n4 mb-n2 mt-n2"
		:placeholder="placeholder"
		bg-color="transparent"
		ref="titleInput"
		:readonly="!isEditMode"
		role="heading"
		:aria-level="ariaLevel"
		@keydown.enter="onEnter"
		:tabindex="isEditMode ? 0 : -1"
		:autofocus="internalIsFocused"
		:maxlength="maxLength"
	/>
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
import { VTextarea } from "vuetify/lib/components/index.mjs";
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
		maxLength: {
			type: Number,
			default: null,
		},
	},
	emits: ["update:value", "enter"],
	setup(props, { emit }) {
		const modelValue = useVModel(props, "value", emit);

		const internalIsFocused = ref(false);

		const titleInput = ref<typeof VTextarea | null>(null);

		useInlineEditInteractionHandler(async () => {
			setFocusOnEdit();
		});
		const setFocusOnEdit = async () => {
			await nextTick();
			internalIsFocused.value = true;

			if (titleInput.value) {
				titleInput.value.focus();
			}
		};

		onMounted(() => {
			if (props.isFocused && props.isEditMode) setFocusOnEdit();
		});

		watch(
			() => props.isEditMode,
			async (newVal, oldVal) => {
				if (
					props.scope !== "column" &&
					props.scope !== "board" &&
					!props.isFocused
				)
					return;
				if (newVal && !oldVal) {
					await nextTick();
					await setFocusOnEdit();
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

		const onEnter = ($event: KeyboardEvent) => {
			if (props.scope !== "card") return;
			$event.preventDefault();
			emit("enter");
		};

		return {
			ariaLevel,
			modelValue,
			hasValue,
			onEnter,
			internalIsFocused,
			titleInput,
		};
	},
});
</script>

<style scoped>
:deep(div.v-field__field) {
	padding: 0;
	font-family: var(--font-accent);
}

:deep(textarea) {
	color: rgba(var(--v-theme-secondary)) !important;
	background: transparent !important;
	opacity: 1;
	font-size: var(--heading-5) !important;
}

:deep(textarea[readonly]) {
	cursor: pointer;
}

:deep(textarea)::placeholder {
	color: rgba(var(--v-theme-secondary)) !important;
	opacity: 1;
}

:deep(input) {
	font-size: var(--heading-3);
	color: rgba(var(--v-black-base));
	background: transparent !important;
}

:deep(input)::placeholder {
	color: rgba(var(--v-theme-secondary)) !important;
	opacity: 1;
}
</style>
