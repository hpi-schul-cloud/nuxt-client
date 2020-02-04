import BaseContentContainer from "./BaseContentContainer";

describe("@components/BaseContentContainer", () => {
	it(...isValidComponent(BaseContentContainer));
	it(...rendersSlotContent(BaseContentContainer));
});
