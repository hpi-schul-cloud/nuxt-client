import { ref } from "vue";

export const useTouchDetection = () => {
	const isTouchDevice = ref(false);

	const hasTouchCapability = "ontouchstart" in window;
	console.log("onTouchStart", hasTouchCapability);
	console.log("maxTouchPoints", navigator.maxTouchPoints >= 1);

	return {
		isTouchDevice,
	};
};
