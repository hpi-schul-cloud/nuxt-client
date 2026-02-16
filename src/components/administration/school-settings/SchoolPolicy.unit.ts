import SchoolPolicy from "./SchoolPolicy.vue";
import SchoolPolicyFormDialog from "./SchoolPolicyFormDialog.vue";
import { Permission } from "@/serverApi/v3";
import SchoolsModule from "@/store/schools";
import { Status } from "@/store/types/commons";
import { downloadFile } from "@/utils/fileHelper";
import { SCHOOLS_MODULE_KEY } from "@/utils/inject";
import { createTestAppStoreWithPermissions, privacyPolicyFactory } from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { mockSchool } from "@@/tests/test-utils/mockObjects";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { ConsentVersion, CreateConsentVersionPayload, useSchoolPrivacyPolicy } from "@data-school";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { SvsDialog } from "@ui-dialog";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import type { Mocked } from "vitest";
import { nextTick, ref } from "vue";

vi.mock("@/utils/fileHelper");

vi.mock("@data-school/schoolPrivacyPolicy.composable");
const useSchoolPrivacyMock = vi.mocked(useSchoolPrivacyPolicy);

describe("SchoolPolicy", () => {
	let schoolsModule: Mocked<SchoolsModule>;
	let useSchoolPrivacyPolicyMockReturn: DeepMocked<ReturnType<typeof useSchoolPrivacyPolicy>>;

	const setup = (
		options?: Partial<{ status: Status; permissions: Permission[]; privacyPolicy: ConsentVersion | null }>
	) => {
		const existitngPrivacyPolicy = privacyPolicyFactory.build({ schoolId: mockSchool.id });
		const { privacyPolicy, permissions, status } = {
			privacyPolicy: existitngPrivacyPolicy,
			permissions: [Permission.SchoolEdit],
			status: "completed" as Status,
			...options,
		};

		setActivePinia(createTestingPinia({ stubActions: false }));
		createTestAppStoreWithPermissions(permissions);

		schoolsModule = createModuleMocks(SchoolsModule, {
			getSchool: mockSchool,
		});

		useSchoolPrivacyPolicyMockReturn = createMock<ReturnType<typeof useSchoolPrivacyPolicy>>();
		useSchoolPrivacyMock.mockReturnValue(useSchoolPrivacyPolicyMockReturn);

		useSchoolPrivacyPolicyMockReturn.privacyPolicy = ref(privacyPolicy);
		useSchoolPrivacyPolicyMockReturn.status = ref(status);

		const wrapper = mount(SchoolPolicy, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[SCHOOLS_MODULE_KEY.valueOf()]: schoolsModule,
				},
				stubs: { SvsDialog: true },
			},
		});

		return { wrapper };
	};

	describe("when school is set", () => {
		it("should call fetch privacy policy", () => {
			setup();

			expect(useSchoolPrivacyPolicyMockReturn.fetchPrivacyPolicy).toHaveBeenCalled();
		});
	});

	describe("when privacy policy is loading", () => {
		it("should render progress bar", () => {
			const { wrapper } = setup({ status: "pending" });

			expect(wrapper.find('[data-testid="progress-bar"]').exists()).toBe(true);
		});
	});

	describe("when privacy policy is loaded", () => {
		it("should render privacy policy list item", () => {
			const { wrapper } = setup();

			expect(wrapper.find('[data-testid="policy-item"]').exists()).toBe(true);
		});
	});

	describe("when privacy policy is found", () => {
		it("should render delete button", () => {
			const { wrapper } = setup();

			expect(wrapper.find('[data-testid="delete-button"]').exists()).toBe(true);
		});
	});

	describe("when privacy policy is not found", () => {
		it("should not render delete button", () => {
			const { wrapper } = setup({
				privacyPolicy: null,
			});

			expect(wrapper.find('[data-testid="delete-button"]').exists()).toBe(false);
		});

		it("should not be possible to click policy item", async () => {
			const { wrapper } = setup({
				privacyPolicy: null,
			});

			const downloadFileMock = vi.mocked(downloadFile).mockReturnValueOnce();
			const policyItem = wrapper.find('[data-testid="policy-item"]');
			await policyItem.trigger("click");

			expect(downloadFileMock).toHaveBeenCalledTimes(0);
		});
	});

	describe("when user has school edit permission", () => {
		it("should render edit button", () => {
			const { wrapper } = setup({ permissions: [Permission.SchoolEdit] });

			expect(wrapper.find('[data-testid="edit-button"]').exists()).toBe(true);
		});

		it("should render dialog component", async () => {
			const { wrapper } = setup();
			const editBtn = wrapper.find('[data-testid="edit-button"]');
			await editBtn.trigger("click");

			expect(wrapper.findComponent(SchoolPolicyFormDialog).exists()).toBe(true);
		});
	});

	describe("when user does not have school edit permission", () => {
		it("should not render edit button", () => {
			const { wrapper } = setup({ permissions: [Permission.SchoolView] });

			expect(wrapper.find('[data-testid="edit-button"]').exists()).toBe(false);
		});

		it("should not render dialog component", () => {
			const { wrapper } = setup({ permissions: [Permission.SchoolView] });

			expect(wrapper.find('[data-testid="form-dialog"]').exists()).toBe(false);
		});
	});

	describe("when user clicks edit button", () => {
		it("should open school policy form dialog", async () => {
			const { wrapper } = setup();
			const schoolPolicyFormDialog = wrapper.findComponent(SchoolPolicyFormDialog);
			expect(schoolPolicyFormDialog.props().isOpen).toBe(false);

			const editBtn = wrapper.find('[data-testid="edit-button"]');
			await editBtn.trigger("click");

			expect(schoolPolicyFormDialog.props().isOpen).toBe(true);
		});

		it("should create new privacy policy when creation is confirmed", async () => {
			const { wrapper } = setup();
			const schoolPolicyFormDialog = wrapper.findComponent(SchoolPolicyFormDialog);

			const consentVersionPayload: CreateConsentVersionPayload = {
				schoolId: "schoolId",
				consentTypes: ["privacy"],
				publishedAt: new Date().toISOString(),
				title: "New Privacy Policy",
				consentData: "data:application/pdf;base64,SOMEFILEDATA",
			};

			schoolPolicyFormDialog.vm.$emit("confirm", consentVersionPayload);
			await nextTick();

			expect(useSchoolPrivacyPolicyMockReturn.createPrivacyPolicy).toHaveBeenCalledWith(consentVersionPayload);
		});

		it("should not create new privacy policy and close dialog when creation is cancelled", async () => {
			const { wrapper } = setup();
			const schoolPolicyFormDialog = wrapper.findComponent(SchoolPolicyFormDialog);

			schoolPolicyFormDialog.vm.$emit("close");
			await nextTick();

			expect(useSchoolPrivacyPolicyMockReturn.createPrivacyPolicy).toHaveBeenCalledTimes(0);
			expect(schoolPolicyFormDialog.props().isOpen).toBe(false);
		});
	});

	describe("when user clicks delete button", () => {
		it("should open delete dialog", async () => {
			const { wrapper } = setup();

			const deleteDialog = wrapper.find('[data-testid="delete-dialog"]').findComponent(SvsDialog);
			expect(deleteDialog.props().modelValue).toBe(false);

			const deleteBtn = wrapper.find('[data-testid="delete-button"]');
			await deleteBtn.trigger("click");

			expect(deleteDialog.props().modelValue).toBe(true);
		});

		it("should call delete privacy policy method when deletion is confirmed", async () => {
			const { wrapper } = setup();

			const deleteDialog = wrapper.find('[data-testid="delete-dialog"]').findComponent(SvsDialog);
			deleteDialog.vm.$emit("confirm");
			await nextTick();

			expect(useSchoolPrivacyPolicyMockReturn.deletePrivacyPolicy).toHaveBeenCalled();
		});
	});

	describe("when user clicks policy item", () => {
		it("should call downloadFile method", async () => {
			const { wrapper } = setup();

			const downloadFileMock = vi.mocked(downloadFile).mockReturnValueOnce();
			const policyItem = wrapper.find('[data-testid="policy-item"]');
			await policyItem.trigger("click");

			expect(downloadFileMock).toHaveBeenCalledTimes(1);
		});
	});

	describe("when error is thrown in privacyPolicyModule", () => {
		it("should render error alert", () => {
			const { wrapper } = setup({
				status: "error",
			});

			expect(wrapper.find('[data-testid="error-alert"]').exists()).toBe(true);
		});
	});
});
