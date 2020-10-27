import {
	printDate,
	currentDate,
	fromInputDateTime,
	fromNow,
	createInputDateTime,
	inputRangeDate,
	inputDateFromDeUTC,
	printDateFromDeUTC,
	fromUTC,
	setDefaultTimezone,
	getUtcOffset,
} from "@plugins/datetime";
import datetime from "@plugins/datetime";

const TEST_DATETIME_TIMEZONE = "America/New_York";
const TEST_USER_TIMEZONE = "Europe/Berlin";

setDefaultTimezone(TEST_DATETIME_TIMEZONE);

describe("@plugins/datetime", () => {
	const dateString = "2019-01-25T02:00:00.000Z";
	const dateUTC = fromUTC(dateString).utc().format("DD.MM.YYYY");
	const dateLocal = fromUTC(dateString);
	const dateLocalString = dateLocal.format("DD.MM.YYYY");
	const now = currentDate();
	const dateFormat = dateLocal.format("YYYY-MM-DD");
	const time = dateLocal.format("HH:mm");
	const utcOffset = "-04:00";

	it("getUtcOffset", () => {
		const result = getUtcOffset();
		expect(result).toBe(utcOffset);
	});

	it("currentDate", () => {
		// to avoid diffrence in milliseconds slice was used
		const currentNow = now.toISOString().slice(0, -5);
		expect(currentNow).toBe(new Date().toISOString().slice(0, -5));
	});

	it("fromUTC", () => {
		const date = fromUTC(dateString);
		expect(date.toISOString()).toBe(dateString);
	});

	it("printDateFromDeUTC", () => {
		const result = printDateFromDeUTC(dateUTC);
		expect(result).toBe(dateLocalString);
		expect(printDateFromDeUTC(null)).toBeNull();
		expect(printDateFromDeUTC("")).toBeNull();
	});

	it("inputDateFromDeUTC", () => {
		const dateLocalStringYear = fromUTC(dateString).format("YYYY-MM-DD");
		const result = inputDateFromDeUTC(dateUTC);
		expect(result).toBe(dateLocalStringYear);
	});

	it("printDate", () => {
		const result = printDate(now.format("YYYY-MM-DD HH:mm"));
		expect(result).toBe(now.format("DD.MM.YYYY"));
	});

	it("inputRangeDate", () => {
		const result = inputRangeDate(10, "y");
		expect(result).toBe(now.clone().add(10, "years").format("YYYY-MM-DD"));
	});

	it("fromNow", () => {
		const result = fromNow(now.clone().add(7, "days"));
		expect(result).toBe("in 7 days");
	});

	it("fromInputDateTime", () => {
		const result = fromInputDateTime(dateFormat, time);
		expect(result.toISOString()).toStrictEqual(dateString);
	});

	it("createInputDateTime", () => {
		const [resultDate, resultTime] = createInputDateTime(dateString);
		expect(resultDate).toStrictEqual(dateFormat);
		expect(resultTime).toStrictEqual(time);
	});

	const mockApp = {
		$cookies: {
			get: () => {
				return TEST_USER_TIMEZONE;
			},
		},
	};

	const mockStore = {
		state: { auth: { school: { timezone: TEST_DATETIME_TIMEZONE } } },
		getters: {
			"auth/getLocale": () => {
				return "de";
			},
		},
	};

	it("setDefaultFormats", () => {
		datetime({ app: mockApp, store: mockStore });

		const result = {
			currentTimezone: TEST_DATETIME_TIMEZONE,
			currentTimezoneOffset: utcOffset,
			userTimezone: TEST_USER_TIMEZONE,
			userHasSchoolTimezone: false,
		};
		expect(mockApp.$datetime).toStrictEqual(result);
	});
});
