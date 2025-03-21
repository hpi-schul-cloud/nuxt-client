<template>
	<div>
		<RichTextContentElementDisplay
			v-if="!isEditMode"
			class="rich_text"
			:value="element.content.text"
		/>
		<RichTextContentElementEdit
			v-if="isEditMode"
			class="rich_text"
			:autofocus="autofocus"
			:value="modelValue.text"
			@update:value="onUpdateElement"
			@delete:element="onDeleteElement"
			@blur="onBlur"
			@keyup.capture="onKeyUp"
		/>
	</div>
</template>

<script lang="ts">
import { RichTextElementResponse } from "@/serverApi/v3";
import { useBoardFocusHandler, useContentElementState } from "@data-board";
import { defineComponent, PropType, ref, toRef } from "vue";
import RichTextContentElementDisplay from "./RichTextContentElementDisplay.vue";
import RichTextContentElementEdit from "./RichTextContentElementEdit.vue";
import { useAriaLiveNotifier } from "@/composables/ariaLiveNotifier";

export default defineComponent({
	name: "RichTextContentElement",
	components: {
		RichTextContentElementDisplay,
		RichTextContentElementEdit,
	},
	props: {
		element: {
			type: Object as PropType<RichTextElementResponse>,
			required: true,
		},
		isEditMode: { type: Boolean, required: true },
	},
	emits: ["delete:element"],
	setup(props, { emit }) {
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

		return {
			autofocus,
			modelValue,
			onBlur,
			onDeleteElement,
			onKeyUp,
			onUpdateElement,
		};
	},
});
</script>

<style lang="scss" scoped>
.rich_text {
	font-size: 1rem;
	padding: 0.05px; // prevent margin collapse
}

:deep() {
	.ck.ck-editor__editable_inline {
		padding: 0;
	}

	.ck.ck-editor__editable_inline h4:first-of-type,
	.ck.ck-editor__editable_inline h5:first-of-type {
		margin-top: var(--space-md-2);
	}

	.ck.ck-editor__editable_inline p,
	.ck.ck-editor__editable_inline ol,
	.ck.ck-editor__editable_inline ul {
		margin-top: 0;
	}

	.ck.ck-editor__editable_inline > :last-child {
		margin-bottom: var(--space-xs);
	}

	.ck-content {
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
	}
}
</style>
