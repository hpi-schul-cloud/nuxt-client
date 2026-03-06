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

export const nowUtc = () => dayjs.utc();

export const nowUtcIso = () => dayjs.utc().toISOString();

export const parseUtc = (isoUtcDate: string | Date) => dayjs.utc(isoUtcDate);

export const diff = (from: dayjs.Dayjs, to: dayjs.Dayjs, unit: dayjs.UnitType = "minute") => to.diff(from, unit);

export const inRange = (value: number, min: number, max: number) => value >= min && value <= max;

export const isWithinHours =
	(hours: number) =>
	(isoUtcDate: string): boolean => {
		const diffMinutes = diff(nowUtc(), parseUtc(isoUtcDate), "minute");
		return inRange(diffMinutes, 0, hours * 60);
	};

export const isOlderThan =
	(amount: number, unit: dayjs.UnitType) =>
	(isoUtcDate: string): boolean => {
		const diffAmount = Math.abs(diff(nowUtc(), parseUtc(isoUtcDate), unit));
		return diffAmount > amount;
	};

export const timeUntil = (isoUtcDueDate: string, unit: dayjs.UnitType) => {
	const due = parseUtc(isoUtcDueDate);
	const current = nowUtc();
	if (current.isBefore(due)) {
		return due.diff(current, unit);
	}
	return 0;
};

export const isDueWithin24h = isWithinHours(24);
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

export const isInPast = (isoString: string | undefined): boolean => {
	if (!isoString) return false;
	return dayjs(isoString).isBefore(dayjs());
};

export const isToday = (date: Date | string): boolean => dayjs(date).isSame(dayjs(), "day");

export const fromNowUtc = (isoUtcDate: string): string => parseUtc(isoUtcDate).fromNow();

export type LocaleFormatId = "date" | "time" | "dateTime" | "dateTimeYY" | "dateYY";

const getFormat = (formatId: LocaleFormatId): string => getLocaleFormats(dayjs.locale())[formatId];

/**
 * Formats an ISO UTC date string into a localized format based on how recent it is.
 * If the date is older than 7 days, it formats it using the "date" format.
 * If it's within the last 7 days, it returns a relative localized time string (e.g., "3 days ago").
 * @param isoDateString - The isoDateString in ISO 8601 format (e.g., "2024-06-01T12:00:00Z")
 */
export const formatRecentOrActual = (isoDateString: string | undefined) => {
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
export const toEndOfDayIso = (isoDateString: string | undefined) => {
	if (!isoDateString) return undefined;
	const parsed = dayjs(isoDateString);
	return parsed.isValid() ? parsed.endOf("day").toISOString() : undefined;
};

/**
 * Parse a date from local representation to an iso date string. It's not used for date and time representation.
 *
 * @param dateString - The date string in local representation (e.g. "31.12.2024" for German locale)
 */
export const toIsoDate = (dateString: string | undefined) => {
	if (!dateString) return undefined;
	const parsed = dayjs(dateString, getFormat("date"));
	return parsed.isValid() ? parsed.format("YYYY-MM-DD") : undefined;
};

/**
 * Parse a date from local representation to date object.
 *
 * @param dateString - The date string in local representation (e.g. "31.12.2024" for German locale)
 */
export const toDateFromIso = (dateString: string | undefined) => {
	if (!dateString) return undefined;
	const parsed = dayjs(dateString, getFormat("date"));
	return parsed.isValid() ? parsed.toDate() : undefined;
};

export const toCombinedDateTimeIso = (dateString: string | undefined, timeString: string | undefined) => {
	if (!dateString) return undefined;
	const time = timeString || "00:00";
	const parsed = dayjs(`${dateString}T${time}`);
	return parsed.isValid() ? parsed.toISOString() : undefined;
};

/**
 * Parse a date from DB representation (DD.MM.YYYY) to a localized date string.
 * @deprecated - Use formatUtc() if possible. Only needed for legacy data.
 *
 * @param dbDateString - The date string in DB format (e.g. "01.03.2022")
 */
export const fromGermanDate = (dbDateString: string | undefined) => {
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
export const toGermanDate = (isoDateString: string | undefined) => {
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
		return dayjs(date, "DD.MM.YYYY").format("YYYY-MM-DD");
	}
	return undefined;
};
