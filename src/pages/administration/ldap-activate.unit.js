import BaseInput from "@/components/base/BaseInput/BaseInput.vue";
import BaseModal from "@/components/base/BaseModal.vue";
import SchoolsModule from "@/store/schools";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { createStore } from "vuex";
import { default as ldapActivate } from "./LDAPActivate.page.vue";
import { SchulcloudTheme } from "../../serverApi/v3";
import { createTestEnvStore } from "@@/tests/test-utils";
import { setActivePinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";

const mockResponseData = {
	ok: true,
	users: {
		total: 8,
		admin: 2,
		teacher: 2,
		student: 4,
		sample: {
			email: "alice.daniel@schul-cloud.org",
			firstName: "Alice",
			lastName: "Daniel",
			roles: ["student"],
			ldapDn: "uid=alice.daniel,ou=users,dc=schul-cloud,dc=org",
			ldapUUID: "MTIwMQ==",
			ldapUID: "alice.daniel",
			modifyTimestamp: "20190802121825Z",
		},
	},
	classes: {
		total: 3,
		sample: {
			className: "Klassen",
			ldapDn: "ou=classes,ou=groups,dc=schul-cloud,dc=org",
			modifyTimestamp: "20190712131016Z",
		},
	},
};

const getStoreOptions = () => {
	const submitStub = vi.fn();
	const patchStub = vi.fn();

	const storeOptions = {
		modules: {
			"ldap-config": {
				namespaced: true,
				actions: {
					submitData: submitStub,
					patchData: patchStub,
				},
				state: () => ({
					verified: { ...mockResponseData },
					submitted: { ...mockResponseData },
				}),
				getters: {
					getVerified: () => ({ ...mockResponseData }),
					getSubmitted: () => ({ ...mockResponseData }),
					getTemp: () => ({}),
					getStatus: () => "completed",
					getData: () => ({}),
				},
			},
		},
	};

	return { storeOptions, submitStub, patchStub };
};

describe("ldap/activate", () => {
	const setup = ({ route, storeOptions }) => {
		const routerPushStub = vi.fn();

		const wrapper = mount(ldapActivate, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				mocks: {
					$router: { push: routerPushStub },
					$route: route,
					$store: createStore(storeOptions),
				},
				components: {
					"base-input": BaseInput,
					"base-modal": BaseModal,
				},
			},
		});

		return { wrapper, routerPushStub };
	};

	beforeEach(() => {
		setupStores({
			schoolsModule: SchoolsModule,
		});
		setActivePinia(createTestingPinia());
		createTestEnvStore({ FEATURE_USER_MIGRATION_ENABLED: false });
	});

	it("should call 'submitaData' action when submit button is clicked and this.$route.query.id is not defined", async () => {
		const { storeOptions, submitStub } = getStoreOptions();
		const { wrapper } = setup({ route: { query: {} }, storeOptions });
		const submitBtn = wrapper.find(`[data-testid="ldapSubmitButton"]`);
		expect(submitBtn.exists()).toBe(true);
		await submitBtn.trigger("click");

		expect(submitStub).toHaveBeenCalled();
	});

	it("should call 'patchData' action when submit button is clicked and this.$route.query.id is defined", async () => {
		const { storeOptions, patchStub } = getStoreOptions();
		const { wrapper } = setup({
			route: { query: { id: "mockId" } },
			storeOptions,
		});
		const submitBtn = wrapper.find(`[data-testid="ldapSubmitButton"]`);
		expect(submitBtn.exists()).toBe(true);
		await submitBtn.trigger("click");

		expect(patchStub).toHaveBeenCalled();
	});

	it(" should push to router if submitted.ok is false", async () => {
		const { storeOptions } = getStoreOptions();
		storeOptions.modules["ldap-config"].state = () => ({
			verified: mockResponseData,
			submitted: { ...mockResponseData, ok: false },
		});

		const { wrapper } = setup({
			route: { query: { id: "mockId" } },
			storeOptions,
		});

		const submitBtn = wrapper.findComponent(`[data-testid="ldapSubmitButton"]`);
		expect(submitBtn.exists()).toBe(true);
		await submitBtn.trigger("click");

		// TODO make sure that route is pushed in the component
		// expect(routerPushStub).toHaveBeenCalled();
	});

	it("should render confirm modal component", () => {
		const { storeOptions } = getStoreOptions();

		const { wrapper } = setup({
			route: { query: { id: "mockId" } },
			storeOptions,
		});

		const confirmModal = wrapper.findComponent({ name: "v-dialog" });
		expect(confirmModal.exists()).toBe(true);
	});

	it("should push to router when clicking the ok button in the modal ", async () => {
		const { storeOptions } = getStoreOptions();
		storeOptions.modules["ldap-config"].getters.getSubmitted = () => ({
			...mockResponseData,
			ok: true,
		});

		const { wrapper, routerPushStub } = setup({
			route: { query: { id: "mockId" } },
			storeOptions,
		});

		const confirmModal = wrapper.findComponent({ name: "v-dialog" });
		const confirmBtn = confirmModal
			.findComponent({ name: "v-card" })
			.find('[data-testid="ldapOkButton"]');
		expect(confirmBtn.exists()).toBe(true);
		await confirmBtn.trigger("click");

		expect(routerPushStub).toHaveBeenCalled();
	});

	it("should render 'infoMessage' component if 'submitted' has an errors key", async () => {
		const { storeOptions } = getStoreOptions();
		storeOptions.modules["ldap-config"].getters.getSubmitted = () => ({
			...mockResponseData,
			ok: false,
			errors: [{ type: "CONNECTION_ERROR", message: "testError" }],
		});

		const { wrapper } = setup({
			route: { query: { id: "mockId" } },
			storeOptions,
		});

		const submitBtn = wrapper.find(`[data-testid="ldapSubmitButton"]`);
		expect(submitBtn.exists()).toBe(true);
		submitBtn.trigger("click");
		await wrapper.vm.$nextTick();

		const infoMessage = wrapper.find(`[data-testid="errorInfoMessage"]`);
		expect(infoMessage.exists()).toBe(true);
	});

	it("should not show checkbox for user migration", () => {
		const { storeOptions } = getStoreOptions();

		const { wrapper } = setup({
			route: { query: { id: "mockId" } },
			storeOptions,
		});

		const section = wrapper.find(`[data-testid="migrateUsersSection"]`);
		expect(section.exists()).toBe(false);
		const checkbox = wrapper.find(`[data-testid="migrateUsersCheckbox"]`);
		expect(checkbox.exists()).toBe(false);
	});

	it("should show checkbox for user migration", () => {
		createTestEnvStore({ FEATURE_USER_MIGRATION_ENABLED: true });

		const { storeOptions } = getStoreOptions();

		const { wrapper } = setup({
			route: { query: {} },
			storeOptions,
		});

		const section = wrapper.find(`[data-testid="migrateUsersSection"]`);
		expect(section.exists()).toBe(true);
		const checkbox = wrapper.find(`[data-testid="migrateUsersCheckbox"]`);
		expect(checkbox.exists()).toBe(true);
	});

	describe("when the instance is NBC", () => {
		const setupNbc = () => {
			createTestEnvStore({
				SC_THEME: SchulcloudTheme.N21,
				FEATURE_USER_MIGRATION_ENABLED: true,
			});

			const { storeOptions } = getStoreOptions();

			const { wrapper } = setup({
				route: { query: {} },
				storeOptions,
			});

			return { wrapper };
		};

		it("should not show show section and checkbox for user migration", () => {
			const { wrapper } = setupNbc();

			const section = wrapper.find(`[data-testid="migrateUsersSection"]`);
			const checkbox = wrapper.find(`[data-testid="migrateUsersCheckbox"]`);

			expect(section.exists()).toBe(false);
			expect(checkbox.exists()).toBe(false);
		});
	});
});
