<template>
	<InlineEditor
		v-model="modelValue"
		:autofocus="autofocus"
		:placeholder="$t('components.cardElement.richTextElement.placeholder')"
		class="cursor-text"
		:viewport-offset-top="offsetTop"
		@update:value="onUpdateValue"
		@focus="onFocus"
		@blur="onBlur"
		@keyboard:delete="onDelete"
	/>
</template>

<script lang="ts">
import { injectStrict } from "@/utils/inject";
import { InlineEditor } from "@feature-editor";
import { useViewportOffsetTop } from "@ui-layout";
import { BOARD_IS_LIST_LAYOUT } from "@util-board";
import { useEventListener } from "@vueuse/core";
import { computed, defineComponent, onMounted, ref, watch } from "vue";

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
		columnIndex: {
			type: Number,
			required: true,
		},
	},
	emits: ["update:value", "delete:element", "blur"],
	setup(props, { emit }) {
		const modelValue = ref("");

		const isListLayout = injectStrict(BOARD_IS_LIST_LAYOUT);
		const offsetTop = computed(() => useViewportOffsetTop(props.columnIndex, isListLayout).offsetTop.value);

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
			const ckBalloonPanelElements = document.getElementsByClassName("ck-balloon-panel");

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

		return {
			modelValue,
			offsetTop,
			onFocus,
			onDelete,
			onBlur,
			onUpdateValue,
		};
	},
});
</script>
