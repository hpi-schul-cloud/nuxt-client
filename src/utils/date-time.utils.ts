import "dayjs/locale/de";
import "dayjs/locale/es";
import "dayjs/locale/uk";
import { useAppStoreRefs } from "@data-app";
import dayjs, { ManipulateType } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { watch } from "vue";

dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

let isDayJsInitialized = false;

/**
 * Initialize dayjs locale sync with the application store's locale.
 */
export const createDayJs = () => {
	if (isDayJsInitialized) return;
	isDayJsInitialized = true;

	const { locale } = useAppStoreRefs();

	// Set initial locale
	if (locale.value) {
		dayjs.locale(locale.value);
	}

	// Keep in sync when locale changes
	watch(locale, (newLocale) => {
		if (newLocale) {
			dayjs.locale(newLocale);
		}
	});
};

// -------------------------------------
// Locale format definitions
// -------------------------------------

export const LOCALE_FORMATS = {
	de: {
		date: "DD.MM.YYYY",
		dateTime: "DD.MM.YYYY HH:mm",
		dateTimeYY: "DD.MM.YY HH:mm",
		dateYY: "DD.MM.YY",
		time: "HH:mm",
		placeholder: { day: "TT", month: "MM", year: "JJJJ" },
	},
	// refers to en-gb
	en: {
		date: "DD/MM/YYYY",
		dateTime: "DD/MM/YYYY HH:mm",
		dateTimeYY: "DD/MM/YY HH:mm",
		dateYY: "DD/MM/YY",
		time: "HH:mm",
		placeholder: { day: "DD", month: "MM", year: "YYYY" },
	},
	es: {
		date: "DD/MM/YYYY",
		dateTime: "DD/MM/YYYY HH:mm",
		dateTimeYY: "DD/MM/YY HH:mm",
		dateYY: "DD/MM/YY",
		time: "HH:mm",
		placeholder: { day: "DD", month: "MM", year: "AAAA" },
	},
	uk: {
		date: "DD.MM.YYYY",
		dateTime: "DD.MM.YYYY HH:mm",
		dateTimeYY: "DD.MM.YY HH:mm",
		dateYY: "DD.MM.YY",
		time: "HH:mm",
		placeholder: { day: "ДД", month: "ММ", year: "РРРР" },
	},
};

export type LocaleKey = keyof typeof LOCALE_FORMATS;

export const DATE_REGEX_PATTERNS: Record<string, string> = {
	D: "(0[1-9]|[12]\\d|3[01])",
	M: "(0[1-9]|1[0-2])",
	Y: "\\d{4}",
};

export const getLocaleFormats = (locale: string) => LOCALE_FORMATS[locale as LocaleKey] ?? LOCALE_FORMATS.de;

// --------------------------------
// date/time utils
// --------------------------------

export const ISO_DATE_FORMAT = "YYYY-MM-DD";

/**
 * Returns the current date and time in UTC.
 */
export const nowUtc = () => dayjs.utc();

/**
 * Returns the current date and time in UTC as an ISO string.
 */
export const nowUtcIso = () => dayjs.utc().toISOString();

/**
 * Parses an ISO UTC date string into a dayjs object.
 * @param isoUtcDate - The date string in ISO 8601 format (e.g., "2024-06-01T12:00:00Z") or a Date object
 */
export const parseUtc = (isoUtcDate: string | Date) => dayjs.utc(isoUtcDate);

/**
 * Calculates the difference between two dates in the specified unit.
 * @param from - The starting date as a dayjs object
 * @param to - The ending date as a dayjs object
 * @param unit - The unit of time to measure the difference.
 */
export const diff = (from: dayjs.Dayjs, to: dayjs.Dayjs, unit: dayjs.UnitType = "minute") => to.diff(from, unit);

/**
 * Checks if a value is within a specified range (inclusive).
 * @param value - The number to check
 * @param min - The minimum value of the range
 * @param max - The maximum value of the range
 */
export const inRange = (value: number, min: number, max: number) => value >= min && value <= max;

/**
 * Returns a function that checks if a given ISO UTC date string is within a certain number of hours from the current time.
 * @param hours - The number of hours to check against
 */
export const isWithinHours =
	(hours: number) =>
	(isoUtcDate: string): boolean => {
		const diffMinutes = diff(nowUtc(), parseUtc(isoUtcDate), "minute");
		return inRange(diffMinutes, 0, hours * 60);
	};

/**
 * Returns a function that checks if a given ISO UTC date string is older than a certain amount of time from the current time.
 * @param amount - The amount of time to check against
 * @param unit - The unit of time for the amount (e.g., "day", "hour")
 */
export const isOlderThan =
	(amount: number, unit: dayjs.UnitType) =>
	(isoUtcDate: string): boolean => {
		const diffAmount = Math.abs(diff(nowUtc(), parseUtc(isoUtcDate), unit));
		return diffAmount > amount;
	};

/**
 * Calculates the time remaining until a given ISO UTC due date in the specified unit.
 * @param isoUtcDueDate - The due date as an ISO 8601 UTC date string (e.g., "2024-06-01T12:00:00Z")
 * @param unit - The unit of time to measure the remaining time (e.g., "minute", "hour", "day")
 */
export const timeUntil = (isoUtcDueDate: string, unit: dayjs.UnitType) => {
	const due = parseUtc(isoUtcDueDate);
	const current = nowUtc();
	if (current.isBefore(due)) {
		return due.diff(current, unit);
	}
	return 0;
};

/**
 * Checks if a given ISO UTC date string is within the next 24 hours.
 */
export const isDueWithin24h = isWithinHours(24);
/**
 * Checks if a given ISO UTC date string is older than 7 days.
 */
export const isOlderThan7Days = isOlderThan(7, "day");

/**
 * Returns a date offset from today, formatted for use in HTML date inputs (YYYY-MM-DD).
 * Useful for setting min/max dates on date pickers.
 *
 * Example:
 *   dateFromToday(-100, "y") // 100 years ago
 *   dateFromToday(-4, "y")   // 4 years ago
 */
export const dateFromToday = (offset: number, unit: ManipulateType = "day"): string =>
	dayjs().add(offset, unit).format(ISO_DATE_FORMAT);

/**
 * Checks if a given ISO date string is in the past compared to the current date and time.
 * @param isoString - The date string in ISO 8601 format (e.g., "2024-06-01T12:00:00Z")
 */
export const isInPast = (isoString?: string): boolean => {
	if (!isoString) return false;
	return dayjs(isoString).isBefore(dayjs());
};

/**
 * Checks if a given date (as a Date object or ISO string) is the same day as today.
 * @param date - The date to check, either as a Date object or an ISO 8601 date string.
 */
export const isToday = (date: Date | string): boolean => dayjs(date).isSame(dayjs(), "day");

/**
 * Formats a given ISO UTC date string into a relative time string (e.g., "3 days ago") based on the current locale.
 * @param isoUtcDate - The date string in ISO 8601 format (e.g., "2024-06-01T12:00:00Z")
 */
export const fromNowUtc = (isoUtcDate: string): string => parseUtc(isoUtcDate).fromNow();

export type LocaleFormatId = "date" | "time" | "dateTime" | "dateTimeYY" | "dateYY";

const getFormat = (formatId: LocaleFormatId): string => getLocaleFormats(dayjs.locale())[formatId];

/**
 * Formats an ISO UTC date string into a localized format based on how recent it is.
 * If the date is older than 7 days, it formats it using the "date" format.
 * If it's within the last 7 days, it returns a relative localized time string (e.g., "3 days ago").
 * @param isoDateString - The isoDateString in ISO 8601 format (e.g., "2024-06-01T12:00:00Z")
 */
export const formatRecentOrActual = (isoDateString?: string) => {
	if (!isoDateString) return undefined;
	return isOlderThan7Days(isoDateString) ? formatUtc(isoDateString, "date") : fromNowUtc(isoDateString);
};

/**
 * Formats an ISO UTC date string into a localized format based on the current locale and specified format ID.
 *
 * @param isoUtc - An ISO 8601 UTC date string (e.g., "2024-06-01T12:00:00Z")
 * @param formatId - The ID of the desired date/time format ("date: DD.MM.YYYY, "time": "HH:mm", "dateTime": "DD.MM.YYYY HH:mm", "dateTimeYY": "DD.MM/YY HH:mm", "dateYY": "DD.MM/YY")
 */
export const formatUtc = (isoUtc: string | Date | undefined, formatId: LocaleFormatId) => {
	if (!isoUtc) return undefined;

	const d = parseUtc(isoUtc).local();
	if (!d.isValid()) return undefined;

	return d.format(getFormat(formatId));
};

/**
 * Converts a date-only string (YYYY-MM-DD) to an end-of-day ISO timestamp.
 *
 * @param isoDateString - The date string in iso YYYY-MM-DD format (e.g. "2026-03-04")
 */
export const toEndOfDayIso = (isoDateString?: string) => {
	if (!isoDateString) return undefined;
	const parsed = dayjs(isoDateString);
	return parsed.isValid() ? parsed.endOf("day").toISOString() : undefined;
};

/**
 * Parse a date from local representation to an iso date string. It's not used for date and time representation.
 *
 * @param dateString - The date string in local representation (e.g. "31.12.2024" for German locale)
 */
export const toIsoDate = (dateString?: string) => {
	if (!dateString) return undefined;
	const parsed = dayjs(dateString, getFormat("date"));
	return parsed.isValid() ? parsed.format(ISO_DATE_FORMAT) : undefined;
};

/**
 * Parse a date from local representation to date object.
 *
 * @param dateString - The date string in local representation (e.g. "31.12.2024" for German locale)
 */
export const toDateFromLocalString = (dateString?: string) => {
	if (!dateString) return undefined;
	const parsed = dayjs(dateString, getFormat("date"));
	return parsed.isValid() ? parsed.toDate() : undefined;
};

/**
 * Combines a date string and a time string into a single ISO date-time string.
 * If the time string is not provided, it defaults to "00:00".
 *
 * @param isoDateString - The date string in ISO format (e.g. "2024-12-31")
 * @param isoTimeString - The time string in ISO format (e.g. "14:30")
 */
export const toCombinedDateTimeIso = (isoDateString?: string, isoTimeString?: string) => {
	if (!isoDateString) return undefined;
	const time = isoTimeString || "00:00";
	const parsed = dayjs(`${isoDateString}T${time}`);
	return parsed.isValid() ? parsed.toISOString() : undefined;
};

/**
 * Parse a date from DB representation (DD.MM.YYYY) to a localized date string.
 * @deprecated - Use formatUtc() if possible. Only needed for legacy data.
 *
 * @param dbDateString - The date string in DB format (e.g. "01.03.2022")
 */
export const fromGermanDate = (dbDateString?: string) => {
	if (!dbDateString) return undefined;
	const d = dayjs(dbDateString, "DD.MM.YYYY");
	return formatUtc(d.toISOString(), "date");
};

/**
 * Parse a date from ISO format to german DB representation (DD.MM.YYYY).
 * @deprecated - Use isoString for db persistance if possible. Only needed for legacy data.
 *
 * @param isoDateString - The date string in ISO format (e.g. "2022-03-01")
 */
export const toGermanDate = (isoDateString?: string) => {
	if (!isoDateString) return undefined;
	const d = dayjs(isoDateString);
	return d.isValid() ? d.format("DD.MM.YYYY") : undefined;
};

/**
 * Returns formated date string based on a given date string in German format
 * @deprecated - Use isoString for db persistance if possible. Only needed for legacy data.
 * TODO: Currently the server is returning this date in German format. Please check, if this is needed or can be reverted to international date format, i.e. (DD.MM.YYYY -> YYYY-MM-DD)
 * @param date DE formated date string based on UTC
 * @return Date string based on current timezone for usage in input field (YYYY-MM-DD)
 */
export const germanDateToIso = (date: string) => {
	if (date) {
		return dayjs(date, "DD.MM.YYYY").format(ISO_DATE_FORMAT);
	}
	return undefined;
};
