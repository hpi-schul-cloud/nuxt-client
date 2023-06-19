<template>
	<div>
		<RichTextContentElementDisplay
			v-if="!isEditMode"
			class="rich_text"
			:value="modelValue.text"
		/>
		<RichTextContentElementEdit
			v-if="isEditMode"
			class="rich_text offset"
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
.offset {
	margin-left: -0.6em;
}

.rich_text {
	color: rgba(0, 0, 0, 0.87);
	font-size: 1rem;
}

::v-deep {
	.ck.ck-editor__editable_inline > :first-child {
		margin-top: 0;
	}

	.ck-content {
		& > :first-child {
			margin-top: 0;
		}

		h4 {
			font-family: var(--font-primary);
			font-weight: var(--font-weight-bold);
			font-size: var(--text-md);
			line-height: var(--space-lg);
			margin-bottom: var(--space-xs);
			margin-top: var(--space-md-2);
		}

		h5 {
			font-family: var(--font-primary);
			font-weight: var(--font-weight-bold);
			font-size: 14px;
			line-height: var(--space-md-2);
			letter-spacing: 0.1px;
			margin-bottom: var(--space-xs);
			margin-top: var(--space-md-2); //
		}

		p,
		ul,
		ol {
			font-family: var(--font-primary);
			font-weight: var(--font-weight-normal);
			font-size: 14px;
			line-height: var(--space-md-2);
			letter-spacing: 0.02px;
			margin-bottom: var(--space-xs);
		}

		ul {
			list-style-type: circle;
		}
	}
}
</style>
