import { useAriaLiveNotifier } from "./ariaLiveNotifier";

describe("useAriaLiveNotifier", () => {
	beforeEach(() => {
		document.body.innerHTML = `
				<div>
					<div id="notify-screen-reader-polite"></div>
					<div id="notify-screen-reader-assertive"></div>
				</div>`;

		vi.useFakeTimers();
	});

	it("should notify on screen reader on 'aria-live=assertive' mode", () => {
		const { notifyOnScreenReader } = useAriaLiveNotifier();
		const element = document.getElementById("notify-screen-reader-assertive");
		const message = "Assertive screen reader message";
		notifyOnScreenReader(message, "assertive");

		vi.advanceTimersByTime(3000);
		expect(element?.textContent).toBe(message);
		expect(element?.children).toHaveLength(1);
		expect(element?.children[0].tagName).toBe("SPAN");
	});

	it("should notify on screen reader on 'aria-live=polite' mode", () => {
		const { notifyOnScreenReader } = useAriaLiveNotifier();
		const element = document.getElementById("notify-screen-reader-polite");
		const message = "Polite screen reader message";
		notifyOnScreenReader(message, "polite");

		vi.advanceTimersByTime(3000);
		expect(element?.textContent).toBe(message);
		expect(element?.children).toHaveLength(1);
		expect(element?.children[0].tagName).toBe("SPAN");
	});

	it("should treat markup in messages as plain text", () => {
		const { notifyOnScreenReader } = useAriaLiveNotifier();
		const element = document.getElementById("notify-screen-reader-polite");
		const message = '<img src=x onerror="alert(1)">';
		notifyOnScreenReader(message, "polite");

		vi.advanceTimersByTime(3000);
		expect(element?.children).toHaveLength(1);
		expect(element?.children[0].tagName).toBe("SPAN");
		expect(element?.children[0].textContent).toBe(message);
		expect(element?.querySelector("img")).toBeNull();
	});

	describe("ensurePoliteNotifications", () => {
		describe("when politeNotifications are ensured", () => {
			it("should notify all collected messages after some time without user interaction", () => {
				const { notifyOnScreenReader, ensurePoliteNotifications } = useAriaLiveNotifier();
				const element = document.getElementById("notify-screen-reader-polite");
				const message1 = "Polite screen reader message 1";
				const message2 = "Polite screen reader message 2";

				ensurePoliteNotifications();
				notifyOnScreenReader(message1, "polite");
				notifyOnScreenReader(message2, "polite");

				expect(element?.innerHTML).toBe("");

				vi.advanceTimersByTime(3000);

				expect(element?.children).toHaveLength(2);
				expect(element?.children[0].textContent).toBe(message1);
				expect(element?.children[1].textContent).toBe(message2);
			});
		});
	});
});
