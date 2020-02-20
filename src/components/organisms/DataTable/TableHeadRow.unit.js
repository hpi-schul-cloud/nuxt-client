import TableHeadRow from "./TableHeadRow";

describe("@components/organisms/DataTable/TableHeadRow", () => {
	it(...isValidComponent(TableHeadRow));

	// HINT: use { stubs: { BaseIcon: true } } to render a placeholder for the BaseIcon Component. Otherwise you can not tell if the Icon is there.
	it.todo("renders sortable hint icon on sortable rows");
	it.todo("renders sortable hint icon only on sortable rows");
});
