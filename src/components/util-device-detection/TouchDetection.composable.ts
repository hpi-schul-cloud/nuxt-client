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

	useEventListener(
		"touchstart",
		(evt) => {
			isTouchDetected.value = true;
			console.log("isTouchDetected: true");
			console.log("touch event: ", evt.touches[0]);
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
			isTouchDetected.value = false;
			console.log("isTouchDetected: false");

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
