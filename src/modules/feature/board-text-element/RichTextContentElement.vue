<template>
	<div>
		<RichTextContentElementDisplay
			v-if="!isEditMode"
			:data-testid="`rich-text-display-${columnIndex}-${elementIndex}`"
			:value="element.content.text"
		/>
		<RichTextContentElementEdit
			v-if="isEditMode"
			:autofocus="autofocus"
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
import { PropType, ref, toRef } from "vue";
import RichTextContentElementDisplay from "./RichTextContentElementDisplay.vue";
import RichTextContentElementEdit from "./RichTextContentElementEdit.vue";
import { useAriaLiveNotifier } from "@/composables/ariaLiveNotifier";

const props = defineProps({
	element: {
		type: Object as PropType<RichTextElementResponse>,
		required: true,
	},
	isEditMode: {
		type: Boolean,
		required: true,
	},
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
</script>
<style lang="scss" scoped>
:deep(.ck-content) {
	overflow: hidden; // prevent margin collapse

	h4,
	h5 {
		font-family: var(--font-accent);
		font-weight: var(--font-weight-bold);
		margin-bottom: var(--space-xs);
		margin-top: var(--space-md-2);
	}

	h4 {
		font-size: var(--heading-6);
		letter-spacing: 0.01em;
	}

	h5 {
		font-size: var(--text-md);
		letter-spacing: 0.015em;
	}

	p,
	ul,
	ol {
		font-family: var(--font-primary);
		font-weight: var(--font-weight-normal);
		font-size: var(--text-md);
		margin-bottom: var(--space-xs);
	}

	ul {
		list-style-type: circle;
	}

	.table {
		display: block;
		overflow-x: auto;
		overflow-y: hidden;
		padding-right: 1px;
	}

	.math-tex {
		font-size: large;
	}
}

:deep(.ck.ck-editor__editable_inline) {
	padding: 0;

	p,
	ol,
	ul {
		margin-top: 0;
	}

	h4:first-of-type,
	h5:first-of-type {
		margin-top: var(--space-md-2);
	}
}

:deep(
		.ck .ck-widget.ck-widget_with-selection-handle > .ck-widget__type-around
	) {
	> .ck-widget__type-around__button_before {
		top: 0.5rem;
		left: 0.5rem;
		margin-left: 0;
	}

	> .ck-widget__type-around__button_after {
		bottom: 0.5rem;
		right: 0.5rem;
	}
}

:deep(
		.ck-widget.ck-widget_with-selection-handle:hover
			> .ck-widget__selection-handle
	) {
	display: none;
}
</style>
