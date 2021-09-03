import UserHasPermission from "./UserHasPermission";
import AuthModule from "@/store/auth";

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
					getters: {
						getUserPermissions: () => storePermissions,
					},
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
					getters: {
						getUserPermissions: () => storePermissions,
					},
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
		AuthModule.setUser({ permissions: ["admin"] });
		checkCorrectView("ADMIN", ["admin"], true);
	});
	it("view false-slot if user does not have permission", () => {
		AuthModule.setUser({ permissions: ["user"] });
		checkCorrectView("ADMIN", ["user"], false);
	});
	it("defaults to view true-slot when permission is empty or undefined", () => {
		checkCorrectView(undefined, ["user"], true);
	});
	it("defaults to false when user has no permissions", () => {
		AuthModule.setUser({ permissions: [] });
		checkCorrectView("ADMIN", [], false);
	});
});
