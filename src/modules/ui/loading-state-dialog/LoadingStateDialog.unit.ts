import LoadingStateDialog from "./LoadingStateDialog.vue";
import { mockedPiniaStoreTyping } from "@@/tests/test-utils/mockedPiniaStoreTyping";
import { createTestingVuetify } from "@@/tests/test-utils/setup";
import { useLoadingStore } from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import { nextTick } from "vue";
import { VCard, VDialog, VProgressLinear } from "vuetify/lib/components/index";

describe("LoadingStateDialog", () => {
	const setup = async (isLoading: boolean) => {
		const wrapper = mount(LoadingStateDialog, {
			global: {
				plugins: [createTestingVuetify(), createTestingPinia()],
			},
		});
		const loadingStore = mockedPiniaStoreTyping(useLoadingStore);
		loadingStore.isLoading = isLoading;
		await nextTick();

		return { wrapper, loadingStore };
	};

	it("should display its contents when is loading true", async () => {
		const { wrapper } = await setup(true);

		const dialog = wrapper.findComponent(VDialog);
		const card = dialog.findComponent(VCard);
		expect(card.exists()).toBe(true);
	});

	it("should not display its contents when is loading false", async () => {
		const { wrapper } = await setup(false);

		const card = wrapper.findComponent(VCard);
		expect(card.exists()).toBe(false);
	});

	it("should update model value to false when is loading set to false", async () => {
		const { wrapper, loadingStore } = await setup(true);
		loadingStore.isLoading = false;
		await nextTick();

		const dialog = wrapper.findComponent(VDialog);
		expect(dialog.props().modelValue).toBe(false);
	});

	it("should display the text", async () => {
		const { wrapper, loadingStore } = await setup(true);
		const loadingText = "Loading...";
		loadingStore.loadingText = loadingText;
		await nextTick();

		const card = wrapper.findComponent(VCard);
		const dialogTitle = card.find('[data-testid="dialog-text"]');

		expect(dialogTitle.text()).toBe(loadingText);
	});

	it("should display the progress bar", async () => {
		const { wrapper } = await setup(true);

		expect(wrapper.findComponent(VProgressLinear).exists()).toBe(true);
	});
});
