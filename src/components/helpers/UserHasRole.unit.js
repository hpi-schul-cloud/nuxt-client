import UserHasRole from "./UserHasRole";
import { createTestAppStore } from "@@/tests/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";

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
	});
	if (expectedSlot) {
		expect(wrapperDefault.text()).toContain(slotTrue);
	} else {
		expect(wrapperDefault.text()).not.toContain(slotTrue);
	}
};

describe("@/components/helpers/UserHasRole", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	it("view true-slot if user has role", () => {
		createTestAppStore({ me: { roles: [{ id: "admin1", name: "admin" }] } });
		checkCorrectView("ADMIN", ["admin"], true);
	});
	it("view false-slot if user does not have role", () => {
		createTestAppStore({ me: { roles: [{ id: "user1", name: "user" }] } });
		checkCorrectView("ADMIN", ["user"], false);
	});
	it("defaults to view rejected", () => {
		createTestAppStore({ me: { roles: [{ id: "user1", name: "user" }] } });
		checkCorrectView(undefined, ["user"], false);
	});
	it("defaults to false when user has no roles", () => {
		createTestAppStore();
		checkCorrectView("ADMIN", [], false);
	});
});
