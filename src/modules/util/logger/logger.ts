/* eslint-disable no-console */
export type Logger = {
	info: (message: unknown, ...optionalParams: unknown[]) => void;
	warn: (message: unknown, ...optionalParams: unknown[]) => void;
	error: (message: unknown, ...optionalParams: unknown[]) => void;
	log: (message: unknown, ...optionalParams: unknown[]) => void;
};

const logger: Logger = {
	info: (message: unknown, ...optionalParams: unknown[]) => {
		console.log(
			`[INFO] ${new Date().toISOString()} -`,
			message,
			...optionalParams
		);
	},

	warn: (message: unknown, ...optionalParams: unknown[]) => {
		console.warn(
			`[WARN] ${new Date().toISOString()} -`,
			message,
			...optionalParams
		);
	},

	error: (message: unknown, ...optionalParams: unknown[]) => {
		console.error(
			`[ERROR] ${new Date().toISOString()} -`,
			message,
			...optionalParams
		);
	},

	log: (message: unknown, ...optionalParams: unknown[]) => {
		console.log(
			`[LOG] ${new Date().toISOString()} -`,
			message,
			...optionalParams
		);
	},
};

export { logger };
