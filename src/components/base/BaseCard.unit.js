import createComponentMocks from "@@/tests/test-utils/componentMocks";
import BaseCard from "./BaseCard";

describe("@components/base/BaseCard", () => {
	it(...isValidComponent(BaseCard));
	it(
		...rendersSlotContent(
			BaseCard,
			["default"],
			createComponentMocks({ i18n: true })
		)
	);
});
