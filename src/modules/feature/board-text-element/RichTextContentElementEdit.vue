<template>
	<InlineEditor
		v-model="modelValue.text"
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

<script setup lang="ts">
import { RichTextElementResponse } from "../../../serverApi/v3";
import { injectStrict } from "@/utils/inject";
import { useContentElementState } from "@data-board";
import { InlineEditor } from "@feature-editor";
import { useViewportOffsetTop } from "@ui-layout";
import { BOARD_IS_LIST_LAYOUT } from "@util-board";
import { useEventListener } from "@vueuse/core";
import { computed, PropType } from "vue";

const emit = defineEmits(["update:value", "delete:element", "blur"]); // TODO: define interfaces

const props = defineProps({
	element: {
		type: Object as PropType<RichTextElementResponse>,
		required: true,
	},
	isEditMode: { type: Boolean, required: true },
	autofocus: {
		type: Boolean,
		required: true,
	},
	columnIndex: {
		type: Number,
		required: true,
	},
});

const { modelValue } = useContentElementState(props);

const isListLayout = injectStrict(BOARD_IS_LIST_LAYOUT);
const offsetTop = computed(() => useViewportOffsetTop(props.columnIndex, isListLayout).offsetTop.value);

const onUpdateValue = (newValue: string) => {
	modelValue.value.text = newValue;
};

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
</script>
