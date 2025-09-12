import { default as ldapConfig } from "./LDAPConfig.page.vue";
import { createStore } from "vuex";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import BaseInput from "@/components/base/BaseInput/BaseInput.vue";
import BaseLink from "@/components/base/BaseLink.vue";
import { RouterLinkStub } from "@vue/test-utils";
import { nextTick } from "vue";
import { setActivePinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";

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

const getStoreOptions = () => ({
	modules: {
		auth: {
			namespaced: true,
			state: () => ({
				user: {
					permissions: ["ADMIN_VIEW", "SCHOOL_EDIT"],
				},
			}),
		},
		"ldap-config": {
			namespaced: true,
			actions: {
				getData: vi.fn(),
				verifyData: vi.fn(),
				verifyExisting: vi.fn(),
			},
			getters: {
				getData: () => ({ ...mockInputData }),
				getVerified: () => ({}),
				getSubmitted: () => ({}),
				getTemp: () => ({}),
				getStatus: () => null,
			},
			state: () => ({
				data: { ...mockInputData },
				verified: {},
				submitted: {},
				temp: {},
			}),
		},
	},
});

describe("ldap/config", () => {
	const setup = ({ route, storeOptions }) => {
		window.scrollTo = vi.fn();

		const mockStore = createStore(storeOptions);

		const wrapper = shallowMount(ldapConfig, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				mocks: {
					$route: route,
					$store: mockStore,
				},
				stubs: {
					stubs: { "router-link": RouterLinkStub },
				},
				components: {
					"base-input": BaseInput,
					"base-link": BaseLink,
				},
			},
		});

		return { wrapper };
	};

	beforeAll(() => {
		setActivePinia(createTestingPinia());
	});

	it("should call 'getData' action if $route.query.id is defined", async () => {
		const storeOptions = getStoreOptions();
		setup({
			route: { query: { id: "mockId" } },
			storeOptions,
		});
		await nextTick();

		expect(
			storeOptions.modules["ldap-config"].actions.getData
		).toHaveBeenCalled();
	});

	it("should set 'systemData' as 'data' if $route.query.id is defined", async () => {
		const storeOptions = getStoreOptions();
		const { wrapper } = setup({
			route: { query: { id: "mockId" } },
			storeOptions,
		});
		await nextTick();

		expect(wrapper.vm.systemData).toStrictEqual(mockInputData);
	});

	it("should not call 'getData' action if 'temp' is defined", async () => {
		const storeOptions = getStoreOptions();
		storeOptions.modules["ldap-config"].getters.getTemp = vi
			.fn()
			.mockReturnValue({
				testKey: "test",
			});

		setup({
			route: { query: { id: "mockId" } },
			storeOptions,
		});
		await nextTick();

		expect(
			storeOptions.modules["ldap-config"].actions.getData
		).not.toHaveBeenCalled();
	});

	it("should set 'systemData' as 'temp' if 'temp' exists", async () => {
		const storeOptions = getStoreOptions();
		storeOptions.modules["ldap-config"].getters.getTemp = vi
			.fn()
			.mockReturnValue({
				testKey: "test",
			});

		const { wrapper } = setup({
			route: { query: { id: "mockId" } },
			storeOptions,
		});
		await nextTick();

		expect(
			storeOptions.modules["ldap-config"].actions.getData
		).not.toHaveBeenCalled();
		expect(Object.keys(wrapper.vm.temp)).toHaveLength(1);
		expect(wrapper.vm.systemData.testKey).toStrictEqual("test");
	});

	it("should set 'isInvalid' to false if all keys in 'isInvalidData' are false", async () => {
		const storeOptions = getStoreOptions();

		const { wrapper } = setup({
			route: { query: { id: "mockId" } },
			storeOptions,
		});
		await nextTick();

		wrapper.setData({
			systemData: mockInputData,
			isInvalidData: {
				connection: false,
				users: false,
				roles: false,
				classes: false,
			},
		});
		await nextTick();

		expect(wrapper.vm.isInvalid).toBe(false);
	});

	it("should set 'isInvalid' to true if any keys in 'isInvalidData' is true", async () => {
		const storeOptions = getStoreOptions();

		const { wrapper } = setup({
			route: { query: { id: "mockId" } },
			storeOptions,
		});
		await nextTick();

		wrapper.setData({
			systemData: mockInputData,
			isInvalidData: {
				connection: false,
				users: true,
				roles: false,
				classes: false,
			},
		});
		await nextTick();

		expect(wrapper.vm.isInvalid).toBe(true);
	});

	it("should set 'triggerValidation' to true if verify button is clicked", async () => {
		const storeOptions = getStoreOptions();

		const { wrapper } = setup({
			route: { query: { id: "mockId" } },
			storeOptions,
		});
		await nextTick();

		wrapper.setData({
			systemData: {
				mockInputData,
			},
			triggerValidation: false,
		});
		await nextTick();

		const verifyBtn = wrapper.find(`[data-testid="ldapVerifyButton"]`);
		expect(verifyBtn.exists()).toBeTruthy();
		verifyBtn.trigger("click");

		await nextTick();
		expect(wrapper.vm.triggerValidation).toBeTruthy();
	});

	it("should clear 'systemData' values if clearInputs button is clicked", async () => {
		const storeOptions = getStoreOptions();

		const { wrapper } = setup({
			route: { query: { id: "mockId" } },
			storeOptions,
		});
		await nextTick();

		wrapper.setData({
			systemData: {
				mockInputData,
			},
			triggerValidation: false,
		});
		await nextTick();

		const clearInputsButton = wrapper.find(
			`[data-testid="ldapResetInputsButton"]`
		);
		expect(clearInputsButton.exists()).toBeTruthy();
		await clearInputsButton.trigger("click");

		// when data is cleared, 2 keys are set as default values
		expect(Object.keys(wrapper.vm.systemData)).toHaveLength(2);
	});
});
