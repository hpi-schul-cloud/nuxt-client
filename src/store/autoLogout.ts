import {
	Module,
	VuexModule,
	Mutation,
	Action,
	getModule,
} from "vuex-module-decorators";
import { rootStore } from "./index";
import EnvConfigModule from "@/store/env-config";
import AccountsModule from "@/store/accounts";

let processing = false; // will be true for the time of extending the session
let retry = 0;
let totalRetry = 0;
const decRstIntervallSec = 20;
const updateIntervallMin = 2;
let decrementer: any = null;
let polling: any = null;

let lastUpdated: any = null;

const toast = {
	error401: -1,
	error: 0,
	success: 1,
};

const decrementRemainingTime: any = (
	remainingTimeInSeconds: any,
	setRemainingTimeInSeconds: any,
	active: any,
	showWarningOnRemainingSeconds: any,
	setActive: any
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

const updateRemainingTime = (setRemainingTimeInSeconds: any) => {
	return setInterval(async () => {
		try {
			const res: any = await AccountsModule.getTTL();
			if (res && res.ttl && Number.isInteger(res.ttl) && res.ttl > 0) {
				setRemainingTimeInSeconds(res.ttl);
			} else {
				console.error("Update remaining session time failed!");
			}
		} catch (error) {
			if (error.response && error.response.status === 405) {
				console.warn(
					"Synchronization of remaining session time will be disabled until the next reload of the page. Reason: missing configuration in server"
				);
				clearInterval(polling);
			} else {
				console.error("Update remaining session time failed!");
			}
		}
	}, 1000 * 60 * updateIntervallMin);
};

const extendSession = async (
	remainingTimeInSeconds: any,
	setRemainingTimeInSeconds: any,
	active: any,
	showWarningOnRemainingSeconds: any,
	setActive: any,
	defaultRemainingTimeInSeconds: any,
	setToastValue: any
) => {
	try {
		await AccountsModule.resetJwtTimer();
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
		if (err.response && err.response.status !== 405) {
			if (err.response && err.response.status !== 401) {
				// retry 4 times before showing error
				if (retry < 4) {
					retry += 1;
					setTimeout(() => {
						extendSession(
							remainingTimeInSeconds,
							setRemainingTimeInSeconds,
							active,
							showWarningOnRemainingSeconds,
							setActive,
							defaultRemainingTimeInSeconds,
							setToastValue
						);
					}, 2 ** retry * 1000);
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
	name: "autoLogout",
	namespaced: true,
	dynamic: true,
	store: rootStore,
	stateFactory: true,
})
export class AutoLogoutModule extends VuexModule {
	active: boolean = false;
	error: boolean = false;
	remainingTimeInSeconds: number = 3600 * 2;
	showWarningOnRemainingSeconds: number = 3600;
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
		this.showWarningOnRemainingSeconds = showWarningOnRemainingSeconds || 3600;
		this.defaultRemainingTimeInSeconds =
			defaultRemainingTimeInSeconds || 3600 * 2;
	}

	@Mutation
	setToastValue(value: number) {
		this.toastValue = value;
	}

	@Action
	init(): void {
		try {
			const { JWT_SHOW_TIMEOUT_WARNING_SECONDS, JWT_TIMEOUT_SECONDS } =
				EnvConfigModule.getEnv;

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
				polling = updateRemainingTime(this.setRemainingTimeInSeconds);
			}
		} catch (error) {
			console.error(error);
		}
	}

	@Action
	extendSessionAction(): void {
		try {
			processing = true;
			this.setActive(false, false);

			extendSession(
				this.remainingTimeInSeconds,
				this.setRemainingTimeInSeconds,
				this.active,
				this.showWarningOnRemainingSeconds,
				this.setActive,
				this.defaultRemainingTimeInSeconds,
				this.setToastValue
			);
		} catch (error) {
			console.error(error);
		}
	}
}

export default getModule(AutoLogoutModule);
