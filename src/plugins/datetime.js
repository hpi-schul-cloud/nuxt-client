import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // dependent on utc plugin
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

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

export const formatDate = (date) => {
	return dayjs.tz(date).format(FORMAT.date);
};

export default ({ app, store }) => {
	app.$datetime = {};
	setDefaultTimezone(app, store);
	setDefaultFormats(app);
};
