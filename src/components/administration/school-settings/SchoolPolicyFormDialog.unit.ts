import SchoolPolicyFormDialog from "./SchoolPolicyFormDialog.vue";
import SchoolsModule from "@/store/schools";
import { SCHOOLS_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { mockSchool } from "@@/tests/test-utils/mockObjects";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { createTestingPinia } from "@pinia/testing";
import { SvsDialog } from "@ui-dialog";
import { flushPromises, mount } from "@vue/test-utils";
import type { Mocked } from "vitest";
import { VFileInput } from "vuetify/components";

vi.mock("@/utils/fileHelper", () => ({ toBase64: vi.fn().mockResolvedValue("data:application/pdf;base64,AAA") }));
describe("SchoolPolicyFormDialog", () => {
	let schoolsModule: Mocked<SchoolsModule>;

	const setup = () => {
		schoolsModule = createModuleMocks(SchoolsModule, {
			getSchool: mockSchool,
		});

		const wrapper = mount(SchoolPolicyFormDialog, {
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

	const triggerValidFileInput = async (wrapper: ReturnType<typeof setup>["wrapper"]) => {
		const file = new File(["dummy"], "FileName.pdf", {
			type: "application/pdf",
		});
		const fileInput = wrapper.findComponent(VFileInput);

		await fileInput.setValue(file);
		await fileInput.trigger("blur");
	};

	describe("when form is not valid", () => {
		it("should not emit 'close'", () => {
			const { wrapper } = setup();

			expect(wrapper.emitted()).not.toHaveProperty("close");
		});
	});

	describe("when form is valid", () => {
		it("should enable submit button", async () => {
			const { wrapper } = setup();

			await triggerValidFileInput(wrapper);

			const dialog = wrapper.findComponent(SvsDialog);
			expect(dialog.props().confirmBtnDisabled).toBe(false);
		});

		describe("when confirm button is clicked", () => {
			it("should emit 'confirm' with new consent version and emit 'close'", async () => {
				const { wrapper } = setup();

				await triggerValidFileInput(wrapper);

				const dialog = wrapper.findComponent(SvsDialog);
				dialog.vm.$emit("confirm");
				await flushPromises();

				const confirmEvent = wrapper.emitted("confirm");
				expect(confirmEvent).toHaveLength(1);
				expect(confirmEvent).toEqual([
					[
						{
							schoolId: mockSchool.id,
							title: "pages.administration.school.index.schoolPolicy.fileName",
							consentText: "",
							consentTypes: ["privacy"],
							publishedAt: expect.any(String),
							consentData: "data:application/pdf;base64,AAA",
						},
					],
				]);
				expect(wrapper.emitted()).toHaveProperty("close");
			});
		});
	});

	describe("when cancel button is clicked", () => {
		it("should emit 'close'", async () => {
			const { wrapper } = setup();

			const dialog = wrapper.findComponent(SvsDialog);
			dialog.vm.$emit("cancel");

			expect(wrapper.emitted()).toHaveProperty("close");
		});
	});
});
