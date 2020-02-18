import {
	tableData,
	tableColumns,
	tableFilters,
} from "./DataTable.data-factory.js";
import DataTable from "./DataTable";
import _ from "lodash";

const defaultData = tableData(50);

function getWrapper(attributes) {
	return mount(DataTable, {
		sync: false, // https://github.com/vuejs/vue-test-utils/issues/1130, https://github.com/logaretm/vee-validate/issues/1996
		propsData: {
			data: defaultData,
			trackBy: "id",
			columns: tableColumns,
			...attributes,
		},
	});
}

const getTableRowsContent = async (wrapper) => {
	await wrapper.vm.$nextTick();
	return wrapper.findAll("tbody tr").wrappers.map((rowWrapper) => {
		return rowWrapper.findAll("td").wrappers.map((cell) => cell.text());
	});
};

describe("@components/organisms/DataTable/DataTable", () => {
	it(...isValidComponent(DataTable));

	describe("pagination", () => {
		const total = 150;
		const bigData = tableData(total);

		const getNextPageButton = (wrapper) =>
			wrapper
				.findAll(".pagination-link")
				.wrappers.find((w) => w.attributes("aria-label") === "Goto next page");
		const getPrevPageButton = (wrapper) =>
			wrapper
				.findAll(".pagination-link")
				.wrappers.find(
					(w) => w.attributes("aria-label") === "Goto previous page"
				);

		const isPageValid = async (wrapper, page, pageSize) => {
			await wrapper.vm.$nextTick();
			const renderedData = await getTableRowsContent(wrapper);
			expect(renderedData).toHaveLength(pageSize);
			renderedData.forEach((row, index) => {
				const testIndex = pageSize * (page - 1) + index;
				expect(JSON.stringify(bigData[testIndex])).toContain(row[0]);
			});
		};

		it("should not paginate by default", async () => {
			const wrapper = getWrapper({
				data: bigData,
			});
			expect(await getTableRowsContent(wrapper)).toHaveLength(total);
		});

		it("should limit data to paginated items only", async () => {
			const pageSize = 25;
			const wrapper = getWrapper({
				data: bigData,
				paginated: true,
				rowsPerPage: pageSize,
			});
			const renderedData = await getTableRowsContent(wrapper);
			expect(renderedData).toHaveLength(pageSize);
			renderedData.forEach((row, index) => {
				expect(JSON.stringify(bigData[index])).toContain(row[0]);
			});
		});

		it("should show correct data on page 2", async () => {
			const pageSize = 25;
			const wrapper = getWrapper({
				data: bigData,
				paginated: true,
				rowsPerPage: pageSize,
				currentPage: 2,
			});
			await isPageValid(wrapper, 2, pageSize);
		});

		it("should provide buttons to navigate pages", async () => {
			const pageSize = 20;
			const wrapper = getWrapper({
				data: bigData,
				paginated: true,
				rowsPerPage: pageSize,
				currentPage: 1,
			});
			await isPageValid(wrapper, 1, pageSize);
			getNextPageButton(wrapper).trigger("click");
			await isPageValid(wrapper, 2, pageSize);
			getPrevPageButton(wrapper).trigger("click");
			await isPageValid(wrapper, 1, pageSize);
		});

		it("should react to parent rowsPerPage changes", async () => {
			const orgPageSize = 20;
			const newPageSize = 50;
			const wrapper = getWrapper({
				data: bigData,
				paginated: true,
				rowsPerPage: orgPageSize,
				currentPage: 1,
			});
			await isPageValid(wrapper, 1, orgPageSize);
			wrapper.setProps({ rowsPerPage: newPageSize });
			await isPageValid(wrapper, 1, newPageSize);
		});

		it("passes rowsPerPage changes to parent and itself", async () => {
			const oldValue = 50;
			const newValue = 20;
			const wrapper = getWrapper({
				data: bigData,
				paginated: true,
				rowsPerPage: oldValue,
				currentPage: 1,
			});
			wrapper.vm.rowsPerPageProxy = newValue; // simulate write to variable from .sync modifier from child
			expect(wrapper.vm.localRowsPerPage).toBe(newValue);
			expect(wrapper.emitted("update:rows-per-page")).toStrictEqual([[20]]);
		});

		it("should react to parent page changes", async () => {
			const orgPage = 2;
			const newPage = 3;
			const pageSize = 24;
			const wrapper = getWrapper({
				data: bigData,
				paginated: true,
				rowsPerPage: pageSize,
				currentPage: orgPage,
			});
			await isPageValid(wrapper, orgPage, pageSize);
			wrapper.setProps({ currentPage: newPage });
			await isPageValid(wrapper, newPage, pageSize);
		});
	});

	describe("sort", () => {
		const sortedFirstItem = "AAA";
		const sortedOtherItems = "LastItem";
		const testItems = 4;
		const centerIndex = Math.floor(testItems / 2);
		const flatData = tableData(testItems, (index) => ({
			firstName: index === centerIndex ? sortedFirstItem : sortedOtherItems,
		}));
		const isUnsorted = async (wrapper) => {
			const renderedData = await getTableRowsContent(wrapper);
			expect(renderedData[0][0]).toContain(sortedOtherItems);
			expect(renderedData[centerIndex][0]).toContain(sortedFirstItem);
		};
		const isSortedAsc = async (wrapper) => {
			const renderedData = await getTableRowsContent(wrapper);
			expect(renderedData[0][0]).toContain(sortedFirstItem);
			expect(renderedData[1][0]).toContain(sortedOtherItems);
		};
		const isSortedDesc = async (wrapper) => {
			const renderedData = await getTableRowsContent(wrapper);
			expect(renderedData[renderedData.length - 1][0]).toContain(
				sortedFirstItem
			);
		};
		const getSortButton = (wrapper, text = "Vorname") =>
			wrapper
				.findAll(".is-sortable button")
				.wrappers.find((w) => w.text() === text);

		it("table header clicks should toggle the sortorder", async () => {
			const wrapper = getWrapper({
				data: flatData,
			});
			const sortButton = getSortButton(wrapper);

			await isUnsorted(wrapper);
			sortButton.trigger("click"); // sort asc on first click
			await isSortedAsc(wrapper);
			sortButton.trigger("click"); // sort desc on second click
			await isSortedDesc(wrapper);
			sortButton.trigger("click"); // sort asc on third click
			await isSortedAsc(wrapper);
		});

		it("should sort data initially (asc by default)", async () => {
			const wrapperAsc = getWrapper({
				data: flatData,
				sortBy: "firstName",
			});
			await isSortedAsc(wrapperAsc);
		});

		it("should sort data initially by sortOrder", async () => {
			const wrapperDesc = getWrapper({
				data: flatData,
				sortBy: "firstName",
				sortOrder: "desc",
			});
			await isSortedDesc(wrapperDesc);
		});

		it("should react to parent sortBy changes", async () => {
			const wrapper = getWrapper({
				data: flatData,
			});
			await isUnsorted(wrapper);
			wrapper.setProps({ sortBy: "firstName" });
			await isSortedAsc(wrapper);
		});

		it("should react to parent sortOrder changes", async () => {
			const wrapper = getWrapper({
				data: flatData,
				sortBy: "firstName",
				sortOrder: "desc",
			});
			await isSortedDesc(wrapper);
			wrapper.setProps({ sortOrder: "asc" });
			await isSortedAsc(wrapper);
		});

		describe("default sort method", () => {
			it("can sort undefined values", async () => {
				const testData = [
					{ b: undefined },
					{ b: "something" },
					{ b: undefined },
				];
				const result = DataTable.methods.sort(testData, "b", "asc");
				expect(result).toStrictEqual([
					{ b: "something" },
					{ b: undefined },
					{ b: undefined },
				]);
			});

			it("can sort booleans asc", async () => {
				const testData = [{ b: true }, { b: false }, { b: true }];
				const result = DataTable.methods.sort(testData, "b", "asc");
				expect(result).toStrictEqual([{ b: true }, { b: true }, { b: false }]);
			});
			it("can sort booleans desc", async () => {
				const testData = [{ b: true }, { b: false }, { b: true }];
				const result = DataTable.methods.sort(testData, "b", "desc");
				expect(result).toStrictEqual([{ b: false }, { b: true }, { b: true }]);
			});

			it("can sort numbers asc", async () => {
				const testData = [{ n: 7 }, { n: 2 }, { n: 9 }];
				const result = DataTable.methods.sort(testData, "n", "asc");
				expect(result).toStrictEqual([{ n: 2 }, { n: 7 }, { n: 9 }]);
			});
			it("can sort numbers desc", async () => {
				const testData = [{ n: 7 }, { n: 2 }, { n: 9 }];
				const result = DataTable.methods.sort(testData, "n", "desc");
				expect(result).toStrictEqual([{ n: 9 }, { n: 7 }, { n: 2 }]);
			});

			it("can sort strings asc", async () => {
				const testData = [
					{ s: "Bbb" },
					{ s: "aAA" },
					{ s: "Aaa" },
					{ s: "bBB" },
				];
				const result = DataTable.methods.sort(testData, "s", "asc");
				expect(result).toStrictEqual([
					{ s: "aAA" },
					{ s: "Aaa" },
					{ s: "bBB" },
					{ s: "Bbb" },
				]);
			});
			it("can sort strings desc", () => {
				const testData = [
					{ s: "Bbb" },
					{ s: "aAA" },
					{ s: "Aaa" },
					{ s: "bBB" },
				];
				const result = DataTable.methods.sort(testData, "s", "desc");
				expect(result).toStrictEqual([
					{ s: "Bbb" },
					{ s: "bBB" },
					{ s: "Aaa" },
					{ s: "aAA" },
				]);
			});
		});
	});

	describe("filtering", () => {
		it("Should allow filtering based on string properties", async () => {
			let activeFilters = tableFilters.filter(
				(filter) => filter.type === "text"
			);
			let wrapper = getWrapper({ activeFilters });
			let renderedData = await getTableRowsContent(wrapper);
			let renderedNames = renderedData.map((row) => row[0]);
			expect(
				renderedNames.every((name) => _.lowerCase(name).includes("ha"))
			).toBe(true);

			activeFilters = activeFilters.map((filter) => {
				return {
					...filter,
					matchingType: {
						value: "equals",
						label: "ist gleich",
					},
					value: "Hans",
				};
			});
			wrapper = getWrapper({ activeFilters });
			renderedData = await getTableRowsContent(wrapper);
			renderedNames = renderedData.map((row) => row[0]);
			expect(renderedNames.every((name) => _.lowerCase(name) == "hans")).toBe(
				true
			);
		});

		it("Should allow filtering the based on numeric properties", async () => {
			const activeFilters = tableFilters.filter(
				(filter) => filter.type === "number"
			);
			const wrapper = getWrapper({ activeFilters });
			const renderedData = await getTableRowsContent(wrapper);
			const renderedAges = renderedData.map((row) => row[3]);
			expect(renderedAges.every((age) => age > 25)).toBe(true);
		});

		it("Should allow filtering the based on multiple options", async () => {
			const activeFilters = tableFilters.filter(
				(filter) => filter.type === "select"
			);
			const wrapper = getWrapper({ activeFilters });
			const renderedData = await getTableRowsContent(wrapper);
			const renderedValues = renderedData.map((row) => row[5]);
			expect(renderedValues.every((value) => value === "true")).toBe(true);
		});
	});

	describe("selection", () => {
		const total = 10;
		const testData = tableData(total, (index) => ({
			id: String(index), // simplify IDs of test data for easier testing
		}));

		const getVisibleSelections = async (wrapper) => {
			await wrapper.vm.$nextTick();
			const rowWrappers = wrapper.findAll("tbody tr").wrappers;
			return rowWrappers
				.filter((rowWrapper) => {
					return rowWrapper.find("input[type=checkbox]").element.checked;
				})
				.map((rowWrapper) => {
					return rowWrapper.findAll("td").wrappers.map((cell) => cell.text());
				});
		};

		const hasVisibleSelections = async (
			wrapper,
			data,
			expectedSelectionIds
		) => {
			await wrapper.vm.$nextTick();
			const visibleSelections = await getVisibleSelections(wrapper);
			return (
				visibleSelections.length === expectedSelectionIds.length &&
				expectedSelectionIds.every((expectedId) => {
					const selectionFirstName = data.find((row) => row.id === expectedId)
						.firstName;
					return visibleSelections.find(
						(selectionRow) => selectionRow[1] === selectionFirstName
					);
				})
			);
		};

		it("can select a value", async () => {
			const wrapper = getWrapper({
				data: testData,
				rowsSelectable: true,
			});
			wrapper.find("tbody tr input[type=checkbox]").trigger("click");
			expect(await getVisibleSelections(wrapper)).toHaveLength(1);
			expect(wrapper.emitted("update:selection")).toStrictEqual([
				[[testData[0].id]],
			]);
		});

		it("can unselect a value", async () => {
			const wrapper = getWrapper({
				data: testData,
				selection: ["0"],
				rowsSelectable: true,
			});
			expect(await getVisibleSelections(wrapper)).toHaveLength(1);
			wrapper.find("tbody tr input[type=checkbox]").trigger("click");
			expect(await getVisibleSelections(wrapper)).toHaveLength(0);
			expect(wrapper.emitted("update:selection")).toStrictEqual([[[]]]);
		});

		it("can select all values on page", async () => {
			const rowsPerPage = Math.floor(total / 2);
			const expectedSelection = [...Array(rowsPerPage).keys()].map(String);
			const wrapper = getWrapper({
				data: testData,
				paginated: true,
				rowsPerPage,
				rowsSelectable: true,
			});
			expect(await getVisibleSelections(wrapper)).toHaveLength(0);
			wrapper.find("thead tr input[type=checkbox]").trigger("click");
			expect(
				await hasVisibleSelections(wrapper, testData, expectedSelection)
			).toBe(true);
			expect(wrapper.emitted("update:selection")[0]).toStrictEqual([
				expectedSelection,
			]);
		});

		it("can select all values from all page", async () => {
			const rowsPerPage = Math.floor(total / 2);
			const expectedSelection = [...Array(total).keys()].map(String);
			const wrapper = getWrapper({
				data: testData,
				paginated: true,
				rowsPerPage,
				rowsSelectable: true,
			});
			expect(await getVisibleSelections(wrapper)).toHaveLength(0);
			wrapper.find("thead tr input[type=checkbox]").trigger("click");
			await wrapper.vm.$nextTick();
			wrapper.find("button.select-all-rows").trigger("click");
			expect(wrapper.emitted("update:selection")[1]).toStrictEqual([
				expectedSelection,
			]);
		});

		it("can preselect values", async () => {
			const totalSelections = Math.floor(total / 2);
			const selection = [...Array(totalSelections).keys()].map(String);
			const wrapper = getWrapper({
				data: testData,
				selection,
				rowsSelectable: true,
			});
			expect(await getVisibleSelections(wrapper)).toHaveLength(totalSelections);
			expect(await hasVisibleSelections(wrapper, testData, selection)).toBe(
				true
			);
		});

		it("can preselect all values", async () => {
			const totalSelections = total;
			const selection = [...Array(totalSelections).keys()].map(String);
			const wrapper = getWrapper({
				data: testData,
				selection,
				rowsSelectable: true,
			});
			wrapper.emitted();
			expect(await getVisibleSelections(wrapper)).toHaveLength(totalSelections);
			expect(await hasVisibleSelections(wrapper, testData, selection)).toBe(
				true
			);
		});

		it("can unselect a value after selecting all", async () => {
			const selection = [...Array(total).keys()].map(String);
			const expectedSelection = selection.slice(1); // first element unchecked
			const wrapper = getWrapper({
				data: testData,
				selection,
				rowsSelectable: true,
				rowsPerPage: 50,
			});
			expect(await hasVisibleSelections(wrapper, testData, selection)).toBe(
				true
			);
			wrapper.find("tbody tr input[type=checkbox]").trigger("click");
			expect(
				await hasVisibleSelections(wrapper, testData, expectedSelection)
			).toBe(true);
		});
	});

	describe("slots", () => {
		const smallData = tableData(1);
		it("renders scopedSlots with data", async () => {
			const testSlotContent = `some random slot content`;

			const wrapper = mount(DataTable, {
				propsData: {
					data: smallData,
					trackBy: "id",
					columns: tableColumns,
				},
				scopedSlots: {
					"datacolumn-firstName": `<p> {{props.data}} ${testSlotContent}</p>`,
				},
			});

			// check that basic slot content gets rendered
			expect(wrapper.html()).toContain(testSlotContent);

			// check that content from props.data got rendered
			const renderedData = await getTableRowsContent(wrapper);
			renderedData.forEach((row, index) => {
				expect(row[0]).toContain(smallData[index]["firstName"]);
			});
		});

		it("renders scopedSlots with data for nested keys", async () => {
			const testSlotContent = `some random slot content`;

			const wrapper = mount(DataTable, {
				propsData: {
					data: smallData,
					trackBy: "id",
					columns: tableColumns,
				},
				scopedSlots: {
					"datacolumn-address-city": `<p> {{props.data}} ${testSlotContent}</p>`,
				},
			});
			// check that basic slot content gets rendered
			expect(wrapper.html()).toContain(testSlotContent);

			// check that content from props.data got rendered
			const renderedData = await getTableRowsContent(wrapper);
			renderedData.forEach((row, index) => {
				expect(row[2]).toContain(smallData[index].address.city);
			});
		});
	});
});
