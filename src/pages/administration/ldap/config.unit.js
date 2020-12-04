import { default as ldapConfig } from "./config.vue";
import mock$objects from "../../../../tests/test-utils/pageStubs";

const mockInputData = {
	url: "ldaps://ldap.schul-cloud.org",
	basisPath: "dc=schul-cloud,dc=org",
	searchUser: "cn=ldapadmin,dc=schul-cloud,dc=org",
	userPath: "ou=users",
	firstName: "givenName",
	familyName: "sn",
	email: "mail",
	uid: "uid",
	uuid: "uidNumber",
	groupOption: "group",
	member: "description",
	student: "cn=student,ou=roles,ou=groups,dc=schul-cloud,dc=org",
	teacher: "cn=teacher,ou=roles,ou=groups,dc=schul-cloud,dc=org",
	admin: "cn=admin,ou=roles,ou=groups,dc=schul-cloud,dc=org",
	user: "no-sc",
	classPath: "ou=classes,ou=groups",
	nameAttribute: "description",
	participantAttribute: "member",
};
describe("ldap/config", () => {
	const getDataStub = jest.fn();
	const verifyDataStub = jest.fn();

	const mockStore = {
		auth: {
			state: () => ({
				user: {
					permissions: ["ADMIN_VIEW", "SCHOOL_EDIT"],
				},
			}),
		},
		"ldap-config": {
			actions: {
				getData: getDataStub,
				verifyData: verifyDataStub,
			},
			state: () => ({
				data: { mockInputData },
				verified: {},
				submitted: {},
				temp: {},
			}),
		},
	};
	const $route = {
		query: {
			id: "mockId",
		},
	};

	it(...isValidComponent(ldapConfig));

	it("should call 'getData' action", async () => {
		const wrapper = mount(ldapConfig, {
			...createComponentMocks({
				i18n: true,
				data() {
					return {
						systemData: {
							mockInputData,
						},
					};
				},
				store: mockStore,
				$route,
			}),
		});
		mock$objects(wrapper);
		//getData action is called when the page is created and this.$route.query.id exists
		expect(getDataStub).toHaveBeenCalled();
	});

	it("should call 'verifyData' action when verify button is clicked and isInvalid is false", async () => {
		const wrapper = mount(ldapConfig, {
			...createComponentMocks({
				i18n: true,
				data() {
					return {
						systemData: {
							// default input values
							member: "memberOf",
							groupOption: "group",
						},
					};
				},
				store: mockStore,
				$route,
			}),
		});
		mock$objects(wrapper);
		await wrapper.setData({
			systemData: {
				// default input values
				member: "memberOf",
				groupOption: "group",
			},
			isInvalidData: {
				connection: false,
				users: false,
				roles: false,
				classes: false,
			},
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.isInvalid).toBe(false);
		const verifyBtn = wrapper.find(`[data-testid="ldapVerifyButton"]`);
		expect(verifyBtn.exists()).toBe(true);
		verifyBtn.trigger("click");

		await wrapper.vm.$nextTick();
		expect(getDataStub).toHaveBeenCalled();
	});
});
