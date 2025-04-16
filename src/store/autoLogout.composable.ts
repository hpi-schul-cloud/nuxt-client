import { $axios } from "@/utils/api";
import { computed, Ref, ref, watch } from "vue";
import {
	accountsModule,
	authModule,
	envConfigModule,
	notifierModule,
} from "./store-accessor";
import { MeApiFactory } from "@/serverApi/v3";
import { useI18n } from "vue-i18n";

export const useAutoLogout = () => {
	const jwtTimerDisabled = computed(
		() => process.env.NODE_ENV === "development"
	);

	const { log } = console;

	const meApi = MeApiFactory(undefined, "/v3", $axios);

	const { t } = useI18n();
	const remainingTimeInSeconds = ref(30 * 2); // 1 minute
	const showWarningOnRemainingSeconds = ref(30);
	const active = ref(false); // TODO: better naming here
	const errorOnExtend = ref(false);
	const sessionStatus: Ref<
		"continued" | "shouldExtended" | "ended" | "error" | null
	> = ref(null);
	let polling: ReturnType<typeof setInterval> | null = null;
	const isTTLUpdated = ref(false);

	const { JWT_SHOW_TIMEOUT_WARNING_SECONDS, JWT_TIMEOUT_SECONDS } =
		envConfigModule.getEnv;

	showWarningOnRemainingSeconds.value = JWT_SHOW_TIMEOUT_WARNING_SECONDS || 30;
	remainingTimeInSeconds.value = JWT_TIMEOUT_SECONDS || 30 * 2;

	const remainingTimeInMinutes = computed(() =>
		Math.max(Math.floor(remainingTimeInSeconds.value / 60), 0)
	);

	const getTTL = async () => {
		try {
			const ttlCount = await accountsModule.getTTL();
			if (ttlCount > remainingTimeInSeconds.value) {
				remainingTimeInSeconds.value = ttlCount;
				isTTLUpdated.value = true;
			}
			return ttlCount;
		} catch {
			return -1;
		}
	};

	const createInterval = () => {
		if (polling) clearInterval(polling);

		polling = setInterval(async () => {
			remainingTimeInSeconds.value -= 1;

			if (remainingTimeInSeconds.value <= showWarningOnRemainingSeconds.value) {
				await getTTL();
				if (!isTTLUpdated.value) {
					active.value = true;
					sessionStatus.value = "shouldExtended";
				}
			}

			if (remainingTimeInSeconds.value <= 0) {
				sessionStatus.value = "ended";
				clearInterval(polling!);
				polling = null;
			}
		}, 1000);
	};

	const initSession = () => {
		createInterval();
		log("initSession-------", remainingTimeInSeconds.value);
	};

	const extendOrEndSession = async () => {
		if (sessionStatus.value === "ended") {
			clearInterval(polling!);
			authModule.logout();
			return;
		}

		try {
			const postTTL = await accountsModule.resetJwtTimer();
			log("postTTL", postTTL);
			const ttlCount = await getTTL();

			if (ttlCount > 0) {
				remainingTimeInSeconds.value = ttlCount;
				active.value = false;
				errorOnExtend.value = false;
				sessionStatus.value = "continued";
				isTTLUpdated.value = false;

				createInterval();
			}
		} catch {
			errorOnExtend.value = true;
			sessionStatus.value = "error";
		}
	};

	watch(
		() => sessionStatus.value,
		(newValue) => {
			if (newValue === "continued") {
				notifierModule.show({
					text: t("components.organisms.AutoLogoutWarning.success"),
					status: "success",
					timeout: 5000,
				});
			}
			if (newValue === "error") {
				notifierModule.show({
					text: t("components.organisms.AutoLogoutWarning.error"),
					status: "error",
					timeout: 5000,
				});
			}
			if (newValue === "ended") {
				notifierModule.show({
					text: t("components.organisms.AutoLogoutWarning.error.401"),
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
				log("createInterval in watcher");
				createInterval();
				isTTLUpdated.value = false;
			}
		}
	);

	return {
		active,
		errorOnExtend,
		jwtTimerDisabled,
		remainingTimeInMinutes,
		remainingTimeInSeconds,
		showWarningOnRemainingSeconds,
		extendOrEndSession,
		initSession,
	};
};
