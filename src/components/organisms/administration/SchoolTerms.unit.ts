import SchoolTerms from "./SchoolTerms.vue";
import AuthModule from "@/store/auth";
import SchoolsModule from "@/store/schools";
import TermsOfUseModule from "@/store/terms-of-use";
import NotifierModule from "@/store/notifier";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { VueWrapper, mount } from "@vue/test-utils";
import { mockSchool } from "@@/tests/test-utils/mockObjects";
import { ConsentVersion } from "@/store/types/consent-version";
import {
	AUTH_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
	SCHOOLS_MODULE_KEY,
	TERMS_OF_USE_MODULE_KEY,
} from "@/utils/inject";
import { downloadFile } from "@/utils/fileHelper";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import type { Mocked } from "vitest";

vi.mock("@/utils/fileHelper");

describe("SchoolTerms", () => {
	let authModule: Mocked<AuthModule>;
	let schoolsModule: Mocked<SchoolsModule>;
	let termsOfUseModule: Mocked<TermsOfUseModule>;
	let notifierModule: Mocked<NotifierModule>;

	const mockTerms: ConsentVersion = {
		_id: "123",
		schoolId: "mockSchoolId",
		title: "sometitle",
		consentText: "",
		publishedAt: "somedate",
		createdAt: "somedate",
		updatedAt: "somedate",
		consentTypes: ["termsOfUse"],
		consentData: {
			_id: "999",
			schoolId: "333",
			createdAt: "someotherdate",
			updatedAt: "someotherdate",
			fileType: "pdf",
			fileName: "somefilename",
			data: "data:application/pdf;base64,SOMEFILEDATA",
		},
	};

	const setup = (
		getters: Partial<TermsOfUseModule> = {
			getTermsOfUse: mockTerms,
			getBusinessError: {
				statusCode: "",
				message: "",
			},
			getStatus: "completed",
		},
		userPermissions: string[] = ["school_edit"]
	) => {
		authModule = createModuleMocks(AuthModule, {
			getUserPermissions: userPermissions,
		});

		schoolsModule = createModuleMocks(SchoolsModule, {
			getSchool: mockSchool,
		});

		termsOfUseModule = createModuleMocks(TermsOfUseModule, {
			...getters,
		});

		notifierModule = createModuleMocks(NotifierModule);

		const wrapper = mount(SchoolTerms, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[TERMS_OF_USE_MODULE_KEY.valueOf()]: termsOfUseModule,
					[AUTH_MODULE_KEY.valueOf()]: authModule,
					[SCHOOLS_MODULE_KEY.valueOf()]: schoolsModule,
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				},
			},
		});

		return wrapper;
	};

	describe("when school is set", () => {
		it("should call fetch terms of use", () => {
			setup();

			expect(termsOfUseModule.fetchTermsOfUse).toHaveBeenCalled();
		});
	});

	describe("when terms of use is loading", () => {
		it("should render progress bar", () => {
			const wrapper = setup({ getStatus: "pending" });

			expect(wrapper.find('[data-testid="progress-bar"]').exists()).toBe(true);
		});
	});

	describe("when terms of use are loaded", () => {
		it("should render terms of use list item", () => {
			const wrapper = setup();

			expect(wrapper.find('[data-testid="terms-item"]').exists()).toBe(true);
		});
	});

	describe("when terms of use are found", () => {
		it("should render delete button", () => {
			const wrapper = setup();

			expect(wrapper.find('[data-testid="delete-button"]').exists()).toBe(true);
		});
	});

	describe("when terms of use are not found", () => {
		it("should not render delete button", () => {
			const wrapper = setup({
				getTermsOfUse: null,
			});

			expect(wrapper.find('[data-testid="delete-button"]').exists()).toBe(
				false
			);
		});
	});

	describe("when user has school edit permission", () => {
		it("should render edit button", () => {
			const wrapper = setup();

			expect(wrapper.find('[data-testid="edit-button"]').exists()).toBe(true);
		});

		it("should render dialog component", () => {
			const wrapper = setup();

			expect(
				wrapper.findComponent({ name: "school-terms-form-dialog" }).exists()
			).toBe(true);
		});
	});

	describe("when user does not have school edit permission", () => {
		it("should not render edit button", () => {
			const wrapper = setup(undefined, ["school_view"]);

			expect(wrapper.find('[data-testid="edit-button"]').exists()).toBe(false);
		});

		it("should not render dialog component", () => {
			const wrapper = setup(undefined, ["school_view"]);

			expect(wrapper.find('[data-testid="form-dialog"]').exists()).toBe(false);
		});
	});

	describe("when user clicks edit button", () => {
		it("should change isSchoolTermsFormDialogOpen to true", () => {
			const wrapper = setup();
			const wrapperVm = wrapper.vm as unknown as typeof SchoolTerms;

			expect(wrapperVm.isSchoolTermsFormDialogOpen).toBe(false);
			wrapper.find('[data-testid="edit-button"]').trigger("click");
			expect(wrapperVm.isSchoolTermsFormDialogOpen).toBe(true);
		});
	});

	describe("when user clicks delete button", () => {
		it("should change isDeleteTermsDialogOpen to true", async () => {
			const wrapper = setup();
			const wrapperVm = wrapper.vm as unknown as typeof SchoolTerms;

			expect(wrapperVm.isDeleteTermsDialogOpen).toBe(false);
			await wrapper
				.findComponent('[data-testid="delete-button"]')
				.trigger("click");
			expect(wrapperVm.isDeleteTermsDialogOpen).toBe(true);
		});
	});

	describe("when user clicks terms item", () => {
		it("should call downloadFile method", () => {
			const wrapper = setup();

			const downloadFileMock = vi.mocked(downloadFile).mockReturnValueOnce();
			const termsItem = wrapper.findComponent(
				'[data-testid="terms-item"]'
			) as VueWrapper<typeof SchoolTerms>;

			termsItem.vm.$emit("click");
			expect(downloadFileMock).toHaveBeenCalledTimes(1);
		});
	});

	describe("when error is thrown in termsOfUseModule", () => {
		it("should render error alert", () => {
			const wrapper = setup({
				getStatus: "error",
			});

			expect(wrapper.find('[data-testid="error-alert"]').exists()).toBe(true);
		});
	});
});
