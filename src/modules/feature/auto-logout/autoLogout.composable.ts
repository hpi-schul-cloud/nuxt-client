import { computed, Ref, ref, watch } from "vue";
import { authModule, envConfigModule, notifierModule } from "@/store";
import { useI18n } from "vue-i18n";
import { $axios } from "@/utils/api";

export enum SessionStatus {
	Continued = "continued",
	ShouldExtended = "shouldExtended",
	Ended = "ended",
	Error = "error",
}

export const useAutoLogout = () => {
	const { t } = useI18n();
	const showDialog = ref(false);
	const errorOnExtend = ref(false);
	const sessionStatus: Ref<SessionStatus | null> = ref(
		null as unknown as SessionStatus
	);
	const isTTLUpdated = ref(false);

	let remainingTimePolling: ReturnType<typeof setInterval> | null = null;
	let ttlTimeoutPolling: ReturnType<typeof setTimeout> | null = null;
	let retry = 0;

	const { JWT_SHOW_TIMEOUT_WARNING_SECONDS, JWT_TIMEOUT_SECONDS } =
		envConfigModule.getEnv;

	const showWarningOnRemainingSeconds = ref(
		JWT_SHOW_TIMEOUT_WARNING_SECONDS || 45
	);
	const remainingTimeInSeconds = ref(JWT_TIMEOUT_SECONDS || 30 * 2);

	const remainingTimeInMinutes = computed(() =>
		Math.max(Math.floor(remainingTimeInSeconds.value / 60), 0)
	);

	const checkTTL = async () => {
		let ttlCount = 0;

		if (ttlTimeoutPolling) {
			return ttlCount;
		}

		ttlTimeoutPolling = setTimeout(
			async () => {
				retry++;
				try {
					const response = await $axios.get("/v1/accounts/jwtTimer");
					ttlCount = response.data.ttl;

					if (ttlCount > remainingTimeInSeconds.value) {
						isTTLUpdated.value = true;
						showDialog.value = false;
					} else {
						showDialog.value = true;
					}
					return ttlCount;
				} catch {
					sessionStatus.value = SessionStatus.Error;
					return -1;
				} finally {
					if (ttlTimeoutPolling) {
						clearInterval(ttlTimeoutPolling);
						ttlTimeoutPolling = null;
					}
				}
			},
			2 ** retry * 1000
		);
	};

	const createSession = () => {
		if (remainingTimePolling) {
			clearInterval(remainingTimePolling);
			remainingTimePolling = null;
		}
		if (ttlTimeoutPolling) {
			clearTimeout(ttlTimeoutPolling);
			ttlTimeoutPolling = null;
		}

		showWarningOnRemainingSeconds.value = JWT_SHOW_TIMEOUT_WARNING_SECONDS;
		remainingTimeInSeconds.value = JWT_TIMEOUT_SECONDS || 30 * 2;
		if (showDialog.value) showDialog.value = false;

		sessionStatus.value = null;
		errorOnExtend.value = false;
		isTTLUpdated.value = false;
		retry = 0;

		remainingTimePolling = setInterval(async () => {
			remainingTimeInSeconds.value -= 1;

			if (remainingTimeInSeconds.value <= showWarningOnRemainingSeconds.value) {
				sessionStatus.value = null;
				await checkTTL();
			}

			if (remainingTimeInSeconds.value <= 0) {
				sessionStatus.value = SessionStatus.Ended;
				clearInterval(remainingTimePolling!);
				remainingTimePolling = null;
			}
		}, 1000);
	};

	const extendSession = async () => {
		clearTimeout(ttlTimeoutPolling!);
		if (sessionStatus.value === SessionStatus.Ended) {
			clearInterval(remainingTimePolling!);
			authModule.logout();
			return;
		}

		try {
			await $axios.post("/v1/accounts/jwtTimer");
			const response = await $axios.get("/v1/accounts/jwtTimer");
			const ttlCount = response.data.ttl;

			if (ttlCount > remainingTimeInSeconds.value) {
				remainingTimeInSeconds.value = ttlCount;
				showDialog.value = false;
				errorOnExtend.value = false;
				isTTLUpdated.value = true;

				createSession();
				retry = 0;
			}
			sessionStatus.value = SessionStatus.Continued;
		} catch {
			errorOnExtend.value = true;
			sessionStatus.value = SessionStatus.Error;
		}
	};

	watch(
		() => sessionStatus.value,
		(newValue) => {
			if (newValue === SessionStatus.Continued) {
				notifierModule.show({
					text: t("feature-autoLogout.message.success"),
					status: "success",
					timeout: 5000,
				});
			}
			if (newValue === SessionStatus.Error) {
				notifierModule.show({
					text: t("feature-autoLogout.message.error"),
					status: "error",
					timeout: 5000,
				});
			}
			if (newValue === SessionStatus.Ended) {
				notifierModule.show({
					text: t("feature-autoLogout.message.error.401"),
					status: "error",
					autoClose: false,
				});
			}
		}
	);

	watch(
		() => isTTLUpdated.value,
		(newValue) => {
			if (newValue) {
				createSession();
				isTTLUpdated.value = false;
			}
		}
	);

	return {
		errorOnExtend,
		isTTLUpdated,
		remainingTimeInMinutes,
		remainingTimeInSeconds,
		sessionStatus,
		showDialog,
		showWarningOnRemainingSeconds,
		createSession,
		extendSession,
	};
};
