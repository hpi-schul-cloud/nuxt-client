import SchoolsModule from "@/store/schools";
import setupStores from "@@/tests/test-utils/setupStores";
import SchoolPolicyFormDialog from "./SchoolPolicyFormDialog";

const mockProps = {
	isOpen: true,
};

const mockStore = {
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
	beforeEach(() => {
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		document.body.setAttribute("data-app", "true");
		setupStores({ schools: SchoolsModule });
	});

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
