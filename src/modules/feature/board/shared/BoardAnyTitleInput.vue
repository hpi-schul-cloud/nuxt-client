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
		@update:modelValue="onUpdateTitle"
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
		class="mx-n4 mb-n3 mt-2"
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
		@update:modelValue="onUpdateTitle"
	>
		<template v-slot:append-inner>
			<slot />
		</template>
	</VTextarea>
</template>

<script lang="ts">
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
		const modelValue = ref("");
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

		const onUpdateTitle = (newTitle: string) => {
			emit("update:value", newTitle);
		};

		onMounted(() => {
			modelValue.value = props.value;
			if (props.isFocused && props.isEditMode) setFocusOnEdit();
		});

		watch(
			() => props.value,
			async (newVal, oldVal) => {
				if (newVal !== oldVal) {
					modelValue.value = newVal;
				}
			}
		);

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
			onUpdateTitle,
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
	background: transparent !important;
	opacity: 1;
	font-size: var(--heading-5) !important;
	overflow: hidden;
}

:deep(textarea[readonly]) {
	cursor: pointer;
}

:deep(textarea)::placeholder {
	opacity: 1;
}

:deep(input) {
	font-size: var(--heading-3);
	background: transparent !important;
}

:deep(input)::placeholder {
	opacity: 1;
}
:deep(.v-field__append-inner, .v-field__clearable, .v-field__prepend-inner) {
    display: flex;
    align-items: flex-start;
	padding-top: 8px !important;
}
</style>
