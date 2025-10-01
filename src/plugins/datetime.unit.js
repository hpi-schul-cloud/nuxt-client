import setupStores from "../../tests/test-utils/setupStores";
import de from "@/locales/de";
import en from "@/locales/en";
import datetime, {
	calculateUTC,
	createInputDateTime,
	currentDate,
	DATETIME_FORMAT,
	formatDateForAlerts,
	fromInputDateTime,
	fromNow,
	fromNowToFuture,
	getTimeFromISOString,
	getUtcOffset,
	inputDateFromDeUTC,
	inputRangeDate,
	isDateTimeInPast,
	printDate,
	printDateFromDeUTC,
	printDateFromStringUTC,
	printDateTimeFromStringUTC,
	setDefaultFormats,
	setDefaultTimezone,
} from "@/plugins/datetime";
import AuthModule from "@/store/auth";
import { createTestingPinia } from "@pinia/testing";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc"; // dependent on utc plugin
import { setActivePinia } from "pinia";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

const TEST_DATETIME_TIMEZONE = "America/New_York";
const TEST_USER_TIMEZONE = "Europe/Berlin";
const TEST_CURRENT_LOCALE = "en";

const translations = { de, en };

const defaultFormats = {
	...DATETIME_FORMAT,
};

const getUTCOffsetForTimezone = (tz) => {
	const expectedOffsetMin = dayjs().tz(tz).utcOffset();
	return calculateUTC(expectedOffsetMin);
};

const localizedFormats = {
	de: {
		...defaultFormats,
		date: translations["de"]["format.date"],
		dateYY: translations["de"]["format.dateYY"],
		dateTime: translations["de"]["format.dateTime"],
		dateTimeYY: translations["de"]["format.dateTimeYY"],
		dateLong: translations["de"]["format.dateLong"],
		time: translations["de"]["format.time"],
	},
	en: {
		...defaultFormats,
		date: translations["en"]["format.date"],
		dateYY: translations["en"]["format.dateYY"],
		dateTime: translations["en"]["format.dateTime"],
		dateTimeYY: translations["en"]["format.dateTimeYY"],
		dateLong: translations["en"]["format.dateLong"],
		time: translations["en"]["format.time"],
	},
};

setDefaultTimezone(TEST_DATETIME_TIMEZONE);

describe("@/plugins/datetime", () => {
	beforeAll(() => {
		setActivePinia(createTestingPinia());
	});

	const dateString = "2019-01-25T02:00:00.000Z";
	const dateUTC = dayjs.tz(dateString, "UTC");
	const dateLocalFromUTC = dateUTC.tz();
	const dateLocal = dayjs.tz(dateString, TEST_DATETIME_TIMEZONE);
	const dateNow = dayjs().tz(TEST_DATETIME_TIMEZONE);

	const dateUTCString = dateUTC.format("DD.MM.YYYY");
	const dateLocalString = dateLocal.format("DD.MM.YYYY");
	const dateLocalStringYY = dateUTC.tz(TEST_DATETIME_TIMEZONE).format("DD.MM.YY");
	const dateTimeLocalStringYY = dateUTC.tz(TEST_DATETIME_TIMEZONE).format("DD.MM.YY HH:mm");

	const dateLocalFromUTCString = dateLocalFromUTC.format("YYYY-MM-DD");
	const timeLocalFromUTCString = dateLocalFromUTC.format("HH:mm");
	const dateFormat = dateLocal.format("YYYY-MM-DD");
	const timeLocalString = dateLocal.format("HH:mm");

	beforeEach(() => {
		setupStores({ authModule: AuthModule });
	});

	it("getUtcOffset", () => {
		const result = getUtcOffset();
		expect(result).toBe(getUTCOffsetForTimezone(TEST_DATETIME_TIMEZONE));
	});

	it("currentDate", () => {
		// to avoid diffrence in milliseconds slice was used
		const result = currentDate().toISOString().slice(0, -5);
		expect(result).toBe(new Date().toISOString().slice(0, -5));
	});

	it("printDateFromDeUTC", () => {
		const result = printDateFromDeUTC(dateUTCString);
		expect(result).toBe(dateLocalString);
		expect(printDateFromDeUTC(null)).toBeNull();
		expect(printDateFromDeUTC("")).toBeNull();
	});

	it("printDateFromStringUTC", () => {
		const result = printDateFromStringUTC(dateString);
		expect(result).toBe(dateLocalStringYY);
		expect(printDateFromStringUTC(null)).toBe("Invalid Date");
	});

	it("printDateTimeFromStringUTC", () => {
		const result = printDateTimeFromStringUTC(dateString);
		expect(result).toBe(dateTimeLocalStringYY);
		expect(printDateTimeFromStringUTC(null)).toBe("Invalid Date");
	});

	it("inputDateFromDeUTC", () => {
		const result = inputDateFromDeUTC(dateUTCString);
		expect(result).toBe(dateLocal.format("YYYY-MM-DD"));
		expect(inputDateFromDeUTC(null)).toBeNull();
		expect(inputDateFromDeUTC("")).toBeNull();
	});

	it("printDate", () => {
		const result = printDate(dateLocal.format("YYYY-MM-DD HH:mm"));
		expect(result).toBe(dateLocal.format("DD.MM.YYYY"));
	});

	it("inputRangeDate", () => {
		const result1 = inputRangeDate(10, "y");
		expect(result1).toBe(dateNow.clone().add(10, "years").format("YYYY-MM-DD"));

		const result2 = inputRangeDate(5);
		expect(result2).toBe(dateNow.clone().add(5, "years").format("YYYY-MM-DD"));

		const result3 = inputRangeDate();
		expect(result3).toBe(dateNow.clone().format("YYYY-MM-DD"));
	});

	it("fromNow", () => {
		const result = fromNow(dateNow.clone().add(7, "days"));
		expect(result).toBe("in 7 days");
	});

	it("formatDateForAlerts", () => {
		const sevenDaysAgo = dayjs.tz(undefined, "UTC").subtract(7, "days");
		const expectedDate = sevenDaysAgo.format("DD.MM.YYYY");
		const result = formatDateForAlerts(sevenDaysAgo);
		expect(result).toBe(expectedDate);
	});

	it("fromNowToFuture", () => {
		const past = dateUTC.toISOString();
		const future = dateNow.add(230, "minute").toISOString();
		const result1 = fromNowToFuture(past, "days");
		const result2 = fromNowToFuture(future, "hours");
		expect(result1).toBeNull();
		expect(result2).toBe(3);
	});

	it("fromInputDateTime", () => {
		const result1 = fromInputDateTime(dateFormat, timeLocalString);
		expect(result1.format()).toStrictEqual(dateLocal.format());

		const expectDate = dayjs.tz(dateFormat, TEST_DATETIME_TIMEZONE);
		const result2 = fromInputDateTime(dateFormat);
		expect(result2.format()).toStrictEqual(expectDate.format());
	});

	it("createInputDateTime", () => {
		const [resultDate, resultTime] = createInputDateTime(dateString);
		expect(resultDate).toStrictEqual(dateLocalFromUTCString);
		expect(resultTime).toStrictEqual(timeLocalFromUTCString);
	});

	it("should transform formats server to input field to server", () => {
		const [inputDate, inputTime] = createInputDateTime(dateString);
		const resultDateTime = fromInputDateTime(inputDate, inputTime);

		const resultDateTimeString = resultDateTime.toISOString();
		expect(resultDateTimeString).toStrictEqual(dateString);
	});

	it("isDateTimeInPast", () => {
		const date = new Date("1991-12-31");
		expect(isDateTimeInPast(date)).toStrictEqual(true);
	});

	it("getTimeFromISOString", () => {
		const date = new Date();
		const ISOString = date.toISOString();
		const hours = date.getHours().toString().padStart(2, "0");
		const minutes = date.getMinutes().toString().padStart(2, "0");

		expect(getTimeFromISOString(ISOString)).toStrictEqual(`${hours}:${minutes}`);
	});

	const mockApp = {
		$cookies: {
			get: vi
				.fn()
				.mockReturnValueOnce(null)
				.mockReturnValueOnce(TEST_USER_TIMEZONE)
				.mockReturnValue(TEST_DATETIME_TIMEZONE),
		},
		$datetime: {
			currentTimezone: TEST_USER_TIMEZONE,
		},
		i18n: {
			t: (key) => translations[TEST_CURRENT_LOCALE]?.[key] || key,
		},
	};

	const mockStore = {
		state: { schools: { school: { timezone: TEST_DATETIME_TIMEZONE } } },
		getters: {
			"auth/getLocale": () => TEST_CURRENT_LOCALE,
		},
	};

	it("init", () => {
		datetime({ app: mockApp, store: mockStore });
		expect(mockApp.$datetime).toStrictEqual({
			currentTimezone: TEST_DATETIME_TIMEZONE,
			currentTimezoneOffset: getUTCOffsetForTimezone(TEST_DATETIME_TIMEZONE),
			userTimezone: undefined,
			userHasSchoolTimezone: false,
		});

		datetime({ app: mockApp, store: mockStore });
		expect(mockApp.$datetime).toStrictEqual({
			currentTimezone: TEST_DATETIME_TIMEZONE,
			currentTimezoneOffset: getUTCOffsetForTimezone(TEST_DATETIME_TIMEZONE),
			userTimezone: TEST_USER_TIMEZONE,
			userHasSchoolTimezone: false,
		});

		datetime({ app: mockApp, store: mockStore });
		expect(mockApp.$datetime).toStrictEqual({
			currentTimezone: TEST_DATETIME_TIMEZONE,
			currentTimezoneOffset: getUTCOffsetForTimezone(TEST_DATETIME_TIMEZONE),
			userTimezone: TEST_DATETIME_TIMEZONE,
			userHasSchoolTimezone: true,
		});

		datetime({ app: mockApp, store: { ...mockStore, getters: {} } });
		expect(mockApp.$datetime).toStrictEqual({
			currentTimezone: TEST_DATETIME_TIMEZONE,
			currentTimezoneOffset: getUTCOffsetForTimezone(TEST_DATETIME_TIMEZONE),
			userTimezone: TEST_DATETIME_TIMEZONE,
			userHasSchoolTimezone: true,
		});

		datetime({ app: mockApp, store: { ...mockStore, state: {} } });
		expect(mockApp.$datetime).toStrictEqual({
			currentTimezone: TEST_USER_TIMEZONE,
			currentTimezoneOffset: getUTCOffsetForTimezone(TEST_USER_TIMEZONE),
			userTimezone: TEST_DATETIME_TIMEZONE,
			userHasSchoolTimezone: true,
		});
	});

	it("setDefaultFormats", () => {
		expect(setDefaultFormats(mockApp)).toStrictEqual(localizedFormats[TEST_CURRENT_LOCALE]);
		expect(setDefaultFormats({ ...mockApp, i18n: null })).toStrictEqual(localizedFormats[TEST_CURRENT_LOCALE]);
	});
});
