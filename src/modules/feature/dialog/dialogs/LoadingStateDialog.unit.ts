import LoadingStateDialog from "./LoadingStateDialog.vue";
import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { VCard, VDialog, VProgressLinear } from "vuetify/lib/components/index";

describe("LoadingStateDialog", () => {
	const setup = (modelValue: boolean, loadingText = "") => {
		const wrapper = mount(LoadingStateDialog, {
			props: { modelValue, loadingText },
			global: {
				plugins: [createTestingVuetify()],
			},
		});

		return { wrapper };
	};

	it("should display its contents when modelValue is true", () => {
		const { wrapper } = setup(true);

		const dialog = wrapper.findComponent(VDialog);
		const card = dialog.findComponent(VCard);
		expect(card.exists()).toBe(true);
	});

	it("should not display its contents when modelValue is false", () => {
		const { wrapper } = setup(false);

		const card = wrapper.findComponent(VCard);
		expect(card.exists()).toBe(false);
	});

	it("should display the loading text", () => {
		const loadingText = "Loading...";
		const { wrapper } = setup(true, loadingText);

		const card = wrapper.findComponent(VDialog).findComponent(VCard);
		expect(card.text()).toContain(loadingText);
	});

	it("should display the progress bar", () => {
		const { wrapper } = setup(true);

		expect(wrapper.findComponent(VProgressLinear).exists()).toBe(true);
	});

	it("should emit after-leave when the VDialog transition ends", async () => {
		const { wrapper } = setup(true);

		await wrapper.findComponent(VDialog).vm.$emit("after-leave");

		expect(wrapper.emitted("after-leave")).toBeDefined();
	});
});
