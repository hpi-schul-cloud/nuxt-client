import TermsOfUseModule from "@/store/terms-of-use";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import SchoolsModule from "@/store/schools";
import { mockSchool } from "@@/tests/test-utils/mockObjects";
import { mount } from "@vue/test-utils";
import SchoolTermsFormDialog from "./SchoolTermsFormDialog.vue";
import { SCHOOLS_MODULE_KEY, TERMS_OF_USE_MODULE_KEY } from "@/utils/inject";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import type { Mocked } from "vitest";

describe("SchoolPolicyFormDialog", () => {
	let schoolsModule: Mocked<SchoolsModule>;
	let termsOfUseModule: Mocked<TermsOfUseModule>;

	const mockProps = {
		isOpen: true,
	};

	const setup = (
		getters: Partial<TermsOfUseModule> = {
			getTermsOfUse: null,
			getBusinessError: {
				statusCode: "",
				message: "",
			},
			getStatus: "completed",
		}
	) => {
		const el = document.createElement("div");
		el.setAttribute("data-app", "true");
		document.body.appendChild(el);

		schoolsModule = createModuleMocks(SchoolsModule, {
			getSchool: mockSchool,
		});

		termsOfUseModule = createModuleMocks(TermsOfUseModule, {
			...getters,
		});

		const wrapper = mount(SchoolTermsFormDialog, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[TERMS_OF_USE_MODULE_KEY.valueOf()]: termsOfUseModule,
					[SCHOOLS_MODULE_KEY.valueOf()]: schoolsModule,
				},
			},
			props: mockProps,
		});

		return wrapper;
	};

	describe("when form is not valid", () => {
		it("should disable submit button", () => {
			const wrapper = setup();

			expect(
				wrapper.findComponent('[data-testid="dialog-confirm"]').attributes()
					.disabled
			).toBeDefined();
		});

		it("should render warning icon", async () => {
			const wrapper = setup();
			const fileInput = wrapper.findComponent({ name: "v-file-input" });
			await fileInput.trigger("blur");

			expect(
				wrapper.findComponent('[data-testid="warning-icon"]').exists()
			).toBe(true);
		});
	});

	describe("when cancel button is clicked", () => {
		it("should emit 'close'", async () => {
			const wrapper = setup();

			await wrapper
				.findComponent('[data-testid="dialog-cancel"]')
				.trigger("click");
			expect(wrapper.emitted()).toHaveProperty("close");
		});
	});
});
