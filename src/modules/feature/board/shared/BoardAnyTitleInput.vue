<template>
	<template v-if="isEditMode">
		<VTextarea
			ref="titleInput"
			v-model="modelValue"
			class="title-input"
			:class="scope === 'board' ? 'board-title-input' : 'other-title-input'"
			hide-details="auto"
			variant="plain"
			rows="1"
			auto-grow
			density="compact"
			:placeholder="t('components.cardElement.titleElement.placeholder')"
			:autofocus="internalIsFocused"
			:maxlength="maxLength"
			:error-messages="errorMessages"
			@keydown.enter="onEnter"
		/>
	</template>
	<template v-else>
		<component
			:is="`h${ariaLevel}`"
			class="title-input"
			:class="scope === 'board' ? 'board-title' : 'other-title'"
		>
			{{ modelValue }}
		</component>
	</template>
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

		const cursorToEnd = () => {
			if (titleInput.value) {
				const length = (titleInput.value as VTextarea).value.length;
				(titleInput.value as VTextarea).setSelectionRange(length, length);
			}
		};

		return {
			t,
			ariaLevel,
			modelValue,
			hasValue,
			onEnter,
			internalIsFocused,
			titleInput,
			cursorToEnd,
			errorMessages,
		};
	},
});
</script>

<style scoped lang="scss">
@import "@/styles/settings.scss";

.title-input {
	cursor: pointer;
	white-space: pre-wrap;
	min-width: 100px;

	letter-spacing: $field-letter-spacing;
	font-family: var(--font-accent);

	&.board-title-input :deep(textarea) {
		font-size: var(--heading-3);
		line-height: var(--line-height-md);
		padding-top: var(--space-md);
		overflow: hidden; // prevent scrollbar in board title
	}

	&.other-title-input :deep(textarea) {
		font-size: var(--heading-5);
		line-height: var(--line-height-lg);
	}
}

.board-title {
	font-size: var(--heading-3);
	line-height: var(--line-height-md);
	margin-bottom: 0px;
	overflow-wrap: break-word;
	word-break: break-word;
}

.other-title {
	font-size: var(--heading-5);
	line-height: var(--line-height-lg);
	margin: 0;
	padding: 8px 16px;
	overflow-wrap: break-word;
	word-break: break-word;
}
</style>
