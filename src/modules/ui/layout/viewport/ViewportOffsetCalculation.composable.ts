import { computed } from "vue";

function calculateViewportOffsetTop(): number {
	const documentStyle = window.getComputedStyle(document.documentElement);

	const topbarHeight = documentStyle.getPropertyValue("--topbar-height");
	const breadcrumbsHeight = documentStyle.getPropertyValue(
		"--breadcrumbs-height"
	);
	const boardHeaderHeight = documentStyle.getPropertyValue(
		"--board-header-height"
	);

	const staticOffsetTop =
		parseInt(topbarHeight) +
		parseInt(breadcrumbsHeight) +
		parseInt(boardHeaderHeight);

	const currentColumnHeader = document.getElementById("boardColumnHeader");

	if (!currentColumnHeader) {
		return staticOffsetTop;
	}

	const height = currentColumnHeader.offsetHeight;

	const columnHeaderStyle = window.getComputedStyle(currentColumnHeader);
	const marginTop = columnHeaderStyle.getPropertyValue("margin-top");
	const marginBottom = columnHeaderStyle.getPropertyValue("margin-bottom");

	const offsetTop =
		staticOffsetTop + height + parseInt(marginTop) + parseInt(marginBottom);

	return offsetTop;
}

export const useViewportOffsetTop = () => {
	const offsetTop = computed(() => calculateViewportOffsetTop());

	return {
		offsetTop,
	};
};
