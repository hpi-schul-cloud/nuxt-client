import AuthSystems from "./AuthSystems";
import { Permission } from "@/serverApi/v3";
import { schoolsModule } from "@/store";
import SchoolsModule from "@/store/schools";
import { createTestAppStoreWithPermissions, createTestEnvStore } from "@@/tests/test-utils";
import { schoolSystemResponseFactory } from "@@/tests/test-utils/factory/schoolSystemResponseFactory";
import { mockSchool } from "@@/tests/test-utils/mockObjects";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { createTestingPinia } from "@pinia/testing";
import { RouterLinkStub } from "@vue/test-utils";
import { setActivePinia } from "pinia";

const generateProps = () => ({
	systems: [
		schoolSystemResponseFactory.build({ id: "1", type: "sample system" }), // deletable: true, editable: false
		schoolSystemResponseFactory.build({
			id: "2",
			type: "ldap",
			ldapConfig: { provider: "iserv-idm" },
			oauthConfig: { provider: "iserv-idm" },
		}), // deletable: false, editable: false
		schoolSystemResponseFactory.build({
			id: "3",
			type: "ldap",
			ldapConfig: { provider: "general" },
		}), // deletable: true, editable: true
		schoolSystemResponseFactory.build({
			id: "4",
			type: "oauth",
			oauthConfig: { provider: "sanis-idm" },
			alias: "moin.schule",
		}), // deletable: true, editable: false
	],
	confirmDeleteDialog: {
		isOpen: false,
		systemId: undefined,
	},
});

const searchStrings = {
	addLdap: ".add-ldap",
	tableSystem: ".table-system",
	editSystemButton: ".edit-system-btn",
	deleteSystemButton: ".delete-system-btn",
	customDialog: ".custom-dialog",
	schoolLoginLink: ".school-login-link",
	emailLink: "#school-login-link-0",
	oauthAndLdapLink: "#school-login-link-2",
	ldapLink: "#school-login-link-3",
	oauthLink: "#school-login-link-4",
};

describe("AuthSystems", () => {
	const RouterLinkStubMock = { ...RouterLinkStub, useLink: vi.fn() };

	const createWrapper = (options = {}) => {
		const wrapper = mount(AuthSystems, {
			global: {
				mocks: { RouterLink: RouterLinkStubMock },
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			...options,
		});

		return wrapper;
	};

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		setupStores({
			schoolsModule: SchoolsModule,
		});
	});

	describe("login link", () => {
		beforeEach(() => {
			createTestEnvStore({ FEATURE_LOGIN_LINK_ENABLED: true });
		});

		it("login link field should not be visible", () => {
			createTestEnvStore({ FEATURE_LOGIN_LINK_ENABLED: false });

			const wrapper = createWrapper({ props: generateProps() });

			const loginLinkFieldVisibility = wrapper.findAll(searchStrings.schoolLoginLink);

			expect(loginLinkFieldVisibility).toHaveLength(0);
		});

		it("login link field should be visible for all systems", () => {
			schoolsModule.setSchool(mockSchool);
			const wrapper = createWrapper({ props: generateProps() });

			const loginLinkFieldVisibility = wrapper.findAll(searchStrings.schoolLoginLink);
			const oauthAndLdapLink = wrapper.find(searchStrings.oauthAndLdapLink);
			const ldapLink = wrapper.find(searchStrings.ldapLink);
			const oauthLink = wrapper.find(searchStrings.oauthLink);

			expect(loginLinkFieldVisibility).toHaveLength(3);
			expect(oauthAndLdapLink.element.value).toContain(`strategy=${wrapper.props().systems[1].oauthConfig.provider}`);
			expect(ldapLink.element.value).toContain("strategy=ldap");
			expect(ldapLink.element.value).toContain(`schoolId=${mockSchool.id}`);
			expect(oauthLink.element.value).toContain(`strategy=${wrapper.props().systems[3].oauthConfig.provider}`);
		});

		it("login link field should render email login link", () => {
			const props = generateProps();
			props.systems = [];

			const wrapper = createWrapper({ props });

			const loginLinkFieldVisibility = wrapper.findAll(searchStrings.schoolLoginLink);
			const emailLink = wrapper.find(searchStrings.emailLink);

			expect(loginLinkFieldVisibility).toHaveLength(1);
			expect(emailLink.element.value).toContain("strategy=email");
		});

		it("login link copy button should copy login link", () => {
			const mockElem = {
				value: "example_value",
				select: () => ({}),
				setSelectionRange: () => ({}),
			};
			Object.assign(navigator, {
				clipboard: {
					writeText: () => ({}),
				},
			});
			Object.assign(document, {
				getElementById: () => mockElem,
			});
			const clipboardSpy = vi.spyOn(navigator.clipboard, "writeText");
			const wrapper = createWrapper({ props: generateProps() });

			const loginLinkFieldVisibility = wrapper.findAll(searchStrings.schoolLoginLink);
			loginLinkFieldVisibility[0].find(".v-icon").trigger("click");

			expect(loginLinkFieldVisibility).toHaveLength(3);
			expect(clipboardSpy).toHaveBeenCalledWith(mockElem.value);
		});
	});

	describe("displaying values", () => {
		beforeAll(() => {
			createTestEnvStore({ FEATURE_LOGIN_LINK_ENABLED: false });
		});

		it("ldap button should be visible", () => {
			createTestAppStoreWithPermissions([Permission.SystemCreate]);

			const wrapper = createWrapper({ props: generateProps() });

			const ldapButtonVisibility = wrapper.findAllComponents(searchStrings.addLdap);
			expect(ldapButtonVisibility).toHaveLength(1);
			expect(ldapButtonVisibility.at(0).text().trim()).toStrictEqual(
				"pages.administration.school.index.authSystems.addLdap"
			);

			expect(ldapButtonVisibility[0].vm.to).toStrictEqual("/administration/ldap/config");
		});

		it("table should exist and display the correct data", () => {
			const wrapper = createWrapper({ props: generateProps() });

			const systemTable = wrapper.find(searchStrings.tableSystem);

			expect(systemTable.exists()).toStrictEqual(true);

			const tableCell = wrapper.findAll(`${searchStrings.tableSystem} td`);

			expect(tableCell).toHaveLength(wrapper.props().systems.length * 3);
			expect(tableCell[1].element.textContent).toStrictEqual("sample system");
		});

		it("should display the edit system button", () => {
			createTestAppStoreWithPermissions([Permission.SystemCreate, Permission.SystemEdit]);

			const wrapper = createWrapper({ props: generateProps() });

			const tableCell = wrapper.findAll(`${searchStrings.tableSystem} td`);

			// { _id: "1", type: "sample system" }, // deletable: false, editable: false
			expect(tableCell[2].find(searchStrings.deleteSystemButton).exists()).toStrictEqual(false);
			expect(tableCell[2].find(searchStrings.editSystemButton).exists()).toStrictEqual(false);

			// { _id: "2", type: "ldap", ldapConfig: { provider: "iserv-idm" } }, // deletable: false, editable: false
			expect(tableCell[5].find(searchStrings.deleteSystemButton).exists()).toStrictEqual(false);
			expect(tableCell[5].find(searchStrings.editSystemButton).exists()).toStrictEqual(false);

			// { _id: "3", type: "ldap", ldapConfig: { provider: "general" } }, // deletable: true, editable: true
			expect(tableCell[8].find(searchStrings.deleteSystemButton).exists()).toStrictEqual(true);
			expect(tableCell[8].find(searchStrings.editSystemButton).exists()).toStrictEqual(true);

			// { _id: "4", type: "oauth", oauthConfig: { provider: "sanis-idm" } }, // deletable: false, editable: false
			expect(tableCell[11].find(searchStrings.deleteSystemButton).exists()).toStrictEqual(false);
			expect(tableCell[11].find(searchStrings.editSystemButton).exists()).toStrictEqual(true);
		});

		it("should redirect to ldap config page from edit button of general ldap system", () => {
			createTestAppStoreWithPermissions([Permission.SystemCreate, Permission.SystemEdit]);

			const wrapper = createWrapper({ props: generateProps() });
			const editSystemButton = wrapper.findComponent(searchStrings.editSystemButton);

			expect(editSystemButton.exists()).toBe(true);
			expect(editSystemButton.props("to")).toEqual("/administration/ldap/config?id=3");
		});

		it("should display system edit button and redirect to correct config page ", () => {
			createTestAppStoreWithPermissions([Permission.SystemCreate, Permission.SystemEdit]);
			const wrapper = createWrapper({ props: generateProps() });

			const systemEditButtons = wrapper.findAllComponents(searchStrings.editSystemButton);

			// { _id: "4", type: "oauth", oauthConfig: { provider: "sanis-idm" } }
			expect(systemEditButtons.length).toStrictEqual(2);
			expect(systemEditButtons[1].props("to")).toEqual(
				"/administration/school-settings/provisioning-options?systemId=4"
			);
			// { _id: "3", type: "ldap", ldapConfig: { provider: "general" } }
			expect(systemEditButtons[0].props("to")).toEqual("/administration/ldap/config?id=3");
		});

		it("should NOT display the dialog", () => {
			const wrapper = createWrapper({ props: generateProps() });

			const customDialog = wrapper.findAll(searchStrings.customDialog);

			expect(customDialog).toHaveLength(0);
		});

		it("should display the dialog", async () => {
			createTestAppStoreWithPermissions([Permission.SystemCreate, Permission.SystemEdit]);
			const wrapper = createWrapper({ props: generateProps() });

			const deleteBtn = wrapper.find(searchStrings.deleteSystemButton);
			await deleteBtn.trigger("click");

			const customDialog = wrapper.findAllComponents({
				name: "v-custom-dialog",
			});

			expect(customDialog).toHaveLength(1);
			expect(customDialog[0].vm.isOpen).toStrictEqual(true);
		});
	});

	describe("events", () => {
		it("should call the action when 'dialog-confirmed' triggered", async () => {
			createTestAppStoreWithPermissions([Permission.SystemCreate]);
			const deleteSpy = vi.spyOn(schoolsModule, "deleteSystem").mockImplementation(vi.fn());
			const wrapper = createWrapper({ props: generateProps() });

			expect(wrapper.findAll("tr").length).toBe(5);

			const deleteBtn = wrapper.findComponent(searchStrings.deleteSystemButton);
			await deleteBtn.trigger("click");

			const customDialog = wrapper.findComponent({ name: "v-custom-dialog" });

			customDialog.vm.$emit("dialog-confirmed", 123);
			expect(deleteSpy).toHaveBeenCalled();
		});

		it("should call the method when delete dialog confirmed", async () => {
			createTestAppStoreWithPermissions([Permission.SystemCreate]);
			const removeSystem = vi.spyOn(AuthSystems.methods, "removeSystem").mockImplementation(vi.fn());
			const wrapper = createWrapper({ props: generateProps() });

			const deleteBtn = wrapper.find(searchStrings.deleteSystemButton);
			await deleteBtn.trigger("click");
			const customDialog = wrapper.findComponent({ name: "v-custom-dialog" });

			customDialog.vm.$emit("dialog-confirmed");
			expect(removeSystem).toHaveBeenCalled();
		});

		it("should open the 'delete dialog' when clicked the 'delete-system-btn'", () => {
			createTestAppStoreWithPermissions([Permission.SystemCreate, Permission.SystemEdit, Permission.SystemView]);
			const wrapper = createWrapper({ props: generateProps() });
			const deleteButton = wrapper.find(searchStrings.deleteSystemButton);
			expect(wrapper.vm.$data.confirmDeleteDialog.isOpen).toStrictEqual(false);
			deleteButton.trigger("click");
			expect(wrapper.vm.$data.confirmDeleteDialog.isOpen).toStrictEqual(true);
			expect(wrapper.vm.$data.confirmDeleteDialog.systemId).toStrictEqual("3");
		});
	});
	describe("display system buttons", () => {
		const setup = () => {
			const wrapper = createWrapper({ props: generateProps() });

			const tableCell = wrapper.findAll(`${searchStrings.tableSystem} td`);

			return {
				tableCell,
			};
		};

		describe("when user does not have the permission to create and edit systems", () => {
			it("should not display the add ldap, system edit and system delete buttons", () => {
				const { tableCell } = setup();

				expect(tableCell[2].find(searchStrings.addLdap).exists()).toStrictEqual(false);

				expect(tableCell[2].find(searchStrings.editSystemButton).exists()).toStrictEqual(false);

				expect(tableCell[2].find(searchStrings.deleteSystemButton).exists()).toStrictEqual(false);
			});
		});
	});
});
