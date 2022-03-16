import { initializeStores } from "@/store";
import Vuex from "vuex";
import UserHasPermission from "./UserHasPermission";
import { authModule } from "@/store";
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
	});

	if (expectedSlot) {
		expect(wrapperDefault.text()).toContain(slotTrue);
	} else {
		expect(wrapperDefault.text()).not.toContain(slotTrue);
	}
};

describe("@components/helpers/UserHasPermission", () => {
	beforeEach(() => {
		const store = new Vuex.Store({
			modules: {
				auth: AuthModule,
			},
		});
		initializeStores(store);
	});

	it(...isValidComponent(UserHasPermission));
	it("view true-slot if user has permission", () => {
		authModule.setUser({ permissions: ["admin"] });
		checkCorrectView("ADMIN", ["admin"], true);
	});
	it("view false-slot if user does not have permission", () => {
		authModule.setUser({ permissions: [] });
		checkCorrectView("ADMIN", ["user"], false);
	});
	it("defaults to view true-slot when permission is empty or undefined", () => {
		checkCorrectView(undefined, ["user"], true);
	});
	it("defaults to false when user has no permissions", () => {
		authModule.setUser({ permissions: [] });
		checkCorrectView("ADMIN", [], false);
	});
});
