import { printQrCodes } from "./qr-code.utils";
import { createMock } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { logger } from "@util-logger";
import { setActivePinia } from "pinia";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("printQrCodes", () => {
	let mockWindow: Window;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		mockWindow = createMock<Window>({
			document: {
				documentElement: { innerHTML: "" },
				body: { appendChild: vi.fn() },
				createElement: vi.fn(() => ({
					appendChild: vi.fn(),
				})),
			},
			print: vi.fn(),
			close: vi.fn(),
		});
		vi.spyOn(window, "open").mockReturnValue(mockWindow);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("should open a new print window", () => {
		printQrCodes([{ qrContent: "https://example.com" }]);

		expect(window.open).toHaveBeenCalledWith("", "_blank");
	});

	it("should add QR code items to the document", () => {
		printQrCodes([{ qrContent: "https://example.com" }, { qrContent: "https://test.com" }]);

		expect(mockWindow.document.body.appendChild).toHaveBeenCalledTimes(1);
	});

	it("should trigger print and close the window", () => {
		printQrCodes([{ qrContent: "https://example.com" }]);

		expect(mockWindow.print).toHaveBeenCalled();
		expect(mockWindow.close).toHaveBeenCalled();
	});

	it("should handle empty array gracefully", () => {
		printQrCodes([]);

		expect(mockWindow.print).toHaveBeenCalled();
	});

	it("should not throw when window.open fails", () => {
		const warnSpy = vi.spyOn(logger, "warn").mockImplementation(vi.fn());

		vi.spyOn(window, "open").mockReturnValue(null);

		expect(() => printQrCodes([{ qrContent: "https://example.com" }])).not.toThrow();
		expect(warnSpy).toHaveBeenCalledWith("Could not open print window for QR codes.");
		//TODO: TEST IF SONARCLOUD IS STILL WORKING
	});
});
