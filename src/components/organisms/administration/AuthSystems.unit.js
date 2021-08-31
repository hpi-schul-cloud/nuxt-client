import AuthSystems from "./AuthSystems";

const generateProps = () => ({
	systems: [
		{ _id: "1234", type: "sample system" },
		{ _id: "123456", type: "ldap" },
	],
	confirmDeleteDialog: {
		isOpen: false,
		systemId: undefined,
	},
});

const searchStrings = {
	addLdap: ".add-ldap",
	tableSystem: ".table-system",
	editSystemButton: ".edit-ldap-btn",
	deleteSystemButton: ".delete-sytem-btn",
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

			expect(tableCell).toHaveLength(6);
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

			const buttonSystemDelete = wrapper.findAll(
				searchStrings.deleteSystemButton
			);
			const buttonSystemEdit = wrapper.find(searchStrings.editSystemButton);

			expect(buttonSystemDelete).toHaveLength(2);
			expect(buttonSystemEdit.exists()).toBeTrue();
		});

		it("should NOT display the edit system button", async () => {
			const wrapper = mount(AuthSystems, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
				}),
				propsData: {
					systems: [{ _id: "1234", type: "sample system" }],
				},
			});

			const buttonSystemDelete = wrapper.findAll(
				searchStrings.deleteSystemButton
			);
			const buttonSystemEdit = wrapper.find(searchStrings.editSystemButton);

			expect(buttonSystemDelete).toHaveLength(1);
			expect(buttonSystemEdit.exists()).toBeFalse();
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
			const mockStore = {
				schools: {
					actions: {
						deleteSystem: jest.fn(),
					},
				},
			};
			const wrapper = mount(AuthSystems, {
				...createComponentMocks({
					i18n: true,
					store: mockStore,
					vuetify: true,
				}),
				propsData: generateProps(),
			});
			const customDialog = wrapper.find(searchStrings.customDialog);

			customDialog.vm.$emit("dialog-confirmed", 123);
			expect(mockStore.schools.actions.deleteSystem).toHaveBeenCalled();
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
