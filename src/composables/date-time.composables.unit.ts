import { useLocalizedDateTime } from "@/composables/date-time.composables";
import { LanguageType } from "@/serverApi/v3";
import { useAppStore } from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { describe, expect, it } from "vitest";

describe("date-time-composable", () => {
	beforeAll(() => {
		setActivePinia(createTestingPinia());
	});

	describe("useLocalizedDateTime", () => {
		describe("datePlaceHolder", () => {
			it.each([
				{ locale: LanguageType.De, expected: "TT.MM.JJJJ" },
				{ locale: LanguageType.En, expected: "DD/MM/YYYY" },
				{ locale: LanguageType.Es, expected: "DD/MM/AAAA" },
				{ locale: LanguageType.Uk, expected: "ДД.ММ.РРРР" },
			])("should return '$expected' for locale '$locale'", async ({ locale, expected }) => {
				useAppStore().$patch({ userLocale: locale });
				const { datePlaceHolder } = useLocalizedDateTime();

				expect(datePlaceHolder.value).toEqual(expected);
			});
		});

		describe("dateMask", () => {
			it.each([
				{ locale: LanguageType.De, expected: "##.##.####" },
				{ locale: LanguageType.En, expected: "##/##/####" },
				{ locale: LanguageType.Es, expected: "##/##/####" },
				{ locale: LanguageType.Uk, expected: "##.##.####" },
			])("should return '$expected' for locale '$locale'", ({ locale, expected }) => {
				useAppStore().$patch({ userLocale: locale });
				const { dateMask } = useLocalizedDateTime();

				expect(dateMask.value).toEqual(expected);
			});
		});

		describe("dateRegex", () => {
			it.each([
				{
					locale: LanguageType.De,
					validDates: ["31.12.2024", "01.01.2000", "15.06.1999"],
					invalidDates: ["32.12.2024", "00.01.2000", "15.13.1999", "2024-12-31"],
				},
				{
					locale: LanguageType.En,
					validDates: ["31/12/2024", "01/01/2000", "15/06/1999"],
					invalidDates: ["32/12/2024", "00/01/2000", "15/13/1999", "2024-12-31"],
				},
				{
					locale: LanguageType.Es,
					validDates: ["31/12/2024", "01/01/2000", "15/06/1999"],
					invalidDates: ["32/12/2024", "00/01/2000", "15/13/1999", "2024-12-31"],
				},
				{
					locale: LanguageType.Uk,
					validDates: ["31.12.2024", "01.01.2000", "15.06.1999"],
					invalidDates: ["32.12.2024", "00.01.2000", "15.13.1999", "2024-12-31"],
				},
			])("should validate dates correctly for locale '$locale'", ({ locale, validDates, invalidDates }) => {
				useAppStore().$patch({ userLocale: locale });
				const { dateRegex } = useLocalizedDateTime();

				validDates.forEach((date) => {
					expect(dateRegex.value.test(date), `Expected '${date}' to be valid`).toBe(true);
				});

				invalidDates.forEach((date) => {
					expect(dateRegex.value.test(date), `Expected '${date}' to be invalid`).toBe(false);
				});
			});
		});

		describe("timeRegex", () => {
			it("should validate valid times", () => {
				const { timeRegex } = useLocalizedDateTime();

				expect(timeRegex.test("00:00")).toBe(true);
				expect(timeRegex.test("12:30")).toBe(true);
				expect(timeRegex.test("23:59")).toBe(true);
				expect(timeRegex.test("09:05")).toBe(true);
			});

			it("should reject invalid times", () => {
				const { timeRegex } = useLocalizedDateTime();

				expect(timeRegex.test("24:00")).toBe(false);
				expect(timeRegex.test("12:60")).toBe(false);
				expect(timeRegex.test("1:30")).toBe(false);
				expect(timeRegex.test("12:3")).toBe(false);
				expect(timeRegex.test("")).toBe(false);
			});
		});
	});
});
