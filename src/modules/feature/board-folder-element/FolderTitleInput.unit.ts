import EnvConfigModule from "@/store/env-config";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { nextTick } from "vue";
import FolderTitleInput from "./FolderTitleInput.vue";

const VALID_TITLE = "My Folder Title";

describe("FolderTitleInput.vue", () => {
	beforeEach(() => {
		setupStores({
			envConfigModule: EnvConfigModule,
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	const setup = () => {
		const wrapper = mount(FolderTitleInput, {
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

				await wrapper
					.findComponent({ name: "v-textarea" })
					.setValue(VALID_TITLE);
				await wrapper.find("form").trigger("submit.prevent");

				const alerts = wrapper.find('[role="alert"]');

				expect(alerts.text()).toBe("");
			});

			it("should emit update:title event", async () => {
				const { wrapper } = setup();

				await wrapper
					.findComponent({ name: "v-textarea" })
					.setValue(VALID_TITLE);
				await wrapper
					.findComponent({ name: "v-textarea" })
					.trigger("keydown.enter");
				await nextTick();

				expect(wrapper.emitted("update:title")).toEqual([[VALID_TITLE]]);
			});
		});
	});

	describe("when title field is empty", () => {
		describe("when submit button is clicked", () => {
			it("should show required-error-message", async () => {
				const { wrapper } = setup();

				await wrapper.find("form").trigger("submit.prevent");

				const alerts = wrapper.find('[role="alert"]').text();

				expect(alerts).toEqual("common.validation.required2");
			});

			it("should not emit update:title event", async () => {
				const { wrapper } = setup();

				await wrapper.findComponent({ name: "v-textarea" }).setValue("");
				await wrapper.find("form").trigger("submit.prevent");

				expect(wrapper.emitted("update:title")).toBeUndefined();
			});
		});
	});
});
