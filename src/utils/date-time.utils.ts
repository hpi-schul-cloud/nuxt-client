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

export const parseUtc = (isoUtcDate: string) => dayjs.utc(isoUtcDate);

export const diff = (from: dayjs.Dayjs, to: dayjs.Dayjs, unit: dayjs.UnitType = "minute") => to.diff(from, unit);

export const inRange = (value: number, min: number, max: number) => value >= min && value <= max;

export const isWithinHours =
	(hours: number) =>
	(isoUtcDate: string): boolean => {
		const diffMinutes = diff(nowUtc(), parseUtc(isoUtcDate), "minute");
		return inRange(diffMinutes, 0, hours * 60);
	};

export const timeUntil = (isoUtcDueDate: string, unit: dayjs.UnitType) => {
	const due = parseUtc(isoUtcDueDate);
	const current = nowUtc();
	if (current.isBefore(due)) {
		return due.diff(current, unit);
	}
	return undefined;
};

export const isDueWithin24h = isWithinHours(24);
export const isDueWithin48h = isWithinHours(48);
export const isDueThisHour = isWithinHours(1);

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

export const isInPast = (dateTime: string | undefined): boolean => {
	if (!dateTime) return false;
	return dayjs(dateTime).isBefore(dayjs());
};

export const isToday = (date: Date | string): boolean => dayjs(date).isSame(dayjs(), "day");

export const fromNowUtc = (isoUtcDate: string): string => parseUtc(isoUtcDate).fromNow();

export type LocaleFormatId = "date" | "time" | "dateTime" | "dateTimeYY" | "dateYY";

const getFormat = (formatId: LocaleFormatId): string => getLocaleFormats(dayjs.locale())[formatId];

export const formatUtc = (isoUtc: string | undefined, formatId: LocaleFormatId) => {
	if (!isoUtc) return undefined;

	const d = dayjs.utc(isoUtc).local();
	if (!d.isValid()) return undefined;

	return d.format(getFormat(formatId));
};
