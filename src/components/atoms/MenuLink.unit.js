import MenuLink from "./MenuLink";

describe("@components/atoms/MenuLink", () => {
	it(...isValidComponent(MenuLink));
	it(...rendersSlotContent(MenuLink));
});
