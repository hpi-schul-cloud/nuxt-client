import { default as ConsentPage } from "./consent.vue";
// import mock$objects from "../../../../tests/test-utils/pageStubs";

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
	privacyExemplary:
		"https://s3.hidrive.strato.com/schul-cloud-hpi/default/Onlineeinwilligung/Datenschutzerklaerung-Muster-Schulen-Onlineeinwilligung.pdf",
	privacy:
		"https://s3.hidrive.strato.com/schul-cloud-hpi/default/Onlineeinwilligung/Datenschutzerklaerung-Onlineeinwilligung.pdf",
	termsOfUseExemplary:
		"https://s3.hidrive.strato.com/schul-cloud-hpi/default/Onlineeinwilligung/Nutzungsordnung-HPI-Schule-Schueler-Onlineeinwilligung.pdf",
	termsOfUse:
		"https://s3.hidrive.strato.com/schul-cloud-hpi/default/Onlineeinwilligung/Nutzungsordnung-Onlineeinwilligung.pdf",
	termsOfUseSchool:
		"https://s3.hidrive.strato.com/schul-cloud-hpi/default/Willkommensordner/Datenschutz/Nutzungsordnung-HPI-Schule-Schueler.pdf",
	analogConsent:
		"https://s3.hidrive.strato.com/schul-cloud-hpi/default/Dokumente/Einwilligungserklaerung_analog.pdf",
};

describe("students/consent", () => {
	let mockStore;

	beforeEach(() => {
		mockStore = {
			bulkConsent: {
				actions: {
					register: jest.fn(),
					updateStudent: jest.fn(),
					setStudents: jest.fn(),
				},
				getters: {
					students: () => mockData,
				},
				state: () => ({
					list: mockData,
					selectedStudentsData: mockData,
					selectedStudents: [
						"60c220e2d03a60006502f272",
						"60c220f4d03a60006502f500",
					],
				}),

				mutations: {
					setSelectedStudents: jest.fn(),
					setRegisteredStudents: jest.fn(),
					setStudentsData: jest.fn(),
					updateStudentData: jest.fn(),
					setRegisterError: jest.fn(),
				},
			},
			users: {
				actions: {
					findConsentUsers: jest.fn(),
				},
				getters: {
					getConsentList: jest.fn(),
				},
			},
			filePaths: {
				getters: {
					getSpecificFiles: () => specificFilesMock,
				},
			},
		};
	});

	afterEach(() => {
		mockData[0].birthday = null;
	});

	it(...isValidComponent(ConsentPage));

	it("should dispatch the users findConsentUsers action on load", async () => {
		mount(ConsentPage, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
			}),
		});

		expect(mockStore.users.actions.findConsentUsers).toHaveBeenCalled();
	});

	it("should display StepProgress component", async () => {
		const wrapper = mount(ConsentPage, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
			}),
		});

		const item = wrapper.find(`[data-testid="step_progress"]`);
		expect(item.exists()).toBe(true);
		expect(item.props().currentStep).toBe(0);
	});

	it("should display the same number of elements as in the mockData object", async () => {
		const wrapper = mount(ConsentPage, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
			}),
		});

		const table = wrapper.find(`[data-testid="consent_table_1"]`);
		expect(table.vm.data).toHaveLength(mockData.length);
	});

	it("should have the data props same as mockData", async () => {
		const wrapper = mount(ConsentPage, {
			...createComponentMocks({
				store: mockStore,
				i18n: true,
			}),
		});

		const table = wrapper.find(`[data-testid="consent_table_1"]`);
		expect(table.props().data).toBe(mockData);
	});

	it("should call inputPass method when password input element's value change", async () => {
		const wrapper = mount(ConsentPage, {
			...createComponentMocks({
				store: mockStore,
				i18n: true,
			}),
		});

		const input = wrapper.find(`input[data-testid="password-input"]`);
		input.setValue("abc");
		input.trigger("change");

		expect(input.exists()).toBe(true);
		expect(mockStore.bulkConsent.actions.updateStudent).toHaveBeenCalled();
	});

	it("should call inputDate method when birthday input element's value change", async () => {
		const wrapper = mount(ConsentPage, {
			...createComponentMocks({
				store: mockStore,
				i18n: true,
			}),
		});

		const input = wrapper.find(`input[data-testid="birthday-input"]`);
		input.setValue("2017-10-10");
		input.trigger("change");

		expect(input.exists()).toBe(true);
		expect(mockStore.bulkConsent.actions.updateStudent).toHaveBeenCalled();
	});

	it("should appear the validation error if birthdayWarning is set to true", async () => {
		const wrapper = mount(ConsentPage, {
			...createComponentMocks({
				store: mockStore,
				i18n: true,
			}),
		});

		wrapper.setData({ birthdayWarning: true });

		const nextButton = wrapper.find(`[data-testid="button-next"]`);

		nextButton.trigger("click");
		await wrapper.vm.$nextTick();

		const inputValidationText = wrapper.find(`[data-testid="error-text"]`);
		expect(inputValidationText.exists()).toBe(true);
	});

	it("next button 'click' event should set 'currentStep' value to '1' ", async () => {
		const wrapper = mount(ConsentPage, {
			...createComponentMocks({
				store: mockStore,
				i18n: true,
			}),
		});

		mockData[0].birthday = "10.10.2010";

		const progress = wrapper.find(`[data-testid="step_progress"]`);
		const nextButton = wrapper.find(`[data-testid="button-next"]`);

		nextButton.trigger("click");
		await wrapper.vm.$nextTick();

		expect(progress.props().currentStep).toBe(1);
	});

	it("second-step-table should appear after next button clicked", async () => {
		const wrapper = mount(ConsentPage, {
			...createComponentMocks({
				store: mockStore,
				i18n: true,
			}),
		});

		mockData[0].birthday = "10.10.2010";
		const nextButton = wrapper.find(`[data-testid="button-next"]`);

		nextButton.trigger("click");
		await wrapper.vm.$nextTick();

		const table = wrapper.find(`[data-testid="consent_table_2"]`);
		expect(table.exists()).toBe(true);
	});

	it("second-step-table shouldn’t appear if data is not completed", async () => {
		const wrapper = mount(ConsentPage, {
			...createComponentMocks({
				store: mockStore,
				i18n: true,
			}),
		});

		const nextButton = wrapper.find(`[data-testid="button-next"]`);

		nextButton.trigger("click");
		await wrapper.vm.$nextTick();

		const table = wrapper.find(`[data-testid="consent_table_2"]`);
		expect(table.exists()).toBe(false);
	});

	it("should not progress next step if checkBox is not checked", async () => {
		const wrapper = mount(ConsentPage, {
			...createComponentMocks({
				store: mockStore,
				i18n: true,
			}),
		});

		mockData[0].birthday = "10.10.2010";
		const nextButton = wrapper.find(`[data-testid="button-next"]`);

		nextButton.trigger("click");
		await wrapper.vm.$nextTick();

		const nextButton_2 = wrapper.find(`[data-testid="button-next-2"]`);

		nextButton_2.trigger("click");
		await wrapper.vm.$nextTick();

		const confirmError = wrapper.find(`[data-testid="confirm-error"]`);
		expect(confirmError.exists()).toBe(true);
	});
});
