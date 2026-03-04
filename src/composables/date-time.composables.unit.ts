import { useDateConversion, useLocalizedDateTime } from "@/composables/date-time.composables";
import { LanguageType } from "@/serverApi/v3";
import { useAppStore } from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { describe, expect, it } from "vitest";
import { nextTick } from "vue";

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
				const appStore = useAppStore();
				appStore.$patch({ userLocale: locale });
				await nextTick();
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

	describe("useDateConversion", () => {
		describe("convertDateStringToDate", () => {
			it.each([
				{ locale: LanguageType.De, input: "31.12.2024", expectedYear: 2024, expectedMonth: 11, expectedDay: 31 },
				{ locale: LanguageType.De, input: "01.01.2000", expectedYear: 2000, expectedMonth: 0, expectedDay: 1 },
				{ locale: LanguageType.De, input: "15.06.1999", expectedYear: 1999, expectedMonth: 5, expectedDay: 15 },
				{ locale: LanguageType.En, input: "31/12/2024", expectedYear: 2024, expectedMonth: 11, expectedDay: 31 },
				{ locale: LanguageType.En, input: "01/01/2000", expectedYear: 2000, expectedMonth: 0, expectedDay: 1 },
				{ locale: LanguageType.En, input: "15/06/1999", expectedYear: 1999, expectedMonth: 5, expectedDay: 15 },
				{ locale: LanguageType.Es, input: "31/12/2024", expectedYear: 2024, expectedMonth: 11, expectedDay: 31 },
				{ locale: LanguageType.Es, input: "01/01/2000", expectedYear: 2000, expectedMonth: 0, expectedDay: 1 },
				{ locale: LanguageType.Uk, input: "31.12.2024", expectedYear: 2024, expectedMonth: 11, expectedDay: 31 },
				{ locale: LanguageType.Uk, input: "01.01.2000", expectedYear: 2000, expectedMonth: 0, expectedDay: 1 },
			])(
				"should parse '$input' for locale '$locale'",
				({ locale, input, expectedYear, expectedMonth, expectedDay }) => {
					useAppStore().$patch({ userLocale: locale });
					const { convertDateStringToDate } = useDateConversion();

					const result = convertDateStringToDate(input);

					expect(result).toBeInstanceOf(Date);
					expect(result?.getFullYear()).toBe(expectedYear);
					expect(result?.getMonth()).toBe(expectedMonth);
					expect(result?.getDate()).toBe(expectedDay);
				}
			);

			it("should return undefined for invalid date strings", () => {
				useAppStore().$patch({ userLocale: LanguageType.De });
				const { convertDateStringToDate } = useDateConversion();

				expect(convertDateStringToDate("invalid")).toBeUndefined();
				expect(convertDateStringToDate("")).toBeUndefined();
				expect(convertDateStringToDate(undefined)).toBeUndefined();
			});
		});

		describe("convertDateStringToIso", () => {
			it.each([
				{ locale: LanguageType.De, input: "31.12.2024", expected: "2024-12-31" },
				{ locale: LanguageType.De, input: "01.01.2000", expected: "2000-01-01" },
				{ locale: LanguageType.De, input: "15.06.1999", expected: "1999-06-15" },
				{ locale: LanguageType.En, input: "31/12/2024", expected: "2024-12-31" },
				{ locale: LanguageType.En, input: "01/01/2000", expected: "2000-01-01" },
				{ locale: LanguageType.En, input: "15/06/1999", expected: "1999-06-15" },
				{ locale: LanguageType.Es, input: "31/12/2024", expected: "2024-12-31" },
				{ locale: LanguageType.Es, input: "01/01/2000", expected: "2000-01-01" },
				{ locale: LanguageType.Uk, input: "31.12.2024", expected: "2024-12-31" },
				{ locale: LanguageType.Uk, input: "01.01.2000", expected: "2000-01-01" },
			])("should convert '$input' to '$expected' for locale '$locale'", ({ locale, input, expected }) => {
				useAppStore().$patch({ userLocale: locale });
				const { convertDateStringToIso } = useDateConversion();

				expect(convertDateStringToIso(input)).toEqual(expected);
			});

			it("should return undefined for empty or undefined input", () => {
				useAppStore().$patch({ userLocale: LanguageType.De });
				const { convertDateStringToIso } = useDateConversion();

				expect(convertDateStringToIso("")).toBeUndefined();
				expect(convertDateStringToIso(undefined)).toBeUndefined();
			});
		});

		describe("convertIsoToDateString", () => {
			it.each([
				{ locale: LanguageType.De, input: "2024-12-31T12:00:00.000Z", expected: "31.12.2024" },
				{ locale: LanguageType.De, input: "2000-01-01T12:00:00.000Z", expected: "01.01.2000" },
				{ locale: LanguageType.De, input: "1999-06-15T12:00:00.000Z", expected: "15.06.1999" },
				{ locale: LanguageType.En, input: "2024-12-31T12:00:00.000Z", expected: "31/12/2024" },
				{ locale: LanguageType.En, input: "2000-01-01T12:00:00.000Z", expected: "01/01/2000" },
				{ locale: LanguageType.En, input: "1999-06-15T12:00:00.000Z", expected: "15/06/1999" },
				{ locale: LanguageType.Es, input: "2024-12-31T12:00:00.000Z", expected: "31/12/2024" },
				{ locale: LanguageType.Es, input: "2000-01-01T12:00:00.000Z", expected: "01/01/2000" },
				{ locale: LanguageType.Uk, input: "2024-12-31T12:00:00.000Z", expected: "31.12.2024" },
				{ locale: LanguageType.Uk, input: "2000-01-01T12:00:00.000Z", expected: "01.01.2000" },
			])("should convert '$input' to '$expected' for locale '$locale'", ({ locale, input, expected }) => {
				useAppStore().$patch({ userLocale: locale });
				const { convertIsoToDateString } = useDateConversion();

				expect(convertIsoToDateString(input)).toEqual(expected);
			});

			it.each([
				{ locale: LanguageType.De, input: "2024-12-31", expected: "31.12.2024" },
				{ locale: LanguageType.En, input: "2024-12-31", expected: "31/12/2024" },
				{ locale: LanguageType.Es, input: "2024-12-31", expected: "31/12/2024" },
				{ locale: LanguageType.Uk, input: "2024-12-31", expected: "31.12.2024" },
			])("should also handle date-only ISO strings '$input' for locale '$locale'", ({ locale, input, expected }) => {
				useAppStore().$patch({ userLocale: locale });
				const { convertIsoToDateString } = useDateConversion();

				expect(convertIsoToDateString(input)).toEqual(expected);
			});

			it("should return undefined for empty or undefined input", () => {
				useAppStore().$patch({ userLocale: LanguageType.De });
				const { convertIsoToDateString } = useDateConversion();

				expect(convertIsoToDateString("")).toBeUndefined();
				expect(convertIsoToDateString(undefined)).toBeUndefined();
			});
		});

		describe("convertDbGermanDateStringToDateString", () => {
			it.each([
				{ locale: LanguageType.De, input: "31.12.2024", expected: "31.12.2024" },
				{ locale: LanguageType.De, input: "01.03.2022", expected: "01.03.2022" },
				{ locale: LanguageType.En, input: "31.12.2024", expected: "31/12/2024" },
				{ locale: LanguageType.En, input: "01.03.2022", expected: "01/03/2022" },
				{ locale: LanguageType.Es, input: "31.12.2024", expected: "31/12/2024" },
				{ locale: LanguageType.Es, input: "01.03.2022", expected: "01/03/2022" },
				{ locale: LanguageType.Uk, input: "31.12.2024", expected: "31.12.2024" },
				{ locale: LanguageType.Uk, input: "01.03.2022", expected: "01.03.2022" },
			])("should convert DB format '$input' to '$expected' for locale '$locale'", ({ locale, input, expected }) => {
				useAppStore().$patch({ userLocale: locale });
				const { convertDbGermanDateStringToDateString } = useDateConversion();

				expect(convertDbGermanDateStringToDateString(input)).toEqual(expected);
			});
		});

		describe("convertDateToEndOfDayIso", () => {
			it("should convert date string to end of day ISO", () => {
				useAppStore().$patch({ userLocale: LanguageType.De });
				const { convertDateToEndOfDayIso } = useDateConversion();

				const result = convertDateToEndOfDayIso("2024-12-31");

				// Test that it's end of day (23:59:59.999) - the exact UTC time depends on timezone
				expect(result).toMatch(/2024-12-31T\d{2}:59:59\.999Z|2025-01-01T\d{2}:59:59\.999Z/);
			});

			it("should return undefined for empty or undefined input", () => {
				useAppStore().$patch({ userLocale: LanguageType.De });
				const { convertDateToEndOfDayIso } = useDateConversion();

				expect(convertDateToEndOfDayIso("")).toBeUndefined();
				expect(convertDateToEndOfDayIso(undefined)).toBeUndefined();
			});
		});

		describe("roundtrip conversions", () => {
			it.each([
				{ locale: LanguageType.De, localDate: "31.12.2024", isoDate: "2024-12-31" },
				{ locale: LanguageType.En, localDate: "31/12/2024", isoDate: "2024-12-31" },
				{ locale: LanguageType.Es, localDate: "31/12/2024", isoDate: "2024-12-31" },
				{ locale: LanguageType.Uk, localDate: "31.12.2024", isoDate: "2024-12-31" },
			])(
				"localDate -> ISO -> localDate should be consistent for locale '$locale'",
				({ locale, localDate, isoDate }) => {
					useAppStore().$patch({ userLocale: locale });
					const { convertDateStringToIso, convertIsoToDateString } = useDateConversion();

					const toIso = convertDateStringToIso(localDate);
					expect(toIso).toEqual(isoDate);

					const backToLocal = convertIsoToDateString(toIso);
					expect(backToLocal).toEqual(localDate);
				}
			);

			it.each([
				{ locale: LanguageType.De, localDate: "15.06.1999" },
				{ locale: LanguageType.De, localDate: "01.01.2000" },
				{ locale: LanguageType.En, localDate: "15/06/1999" },
				{ locale: LanguageType.En, localDate: "01/01/2000" },
				{ locale: LanguageType.Es, localDate: "15/06/1999" },
				{ locale: LanguageType.Uk, localDate: "15.06.1999" },
			])("localDate -> Date -> check values for '$localDate' in locale '$locale'", ({ locale, localDate }) => {
				useAppStore().$patch({ userLocale: locale });
				const { convertDateStringToDate, convertDateStringToIso } = useDateConversion();

				const dateObj = convertDateStringToDate(localDate);
				const isoString = convertDateStringToIso(localDate);

				expect(dateObj).toBeInstanceOf(Date);
				expect(isoString).toMatch(/^\d{4}-\d{2}-\d{2}$/);
			});
		});
	});
});
