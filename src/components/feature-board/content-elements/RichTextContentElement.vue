<template>
	<div>
		<RichTextContentElementDisplay
			v-if="!isEditMode"
			class="rich_text"
			:value="modelValue.text"
		/>
		<RichTextContentElementEdit
			v-if="isEditMode"
			class="rich_text"
			:value="modelValue.text"
			@update:value="($event) => (modelValue.text = $event)"
			@delete:element="onDeleteElement"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useContentElementState } from "../state/ContentElementState.composable";
import { RichTextElementResponse } from "@/serverApi/v3";
import RichTextContentElementDisplay from "./RichTextContentElementDisplay.vue";
import RichTextContentElementEdit from "./RichTextContentElementEdit.vue";

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
		deleteElement: {
			type: Function as PropType<(elementId: string) => Promise<void>>,
			required: true,
		},
	},
	setup(props) {
		const { modelValue } = useContentElementState(props);

		const onDeleteElement = async (): Promise<void> => {
			await props.deleteElement(props.element.id);
		};

		return {
			modelValue,
			onDeleteElement,
		};
	},
});
</script>

<style lang="scss" scoped>
.rich_text {
	color: rgba(0, 0, 0, 0.87);
	font-size: 1rem;
	padding: 0.05px; // prevent margin collapse
}

::v-deep {
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
	}
}
</style>
