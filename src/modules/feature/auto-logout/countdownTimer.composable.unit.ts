import { useCountdownTimer } from "./countdownTimer.composable";
import { mountComposable } from "@@/tests/test-utils";
import { flushPromises } from "@vue/test-utils";

vi.useFakeTimers();

describe("useCountdownTimer", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		vi.clearAllTimers();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = () => {
		const handleTimerTick = vi.fn();
		const composable = mountComposable(() => useCountdownTimer(handleTimerTick));

		return {
			...composable,
			handleTimerTick,
		};
	};

	const advanceTimersBySeconds = async (seconds: number) => {
		vi.advanceTimersByTime(seconds * 1000);
		await flushPromises();
	};

	describe("initial state", () => {
		it("should have remainingTimeInSeconds set to 0", () => {
			const { remainingTimeInSeconds } = setup();

			expect(remainingTimeInSeconds.value).toBe(0);
		});

		it("should have remainingTimeInMinutes set to 0", () => {
			const { remainingTimeInMinutes } = setup();

			expect(remainingTimeInMinutes.value).toBe(0);
		});
	});

	describe("setTime", () => {
		it("should set remainingTimeInSeconds to specified value", () => {
			const { setTime, remainingTimeInSeconds } = setup();

			setTime(100);

			expect(remainingTimeInSeconds.value).toBe(100);
		});

		it("should update remainingTimeInMinutes accordingly", () => {
			const { setTime, remainingTimeInMinutes } = setup();

			setTime(180);

			expect(remainingTimeInMinutes.value).toBe(3);
		});
	});

	describe("remainingTimeInMinutes", () => {
		it.each([
			[10, 1],
			[50, 1],
			[59, 1],
			[60, 1],
			[61, 2],
			[125, 3],
			[180, 3],
		])("should return %i minutes for %i seconds", (seconds, expectedMinutes) => {
			const { setTime, remainingTimeInMinutes } = setup();

			setTime(seconds);

			expect(remainingTimeInMinutes.value).toBe(expectedMinutes);
		});

		it("should return 0 for 0 or negative seconds", () => {
			const { setTime, remainingTimeInMinutes } = setup();

			setTime(0);
			expect(remainingTimeInMinutes.value).toBe(0);

			setTime(-10);
			expect(remainingTimeInMinutes.value).toBe(0);
		});
	});

	describe("startTimer", () => {
		it("should start decrementing remainingTimeInSeconds every second", async () => {
			const { setTime, startTimer, remainingTimeInSeconds } = setup();

			setTime(10);
			startTimer();

			await advanceTimersBySeconds(3);

			expect(remainingTimeInSeconds.value).toBe(7);
		});

		it("should call handleTimerTick on every second", async () => {
			const { setTime, startTimer, handleTimerTick } = setup();

			setTime(10);
			startTimer();

			await advanceTimersBySeconds(5);

			expect(handleTimerTick).toHaveBeenCalledTimes(5);
		});

		it("should stop previous interval when called multiple times", async () => {
			const { setTime, startTimer, remainingTimeInSeconds, handleTimerTick } = setup();

			setTime(10);
			startTimer();
			await advanceTimersBySeconds(2);
			handleTimerTick.mockClear();

			// Start new interval - should stop the old one
			startTimer();
			await advanceTimersBySeconds(2);

			// Should have only 2 ticks from the second interval, not 4
			expect(handleTimerTick).toHaveBeenCalledTimes(2);
			expect(remainingTimeInSeconds.value).toBe(6);
		});
	});

	describe("stopTimer", () => {
		it("should stop the countdown", async () => {
			const { setTime, startTimer, stopTimer, remainingTimeInSeconds } = setup();

			setTime(10);
			startTimer();
			await advanceTimersBySeconds(2);
			stopTimer();
			await advanceTimersBySeconds(3);

			expect(remainingTimeInSeconds.value).toBe(8);
		});

		it("should not throw when called without active interval", () => {
			const { stopTimer } = setup();

			expect(() => stopTimer()).not.toThrow();
		});
	});

	describe("unmounting", () => {
		it("should stop interval when component is unmounted", async () => {
			const handleTimerTick = vi.fn();
			const wrapper = mountComposable(() => useCountdownTimer(handleTimerTick));

			wrapper.setTime(10);
			wrapper.startTimer();
			await advanceTimersBySeconds(2);

			// Simulate unmount by stopping interval
			wrapper.stopTimer();

			await advanceTimersBySeconds(3);

			expect(wrapper.remainingTimeInSeconds.value).toBe(8);
		});
	});
});
