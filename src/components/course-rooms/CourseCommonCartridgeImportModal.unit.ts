import CourseCommonCartridgeImportModal from "./CourseCommonCartridgeImportModal.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { SvsDialog } from "@ui-dialog";
import { flushPromises, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { VFileInput } from "vuetify/components";

describe("CourseCommonCartridgeImportModal", () => {
	const getWrapper = (withTestFile = false) => {
		const wrapper = mount(CourseCommonCartridgeImportModal, {
			props: {
				modelValue: true,
			},
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});
		const dialog = wrapper.findComponent(SvsDialog);

		const testFile = new File([], "test.imscc");

		if (withTestFile) {
			const fileInput = wrapper.findComponent(VFileInput);
			fileInput.vm.$emit("update:modelValue", testFile);
		}

		return { wrapper, dialog, testFile };
	};

	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	it("passes confirmBtnDisabled=true when no file is selected", () => {
		const { dialog } = getWrapper();

		expect(dialog.props("confirmBtnDisabled")).toBe(true);
	});

	it("passes confirmBtnDisabled=false when a file is selected", async () => {
		const { dialog } = getWrapper(true);
		await flushPromises();

		expect(dialog.props("confirmBtnDisabled")).toBe(false);
	});

	it("emits import event with file on confirm", async () => {
		const { wrapper, dialog, testFile } = getWrapper(true);

		dialog.vm.$emit("confirm");

		expect(wrapper.emitted("import")).toBeTruthy();
		const emittedEvents = wrapper.emitted("import");
		expect(emittedEvents?.[0]?.[0]).toBe(testFile);
	});

	it("clears file after confirm", async () => {
		const { wrapper, dialog } = getWrapper(true);

		await dialog.vm.$emit("confirm");
		await flushPromises();

		const fileInput = wrapper.findComponent(VFileInput);
		expect(fileInput.props("modelValue")).toBe(null);
	});

	it("clears file after cancel", async () => {
		const { wrapper, dialog } = getWrapper(true);

		await dialog.vm.$emit("cancel");
		await flushPromises();

		const fileInput = wrapper.findComponent(VFileInput);
		expect(fileInput.props("modelValue")).toBe(null);
	});
});
