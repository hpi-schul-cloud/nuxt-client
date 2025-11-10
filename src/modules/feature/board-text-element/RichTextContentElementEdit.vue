<template>
	<InlineEditor
		v-model="modelValue.text"
		class="cursor-text"
		:autofocus="autofocus"
		:placeholder="$t('components.cardElement.richTextElement.placeholder')"
		:viewport-offset-top="offsetTop"
		@blur="onBlur"
		@focus="onFocus"
		@keyboard:delete="onDelete"
		@update:value="onUpdateValue"
	/>
</template>

<script setup lang="ts">
import { RichTextElementResponse } from "@/serverApi/v3";
import { injectStrict } from "@/utils/inject";
import { useContentElementState } from "@data-board";
import { InlineEditor } from "@feature-editor";
import { useViewportOffsetTop } from "@ui-layout";
import { BOARD_IS_LIST_LAYOUT } from "@util-board";
import { useEventListener } from "@vueuse/core";
import { computed, PropType } from "vue";

const props = defineProps({
	autofocus: {
		type: Boolean,
		required: true,
	},
	columnIndex: {
		type: Number,
		required: true,
	},
	element: {
		type: Object as PropType<RichTextElementResponse>,
		required: true,
	},
	isEditMode: { type: Boolean, required: true },
});

const emit = defineEmits<{
	(e: "delete:element"): void;
	(e: "blur"): void;
}>();

const { modelValue } = useContentElementState(props);

const isListLayout = injectStrict(BOARD_IS_LIST_LAYOUT);
const offsetTop = computed(() => useViewportOffsetTop(props.columnIndex, isListLayout).offsetTop.value);

const onBlur = () => emit("blur");

const onDelete = () => emit("delete:element");

const onFocus = () => {
	const ckBalloonPanelElements = document.getElementsByClassName("ck-balloon-panel");

	for (const element of ckBalloonPanelElements) {
		useEventListener(element, "click", (event: PointerEvent) => {
			event.stopPropagation();
		});
	}
};

const onUpdateValue = (newValue: string) => {
	modelValue.value.text = newValue;
};
</script>
