import BaseCard from "./BaseCard";

describe("@components/BaseCard", () => {
	it(...isValidComponent(BaseCard));
	it(...rendersSlotContent(BaseCard));
});
