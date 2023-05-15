<template>
	<div>
		<ck-editor v-if="!editable" v-model="content" :disabled="true"></ck-editor>
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
import { defineComponent, ref, watch } from "vue";
import CkEditor from "@/components/editor/CKEditor.vue";

// eslint-disable-next-line vue/require-direct-export
export default defineComponent({
	name: "RichTextCardElement",
	components: { CkEditor },
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
