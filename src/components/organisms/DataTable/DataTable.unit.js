import DataTable from "./DataTable";

describe("@components/organisms/DataTable/DataTable", () => {
	it(...isValidComponent(DataTable));

	describe("pagination", () => {
		it.todo("should limit data to paginated items only");

		it.todo("should paginate corretly when sorting is enabled");
	});

	it.skip("Should sort the data", () => {
		var wrapper = getWrapper();

		expect(wrapper.find("tbody tr td").html()).toContain("Hulk");

		wrapper
			.findAll(".is-sortable")
			.at(0)
			.trigger("click");

		expect(wrapper.find("tbody tr td").html()).toContain("Armin");
	});
});
