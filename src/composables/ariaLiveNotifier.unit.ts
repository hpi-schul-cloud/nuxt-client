import { useAriaLiveNotifier } from "./ariaLiveNotifier";

describe("useAriaLiveNotifier", () => {
	beforeEach(() => {
		document.body.innerHTML = `
				<div>
					<div id="notify-screen-reader-polite"></div>
					<div id="notify-screen-reader-assertive"></div>
				</div>`;
	});
	it("should notify on screen reader on 'aria-live=assertive' mode", () => {
		jest.useFakeTimers();
		const { notifyOnScreenReader } = useAriaLiveNotifier();
		const element = document.getElementById("notify-screen-reader-assertive");
		const message = "Assertive screen reader message";
		notifyOnScreenReader(message, "assertive");

		jest.advanceTimersByTime(3000);
		expect(element?.innerHTML).toBe(`<span>${message}</span>`);
	});

	it("should notify on screen reader on 'aria-live=polite' mode", () => {
		jest.useFakeTimers();
		const { notifyOnScreenReader } = useAriaLiveNotifier();
		const element = document.getElementById("notify-screen-reader-polite");
		const message = "Polite screen reader message";
		notifyOnScreenReader(message, "polite");

		jest.advanceTimersByTime(3000);
		expect(element?.innerHTML).toBe(`<span>${message}</span>`);
	});
});
