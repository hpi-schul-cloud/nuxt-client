import UserRole from "./UserRole";
/**
 * @param  { String[] } storeRoles values that are in store
 * @param  { Boolean } expectedContent should the user get access?
 */
const checkRole = (expectedContent, storeRoles) => {
	const wrapper = mount(UserRole, {
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

	expect(wrapper.text()).toContain(expectedContent);
};

describe("@components/helpers/UserHasRole", () => {
	it(...isValidComponent(UserRole));
	it("shows role if user has one", () => {
		checkRole("Lehrer", [{ displayName: "Lehrer" }]);
	});
	it("shows nothing if user has no role", () => {
		checkRole("", [{ displayName: "" }]);
	});
});
