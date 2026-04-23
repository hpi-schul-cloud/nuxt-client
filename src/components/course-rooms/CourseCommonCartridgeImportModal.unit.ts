import CourseCommonCartridgeImportModal from "./CourseCommonCartridgeImportModal.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { SvsDialog } from "@ui-dialog";
import { flushPromises, mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { VFileInput } from "vuetify/components";

// Mock file with size
const createMockFile = (name: string, sizeInBytes: number): File => {
	const file = new File([""], name, { type: "application/octet-stream" });
	Object.defineProperty(file, "size", {
		value: sizeInBytes,
		configurable: true,
	});
	return file;
};

describe("CourseCommonCartridgeImportModal", () => {
	const getWrapper = (testFile?: File) => {
		const wrapper = mount(CourseCommonCartridgeImportModal, {
			props: {
				modelValue: true,
			},
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});
		const dialog = wrapper.findComponent(SvsDialog);

		if (testFile) {
			const fileInput = wrapper.findComponent(VFileInput);
			fileInput.vm.$emit("update:modelValue", testFile);
		}

		const fileInput = wrapper.findComponent(VFileInput);
		const rules = fileInput.props("rules") as ((value: File | undefined) => string | boolean)[];

		return { wrapper, dialog, rules };
	};

	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	it("passes confirmBtnDisabled=true when no file is selected", () => {
		const { dialog } = getWrapper();

		expect(dialog.props("confirmBtnDisabled")).toBe(true);
	});

	it("passes confirmBtnDisabled=false when a valid file is selected", async () => {
		const testFile = createMockFile("test.imscc", 1000);
		const { dialog } = getWrapper(testFile);
		await flushPromises();

		expect(dialog.props("confirmBtnDisabled")).toBe(false);
	});

	it("emits import event with file on confirm", async () => {
		const testFile = createMockFile("test.imscc", 1000);
		const { wrapper, dialog } = getWrapper(testFile);

		dialog.vm.$emit("confirm");

		expect(wrapper.emitted("import")).toBeTruthy();
		const emittedEvents = wrapper.emitted("import");
		expect(emittedEvents?.[0]?.[0]).toBe(testFile);
	});

	it("clears file after confirm", async () => {
		const testFile = createMockFile("test.imscc", 1000);
		const { wrapper, dialog } = getWrapper(testFile);

		await dialog.vm.$emit("confirm");
		await flushPromises();

		const fileInput = wrapper.findComponent(VFileInput);
		expect(fileInput.props("modelValue")).toBe(null);
	});

	it("clears file after cancel", async () => {
		const testFile = createMockFile("test.imscc", 1000);
		const { wrapper, dialog } = getWrapper(testFile);

		await dialog.vm.$emit("cancel");
		await flushPromises();

		const fileInput = wrapper.findComponent(VFileInput);
		expect(fileInput.props("modelValue")).toBe(null);
	});

	describe("file size validation", () => {
		it("passes confirmBtnDisabled=true when file exceeds size limit", async () => {
			// 1.5 GB file (exceeds default 1 GB limit)
			const largeFile = createMockFile("large.imscc", 1610612736);
			const { dialog } = getWrapper(largeFile);
			await flushPromises();

			expect(dialog.props("confirmBtnDisabled")).toBe(true);
		});

		it("passes validation rules to file input", () => {
			const { rules } = getWrapper();

			expect(rules).toBeDefined();
			expect(Array.isArray(rules)).toBe(true);
			expect(rules.length).toBeGreaterThan(0);
		});

		it("validation rule returns true for valid file size", () => {
			const { rules } = getWrapper();

			const validFile = createMockFile("test.imscc", 500 * 1024 * 1024); // 500 MB
			const result = rules[0](validFile);

			expect(result).toBe(true);
		});

		it("validation rule returns error message for file exceeding size limit", () => {
			const { rules } = getWrapper();

			const largeFile = createMockFile("large.imscc", 1.5 * 1024 * 1024 * 1024); // 1.5 GB
			const result = rules[0](largeFile);

			expect(typeof result).toBe("string");
			expect(result).toContain("pages.rooms.ccImportCourse.fileSizeExceeded");
		});

		it("does not emit import event when file exceeds size limit", async () => {
			const largeFile = createMockFile("large.imscc", 1610612736); // 1.5 GB
			const { wrapper, dialog } = getWrapper(largeFile);
			await flushPromises();

			dialog.vm.$emit("confirm");

			expect(wrapper.emitted("import")).toBeFalsy();
		});
	});
});
