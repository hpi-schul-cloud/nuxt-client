<template>
	<div>
		<RichTextContentElementDisplay
			v-if="!isEditMode"
			:class="{ 'first-element': isFirstElement }"
			:data-testid="`rich-text-display-${columnIndex}-${elementIndex}`"
			:value="element.content.text"
		/>
		<RichTextContentElementEdit
			v-if="isEditMode"
			:autofocus="autofocus"
			:class="{ 'first-element': isFirstElement }"
			:value="modelValue.text"
			:data-testid="`rich-text-edit-${columnIndex}-${elementIndex}`"
			:column-index="columnIndex"
			@update:value="onUpdateElement"
			@delete:element="onDeleteElement"
			@blur="onBlur"
			@keyup.capture="onKeyUp"
		/>
	</div>
</template>

<script setup lang="ts">
import { RichTextElementResponse } from "@/serverApi/v3";
import { useBoardFocusHandler, useContentElementState } from "@data-board";
import { computed, PropType, ref, toRef } from "vue";
import RichTextContentElementDisplay from "./RichTextContentElementDisplay.vue";
import RichTextContentElementEdit from "./RichTextContentElementEdit.vue";
import { useAriaLiveNotifier } from "@/composables/ariaLiveNotifier";

const props = defineProps({
	element: {
		type: Object as PropType<RichTextElementResponse>,
		required: true,
	},
	isEditMode: { type: Boolean, required: true },
	columnIndex: { type: Number, required: true },
	elementIndex: { type: Number, required: true },
});

const emit = defineEmits(["delete:element"]);

const { modelValue } = useContentElementState(props);
const { ensurePoliteNotifications } = useAriaLiveNotifier();

const autofocus = ref(false);
const element = toRef(props, "element");
useBoardFocusHandler(element.value.id, ref(null), () => {
	autofocus.value = true;
});

const onDeleteElement = () => {
	emit("delete:element", element.value.id);
};

const onUpdateElement = (text: string) => {
	modelValue.value.text = text;
};

const onBlur = () => {
	autofocus.value = false;
};

const onKeyUp = () => ensurePoliteNotifications();

const isFirstElement = computed(() => props.elementIndex === 0);
</script>
<style lang="scss" scoped>
:deep(.ck-content) {
	overflow: hidden; // prevent margin collapse

	h4,
	h5 {
		margin-bottom: 8px;
		margin-top: 20px;
	}

	h4 {
		font-size: var(--heading-6);
		letter-spacing: 0.01em;
		font-weight: var(--font-weight-bold);
	}

	h5 {
		font-size: var(--text-md);
		letter-spacing: 0.015em;
	}

	p,
	ul,
	ol {
		font-size: var(--text-md);
		margin-bottom: 8px;
	}

	ul {
		list-style-type: circle;
	}

	.table {
		display: block;
		overflow-x: auto;
		overflow-y: hidden;
		padding-right: 1px;
		margin-bottom: 8px;
	}

	.math-tex {
		font-size: large;
	}
}

:deep(.ck.ck-editor__editable_inline) {
	padding: 0;
	margin-bottom: 16px;

	h4,
	h5 {
		margin-top: 20px;
	}

	p,
	ol,
	ul {
		margin-top: 0;
	}

	> :last-child {
		margin-bottom: 8px;
	}
}

:deep(
	.ck .ck-widget.ck-widget_with-selection-handle > .ck-widget__type-around
) {
	> .ck-widget__type-around__button_before {
		top: 8px;
		left: 8px;
		margin-left: 0;
	}

	> .ck-widget__type-around__button_after {
		bottom: 8px;
		right: 8px;
	}
}

.first-element > :is(h4, h5):first-child {
	margin-top: 0;
}
</style>
