import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { envConfigModule, accountsModule } from "@/store";
import { Logger } from "@util-logger";

type SetRemainingTimeInSeconds = (remainingTime: number) => void;
type SetActive = (active: boolean, error: boolean) => void;
// feature for jwt timer reset is disabled in dev environments.
// we should probably check the feature flag directly?
const jwtTimerDisabled = () => {
	return process.env.NODE_ENV === "development";
};

let processing = false; // will be true for the time of extending the session
let retry = 0;
let totalRetry = 0;
const decRstIntervallSec = 20;
const updateIntervallMin = 2;
let decrementer: ReturnType<typeof setTimeout>;
let polling: ReturnType<typeof setTimeout>;

let lastUpdated: number;

const toast = {
	error401: -1,
	error: 0,
	success: 1,
};

const decrementRemainingTime = (
	remainingTimeInSeconds: number,
	setRemainingTimeInSeconds: SetRemainingTimeInSeconds,
	active: boolean,
	showWarningOnRemainingSeconds: number,
	setActive: SetActive
) => {
	return setTimeout(() => {
		if (remainingTimeInSeconds >= 60) {
			setRemainingTimeInSeconds(
				remainingTimeInSeconds - Math.floor((Date.now() - lastUpdated) / 1000)
			);
			if (
				!processing &&
				!active &&
				remainingTimeInSeconds <= showWarningOnRemainingSeconds
			) {
				setActive(true, false);
			}
			decrementRemainingTime(
				remainingTimeInSeconds,
				setRemainingTimeInSeconds,
				active,
				showWarningOnRemainingSeconds,
				setActive
			);
		}
	}, 1000 * decRstIntervallSec);
};

const updateRemainingTime = (
	setRemainingTimeInSeconds: SetRemainingTimeInSeconds
) => {
	if (jwtTimerDisabled()) {
		return;
	}
	return setInterval(
		async () => {
			try {
				const ttl = await accountsModule.getTTL();
				if (ttl > 0) {
					setRemainingTimeInSeconds(ttl);
				} else {
					Logger.error("Update remaining session time failed!");
				}
			} catch (error) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				if (error.response && error.response.status === 405) {
					Logger.warn(
						"Synchronization of remaining session time will be disabled until the next reload of the page. Reason: missing configuration in server"
					);
					clearInterval(polling);
				} else {
					Logger.error("Update remaining session time failed!");
				}
			}
		},
		1000 * 60 * updateIntervallMin
	);
};

const extendSession = async (
	remainingTimeInSeconds: number,
	setRemainingTimeInSeconds: SetRemainingTimeInSeconds,
	active: boolean,
	showWarningOnRemainingSeconds: number,
	setActive: SetActive,
	defaultRemainingTimeInSeconds: number,
	setToastValue: (value: number) => void
) => {
	if (jwtTimerDisabled()) {
		return Promise.resolve();
	}
	try {
		await accountsModule.resetJwtTimer();
		processing = false;
		totalRetry = 0;
		retry = 0;
		setToastValue(toast.success);
		if (remainingTimeInSeconds < 60) {
			decrementer = decrementRemainingTime(
				remainingTimeInSeconds,
				setRemainingTimeInSeconds,
				active,
				showWarningOnRemainingSeconds,
				setActive
			);
		}
		setRemainingTimeInSeconds(defaultRemainingTimeInSeconds);
	} catch (err) {
		setToastValue(toast.error);
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		if (err.response && err.response.status !== 405) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			if (err.response && err.response.status !== 401) {
				// retry 4 times before showing error
				if (retry < 4) {
					retry += 1;
					setTimeout(
						() => {
							extendSession(
								remainingTimeInSeconds,
								setRemainingTimeInSeconds,
								active,
								showWarningOnRemainingSeconds,
								setActive,
								defaultRemainingTimeInSeconds,
								setToastValue
							);
						},
						2 ** retry * 1000
					);
				} else {
					retry = 0;
					if (totalRetry) {
						setToastValue(toast.error);
					} else {
						setActive(true, true);
					}
					totalRetry += 1;
				}
			} else {
				setToastValue(toast.error401);
			}
		}
	}
};

@Module({
	name: "autoLogoutModule",
	namespaced: true,
	stateFactory: true,
})
export default class AutoLogoutModule extends VuexModule {
	active = false;
	error = false;
	remainingTimeInSeconds: number = 3600 * 2;
	showWarningOnRemainingSeconds = 3600;
	defaultRemainingTimeInSeconds: number = 3600 * 2;
	toastValue: number | null = null;

	get getActive(): boolean {
		return this.active;
	}

	get getError(): boolean {
		return this.error;
	}

	get getRemainingTimeInSeconds(): number {
		return this.remainingTimeInSeconds;
	}

	get getToastValue(): number | null {
		return this.toastValue;
	}

	@Mutation
	setActive(active: boolean, error: boolean): void {
		this.active = active;
		this.error = error;
	}

	@Mutation
	setRemainingTimeInSeconds(remainingTime: number): void {
		lastUpdated = Date.now();
		this.remainingTimeInSeconds = remainingTime;
	}

	@Mutation
	setInit(
		showWarningOnRemainingSeconds?: number,
		defaultRemainingTimeInSeconds?: number
	) {
		if (showWarningOnRemainingSeconds !== undefined) {
			this.showWarningOnRemainingSeconds = showWarningOnRemainingSeconds;
		}
		if (defaultRemainingTimeInSeconds !== undefined) {
			this.defaultRemainingTimeInSeconds = defaultRemainingTimeInSeconds;
		}
	}

	@Mutation
	setToastValue(value: number) {
		this.toastValue = value;
	}

	@Action
	init(): void {
		try {
			const { JWT_SHOW_TIMEOUT_WARNING_SECONDS, JWT_TIMEOUT_SECONDS } =
				envConfigModule.getEnv;

			this.setInit(JWT_SHOW_TIMEOUT_WARNING_SECONDS, JWT_TIMEOUT_SECONDS);

			if (!decrementer) {
				lastUpdated = Date.now();
				decrementer = decrementRemainingTime(
					this.remainingTimeInSeconds,
					this.setRemainingTimeInSeconds,
					this.active,
					this.showWarningOnRemainingSeconds,
					this.setActive
				);
			}
			if (!polling) {
				lastUpdated = Date.now();
				const newPolling = updateRemainingTime(this.setRemainingTimeInSeconds);
				if (newPolling !== undefined) {
					polling = newPolling;
				}
			}
		} catch (error) {
			Logger.error(error);
		}
	}

	@Action
	async extendSessionAction(): Promise<void> {
		try {
			processing = true;
			this.setActive(false, false);

			await extendSession(
				this.remainingTimeInSeconds,
				this.setRemainingTimeInSeconds,
				this.active,
				this.showWarningOnRemainingSeconds,
				this.setActive,
				this.defaultRemainingTimeInSeconds,
				this.setToastValue.bind(this)
			);
		} catch (error) {
			Logger.error(error);
		}
	}
}
