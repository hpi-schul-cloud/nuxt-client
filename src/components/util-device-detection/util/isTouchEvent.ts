let lastTouchDetection = new Date().getTime();

export const isTouchEvent = <T extends MouseEvent | TouchEvent>(
	evt: T
): boolean => {
	const now = new Date();
	if (!("touches" in evt)) {
		// not a touch event
		return false;
	}

	if (evt.touches[0]?.force < 1) {
		// a touch event with distinct information on the used force
		lastTouchDetection = now.getTime();
		return true;
	}

	// a non-touch-event on touch-capable device

	if (now.getTime() - lastTouchDetection < 200) {
		// interprete as touch-event if last touch-event happen less than 200 seconds ago
		return true;
	}

	return false;
};
