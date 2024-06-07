import { useAriaLiveNotifier } from "./ariaLiveNotifier";

describe("useAriaLiveNotifier", () => {
	it("should notify on screen reader", () => {
		jest.useFakeTimers();
		document.body.innerHTML = '<div id="notify-on-screen-reader"></div>';
		const { notifyOnScreenReader } = useAriaLiveNotifier();
		const element = document.getElementById("notify-on-screen-reader");
		const message = "Hey! This is a screen reader message";
		notifyOnScreenReader(message, "assertive");

		jest.advanceTimersByTime(3000);
		expect(element?.getAttribute("aria-live")).toBe("assertive");
		expect(element?.innerHTML).toBe(message);
	});
});
