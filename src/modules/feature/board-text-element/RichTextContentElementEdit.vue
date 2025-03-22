<template>
	<div class="cursor-text">
		<InlineEditor
			v-model="modelValue"
			:autofocus="autofocus"
			:placeholder="$t('components.cardElement.richTextElement.placeholder')"
			type="inline"
			mode="regular"
			@update:value="onUpdateValue"
			@focus="onFocus"
			@blur="onBlur"
			@keyboard:delete="onDelete"
		/>
	</div>
</template>
<script lang="ts">
import { InlineEditor } from "@feature-editor";
import { useEventListener } from "@vueuse/core";
import { defineComponent, onMounted, ref, watch } from "vue";

export default defineComponent({
	name: "RichTextContentElementEdit",
	components: { InlineEditor },
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
	emits: ["update:value", "delete:element", "blur"],
	setup(props, { emit }) {
		const modelValue = ref("");

		onMounted(() => {
			if (props.value !== undefined) {
				modelValue.value = props.value;
			}
		});

		watch(modelValue, (newValue) => {
			if (newValue !== props.value) {
				emit("update:value", newValue);
			}
		});

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

		const onBlur = () => {
			emit("update:value", modelValue.value);
			emit("blur");
		};

		const onDelete = () => emit("delete:element");

		return { modelValue, onFocus, onDelete, onBlur, onUpdateValue };
	},
});
</script>
<style scoped>
.cursor-text {
	cursor: text;
}

.ck.ck-toolbar {
	min-width: 450px;
}
</style>
