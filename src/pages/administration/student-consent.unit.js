import BaseInput from "@/components/base/BaseInput/BaseInput.vue";
import BaseLink from "@/components/base/BaseLink.vue";
import BaseModal from "@/components/base/BaseModal.vue";
import FilePathsModule from "@/store/filePaths";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { nextTick } from "vue";
import { createStore } from "vuex";
import ConsentPage from "./StudentConsent.page.vue";
import { createTestEnvStore } from "@@/tests/test-utils";
import { expectNotification } from "../../../tests/test-utils/index.js";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";

const mockData = [
	{
		_id: "60c220e2d03a60006502f272",
		consent: {
			parentConsents: [],
		},
		firstName: "Alwin",
		lastName: "Jandourek",
		email: "ajandourek8n@webs.com",
		birthday: null,
		consentStatus: "missing",
		classes: [],
		fullName: "Alwin Jandourek",
		password: "qwerty",
	},
	{
		_id: "60c220f4d03a60006502f500",
		consent: {
			parentConsents: [],
		},
		firstName: "Alysa",
		lastName: "Garrold",
		email: "agarroldhq@harvard.edu",
		birthday: "11.05.2008",
		consentStatus: "missing",
		classes: ["November"],
		fullName: "Alysa Garrold",
		password: "qwerty",
	},
];

const specificFilesMock = {
	privacy:
		"https://s3.hidrive.strato.com/cloud-instances/default/Onlineeinwilligung/Datenschutzerklaerung-Muster-Schulen-Onlineeinwilligung.pdf",
	termsOfUse:
		"https://s3.hidrive.strato.com/cloud-instances/default/Willkommensordner/Datenschutz/Nutzungsordnung_Schueler-innen.pdf",
	analogConsent:
		"https://s3.hidrive.strato.com/cloud-instances/default/Dokumente/Einwilligungserklaerung_analog.pdf",
};

const createMockStore = () => {
	const storeOptions = {
		modules: {
			bulkConsent: {
				namespaced: true,
				actions: {
					register: vi.fn(),
					updateStudent: vi.fn(),
					setStudents: vi.fn(),
					findConsentUsers: vi.fn(),
				},
				getters: {
					getSelectedStudentsData: () => mockData,
					getSelectedStudents: () => [
						"60c220e2d03a60006502f272",
						"60c220f4d03a60006502f500",
					],
				},

				mutations: {
					setSelectedStudents: vi.fn(),
					setRegisteredStudents: vi.fn(),
					setStudentsData: vi.fn(),
					updateStudentData: vi.fn(),
					setRegisterError: vi.fn(),
				},
			},
			filePaths: {
				namespaced: true,
				getters: {
					getSpecificFiles: () => specificFilesMock,
				},
			},
		},
	};

	const mockStore = createStore(storeOptions);
	const bulkConsentActionsStubs = storeOptions.modules.bulkConsent.actions;

	return { mockStore, bulkConsentActionsStubs };
};

const setup = () => {
	const { mockStore, bulkConsentActionsStubs } = createMockStore();
	const wrapper = mount(ConsentPage, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
			mocks: {
				$store: mockStore,
				$t: (key) => key,
			},
			components: {
				"base-input": BaseInput,
				"base-link": BaseLink,
				"base-modal": BaseModal,
			},
		},
	});
	return { wrapper, bulkConsentActionsStubs };
};

describe("students/consent", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
		createTestEnvStore();
		setupStores({
			filePathsModule: FilePathsModule,
		});
	});

	afterEach(() => {
		mockData[0].birthday = null;
	});

	it("should dispatch the users findConsentUsers action on load", () => {
		const { bulkConsentActionsStubs } = setup();

		expect(bulkConsentActionsStubs.findConsentUsers).toHaveBeenCalled();
	});

	it("should display StepProgress component", () => {
		const { wrapper } = setup();

		const item = wrapper.findComponent(`[data-testid="step_progress"]`);
		expect(item.exists()).toBe(true);
		expect(item.props().currentStep).toBe(0);
	});

	it("should display the same number of elements as in the mockData object", async () => {
		const { wrapper } = setup();

		const table = wrapper.findComponent(`[data-testid="consent_table_1"]`);
		await nextTick();
		await nextTick();
		expect(table.vm.data).toHaveLength(mockData.length);
	});

	it("should have the data props same as mockData", async () => {
		const { wrapper } = setup();

		const table = wrapper.findComponent(`[data-testid="consent_table_1"]`);
		await nextTick();
		await nextTick();
		expect(table.props().data).toStrictEqual(mockData);
	});

	it("should call inputPass method when password input element's value change", async () => {
		const { wrapper, bulkConsentActionsStubs } = setup();

		await nextTick();
		await nextTick();
		const input = wrapper.find(`[data-testid="password-input"]`).get("input");
		input.setValue("abc");
		await input.trigger("change");

		expect(input.exists()).toBe(true);
		expect(bulkConsentActionsStubs.updateStudent).toHaveBeenCalled();
	});

	it("should call inputDate method when birthday input element's value change", async () => {
		const { wrapper, bulkConsentActionsStubs } = setup();

		await nextTick();
		await nextTick();
		const input = wrapper.find(`[data-testid="birthday-input"]`).get("input");
		input.setValue("2017-10-10");
		await input.trigger("change");

		expect(input.exists()).toBe(true);
		expect(bulkConsentActionsStubs.updateStudent).toHaveBeenCalled();
	});

	it("should appear the validation error if birthdayWarning is set to true", async () => {
		const { wrapper } = setup();

		await nextTick();
		await nextTick();
		wrapper.setData({ birthdayWarning: true });

		const nextButton = wrapper.find(`[data-testid="button-next"]`);

		await nextButton.trigger("click");

		const inputValidationText = wrapper.find(`[data-testid="error-text"]`);
		expect(inputValidationText.exists()).toBe(true);
	});

	it("next button 'click' event should set 'currentStep' value to '1' ", async () => {
		const { wrapper } = setup();

		mockData[0].birthday = "10.10.2010";

		const progress = wrapper.findComponent(`[data-testid="step_progress"]`);
		const nextButton = wrapper.find(`[data-testid="button-next"]`);

		await nextButton.trigger("click");

		expect(progress.props().currentStep).toBe(1);
	});

	it("second-step-table should appear after next button clicked", async () => {
		const { wrapper } = setup();

		await nextTick();
		await nextTick();
		mockData[0].birthday = "10.10.2010";
		const nextButton = wrapper.find(`[data-testid="button-next"]`);

		await nextButton.trigger("click");

		const table = wrapper.find(`[data-testid="consent_table_2"]`);
		expect(table.exists()).toBe(true);
	});

	it("second-step-table shouldn’t appear if data is not completed", async () => {
		const { wrapper } = setup();

		await nextTick();
		await nextTick();
		const nextButton = wrapper.find(`[data-testid="button-next"]`);

		nextButton.trigger("click");
		await nextTick();

		const table = wrapper.find(`[data-testid="consent_table_2"]`);
		expect(table.exists()).toBe(false);
	});

	it("confirm consent form should appear if consent is required", async () => {
		createTestEnvStore({ FEATURE_CONSENT_NECESSARY: true });
		const { wrapper } = setup();

		mockData[0].birthday = "10.10.2010";
		const nextButton = wrapper.find(`[data-testid="button-next"]`);

		await nextButton.trigger("click");

		const confirmForm = wrapper.find(`[data-testid="check-confirm"]`);
		expect(confirmForm.exists()).toBe(true);
	});

	it("confirm consent form shouldn't appear if consent is not required", async () => {
		createTestEnvStore({ FEATURE_CONSENT_NECESSARY: false });
		const { wrapper } = setup();

		mockData[0].birthday = "10.10.2010";
		const nextButton = wrapper.find(`[data-testid="button-next"]`);

		await nextButton.trigger("click");

		const confirmForm = wrapper.find(`[data-testid="check-confirm"]`);
		expect(confirmForm.exists()).toBe(false);
	});

	it("should not progress next step if checkBox is not checked and consent is required", async () => {
		createTestEnvStore({ FEATURE_CONSENT_NECESSARY: true });

		const { wrapper } = setup();

		mockData[0].birthday = "10.10.2010";
		const nextButton = wrapper.find(`[data-testid="button-next"]`);

		await nextButton.trigger("click");

		const nextButton2 = wrapper.find(`[data-testid="button-next-2"]`);

		await nextButton2.trigger("click");

		const confirmError = wrapper.find(`[data-testid="confirm-error"]`);
		expect(confirmError.exists()).toBe(true);
	});

	it("should progress next step if consent is not required", async () => {
		createTestEnvStore({ FEATURE_CONSENT_NECESSARY: false });

		const { wrapper } = setup();

		mockData[0].birthday = "10.10.2010";
		const nextButton = wrapper.find(`[data-testid="button-next"]`);

		await nextButton.trigger("click");

		const nextButton2 = wrapper.find(`[data-testid="button-next-2"]`);

		await nextButton2.trigger("click");

		expectNotification("success");
	});
});
