import LinkContentElementCreate from "./LinkContentElementCreate.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";

const VALID_URL = "https://www.abc.de/my-article";
const INVALID_URL = "my-article";

describe("LinkContentElementCreate", () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = () => {
		const wrapper = mount(LinkContentElementCreate, {
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
		});

		return {
			wrapper,
		};
	};

	describe("when valid url was entered", () => {
		describe("when enter is pressed", () => {
			it("should not show error-message", async () => {
				const { wrapper } = setup();

				await wrapper.findComponent({ name: "v-textarea" }).setValue(VALID_URL);
				await wrapper.find("form").trigger("submit.prevent");

				const alerts = wrapper.find('[role="alert"]');

				expect(alerts.text()).toBe("");
			});

			it("should emit create:url event", async () => {
				const { wrapper } = setup();

				await wrapper.findComponent({ name: "v-textarea" }).setValue(VALID_URL);
				await wrapper.findComponent({ name: "v-textarea" }).trigger("keydown.enter");
				await nextTick();

				expect(wrapper.emitted("create:url")).toEqual([[VALID_URL]]);
			});
		});
	});

	describe("when invalid url was entered", () => {
		it("should not be validated during input", async () => {
			const { wrapper } = setup();

			await wrapper.findComponent({ name: "v-textarea" }).setValue(INVALID_URL);
			await nextTick();

			const alerts = wrapper.find('[role="alert"]');

			expect(alerts.text()).toBe("");
		});

		describe("when enter is pressed", () => {
			it("should show invalid-url-error", async () => {
				const { wrapper } = setup();

				const textarea = await wrapper.findComponent({ name: "v-textarea" });
				await textarea.setValue(INVALID_URL);
				await textarea.trigger("keydown.enter");

				const alerts = wrapper.find('[role="alert"]').text();

				expect(alerts).toEqual("util-validators-invalid-url");
			});

			it("should not emit create:url event", async () => {
				const { wrapper } = setup();

				const textarea = await wrapper.findComponent({ name: "v-textarea" });
				await textarea.setValue(INVALID_URL);
				await textarea.trigger("keydown.enter");

				const emitted = wrapper.emitted("create:url");
				expect(emitted).toBeUndefined();
			});
		});
	});

	describe("when url field is empty", () => {
		describe("when submit button is clicked", () => {
			it("should show required-error-message", async () => {
				const { wrapper } = setup();

				await wrapper.find("form").trigger("submit.prevent");

				const alerts = wrapper.find('[role="alert"]').text();

				expect(alerts).toEqual("common.validation.required2");
			});

			it("should not emit create:url event", async () => {
				const { wrapper } = setup();

				await wrapper.findComponent({ name: "v-textarea" }).setValue(VALID_URL);
				await wrapper.find("form").trigger("submit.prevent");

				expect(wrapper.emitted("create:url")).toBeUndefined();
			});
		});
	});
});
