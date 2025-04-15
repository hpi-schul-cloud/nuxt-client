import { $axios } from "@/utils/api";
import { computed, Ref, ref } from "vue";
import { accountsModule, envConfigModule } from "./store-accessor";
import { MeApiFactory } from "@/serverApi/v3";

export const useAutoLogout = () => {
	const jwtTimerDisabled = computed(
		() => process.env.NODE_ENV === "development"
	);

	const meApi = MeApiFactory(undefined, "/v3", $axios);

	const remainingTimeInSeconds = ref(30 * 2); // 1 minute
	const showWarningOnRemainingSeconds = ref(30);
	const active = ref(false); // TODO: better naming here
	const error = ref(false);
	const status: Ref<"success" | "retry" | "error"> = ref("success");
	let polling: ReturnType<typeof setInterval> | null = null;

	const { JWT_SHOW_TIMEOUT_WARNING_SECONDS, JWT_TIMEOUT_SECONDS } =
		envConfigModule.getEnv;

	showWarningOnRemainingSeconds.value = JWT_SHOW_TIMEOUT_WARNING_SECONDS || 30;
	remainingTimeInSeconds.value = JWT_TIMEOUT_SECONDS || 30 * 2;

	const remainingTimeInMinutes = computed(() =>
		Math.max(Math.floor(remainingTimeInSeconds.value / 60), 0)
	);

	const createInterval = () => {
		if (polling) clearInterval(polling);

		polling = setInterval(() => {
			remainingTimeInSeconds.value -= 1;
			if (remainingTimeInSeconds.value <= showWarningOnRemainingSeconds.value) {
				active.value = true;
			}
		}, 1000);
	};

	const initSession = () => {
		createInterval();
	};

	const extendSession = async () => {
		try {
			await meApi.meControllerMe();
			const ttlCount = await accountsModule.getTTL();

			if (ttlCount > 0) {
				remainingTimeInSeconds.value = ttlCount;
				active.value = false;
				error.value = false;
				status.value = "success";
				createInterval();
			}
		} catch {
			error.value = true;
			status.value = "error";
		}
	};

	return {
		active,
		error,
		jwtTimerDisabled,
		remainingTimeInMinutes,
		remainingTimeInSeconds,
		showWarningOnRemainingSeconds,
		status,
		extendSession,
		initSession,
	};
};
