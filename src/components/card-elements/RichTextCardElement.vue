<template>
	<div>
		<RenderHTML class="ck-content" :html="value" />
		<ck-editor
			v-if="editable"
			v-model="content"
			:placeholder="placeholder"
			:disabled="disabled"
			mode="simple"
			@input="handleInput"
			@focus="handleFocus"
			@blur="handleBlur"
		/>
	</div>
</template>

<script>
import { defineComponent, ref, watch, onMounted } from "vue";
import CkEditor from "@/components/editor/CKEditor.vue";
import renderMathInElement from "katex/dist/contrib/auto-render.js";
import RenderHTML from "@/components/render-html/RenderHTML.vue";

export default defineComponent({
	name: "RichTextCardElement",
	components: { CkEditor, RenderHTML },
	emits: ["input"],
	props: {
		value: {
			type: String,
			default: "",
		},
		placeholder: {
			type: String,
			default: "",
		},
		disabled: {
			type: Boolean,
		},
		editable: {
			type: Boolean,
		},
	},
	setup(props, { emit }) {
		onMounted(() => {
			const mathElements = document.getElementsByClassName("math-tex");

			for (const element of mathElements) {
				renderMathInElement(element);
			}
		});

		const content = ref(props.value);

		watch(
			() => props.value,
			(newValue) => {
				content.value = newValue;
			}
		);

		const handleInput = () => emit("input", content.value);
		const handleFocus = () => emit("focus");
		const handleBlur = () => emit("blur");

		return {
			content,
			handleInput,
			handleFocus,
			handleBlur,
		};
	},
});
</script>
