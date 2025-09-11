import PrivacyPolicyModule from "@/store/privacy-policy";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import SchoolsModule from "@/store/schools";
import { mockSchool } from "@@/tests/test-utils/mockObjects";
import { mount } from "@vue/test-utils";
import NotifierModule from "@/store/notifier";
import SchoolPolicyFormDialog from "./SchoolPolicyFormDialog.vue";
import {
	NOTIFIER_MODULE_KEY,
	PRIVACY_POLICY_MODULE_KEY,
	SCHOOLS_MODULE_KEY,
} from "@/utils/inject";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import type { Mocked } from "vitest";

describe("SchoolPolicyFormDialog", () => {
	let notifierModule: Mocked<NotifierModule>;
	let schoolsModule: Mocked<SchoolsModule>;
	let privacyPolicyModule: Mocked<PrivacyPolicyModule>;

	const mockProps = {
		isOpen: true,
	};

	const setup = (
		getters: Partial<PrivacyPolicyModule> = {
			getPrivacyPolicy: null,
			getBusinessError: {
				statusCode: "",
				message: "",
			},
			getStatus: "completed",
		}
	) => {
		schoolsModule = createModuleMocks(SchoolsModule, {
			getSchool: mockSchool,
		});

		privacyPolicyModule = createModuleMocks(PrivacyPolicyModule, {
			...getters,
		});

		notifierModule = createModuleMocks(NotifierModule);

		const wrapper = mount(SchoolPolicyFormDialog, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
					[PRIVACY_POLICY_MODULE_KEY.valueOf()]: privacyPolicyModule,
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
		it("should emit 'close'", () => {
			const wrapper = setup();

			wrapper.findComponent('[data-testid="dialog-cancel"]').trigger("click");
			expect(wrapper.emitted()).toHaveProperty("close");
		});
	});
});
