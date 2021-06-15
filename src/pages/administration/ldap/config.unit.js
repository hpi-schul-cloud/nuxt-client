import { default as ldapConfig } from "./config.vue";

const mockInputData = {
	url: "ldaps://ldap.hpi-schul-cloud.de",
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
				verifyExisting: verifyDataStub,
			},
			state: () => ({
				data: mockInputData,
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

	it("should call 'getData' action if $route.query.id is defined", async () => {
		mount(ldapConfig, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
				$route,
			}),
		});
		expect(getDataStub).toHaveBeenCalled();
		getDataStub.mockClear();
	});

	it("should set 'systemData' as 'data' if $route.query.id is defined", async () => {
		const customMockStore = { ...mockStore };
		customMockStore["ldap-config"].state = () => ({
			data: { ...mockInputData },
			temp: {},
			verified: {},
			submitted: {},
		});
		const wrapper = mount(ldapConfig, {
			...createComponentMocks({
				i18n: true,
				store: customMockStore,
				$route,
			}),
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.systemData).toStrictEqual(mockInputData);
		getDataStub.mockClear();
	});

	it("should not call 'getData' action if 'temp' is defined", async () => {
		const customMockStore = { ...mockStore };
		customMockStore["ldap-config"].state = () => ({
			data: mockInputData,
			temp: {
				testKey: "test",
			},
			verified: {},
			submitted: {},
		});
		mount(ldapConfig, {
			...createComponentMocks({
				i18n: true,
				store: customMockStore,
				$route,
			}),
		});
		expect(getDataStub).not.toHaveBeenCalled();
	});

	it("should set 'systemData' as 'temp' if 'temp' exists", async () => {
		const customMockStore = { ...mockStore };
		customMockStore["ldap-config"].state = () => ({
			data: mockInputData,
			temp: {
				testKey: "test",
			},
			verified: {},
			submitted: {},
		});
		const wrapper = mount(ldapConfig, {
			...createComponentMocks({
				i18n: true,
				store: customMockStore,
				$route,
			}),
		});
		expect(getDataStub).not.toHaveBeenCalled();
		expect(Object.keys(wrapper.vm.temp)).toHaveLength(1);
		expect(wrapper.vm.systemData.testKey).toStrictEqual("test");
	});

	it("should set 'isInvalid' to false if all keys in 'isInvalidData' are false", async () => {
		const wrapper = mount(ldapConfig, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
				$route,
			}),
		});
		await wrapper.setData({
			systemData: mockInputData,
			isInvalidData: {
				connection: false,
				users: false,
				roles: false,
				classes: false,
			},
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.isInvalid).toBe(false);
	});

	it("should set 'isInvalid' to true if any keys in 'isInvalidData' is true", async () => {
		const wrapper = mount(ldapConfig, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
				$route,
			}),
		});
		await wrapper.setData({
			systemData: mockInputData,
			isInvalidData: {
				connection: false,
				users: true,
				roles: false,
				classes: false,
			},
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.vm.isInvalid).toBe(true);
	});

	it("should set 'triggerValidation' to true if verify button is clicked", async () => {
		const wrapper = mount(ldapConfig, {
			...createComponentMocks({
				i18n: true,
				data() {
					return {
						systemData: {
							mockInputData,
						},
						triggerValidation: false,
					};
				},
				store: mockStore,
				$route,
			}),
		});
		const verifyBtn = wrapper.find(`[data-testid="ldapVerifyButton"]`);
		expect(verifyBtn.exists()).toBeTrue();
		verifyBtn.trigger("click");

		await wrapper.vm.$nextTick();
		expect(wrapper.vm.triggerValidation).toBeTrue();
	});

	it("should clear 'systemData' values if clearInputs button is clicked", async () => {
		const customMockStore = { ...mockStore };
		customMockStore["ldap-config"].state = () => ({
			data: { ...mockInputData },
			temp: {},
			verified: {},
			submitted: {},
		});
		const wrapper = mount(ldapConfig, {
			...createComponentMocks({
				i18n: true,
				data() {
					return {
						systemData: {
							...mockInputData,
						},
						triggerValidation: false,
					};
				},
				store: customMockStore,
				$route,
			}),
		});
		await wrapper.vm.$nextTick();
		expect(Object.keys(wrapper.vm.systemData)).toHaveLength(
			Object.keys(mockInputData).length
		);
		const clearInputsButton = wrapper.find(
			`[data-testid="ldapResetInputsButton"]`
		);
		expect(clearInputsButton.exists()).toBeTrue();
		clearInputsButton.trigger("click");

		await wrapper.vm.$nextTick();
		// when data is cleared, 2 keys are set as default values
		expect(Object.keys(wrapper.vm.systemData)).toHaveLength(2);
	});
});
