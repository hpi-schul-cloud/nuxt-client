import BaseCard from "./BaseCard";

describe("@/components/base/BaseCard", () => {
	it(
		...rendersSlotContent(
			BaseCard,
			["default"],
			createComponentMocks({ i18n: true })
		)
	);
});
