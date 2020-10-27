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
} from "@plugins/datetime";

setDefaultTimezone("America/New_York");
// setDefaultTimezone("Europe/Berlin");

describe("@plugins/datetime", () => {
	const dateString = "2019-01-25T02:00:00.000Z";

	it("fromUTC", () => {
		const date = fromUTC(dateString);
		expect(date.toISOString()).toBe(dateString);
	});

	it("printDateFromDeUTC", () => {
		const dateUTC = fromUTC(dateString).utc().format("DD.MM.YYYY");
		const dateLocal = fromUTC(dateString).format("DD.MM.YYYY");
		const result = printDateFromDeUTC(dateUTC);
		expect(result).toBe(dateLocal);
	});

	it("inputDateFromDeUTC", () => {
		const dateUTC = fromUTC(dateString).utc().format("DD.MM.YYYY");
		const dateLocal = fromUTC(dateString).format("YYYY-MM-DD");
		const result = inputDateFromDeUTC(dateUTC);
		expect(result).toBe(dateLocal);
	});

	it("printDate", () => {
		const now = currentDate();
		const result = printDate(now.format("YYYY-MM-DD HH:mm"));
		expect(result).toBe(now.format("DD.MM.YYYY"));
	});

	it("inputRangeDate", () => {
		const now = currentDate();
		const result = inputRangeDate(10, "y");
		expect(result).toBe(now.clone().add(10, "years").format("YYYY-MM-DD"));
	});

	it("fromNow", () => {
		const now = currentDate();
		const result = fromNow(now.clone().add(7, "days"));
		expect(result).toBe("in 7 days");
	});

	it("fromInputDateTime", () => {
		const datetime = fromUTC(dateString);
		const date = datetime.format("YYYY-MM-DD");
		const time = datetime.format("HH:mm");
		const result = fromInputDateTime(date, time);
		expect(result.toISOString()).toStrictEqual(dateString);
	});

	it("createInputDateTime", () => {
		const datetime = fromUTC(dateString);
		const date = datetime.format("YYYY-MM-DD");
		const time = datetime.format("HH:mm");
		const [resultDate, resultTime] = createInputDateTime(dateString);
		expect(resultDate).toStrictEqual(date);
		expect(resultTime).toStrictEqual(time);
	});
});
