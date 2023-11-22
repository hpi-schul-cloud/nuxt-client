import { useEventListener } from "@vueuse/core";
import { ref } from "vue";

export const useTouchDetection = () => {
	const hasTouchCapability = "ontouchstart" in window; // what is the best condition?
	const hasTouchCapability2 = "touchstart" in window;
	const hasTouchCapability3 = navigator.maxTouchPoints >= 1;

	console.log("hasTouchCapability", hasTouchCapability);
	console.log("hasTouchCapability2", hasTouchCapability2);
	console.log("hasTouchCapability3", hasTouchCapability3);

	const isTouchDetected = ref(hasTouchCapability);
	let lastTouchDetection = new Date().getTime();

	const handler = <T extends MouseEvent | TouchEvent>(evt: T) => {
		const now = new Date();
		console.log("age", now.getTime() - lastTouchDetection);
		if ("touches" in evt) {
			console.log("touch event: ", JSON.stringify(evt.touches[0]));
			if ("touches" in evt && evt.touches[0].force >= 0.999) {
				if (now.getTime() - lastTouchDetection > 200) {
					isTouchDetected.value = false;
				}
				// stylus or mouse on touch-device
			} else {
				isTouchDetected.value = true;
				lastTouchDetection = now.getTime();
				console.log("lastTouchDetection", lastTouchDetection);
			}
		} else {
			isTouchDetected.value = false;
		}
	};

	useEventListener("touchstart", (evt) => handler<TouchEvent>(evt), {
		capture: true,
	});

	useEventListener("mousedown", (evt) => handler<MouseEvent>(evt), {
		capture: true,
	});

	return {
		isTouchDetected,
	};
};
