import FolderTitleInput from "./FolderTitleInput.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { flushPromises } from "@vue/test-utils";
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
		it("should not show error-message", async () => {
			const { wrapper } = setup();

			await wrapper.findComponent(VTextField).setValue(VALID_TITLE);
			await nextTick();

			const alerts = wrapper.find('[role="alert"]');

			expect(alerts.text()).toBe("");
		});

		it("should emit update:title event", async () => {
			const { wrapper } = setup();

			await wrapper.findComponent(VTextField).setValue(VALID_TITLE);
			await nextTick();

			expect(wrapper.emitted("update:title")).toEqual([[VALID_TITLE]]);
		});
	});

	describe("when invalid title was entered", () => {
		it("should show error-message", async () => {
			const { wrapper } = setup();

			const textField = wrapper.findComponent(VTextField);
			await textField.setValue(VALID_TITLE);
			await textField.setValue(INVALID_TITLE);
			await nextTick();
			await flushPromises();

			const alerts = wrapper.find('[role="alert"]').text();
			expect(alerts).toEqual("common.validation.containsOpeningTag");
		});

		it("should not emit update:title event", async () => {
			const { wrapper } = setup();

			await wrapper.findComponent(VTextField).setValue(INVALID_TITLE);
			await nextTick();

			expect(wrapper.emitted("update:title")).toBeUndefined();
		});
	});

	describe("when title field is empty", () => {
		it("should show error-message", async () => {
			const { wrapper } = setup();

			const textField = wrapper.findComponent(VTextField);
			await textField.setValue(VALID_TITLE);
			await textField.setValue("");
			await nextTick();
			await flushPromises();

			const alerts = wrapper.find('[role="alert"]').text();
			expect(alerts).toEqual("common.validation.required");
		});

		it("should not emit update:title event", async () => {
			const { wrapper } = setup();

			await wrapper.findComponent(VTextField).setValue("");
			await nextTick();

			expect(wrapper.emitted("update:title")).toBeUndefined();
		});
	});
});
