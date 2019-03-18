import BaseButton from "./BaseButton";

describe("@components/BaseButton", () => {
	it(...isValidComponent(BaseButton));
	it(...rendersDefaultSlotContent(BaseButton));
});
