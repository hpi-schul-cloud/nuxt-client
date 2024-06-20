<template>
	<div class="cursor-text">
		<ck-editor
			v-model="modelValue"
			:autofocus="autofocus"
			:placeholder="$t('components.cardElement.richTextElement.placeholder')"
			type="balloon"
			mode="simple"
			@update:value="onUpdateValue"
			@focus="onFocus"
			@blur="onBlur"
			@keyboard:delete="onDelete"
			@input="onInput"
		/>
	</div>
</template>
<script lang="ts">
import { CkEditor } from "@feature-editor";
import { useEventListener, useVModel } from "@vueuse/core";
import { defineComponent } from "vue";

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
	emits: ["blur", "delete:element", "input", "update:value"],
	setup(props, { emit }) {
		const modelValue = useVModel(props, "value", emit);
		const onUpdateValue = (newValue: string) => (modelValue.value = newValue);

		const onFocus = () => {
			const ckBalloonPanelElements =
				document.getElementsByClassName("ck-balloon-panel");

			for (const element of ckBalloonPanelElements) {
				useEventListener(element, "click", (event: PointerEvent) => {
					event.stopPropagation();
				});
			}
		};

		const onBlur = () => emit("blur");

		const onDelete = () => emit("delete:element");

		const onInput = (event: Event) => emit("input", event);

		return { modelValue, onFocus, onDelete, onBlur, onInput, onUpdateValue };
	},
});
</script>
<style scoped>
.cursor-text {
	cursor: text;
}
</style>
