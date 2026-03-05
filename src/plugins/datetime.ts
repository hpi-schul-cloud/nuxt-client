import "dayjs/locale/de";
import "dayjs/locale/es";
import "dayjs/locale/uk";
import { useAppStore } from "@data-app";
import dayjs, { ManipulateType } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc"; // dependent on utc plugin

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

export const DATETIME_FORMAT = {
	date: "DD.MM.YYYY",
	dateYY: "DD.MM.YY",
	dateTime: "DD.MM.YYYY HH:mm",
	dateTimeYY: "DD.MM.YY HH:mm",
	time: "HH:mm",
	inputDate: "YYYY-MM-DD", // Don't change this! Format defined by HTML standards
	inputTime: "HH:mm", // Don't change this! Format defined by HTML standards
};

/**
 * Returns formated date string based on a given UTC date string
 * @return {dayjs} Date object based on current timezone
 */
export const fromUTC = (date: string) => {
	// Date object is needed for firefox bug if date is before 1970
	const dateObject = new Date(date);

	return dayjs.tz(dateObject, "UTC");
};

/**
 * Returns formated date string based on a given date string in German format
 * TODO: Currently the server is returning this date in German format. Please check, if this is needed or can be reverted to international date format, i.e. (DD.MM.YYYY -> YYYY-MM-DD)
 * @param date DE formated date string based on UTC
 * @return Date string based on current timezone for usage in input field (YYYY-MM-DD)
 */
export const inputDateFromDeUTC = (date: string) => {
	if (date) {
		const result = dayjs.tz(date, "DD.MM.YYYY", "UTC");
		return result.format(DATETIME_FORMAT.inputDate);
	}
	return null;
};

/**
 * Returns formated date string based on a given date string in Backend format
 * @param date formatted date string from input fields (YYYY-MM-DD)
 * @return Date string based on current timezone for Backend format (DD.MM.YYYY)
 */
export const inputDateFormat = (date: string) => {
	if (date) {
		const result = dayjs(date, DATETIME_FORMAT.inputDate).tz();
		return result.format("DD.MM.YYYY");
	}
	return null;
};

/**
 * Returns formated date string based on a given dayjs object
 * @param date string based on UTC (unformatted)
 * @return Date string based on current timezone using locale date formating
 */
export const printDateFromStringUTC = (date: string | undefined) => dayjs(date).tz().format(DATETIME_FORMAT.dateYY);

/**
 * Returns formated date string based on a given dayjs object
 * @param date string based on UTC (unformatted)
 * @return Date string based on current timezone using locale date formating
 */
export const printDateTimeFromStringUTC = (date: string | undefined) =>
	dayjs(date).tz().format(DATETIME_FORMAT.dateTimeYY);

/**
 * Returns formated (DD.MM.YYYY) date string based on a given dayjs object
 * @return Date string based on current timezone using locale date formating
 */
export const printFromStringUtcToFullDate = (date: string) => dayjs(date).tz().format(DATETIME_FORMAT.date);

export const printTimeFromStringUTC = (date: string) => dayjs(date).tz().format(DATETIME_FORMAT.time);

/**
 * Returns formated based on current date and given offset
 * @param offset Offset as number
 * @param offsetBase Base of offset, e.g. (y)ear, (d)days, (m)inutes...
 * @return Date string based on current timezone using locale date formating
 */
export const inputRangeDate = (offset = 0, offsetBase: ManipulateType = "y") =>
	dayjs().add(offset, offsetBase).format(DATETIME_FORMAT.inputDate);

/**
 * Returns date by given input date and time (optional)
 * @return Date object based on current timezone
 */
export const fromInputDateTime = (date: string, time: string) => {
	const dateString = `${date}${time ? ` ${time}` : ""}`;
	return dayjs.tz(dateString);
};

/**
 * Returns array of date and time for usage in inputs
 * @param date UTC date string
 * @return {Array} Array of date and time for usage in inputs
 */
export const createInputDateTime = (date: string) => {
	const utcDate = dayjs.tz(date, "UTC");
	const localDate = utcDate.tz();
	return [localDate.format(DATETIME_FORMAT.inputDate), localDate.format(DATETIME_FORMAT.inputTime)];
};

/**
 * Returns date difference to current local time
 * @param date
 * @param {boolean} isLocalTimeZone set true if input date is to be handled in local time zone instead of utc
 * @return Date difference based on current timezone
 */
export const fromNow = (date: string, isLocalTimeZone: boolean) => {
	if (isLocalTimeZone) {
		return dayjs(date).fromNow();
	}
	return fromUTC(date).fromNow();
};

export const formatDateForAlerts = (date: string, isLocalTimeZone = false) => {
	const time = isLocalTimeZone ? dayjs(date) : dayjs.tz(date, "UTC");
	const current = isLocalTimeZone ? dayjs() : dayjs.utc();

	setDayjsLocale();

	const totalDaysDiff = Math.abs(current.diff(time, "day"));
	const MAX_DAYS_BEFORE_SHOWING_FULL_DATE = 7;

	if (totalDaysDiff < MAX_DAYS_BEFORE_SHOWING_FULL_DATE) {
		// If it is less than 7 days, we use fromNow
		return fromNow(date, isLocalTimeZone);
	} else {
		// If it is 7 days or more, we return in European format.
		return time.format("DD.MM.YYYY");
	}
};

export const setDayjsLocale = () => {
	const locale = useAppStore().locale || "de";
	dayjs.locale(locale);
};

/**
 * Returns future date difference to current local time
 * @return Future date difference based on the unit and current timezone
 */
export const fromNowToFuture = (date: string, unit: string) => {
	const input = dayjs.tz(date, "UTC");
	const today = currentDate();
	if (today.isBefore(input)) {
		return input.diff(today, unit);
	}
};

/**
 * @return Current date based on current timezone
 */
export const currentDate = () => dayjs.tz();

export const isDateTimeInPast = (dateTime: string | undefined) => {
	if (!dateTime) return false;

	return new Date(dateTime) < new Date();
};

export const getTimeFromISOString = (dateIsoString: string | undefined) => {
	if (!dateIsoString) return "";

	const locale = useAppStore().locale || "de";
	return new Date(dateIsoString).toLocaleTimeString(locale.value, {
		timeStyle: "short",
		hourCycle: "h23",
	});
};
