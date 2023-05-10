<template>
	<ck-editor
		v-model="modelValue"
		:placeholder="$t('components.cardElement.richTextElement.placeholder')"
		mode="regular"
	/>
</template>
<script lang="ts">
import { useVModel } from "@vueuse/core";
import { defineComponent } from "vue";
import CkEditor from "@/components/editor/CKEditor.vue";

export default defineComponent({
	name: "RichTextContentElementEdit",
	components: { CkEditor },
	props: {
		value: {
			type: String,
			required: true,
		},
		autofocus: {
			type: Boolean,
			required: true,
		},
	},
	emits: ["update:value"],
	setup(props, { emit }) {
		const modelValue = useVModel(props, "value", emit);
		return { modelValue };
	},
});
</script>
