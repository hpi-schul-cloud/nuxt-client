import { tableData, tableColumns } from "./DataTable.data-factory.js";
import DataTable from "./DataTable";

const data = tableData(50);

function getWrapper(attributes) {
	return mount(DataTable, {
		propsData: {
			data: data,
			trackBy: "id",
			columns: tableColumns,
			...attributes,
		},
	});
}

const getTableRowsContent = (wrapper) =>
	wrapper.findAll("tbody tr").wrappers.map((rowWrapper) => {
		return rowWrapper.findAll("td").wrappers.map((cell) => cell.text());
	});

describe("@components/organisms/DataTable/DataTable", () => {
	console.error = () => "";
	it(...isValidComponent(DataTable));

	describe.skip("pagination", () => {
		it.todo("should limit data to paginated items only");

		it.todo("should paginate corretly when sorting is enabled");
	});

	describe("sort", () => {
		const sortedFirstItem = "AAA";
		const sortedOtherItems = "LastItem";
		const testItems = 4;
		const centerIndex = Math.floor(testItems / 2);
		const flatData = tableData(testItems, (index) => ({
			firstName: index === centerIndex ? sortedFirstItem : sortedOtherItems,
		}));
		const isUnsorted = (wrapper) => {
			const renderedData = getTableRowsContent(wrapper);
			expect(renderedData[0][0]).toContain(sortedOtherItems);
			expect(renderedData[centerIndex][0]).toContain(sortedFirstItem);
		};
		const isSortedAsc = (wrapper) => {
			const renderedData = getTableRowsContent(wrapper);
			expect(renderedData[0][0]).toContain(sortedFirstItem);
			expect(renderedData[1][0]).toContain(sortedOtherItems);
		};
		const isSortedDesc = (wrapper) => {
			const renderedData = getTableRowsContent(wrapper);
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

			isUnsorted(wrapper);
			sortButton.trigger("click"); // sort asc on first click
			isSortedAsc(wrapper);
			sortButton.trigger("click"); // sort desc on second click
			isSortedDesc(wrapper);
			sortButton.trigger("click"); // sort asc on third click
			isSortedAsc(wrapper);
		});

		it("should sort data initially (asc by default)", async () => {
			const wrapperAsc = getWrapper({
				data: flatData,
				sortBy: "firstName",
			});
			isSortedAsc(wrapperAsc);
		});

		it("should sort data initially by sortOrder", async () => {
			const wrapperDesc = getWrapper({
				data: flatData,
				sortBy: "firstName",
				sortOrder: "desc",
			});
			isSortedDesc(wrapperDesc);
		});

		describe("default sort method", () => {
			it("can sort booleans asc", async () => {
				const testData = [{ b: true }, { b: false }, { b: true }];
				const result = DataTable.methods.sort(testData, "b", "asc");
				expect(result).toStrictEqual([{ b: false }, { b: true }, { b: true }]);
			});
			it("can sort booleans desc", async () => {
				const testData = [{ b: true }, { b: false }, { b: true }];
				const result = DataTable.methods.sort(testData, "b", "desc");
				expect(result).toStrictEqual([{ b: true }, { b: true }, { b: false }]);
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
});
