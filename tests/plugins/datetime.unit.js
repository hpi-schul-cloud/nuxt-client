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
} from "@plugins/datetime";

describe("@plugins/datetime", () => {
	it("fromUTC", () => {
		const dateString = "2019-01-25T02:00:00.000Z";
		const date = fromUTC(dateString);
		expect(date.toISOString()).toBe(dateString);
	});

	it("printDateFromDeUTC", () => {
		const now = currentDate();
		const dateString = printDateFromDeUTC(now.format("DD.MM.YYYY"));
		expect(dateString).toBe(now.format("DD.MM.YYYY"));
	});

	it("inputDateFromDeUTC", () => {
		const now = currentDate();
		const dateString = inputDateFromDeUTC(now.format("DD.MM.YYYY"));
		expect(dateString).toBe(now.format("YYYY-MM-DD"));
	});

	it("printDate", () => {
		const now = currentDate();
		const dateString = printDate(now.format("YYYY-MM-DD HH:mm"));
		expect(dateString).toBe(now.format("DD.MM.YYYY"));
	});

	it("inputRangeDate", () => {
		const now = currentDate();
		const dateString = inputRangeDate(10, "y");
		expect(dateString).toBe(now.clone().add(10, "years").format("YYYY-MM-DD"));
	});

	it("fromNow", () => {
		const now = currentDate();
		const dateDiff = fromNow(now.clone().add(7, "days"));
		expect(dateDiff).toBe("in 7 days");
	});

	it("fromInputDateTime", () => {
		const date = fromInputDateTime("2020-10-01", "12:30");
		expect(date.toISOString()).toStrictEqual("2020-10-01T10:30:00.000Z");
	});

	it("createInputDateTime", () => {
		const [date, time] = createInputDateTime("2020-10-01 12:30");
		expect(date).toStrictEqual("2020-10-01");
		expect(time).toStrictEqual("12:30");
	});
});
