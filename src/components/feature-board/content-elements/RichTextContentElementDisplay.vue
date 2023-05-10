<template>
	<ck-editor v-model="content" disabled />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import CkEditor from "@/components/editor/CKEditor.vue";

export default defineComponent({
	name: "RichTextContentElementDisplay",
	components: { CkEditor },
	props: {
		value: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		const content = ref(props.value);

		watch(
			() => props.value,
			(newValue) => {
				content.value = newValue;
			}
		);
		return { content };
	},
});
</script>
