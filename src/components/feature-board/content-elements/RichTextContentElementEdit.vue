<template>
	<div class="cursor-text">
		<ck-editor
			v-model="modelValue"
			:placeholder="
				$t('components.cardElement.richTextElement.placeholder').toString()
			"
      :focus="focus"
			mode="simple"
      @focus="onFocus"
			@keyboard:delete="onDelete"
		/>
	</div>
</template>
<script lang="ts">
import CkEditor from "@/components/common/editor/CKEditor.vue";
import { useEventListener, useVModel } from "@vueuse/core";
import { computed, defineComponent } from "vue";

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
		focus: { type: Boolean },
	},
	emits: ["update:value", "delete:element"],
	setup(props, { emit }) {
		const modelValue = useVModel(props, "value", emit);

		const onFocus = () => {
			const elements = computed(() =>
				document.getElementsByClassName("ck-balloon-panel")
			);

			for (const element of elements.value) {
				useEventListener(element, "click", (event: PointerEvent) => {
					event.stopPropagation();
				});
			}
		};

		const onDelete = () => {
			emit("delete:element");
		};

		return { modelValue, onFocus, onDelete };
	},
});
</script>
<style scoped>
.cursor-text {
	cursor: text;
}
</style>
