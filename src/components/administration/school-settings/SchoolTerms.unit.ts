import SchoolTerms from "./SchoolTerms.vue";
import SchoolTermsFormDialog from "./SchoolTermsFormDialog.vue";
import { Permission } from "@/serverApi/v3";
import SchoolsModule from "@/store/schools";
import { Status } from "@/store/types/commons";
import { downloadFile } from "@/utils/fileHelper";
import { SCHOOLS_MODULE_KEY } from "@/utils/inject";
import { createTestAppStoreWithPermissions, termsOfUseFactory } from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { mockSchool } from "@@/tests/test-utils/mockObjects";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { ConsentVersion, CreateConsentVersionPayload, useSchoolTermsOfUse } from "@data-school";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { SvsDialog } from "@ui-dialog";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import type { Mocked } from "vitest";
import { nextTick, ref } from "vue";

vi.mock("@/utils/fileHelper");

vi.mock("@data-school/schoolTermsOfUse.composable");
const useSchoolTermsOfUseMock = vi.mocked(useSchoolTermsOfUse);

describe("SchoolTerms", () => {
	let schoolsModule: Mocked<SchoolsModule>;
	let useSchoolTermsOfUseMockReturn: DeepMocked<ReturnType<typeof useSchoolTermsOfUse>>;

	const setup = (
		options?: Partial<{ status: Status; permissions: Permission[]; termsOfUse: ConsentVersion | null }>
	) => {
		const existitngTermsOfUse = termsOfUseFactory.build({ schoolId: mockSchool.id });
		const { termsOfUse, permissions, status } = {
			termsOfUse: existitngTermsOfUse,
			permissions: [Permission.SchoolEdit],
			status: "completed" as Status,
			...options,
		};

		setActivePinia(createTestingPinia({ stubActions: false }));
		createTestAppStoreWithPermissions(permissions);

		schoolsModule = createModuleMocks(SchoolsModule, {
			getSchool: mockSchool,
		});

		useSchoolTermsOfUseMockReturn = createMock<ReturnType<typeof useSchoolTermsOfUse>>();
		useSchoolTermsOfUseMock.mockReturnValue(useSchoolTermsOfUseMockReturn);

		useSchoolTermsOfUseMockReturn.termsOfUse = ref(termsOfUse);
		useSchoolTermsOfUseMockReturn.status = ref(status);

		const wrapper = mount(SchoolTerms, {
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
		it("should call fetch terms of use", () => {
			setup();

			expect(useSchoolTermsOfUseMockReturn.fetchTermsOfUse).toHaveBeenCalled();
		});
	});

	describe("when terms of use is loading", () => {
		it("should render progress bar", () => {
			const { wrapper } = setup({ status: "pending" });

			expect(wrapper.find('[data-testid="progress-bar"]').exists()).toBe(true);
		});
	});

	describe("when terms of use are loaded", () => {
		it("should render terms of use list item", () => {
			const { wrapper } = setup();

			expect(wrapper.find('[data-testid="terms-item"]').exists()).toBe(true);
		});
	});

	describe("when terms of use are found", () => {
		it("should render delete button", () => {
			const { wrapper } = setup();

			expect(wrapper.find('[data-testid="delete-button"]').exists()).toBe(true);
		});
	});

	describe("when terms of use are not found", () => {
		it("should not render delete button", () => {
			const { wrapper } = setup({
				termsOfUse: null,
			});

			expect(wrapper.find('[data-testid="delete-button"]').exists()).toBe(false);
		});

		it("should not be possible to click terms item", async () => {
			const { wrapper } = setup({
				termsOfUse: null,
			});

			const downloadFileMock = vi.mocked(downloadFile).mockReturnValueOnce();
			const termsItem = wrapper.find('[data-testid="terms-item"]');
			await termsItem.trigger("click");

			expect(downloadFileMock).toHaveBeenCalledTimes(0);
		});
	});

	describe("when user has school edit permission", () => {
		it("should render edit button", () => {
			const { wrapper } = setup({ permissions: [Permission.SchoolEdit] });

			expect(wrapper.find('[data-testid="edit-button"]').exists()).toBe(true);
		});

		it("should render dialog component", () => {
			const { wrapper } = setup({ permissions: [Permission.SchoolEdit] });

			expect(wrapper.findComponent(SchoolTermsFormDialog).exists()).toBe(true);
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
		it("should change isSchoolTermsFormDialogOpen to true", async () => {
			const { wrapper } = setup();
			const schoolTermsDialog = wrapper.findComponent(SchoolTermsFormDialog);
			expect(schoolTermsDialog.props().isOpen).toBe(false);

			const editBtn = wrapper.find('[data-testid="edit-button"]');
			await editBtn.trigger("click");

			expect(schoolTermsDialog.props().isOpen).toBe(true);
		});

		it("should create new privacy policy when creation is confirmed", async () => {
			const { wrapper } = setup();
			const schoolTermsDialog = wrapper.findComponent(SchoolTermsFormDialog);

			const consentVersionPayload: CreateConsentVersionPayload = {
				schoolId: "schoolId",
				consentTypes: ["termsOfUse"],
				publishedAt: new Date().toISOString(),
				title: "New Terms of Use",
				consentData: "data:application/pdf;base64,SOMEFILEDATA",
			};

			schoolTermsDialog.vm.$emit("confirm", consentVersionPayload);
			await nextTick();

			expect(useSchoolTermsOfUseMockReturn.createTermsOfUse).toHaveBeenCalledWith(consentVersionPayload);
		});

		it("should not create new terms of use and close dialog when creation is cancelled", async () => {
			const { wrapper } = setup();
			const schoolTermsDialog = wrapper.findComponent(SchoolTermsFormDialog);

			schoolTermsDialog.vm.$emit("close");
			await nextTick();

			expect(useSchoolTermsOfUseMockReturn.createTermsOfUse).toHaveBeenCalledTimes(0);
			expect(schoolTermsDialog.props().isOpen).toBe(false);
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

		it("should call delete terms of use method when deletion is confirmed", async () => {
			const { wrapper } = setup();

			const deleteDialog = wrapper.find('[data-testid="delete-dialog"]').findComponent(SvsDialog);
			deleteDialog.vm.$emit("confirm");
			await nextTick();

			expect(useSchoolTermsOfUseMockReturn.deleteTermsOfUse).toHaveBeenCalled();
		});
	});

	describe("when user clicks terms item", () => {
		it("should call downloadFile method", async () => {
			const { wrapper } = setup();

			const downloadFileMock = vi.mocked(downloadFile).mockReturnValueOnce();
			const termsItem = wrapper.findComponent('[data-testid="terms-item"]');
			await termsItem.trigger("click");

			expect(downloadFileMock).toHaveBeenCalledTimes(1);
		});
	});

	describe("when error is thrown in termsOfUseModule", () => {
		it("should render error alert", () => {
			const { wrapper } = setup({
				status: "error",
			});

			expect(wrapper.find('[data-testid="error-alert"]').exists()).toBe(true);
		});
	});
});
