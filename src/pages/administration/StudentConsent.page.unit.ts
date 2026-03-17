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

const mockRouter = {
	push: vi.fn(),
};

vi.mock("vue-router", () => ({
	useRouter: () => mockRouter,
}));

const TEST_PASSWORD = "test-fixture-password";

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
			password: TEST_PASSWORD,
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
			password: TEST_PASSWORD,
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

		expect(table.props().data).toHaveLength(mockData.length);
	});

	it("should have the data props same as mockData", async () => {
		const { wrapper } = setup();

		const table = wrapper.findComponent(BackendDataTable);
		await nextTick();

		expect(table.props().data).toStrictEqual(mockData);
	});

	it("should call updateStudent method when password input element's value change", async () => {
		const { wrapper, bulkConsentMock } = setup();

		await nextTick();
		const input = wrapper.find(`[data-testid="password-input"]`).get("input");
		input.setValue("abc");
		await input.trigger("change");

		expect(bulkConsentMock.updateStudent).toHaveBeenCalled();
	});

	it("should call updateStudent method when birthday input element's value change", async () => {
		const { wrapper, bulkConsentMock } = setup();

		await nextTick();
		const datePicker = wrapper.findComponent(DatePicker);
		datePicker.vm.$emit("update:date", "2017-10-10");

		expect(bulkConsentMock.updateStudent).toHaveBeenCalled();
	});

	it("should appear the validation error if birthdayWarning is set to true", async () => {
		const { wrapper } = setup();

		await nextTick();
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

		const nextButton = wrapper.find(`[data-testid="button-next"]`);
		await nextButton.trigger("click");

		const table = wrapper.find(`[data-testid="consent_table_2"]`);
		expect(table.exists()).toBe(true);
	});

	it("second-step-table shouldn't appear if data is not completed", async () => {
		const { wrapper } = setup();

		await nextTick();
		const nextButton = wrapper.find(`[data-testid="button-next"]`);
		await nextButton.trigger("click");

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

	it("should call register with consent checkbox checked when consent is required", async () => {
		createTestEnvStore({ FEATURE_CONSENT_NECESSARY: true });
		mockData[0].birthday = "10.10.2010";

		const { wrapper, bulkConsentMock } = setup();

		const nextButton = wrapper.find(`[data-testid="button-next"]`);
		await nextButton.trigger("click");

		const checkbox = wrapper.find(`[data-testid="check-confirm"] input`);
		await checkbox.setValue(true);

		const nextButton2 = wrapper.find(`[data-testid="button-next-2"]`);
		await nextButton2.trigger("click");

		expect(bulkConsentMock.register).toHaveBeenCalled();
		expectNotification("success");
	});

	describe("sorting", () => {
		it("should call onUpdateSort when table emits sort event", async () => {
			const { wrapper, bulkConsentMock } = setup();

			const table = wrapper.findComponent(BackendDataTable);
			await table.vm.$emit("update:sort", "email", "desc");

			expect(bulkConsentMock.findConsentUsers).toHaveBeenCalled();
		});

		it("should convert fullName to firstName when sorting", async () => {
			const { wrapper, bulkConsentMock } = setup();

			const table = wrapper.findComponent(BackendDataTable);
			await table.vm.$emit("update:sort", "fullName", "asc");

			expect(bulkConsentMock.findConsentUsers).toHaveBeenCalledWith(
				expect.objectContaining({
					$sort: { firstName: 1 },
				})
			);
		});
	});

	describe("download step", () => {
		it("should display download step (step 3) after registration", async () => {
			createTestEnvStore({ FEATURE_CONSENT_NECESSARY: false });
			mockData[0].birthday = "10.10.2010";

			const { wrapper } = setup();

			const nextButton = wrapper.find(`[data-testid="button-next"]`);
			await nextButton.trigger("click");

			const nextButton2 = wrapper.find(`[data-testid="button-next-2"]`);
			await nextButton2.trigger("click");

			const table = wrapper.find(`[data-testid="consent_table_3"]`);
			expect(table.exists()).toBe(true);
		});
	});

	describe("cancel modal", () => {
		it("should show cancel warning modal when cancel button is clicked", async () => {
			const { wrapper } = setup();

			const buttons = wrapper.findAll("button");
			const cancelButton = buttons.find((btn) => btn.text().includes("cancel"));
			expect(cancelButton).toBeDefined();
			if (cancelButton) {
				await cancelButton.trigger("click");
			}

			const dialog = wrapper.findComponent({ name: "SvsDialog" });
			expect(dialog.props().modelValue).toBe(true);
		});

		it("should navigate to students page when cancel is confirmed", async () => {
			const { wrapper } = setup();

			const buttons = wrapper.findAll("button");
			const cancelButton = buttons.find((btn) => btn.text().includes("cancel"));
			if (cancelButton) {
				await cancelButton.trigger("click");
			}

			const confirmBtn = wrapper.findComponent({ name: "SvsDialogBtnConfirm" });
			await confirmBtn.vm.$emit("click");

			expect(mockRouter.push).toHaveBeenCalledWith({
				path: "/administration/students",
			});
		});
	});

	describe("success step", () => {
		it("should display success step after download", async () => {
			createTestEnvStore({ FEATURE_CONSENT_NECESSARY: false });
			mockData[0].birthday = "10.10.2010";

			const { wrapper } = setup();

			const mockWinPrint = {
				document: {
					write: vi.fn(),
					close: vi.fn(),
				},
				focus: vi.fn(),
				print: vi.fn(),
				close: vi.fn(),
			};
			vi.spyOn(window, "open").mockReturnValue(mockWinPrint as unknown as Window);

			await wrapper.find(`[data-testid="button-next"]`).trigger("click");
			await wrapper.find(`[data-testid="button-next-2"]`).trigger("click");

			const buttons = wrapper.findAll("button");
			const downloadBtn = buttons.find((btn) => btn.text().includes("download"));
			if (downloadBtn) {
				await downloadBtn.trigger("click");
				await nextTick();
			}

			const successImage = wrapper.find(".success-image");
			expect(successImage.exists()).toBe(true);
		});

		it("should navigate back to students page when success back button is clicked", async () => {
			createTestEnvStore({ FEATURE_CONSENT_NECESSARY: false });
			mockData[0].birthday = "10.10.2010";

			const { wrapper } = setup();

			const mockWinPrint = {
				document: {
					write: vi.fn(),
					close: vi.fn(),
				},
				focus: vi.fn(),
				print: vi.fn(),
				close: vi.fn(),
			};
			vi.spyOn(window, "open").mockReturnValue(mockWinPrint as unknown as Window);

			await wrapper.find(`[data-testid="button-next"]`).trigger("click");
			await wrapper.find(`[data-testid="button-next-2"]`).trigger("click");

			const downloadButton = wrapper.findAll("button").find((b) => b.text().includes("download"));
			if (downloadButton) {
				await downloadButton.trigger("click");
			}
			await nextTick();

			const backButton = wrapper.findAll("button").find((b) => b.text().includes("back"));
			if (backButton) {
				await backButton.trigger("click");
			}

			expect(mockRouter.push).toHaveBeenCalledWith({
				path: "/administration/students",
			});
		});
	});

	describe("empty table data", () => {
		it("should show error notification and redirect when table is empty", async () => {
			vi.useFakeTimers();

			selectedStudentsData = ref([]);
			const selectedIds = ref<string[]>([]);
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

			mount(ConsentPage, {
				global: {
					plugins: [createTestingVuetify(), createTestingI18n()],
					stubs: {
						DatePicker: true,
					},
				},
			});

			vi.advanceTimersByTime(2100);
			await nextTick();

			expectNotification("error");
			expect(mockRouter.push).toHaveBeenCalledWith({
				path: "/administration/students",
			});

			vi.useRealTimers();
		});
	});

	describe("download function", () => {
		it("should open print window with correct HTML", async () => {
			createTestEnvStore({ FEATURE_CONSENT_NECESSARY: false });
			mockData[0].birthday = "10.10.2010";

			const { wrapper } = setup();

			const mockWinPrint = {
				document: {
					write: vi.fn(),
					close: vi.fn(),
				},
				focus: vi.fn(),
				print: vi.fn(),
				close: vi.fn(),
			};
			const windowOpenSpy = vi.spyOn(window, "open").mockReturnValue(mockWinPrint as unknown as Window);

			await wrapper.find(`[data-testid="button-next"]`).trigger("click");
			await wrapper.find(`[data-testid="button-next-2"]`).trigger("click");

			const downloadButton = wrapper.findAll("button").find((b) => b.text().includes("download"));
			if (downloadButton) {
				await downloadButton.trigger("click");
			}

			expect(windowOpenSpy).toHaveBeenCalled();
			expect(mockWinPrint.document.write).toHaveBeenCalled();
			expect(mockWinPrint.document.close).toHaveBeenCalled();
			expect(mockWinPrint.focus).toHaveBeenCalled();

			windowOpenSpy.mockRestore();
		});

		it("should call print and close on print window after timeout", async () => {
			vi.useFakeTimers();
			createTestEnvStore({ FEATURE_CONSENT_NECESSARY: false });
			mockData[0].birthday = "10.10.2010";

			const { wrapper } = setup();

			const mockWinPrint = {
				document: {
					write: vi.fn(),
					close: vi.fn(),
				},
				focus: vi.fn(),
				print: vi.fn(),
				close: vi.fn(),
			};
			const windowOpenSpy = vi.spyOn(window, "open").mockReturnValue(mockWinPrint as unknown as Window);

			await wrapper.find(`[data-testid="button-next"]`).trigger("click");
			await wrapper.find(`[data-testid="button-next-2"]`).trigger("click");

			const downloadButton = wrapper.findAll("button").find((b) => b.text().includes("download"));
			if (downloadButton) {
				await downloadButton.trigger("click");
			}

			vi.advanceTimersByTime(600);

			expect(mockWinPrint.print).toHaveBeenCalled();
			expect(mockWinPrint.close).toHaveBeenCalled();

			windowOpenSpy.mockRestore();
			vi.useRealTimers();
		});
	});

	describe("beforeunload handler", () => {
		it("should show cancel warning when at download step and page is about to unload", async () => {
			createTestEnvStore({ FEATURE_CONSENT_NECESSARY: false });
			mockData[0].birthday = "10.10.2010";

			const { wrapper } = setup();

			await wrapper.find(`[data-testid="button-next"]`).trigger("click");
			await wrapper.find(`[data-testid="button-next-2"]`).trigger("click");

			const event = new Event("beforeunload") as BeforeUnloadEvent;
			Object.defineProperty(event, "preventDefault", { value: vi.fn() });
			Object.defineProperty(event, "returnValue", { value: "", writable: true });

			window.dispatchEvent(event);

			await nextTick();

			const dialog = wrapper.findComponent({ name: "SvsDialog" });
			expect(dialog.props().modelValue).toBe(true);
		});
	});

	describe("component unmount", () => {
		it("should clean up event listeners and timeouts on unmount", async () => {
			const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

			const { wrapper } = setup();
			wrapper.unmount();

			expect(removeEventListenerSpy).toHaveBeenCalledWith("beforeunload", expect.any(Function));
			removeEventListenerSpy.mockRestore();
		});

		it("should clear timeouts when component unmounts after download", async () => {
			vi.useFakeTimers();
			createTestEnvStore({ FEATURE_CONSENT_NECESSARY: false });
			mockData[0].birthday = "10.10.2010";

			const clearTimeoutSpy = vi.spyOn(global, "clearTimeout");

			const mockWinPrint = {
				document: {
					write: vi.fn(),
					close: vi.fn(),
				},
				focus: vi.fn(),
				print: vi.fn(),
				close: vi.fn(),
			};
			vi.spyOn(window, "open").mockReturnValue(mockWinPrint as unknown as Window);

			const { wrapper } = setup();

			await wrapper.find(`[data-testid="button-next"]`).trigger("click");
			await wrapper.find(`[data-testid="button-next-2"]`).trigger("click");

			const downloadButton = wrapper.findAll("button").find((b) => b.text().includes("download"));
			if (downloadButton) {
				await downloadButton.trigger("click");
			}

			wrapper.unmount();

			expect(clearTimeoutSpy).toHaveBeenCalled();

			clearTimeoutSpy.mockRestore();
			vi.useRealTimers();
		});
	});
});
