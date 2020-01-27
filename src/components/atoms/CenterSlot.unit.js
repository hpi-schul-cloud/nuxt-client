import CenterSlot from "./CenterSlot";

describe("@components/CenterSlot", () => {
	it(...isValidComponent(CenterSlot));

	it(...rendersSlotContent(CenterSlot));
});
