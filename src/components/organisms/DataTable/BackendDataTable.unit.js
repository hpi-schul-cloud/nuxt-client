import BackendDataTable from "./BackendDataTable";
import { tableData, tableColumns } from "./DataTable.data-factory.js";

const defaultData = tableData(5);

function getWrapper(attributes, options) {
	return mount(BackendDataTable, {
		...createComponentMocks({ i18n: true }),
		propsData: {
			data: defaultData,
			trackBy: "_id",
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
	beforeEach(() => {
		jest.spyOn(window, "scrollTo").mockImplementation();
	});

	it(...isValidComponent(BackendDataTable));

	describe("rendering", () => {
		it("Passing the columns and data should render the table. Nested properties should be possible.", () => {
			var wrapper = getWrapper();

			expect(wrapper.findAll("tbody tr")).toHaveLength(defaultData.length);
			expect(wrapper.find("thead tr").findAll("th")).toHaveLength(
				tableColumns.length
			);
			expect(wrapper.find("tbody tr").find("td").exists()).toBe(true);

			expect(wrapper.find("thead tr th").text()).toContain("Vorname");

			expect(wrapper.find("tbody tr td").text()).toContain(
				defaultData[0].firstName
			);

			expect(wrapper.find("tbody tr").findAll("td").at(2).text()).toContain(
				defaultData[0].address.city
			);
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
				.findAll("button.is-sortable")
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
			expect(wrapper.emitted()).toMatchObject({
				"update:sort": [
					["firstName", "asc"],
					["firstName", "desc"],
					["firstName", "asc"],
					["address.city", "asc"],
				],
				"update:sort-by": [
					["firstName"],
					["firstName"],
					["firstName"],
					["address.city"],
				],
				"update:sort-order": [["asc"], ["desc"], ["asc"], ["asc"]],
			});
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
			expect(sortButtonIcon.attributes("icon")).toBe("sort-up");
			wrapper.setProps({
				sortBy: "address.city",
			});
			await wrapper.vm.$nextTick();
			sortButtonIcon = getSortButton(wrapper, "Stadt").find("baseicon-stub");
			expect(sortButtonIcon.attributes("icon")).toBe("sort-up");
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
			expect(sortButtonIcon.attributes("icon")).toBe("sort-up");
			wrapper.setProps({
				sortOrder: "desc",
			});
			await wrapper.vm.$nextTick();
			expect(sortButtonIcon.attributes("icon")).toBe("sort-down");
		});
	});

	describe("selection", () => {
		const total = 10;
		const testData = tableData(Math.floor(total / 2), (index) => ({
			_id: String(index), // simplify IDs of test data for easier testing
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
					const selectionFirstName = data.find((row) => row._id === expectedId)
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
				[[testData[0]._id], "inclusive"],
			]);
			expect(wrapper.emitted("update:selectedRowIds")).toStrictEqual([
				[[testData[0]._id]],
			]);
		});

		it("can unselect a value", async () => {
			const wrapper = getWrapper({
				data: testData,
				selectionType: "inclusive",
				selectedRowIds: ["0"],
				rowsSelectable: true,
			});
			expect(await getVisibleSelections(wrapper)).toHaveLength(1);
			wrapper.find("tbody tr input[type=checkbox]").trigger("click");
			expect(await getVisibleSelections(wrapper)).toHaveLength(0);
			expect(wrapper.emitted("update:selection")).toStrictEqual([
				[["0"], "inclusive"],
				[[], "inclusive"],
			]);
			expect(wrapper.emitted("update:selectedRowIds")).toStrictEqual([
				[["0"]],
				[[]],
			]);
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
			expect(await getVisibleSelections(wrapper)).toHaveLength(0);
			wrapper.find("thead tr input[type=checkbox]").trigger("click");
			await wrapper.vm.$nextTick();
			expect(
				await hasVisibleSelections(wrapper, testData, expectedSelection)
			).toBe(true);
			expect(wrapper.emitted("update:selection")[0]).toStrictEqual([
				expectedSelection,
				"inclusive",
			]);
		});

		it("can select all values from all page", async () => {
			const rowsPerPage = testData.length;
			const wrapper = getWrapper({
				data: testData,
				paginated: true,
				rowsPerPage,
				rowsSelectable: true,
				total,
			});
			expect(await getVisibleSelections(wrapper)).toHaveLength(0);
			wrapper.find("thead tr input[type=checkbox]").trigger("click");
			await wrapper.vm.$nextTick();
			wrapper.find("button.select-all-rows").trigger("click");
			await wrapper.vm.$nextTick();
			expect(wrapper.emitted("update:selection")[1]).toStrictEqual([
				[],
				"exclusive",
			]);
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
			expect(await hasVisibleSelections(wrapper, testData, selection)).toBe(
				true
			);
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
			expect(
				await hasVisibleSelections(wrapper, testData, expectedSelection)
			).toBe(true);
		});

		describe("header checkbox shows", () => {
			describe("on inclusive selection", () => {
				const getWrapperLocal = (numberOfSelections) => {
					const selection = [...Array(numberOfSelections).keys()].map(String);
					return getWrapper(
						{
							data: testData,
							selectedRowIds: selection,
							selectionType: "inclusive",
							rowsSelectable: true,
						},
						{
							stubs: { BaseIcon: true },
						}
					);
				};

				it("checked state if all values are selected", async () => {
					const wrapper = getWrapperLocal(testData.length);
					const checkboxIcon = wrapper.get("thead tr baseicon-stub");
					expect(checkboxIcon.attributes("icon")).toBe("check_box");
				});

				it("unchecked state if no values are selected", async () => {
					const wrapper = getWrapperLocal(0);
					const checkboxIcon = wrapper.get("thead tr baseicon-stub");
					expect(checkboxIcon.attributes("icon")).toBe(
						"check_box_outline_blank"
					);
				});

				it("intermediate state if some values are selected", async () => {
					const wrapper = getWrapperLocal(Math.round(testData.length / 2));
					const checkboxIcon = wrapper.get("thead tr baseicon-stub");
					expect(checkboxIcon.attributes("icon")).toBe(
						"indeterminate_check_box"
					);
				});
			});
			describe("on exclusive selection", () => {
				const getWrapperLocal = (numberOfUnselections) => {
					const selection = [...Array(numberOfUnselections).keys()].map(String);
					return getWrapper(
						{
							data: testData,
							selectedRowIds: selection,
							selectionType: "exclusive",
							rowsSelectable: true,
						},
						{
							stubs: { BaseIcon: true },
						}
					);
				};

				it("checked state if no values are unselected", async () => {
					const wrapper = getWrapperLocal(0);
					const checkboxIcon = wrapper.get("thead tr baseicon-stub");
					expect(checkboxIcon.attributes("icon")).toBe("check_box");
				});

				it("unchecked state if all values are unselected", async () => {
					const wrapper = getWrapperLocal(testData.length);
					const checkboxIcon = wrapper.get("thead tr baseicon-stub");
					expect(checkboxIcon.attributes("icon")).toBe(
						"check_box_outline_blank"
					);
				});

				it("intermediate state if some values are unselected", async () => {
					const wrapper = getWrapperLocal(Math.round(testData.length / 2));
					const checkboxIcon = wrapper.get("thead tr baseicon-stub");
					expect(checkboxIcon.attributes("icon")).toBe(
						"indeterminate_check_box"
					);
				});
			});
		});

		describe("actions", () => {
			const findButtonByText = (wrapper, text) =>
				wrapper
					.findAll("button")
					.wrappers.filter((button) => button.text().includes(text))[0];

			const getActionsButton = (wrapper) =>
				findButtonByText(wrapper, "Aktionen");

			it("can trigger on selected rows", async () => {
				const totalSelections = testData.length;
				const selection = [...Array(totalSelections).keys()].map(String);
				const testAction = jest.fn();
				const actionLabel = "TestAction";
				var wrapper = getWrapper(
					{
						rowsSelectable: true,
						selectedRowIds: selection,
						selectionType: "inclusive",
						actions: [
							{
								label: actionLabel,
								action: testAction,
							},
						],
					},
					createComponentMocks({ i18n: true })
				);

				const actionsButton = getActionsButton(wrapper);
				actionsButton.trigger("click");
				await wrapper.vm.$nextTick();
				const actionButton = findButtonByText(wrapper, actionLabel);
				actionButton.trigger("click");
				await wrapper.vm.$nextTick();

				expect(testAction).toHaveBeenCalledWith(selection, "inclusive");
			});
		});
	});

	describe("slots", () => {
		const smallData = tableData(1);
		it("renders scopedSlots with data", async () => {
			const testSlotContent = `some random slot content`;

			const wrapper = mount(BackendDataTable, {
				...createComponentMocks({ i18n: true }),
				propsData: {
					data: smallData,
					trackBy: "_id",
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
				...createComponentMocks({ i18n: true }),
				propsData: {
					data: smallData,
					trackBy: "_id",
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
