import { ref } from "vue";

export function useDrag() {
	const dragInProgressDelay = 300;
	const dragInProgress = ref(false);

	const isTouchDevice = () => window.ontouchstart !== undefined;

	const touchDelay = isTouchDevice() ? 200 : 20;

	const endDragging = () => {
		setTimeout(() => {
			dragInProgress.value = false;
		}, dragInProgressDelay);
	};

	const startDragging = () => {
		dragInProgress.value = true;
	};

	return {
		isTouchDevice,
		touchDelay,
		startDragging,
		endDragging,
		dragInProgress,
		dragInProgressDelay,
	};
}
