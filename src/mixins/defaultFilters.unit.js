import defaultFiltersMixin from "@mixins/defaultFilters";

const Component = {
	template: "<div/>",
};

const wrapper = mount(Component, {
	mixins: [defaultFiltersMixin],
});

describe("defaultFiltersMixin", () => {
	it("can filter strings", () => {
		expect(wrapper.vm.filterStringDefault("test", "te")).toBe(true);
		expect(wrapper.vm.filterStringDefault("test", "a")).toBe(false);
		expect(wrapper.vm.filterStringDefault("Test", "te")).toBe(true);
		expect(wrapper.vm.filterStringDefault(11, 1)).toBe(true);
		expect(wrapper.vm.filterStringDefault(11, 2)).toBe(false);

		expect(wrapper.vm.filterStringContains("test", "te")).toBe(true);
		expect(wrapper.vm.filterStringContains("test", "a")).toBe(false);
		expect(wrapper.vm.filterStringContains("Test", "te")).toBe(true);
		expect(wrapper.vm.filterStringContains(11, 1)).toBe(true);
		expect(wrapper.vm.filterStringContains(11, 2)).toBe(false);

		expect(wrapper.vm.filterStringEquals("test", "test")).toBe(true);
		expect(wrapper.vm.filterStringEquals("test", "te")).toBe(false);
		expect(wrapper.vm.filterStringEquals("Test", "test")).toBe(true);
	});
	it("can filter numbers", () => {
		expect(wrapper.vm.filterNumberDefault(1, 1)).toBe(true);
		expect(wrapper.vm.filterNumberDefault(1, 2)).toBe(false);
		expect(wrapper.vm.filterNumberDefault("11", "11")).toBe(true);
		expect(wrapper.vm.filterNumberDefault("11", "12")).toBe(false);

		expect(wrapper.vm.filterNumberEqual(1, 1)).toBe(true);
		expect(wrapper.vm.filterNumberEqual(1, 2)).toBe(false);
		expect(wrapper.vm.filterNumberEqual("11", "11")).toBe(true);
		expect(wrapper.vm.filterNumberEqual("11", "12")).toBe(false);

		expect(wrapper.vm.filterNumberGreater(2, 1)).toBe(true);
		expect(wrapper.vm.filterNumberGreater(1, 1)).toBe(false);
		expect(wrapper.vm.filterNumberGreater(0, 1)).toBe(false);
		expect(wrapper.vm.filterNumberGreater("2", "1")).toBe(true);
		expect(wrapper.vm.filterNumberGreater("1", "1")).toBe(false);
		expect(wrapper.vm.filterNumberGreater("0", "1")).toBe(false);

		expect(wrapper.vm.filterNumberGreaterEqual(2, 1)).toBe(true);
		expect(wrapper.vm.filterNumberGreaterEqual(1, 1)).toBe(true);
		expect(wrapper.vm.filterNumberGreaterEqual(0, 1)).toBe(false);
		expect(wrapper.vm.filterNumberGreaterEqual("2", "1")).toBe(true);
		expect(wrapper.vm.filterNumberGreaterEqual("1", "1")).toBe(true);
		expect(wrapper.vm.filterNumberGreaterEqual("0", "1")).toBe(false);

		expect(wrapper.vm.filterNumberLess(1, 2)).toBe(true);
		expect(wrapper.vm.filterNumberLess(1, 1)).toBe(false);
		expect(wrapper.vm.filterNumberLess(2, 1)).toBe(false);
		expect(wrapper.vm.filterNumberLess("1", "2")).toBe(true);
		expect(wrapper.vm.filterNumberLess("1", "1")).toBe(false);
		expect(wrapper.vm.filterNumberLess("2", "1")).toBe(false);

		expect(wrapper.vm.filterNumberLessEqual(1, 2)).toBe(true);
		expect(wrapper.vm.filterNumberLessEqual(1, 1)).toBe(true);
		expect(wrapper.vm.filterNumberLessEqual(2, 1)).toBe(false);
		expect(wrapper.vm.filterNumberLessEqual("1", "2")).toBe(true);
		expect(wrapper.vm.filterNumberLessEqual("1", "1")).toBe(true);
		expect(wrapper.vm.filterNumberLessEqual("2", "1")).toBe(false);
	});
	it("can filter options", () => {
		expect(
			wrapper.vm.filterSelectDefault("test1", [
				{ checked: true, value: "test1" },
				{ checked: true, value: "test2" },
			])
		).toBe(true);
		expect(
			wrapper.vm.filterSelectDefault("test2", [
				{ checked: true, value: "test1" },
				{ checked: true, value: "test2" },
			])
		).toBe(true);
		expect(
			wrapper.vm.filterSelectDefault("test3", [
				{ checked: true, value: "test1" },
				{ checked: true, value: "test2" },
			])
		).toBe(false);
	});
	it("can filter dates", () => {
		expect(
			wrapper.vm.filterDateDefault("2019-01-01 01:00", "2019-01-01 01:00")
		).toBe(true);
		expect(
			wrapper.vm.filterDateDefault("2019-01-01 01:00", "2019-01-01 02:00")
		).toBe(false);
		expect(wrapper.vm.filterDateDefault("2019-01-01", "2019-01-01")).toBe(true);
		expect(wrapper.vm.filterDateDefault("2019-01-01", "2019-01-02")).toBe(
			false
		);

		expect(
			wrapper.vm.filterDateEqual("2019-01-01 01:00", "2019-01-01 01:00")
		).toBe(true);
		expect(
			wrapper.vm.filterDateEqual("2019-01-01 01:00", "2019-01-01 02:00")
		).toBe(false);
		expect(wrapper.vm.filterDateEqual("2019-01-01", "2019-01-01")).toBe(true);
		expect(wrapper.vm.filterDateEqual("2019-01-01", "2019-01-02")).toBe(false);

		expect(
			wrapper.vm.filterDateBefore("2019-01-01 01:00", "2019-01-01 01:00")
		).toBe(true);
		expect(
			wrapper.vm.filterDateBefore("2019-01-01 01:00", "2019-01-01 02:00")
		).toBe(true);
		expect(wrapper.vm.filterDateBefore("2019-01-01", "2019-01-01")).toBe(true);
		expect(wrapper.vm.filterDateBefore("2019-01-01", "2019-01-02")).toBe(true);
		expect(
			wrapper.vm.filterDateBefore("2019-01-01 02:00", "2019-01-01 01:00")
		).toBe(false);
		expect(wrapper.vm.filterDateBefore("2019-01-02", "2019-01-01")).toBe(false);

		expect(
			wrapper.vm.filterDateAfter("2019-01-01 01:00", "2019-01-01 01:00")
		).toBe(true);
		expect(
			wrapper.vm.filterDateAfter("2019-01-01 02:00", "2019-01-01 01:00")
		).toBe(true);
		expect(wrapper.vm.filterDateAfter("2019-01-01", "2019-01-01")).toBe(true);
		expect(wrapper.vm.filterDateAfter("2019-01-02", "2019-01-01")).toBe(true);
		expect(
			wrapper.vm.filterDateAfter("2019-01-01 01:00", "2019-01-01 02:00")
		).toBe(false);
		expect(wrapper.vm.filterDateAfter("2019-01-01", "2019-01-02")).toBe(false);
	});
});
