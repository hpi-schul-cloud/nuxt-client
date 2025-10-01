import UserHasRole from "./UserHasRole";
import { authModule } from "@/store";
import AuthModule from "@/store/auth";
import { meResponseFactory } from "@@/tests/test-utils";
import setupStores from "@@/tests/test-utils/setupStores";

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
		const mockMe = meResponseFactory.build({ roles: [{ name: "admin" }] });
		authModule.setMe(mockMe);

		checkCorrectView("ADMIN", ["admin"], true);
	});
	it("view false-slot if user does not have role", () => {
		const mockMe = meResponseFactory.build({ roles: [{ name: "user" }] });
		authModule.setMe(mockMe);

		checkCorrectView("ADMIN", ["user"], false);
	});
	it("defaults to view rejected", () => {
		const mockMe = meResponseFactory.build({ roles: [{ name: "user" }] });
		authModule.setMe(mockMe);

		checkCorrectView(undefined, ["user"], false);
	});
	it("defaults to false when user has no roles", () => {
		const mockMe = meResponseFactory.build();
		authModule.setMe(mockMe);

		checkCorrectView("ADMIN", [], false);
	});
});
