import LinkContentElementCreate from "./LinkContentElementCreate.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";

const VALID_URL = "https://www.abc.de/my-article";
const INVALID_URL = "my-article";

describe("LinkContentElementCreate", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = (props: { existingUrl?: string } = {}) => {
		const wrapper = mount(LinkContentElementCreate, {
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
			props,
		});

		return { wrapper };
	};

	describe("when valid url was entered", () => {
		describe("when enter is pressed", () => {
			it("should not show error-message", async () => {
				const { wrapper } = setup();

				await wrapper.findComponent({ name: "v-textarea" }).setValue(VALID_URL);
				await wrapper.find("form").trigger("submit.prevent");

				expect(wrapper.find('[role="alert"]').text()).toBe("");
			});

			it("should emit create:url event", async () => {
				const { wrapper } = setup();

				await wrapper.findComponent({ name: "v-textarea" }).setValue(VALID_URL);
				await wrapper.findComponent({ name: "v-textarea" }).trigger("keydown.enter");
				await flushPromises();

				expect(wrapper.emitted("create:url")).toEqual([[VALID_URL]]);
			});

			it("should show success hint message", async () => {
				const { wrapper } = setup();

				await wrapper.findComponent({ name: "v-textarea" }).setValue(VALID_URL);
				await wrapper.findComponent({ name: "v-textarea" }).trigger("keydown.enter");
				await flushPromises();

				expect(wrapper.findComponent({ name: "v-textarea" }).props("hint")).toBeTruthy();
			});

			it("should apply success css class to the textarea", async () => {
				const { wrapper } = setup();

				await wrapper.findComponent({ name: "v-textarea" }).setValue(VALID_URL);
				await wrapper.findComponent({ name: "v-textarea" }).trigger("keydown.enter");
				await flushPromises();

				expect(wrapper.findComponent({ name: "v-textarea" }).classes()).toContain("input-success");
			});

			it("should clear success state when user starts typing again", async () => {
				const { wrapper } = setup();
				const textarea = wrapper.findComponent({ name: "v-textarea" });

				await textarea.setValue(VALID_URL);
				await textarea.trigger("keydown.enter");
				await flushPromises();

				expect(textarea.classes()).toContain("input-success");

				await textarea.trigger("keydown", { key: "a" });

				expect(textarea.classes()).not.toContain("input-success");
				expect(textarea.props("hint")).toBeFalsy();
			});
		});
	});

	describe("when invalid url was entered", () => {
		it("should not be validated during input", async () => {
			const { wrapper } = setup();

			await wrapper.findComponent({ name: "v-textarea" }).setValue(INVALID_URL);

			expect(wrapper.find('[role="alert"]').text()).toBe("");
		});

		describe("when enter is pressed", () => {
			it("should show invalid-url-error", async () => {
				const { wrapper } = setup();
				const textarea = wrapper.findComponent({ name: "v-textarea" });

				await textarea.setValue(INVALID_URL);
				await textarea.trigger("keydown.enter");

				expect(wrapper.find('[role="alert"]').text()).toEqual("Dies ist keine gültige URL.");
			});

			it("should not emit create:url event", async () => {
				const { wrapper } = setup();
				const textarea = wrapper.findComponent({ name: "v-textarea" });

				await textarea.setValue(INVALID_URL);
				await textarea.trigger("keydown.enter");

				expect(wrapper.emitted("create:url")).toBeUndefined();
			});

			it("should not apply success css class", async () => {
				const { wrapper } = setup();
				const textarea = wrapper.findComponent({ name: "v-textarea" });

				await textarea.setValue(INVALID_URL);
				await textarea.trigger("keydown.enter");
				await flushPromises();

				expect(textarea.classes()).not.toContain("input-success");
			});
		});
	});

	describe("when url field is empty", () => {
		describe("when submit button is clicked", () => {
			it("should show required-error-message", async () => {
				const { wrapper } = setup();

				await wrapper.find("form").trigger("submit.prevent");

				expect(wrapper.find('[role="alert"]').text()).toEqual("common.validation.required2");
			});

			it("should not emit create:url event", async () => {
				const { wrapper } = setup();

				await wrapper.findComponent({ name: "v-textarea" }).setValue(VALID_URL);
				await wrapper.find("form").trigger("submit.prevent");

				expect(wrapper.emitted("create:url")).toBeUndefined();
			});
		});
	});

	describe("when no existingUrl prop is provided", () => {
		it("should use the create label", () => {
			const { wrapper } = setup();

			expect(wrapper.findComponent({ name: "v-textarea" }).props("label")).toBe(
				"components.cardElement.LinkElement.create.label"
			);
		});
	});

	describe("when existingUrl prop is provided", () => {
		it("should pre-fill the url field", () => {
			const { wrapper } = setup({ existingUrl: VALID_URL });

			expect(wrapper.findComponent({ name: "v-textarea" }).props("modelValue")).toBe(VALID_URL);
		});

		it("should use the edit label", () => {
			const { wrapper } = setup({ existingUrl: VALID_URL });

			expect(wrapper.findComponent({ name: "v-textarea" }).props("label")).toBe(
				"components.cardElement.LinkElement.edit.label"
			);
		});
	});

	describe("when component is unmounted", () => {
		it("should emit create:url if the current url is valid", async () => {
			const { wrapper } = setup();

			await wrapper.findComponent({ name: "v-textarea" }).setValue(VALID_URL);
			wrapper.unmount();

			expect(wrapper.emitted("create:url")).toEqual([[VALID_URL]]);
		});

		it("should not emit create:url if the current url is invalid", async () => {
			const { wrapper } = setup();

			await wrapper.findComponent({ name: "v-textarea" }).setValue(INVALID_URL);
			wrapper.unmount();

			expect(wrapper.emitted("create:url")).toBeUndefined();
		});

		it("should not emit create:url if the url field is empty", () => {
			const { wrapper } = setup();

			wrapper.unmount();

			expect(wrapper.emitted("create:url")).toBeUndefined();
		});

		it("should not emit create:url twice if url was already submitted via the button", async () => {
			const { wrapper } = setup();
			const textarea = wrapper.findComponent({ name: "v-textarea" });

			await textarea.setValue(VALID_URL);
			await textarea.trigger("keydown.enter");
			await flushPromises();

			const emittedBeforeUnmount = wrapper.emitted("create:url");
			wrapper.unmount();

			expect(emittedBeforeUnmount).toHaveLength(1);
		});
	});
});
