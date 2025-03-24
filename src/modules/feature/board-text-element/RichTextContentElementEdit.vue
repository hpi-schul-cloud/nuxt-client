<template>
	<div class="cursor-text">
		<InlineEditor
			v-model="modelValue"
			:autofocus="autofocus"
			:placeholder="$t('components.cardElement.richTextElement.placeholder')"
			type="inline"
			mode="regular"
			:viewportOffsetTop="ckeditorViewportOffsetTop"
			@update:value="onUpdateValue"
			@focus="onFocus"
			@blur="onBlur"
			@keyboard:delete="onDelete"
		/>
	</div>
</template>
<script lang="ts">
import { InlineEditor } from "@feature-editor";
import { BOARD_IS_LIST_LAYOUT } from "@util-board";
import { useEventListener } from "@vueuse/core";
import { computed, defineComponent, inject, onMounted, ref, watch } from "vue";

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

		const isListBoard = inject(BOARD_IS_LIST_LAYOUT, ref(false));
		const ckeditorViewportOffsetTop = computed(() => {
			const topbarHeight = window
				.getComputedStyle(document.documentElement)
				.getPropertyValue("--topbar-height");

			const breadcrumbsHeight = window
				.getComputedStyle(document.documentElement)
				.getPropertyValue("--breadcrumbs-height");

			const boardHeaderHeight = window
				.getComputedStyle(document.documentElement)
				.getPropertyValue("--board-header-height");

			const staticOffsetTop =
				parseInt(topbarHeight) +
				parseInt(breadcrumbsHeight) +
				parseInt(boardHeaderHeight);

			// TODO: Get this value from CSS.
			const columnHeaderHeight = 76;

			return isListBoard.value
				? staticOffsetTop
				: staticOffsetTop + columnHeaderHeight;
		});

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

		return {
			modelValue,
			ckeditorViewportOffsetTop,
			onFocus,
			onDelete,
			onBlur,
			onUpdateValue,
		};
	},
});
</script>
<style scoped>
.cursor-text {
	cursor: text;
}
</style>
