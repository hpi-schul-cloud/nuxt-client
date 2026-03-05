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
			:rules="[validateOnOpeningTag]"
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
import { useInlineEditInteractionHandler } from "@util-board";
import { logger } from "@util-logger";
import { useOpeningTagValidator } from "@util-validators";
import { computed, nextTick, onMounted, ref, toRef, useTemplateRef, watch } from "vue";
import { useI18n } from "vue-i18n";

const props = withDefaults(
	defineProps<{
		isEditMode: boolean;
		value: string;
		scope: "card" | "column" | "board";
		isFocused?: boolean;
		maxLength?: number;
		emptyValueFallback?: string;
		hasEditPermission?: boolean;
	}>(),
	{
		isFocused: false,
		emptyValueFallback: "",
		hasEditPermission: false,
		maxLength: undefined,
	}
);

const emit = defineEmits<{
	(e: "update:value", value: string): void;
	(e: "enter"): void;
}>();

const { t } = useI18n();
const { validateOnOpeningTag } = useOpeningTagValidator();

const modelValue = ref("");
const externalValue = toRef(props, "value");
const internalIsFocused = ref(false);
const titleInput = useTemplateRef("titleInput");
const hasErrors = ref(false);

watch(
	() => titleInput.value?.isValid,
	() => {
		hasErrors.value = titleInput.value ? !titleInput.value.isValid : false;
		logger.log("BoardAnyTitleInput - hasErrors:", hasErrors.value);
	}
);

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

watch(modelValue, (newValue) => {
	if (newValue !== props.value && titleInput.value?.isValid) {
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
		if (props.scope !== "column" && props.scope !== "board" && !props.isFocused) {
			return;
		}

		if (newVal && !oldVal) {
			const text = externalValue.value.length > 0 ? externalValue.value : props.emptyValueFallback;
			modelValue.value = text;

			await nextTick();
			await setFocusOnEdit();
		}
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
