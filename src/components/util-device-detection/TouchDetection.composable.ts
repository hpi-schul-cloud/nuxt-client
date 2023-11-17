import { useEventListener } from "@vueuse/core";
import { ref } from "vue";

export const useTouchDetection = () => {
	const hasTouchCapability = "ontouchstart" in window; // what is the best condition?
	const hasTouchCapability2 = "touchstart" in window;
	const hasTouchCapability3 = navigator.maxTouchPoints >= 1;

	const isTouchDetected = ref(hasTouchCapability);

	console.log("onTouchStart", hasTouchCapability);
	console.log("touchstart", hasTouchCapability2);
	console.log("maxTouchPoints", hasTouchCapability3);

	useEventListener("touchstart", () => (isTouchDetected.value = true), {
		capture: true,
	});

	useEventListener("mousedown", () => (isTouchDetected.value = false), {
		capture: true,
	});

	return {
		isTouchDetected,
	};
};
