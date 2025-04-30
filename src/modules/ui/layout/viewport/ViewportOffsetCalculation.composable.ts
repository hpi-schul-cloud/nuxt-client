import { computed, Ref } from "vue";

function calculateViewportOffsetTop(
	columnIndex: number,
	isListLayout: Ref<boolean>
): number {
	const documentStyle = window.getComputedStyle(document.documentElement);

	const topbarHeight = documentStyle.getPropertyValue("--topbar-height");
	const wireframeHeader =
		document.querySelector<HTMLElement>(".wireframe-header");

	const topbarAndWireframeHeaderHeight =
		parseFloat(topbarHeight) + (wireframeHeader?.offsetHeight ?? 0);

	if (isListLayout.value) {
		return topbarAndWireframeHeaderHeight;
	}

	const currentColumnHeader = document.querySelectorAll<HTMLElement>(
		".board-column-header"
	)[columnIndex];

	if (!currentColumnHeader) {
		return topbarAndWireframeHeaderHeight;
	}

	const columnHeaderHeight = currentColumnHeader.offsetHeight;

	const columnHeaderStyle = window.getComputedStyle(currentColumnHeader);
	const columnHeaderMarginTop =
		columnHeaderStyle.getPropertyValue("margin-top");
	const columnHeaderMarginBottom =
		columnHeaderStyle.getPropertyValue("margin-bottom");

	const offsetTop =
		topbarAndWireframeHeaderHeight +
		columnHeaderHeight +
		parseFloat(columnHeaderMarginTop) +
		parseFloat(columnHeaderMarginBottom);

	return offsetTop;
}

export const useViewportOffsetTop = (
	columnIndex: number,
	isListLayout: Ref<boolean>
) => {
	const offsetTop = computed(() =>
		calculateViewportOffsetTop(columnIndex, isListLayout)
	);

	return {
		offsetTop,
	};
};
