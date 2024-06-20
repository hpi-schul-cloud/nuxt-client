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

	describe("queueScreenReaderNotifications", () => {
		describe("when queueing is activated", () => {
			it("should not output messages", () => {
				jest.useFakeTimers();
				const { notifyOnScreenReader, queueAriaLiveNotifications } =
					useAriaLiveNotifier();
				const element = document.getElementById(
					"notify-screen-reader-assertive"
				);
				const message1 = "Assertive screen reader message 1";

				queueAriaLiveNotifications();
				notifyOnScreenReader(message1, "assertive");

				jest.advanceTimersByTime(3000);
				expect(element?.innerHTML).toBe("");
			});
		});

		describe("when queueing is deactivated", () => {
			it("should notify all messages collected in the meantime", () => {
				jest.useFakeTimers();
				const {
					notifyOnScreenReader,
					queueAriaLiveNotifications,
					writeAllNotifications,
				} = useAriaLiveNotifier();
				const element = document.getElementById("notify-screen-reader-polite");
				const message1 = "Polite screen reader message 1";
				const message2 = "Polite screen reader message 2";

				queueAriaLiveNotifications();
				notifyOnScreenReader(message1, "polite");
				notifyOnScreenReader(message2, "polite");

				expect(element?.innerHTML).toBe("");

				writeAllNotifications();
				jest.advanceTimersByTime(3000);

				expect(element?.innerHTML).toBe(
					`<span>${message1}</span><span>${message2}</span>`
				);
			});
		});
	});
});
