<template>
	<template v-if="isEditMode">
		<VTextarea
			ref="titleInput"
			v-model="modelValue"
			class="title"
			:class="{
				'board-title-input': scope === 'board',
				'other-title-input': scope !== 'board',
				'error-message-width': hasErrors,
			}"
			hide-details="auto"
			variant="plain"
			density="compact"
			rows="1"
			auto-grow
			:rules="validationRules"
			:placeholder="t('components.cardElement.titleElement.placeholder')"
			:autofocus="internalIsFocused"
			:maxlength="maxLength"
			@keydown.enter="onEnter"
		/>
	</template>
	<template v-else>
		<component
			:is="`h${headingLevel}`"
			class="title"
			:class="[scope === 'board' ? 'board-title' : 'other-title', { 'cursor-pointer': hasEditPermission }]"
		>
			{{ externalValue?.trim() ? externalValue : emptyValueFallback }}
		</component>
	</template>
</template>

<script setup lang="ts">
import { InlineEditInteractionEvent } from "@/types/board/InlineEditInteractionEvent.symbol";
import { useInlineEditInteractionHandler } from "@util-board";
import { isOfMaxLength, useOpeningTagValidator } from "@util-validators";
import { computed, inject, nextTick, onMounted, Ref, ref, toRef, useTemplateRef, watch } from "vue";
import { useI18n } from "vue-i18n";
import { VTextarea } from "vuetify/components";

const props = withDefaults(
	defineProps<{
		isEditMode: boolean;
		value: string;
		scope: "card" | "column" | "board";
		isFocused?: boolean;
		maxLength?: number;
		emptyValueFallback?: string;
		hasEditPermission?: boolean;
		focusTitleOnEditStart?: boolean;
	}>(),
	{
		isFocused: false,
		emptyValueFallback: "",
		hasEditPermission: false,
		maxLength: undefined,
		focusTitleOnEditStart: false,
	}
);

const emit = defineEmits<{
	(e: "update:value", value: string): void;
	(e: "enter"): void;
}>();

const { t } = useI18n();
const { validateOnOpeningTag } = useOpeningTagValidator();

const validationRules = [validateOnOpeningTag, isOfMaxLength(100)()];

const modelValue = ref("");
const externalValue = toRef(props, "value");
const internalIsFocused = ref(false);
const titleInput = useTemplateRef<VTextarea>("titleInput");

const interactionEvent = inject<Ref<{ x: number; y: number } | undefined>>(InlineEditInteractionEvent, ref(undefined));

const hasErrors = computed(() => (titleInput.value ? !titleInput.value.isValid : false));

useInlineEditInteractionHandler(async () => {
	await setFocusOnEdit();
});

const setFocusOnEdit = async () => {
	await nextTick();
	internalIsFocused.value = true;
	if (titleInput.value) {
		titleInput.value.focus();
		cursorToEnd();
	}
};

watch(modelValue, async (newValue) => {
	await nextTick();
	await titleInput?.value?.validate();
	const isValid = titleInput?.value?.isValid;

	if (newValue !== props.value && isValid) {
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
	// This path fires when the component mounts with isEditMode already true
	// (e.g. the card title is empty so it wasn't rendered before edit mode started).
	// Apply the same guards as watch(isEditMode): skip if a double-click interaction
	// is active (the clicked element handles its own focus), and only focus when the
	// card is keyboard-focused or the consumer opted in via focusTitleOnEditStart.
	if (props.isEditMode && interactionEvent.value === undefined && (props.isFocused || props.focusTitleOnEditStart)) {
		setFocusOnEdit();
	}
	modelValue.value = props.value;
});

watch(
	() => props.isEditMode,
	async (newVal) => {
		if (!newVal) {
			internalIsFocused.value = false;
			return;
		}

		const isCardScope = props.scope !== "column" && props.scope !== "board";
		if (isCardScope) {
			// A double-click interaction event is present: the InlineEditInteractionHandler has
			// already routed focus to the specific element that was clicked (e.g. a text element
			// inside the card). Let that handler win — do not steal focus for the title.
			if (interactionEvent.value !== undefined) return;

			// No interaction event means edit mode was triggered via keyboard navigation or an
			// explicit "Edit" button (detail view). Only auto-focus the title when:
			// - isFocused: the card is the currently focused board element (keyboard nav), OR
			// - focusTitleOnEditStart: the consumer explicitly requests title focus on edit start
			//   (used by CardHostDetailView so its "Edit" button always lands in the title).
			if (!props.isFocused && !props.focusTitleOnEditStart) return;
		}

		modelValue.value = externalValue.value || props.emptyValueFallback;
		await nextTick();
		await setFocusOnEdit();
	}
);

const headingLevel = computed(() => {
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
		const length = titleInput.value.value.length;
		titleInput.value.setSelectionRange(length, length);
	}
};
</script>

<style scoped lang="scss">
@use "@/styles/settings.scss" as *;

.error-message-width {
	min-width: 280px;
}

.title {
	white-space: pre-wrap;
	letter-spacing: $field-letter-spacing;
	font-family: var(--font-accent);
	font-weight: normal;

	:deep(.v-messages) {
		font-family: var(--font-primary);
	}

	&.board-title-input :deep(textarea) {
		font-size: var(--heading-1);
		line-height: var(--line-height-md);
		padding-top: 16px;
		overflow: hidden; // prevent scrollbar in board title
	}

	&.other-title-input {
		:deep(textarea) {
			font-size: var(--heading-3);
			line-height: var(--line-height-lg);
			padding: 8px 16px;
			overflow: hidden;
		}

		:deep(.v-input__details) {
			padding-left: 16px;
		}
	}
}

.board-title {
	font-size: var(--heading-1);
	line-height: var(--line-height-md);
	margin-bottom: 0;
	overflow-wrap: break-word;
	word-break: break-word;
}

.other-title {
	font-size: var(--heading-3);
	line-height: var(--line-height-lg);
	margin: 0;
	padding: 8px 16px;
	overflow-wrap: break-word;
	word-break: break-word;
}
</style>
