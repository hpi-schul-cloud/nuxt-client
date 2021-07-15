import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // dependent on utc plugin
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/de";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

const DEFAULT_TIMEZONE = "Europe/Berlin";

let currentTimezone;
let schoolTimezone;
let instanceTimezone;
let userTimezone;
let userHasSchoolTimezone = true;

export const DATETIME_FORMAT = {
	date: "DD.MM.YYYY",
	dateYY: "DD.MM.YY",
	dateTime: "DD.MM.YYYY HH:mm",
	dateTimeYY: "DD.MM.YY HH:mm",
	dateLong: "dddd, DD. MMMM YYYY",
	time: "HH:mm",
	inputDate: "YYYY-MM-DD", // Don't change this! Format defined by HTML standards
	inputTime: "HH:mm", // Don't change this! Format defined by HTML standards
};

/**
 * Calculates UTC offset using offset in minutes.
 * @param offsetMin
 * @returns {string}
 */
export const calculateUTC = (offsetMin) => {
	const prefix = offsetMin >= 0 ? "+" : "-";
	const hours = String(Math.floor(Math.abs(offsetMin) / 60)).padStart(2, "0");
	const minutes = String(Math.abs(offsetMin) % 60).padStart(2, "0");
	return `${prefix}${hours}:${minutes}`;
};

/**
 * @return {String} UTC offset as string based on current timezone, e.g +01:00
 */
export const getUtcOffset = () => {
	const offset = dayjs.tz().utcOffset();
	return calculateUTC(offset);
};

const getUserTimezone = (app) => app.$cookies.get("USER_TIMEZONE");

/**
 * Sets date, date time format using locale information
 * @param app
 */
export const setDefaultFormats = (app) => {
	if (app && app.i18n) {
		DATETIME_FORMAT.date = app.i18n.t("format.date");
		DATETIME_FORMAT.dateYY = app.i18n.t("format.dateYY");
		DATETIME_FORMAT.dateTime = app.i18n.t("format.dateTime");
		DATETIME_FORMAT.dateTimeYY = app.i18n.t("format.dateTimeYY");
		DATETIME_FORMAT.dateLong = app.i18n.t("format.dateLong");
		DATETIME_FORMAT.time = app.i18n.t("format.time");
	}
	return DATETIME_FORMAT;
};

export const setDefaultTimezone = (defaultTimezone) => {
	dayjs.tz.setDefault(defaultTimezone);
	currentTimezone = defaultTimezone;
};

/**
 * Sets default timezone from request (user timezone). If user timezone differs from the school timezone, then
 * school timezone will be set as default
 * @param app
 * @param store
 * sets default timezone
 */
const initDefaultTimezone = (app, store) => {
	schoolTimezone = store?.state?.auth?.school?.timezone;
	instanceTimezone = store?.getters["env-config/getDefaultTimezone"];
	userTimezone = getUserTimezone(app) || app.$datetime.currentTimezone;
	currentTimezone = schoolTimezone || instanceTimezone || DEFAULT_TIMEZONE;
	userHasSchoolTimezone = !schoolTimezone || currentTimezone === userTimezone;

	setDefaultTimezone(currentTimezone);

	app.$datetime.currentTimezone = currentTimezone;
	app.$datetime.currentTimezoneOffset = getUtcOffset();
	app.$datetime.userTimezone = userTimezone;
	app.$datetime.userHasSchoolTimezone = userHasSchoolTimezone;
};

/**
 * Returns formated date string based on a given UTC date string
 * @param {String} date
 * @return {dayjs} Date object based on current timezone
 */
export const fromUTC = (date) => {
	return dayjs.tz(date, "UTC");
};

/**
 * Returns formated date string based on a given date string in German format
 * TODO: Currently the server is returning this date in German format. Please check, if this is needed or can be reverted to international date format, i.e. (DD.MM.YYYY -> YYYY-MM-DD)
 * @param {String} date UTC date string in german format
 * @return {String} Date string based on current timezone using locale date formating
 */
export const printDateFromDeUTC = (date) => {
	if (date) {
		const result = dayjs.tz(date, "DD.MM.YYYY", "UTC");
		return result.format(DATETIME_FORMAT.date);
	}
	return null;
};

/**
 * Returns formated date string based on a given date string in German format
 * TODO: Currently the server is returning this date in German format. Please check, if this is needed or can be reverted to international date format, i.e. (DD.MM.YYYY -> YYYY-MM-DD)
 * @param {String} date DE formated date string based on UTC
 * @return {String} Date string based on current timezone for usage in input field (YYYY-MM-DD)
 */
export const inputDateFromDeUTC = (date) => {
	if (date) {
		const result = dayjs.tz(date, "DD.MM.YYYY", "UTC");
		return result.format(DATETIME_FORMAT.inputDate);
	}
	return null;
};

/**
 * Returns formated date string based on a given date string in Backend format
 * @param {String} date formatted date string from input fields (YYYY-MM-DD)
 * @return {String} Date string based on current timezone for Backend format (DD.MM.YYYY)
 */
export const inputDateFormat = (date) => {
	if (date) {
		const result = dayjs(date, DATETIME_FORMAT.inputDate).tz();
		return result.format("DD.MM.YYYY");
	}
	return null;
};

/**
 * Returns formated date string based on a given date
 * @param {String} date
 * @return {String} Date string based on current timezone using locale date formating
 */
export const printDate = (date) => {
	return fromUTC(date).format(DATETIME_FORMAT.date);
};

/**
 * Returns formated date string based on a given dayjs object
 * @param {String} Date string based on UTC (unformatted)
 * @return {String} Date string based on current timezone using locale date formating
 */
export const printDateFromStringUTC = (date) => {
	return dayjs(date).tz().format(DATETIME_FORMAT.dateYY);
};

/**
 * Returns formated date string based on a given dayjs object
 * @param {datejs} date
 * @return {String} Date string based on current timezone using locale date formating
 */
export const printDateTime = (date) => {
	return date.format(DATETIME_FORMAT.dateTime);
};

/**
 * Returns formated date string based on a given dayjs object
 * @param {String} Date string based on UTC (unformatted)
 * @return {String} Date string based on current timezone using locale date formating
 */
export const printDateTimeFromStringUTC = (date) => {
	return dayjs(date).tz().format(DATETIME_FORMAT.dateTimeYY);
};

/**
 * Returns formated date string based on a given dayjs object
 * @param {String} date
 * @return {String} Date string based on current timezone using locale date formating slashed
 */
export const printDateFromDayJs = (date) => {
	return date.format(DATETIME_FORMAT.date);
};

/**
 * Returns formated date string based on a given timestamp
 * @param {String|Integer} timestamp
 * @return {String} Date string based on current timezone using locale date formating slashed
 */
export const printDateFromTimestamp = (timestamp) => {
	return dayjs(parseInt(timestamp)).format(DATETIME_FORMAT.date);
};

/**
 * Returns formated based on current date and given offset
 * @param {Number} offset Offset as number
 * @param {String} offsetBase Base of offset, e.g. (y)ear, (d)days, (m)inutes...
 * @return {String} Date string based on current timezone using locale date formating
 */
export const inputRangeDate = (offset = 0, offsetBase = "y") => {
	return dayjs().add(offset, offsetBase).format(DATETIME_FORMAT.inputDate);
};

/**
 * Returns date by given input date and time (optional)
 * @param {String} date
 * @param {String} time
 * @return {dayjs} Date object based on current timezone
 */
export const fromInputDateTime = (date, time = null) => {
	const dateString = `${date}${time ? ` ${time}` : ""}`;
	return dayjs.tz(dateString);
};

/**
 * Returns array of date and time for usage in inputs
 * @param {String} date UTC date string
 * @return {Array} Array of date and time for usage in inputs
 */
export const createInputDateTime = (date) => {
	const utcDate = dayjs.tz(date, "UTC");
	const localDate = utcDate.tz();
	return [
		localDate.format(DATETIME_FORMAT.inputDate),
		localDate.format(DATETIME_FORMAT.inputTime),
	];
};

/**
 * Returns date difference to current local time
 * @param {String} date
 * @return {String} Date difference based on current timezone
 */
export const fromNow = (date) => {
	return fromUTC(date).fromNow();
};

/**
 * Returns future date difference to current local time
 * @param {String} date
 * @param {String} unit
 * @return {Number} Future date difference based on the unit and current timezone
 */
export const fromNowToFuture = (date, unit) => {
	const input = dayjs.tz(date, "UTC");
	const today = currentDate();
	if (today.isBefore(input)) {
		const diff = input.diff(today, unit);
		return diff;
	} else return null;
};

/**
 * @return {dayjs} Current date based on current timezone
 */
export const currentDate = () => {
	return dayjs.tz();
};

export default ({ app, store }) => {
	app.$datetime = {};
	initDefaultTimezone(app, store);
	setDefaultFormats(app);

	const locale = store.getters["auth/getLocale"] || "de";
	dayjs.locale(locale);
};
