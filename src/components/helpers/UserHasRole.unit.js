import { authModule } from "@/store";
import AuthModule from "@/store/auth";
import { mockMe } from "@@/tests/test-utils";
import setupStores from "@@/tests/test-utils/setupStores";
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
		setupStores({
			authModule: AuthModule,
		});
	});

	it("view true-slot if user has role", () => {
		authModule.setMe({ ...mockMe, roles: [{ name: "admin" }] });
		checkCorrectView("ADMIN", ["admin"], true);
	});
	it("view false-slot if user does not have role", () => {
		authModule.setMe({ ...mockMe, roles: [{ name: "user" }] });

		checkCorrectView("ADMIN", ["user"], false);
	});
	it("defaults to view rejected", () => {
		authModule.setMe({ ...mockMe, roles: [{ name: "user" }] });
		checkCorrectView(undefined, ["user"], false);
	});
	it("defaults to false when user has no roles", () => {
		authModule.setMe(mockMe);
		checkCorrectView("ADMIN", [], false);
	});
});
