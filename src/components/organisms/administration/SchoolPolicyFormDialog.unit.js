import SchoolPolicyFormDialog from "./SchoolPolicyFormDialog";

const school = {
	_id: "5f2987e020834114b8efd6f8",
	name: "Paul-Gerhardt-Gymnasium",
	fileStorageType: "awsS3",
	federalState: { $oid: "0000b186816abba584714c53" },
	county: {
		antaresKey: "BRB",
		_id: { $oid: "5fa55eb53f472a2d986c8812" },
		countyId: 12051,
		name: "Brandenburg an der Havel",
	},
	currentYear: { $oid: "5ebd6dc14a431f75ec9a3e77" },
	purpose: "demo",
	enableStudentTeamCreation: false,
	officialSchoolNumber: "123",
};

const mockProps = {
	isOpen: true,
};

const mockStore = {
	schools: {
		getters: {
			getSchool: () => {
				return school;
			},
		},
	},
	"consent-versions": {
		actions: {
			addConsentVersion: jest.fn(),
		},
	},
};

const searchStrings = {
	title: ".title-field",
	description: ".description-field",
	file: ".input-file",
	submitButton: ".submit-button",
	cancelButton: ".cancel-button",
};

describe("SchoolPolicyFormDialog", () => {
	it(...isValidComponent(SchoolPolicyFormDialog));

	describe("displaying values", () => {
		it("should display the title", async () => {
			const wrapper = mount(SchoolPolicyFormDialog, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
					store: mockStore,
				}),
				propsData: mockProps,
			});

			const title = wrapper.find(`${searchStrings.title} input`);
			expect(title.element.value).toStrictEqual(
				"Datenschutzerklärung der Schule"
			);
		});

		it("should display the description", async () => {
			const wrapper = mount(SchoolPolicyFormDialog, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
					store: mockStore,
				}),
				propsData: mockProps,
			});
			await wrapper.setData({ description: "abc" });

			const descriptionInput = wrapper.find(
				`${searchStrings.description} textarea`
			);
			expect(descriptionInput.element.value).toStrictEqual("abc");
		});

		it("file input component should be visible", async () => {
			const wrapper = mount(SchoolPolicyFormDialog, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
					store: mockStore,
				}),
				propsData: mockProps,
			});

			const fileInput = wrapper.findAll(searchStrings.file);
			expect(fileInput).toHaveLength(1);
		});
	});

	describe("events", () => {
		it("should call the action when 'submit-button' clicked", async () => {
			const wrapper = mount(SchoolPolicyFormDialog, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
					store: mockStore,
				}),
				propsData: mockProps,
			});

			const button = wrapper.find(searchStrings.submitButton);
			await wrapper.setData({ description: "abc" });
			button.trigger("click");
			expect(
				mockStore["consent-versions"].actions.addConsentVersion
			).toHaveBeenCalled();
			expect(wrapper.vm.$v.$invalid).toBeFalse();
		});

		it("should give validation error if textarea is empty", async () => {
			const wrapper = mount(SchoolPolicyFormDialog, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
					store: mockStore,
				}),
				propsData: mockProps,
			});

			const button = wrapper.find(searchStrings.submitButton);
			await wrapper.setData({ description: "" });
			button.trigger("click");

			expect(wrapper.vm.$v.$invalid).toBeTrue();
		});

		it("should emit 'dialog-closed' with parameter 'false' if cancel button clicked", async () => {
			const wrapper = mount(SchoolPolicyFormDialog, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
					store: mockStore,
				}),
				propsData: mockProps,
			});
			await wrapper.setData({ description: "abc" });
			const button = wrapper.find(searchStrings.cancelButton);
			button.trigger("click");

			expect(wrapper.emitted("dialog-closed")).toStrictEqual([[false]]);
			expect(wrapper.vm.description).toStrictEqual("");
		});
	});
});
