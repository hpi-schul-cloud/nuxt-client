import AuthSystems from "./AuthSystems";
import SchoolsModule from "@/store/schools";

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
};

describe("AuthSystems", () => {
	it(...isValidComponent(AuthSystems));

	describe("displaying values", () => {
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

			expect(systemTable.exists()).toBeTrue();

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
			).toBeTrue();
			expect(
				tableCell.wrappers[2].find(searchStrings.editSystemButton).exists()
			).toBeFalse();

			// { _id: "12345", type: "ldap", ldapConfig: { provider: "iserv-idm" } }, // deletable: false, editable: false
			expect(
				tableCell.wrappers[5].find(searchStrings.deleteSystemButton).exists()
			).toBeFalse();
			expect(
				tableCell.wrappers[5].find(searchStrings.editSystemButton).exists()
			).toBeFalse();

			// { _id: "123456", type: "ldap", ldapConfig: { provider: "general" } }, // deletable: true, editable: true
			expect(
				tableCell.wrappers[8].find(searchStrings.deleteSystemButton).exists()
			).toBeTrue();
			expect(
				tableCell.wrappers[8].find(searchStrings.editSystemButton).exists()
			).toBeTrue();
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
			expect(customDialog.wrappers[0].vm.isOpen).toBe(false);
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
			expect(customDialog.wrappers[0].vm.isOpen).toBe(true);
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

		it("should open the 'delete dialog' when clicked the 'delete-system-btn'", async () => {
			const wrapper = mount(AuthSystems, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
				}),
				propsData: generateProps(),
			});
			const deleteButton = wrapper.find(searchStrings.deleteSystemButton);
			expect(wrapper.vm.$data.confirmDeleteDialog.isOpen).toBeFalse();
			deleteButton.trigger("click");
			expect(wrapper.vm.$data.confirmDeleteDialog.isOpen).toBeTrue();
			expect(wrapper.vm.$data.confirmDeleteDialog.systemId).toStrictEqual(
				"1234"
			);
		});
	});
});
