<template>
	<div class="d-flex flex-row">
		<VTextarea
			hide-details="auto"
			v-model="modelValue"
			variant="solo"
			density="compact"
			:rows="1"
			:max-rows="scope === 'board' ? 1 : null"
			auto-grow
			flat
			class="mx-n4 mb-n2"
			:class="{ board: scope === 'board', 'not-board': scope !== 'board' }"
			:placeholder="computedPlaceholder"
			ref="titleInput"
			:tabindex="scope === 'card' ? -1 : 0"
			role="heading"
			:aria-level="ariaLevel"
			@keydown="onEnter"
			:autofocus="internalIsFocused"
			><template v-slot:append-inner>
				<slot />
			</template>
			/></VTextarea
		>
	</div>
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
import { useI18n } from "vue-i18n";

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
		const { t } = useI18n();
		const modelValue = ref("");

		const internalIsFocused = ref(false);

		const titleInput = ref(null);

		useInlineEditInteractionHandler(async () => {
			setFocusOnEdit();
		});

		const setFocusOnEdit = async () => {
			await nextTick();
			internalIsFocused.value = true;

			if (titleInput.value) {
				(titleInput.value as VTextarea).focus();
			}
		};

		watch(modelValue, (newValue) => {
			if (newValue !== props.value) {
				emit("update:value", newValue);
			}
		});

		watch(
			() => props.value,
			(newVal) => {
				if (!(props.isFocused && props.isEditMode)) {
					modelValue.value = newVal;
				}
			}
		);

		onMounted(() => {
			if (props.isFocused && props.isEditMode) setFocusOnEdit();
			modelValue.value = props.value;
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
				case "column":
					return 2;
				case "card":
					return 3;
				default:
					return 1;
			}
		});

		const onEnter = ($event: KeyboardEvent) => {
			if ($event.key === "enter" || $event.key === "Enter") {
				$event.preventDefault();
				emit("enter");
				return;
			}
			// WIP: maxlength handling for e.g. CTRL+A
			if (
				$event.key === "Delete" ||
				$event.key === "Backspace" ||
				$event.key === "Tab"
			) {
				return;
			}
			if (props.maxLength && modelValue.value.length >= props.maxLength) {
				$event.preventDefault();
				modelValue.value = modelValue.value.slice(0, props.maxLength);
			}
		};

		const computedPlaceholder = computed(() => {
			if (props.placeholder) {
				return props.placeholder;
			}
			if (props.isEditMode) {
				return t("components.cardElement.titleElement.placeholder").toString();
			}
			return "";
		});

		return {
			ariaLevel,
			modelValue,
			hasValue,
			onEnter,
			internalIsFocused,
			titleInput,
			computedPlaceholder,
		};
	},
});
</script>

<style scoped>
:deep(div.v-field__field) {
	padding: 0;
	font-family: var(--font-accent);
}

:deep(.not-board textarea) {
	background: transparent !important;
	opacity: 1;
	font-size: var(--heading-5) !important;
	overflow: hidden;
}

:deep(textarea[readonly]) {
	cursor: pointer;
}

:deep(.board textarea) {
	font-size: var(--heading-3);
	background: transparent !important;
}

:deep(.v-field__append-inner, .v-field__clearable, .v-field__prepend-inner) {
	display: flex;
	align-items: flex-start;
	padding-top: 8px !important;
}
</style>
