import BackendDataTable from "./BackendDataTable";
import { tableColumns, tableData } from "./DataTable.data-factory.js";
import BaseInput from "@/components/base/BaseInput/BaseInput.vue";
import BaseLink from "@/components/base/BaseLink.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import {
	mdiCheckboxBlankOutline,
	mdiCheckboxIntermediate,
	mdiCheckboxOutline,
	mdiMenuDownOutline,
	mdiMenuUpOutline,
} from "@icons/material";

const defaultData = tableData(5);

function getWrapper(props, options) {
	return mount(BackendDataTable, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
			components: {
				"base-input": BaseInput,
				"base-link": BaseLink,
			},
			mocks: {
				$t: (key, dynamic) => key + (dynamic ? ` ${JSON.stringify(dynamic)}` : ""),
			},
		},
		props: {
			data: defaultData,
			trackBy: "_id",
			columns: tableColumns,
			...props,
		},
		...options,
	});
}

const getTableRowsContent = async (wrapper) =>
	wrapper.findAll("tbody tr").map((rowWrapper) => rowWrapper.findAll("td").map((cell) => cell.text()));

describe("@/components/organisms/DataTable/BackendDataTable", () => {
	beforeEach(() => {
		vi.spyOn(window, "scrollTo").mockImplementation();
	});

	describe("rendering", () => {
		it("Passing the columns and data should render the table. Nested properties should be possible.", () => {
			const wrapper = getWrapper();

			expect(wrapper.findAll("tbody tr")).toHaveLength(defaultData.length);
			expect(wrapper.find("thead tr").findAll("th")).toHaveLength(tableColumns.length);
			expect(wrapper.find("tbody tr").find("td").exists()).toBe(true);

			expect(wrapper.find("thead tr th").text()).toContain("Vorname");

			expect(wrapper.find("tbody tr td").text()).toContain(defaultData[0].firstName);

			expect(wrapper.find("tbody tr").findAll("td").at(2).text()).toContain(defaultData[0].address.city);
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
					`components.organisms.Pagination.perPagecomponents.organisms.Pagination.currentPage {"start":${expectedFrom},"end":${expectedTo},"total":${expectedTotal}}`
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
			wrapper.find(`[aria-label="Go to next page"]`).trigger("click");
			expect(wrapper.emitted("update:current-page")).toStrictEqual([[2]]);
		});
	});

	describe("sort", () => {
		const getSortButton = (wrapper, text = "Vorname") =>
			wrapper.findAll(".v-btn.is-sortable").find((w) => w.text().startsWith(text));

		const setup = () => {
			const wrapper = getWrapper({
				data: defaultData,
				sortBy: "firstName",
				sortOrder: "asc",
			});

			const sortIcon = getSortIcon(wrapper, "Vorname");

			return {
				wrapper,
				sortIcon,
			};
		};

		const getSortIcon = (wrapper, buttonText) => {
			const sortButton = getSortButton(wrapper, buttonText);
			const sortIcon = sortButton.get(".v-icon path").attributes("d");
			return sortIcon;
		};

		it("should update ui if sortBy prop changes", async () => {
			const { sortIcon, wrapper } = setup();

			expect(sortIcon).toEqual(mdiMenuUpOutline);

			await wrapper.setProps({
				sortBy: "address.city",
			});

			const updatedSortIcon = getSortIcon(wrapper, "Stadt");
			expect(updatedSortIcon).toEqual(mdiMenuUpOutline);
		});

		it("should update ui if sortOrder prop changes", async () => {
			const { sortIcon, wrapper } = setup();

			expect(sortIcon).toEqual(mdiMenuUpOutline);

			await wrapper.setProps({
				sortOrder: "desc",
			});

			const updatedSortIcon = getSortIcon(wrapper, "Vorname");
			expect(updatedSortIcon).toEqual(mdiMenuDownOutline);
		});

		it("should emit sort events on click on sortable coloumn", async () => {
			const wrapper = getWrapper({
				data: defaultData,
			});
			const sortButton = getSortButton(wrapper);
			const otherSortButton = getSortButton(wrapper, "Stadt");
			await sortButton.trigger("click");
			await sortButton.trigger("click");
			await sortButton.trigger("click");
			await otherSortButton.trigger("click");
			expect(wrapper.emitted()).toMatchObject({
				"update:sort": [
					["firstName", "asc"],
					["firstName", "desc"],
					["firstName", "asc"],
					["address.city", "asc"],
				],
				"update:sort-by": [["firstName"], ["firstName"], ["firstName"], ["address.city"]],
				"update:sort-order": [["asc"], ["desc"], ["asc"], ["asc"]],
			});
		});
	});

	describe("selection", () => {
		const total = 10;
		const testData = tableData(Math.floor(total / 2)).map((item, index) => ({
			...item,
			_id: String(index), // simplify IDs of test data for easier testing
		}));

		const getVisibleSelections = (wrapper) => {
			const rowWrappers = wrapper.findAll("tbody tr");
			return rowWrappers
				.filter((rowWrapper) => rowWrapper.find("input[type=checkbox]").element.checked)
				.map((rowWrapper) => rowWrapper.findAll("td").map((cell) => cell.text()));
		};

		const hasVisibleSelections = (wrapper, data, expectedSelectionIds) => {
			const visibleSelections = getVisibleSelections(wrapper);
			return (
				visibleSelections.length === expectedSelectionIds.length &&
				expectedSelectionIds.every((expectedId) => {
					const selectionFirstName = data.find((row) => row._id === expectedId).firstName;
					return visibleSelections.find((selectionRow) => selectionRow[1] === selectionFirstName);
				})
			);
		};

		it("can select a value", async () => {
			const wrapper = getWrapper({
				data: testData,
				rowsSelectable: true,
			});
			const checkboxElement = wrapper.find("tbody tr input[type=checkbox]");

			await checkboxElement.trigger("click");
			expect(getVisibleSelections(wrapper)).toHaveLength(1);

			const dataRow = wrapper.findComponent('[data-testid="table-data-row"]');
			await dataRow.vm.$emit("update:selected", true);

			expect(wrapper.emitted("update:selection")).toStrictEqual([[[testData[0]._id], "inclusive"]]);
			expect(wrapper.emitted("update:selectedRowIds")).toStrictEqual([[[testData[0]._id]]]);
		});

		it("can unselect a value", async () => {
			const wrapper = getWrapper({
				data: testData,
				selectionType: "inclusive",
				selectedRowIds: ["0"],
				rowsSelectable: true,
			});

			expect(getVisibleSelections(wrapper)).toHaveLength(1);
			await wrapper.find("tbody tr input[type=checkbox]").trigger("click");

			expect(getVisibleSelections(wrapper)).toHaveLength(0);

			const dataRow = wrapper.findComponent('[data-testid="table-data-row"]');
			await dataRow.vm.$emit("update:selected", false);

			expect(wrapper.emitted("update:selection")).toStrictEqual([
				[["0"], "inclusive"],
				[[], "inclusive"],
			]);
			expect(wrapper.emitted("update:selectedRowIds")).toStrictEqual([[["0"]], [[]]]);
		});

		it("can select all values on page", async () => {
			const rowsPerPage = testData.length;
			const expectedSelection = [...Array(rowsPerPage).keys()].map(String);
			const wrapper = getWrapper({
				data: testData,
				paginated: true,
				rowsPerPage: rowsPerPage,
				rowsSelectable: true,
				total,
			});
			expect(getVisibleSelections(wrapper)).toHaveLength(0);
			await wrapper.find("thead tr input[type=checkbox]").trigger("click");

			const rowSelectionBarElement = wrapper.findComponent('[data-testid="table-data-head"]');
			await rowSelectionBarElement.vm.$emit("update:current-page-selection-state", "all");
			expect(hasVisibleSelections(wrapper, testData, expectedSelection)).toBe(true);
			expect(wrapper.emitted("update:selection")[0]).toStrictEqual([expectedSelection, "inclusive"]);
		});

		it("can preselect values", async () => {
			const totalSelections = testData.length;
			const selection = [...Array(totalSelections).keys()].map(String);
			const wrapper = getWrapper({
				data: testData,
				selectedRowIds: selection,
				selectionType: "inclusive",
				rowsSelectable: true,
			});
			expect(await getVisibleSelections(wrapper)).toHaveLength(totalSelections);
			expect(await hasVisibleSelections(wrapper, testData, selection)).toBe(true);
		});

		it("can preselect all values", async () => {
			const totalSelections = testData.length;
			const expectedSelection = [...Array(totalSelections).keys()].map(String);
			const wrapper = getWrapper({
				data: testData,
				selectedRowIds: [],
				selectionType: "exclusive",
				rowsSelectable: true,
			});
			wrapper.emitted();
			expect(await getVisibleSelections(wrapper)).toHaveLength(totalSelections);
			expect(await hasVisibleSelections(wrapper, testData, expectedSelection)).toBe(true);
		});

		describe("header checkbox shows", () => {
			describe("on inclusive selection", () => {
				const setup = (numberOfSelections) => {
					const selection = [...Array(numberOfSelections).keys()].map(String);
					const wrapper = getWrapper({
						data: testData,
						selectedRowIds: selection,
						selectionType: "inclusive",
						rowsSelectable: true,
					});
					const checkboxIcon = wrapper.get("thead tr .v-icon path").attributes("d");
					return { checkboxIcon };
				};

				it("checked state if all values are selected", async () => {
					const { checkboxIcon } = setup(testData.length);

					expect(checkboxIcon).toEqual(mdiCheckboxOutline);
				});

				it("unchecked state if no values are selected", async () => {
					const { checkboxIcon } = setup(0);

					expect(checkboxIcon).toEqual(mdiCheckboxBlankOutline);
				});

				it("intermediate state if some values are selected", async () => {
					const { checkboxIcon } = setup(Math.round(testData.length / 2));

					expect(checkboxIcon).toEqual(mdiCheckboxIntermediate);
				});
			});
			describe("on exclusive selection", () => {
				const setup = (numberOfSelections) => {
					const selection = [...Array(numberOfSelections).keys()].map(String);
					const wrapper = getWrapper({
						data: testData,
						selectedRowIds: selection,
						selectionType: "exclusive",
						rowsSelectable: true,
					});
					const checkboxIcon = wrapper.get("thead tr .v-icon path").attributes("d");
					return { checkboxIcon };
				};

				it("checked state if no values are unselected", async () => {
					const { checkboxIcon } = setup(0);

					expect(checkboxIcon).toEqual(mdiCheckboxOutline);
				});

				it("unchecked state if all values are unselected", async () => {
					const { checkboxIcon } = setup(testData.length);

					expect(checkboxIcon).toEqual(mdiCheckboxBlankOutline);
				});

				it("intermediate state if some values are unselected", async () => {
					const { checkboxIcon } = setup(Math.round(testData.length / 2));

					expect(checkboxIcon).toEqual(mdiCheckboxIntermediate);
				});
			});
		});

		describe("actions", () => {
			const findButtonByText = (wrapper, text) =>
				wrapper.findAll(".v-btn").filter((button) => button.text().includes(text))[0];

			const getActionsButton = (wrapper) => findButtonByText(wrapper, "pages.administration.actions");

			it("can trigger on selected rows", async () => {
				const totalSelections = testData.length;
				const selection = [...Array(totalSelections).keys()].map(String);
				const testAction = vi.fn();
				const actionLabel = "TestAction";
				const wrapper = getWrapper({
					rowsSelectable: true,
					selectedRowIds: selection,
					selectionType: "inclusive",
					actions: [
						{
							label: actionLabel,
							action: testAction,
						},
					],
				});

				const actionsButton = getActionsButton(wrapper);
				await actionsButton.trigger("click");
				const actionButton = findButtonByText(wrapper, actionLabel);
				await actionButton.trigger("click");

				expect(testAction).toHaveBeenCalledWith(selection, "inclusive");
			});
		});
	});

	describe("slots", () => {
		const smallData = tableData(1);
		it("renders scopedSlots with data", async () => {
			const testSlotContent = `some random slot content`;

			const wrapper = getWrapper(
				{
					data: smallData,
					trackBy: "_id",
					columns: tableColumns,
				},
				{
					slots: {
						"datacolumn-firstName": `<template #datacolumn-firstName="slotProps">{{slotProps.data}} ${testSlotContent}</template>`,
					},
				}
			);

			expect(wrapper.html()).toContain(testSlotContent);

			const renderedData = await getTableRowsContent(wrapper);
			renderedData.forEach((row, index) => {
				expect(row[0]).toContain(smallData[index]["firstName"]);
			});
		});

		it("renders scopedSlots with data for nested keys", async () => {
			const testSlotContent = `some random slot content`;

			const wrapper = getWrapper(
				{
					data: smallData,
					trackBy: "_id",
					columns: tableColumns,
				},
				{
					slots: {
						"datacolumn-address-city": `<template #datacolumn-address-city="slotProps">{{slotProps.data}} ${testSlotContent}</template>`,
					},
				}
			);

			expect(wrapper.html()).toContain(testSlotContent);

			const renderedData = await getTableRowsContent(wrapper);
			renderedData.forEach((row, index) => {
				expect(row[2]).toContain(smallData[index].address.city);
			});
		});
	});
});
