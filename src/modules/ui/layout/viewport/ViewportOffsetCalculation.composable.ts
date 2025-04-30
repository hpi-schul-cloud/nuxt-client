import { computed } from "vue";

function calculateViewportOffsetTop(): number {
	const documentStyle = window.getComputedStyle(document.documentElement);

	const topbarHeight = documentStyle.getPropertyValue("--topbar-height");

	const wireframeHeader = document.getElementsByClassName(
		"wireframe-header"
	)[0] as HTMLElement;

	const staticOffsetTop = parseInt(topbarHeight) + wireframeHeader.offsetHeight;

	const currentColumnHeader = document.getElementsByClassName(
		"board-column-header"
	)[0] as HTMLElement;

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
