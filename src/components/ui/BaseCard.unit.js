import BaseCard from "./BaseCard";

describe("@components/BaseCard", () => {
	it(...isValidComponent(BaseCard));
	it(...rendersDefaultSlotContent(BaseCard));
});
