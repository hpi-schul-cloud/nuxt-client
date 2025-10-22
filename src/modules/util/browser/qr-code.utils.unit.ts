import { printQrCodes } from "./qr-code.utils";
import { createMock } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("printQrCodes", () => {
	const mockWindow = createMock<Window>({
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

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		vi.spyOn(window, "open").mockReturnValue(mockWindow);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("should open a new print window", () => {
		printQrCodes([{ url: "https://example.com" }]);

		expect(window.open).toHaveBeenCalledWith("", "_blank");
	});

	it("should add QR code items to the document", () => {
		printQrCodes([{ url: "https://example.com" }, { url: "https://test.com" }]);

		expect(mockWindow.document.body.appendChild).toHaveBeenCalledTimes(2);
	});

	it("should trigger print and close the window", () => {
		printQrCodes([{ url: "https://example.com" }]);

		expect(mockWindow.print).toHaveBeenCalled();
		expect(mockWindow.close).toHaveBeenCalled();
	});

	it("should handle empty array gracefully", () => {
		printQrCodes([]);

		expect(mockWindow.print).toHaveBeenCalled();
	});

	it("should not throw when window.open fails", () => {
		vi.spyOn(window, "open").mockReturnValue(null);

		expect(() => printQrCodes([{ url: "https://example.com" }])).not.toThrow();
	});
});
