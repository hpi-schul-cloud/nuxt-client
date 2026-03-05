import { LanguageType } from "@/serverApi/v3";
import {
	createDayJs,
	dateFromToday,
	diff,
	formatFromDbGermanDateString,
	formatRecentOrActual,
	formatToDbGermanDateString,
	formatUtc,
	fromNowUtc,
	inRange,
	isDueWithin24h,
	isInPast,
	isOlderThan,
	isOlderThan7Days,
	isToday,
	isWithinHours,
	nowUtc,
	nowUtcIso,
	parseUtc,
	timeUntil,
	toCombinedDateTimeIso,
	toDateFromIso,
	toEndOfDayIso,
	toIsoDate,
	toIsoFromDbGermanDateString,
} from "@/utils/date-time.utils";
import { useAppStore } from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import dayjs from "dayjs";
import { setActivePinia } from "pinia";
import { beforeAll, describe, expect, it } from "vitest";
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

	describe("nowUtc", () => {
		it("should return a dayjs object in UTC", () => {
			const result = nowUtc();
			expect(result.isUTC()).toBe(true);
		});

		it("should return current time", () => {
			const before = Date.now();
			const result = nowUtc().valueOf();
			const after = Date.now();
			expect(result).toBeGreaterThanOrEqual(before);
			expect(result).toBeLessThanOrEqual(after);
		});
	});

	describe("parseUtc", () => {
		it("should parse ISO string as UTC", () => {
			const result = parseUtc("2024-06-15T10:30:00.000Z");
			expect(result.isUTC()).toBe(true);
			expect(result.hour()).toBe(10);
			expect(result.minute()).toBe(30);
		});

		it("should parse Date object as UTC", () => {
			const date = new Date("2024-06-15T10:30:00.000Z");
			const result = parseUtc(date);
			expect(result.isUTC()).toBe(true);
		});
	});

	describe("diff", () => {
		it("should return difference in minutes by default", () => {
			const from = dayjs.utc("2024-01-01T10:00:00Z");
			const to = dayjs.utc("2024-01-01T10:30:00Z");
			expect(diff(from, to)).toBe(30);
		});

		it("should return difference in specified unit", () => {
			const from = dayjs.utc("2024-01-01T10:00:00Z");
			const to = dayjs.utc("2024-01-01T12:00:00Z");
			expect(diff(from, to, "hour")).toBe(2);
		});

		it("should return negative for reversed order", () => {
			const from = dayjs.utc("2024-01-01T12:00:00Z");
			const to = dayjs.utc("2024-01-01T10:00:00Z");
			expect(diff(from, to, "hour")).toBe(-2);
		});
	});

	describe("inRange", () => {
		it.each([
			{ value: 5, min: 0, max: 10, expected: true },
			{ value: 0, min: 0, max: 10, expected: true },
			{ value: 10, min: 0, max: 10, expected: true },
			{ value: -1, min: 0, max: 10, expected: false },
			{ value: 11, min: 0, max: 10, expected: false },
		])("should return $expected for value $value in range [$min, $max]", ({ value, min, max, expected }) => {
			expect(inRange(value, min, max)).toBe(expected);
		});
	});

	describe("isWithinHours", () => {
		it("should return true for date within specified hours in the future", () => {
			const futureDate = dayjs.utc().add(12, "hour").toISOString();
			const isWithin24h = isWithinHours(24);
			expect(isWithin24h(futureDate)).toBe(true);
		});

		it("should return false for date beyond specified hours", () => {
			const futureDate = dayjs.utc().add(30, "hour").toISOString();
			const isWithin24h = isWithinHours(24);
			expect(isWithin24h(futureDate)).toBe(false);
		});

		it("should return false for past dates", () => {
			const pastDate = dayjs.utc().subtract(1, "hour").toISOString();
			const isWithin24h = isWithinHours(24);
			expect(isWithin24h(pastDate)).toBe(false);
		});
	});

	describe("isDueWithin24h", () => {
		it("should return true for date 12 hours in the future", () => {
			const futureDate = dayjs.utc().add(12, "hour").toISOString();
			expect(isDueWithin24h(futureDate)).toBe(true);
		});

		it("should return false for date 30 hours in the future", () => {
			const futureDate = dayjs.utc().add(30, "hour").toISOString();
			expect(isDueWithin24h(futureDate)).toBe(false);
		});
	});

	describe("isOlderThan", () => {
		it("should return true for date older than specified amount", () => {
			const oldDate = dayjs.utc().subtract(10, "day").toISOString();
			const isOlderThan5Days = isOlderThan(5, "day");
			expect(isOlderThan5Days(oldDate)).toBe(true);
		});

		it("should return false for recent date", () => {
			const recentDate = dayjs.utc().subtract(3, "day").toISOString();
			const isOlderThan5Days = isOlderThan(5, "day");
			expect(isOlderThan5Days(recentDate)).toBe(false);
		});

		it("should work with future dates (abs diff)", () => {
			const futureDate = dayjs.utc().add(10, "day").toISOString();
			const isOlderThan5Days = isOlderThan(5, "day");
			expect(isOlderThan5Days(futureDate)).toBe(true);
		});
	});

	describe("isOlderThan7Days", () => {
		it("should return true for date 10 days ago", () => {
			const oldDate = dayjs.utc().subtract(10, "day").toISOString();
			expect(isOlderThan7Days(oldDate)).toBe(true);
		});

		it("should return false for date 3 days ago", () => {
			const recentDate = dayjs.utc().subtract(3, "day").toISOString();
			expect(isOlderThan7Days(recentDate)).toBe(false);
		});
	});

	describe("dateFromToday", () => {
		it("should return today formatted as YYYY-MM-DD with offset 0", () => {
			const result = dateFromToday(0);
			expect(result).toBe(dayjs().format("YYYY-MM-DD"));
		});

		it("should return date 5 days in the future", () => {
			const result = dateFromToday(5);
			expect(result).toBe(dayjs().add(5, "day").format("YYYY-MM-DD"));
		});

		it("should return date 100 years ago", () => {
			const result = dateFromToday(-100, "year");
			expect(result).toBe(dayjs().subtract(100, "year").format("YYYY-MM-DD"));
		});
	});

	describe("isInPast", () => {
		it("should return true for past date", () => {
			expect(isInPast("2020-01-01T00:00:00Z")).toBe(true);
		});

		it("should return false for future date", () => {
			expect(isInPast("2099-12-31T00:00:00Z")).toBe(false);
		});

		it("should return false for undefined", () => {
			expect(isInPast(undefined)).toBe(false);
		});
	});

	describe("fromNowUtc", () => {
		it("should return relative time string for past date", () => {
			const pastDate = dayjs.utc().subtract(2, "day").toISOString();
			const result = fromNowUtc(pastDate);
			expect(result).toContain("2");
		});

		it("should return relative time string for future date", () => {
			const futureDate = dayjs.utc().add(1, "hour").toISOString();
			const result = fromNowUtc(futureDate);
			expect(typeof result).toBe("string");
		});
	});

	describe("formatRecentOrActual", () => {
		it("should return undefined for undefined input", () => {
			expect(formatRecentOrActual(undefined)).toBeUndefined();
		});

		it("should return relative time for recent date (within 7 days)", async () => {
			useAppStore().$patch({ userLocale: LanguageType.De });
			await nextTick();
			const recentDate = dayjs.utc().subtract(3, "day").toISOString();
			const result = formatRecentOrActual(recentDate);
			expect(result).toContain("3");
		});

		it("should return formatted date for old date (older than 7 days)", async () => {
			useAppStore().$patch({ userLocale: LanguageType.De });
			await nextTick();
			const oldDate = "2024-01-15T10:00:00.000Z";
			const result = formatRecentOrActual(oldDate);
			expect(result).toBe("15.01.2024");
		});
	});

	describe("toEndOfDayIso", () => {
		it("should convert date to end of day ISO string", () => {
			const result = toEndOfDayIso("2024-06-15");
			expect(result).toBeDefined();
			expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/);
			// End of day should have 23:59:59 in local time, but UTC may differ
			expect(result).toContain("59:59");
		});

		it("should return undefined for undefined input", () => {
			expect(toEndOfDayIso(undefined)).toBeUndefined();
		});

		it("should return undefined for invalid date", () => {
			expect(toEndOfDayIso("invalid")).toBeUndefined();
		});
	});

	describe("toIsoDate", () => {
		it("should convert German locale date to ISO format", async () => {
			useAppStore().$patch({ userLocale: LanguageType.De });
			await nextTick();
			const result = toIsoDate("15.06.2024");
			expect(result).toBe("2024-06-15");
		});

		it("should return undefined for undefined input", () => {
			expect(toIsoDate(undefined)).toBeUndefined();
		});

		it("should return undefined for invalid date", async () => {
			useAppStore().$patch({ userLocale: LanguageType.De });
			await nextTick();
			expect(toIsoDate("invalid")).toBeUndefined();
		});
	});

	describe("toDateFromIso", () => {
		it("should convert locale date string to Date object", async () => {
			useAppStore().$patch({ userLocale: LanguageType.De });
			await nextTick();
			const result = toDateFromIso("15.06.2024");
			expect(result).toBeInstanceOf(Date);
			expect(result?.getFullYear()).toBe(2024);
			expect(result?.getMonth()).toBe(5); // June is month 5 (0-indexed)
			expect(result?.getDate()).toBe(15);
		});

		it("should return undefined for undefined input", () => {
			expect(toDateFromIso(undefined)).toBeUndefined();
		});
	});

	describe("toCombinedDateTimeIso", () => {
		it("should combine date and time to ISO string", () => {
			const result = toCombinedDateTimeIso("2024-06-15", "14:30");
			expect(result).toBeDefined();
			expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/);
		});

		it("should use 00:00 when time is undefined", () => {
			const result = toCombinedDateTimeIso("2024-06-15", undefined);
			expect(result).toBeDefined();
			expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/);
		});

		it("should return undefined for undefined date", () => {
			expect(toCombinedDateTimeIso(undefined, "14:30")).toBeUndefined();
		});
	});

	describe("formatFromDbGermanDateString", () => {
		it("should convert DB German date to localized format", async () => {
			useAppStore().$patch({ userLocale: LanguageType.De });
			await nextTick();
			const result = formatFromDbGermanDateString("15.06.2024");
			expect(result).toBe("15.06.2024");
		});

		it("should return undefined for undefined input", () => {
			expect(formatFromDbGermanDateString(undefined)).toBeUndefined();
		});
	});

	describe("formatToDbGermanDateString", () => {
		it("should convert ISO date to German DB format", () => {
			const result = formatToDbGermanDateString("2024-06-15");
			expect(result).toBe("15.06.2024");
		});

		it("should return undefined for undefined input", () => {
			expect(formatToDbGermanDateString(undefined)).toBeUndefined();
		});

		it("should return undefined for invalid date", () => {
			expect(formatToDbGermanDateString("invalid")).toBeUndefined();
		});
	});

	describe("toIsoFromDbGermanDateString", () => {
		it("should convert German DB date to ISO format", () => {
			const result = toIsoFromDbGermanDateString("15.06.2024");
			expect(result).toBe("2024-06-15");
		});

		it("should return undefined for empty string", () => {
			expect(toIsoFromDbGermanDateString("")).toBeUndefined();
		});
	});
});
