<template>
	<VTextField
		v-if="scope === 'board'"
		class="title-input"
		hide-details="auto"
		v-model="modelValue"
		variant="solo"
		density="compact"
		flat
		:placeholder="placeholderText"
		bg-color="transparent"
		ref="titleInput"
		:disabled="!isEditMode"
		:role="isEditMode ? 'input' : 'heading'"
		:aria-level="ariaLevel"
		:tabindex="isEditMode ? 0 : -1"
		:autofocus="internalIsFocused"
		:maxlength="maxLength"
		:error-messages="errorMessages"
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
		class="title-input"
		:placeholder="placeholderText"
		bg-color="transparent"
		ref="titleInput"
		:disabled="!isEditMode"
		:role="isEditMode ? 'input' : 'heading'"
		:aria-level="ariaLevel"
		@keydown.enter="onEnter"
		:tabindex="isEditMode ? 0 : -1"
		:autofocus="internalIsFocused"
		:maxlength="maxLength"
		:error-messages="errorMessages"
	/>
</template>

<script lang="ts">
import { containsOpeningTagFollowedByString } from "@/utils/validation";
import { useInlineEditInteractionHandler } from "@util-board";
import { ErrorObject, useVuelidate } from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";
import {
	computed,
	defineComponent,
	nextTick,
	onMounted,
	PropType,
	ref,
	unref,
	watch,
} from "vue";
import { useI18n } from "vue-i18n";
import { VTextarea } from "vuetify/lib/components/index.mjs";

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
			await setFocusOnEdit();
		});

		const setFocusOnEdit = async () => {
			await nextTick();
			internalIsFocused.value = true;
			if (titleInput.value) {
				(titleInput.value as VTextarea).focus();
				cursorToEnd();
			}
		};

		watch(modelValue, (newValue) => {
			const inputIsValid = v$.value.modelValue.$errors.length === 0;

			if (newValue !== props.value && inputIsValid) {
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

		const validationRules = computed(() => ({
			modelValue: {
				containsOpeningTag: helpers.withMessage(
					t("common.validation.containsOpeningTag"),
					(name: string) => !containsOpeningTagFollowedByString(name)
				),
			},
		}));

		const v$ = useVuelidate(
			validationRules,
			{ modelValue },
			{ $lazy: true, $autoDirty: true }
		);

		const errorMessages = computed(() =>
			v$.value.modelValue.$errors.map((e: ErrorObject) => unref(e.$message))
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
			$event.preventDefault();
			emit("enter");
		};

		const placeholderText = computed(() => {
			if (props.placeholder) {
				return props.placeholder;
			}
			if (props.isEditMode) {
				return t("components.cardElement.titleElement.placeholder").toString();
			}
			return "";
		});

		const cursorToEnd = () => {
			if (titleInput.value) {
				const length = (titleInput.value as VTextarea).value.length;
				(titleInput.value as VTextarea).setSelectionRange(length, length);
			}
		};

		return {
			ariaLevel,
			modelValue,
			hasValue,
			onEnter,
			internalIsFocused,
			titleInput,
			placeholderText,
			cursorToEnd,
			errorMessages,
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

:deep(input) {
	font-size: var(--heading-3);
	background: transparent !important;
}

:deep(.v-field__append-inner, .v-field__clearable, .v-field__prepend-inner) {
	display: flex;
	align-items: flex-start;
	padding-top: 8px !important;
}

.title-input {
	cursor: pointer;
	pointer-events: unset !important;
	min-width: 280px;
}

.title-input :deep(.v-field--disabled) {
	opacity: var(--v-high-emphasis-opacity);
}
</style>
