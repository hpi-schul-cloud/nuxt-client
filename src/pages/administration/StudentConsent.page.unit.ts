import ConsentPage from "./StudentConsent.page.vue";
import BackendDataTable from "@/components/administration/BackendDataTable.vue";
import StepProgress from "@/components/administration/StepProgress.vue";
import FilePathsModule from "@/store/filePaths";
import { createTestEnvStore, expectNotification } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { ConsentStudent, useBulkConsent } from "@data-users";
import { createTestingPinia } from "@pinia/testing";
import { DatePicker } from "@ui-date-time-picker";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { nextTick, Ref, ref } from "vue";

vi.mock("@data-users/bulk-consent.composable");
const mockedUseBulkConsent = vi.mocked(useBulkConsent);

vi.mock("vue-i18n", async (importOriginal) => {
	const actual = await importOriginal<typeof import("vue-i18n")>();
	return {
		...actual,
		useI18n: vi.fn().mockReturnValue({ t: (key: string) => key }),
	};
});

const createMockData = () =>
	[
		{
			_id: "60c220e2d03a60006502f272",
			consent: {
				parentConsents: [],
				userConsent: {},
			},
			firstName: "Alwin",
			lastName: "Jandourek",
			email: "ajandourek8n@webs.com",
			birthday: "",
			consentStatus: "missing",
			classes: [],
			fullName: "Alwin Jandourek",
			password: "qwerty",
		},
		{
			_id: "60c220f4d03a60006502f500",
			consent: {
				parentConsents: [],
				userConsent: {},
			},
			firstName: "Alysa",
			lastName: "Garrold",
			email: "agarroldhq@harvard.edu",
			birthday: "11.05.2008",
			consentStatus: "missing",
			classes: [],
			fullName: "Alysa Garrold",
			password: "qwerty",
		},
	] as unknown as ConsentStudent[];

describe("students/consent", () => {
	let mockData: ConsentStudent[];
	let selectedStudentsData: Ref<ConsentStudent[]>;
	let bulkConsentMock: ReturnType<typeof useBulkConsent>;

	const setup = () => {
		selectedStudentsData = ref([...mockData]);
		const selectedIds = ref(["60c220e2d03a60006502f272", "60c220f4d03a60006502f500"]);
		const registeredStudents = ref<string[]>([]);

		bulkConsentMock = {
			selectedStudentsData,
			selectedIds,
			registeredStudents,
			findConsentUsers: vi.fn(),
			register: vi.fn(),
			updateStudent: vi.fn(),
		};
		mockedUseBulkConsent.mockReturnValue(bulkConsentMock);

		const wrapper = mount(ConsentPage, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: {
					DatePicker: true,
				},
			},
		});
		return { wrapper, bulkConsentMock };
	};

	beforeEach(() => {
		mockData = createMockData();
		setActivePinia(createTestingPinia());
		createTestEnvStore();
		setupStores({
			filePathsModule: FilePathsModule,
		});
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should dispatch the users findConsentUsers action on load", () => {
		const { bulkConsentMock } = setup();

		expect(bulkConsentMock.findConsentUsers).toHaveBeenCalled();
	});

	it("should display StepProgress component", () => {
		const { wrapper } = setup();

		const item = wrapper.findComponent(StepProgress);
		expect(item.exists()).toBe(true);
		expect(item.props().currentStep).toBe(0);
	});

	it("should display the same number of elements as in the mockData object", async () => {
		const { wrapper } = setup();

		const table = wrapper.findComponent(BackendDataTable);
		await nextTick();
		await nextTick();
		expect(table.props().data).toHaveLength(mockData.length);
	});

	it("should have the data props same as mockData", async () => {
		const { wrapper } = setup();

		const table = wrapper.findComponent(BackendDataTable);
		await nextTick();
		await nextTick();
		expect(table.props().data).toStrictEqual(mockData);
	});

	it("should call updateStudent method when password input element's value change", async () => {
		const { wrapper, bulkConsentMock } = setup();

		await nextTick();
		await nextTick();
		const input = wrapper.find(`[data-testid="password-input"]`).get("input");
		input.setValue("abc");
		await input.trigger("change");

		expect(bulkConsentMock.updateStudent).toHaveBeenCalled();
	});

	it("should call updateStudent method when birthday input element's value change", async () => {
		const { wrapper, bulkConsentMock } = setup();

		await nextTick();
		await nextTick();
		const datePicker = wrapper.findComponent(DatePicker);
		datePicker.vm.$emit("update:date", "2017-10-10");
		await nextTick();

		expect(bulkConsentMock.updateStudent).toHaveBeenCalled();
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
		mockData[0].birthday = "10.10.2010";
		const { wrapper } = setup();

		const progress = wrapper.findComponent(StepProgress);
		const nextButton = wrapper.find(`[data-testid="button-next"]`);

		await nextButton.trigger("click");

		expect(progress.props().currentStep).toBe(1);
	});

	it("second-step-table should appear after next button clicked", async () => {
		mockData[0].birthday = "10.10.2010";
		const { wrapper } = setup();

		await nextTick();
		await nextTick();
		const nextButton = wrapper.find(`[data-testid="button-next"]`);

		await nextButton.trigger("click");

		const table = wrapper.find(`[data-testid="consent_table_2"]`);
		expect(table.exists()).toBe(true);
	});

	it("second-step-table shouldn't appear if data is not completed", async () => {
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
		mockData[0].birthday = "10.10.2010";
		const { wrapper } = setup();

		const nextButton = wrapper.find(`[data-testid="button-next"]`);

		await nextButton.trigger("click");

		const confirmForm = wrapper.find(`[data-testid="check-confirm"]`);
		expect(confirmForm.exists()).toBe(true);
	});

	it("confirm consent form shouldn't appear if consent is not required", async () => {
		createTestEnvStore({ FEATURE_CONSENT_NECESSARY: false });
		mockData[0].birthday = "10.10.2010";
		const { wrapper } = setup();

		const nextButton = wrapper.find(`[data-testid="button-next"]`);

		await nextButton.trigger("click");

		const confirmForm = wrapper.find(`[data-testid="check-confirm"]`);
		expect(confirmForm.exists()).toBe(false);
	});

	it("should not progress next step if checkBox is not checked and consent is required", async () => {
		createTestEnvStore({ FEATURE_CONSENT_NECESSARY: true });
		mockData[0].birthday = "10.10.2010";

		const { wrapper } = setup();

		const nextButton = wrapper.find(`[data-testid="button-next"]`);

		await nextButton.trigger("click");

		const nextButton2 = wrapper.find(`[data-testid="button-next-2"]`);

		await nextButton2.trigger("click");

		const confirmError = wrapper.find(`[data-testid="confirm-error"]`);
		expect(confirmError.exists()).toBe(true);
	});

	it("should progress next step if consent is not required", async () => {
		createTestEnvStore({ FEATURE_CONSENT_NECESSARY: false });
		mockData[0].birthday = "10.10.2010";

		const { wrapper } = setup();

		const nextButton = wrapper.find(`[data-testid="button-next"]`);

		await nextButton.trigger("click");

		const nextButton2 = wrapper.find(`[data-testid="button-next-2"]`);

		await nextButton2.trigger("click");

		expectNotification("success");
	});
});
