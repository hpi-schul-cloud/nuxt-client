import AuthSystems from "./AuthSystems";
import SchoolsModule from "@/store/schools";
import EnvConfigModule from "@/store/env-config";
import { mockSchool } from "@@/tests/test-utils/mockObjects";

const generateProps = () => ({
	systems: [
		{ _id: "1234", type: "sample system" }, // deletable: true, editable: false
		{ _id: "12345", type: "ldap", ldapConfig: { provider: "iserv-idm" } }, // deletable: false, editable: false
		{ _id: "123456", type: "ldap", ldapConfig: { provider: "general" } }, // deletable: true, editable: true
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
};

describe("AuthSystems", () => {
	it(...isValidComponent(AuthSystems));

	describe("displaying values", () => {
		describe("login link", () => {
			beforeEach(() => {
				EnvConfigModule.setEnvs({
					FEATURE_LOGIN_LINK_ENABLED: true,
				});
			});

			it("login link field should not be visible", () => {
				EnvConfigModule.setEnvs({
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

			it("login link field should be visible", () => {
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

				expect(loginLinkFieldVisibility).toHaveLength(1);
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

				expect(loginLinkFieldVisibility).toHaveLength(1);

				expect(loginLinkFieldVisibility.wrappers[0].vm.value).toContain(
					"strategy=email"
				);
			});

			it("login link field should render ldap login link", () => {
				SchoolsModule.setSchool(mockSchool);
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

				expect(loginLinkFieldVisibility).toHaveLength(1);

				expect(loginLinkFieldVisibility.wrappers[0].vm.value).toContain(
					"strategy=ldap"
				);
				expect(loginLinkFieldVisibility.wrappers[0].vm.value).toContain(
					`schoolId=${mockSchool.id}`
				);
			});

			it("login link field should render iserv login link", () => {
				const props = generateProps();
				props.systems = [{ oauthConfig: {} }];

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

				expect(loginLinkFieldVisibility).toHaveLength(1);

				expect(loginLinkFieldVisibility.wrappers[0].vm.value).toContain(
					"strategy=iserv"
				);
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

				expect(loginLinkFieldVisibility).toHaveLength(1);

				loginLinkFieldVisibility.wrappers[0].find(".v-icon").trigger("click");

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
			expect(ldapButtonVisibility.wrappers[0].element.text).toStrictEqual(
				"LDAP-System hinzufügen"
			);
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

			expect(tableCell).toHaveLength(9);
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
			const deleteSpy = jest.spyOn(SchoolsModule, "deleteSystem");
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
			expect(wrapper.vm.$data.confirmDeleteDialog.systemId).toStrictEqual(
				"1234"
			);
		});
	});
});
