import BaseCard from "./BaseCard";

describe("@components/base/BaseCard", () => {
	it(...isValidComponent(BaseCard));
	it(...rendersSlotContent(BaseCard));
});
