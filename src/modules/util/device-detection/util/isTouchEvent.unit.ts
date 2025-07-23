import { flushPromises } from "@vue/test-utils";
import { isTouchEvent } from "./isTouchEvent";

const createTouchEvent = (force: number) => ({
	clientX: 100,
	clientY: 100,
	pageX: 100,
	pageY: 100,
	screenX: 100,
	screenY: 100,
	radiusX: 2,
	radiusY: 2,
	rotationAngle: 20,
	identifier: 1,
	force,
	target: new EventTarget(),
});

describe(isTouchEvent.name, () => {
	describe("when mouse click event is fired", () => {
		it("should return false", async () => {
			const mouseEvent = new MouseEvent("mouseup", {});

			expect(isTouchEvent(mouseEvent)).toEqual(false);
		});
	});

	describe("when touch event is fired", () => {
		it("should return false", async () => {
			const touchEvent = new TouchEvent("touchstart", {
				touches: [createTouchEvent(0.5)],
			});

			expect(isTouchEvent(touchEvent)).toEqual(true);
		});
	});

	describe("when touch event is fired with non touch device", () => {
		it("should return false", async () => {
			vi.advanceTimersByTime(300);

			const touchEvent = new TouchEvent("touchstart", {
				touches: [createTouchEvent(1)],
			});

			expect(isTouchEvent(touchEvent)).toEqual(false);
		});
	});

	describe("when touch event is fired with non touch device but last touch event is less than 200 ms ago", () => {
		it("should return true", async () => {
			const touchEvent1 = new TouchEvent("touchstart", {
				touches: [createTouchEvent(0.5)],
			});
			isTouchEvent(touchEvent1);

			const touchEvent2 = new TouchEvent("touchstart", {
				touches: [createTouchEvent(1)],
			});

			expect(isTouchEvent(touchEvent2)).toEqual(true);
		});
	});
});
