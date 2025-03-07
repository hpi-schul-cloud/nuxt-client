/* eslint-disable no-console */
const isProduction = process.env.NODE_ENV === "production";

class Logger {
	static info(message: unknown, ...optionalParams: unknown[]) {
		if (!isProduction) {
			console.log(
				`[INFO] ${new Date().toISOString()} -`,
				message,
				...optionalParams
			);
		}
	}

	static warn(message: unknown, ...optionalParams: unknown[]) {
		if (!isProduction) {
			console.warn(
				`[WARN] ${new Date().toISOString()} -`,
				message,
				...optionalParams
			);
		}
	}

	static error(message: unknown, ...optionalParams: unknown[]) {
		console.error(
			`[ERROR] ${new Date().toISOString()} -`,
			message,
			...optionalParams
		);
	}

	static log(message: unknown, ...optionalParams: unknown[]) {
		if (!isProduction) {
			console.log(
				`[LOG] ${new Date().toISOString()} -`,
				message,
				...optionalParams
			);
		}
	}
}

export default Logger;
