import PurgeFilesDialog from "./PurgeFilesDialog.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { SvsDialog } from "@ui-dialog";
import { enableAutoUnmount, flushPromises, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { VCard } from "vuetify/components";

describe("PurgeFilesDialog.vue", () => {
	enableAutoUnmount(afterEach);

	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	const setupWrapper = (isOpen = true, fileCount = 1) => {
		const wrapper = mount(PurgeFilesDialog, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				modelValue: isOpen,
				fileCount,
			},
		});

		return { wrapper };
	};

	it("should render the SvsDialog", () => {
		const { wrapper } = setupWrapper();

		expect(wrapper.findComponent(SvsDialog).exists()).toBe(true);
	});

	it("should have the confirm button disabled initially", () => {
		const { wrapper } = setupWrapper();

		const dialog = wrapper.findComponent(SvsDialog);
		expect(dialog.props("confirmBtnDisabled")).toBe(true);
	});

	it("should render the confirmation checkbox", () => {
		const { wrapper } = setupWrapper();

		const checkbox = wrapper.findComponent(VCard).find("[data-testid='purge-files-dialog-checkbox']");
		expect(checkbox.exists()).toBe(true);
	});

	it("should enable the confirm button when the checkbox is checked", async () => {
		const { wrapper } = setupWrapper();

		const checkbox = wrapper.findComponent(VCard).find("input[type='checkbox']");
		await checkbox.setValue(true);

		const dialog = wrapper.findComponent(SvsDialog);
		expect(dialog.props("confirmBtnDisabled")).toBe(false);
	});

	it("should disable the confirm button when the checkbox is unchecked", async () => {
		const { wrapper } = setupWrapper();

		const checkbox = wrapper.findComponent(VCard).find("input[type='checkbox']");
		await checkbox.setValue(true);
		await checkbox.setValue(false);

		const dialog = wrapper.findComponent(SvsDialog);
		expect(dialog.props("confirmBtnDisabled")).toBe(true);
	});

	it("should emit confirm when the dialog confirms", async () => {
		const { wrapper } = setupWrapper();

		const checkbox = wrapper.findComponent(VCard).find("input[type='checkbox']");
		await checkbox.setValue(true);

		wrapper.findComponent(SvsDialog).vm.$emit("confirm");

		expect(wrapper.emitted("confirm")).toBeTruthy();
	});

	it("should emit cancel when the dialog cancels", () => {
		const { wrapper } = setupWrapper();

		wrapper.findComponent(SvsDialog).vm.$emit("cancel");

		expect(wrapper.emitted("cancel")).toBeTruthy();
	});

	it("should uncheck the checkbox when the dialog closes", async () => {
		const { wrapper } = setupWrapper(true);

		const checkbox = wrapper.findComponent(VCard).find("input[type='checkbox']");
		await checkbox.setValue(true);

		await wrapper.setProps({ modelValue: false });
		await flushPromises();

		await wrapper.setProps({ modelValue: true });

		const checkboxAfterReopen = wrapper.findComponent(VCard).find("input[type='checkbox']");
		expect((checkboxAfterReopen.element as HTMLInputElement).checked).toBe(false);
	});
});
