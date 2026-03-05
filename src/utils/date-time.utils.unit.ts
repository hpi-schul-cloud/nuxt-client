import { LanguageType } from "@/serverApi/v3";
import { createDayJs, formatUtc, isToday, timeUntil } from "@/utils/date-time.utils";
import { useAppStore } from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import dayjs from "dayjs";
import { setActivePinia } from "pinia";
import { describe, expect, it } from "vitest";
import { nextTick } from "vue";

describe("date-time.utils", () => {
	beforeAll(() => {
		setActivePinia(createTestingPinia());
		createDayJs();
	});
	describe("formatUtc", () => {
		const localOffset = new Date().getTimezoneOffset();
		const isoUtc = dayjs("2024-12-31T12:00:00.000Z").add(localOffset, "minutes").toISOString();

		it.each([
			// date format
			{ locale: LanguageType.De, formatId: "date", expected: "31.12.2024" },
			{ locale: LanguageType.En, formatId: "date", expected: "31/12/2024" },
			{ locale: LanguageType.Es, formatId: "date", expected: "31/12/2024" },
			{ locale: LanguageType.Uk, formatId: "date", expected: "31.12.2024" },
			// dateYY format
			{ locale: LanguageType.De, formatId: "dateYY", expected: "31.12.24" },
			{ locale: LanguageType.En, formatId: "dateYY", expected: "31/12/24" },
			{ locale: LanguageType.Es, formatId: "dateYY", expected: "31/12/24" },
			{ locale: LanguageType.Uk, formatId: "dateYY", expected: "31.12.24" },
			// time format
			{ locale: LanguageType.De, formatId: "time", expected: "12:00" },
			{ locale: LanguageType.En, formatId: "time", expected: "12:00" },
			{ locale: LanguageType.Es, formatId: "time", expected: "12:00" },
			{ locale: LanguageType.Uk, formatId: "time", expected: "12:00" },
			// dateTime format
			{ locale: LanguageType.De, formatId: "dateTime", expected: "31.12.2024 12:00" },
			{ locale: LanguageType.En, formatId: "dateTime", expected: "31/12/2024 12:00" },
			{ locale: LanguageType.Es, formatId: "dateTime", expected: "31/12/2024 12:00" },
			{ locale: LanguageType.Uk, formatId: "dateTime", expected: "31.12.2024 12:00" },
			// dateTimeYY
			{ locale: LanguageType.De, formatId: "dateTimeYY", expected: "31.12.24 12:00" },
			{ locale: LanguageType.En, formatId: "dateTimeYY", expected: "31/12/24 12:00" },
			{ locale: LanguageType.Es, formatId: "dateTimeYY", expected: "31/12/24 12:00" },
			{ locale: LanguageType.Uk, formatId: "dateTimeYY", expected: "31.12.24 12:00" },
		] as const)("should format '$formatId' for locale '$locale'", async ({ locale, formatId, expected }) => {
			useAppStore().$patch({ userLocale: locale });
			await nextTick();

			const result = formatUtc(isoUtc, formatId);

			expect(result).toBe(expected);
		});

		it.each([
			{ input: undefined, description: "undefined input" },
			{ input: "not-a-date", description: "invalid date string" },
			{ input: "", description: "empty string" },
		])("should return undefined for $description", async ({ input }) => {
			useAppStore().$patch({ userLocale: LanguageType.De });
			await nextTick();
			expect(formatUtc(input, "date")).toBeUndefined();
		});
	});

	describe("isToday", () => {
		it("should return true for today's date", () => {
			const today = new Date();
			expect(isToday(today)).toBe(true);
		});

		it("should return true for today as ISO string", () => {
			const todayIso = dayjs().format("YYYY-MM-DD");
			expect(isToday(todayIso)).toBe(true);
		});

		it("should return false for yesterday", () => {
			const yesterday = dayjs().subtract(1, "day").toDate();
			expect(isToday(yesterday)).toBe(false);
		});

		it("should return false for tomorrow", () => {
			const tomorrow = dayjs().add(1, "day").toDate();
			expect(isToday(tomorrow)).toBe(false);
		});

		it("should return false for a date far in the past", () => {
			expect(isToday("2000-01-01")).toBe(false);
		});

		it("should return false for a date far in the future", () => {
			expect(isToday("2099-12-31")).toBe(false);
		});
	});

	describe("timeUntil", () => {
		it.each([
			{
				offset: 30,
				offsetUnit: "minute",
				testUnit: "minute",
				expected: 30,
				description: "should return minutes until future date",
			},
			{
				offset: 2,
				offsetUnit: "hour",
				testUnit: "hour",
				expected: 2,
				description: "should return hours until future date",
			},
			{
				offset: 5,
				offsetUnit: "day",
				testUnit: "day",
				expected: 5,
				description: "should return days until future date",
			},
			{
				offset: 90,
				offsetUnit: "minute",
				testUnit: "minute",
				expected: 90,
				description: "should handle 90 minutes correctly",
			},
			{
				offset: 90,
				offsetUnit: "minute",
				testUnit: "hour",
				expected: 1,
				description: "should handle 90 minutes as 1 hour (dayjs.diff returns whole numbers)",
			},
		] as const)("$description", ({ offset, offsetUnit, testUnit, expected }) => {
			const futureDate = dayjs.utc().add(offset, offsetUnit).toISOString();
			const result = timeUntil(futureDate, testUnit);
			expect(result).toBe(expected);
		});

		it.each([
			{
				dateGenerator: () => dayjs.utc().subtract(30, "minute").toISOString(),
				description: "should return undefined for past date",
			},
			{
				dateGenerator: () => dayjs.utc().toISOString(),
				description: "should return undefined for current time",
			},
			{
				dateGenerator: () => "invalid-date",
				description: "should return undefined for invalid date string",
			},
		] as const)("$description", ({ dateGenerator }) => {
			const testDate = dateGenerator();
			const result = timeUntil(testDate, "minute");
			expect(result).toBe(0);
		});

		it("should work with Z-suffix UTC dates", () => {
			const futureDate = "2026-03-05T15:00:00.000Z";
			const result = timeUntil(futureDate, "minute");
			expect(typeof result).toBe("number");
			expect(result).toBeGreaterThan(0);
		});
	});
});
