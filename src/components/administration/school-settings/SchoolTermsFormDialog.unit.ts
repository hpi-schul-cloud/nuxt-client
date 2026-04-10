import SchoolTermsFormDialog from "./SchoolTermsFormDialog.vue";
import SchoolsModule from "@/store/schools";
import { SCHOOLS_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { mockSchool } from "@@/tests/test-utils/mockObjects";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { SvsDialog } from "@ui-dialog";
import { flushPromises, mount, VueWrapper } from "@vue/test-utils";
import type { Mocked } from "vitest";
import { VFileInput } from "vuetify/components";

vi.mock("@/utils/fileHelper", () => ({ toBase64: vi.fn().mockResolvedValue("data:application/pdf;base64,AAA") }));
describe("SchoolTermsFormDialog", () => {
	let schoolsModule: Mocked<SchoolsModule>;

	const setup = () => {
		schoolsModule = createModuleMocks(SchoolsModule, {
			getSchool: mockSchool,
		});

		const wrapper = mount(SchoolTermsFormDialog, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n(), createTestingPinia()],
				provide: {
					[SCHOOLS_MODULE_KEY.valueOf()]: schoolsModule,
				},
			},
			props: { isOpen: true },
		});

		return { wrapper };
	};

	const triggerValidFileInput = async (wrapper: VueWrapper) => {
		const file = new File(["dummy"], "FileName.pdf", {
			type: "application/pdf",
		});
		const fileInput = wrapper.findComponent(VFileInput);

		await fileInput.setValue(file);
		await fileInput.trigger("blur");
	};

	const triggerConfirm = async (wrapper: VueWrapper) => {
		const dialog = wrapper.findComponent(SvsDialog);
		dialog.vm.$emit("confirm");
		await flushPromises();
	};

	describe("when form is not valid", () => {
		it("should not emit 'close'", () => {
			const { wrapper } = setup();

			expect(wrapper.emitted()).not.toHaveProperty("close");
		});

		it("should focus input file input", async () => {
			const { wrapper } = setup();
			const fileInput = wrapper.findComponent(VFileInput);
			const input = fileInput.find("input").element;

			await triggerConfirm(wrapper);

			expect(document.activeElement).toEqual(input);
		});
	});

	describe("file input validation", () => {
		it("should show error message when no file is uploaded", async () => {
			const { wrapper } = setup();
			const fileInput = wrapper.findComponent(VFileInput);

			await triggerConfirm(wrapper);

			expect(fileInput.text()).toContain("common.validation.file");
		});

		it("should show error message when file is not a PDF", async () => {
			const { wrapper } = setup();
			const file = new File(["dummy"], "FileName.txt", {
				type: "text/plain",
			});
			const fileInput = wrapper.findComponent(VFileInput);

			await fileInput.setValue(file);
			await fileInput.trigger("blur");

			expect(fileInput.text()).toContain("pages.administration.school.index.termsOfUse.validation.notPdf");
		});

		it("should show error message when file exceeds size limit", async () => {
			const { wrapper } = setup();
			const fileWithInvalidSize = new File([new Uint8Array(5000000)], "FileName.pdf", { type: "application/pdf" });
			const fileInput = wrapper.findComponent(VFileInput);

			await fileInput.setValue(fileWithInvalidSize);
			await fileInput.trigger("blur");

			expect(fileInput.text()).toContain("pages.administration.school.index.termsOfUse.validation.fileTooBig");
		});
	});

	describe("when form is valid", () => {
		describe("when confirm button is clicked", () => {
			it("should emit 'confirm' with new consent version and emit 'close'", async () => {
				const { wrapper } = setup();

				await triggerValidFileInput(wrapper);
				await triggerConfirm(wrapper);

				const confirmEvent = wrapper.emitted("confirm");
				expect(confirmEvent).toHaveLength(1);
				expect(confirmEvent).toEqual([
					[
						{
							schoolId: mockSchool.id,
							title: "pages.administration.school.index.termsOfUse.fileName",
							consentText: "",
							consentTypes: ["termsOfUse"],
							publishedAt: expect.any(String),
							consentData: "data:application/pdf;base64,AAA",
						},
					],
				]);
				expect(wrapper.emitted()).toHaveProperty("close");
			});

			it("should clear file input after successful submission", async () => {
				const { wrapper } = setup();
				const fileInput = wrapper.findComponent(VFileInput);

				await triggerValidFileInput(wrapper);
				await triggerConfirm(wrapper);

				expect(fileInput.props("modelValue")).toBeNull();
			});
		});
	});

	describe("when cancel button is clicked", () => {
		it("should emit 'close'", async () => {
			const { wrapper } = setup();

			const dialog = wrapper.findComponent(SvsDialog);
			dialog.vm.$emit("cancel");
			await flushPromises();

			expect(wrapper.emitted()).toHaveProperty("close");
		});

		it("should clear file input", async () => {
			const { wrapper } = setup();
			const fileInput = wrapper.findComponent(VFileInput);

			await triggerValidFileInput(wrapper);

			const dialog = wrapper.findComponent(SvsDialog);
			dialog.vm.$emit("cancel");
			await flushPromises();

			expect(fileInput.props("modelValue")).toBeNull();
		});
	});
});
