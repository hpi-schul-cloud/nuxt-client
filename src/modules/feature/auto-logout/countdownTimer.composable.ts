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
