import defaultFiltersMixin from "@mixins/defaultFilters";

const Component = {
	template: "<div/>",
};

const wrapper = mount(Component, {
	mixins: [defaultFiltersMixin],
});

describe("defaultFiltersMixin", () => {
	describe("it can filter strings", () => {
		it.each([
			["test", "te", true],
			["test", "a", false],
			["Test", "te", true],
			[11, 1, true],
			[11, 2, false],
		])("'%s' contains '%s' is %s", (a, b, expected) => {
			expect(wrapper.vm.filterTextDefault(a, b)).toBe(expected);
			expect(wrapper.vm.filterTextContains(a, b)).toBe(expected);
		});

		it.each([
			["test", "test", true],
			["test", "te", false],
			["Test", "test", true],
		])("'%s' equals '%s' is %s", (a, b, expected) => {
			expect(wrapper.vm.filterTextEquals(a, b)).toBe(expected);
		});
	});

	describe("it can filter numbers", () => {
		it.each([
			[1, 1, true],
			[1, 2, false],
			["11", "11", true],
			["11", "12", false],
		])("%s is equal %s is %s", (a, b, expected) => {
			expect(wrapper.vm.filterNumberDefault(a, b)).toBe(expected);
			expect(wrapper.vm.filterNumberEqual(a, b)).toBe(expected);
		});

		it.each([
			[2, 1, true],
			[1, 1, false],
			[0, 1, false],
			["2", "1", true],
			["1", "1", false],
			["0", "1", false],
		])("%s is greater %s is %s", (a, b, expected) => {
			expect(wrapper.vm.filterNumberGreater(a, b)).toBe(expected);
		});

		it.each([
			[2, 1, true],
			[1, 1, true],
			[0, 1, false],
			["2", "1", true],
			["1", "1", true],
			["0", "1", false],
		])("%s is greater or equal %s is %s", (a, b, expected) => {
			expect(wrapper.vm.filterNumberGreaterEqual(a, b)).toBe(expected);
		});

		it.each([
			[1, 2, true],
			[1, 1, false],
			[2, 1, false],
			["1", "2", true],
			["1", "1", false],
			["2", "1", false],
		])("%s is less %s is %s", (a, b, expected) => {
			expect(wrapper.vm.filterNumberLess(a, b)).toBe(expected);
		});

		it.each([
			[1, 2, true],
			[1, 1, true],
			[2, 1, false],
			["1", "2", true],
			["1", "1", true],
			["2", "1", false],
		])("%s is less or equal %s is %s", (a, b, expected) => {
			expect(wrapper.vm.filterNumberLessEqual(a, b)).toBe(expected);
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
			expect(wrapper.vm.filterSelectDefault(a, b)).toBe(expected);
		});
	});

	describe("it can filter dates", () => {
		it.each([
			["2019-01-01 01:00", "2019-01-01 01:00", true],
			["2019-01-01 01:00", "2019-01-01 02:00", false],
			["2019-01-01", "2019-01-01", true],
			["2019-01-01", "2019-01-02", false],
		])("%s is equal to %s is %s", (a, b, expected) => {
			expect(wrapper.vm.filterDateDefault(a, b)).toBe(expected);
			expect(wrapper.vm.filterDateEqual(a, b)).toBe(expected);
		});

		it.each([
			["2019-01-01 01:00", "2019-01-01 01:00", true],
			["2019-01-01 01:00", "2019-01-01 02:00", true],
			["2019-01-01", "2019-01-01", true],
			["2019-01-01", "2019-01-02", true],
			["2019-01-01 02:00", "2019-01-01 01:00", false],
			["2019-01-02", "2019-01-01", false],
		])("%s is before %s is %s", (a, b, expected) => {
			expect(wrapper.vm.filterDateBefore(a, b)).toBe(expected);
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
			expect(wrapper.vm.filterDateAfter(a, b)).toBe(expected);
		});
	});
});
