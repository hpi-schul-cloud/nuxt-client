<template>
	<div>
		<RichTextContentElementDisplay
			v-if="!isEditMode"
			class="rich_text"
			:data-testid="`rich-text-display-${columnIndex}-${elementIndex}`"
			:value="element.content.text"
		/>
		<RichTextContentElementEdit
			v-if="isEditMode"
			class="rich_text"
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
</script>

<style lang="scss" scoped>
.rich_text {
	font-size: 1rem;
	padding: 0.05px; // prevent margin collapse
}

:deep(.ck.ck-editor__editable_inline) {
	padding: 0;

	h4:first-of-type,
	h5:first-of-type {
		margin-top: var(--space-md-2);
	}

	p,
	ol,
	ul {
		margin-top: 0;
	}

	> :last-child {
		margin-bottom: var(--space-xs);
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

:deep(.ck-content) {
	h4 {
		font-family: var(--font-accent);
		font-weight: var(--font-weight-bold);
		font-size: var(--heading-6);
		line-height: var(--line-height-md);
		letter-spacing: 0.01em;
		margin-bottom: var(--space-xs);
		margin-top: var(--space-md-2);
	}

	h5 {
		font-family: var(--font-accent);
		font-weight: var(--font-weight-bold);
		font-size: var(--text-md);
		line-height: var(--line-height-lg);
		letter-spacing: 0.015em;
		margin-bottom: var(--space-xs);
		margin-top: var(--space-md-2);
	}

	p,
	ul,
	ol {
		font-family: var(--font-primary);
		font-weight: var(--font-weight-normal);
		font-size: var(--text-md);
		line-height: var(--line-height-lg);
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

	.ck-widget.ck-widget_with-selection-handle:hover
		> .ck-widget__selection-handle {
		display: none;
	}

	.math-tex {
		font-size: large;
	}
}
</style>
