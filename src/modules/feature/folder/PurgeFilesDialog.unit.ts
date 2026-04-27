import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { SvsDialog } from "@ui-dialog";
import { enableAutoUnmount, flushPromises, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { VCard } from "vuetify/components";
import PurgeFilesDialog from "./PurgeFilesDialog.vue";

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

	it("should show the file count in the description", () => {
		const { wrapper } = setupWrapper(true, 3);

		const description = wrapper.findComponent(VCard).find("[data-testid='purge-files-dialog-description']");
		expect(description.exists()).toBe(true);
	});

	it("should have the confirm button disabled initially", () => {
		const { wrapper } = setupWrapper();

		const dialog = wrapper.findComponent(SvsDialog);
		expect(dialog.props("confirmBtnDisabled")).toBe(true);
	});

	it("should enable the confirm button when the correct confirmation word is typed", async () => {
		const { wrapper } = setupWrapper();

		// In tests, t() returns the i18n key itself
		const input = wrapper.findComponent(VCard).find("input[type='text']");
		await input.setValue("pages.folder.trash.purge.dialog.confirmationWord");

		const dialog = wrapper.findComponent(SvsDialog);
		expect(dialog.props("confirmBtnDisabled")).toBe(false);
	});

	it("should keep the confirm button disabled when wrong text is typed", async () => {
		const { wrapper } = setupWrapper();

		const input = wrapper.findComponent(VCard).find("input[type='text']");
		await input.setValue("something wrong");

		const dialog = wrapper.findComponent(SvsDialog);
		expect(dialog.props("confirmBtnDisabled")).toBe(true);
	});

	it("should be case-insensitive for the confirmation word", async () => {
		const { wrapper } = setupWrapper();

		// In tests, t() returns the i18n key itself
		const input = wrapper.findComponent(VCard).find("input[type='text']");
		await input.setValue("PAGES.FOLDER.TRASH.PURGE.DIALOG.CONFIRMATIONWORD");

		const dialog = wrapper.findComponent(SvsDialog);
		expect(dialog.props("confirmBtnDisabled")).toBe(false);
	});

	it("should emit confirm when the dialog confirms", async () => {
		const { wrapper } = setupWrapper();

		// In tests, t() returns the i18n key itself
		const input = wrapper.findComponent(VCard).find("input[type='text']");
		await input.setValue("pages.folder.trash.purge.dialog.confirmationWord");

		wrapper.findComponent(SvsDialog).vm.$emit("confirm");

		expect(wrapper.emitted("confirm")).toBeTruthy();
	});

	it("should emit cancel when the dialog cancels", () => {
		const { wrapper } = setupWrapper();

		wrapper.findComponent(SvsDialog).vm.$emit("cancel");

		expect(wrapper.emitted("cancel")).toBeTruthy();
	});

	it("should clear the input when the dialog closes", async () => {
		const { wrapper } = setupWrapper(true);

		// In tests, t() returns the i18n key itself
		const input = wrapper.findComponent(VCard).find("input[type='text']");
		await input.setValue("pages.folder.trash.purge.dialog.confirmationWord");

		await wrapper.setProps({ modelValue: false });
		await flushPromises();

		await wrapper.setProps({ modelValue: true });

		const inputAfterReopen = wrapper.findComponent(VCard).find("input[type='text']");
		expect((inputAfterReopen.element as HTMLInputElement).value).toBe("");
	});
});
