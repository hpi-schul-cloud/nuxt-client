import DataFilterLayout from "./DataFilterLayout";

describe("@/components/organisms/DataFilter/DataFilterLayout", () => {
	it(...rendersSlotContent(DataFilterLayout, ["select", "chips", "modal"]));
});
