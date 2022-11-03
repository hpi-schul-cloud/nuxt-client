import AuthSystems from "./AuthSystems";
import { schoolsModule, envConfigModule } from "@/store";
import { mockSchool } from "@@/tests/test-utils/mockObjects";
import setupStores from "@@/tests/test-utils/setupStores";
import EnvConfigModule from "@/store/env-config";
import SchoolsModule from "@/store/schools";

const generateProps = () => ({
	systems: [
		{ _id: "1", type: "sample system" }, // deletable: true, editable: false
		{
			_id: "2",
			type: "ldap",
			ldapConfig: { provider: "iserv-idm" },
			oauthConfig: { provider: "iserv-idm" },
		}, // deletable: false, editable: false
		{ _id: "3", type: "ldap", ldapConfig: { provider: "general" } }, // deletable: true, editable: true
		{ _id: "4", type: "oauth", oauthConfig: { provider: "sanis-idm" } }, // deletable: true, editable: false
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
	beforeEach(() => {
		setupStores({ 
			envConfigModule: EnvConfigModule, 
			schoolsModule: SchoolsModule 
		});
	});

	describe("displaying values", () => {
		describe("login link", () => {
			beforeEach(() => {
				envConfigModule.setEnvs({
					FEATURE_LOGIN_LINK_ENABLED: true,
				});
			});

			it("login link field should not be visible", () => {
				envConfigModule.setEnvs({
					FEATURE_LOGIN_LINK_ENABLED: false,
				});

				const wrapper = mount(AuthSystems, {
					...createComponentMocks({
						i18n: true,
						vuetify: true,
					}),
					propsData: generateProps(),
				});

				const loginLinkFieldVisibility = wrapper.findAll(
					searchStrings.schoolLoginLink
				);

				expect(loginLinkFieldVisibility).toHaveLength(0);
			});

			it("login link field should be visible for all systems", () => {
				schoolsModule.setSchool(mockSchool);
				const wrapper = mount(AuthSystems, {
					...createComponentMocks({
						i18n: true,
						vuetify: true,
					}),
					propsData: generateProps(),
				});

				const loginLinkFieldVisibility = wrapper.findAll(
					searchStrings.schoolLoginLink
				);
				const oauthAndLdapLink = wrapper.find(searchStrings.oauthAndLdapLink);
				const ldapLink = wrapper.find(searchStrings.ldapLink);
				const oauthLink = wrapper.find(searchStrings.oauthLink);

				expect(loginLinkFieldVisibility).toHaveLength(3);
				expect(oauthAndLdapLink.element.value).toContain(
					`strategy=${wrapper.props().systems[1].oauthConfig.provider}`
				);
				expect(ldapLink.element.value).toContain("strategy=ldap");
				expect(ldapLink.element.value).toContain(`schoolId=${mockSchool.id}`);
				expect(oauthLink.element.value).toContain(
					`strategy=${wrapper.props().systems[3].oauthConfig.provider}`
				);
			});

			it("login link field should render email login link", () => {
				const props = generateProps();
				props.systems = [];

				const wrapper = mount(AuthSystems, {
					...createComponentMocks({
						i18n: true,
						vuetify: true,
					}),
					propsData: props,
				});

				const loginLinkFieldVisibility = wrapper.findAll(
					searchStrings.schoolLoginLink
				);
				const emailLink = wrapper.find(searchStrings.emailLink);

				expect(loginLinkFieldVisibility).toHaveLength(1);
				expect(emailLink.element.value).toContain("strategy=email");
			});

			it("login link copy button should copy login link", () => {
				const mockElem = {
					value: "example_value",
					select: () => {},
					setSelectionRange: () => {},
				};
				Object.assign(navigator, {
					clipboard: {
						writeText: () => {},
					},
				});
				Object.assign(document, {
					getElementById: () => {
						return mockElem;
					},
				});
				const clipboardSpy = jest.spyOn(navigator.clipboard, "writeText");
				const wrapper = mount(AuthSystems, {
					...createComponentMocks({
						i18n: true,
						vuetify: true,
					}),
					propsData: generateProps(),
				});

				const loginLinkFieldVisibility = wrapper.findAll(
					searchStrings.schoolLoginLink
				);
				loginLinkFieldVisibility.wrappers[0].find(".v-icon").trigger("click");

				expect(loginLinkFieldVisibility).toHaveLength(3);
				expect(clipboardSpy).toHaveBeenCalledWith(mockElem.value);
			});
		});

		it("ldap button should be visible", async () => {
			const wrapper = mount(AuthSystems, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
				}),
				propsData: generateProps(),
			});

			const ldapButtonVisibility = wrapper.findAll(searchStrings.addLdap);
			expect(ldapButtonVisibility).toHaveLength(1);
			expect(
				ldapButtonVisibility.wrappers[0].element.text.trim()
			).toStrictEqual("LDAP-System hinzufügen");
			expect(ldapButtonVisibility.wrappers[0].vm.to).toStrictEqual(
				"/administration/ldap/config"
			);
		});

		it("table should exist and display the correct data", async () => {
			const wrapper = mount(AuthSystems, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
				}),
				propsData: generateProps(),
			});

			const systemTable = wrapper.find(searchStrings.tableSystem);

			expect(systemTable.exists()).toStrictEqual(true);

			const tableCell = wrapper.findAll(`${searchStrings.tableSystem} td`);

			expect(tableCell).toHaveLength(wrapper.props().systems.length * 3);
			expect(tableCell.wrappers[1].element.textContent).toStrictEqual(
				"sample system"
			);
		});

		it("should display the edit system button", async () => {
			const wrapper = mount(AuthSystems, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
				}),
				propsData: generateProps(),
			});

			const tableCell = wrapper.findAll(`${searchStrings.tableSystem} td`);

			// { _id: "1234", type: "sample system" }, // deletable: true, editable: false
			expect(
				tableCell.wrappers[2].find(searchStrings.deleteSystemButton).exists()
			).toStrictEqual(true);
			expect(
				tableCell.wrappers[2].find(searchStrings.editSystemButton).exists()
			).toStrictEqual(false);

			// { _id: "12345", type: "ldap", ldapConfig: { provider: "iserv-idm" } }, // deletable: false, editable: false
			expect(
				tableCell.wrappers[5].find(searchStrings.deleteSystemButton).exists()
			).toStrictEqual(false);
			expect(
				tableCell.wrappers[5].find(searchStrings.editSystemButton).exists()
			).toStrictEqual(false);

			// { _id: "123456", type: "ldap", ldapConfig: { provider: "general" } }, // deletable: true, editable: true
			expect(
				tableCell.wrappers[8].find(searchStrings.deleteSystemButton).exists()
			).toStrictEqual(true);
			expect(
				tableCell.wrappers[8].find(searchStrings.editSystemButton).exists()
			).toStrictEqual(true);
		});

		it("should NOT display the dialog", async () => {
			const wrapper = mount(AuthSystems, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
				}),
				propsData: generateProps(),
			});

			await wrapper.setData({
				confirmDeleteDialog: {
					isOpen: false,
					systemId: undefined,
				},
			});

			const customDialog = wrapper.findAll(searchStrings.customDialog);

			expect(customDialog).toHaveLength(1);
			expect(customDialog.wrappers[0].vm.isOpen).toStrictEqual(false);
		});

		it("should display the dialog", async () => {
			const wrapper = mount(AuthSystems, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
				}),
				propsData: generateProps(),
			});

			await wrapper.setData({
				confirmDeleteDialog: {
					isOpen: true,
					systemId: undefined,
				},
			});

			const customDialog = wrapper.findAll(searchStrings.customDialog);

			expect(customDialog).toHaveLength(1);
			expect(customDialog.wrappers[0].vm.isOpen).toStrictEqual(true);
		});
	});

	describe("events", () => {
		it("should call the action when 'dialog-confirmed' triggered", async () => {
			const deleteSpy = jest.spyOn(schoolsModule, "deleteSystem");
			const wrapper = mount(AuthSystems, {
				...createComponentMocks({
					i18n: true,

					vuetify: true,
				}),
				propsData: generateProps(),
			});
			const customDialog = wrapper.find(searchStrings.customDialog);

			customDialog.vm.$emit("dialog-confirmed", 123);
			expect(deleteSpy).toHaveBeenCalled();
		});

		it("should call the method when delete dialog confirmed", async () => {
			const removeSystem = jest.spyOn(AuthSystems.methods, "removeSystem");
			const wrapper = mount(AuthSystems, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
				}),
				propsData: generateProps(),
			});
			const customDialog = wrapper.find(searchStrings.customDialog);

			customDialog.vm.$emit("dialog-confirmed");
			expect(removeSystem).toHaveBeenCalled();
		});

		it("should open the 'delete dialog' when clicked the 'delete-system-btn'", async () => {
			const wrapper = mount(AuthSystems, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
				}),
				propsData: generateProps(),
			});
			const deleteButton = wrapper.find(searchStrings.deleteSystemButton);
			expect(wrapper.vm.$data.confirmDeleteDialog.isOpen).toStrictEqual(false);
			deleteButton.trigger("click");
			expect(wrapper.vm.$data.confirmDeleteDialog.isOpen).toStrictEqual(true);
			expect(wrapper.vm.$data.confirmDeleteDialog.systemId).toStrictEqual("1");
		});
	});
});
