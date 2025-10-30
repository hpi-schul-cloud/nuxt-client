export const getGridContainerColumnsCount = (gridElement: HTMLElement | undefined | null) => {
	if (!gridElement) return 1;
	const style = window.getComputedStyle(gridElement);
	return style.gridTemplateColumns.split(" ").length;
};
