import PrivacyPolicyModule from "@/store/privacy-policy";
import { createModuleMocks } from "@/utils/mock-store-module";
import SchoolsModule from "@/store/schools";
import { mockSchool } from "@@/tests/test-utils/mockObjects";
import { mount, MountOptions, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import NotifierModule from "@/store/notifier";
import SchoolPolicyFormDialog from "./SchoolPolicyFormDialog.vue";
import Vue from "vue";
import {
	I18N_KEY,
	NOTIFIER_MODULE_KEY,
	PRIVACY_POLICY_MODULE_KEY,
	SCHOOLS_MODULE_KEY,
} from "@/utils/inject";
import { i18nMock } from "@@/tests/test-utils";

describe("SchoolPolicyFormDialog", () => {
	let notifierModule: jest.Mocked<NotifierModule>;
	let schoolsModule: jest.Mocked<SchoolsModule>;
	let privacyPolicyModule: jest.Mocked<PrivacyPolicyModule>;

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
		const el = document.createElement("div");
		el.setAttribute("data-app", "true");
		document.body.appendChild(el);

		schoolsModule = createModuleMocks(SchoolsModule, {
			getSchool: mockSchool,
		});

		privacyPolicyModule = createModuleMocks(PrivacyPolicyModule, {
			...getters,
		});

		notifierModule = createModuleMocks(NotifierModule);

		const wrapper: Wrapper<any> = mount(
			SchoolPolicyFormDialog as MountOptions<Vue>,
			{
				...createComponentMocks({
					i18n: true,
				}),
				provide: {
					[I18N_KEY.valueOf()]: i18nMock,
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
					[PRIVACY_POLICY_MODULE_KEY.valueOf()]: privacyPolicyModule,
					[SCHOOLS_MODULE_KEY.valueOf()]: schoolsModule,
				},
				propsData: mockProps,
			}
		);

		return wrapper;
	};

	describe("when form is not valid", () => {
		it("should disable submit button", () => {
			const wrapper = setup();

			expect(
				wrapper.find('[data-testid="dialog-confirm"]').attributes().disabled
			).toBeDefined();
		});

		it("should render warning icon", async () => {
			const wrapper = setup();
			wrapper.vm.isTouched = true;
			await Vue.nextTick();
			expect(wrapper.find('[data-testid="warning-icon"]').exists()).toBe(true);
		});
	});

	describe("when cancel button is clicked", () => {
		it("should emit 'close'", () => {
			const wrapper = setup();

			wrapper.find('[data-testid="dialog-cancel"]').trigger("click");
			expect(wrapper.emitted()).toHaveProperty("close");
		});
	});
});
