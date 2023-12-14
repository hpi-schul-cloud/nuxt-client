import { ref } from "vue";
import { useEventListener } from "@vueuse/core";
import { isTouchEvent } from "./util/isTouchEvent";

export const useTouchDetection = () => {
	const hasTouchCapability = "ontouchstart" in window || "touchstart" in window;

	const isTouchDetected = ref(hasTouchCapability);

	const handler = <T extends MouseEvent | TouchEvent>(evt: T) => {
		isTouchDetected.value = isTouchEvent(evt);
	};

	useEventListener("touchstart", (evt) => handler<TouchEvent>(evt), {
		capture: true,
	});

	useEventListener("mouseup", (evt) => handler<MouseEvent>(evt), {
		capture: true,
	});

	useEventListener("mousedown", (evt) => handler<MouseEvent>(evt), {
		capture: true,
	});

	return {
		isTouchDetected,
	};
};
