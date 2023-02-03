import { defaultFilters } from "./defaultFilters";

describe("@/components/organisms/DataFilter/defaultFilters", () => {
	describe("it can filter strings", () => {
		it.each([
			["test", "te", true],
			["test", "a", false],
			["Test", "te", true],
			[11, 1, true],
			[11, 2, false],
		])("%p includes %p is %s", (a, b, expected) => {
			expect(defaultFilters["text"]["default"](a, b)).toBe(expected);
			expect(defaultFilters["text"]["includes"](a, b)).toBe(expected);
		});

		it.each([
			["test", "test", true],
			["test", "te", false],
			["Test", "test", true],
		])("%p = %p is %s", (a, b, expected) => {
			expect(defaultFilters["text"]["="](a, b)).toBe(expected);
		});

		it.each([
			["test", "test", false],
			["te", "test", true],
			["Test", "test", false],
		])("%p < %p is %s", (a, b, expected) => {
			expect(defaultFilters["text"]["<"](a, b)).toBe(expected);
		});

		it.each([
			["test", "test", true],
			["test", "te", false],
			["Test", "test", true],
		])("%p <= %p is %s", (a, b, expected) => {
			expect(defaultFilters["text"]["<="](a, b)).toBe(expected);
		});
	});

	describe("it can filter numbers", () => {
		it.each([
			[1, 1, true],
			[1, 2, false],
			["11", "11", true],
			["11", "12", false],
		])("%s = %s is %s", (a, b, expected) => {
			expect(defaultFilters["number"]["default"](a, b)).toBe(expected);
			expect(defaultFilters["number"]["="](a, b)).toBe(expected);
		});

		it.each([
			[2, 1, false],
			[1, 1, false],
			[0, 1, true],
			["2", "1", false],
			["1", "1", false],
			["0", "1", true],
		])("%s < %s is %s", (a, b, expected) => {
			expect(defaultFilters["number"]["<"](a, b)).toBe(expected);
		});

		it.each([
			[1, 2, true],
			[1, 1, true],
			[2, 1, false],
			["1", "2", true],
			["1", "1", true],
			["2", "1", false],
		])("%s <= %s is %s", (a, b, expected) => {
			expect(defaultFilters["number"]["<="](a, b)).toBe(expected);
		});
	});

	describe("it can filter options", () => {
		it.each([
			[
				"test1",
				[
					{ checked: true, value: "test1" },
					{ checked: true, value: "test2" },
				],
				true,
			],
			[
				"test2",
				[
					{ checked: true, value: "test1" },
					{ checked: true, value: "test2" },
				],
				true,
			],
			[
				"test3",
				[
					{ checked: true, value: "test1" },
					{ checked: true, value: "test2" },
				],
				false,
			],
		])("%s is selected in %o is %s", (a, b, expected) => {
			expect(defaultFilters["select"]["default"](a, b)).toBe(expected);
		});
	});

	describe("it can filter dates", () => {
		it.each([
			["2019-01-01 01:00", "2019-01-01 01:00", true],
			["2019-01-01 01:00", "2019-01-01 02:00", false],
			["2019-01-01", "2019-01-01", true],
			["2019-01-01", "2019-01-02", false],
		])("%s = %s is %s", (a, b, expected) => {
			expect(defaultFilters["date"]["default"](a, b)).toBe(expected);
			expect(defaultFilters["date"]["="](a, b)).toBe(expected);
		});

		it.each([
			["2019-01-01 01:00", "2019-01-01 01:00", true],
			["2019-01-01 01:00", "2019-01-01 02:00", true],
			["2019-01-01", "2019-01-01", true],
			["2019-01-01", "2019-01-02", true],
			["2019-01-01 02:00", "2019-01-01 01:00", false],
			["2019-01-02", "2019-01-01", false],
		])("%s is before %s is %s", (a, b, expected) => {
			expect(defaultFilters["date"]["before"](a, b)).toBe(expected);
		});

		it.each([
			["2019-01-01 01:00", "2019-01-01 02:00", false],
			["2019-01-01 01:00", "2019-01-01 01:00", true],
			["2019-01-01 02:00", "2019-01-01 01:00", true],
			["2019-01-01", "2019-01-01", true],
			["2019-01-02", "2019-01-01", true],
			["2019-01-01 01:00", "2019-01-01 02:00", false],
			["2019-01-01", "2019-01-02", false],
		])("%s is after %s is %s", (a, b, expected) => {
			expect(defaultFilters["date"]["after"](a, b)).toBe(expected);
		});
	});
});
