/**
 * Composable for managing a countdown timer with second-by-second updates.
 * Useful for session timeouts, expiration warnings, or any time-based countdown.
 *
 * @param handleTimerTick - Callback invoked every second while the timer is running
 *
 * @returns remainingTimeInSeconds - Readonly ref with current remaining time in seconds
 * @returns remainingTimeInMinutes - Readonly computed ref with remaining time in minutes (rounded up)
 * @returns setTime - Set the remaining time to a specific value in seconds
 * @returns startTimer - Start the countdown (stops any existing timer first)
 * @returns stopTimer - Stop the countdown
 *
 * @example Basic usage:
 * ```ts
 * const { remainingTimeInSeconds, setTime, startTimer, stopTimer } = useCountdownTimer(() => {
 *   if (remainingTimeInSeconds.value <= 0) {
 *     handleExpired();
 *   }
 * });
 *
 * setTime(300); // 5 minutes
 * startTimer();
 * ```
 *
 * @example Display remaining time in minutes:
 * ```ts
 * const { remainingTimeInMinutes, setTime, startTimer } = useCountdownTimer(checkExpiration);
 * setTime(7200); // 2 hours
 * startTimer();
 * // remainingTimeInMinutes.value === 120
 * ```
 */

import { computed, onUnmounted, readonly, ref } from "vue";

export const useCountdownTimer = (handleTimerTick: () => void) => {
	const remainingTimeInSeconds = ref(0);
	const remainingTimeInMinutes = computed(() => Math.max(Math.ceil(remainingTimeInSeconds.value / 60), 0));
	let remainingTimeInterval: ReturnType<typeof setInterval> | null = null;

	const startTimer = () => {
		stopTimer();

		remainingTimeInterval = setInterval(() => {
			remainingTimeInSeconds.value -= 1;
			handleTimerTick();
		}, 1000);
	};

	const stopTimer = () => {
		if (remainingTimeInterval) {
			clearInterval(remainingTimeInterval);
			remainingTimeInterval = null;
		}
	};

	const setTime = (seconds: number) => {
		remainingTimeInSeconds.value = seconds;
	};

	onUnmounted(() => {
		stopTimer();
	});

	return {
		remainingTimeInSeconds: readonly(remainingTimeInSeconds),
		remainingTimeInMinutes: readonly(remainingTimeInMinutes),
		setTime,
		startTimer,
		stopTimer,
	};
};
