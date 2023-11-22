import { useEventListener } from "@vueuse/core";
import { ref } from "vue";

export const useTouchDetection = () => {
	const hasTouchCapability = "ontouchstart" in window; // what is the best condition?
	const hasTouchCapability2 = "touchstart" in window;
	const hasTouchCapability3 = navigator.maxTouchPoints >= 1;

	const isTouchDetected = ref(hasTouchCapability);
	let lastTouchDetection = new Date().getTime();
	console.log(".", lastTouchDetection);

	useEventListener(
		"touchstart",
		(evt) => {
			const now = new Date();
			console.log("age", now.getTime() - lastTouchDetection);
			if (evt.touches[0].force >= 0.999) {
				if (now.getTime() - lastTouchDetection > 200) {
					isTouchDetected.value = false;
				}
				// stylus or mouse on touch-device
			} else {
				isTouchDetected.value = true;
				lastTouchDetection = now.getTime();
				console.log("lastTouchDetection", lastTouchDetection);
			}
			console.log("lastTouchDetection", lastTouchDetection);
			console.log("touch event: ", evt.touches[0]);
			console.log("isTouchDetected:", isTouchDetected.value);
			console.log("onTouchStart", hasTouchCapability);
			console.log("touchstart", hasTouchCapability2);
			console.log("maxTouchPoints", hasTouchCapability3);
		},
		{
			capture: true,
		}
	);

	useEventListener(
		"mousedown",
		() => {
			const now = new Date();
			console.log("age", now.getTime() - lastTouchDetection);
			if (now.getTime() - lastTouchDetection > 200) {
				isTouchDetected.value = false;
			}
			console.log("isTouchDetected:", isTouchDetected.value);
			console.log("onTouchStart", hasTouchCapability);
			console.log("touchstart", hasTouchCapability2);
			console.log("maxTouchPoints", hasTouchCapability3);
		},
		{
			capture: true,
		}
	);

	return {
		isTouchDetected,
	};
};
