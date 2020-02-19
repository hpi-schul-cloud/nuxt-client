import BackendDataTable from "./BackendDataTable";
import { tableData, tableColumns } from "./DataTable.data-factory.js";

const data = tableData(5);

function getWrapper(attributes) {
	return mount(BackendDataTable, {
		propsData: {
			data: data,
			trackBy: "id",
			columns: tableColumns,
			...attributes,
		},
	});
}

describe("@components/organisms/DataTable/BackendDataTable", () => {
	it(...isValidComponent(BackendDataTable));

	describe("rendering", () => {
		it("Passing the columns and data should render the table. Nested properties should be possible.", () => {
			var wrapper = getWrapper();

			expect(wrapper.findAll("tbody tr")).toHaveLength(data.length);
			expect(wrapper.find("thead tr").findAll("th")).toHaveLength(
				tableColumns.length
			);
			expect(wrapper.find("tbody tr").contains("td")).toBe(true);

			expect(wrapper.find("thead tr th").text()).toContain("Vorname");

			expect(wrapper.find("tbody tr td").text()).toContain(data[0].firstName);

			expect(
				wrapper
					.find("tbody tr")
					.findAll("td")
					.at(2)
					.text()
			).toContain(data[0].address.city);
		});

		it.todo("should pass slots prefixed with dataRow to tableRow component");
		// if the trackBy key is in a subDataset { language: { key: "trackByKey"} }
		it.todo("should render with nested trackBy key");
	});

	describe.skip("pagination", () => {
		it.todo("should show correct number of pages if pagination is enabled");
		it.todo("should go back to page 1 when itemsPerPage changes");

		it("Should paginate correctly", () => {
			var wrapper = mount({
				data: () => ({
					data: data,
					columns: tableColumns,
					currentPage: 1,
					rowsPerPage: 3,
				}),
				template: `<BackendDataTable
						:data="data"
						:columns="columns"
						:rows-per-page.sync="rowsPerPage"
						:current-page.sync="currentPage"
						track-by="id"
						paginated
					/>`,
				components: { BackendDataTable },
			});

			expect(wrapper.findAll("tbody tr")).toHaveLength(3);

			wrapper
				.findAll(".pagination-link-wrapper a")
				.at(1)
				.trigger("click");

			expect(wrapper.findAll("tbody tr")).toHaveLength(2);
		});
	});

	describe.skip("sort", () => {
		it("Only sortable columns should trigger sort event on click", () => {
			var wrapper = getWrapper();

			expect(wrapper.find("tbody tr td").html()).toContain("Hulk");

			wrapper
				.findAll("th")
				.at(2)
				.trigger("click");

			expect(wrapper.find("tbody tr td").html()).toContain("Hulk");
		});

		it.todo("should emit sort event on new sort input");
	});

	describe.skip("selection", () => {
		it("allows to select and unselect a row", () => {
			const wrapper = getWrapper({ showRowSelection: true });
			const rowSelection = wrapper.find("tbody tr td input[type='checkbox']");

			rowSelection.setChecked();

			expect(wrapper.find("tbody tr").classes()).toContain("selected");
			expect(wrapper.vm.allRowsOfCurrentPageSelected).toBe(false);
			expect(wrapper.emitted()["update:selected-rows"][0]).toStrictEqual([
				[data[0]],
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
				data.slice(0, 2),
			]);

			expect(
				wrapper.emitted()["all-rows-of-current-page-selected"]
			).toHaveLength(1);
			expect(
				wrapper.emitted()["all-rows-of-current-page-selected"][0]
			).toStrictEqual([data.slice(0, 2)]);

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
				data,
			]);

			expect(wrapper.emitted()["all-rows-selected"]).toHaveLength(1);
			expect(wrapper.emitted()["all-rows-selected"][0]).toStrictEqual([data]);
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
					...data,
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
});
