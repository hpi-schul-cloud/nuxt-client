/* eslint-disable no-console */
class Logger {
	static log(...message: unknown[]) {
		console.log(...message);
	}

	static error(...message: unknown[]) {
		console.error(message);
	}
}

export default Logger;
