import { computed, Ref, ref } from "vue";
import { envConfigModule } from "./store-accessor";

export const useAutoLogout = () => {
	const jwtTimerDisabled = computed(
		() => process.env.NODE_ENV === "development"
	);

	const remainingTimeInSeconds = ref(30 * 2); // 1 minute
	const showWarningOnRemainingSeconds = ref(30);
	const active = ref(false); // TODO: better naming here
	const error = ref(false);
	const status: Ref<"success" | "retry" | "error"> = ref("success");
	const polling: ReturnType<typeof setInterval> | null = null;

	const { JWT_SHOW_TIMEOUT_WARNING_SECONDS, JWT_TIMEOUT_SECONDS } =
		envConfigModule.getEnv;

	showWarningOnRemainingSeconds.value = JWT_SHOW_TIMEOUT_WARNING_SECONDS || 30;
	remainingTimeInSeconds.value = JWT_TIMEOUT_SECONDS || 30 * 2;

	const remainingTimeInMinutes = computed(() =>
		Math.max(Math.floor(remainingTimeInSeconds.value / 60), 0)
	);

	const initSession = () => {
		if (polling) {
			clearInterval(polling);
		}
		setInterval(() => {
			remainingTimeInSeconds.value -= 1;
			if (remainingTimeInSeconds.value <= showWarningOnRemainingSeconds.value) {
				active.value = true;
			}
		}, 1000);
	};

	const extendSession = () => {
		remainingTimeInSeconds.value = JWT_TIMEOUT_SECONDS || 30 * 2;
		active.value = false;
	};

	return {
		jwtTimerDisabled,
		remainingTimeInSeconds,
		remainingTimeInMinutes,
		showWarningOnRemainingSeconds,
		active,
		error,
		status,
		extendSession,
		initSession,
	};
};
