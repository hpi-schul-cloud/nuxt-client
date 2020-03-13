import BackendDataTable from "./BackendDataTable";
import { tableData, tableColumns } from "./DataTable.data-factory.js";

const defaultData = tableData(5);

function getWrapper(attributes, options) {
	return mount(BackendDataTable, {
		propsData: {
			data: defaultData,
			trackBy: "id",
			columns: tableColumns,
			...attributes,
		},
		...options,
	});
}

const getTableRowsContent = async (wrapper) => {
	await wrapper.vm.$nextTick();
	return wrapper.findAll("tbody tr").wrappers.map((rowWrapper) => {
		return rowWrapper.findAll("td").wrappers.map((cell) => cell.text());
	});
};

describe("@components/organisms/DataTable/BackendDataTable", () => {
	it(...isValidComponent(BackendDataTable));

	describe("rendering", () => {
		it("Passing the columns and data should render the table. Nested properties should be possible.", () => {
			var wrapper = getWrapper();

			expect(wrapper.findAll("tbody tr")).toHaveLength(defaultData.length);
			expect(wrapper.find("thead tr").findAll("th")).toHaveLength(
				tableColumns.length
			);
			expect(wrapper.find("tbody tr").contains("td")).toBe(true);

			expect(wrapper.find("thead tr th").text()).toContain("Vorname");

			expect(wrapper.find("tbody tr td").text()).toContain(
				defaultData[0].firstName
			);

			expect(
				wrapper
					.find("tbody tr")
					.findAll("td")
					.at(2)
					.text()
			).toContain(defaultData[0].address.city);
		});
	});

	describe("pagination", () => {
		const total = 100;
		const pageSize = 25;
		const subsetData = tableData(pageSize);

		it("should show correct pagination info of total items", async () => {
			const currentPage = 2;
			const wrapper = getWrapper({
				data: subsetData,
				total: total,
				paginated: true,
				rowsPerPage: pageSize,
				currentPage: 2,
			});
			const paginationText = wrapper
				.get(".pagination")
				.text()
				.replace(/(\s{2,}|\n)/gi, " ");
			const expectedFrom = 1 + pageSize * (currentPage - 1);
			const expectedTo = currentPage * pageSize;
			const expectedTotal = total;
			expect(paginationText).toStrictEqual(
				expect.stringContaining(
					`${expectedFrom} bis ${expectedTo} von ${expectedTotal}`
				)
			);
		});

		it("should trigger @update:current-page event on page change", async () => {
			const wrapper = getWrapper({
				data: subsetData,
				total: total,
				paginated: true,
				rowsPerPage: pageSize,
				currentPage: 1,
			});
			wrapper.find(`[aria-label="Goto next page"]`).trigger("click");
			expect(wrapper.emitted("update:current-page")).toStrictEqual([[2]]);
		});
	});

	describe("sort", () => {
		const getSortButton = (wrapper, text = "Vorname") =>
			wrapper
				.findAll(".is-sortable button")
				.wrappers.find((w) => w.text() === text);

		it("should emit sort events on click on sortable coloumn", async () => {
			const wrapper = getWrapper({
				data: defaultData,
			});
			const sortButton = getSortButton(wrapper);
			const otherSortButton = getSortButton(wrapper, "Stadt");
			sortButton.trigger("click");
			await wrapper.vm.$nextTick();
			sortButton.trigger("click");
			await wrapper.vm.$nextTick();
			sortButton.trigger("click");
			await wrapper.vm.$nextTick();
			otherSortButton.trigger("click");
			await wrapper.vm.$nextTick();
			expect(wrapper.emittedByOrder()).toStrictEqual([
				{ args: ["firstName"], name: "update:sortBy" },
				{ args: ["asc"], name: "update:sortOrder" },
				{ args: ["firstName"], name: "update:sortBy" },
				{ args: ["desc"], name: "update:sortOrder" },
				{ args: ["firstName"], name: "update:sortBy" },
				{ args: ["asc"], name: "update:sortOrder" },
				{ args: ["address.city"], name: "update:sortBy" },
				{ args: ["asc"], name: "update:sortOrder" },
			]);
		});

		it("should update ui if sortBy prop changes", async () => {
			const wrapper = getWrapper(
				{
					data: defaultData,
					sortBy: "firstName",
					sortOrder: "asc",
				},
				{
					stubs: { BaseIcon: true },
				}
			);
			let sortButtonIcon = getSortButton(wrapper, "Vorname").find(
				"baseicon-stub"
			);
			expect(sortButtonIcon.attributes("icon")).toBe("arrow_upward");
			wrapper.setProps({
				sortBy: "address.city",
			});
			await wrapper.vm.$nextTick();
			sortButtonIcon = getSortButton(wrapper, "Stadt").find("baseicon-stub");
			expect(sortButtonIcon.attributes("icon")).toBe("arrow_upward");
		});
		it("should update ui if sortOrder prop changes", async () => {
			const wrapper = getWrapper(
				{
					data: defaultData,
					sortBy: "firstName",
					sortOrder: "asc",
				},
				{
					stubs: { BaseIcon: true },
				}
			);
			const sortButtonIcon = getSortButton(wrapper, "Vorname").find(
				"baseicon-stub"
			);
			expect(sortButtonIcon.attributes("icon")).toBe("arrow_upward");
			wrapper.setProps({
				sortOrder: "desc",
			});
			await wrapper.vm.$nextTick();
			expect(sortButtonIcon.attributes("icon")).toBe("arrow_downward");
		});
	});

	describe.skip("selection", () => {
		it("allows to select and unselect a row", () => {
			const wrapper = getWrapper({ showRowSelection: true });
			const rowSelection = wrapper.find("tbody tr td input[type='checkbox']");

			rowSelection.setChecked();

			expect(wrapper.find("tbody tr").classes()).toContain("selected");
			expect(wrapper.vm.allRowsOfCurrentPageSelected).toBe(false);
			expect(wrapper.emitted()["update:selected-rows"][0]).toStrictEqual([
				[defaultData[0]],
			]);

			rowSelection.setChecked(false);

			expect(wrapper.find("tbody tr").classes()).not.toContain("selected");
			expect(wrapper.vm.allRowsOfCurrentPageSelected).toBe(false);
			expect(wrapper.emitted()["update:selected-rows"][1]).toStrictEqual([[]]);
		});
		it("allows to select and unselect all rows of current page", () => {
			const wrapper = getWrapper({
				showRowSelection: true,
				paginated: true,
				rowsPerPage: 2,
			});
			const allRowsSelection = wrapper.find(
				"thead tr th input[type='checkbox']"
			);

			allRowsSelection.setChecked();
			expect(wrapper.vm.allRowsOfCurrentPageSelected).toBe(true);

			expect(wrapper.emitted()["update:selected-rows"]).toHaveLength(1);
			expect(wrapper.emitted()["update:selected-rows"][0]).toStrictEqual([
				defaultData.slice(0, 2),
			]);

			expect(
				wrapper.emitted()["all-rows-of-current-page-selected"]
			).toHaveLength(1);
			expect(
				wrapper.emitted()["all-rows-of-current-page-selected"][0]
			).toStrictEqual([defaultData.slice(0, 2)]);

			allRowsSelection.setChecked(false);
			expect(wrapper.vm.allRowsOfCurrentPageSelected).toBe(false);

			expect(wrapper.emitted()["update:selected-rows"]).toHaveLength(2);
			expect(wrapper.emitted()["update:selected-rows"][1]).toStrictEqual([[]]);

			expect(
				wrapper.emitted()["all-rows-of-current-page-selected"]
			).toHaveLength(2);
			expect(
				wrapper.emitted()["all-rows-of-current-page-selected"][1]
			).toStrictEqual([[]]);
		});
		it("selecting all items on current page should toggle checkbox in header", () => {
			const wrapper = getWrapper({
				showRowSelection: true,
				paginated: true,
				rowsPerPage: 2,
			});

			wrapper.findAll("tbody tr td input[type='checkbox']").setChecked();

			expect(
				wrapper
					.findAll("tbody tr")
					.wrappers.every((tr) => tr.classes().includes("selected"))
			).toBe(true);
			expect(wrapper.vm.allRowsOfCurrentPageSelected).toBe(true);

			wrapper.findAll("tbody tr td input[type='checkbox']").setChecked(false);
			expect(
				wrapper
					.findAll("tbody tr")
					.wrappers.some((tr) => tr.classes().includes("selected"))
			).toBe(false);
			expect(wrapper.vm.allRowsOfCurrentPageSelected).toBe(false);
		});
		it("unselecting any item on a page after selecting all items should toggle checkbox in header", () => {
			const wrapper = getWrapper({
				showRowSelection: true,
				paginated: true,
				rowsPerPage: 2,
			});

			wrapper.findAll("tbody tr td input[type='checkbox']").setChecked();

			expect(
				wrapper
					.findAll("tbody tr")
					.wrappers.every((tr) => tr.classes().includes("selected"))
			).toBe(true);
			expect(wrapper.vm.allRowsOfCurrentPageSelected).toBe(true);

			wrapper.findAll("tbody tr td input[type='checkbox']").setChecked(false);
			expect(
				wrapper
					.findAll("tbody tr")
					.wrappers.some((tr) => tr.classes().includes("selected"))
			).toBe(false);
			expect(wrapper.vm.allRowsOfCurrentPageSelected).toBe(false);
		});
		it("allows to select all rows of all pages", () => {
			const wrapper = getWrapper({
				showRowSelection: true,
				paginated: true,
				rowsPerPage: 2,
			});
			const allRowsSelection = wrapper.find(
				"thead tr th input[type='checkbox']"
			);

			allRowsSelection.setChecked();
			expect(wrapper.vm.allRowsOfCurrentPageSelected).toBe(true);
			const allRowsOfAllPagesSelection = wrapper.find(".select-all-rows");
			expect(allRowsOfAllPagesSelection.exists()).toBe(true);
			allRowsOfAllPagesSelection.trigger("click");

			expect(wrapper.vm.allRowsOfAllPagesSelected).toBe(true);

			expect(wrapper.emitted()["update:selected-rows"]).toHaveLength(2);
			expect(wrapper.emitted()["update:selected-rows"][1]).toStrictEqual([
				defaultData,
			]);

			expect(wrapper.emitted()["all-rows-selected"]).toHaveLength(1);
			expect(wrapper.emitted()["all-rows-selected"][0]).toStrictEqual([
				defaultData,
			]);
		});

		it("can trigger an action on selected rows", () => {
			const testAction = jest.fn();
			var wrapper = getWrapper({
				showRowSelection: true,
				actions: [
					{
						label: "Test",
						action: testAction,
					},
				],
			});

			wrapper.find("thead tr th input[type='checkbox']").setChecked();
			wrapper.find(".dropdown li").trigger("click");
			expect(testAction).toHaveBeenCalled();

			expect(wrapper.emitted()["update:selected-rows"]).toHaveLength(2);
			expect(wrapper.emitted()["update:selected-rows"][1]).toStrictEqual([[]]);

			expect(wrapper.emitted()["all-rows-selected"]).toHaveLength(1);
			expect(wrapper.emitted()["all-rows-selected"][0]).toStrictEqual([[]]);
		});

		it("does not change row selection when new rows are added", () => {
			var wrapper = getWrapper({
				showRowSelection: true,
				paginated: true,
				rowsPerPage: 2,
			});

			wrapper.findAll("tbody tr td input[type='checkbox']").setChecked();
			expect(wrapper.vm.allRowsOfCurrentPageSelected).toBe(true);

			wrapper.setProps({
				data: [
					...defaultData,
					{
						id: "6",
						firstName: "Test",
						lastName: "Test",
						address: {
							city: "Test",
						},
						age: 999,
					},
				],
			});

			expect(wrapper.vm.allRowsOfCurrentPageSelected).toBe(true);
		});

		it("row selection keeps saved during navigation between pages", () => {
			var wrapper = getWrapper({
				showRowSelection: true,
				paginated: true,
				rowsPerPage: 2,
			});

			wrapper.findAll("tbody tr td input[type='checkbox']").setChecked();
			expect(wrapper.vm.allRowsOfCurrentPageSelected).toBe(true);

			wrapper.setProps({ currentPage: 2 });
			expect(wrapper.vm.allRowsOfCurrentPageSelected).toBe(false);

			wrapper.setProps({ currentPage: 1 });
			expect(wrapper.vm.allRowsOfCurrentPageSelected).toBe(true);
		});
	});

	describe("slots", () => {
		const smallData = tableData(1);
		it("renders scopedSlots with data", async () => {
			const testSlotContent = `some random slot content`;

			const wrapper = mount(BackendDataTable, {
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

			const wrapper = mount(BackendDataTable, {
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
