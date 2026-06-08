import { default as ldapActivate } from "./LDAPActivate.page.vue";
import { createTestEnvStore, mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { createTestSchoolStore } from "@@/tests/test-utils/factory/school-test.utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { SchulcloudTheme } from "@api-server";
import { useImportUsersStore } from "@data-import-users";
import { useLdapConfigStore } from "@data-ldap";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, VueWrapper } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { nextTick } from "vue";
import { LocationQuery } from "vue-router";
import { createRouterMock, injectRouterMock } from "vue-router-mock";
import { VCard, VDialog } from "vuetify/components";

const mockResponseData = {
	ok: true,
	errors: [],
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

describe("ldap/activate", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
		createTestEnvStore({ FEATURE_USER_MIGRATION_ENABLED: false });
		createTestSchoolStore();
	});

	const setup = (options?: Partial<Partial<{ query: LocationQuery }>>) => {
		const router = createRouterMock();
		injectRouterMock(router);

		if (options?.query) {
			router.setQuery(options.query);
		}

		const wrapper = mount(ldapActivate, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		const ldapConfigStore = mockedPiniaStoreTyping(useLdapConfigStore);
		const importUsersStore = mockedPiniaStoreTyping(useImportUsersStore);

		return { wrapper, ldapConfigStore, importUsersStore, router };
	};

	const triggerSubmit = async (wrapper: VueWrapper) => {
		const submitBtn = wrapper.find(`[data-testid="ldapSubmitButton"]`);
		expect(submitBtn.exists()).toBe(true);
		await submitBtn.trigger("click");
		await flushPromises();
	};

	describe("when verified value is undefined", () => {
		describe("and route query has id", () => {
			it("should redirect to ldap config page", () => {
				const id = "mockId";
				const { router, ldapConfigStore } = setup({
					query: { id },
				});

				ldapConfigStore.verified = undefined;

				expect(router.push).toHaveBeenCalledWith(`/administration/ldap/config?id=${id}`);
			});
		});
		describe("and route query does not have id", () => {
			it("should redirect to ldap config page without id", () => {
				const { router, ldapConfigStore } = setup({
					query: {},
				});

				ldapConfigStore.verified = undefined;

				expect(router.push).toHaveBeenCalledWith("/administration/ldap/config");
			});
		});
	});

	it("should call 'createLdapConfig' action when submit button is clicked and route.query.id is not defined", async () => {
		const { wrapper, ldapConfigStore } = setup({ query: {} });

		await triggerSubmit(wrapper);

		expect(ldapConfigStore.createLdapConfig).toHaveBeenCalled();
	});

	it("should call 'updateLdapConfig' action when submit button is clicked and route.query.id is defined", async () => {
		const { wrapper, ldapConfigStore } = setup({
			query: { id: "mockId" },
		});
		await triggerSubmit(wrapper);

		expect(ldapConfigStore.updateLdapConfig).toHaveBeenCalled();
	});

	it("should render confirm modal component", () => {
		const { wrapper } = setup({
			query: { id: "mockId" },
		});

		const confirmModal = wrapper.findComponent(VDialog);
		expect(confirmModal.exists()).toBe(true);
	});

	it("should push to router when clicking the ok button in the modal ", async () => {
		const { wrapper, router, ldapConfigStore } = setup({
			query: { id: "mockId" },
		});

		ldapConfigStore.submitted = mockResponseData;
		await nextTick();

		const confirmModal = wrapper.findComponent(VDialog);
		const confirmBtn = confirmModal.findComponent(VCard).find('[data-testid="ldapOkButton"]');
		expect(confirmBtn.exists()).toBe(true);
		await confirmBtn.trigger("click");

		expect(router.push).toHaveBeenCalled();
	});

	it("should render 'infoMessage' component if 'submitted' has an errors key", async () => {
		const { wrapper, ldapConfigStore } = setup({
			query: { id: "mockId" },
		});

		ldapConfigStore.submitted = {
			...mockResponseData,
			ok: false,
			errors: [{ type: "CONNECTION_ERROR", message: "testError" }],
		};
		await nextTick();

		await triggerSubmit(wrapper);

		const infoMessage = wrapper.find(`[data-testid="errorInfoMessage"]`);
		expect(infoMessage.exists()).toBe(true);
	});

	it("should not show checkbox for user migration", () => {
		const { wrapper } = setup({
			query: { id: "mockId" },
		});

		const section = wrapper.find(`[data-testid="migrateUsersSection"]`);
		expect(section.exists()).toBe(false);
		const checkbox = wrapper.find(`[data-testid="migrateUsersCheckbox"]`);
		expect(checkbox.exists()).toBe(false);
	});

	it("should show checkbox for user migration", () => {
		createTestEnvStore({ FEATURE_USER_MIGRATION_ENABLED: true });

		const { wrapper } = setup({
			query: {},
		});

		const section = wrapper.find(`[data-testid="migrateUsersSection"]`);
		expect(section.exists()).toBe(true);
		const checkbox = wrapper.find(`[data-testid="migrateUsersCheckbox"]`);
		expect(checkbox.exists()).toBe(true);
	});

	it("should call 'setSchoolUserMigration' on submit when user migration checkbox is checked", async () => {
		createTestEnvStore({ FEATURE_USER_MIGRATION_ENABLED: true });

		const { wrapper, importUsersStore } = setup();

		await triggerSubmit(wrapper);

		expect(importUsersStore.setSchoolInUserMigration).toHaveBeenCalledWith(false);
	});

	describe("when the instance is NBC", () => {
		const setupNbc = () => {
			createTestEnvStore({
				SC_THEME: SchulcloudTheme.N21,
				FEATURE_USER_MIGRATION_ENABLED: true,
			});

			const { wrapper } = setup({
				query: {},
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

	describe("onBack", () => {
		it("should redirect to ldap config page", async () => {
			const { wrapper, router } = setup({
				query: { id: "mockId" },
			});

			const backBtn = wrapper.find(`[data-testid="ldapBackButton"]`);
			await backBtn.trigger("click");

			expect(router.push).toHaveBeenCalledWith("/administration/ldap/config?id=mockId");
		});
	});
});
