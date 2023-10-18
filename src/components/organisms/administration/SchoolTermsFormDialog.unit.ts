import TermsOfUseModule from "@/store/terms-of-use";
import { createModuleMocks } from "@/utils/mock-store-module";
import SchoolsModule from "@/store/schools";
import { mockSchool } from "@@/tests/test-utils/mockObjects";
import { mount, MountOptions, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import NotifierModule from "@/store/notifier";
import SchoolTermsFormDialog from "./SchoolTermsFormDialog.vue";
import Vue from "vue";
import {
	I18N_KEY,
	NOTIFIER_MODULE_KEY,
	SCHOOLS_MODULE_KEY,
	TERMS_OF_USE_MODULE_KEY,
} from "@/utils/inject";
import { i18nMock } from "@@/tests/test-utils";

describe("SchoolPolicyFormDialog", () => {
	let notifierModule: jest.Mocked<NotifierModule>;
	let schoolsModule: jest.Mocked<SchoolsModule>;
	let termsOfUseModule: jest.Mocked<TermsOfUseModule>;

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

		notifierModule = createModuleMocks(NotifierModule);

		const wrapper: Wrapper<any> = mount(
			SchoolTermsFormDialog as MountOptions<Vue>,
			{
				...createComponentMocks({
					i18n: true,
				}),
				provide: {
					[I18N_KEY.valueOf()]: i18nMock,
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
					[TERMS_OF_USE_MODULE_KEY.valueOf()]: termsOfUseModule,
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
