import { useDateConversion } from "@/composables/date-time-composables";
import { LanguageType } from "@/serverApi/v3";
import { useAppStore } from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { describe } from "vitest";

describe("date-time-composable", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	describe("date-time-composable", () => {
		it("should convert date string to date object", () => {
			useAppStore().$patch({ userLocale: LanguageType.De });
			const testDate = "31.12.2024";
			const {  convertDbGermanDateStringToDateString, convertIsoToDateString } =
				useDateConversion();

			expect(convertDbGermanDateStringToDateString("01.03.2022")).toEqual("01.03.2022");

			expect(convertDbGermanDateStringToDateString(testDate)).toEqual("31.12.2024");

			expect(convertIsoToDateString("2026-03-20T23:59:59.000Z")).toEqual("20.03.2026");
		});
	});
});
