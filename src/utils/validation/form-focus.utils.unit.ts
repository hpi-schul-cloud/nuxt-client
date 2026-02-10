import { isValidOrFocusFirstInvalidInput } from "./form-focus.utils";
import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { defineComponent, ref } from "vue";
import { VForm, VTextField } from "vuetify/components";

describe("form focus utils", () => {
	describe("isValidOrFocusFirstInvalidInput", () => {
		const setup = (initialValue: string) => {
			const formRef = ref<InstanceType<typeof VForm> | null>(null);

			const TestComponent = defineComponent({
				setup() {
					return { formRef };
				},
				template: `
					<VForm ref="formRef">
						<VTextField
							model-value="${initialValue}"
							:rules="[v => !!v || 'Field is required']"
						/>
					</VForm>`,
			});

			const wrapper = mount(TestComponent, {
				global: { plugins: [createTestingVuetify()] },
				attachTo: document.body,
			});

			return { wrapper, formRef };
		};

		afterEach(() => {
			document.body.innerHTML = "";
		});

		it("should return true if form is valid", async () => {
			const { formRef } = setup("valid text");

			const result = await isValidOrFocusFirstInvalidInput(formRef);
			expect(result).toBe(true);
		});

		it("should return false and focus first invalid input if form is invalid", async () => {
			const { formRef, wrapper } = setup("");

			const focusSpy = vi.spyOn(HTMLElement.prototype, "focus");
			const result = await isValidOrFocusFirstInvalidInput(formRef);

			expect(result).toBe(false);
			expect(focusSpy).toHaveBeenCalled();
			expect(document.activeElement).toEqual(wrapper.findComponent(VTextField).find("input").element);

			focusSpy.mockRestore();
		});

		it("should return false if the form is undefined", async () => {
			const result = await isValidOrFocusFirstInvalidInput(ref(null));
			expect(result).toBe(false);
		});
	});
});
