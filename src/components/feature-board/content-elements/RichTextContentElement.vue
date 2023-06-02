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
	.ck-content {
		h4 {
			font-style: normal;
			font-weight: 500;
			font-size: 20px;
			line-height: 24px;
			letter-spacing: 0.15px;
			color: #1b1b1b;
			margin: 0 0 0.5rem 0;
		}

		h5 {
			font-style: normal;
			font-weight: 500;
			font-size: 18px;
			line-height: 20px;
			letter-spacing: 0.1px;
			color: #1b1b1b;
			margin: 0 0 0.5rem 0;
		}

		ul {
			list-style-type: square;
		}
	}
}
</style>
