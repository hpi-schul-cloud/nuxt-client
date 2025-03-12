/* eslint-disable no-console */
import { logger } from "./logger";

describe("logger", () => {
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

		it("should log info messages with optionalParams", () => {
			const message = "This is an info message";
			const optionalParams = ["additional", "info"];
			logger.info(message, ...optionalParams);
			expect(console.log).toHaveBeenCalledWith(
				expect.stringContaining("[INFO]"),
				message,
				...optionalParams
			);
		});

		it("should log warn messages with optionalParams", () => {
			const message = "This is a warning message";
			const optionalParams = ["additional", "warning"];
			logger.warn(message, ...optionalParams);
			expect(console.warn).toHaveBeenCalledWith(
				expect.stringContaining("[WARN]"),
				message,
				...optionalParams
			);
		});

		it("should log error messages with optionalParams", () => {
			const message = "This is an error message";
			const optionalParams = ["additional", "error"];
			logger.error(message, ...optionalParams);
			expect(console.error).toHaveBeenCalledWith(
				expect.stringContaining("[ERROR]"),
				message,
				...optionalParams
			);
		});

		it("should log messages with log method and optionalParams", () => {
			const message = "This is a log message";
			const optionalParams = ["additional", "log"];
			logger.log(message, ...optionalParams);
			expect(console.log).toHaveBeenCalledWith(
				expect.stringContaining("[LOG]"),
				message,
				...optionalParams
			);
		});

		// Neue Tests für verschiedene Nachrichtentypen und optionale Parameter
		it("should log info messages with different types of messages", () => {
			const message = { text: "This is an object message" };
			logger.info(message);
			expect(console.log).toHaveBeenCalledWith(
				expect.stringContaining("[INFO]"),
				message
			);
		});

		it("should log warn messages with different types of messages", () => {
			const message = { text: "This is an object message" };
			logger.warn(message);
			expect(console.warn).toHaveBeenCalledWith(
				expect.stringContaining("[WARN]"),
				message
			);
		});
	});

	describe("in production environment", () => {
		beforeEach(() => {
			process.env.NODE_ENV = "production";
		});

		it("should not log info messages with optionalParams", () => {
			logger.info("This should not be logged", "additional", "info");
			expect(console.log).not.toHaveBeenCalled();
		});

		it("should not log warn messages with optionalParams", () => {
			logger.warn("This should not be logged", "additional", "warning");
			expect(console.warn).not.toHaveBeenCalled();
		});

		it("should log error messages with optionalParams", () => {
			const message = "This is an error message";
			const optionalParams = ["additional", "error"];
			logger.error(message, ...optionalParams);
			expect(console.error).toHaveBeenCalledWith(
				expect.stringContaining("[ERROR]"),
				message,
				...optionalParams
			);
		});

		it("should not log messages with log method and optionalParams", () => {
			logger.log("This should not be logged", "additional", "log");
			expect(console.log).not.toHaveBeenCalled();
		});

		// Neue Tests für verschiedene Nachrichtentypen und optionale Parameter
		it("should not log info messages with different types of messages", () => {
			const message = { text: "This is an object message" };
			logger.info(message);
			expect(console.log).not.toHaveBeenCalled();
		});

		it("should not log warn messages with different types of messages", () => {
			const message = { text: "This is an object message" };
			logger.warn(message);
			expect(console.warn).not.toHaveBeenCalled();
		});
	});
});
