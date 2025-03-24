<template>
	<div class="cursor-text">
		<InlineEditor
			v-model="modelValue"
			:autofocus="autofocus"
			:placeholder="$t('components.cardElement.richTextElement.placeholder')"
			type="inline"
			mode="regular"
			:viewport-offset-top="ckeditorViewportOffsetTop"
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
		columnIndex: {
			type: Number,
			required: true,
		},
	},
	emits: ["update:value", "delete:element", "blur"],
	setup(props, { emit }) {
		const modelValue = ref("");

		const isListBoard = inject(BOARD_IS_LIST_LAYOUT, ref(false));

		const ckeditorViewportOffsetTop = computed(() => {
			const documentStyle = window.getComputedStyle(document.documentElement);

			const topbarHeight = documentStyle.getPropertyValue("--topbar-height");
			const breadcrumbsHeight = documentStyle.getPropertyValue(
				"--breadcrumbs-height"
			);
			const boardHeaderHeight = documentStyle.getPropertyValue(
				"--board-header-height"
			);

			const staticOffset =
				parseInt(topbarHeight) +
				parseInt(breadcrumbsHeight) +
				parseInt(boardHeaderHeight);

			let offset = 0;

			if (isListBoard.value) {
				offset = staticOffset;
			} else {
				const currentColumnHeader = document.querySelector<HTMLElement>(
					`.multi-column-board-column:nth-child(${props.columnIndex + 1}) #boardColumnHeader`
				);

				if (!currentColumnHeader) {
					throw new Error(
						`Could not find column header for column index ${props.columnIndex}`
					);
				}

				const height = currentColumnHeader.offsetHeight;

				const columnHeaderStyle = window.getComputedStyle(currentColumnHeader);
				const marginTop = columnHeaderStyle.getPropertyValue("margin-top");
				const marginBottom =
					columnHeaderStyle.getPropertyValue("margin-bottom");

				offset =
					staticOffset + height + parseInt(marginTop) + parseInt(marginBottom);
			}

			return offset;
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
