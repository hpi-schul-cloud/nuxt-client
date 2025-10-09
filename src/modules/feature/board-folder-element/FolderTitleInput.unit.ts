import FolderTitleInput from "./FolderTitleInput.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { nextTick } from "vue";
import { VTextField } from "vuetify/lib/components/index";

const VALID_TITLE = "My Folder Title";
const INVALID_TITLE = "<A";

describe("FolderTitleInput.vue", () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = () => {
		const wrapper = mount(FolderTitleInput, {
			props: {
				title: "",
			},
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
		});

		return {
			wrapper,
		};
	};

	describe("when valid title was entered", () => {
		describe("when enter is pressed", () => {
			it("should not show error-message", async () => {
				const { wrapper } = setup();

				await wrapper.findComponent(VTextField).setValue(VALID_TITLE);
				await wrapper.find('[data-testid="folder-title-text-field-in-card"]').trigger("click");

				const alerts = wrapper.find('[role="alert"]');

				expect(alerts.text()).toBe("");
			});

			it("should emit update:title event", async () => {
				const { wrapper } = setup();

				await wrapper.findComponent(VTextField).setValue(VALID_TITLE);
				await wrapper.findComponent(VTextField).trigger("keydown.enter");
				await nextTick();

				expect(wrapper.emitted("update:title")).toEqual([[VALID_TITLE]]);
			});
		});
	});

	describe("when invalid title was entered", () => {
		describe("when enter is pressed", () => {
			it("should show error-message", async () => {
				const { wrapper } = setup();

				await wrapper.findComponent(VTextField).setValue(INVALID_TITLE);
				await wrapper.find('[data-testid="folder-title-text-field-in-card"]').trigger("click");

				const alerts = wrapper.find('[role="alert"]');

				expect(alerts.text()).toBe("common.validation.containsOpeningTag");
			});

			it("should not emit update:title event", async () => {
				const { wrapper } = setup();

				await wrapper.findComponent(VTextField).setValue(INVALID_TITLE);
				await wrapper.findComponent(VTextField).trigger("keydown.enter");
				await nextTick();

				expect(wrapper.emitted("update:title")).toBeUndefined();
			});
		});
	});

	describe("when title field is empty", () => {
		describe("when submit button is clicked", () => {
			it("should show replace value with default message", async () => {
				const { wrapper } = setup();

				await wrapper.find('[data-testid="folder-title-text-field-in-card"]').trigger("submit.prevent");

				const textField = wrapper
					.findComponent('[data-testid="folder-title-text-field-in-card"]')
					.find("input[type='text']");

				expect(textField.attributes("value")).toEqual("pages.folder.untitled");
			});

			it("should emit update:title event", async () => {
				const { wrapper } = setup();

				await wrapper.findComponent(VTextField).setValue("");
				await wrapper.find('[data-testid="save-folder-title-in-card"]').trigger("click");
				await nextTick();

				expect(wrapper.emitted("update:title")).toEqual([[""]]);
			});
		});
	});
});
