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
let userTimezone;
let userHasSchoolTimezone = true;

const DATETIME_FORMAT = {
	date: "DD.MM.YYYY",
	dateTime: "DD.MM.YYYY HH:mm",
	dateLong: "dddd, DD. MMMM YYYY",
	time: "HH:mm",
	inputDate: "YYYY-MM-DD", // Don't change this! Format defined by HTML standards
	inputTime: "HH:mm", // Don't change this! Format defined by HTML standards
};

/**
 * @return {String} UTC offset as string based on current timezone, e.g +01:00
 */
export const getUtcOffset = () => dayjs.tz().format("Z");

const getUserTimezone = (app) => app.$cookies.get("USER_TIMEZONE");

/**
 * Sets date, date time format using locale information
 * @param app
 */
const setDefaultFormats = (app) => {
	if (app && app.i18n) {
		DATETIME_FORMAT.date = app.i18n.t("format.date");
		DATETIME_FORMAT.dateTime = app.i18n.t("format.dateTime");
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
	userTimezone = getUserTimezone(app) || app.$datetime.currentTimezone;
	currentTimezone = schoolTimezone || DEFAULT_TIMEZONE;
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
	return dayjs(date).tz(currentTimezone);
};

/**
 * Returns formated date string based on a given date string in German format
 * TODO: Currently the server is returning this date in German format. Please check, if this is needed or can be reverted to international date format, i.e. (DD.MM.YYYY -> YYYY-MM-DD)
 * @param {String} date UTC date string in german format
 * @return {String} Date string based on current timezone using locale date formating
 */
export const printDateFromDeUTC = (date) => {
	if (date) {
		const result = dayjs(date, "DD.MM.YYYY").tz(currentTimezone);
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
		const result = dayjs(date, "DD.MM.YYYY").tz(currentTimezone);
		return result.format(DATETIME_FORMAT.inputDate);
	}
	return null;
};

/**
 * Returns formated date string based on a given date
 * @param {String} date
 * @return {String} Date string based on current timezone using locale date formating
 */
export const printDate = (date) => {
	return dayjs.tz(date).format(DATETIME_FORMAT.date);
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
 * Returns date difference to current local time
 * @param {String} date
 * @return {String} Date difference based on current timezone
 */
export const fromNow = (date) => {
	return dayjs.tz(date).fromNow();
};

/**
 * Returns array of date and time for usage in inputs
 * @param {String} date UTC date string
 * @return {Array} Array of date and time for usage in inputs
 */
export const createInputDateTime = (date) => {
	const resultDate = dayjs(date).tz(currentTimezone);
	return [
		resultDate.format(DATETIME_FORMAT.inputDate),
		resultDate.format(DATETIME_FORMAT.inputTime),
	];
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
