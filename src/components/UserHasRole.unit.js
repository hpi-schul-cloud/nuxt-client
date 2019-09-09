import UserHasRole from "./UserHasRole";
/**
 * @param  { String } expectedRole used as prop
 * @param  { String[] } storeRoles values that are in store
 * @param  { Boolean } expectedSlot should the user get access?
 */
const checkCorrectView = (expectedRole, storeRoles, expectedSlot) => {
	const slotTrue = "SLOT-TRUE";
	const slotFalse = "SLOT-FALSE";
	// Test with named slots
	const wrapperSlots = mount(UserHasRole, {
		propsData: {
			role: expectedRole,
		},
		slots: {
			true: slotTrue,
			false: slotFalse,
		},
		...createComponentMocks({
			store: {
				auth: {
					state: () => ({
						user: {
							roles: storeRoles,
						},
					}),
				},
			},
		}),
	});
	expect(wrapperSlots.text()).toContain(expectedSlot ? slotTrue : slotFalse);
	// Test with default slot
	const wrapperDefault = mount(UserHasRole, {
		propsData: {
			role: expectedRole,
		},
		slots: {
			default: slotTrue,
		},
		...createComponentMocks({
			store: {
				auth: {
					state: () => ({
						user: {
							roles: storeRoles,
						},
					}),
				},
			},
		}),
	});
	if (expectedSlot) {
		expect(wrapperDefault.text()).toContain(slotTrue);
	} else {
		expect(wrapperDefault.text()).not.toContain(slotTrue);
	}
};

describe("@components/UserHasRole", () => {
	it(...isValidComponent(UserHasRole));
	it("view true-slot if user has role", () => {
		checkCorrectView("ADMIN", [{ name: "ADMIN" }], true);
	});
	it("view false-slot if user does not have role", () => {
		checkCorrectView("ADMIN", [{ name: "USER" }], false);
	});
	it("defaults to view rejected", () => {
		checkCorrectView(undefined, [{ name: "USER" }], false);
	});
	it("defaults to false when user has no roles", () => {
		checkCorrectView("ADMIN", undefined, false);
	});
});
