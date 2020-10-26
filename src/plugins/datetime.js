import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // dependent on utc plugin
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/de";
import "dayjs/locale/en";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

const DEFAULT_TIMEZONE = "Europe/Berlin";

let currentTimezone;
let schoolTimezone;
let userTimezone;
let userHasSchoolTimezone = true;

const FORMAT = {
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
		FORMAT.date = app.i18n.t("format.date");
		FORMAT.dateTime = app.i18n.t("format.dateTime");
		FORMAT.dateLong = app.i18n.t("format.dateLong");
		FORMAT.time = app.i18n.t("format.time");
	}
	return FORMAT;
};

/**
 * Sets default timezone from request (user timezone). If user timezone differs from the school timezone, then
 * school timezone will be set as default
 * @param app
 * @param store
 * sets default timezone
 */
const setDefaultTimezone = (app, store) => {
	schoolTimezone = store?.state?.auth?.school?.timezone;
	userTimezone = getUserTimezone(app) || app.$datetime.currentTimezone;
	currentTimezone = schoolTimezone || DEFAULT_TIMEZONE;
	userHasSchoolTimezone = !schoolTimezone || currentTimezone === userTimezone;

	dayjs.tz.setDefault(currentTimezone);

	app.$datetime.currentTimezone = currentTimezone;
	app.$datetime.currentTimezoneOffset = getUtcOffset();
	app.$datetime.userTimezone = userTimezone;
	app.$datetime.userHasSchoolTimezone = userHasSchoolTimezone;

	console.log(
		`datetime: instance timezone "${app.$datetime.currentTimezone} (${app.$datetime.currentTimezoneOffset})"`
	);
	console.log(`datetime: user timezone "${app.$datetime.userTimezone}"`);
	console.log(
		`datetime: same timezone "${JSON.stringify(
			app.$datetime.userHasSchoolTimezone
		)}"`
	);
};

export const fromUTC = (date) => {
	return dayjs(date).tz(currentTimezone);
};

/**
 * Returns formated date string based on a given date string in German format
 * TODO: Currently the server is returning this date in German format. Please check, if this is needed or can be reverted to international date format, i.e. (DD.MM.YYYY -> YYYY-MM-DD)
 * @param date UTC date string in german format
 * @return {String} Date string based on current timezone
 */
export const formatDateFromDeUTC = (date) => {
	if (date) {
		const result = dayjs(date, "DD.MM.YYYY").tz(currentTimezone);
		return result.format(FORMAT.date);
	}
	return null;
};

export const inputDateFromDeUTC = (date) => {
	if (date) {
		const result = dayjs(date, "DD.MM.YYYY").tz(currentTimezone);
		return result.format(FORMAT.inputDate);
	}
	return null;
};

export const formatDate = (date) => {
	return dayjs.tz(date).format(FORMAT.date);
};

export const inputRangeDate = (offset = 0, offsetBase = "y") => {
	return dayjs().add(offset, offsetBase).format(FORMAT.inputDate);
};

export const fromInputDateTime = (date, time = null) => {
	const dateString = `${date}${time ? ` ${time}` : ""}`;
	return dayjs.tz(dateString);
};

export const fromNow = (date) => {
	return dayjs.tz(date).fromNow();
};

export const createInputDateTime = (date) => {
	const resultDate = dayjs(date).tz(currentTimezone);
	return [
		resultDate.format(FORMAT.inputDate),
		resultDate.format(FORMAT.inputTime),
	];
};

/**
 * @return {dayjs} Current date based on current timezone
 */
export const currentDate = () => {
	const result = dayjs.tz();
	return result;
};

export default ({ app, store }) => {
	app.$datetime = {};
	setDefaultTimezone(app, store);
	setDefaultFormats(app);

	const locale = store.getters["auth/getLocale"] || "de";
	dayjs.locale(locale);
};
