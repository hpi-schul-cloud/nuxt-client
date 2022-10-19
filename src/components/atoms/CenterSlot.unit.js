import CenterSlot from "./CenterSlot";

describe("@/components/atoms/CenterSlot", () => {
	it(...isValidComponent(CenterSlot));

	it(...rendersSlotContent(CenterSlot));
});
