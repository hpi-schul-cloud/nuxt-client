<template>
	<template v-if="isEditMode">
		<VTextarea
			ref="titleInput"
			v-model="modelValue"
			class="title"
			:class="{
				'board-title-input': scope === 'board',
				'other-title-input': scope !== 'board',
				'error-message-width': errorMessages.length > 0,
			}"
			hide-details="auto"
			variant="plain"
			density="compact"
			rows="1"
			auto-grow
			:placeholder="t('components.cardElement.titleElement.placeholder')"
			:autofocus="internalIsFocused"
			:maxlength="maxLength"
			:error-messages="errorMessages"
			@keydown.enter="onEnter"
		/>
	</template>
	<template v-else>
		<component :is="`h${headingLevel}`" class="title" :class="scope === 'board' ? 'board-title' : 'other-title'">
			{{ modelValue.trim() ? modelValue : emptyValueFallback }}
		</component>
	</template>
</template>

<script setup lang="ts">
import { containsOpeningTagFollowedByString } from "@/utils/validation";
import { useInlineEditInteractionHandler } from "@util-board";
import { ErrorObject, useVuelidate } from "@vuelidate/core";
import { helpers } from "@vuelidate/validators";
import { computed, nextTick, onMounted, ref, unref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { VTextarea } from "vuetify/components";

type Props = {
	isEditMode: boolean;
	value: string;
	scope: "card" | "column" | "board";
	isFocused?: boolean;
	maxLength?: number | null;
	emptyValueFallback?: string;
};

const props = withDefaults(defineProps<Props>(), {
	isFocused: false,
	maxLength: null,
	emptyValueFallback: "",
});

const emit = defineEmits<{
	(e: "update:value", value: string): void;
	(e: "enter"): void;
}>();

const { t } = useI18n();
const modelValue = ref("");

const internalIsFocused = ref(false);

const titleInput = ref<VTextarea | null>(null);

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
		if (props.scope !== "column" && props.scope !== "board" && !props.isFocused) {
			return;
		}

		if (newVal && !oldVal) {
			if (modelValue.value.trim().length < 1 && props.emptyValueFallback.length > 0) {
				modelValue.value = props.emptyValueFallback;
			}

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

const v$ = useVuelidate(validationRules, { modelValue }, { $lazy: true, $autoDirty: true });

const errorMessages = computed(() => v$.value.modelValue.$errors.map((e: ErrorObject) => unref(e.$message)));

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
	cursor: pointer;
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
