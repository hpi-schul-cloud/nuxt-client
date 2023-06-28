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
			:autofocus="isAutoFocus"
			:value="modelValue.text"
			@update:value="($event) => (modelValue.text = $event)"
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
	},
	setup(props) {
		const { modelValue, isAutoFocus } = useContentElementState(props);
		return { modelValue, isAutoFocus };
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

	.ck.ck-editor__editable_inline > :first-child {
		margin-top: var(--space-md-2);
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
			letter-spacing: 0.2px;
			margin-bottom: var(--space-xs);
			margin-top: var(--space-md-2);
		}

		h5 {
			font-family: var(--font-accent);
			font-weight: var(--font-weight-bold);
			font-size: var(--text-md);
			line-height: var(--line-height-lg);
			letter-spacing: 0.25px;
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
			margin-top: var(--space-md-2);
		}

		ul {
			list-style-type: circle;
		}
	}
}
</style>
