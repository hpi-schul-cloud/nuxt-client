/* eslint-disable no-console */
import Logger from "./logger";

describe("Logger", () => {
	beforeEach(() => {
		jest.resetAllMocks();
		jest.spyOn(console, "log").mockImplementation(() => {
			// Intentionally left empty
		});
		jest.spyOn(console, "warn").mockImplementation(() => {
			// Intentionally left empty
		});
		jest.spyOn(console, "error").mockImplementation(() => {
			// Intentionally left empty
		});
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe("in non-production environment", () => {
		beforeEach(() => {
			process.env.NODE_ENV = "development";
		});

		it("should log info messages", () => {
			const message = "This is an info message";
			Logger.info(message);
			expect(console.log).toHaveBeenCalledWith(
				expect.stringContaining("[INFO]"),
				message
			);
		});

		it("should log warn messages", () => {
			const message = "This is a warning message";
			Logger.warn(message);
			expect(console.warn).toHaveBeenCalledWith(
				expect.stringContaining("[WARN]"),
				message
			);
		});

		it("should log error messages", () => {
			const message = "This is an error message";
			Logger.error(message);
			expect(console.error).toHaveBeenCalledWith(
				expect.stringContaining("[ERROR]"),
				message
			);
		});

		it("should log messages with log method", () => {
			const message = "This is a log message";
			Logger.log(message);
			expect(console.log).toHaveBeenCalledWith(
				expect.stringContaining("[LOG]"),
				message
			);
		});
	});

	describe("in production environment", () => {
		beforeEach(() => {
			process.env.NODE_ENV = "production";
		});

		it("should not log info messages", () => {
			Logger.info("This should not be logged");
			expect(console.log).not.toHaveBeenCalled();
		});

		it("should not log warn messages", () => {
			Logger.warn("This should not be logged");
			expect(console.warn).not.toHaveBeenCalled();
		});

		it("should log error messages", () => {
			const message = "This is an error message";
			Logger.error(message);
			expect(console.error).toHaveBeenCalledWith(
				expect.stringContaining("[ERROR]"),
				message
			);
		});

		it("should not log messages with log method", () => {
			Logger.log("This should not be logged");
			expect(console.log).not.toHaveBeenCalled();
		});
	});
});
