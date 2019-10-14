import UserHasPermission from "./UserHasPermission";
/**
 * @param  { String } expectedPermission used as prop
 * @param  { String[] } storePermissions values that are in store
 * @param  { Boolean } expectedSlot should the user get access?
 */
const checkCorrectView = (
	expectedPermission,
	storePermissions,
	expectedSlot
) => {
	const slotTrue = "SLOT-TRUE";
	const slotFalse = "SLOT-FALSE";
	// Test with named slots
	const wrapperSlots = mount(UserHasPermission, {
		propsData: {
			permission: expectedPermission,
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
							permissions: storePermissions,
						},
					}),
				},
			},
		}),
	});
	expect(wrapperSlots.text()).toContain(expectedSlot ? slotTrue : slotFalse);
	// Test with default slot
	const wrapperDefault = mount(UserHasPermission, {
		propsData: {
			permission: expectedPermission,
		},
		slots: {
			default: slotTrue,
		},
		...createComponentMocks({
			store: {
				auth: {
					state: () => ({
						user: {
							permissions: storePermissions,
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

describe("@components/helpers/UserHasPermission", () => {
	it(...isValidComponent(UserHasPermission));
	it("view true-slot if user has permission", () => {
		checkCorrectView("ADMIN", ["ADMIN"], true);
	});
	it("view false-slot if user does not have permission", () => {
		checkCorrectView("ADMIN", ["USER"], false);
	});
	it("defaults to view rejected", () => {
		checkCorrectView(undefined, ["USER"], false);
	});
	it("defaults to false when user has no permissions", () => {
		checkCorrectView("ADMIN", undefined, false);
	});
});
