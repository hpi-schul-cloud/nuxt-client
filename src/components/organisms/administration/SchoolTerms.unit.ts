import SchoolTerms from "./SchoolTerms.vue";
import AuthModule from "@/store/auth";
import SchoolsModule from "@/store/schools";
import TermsOfUseModule from "@/store/terms-of-use";
import { createModuleMocks } from "@/utils/mock-store-module";
import { shallowMount, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mockSchool } from "@@/tests/test-utils/mockObjects";
import { ConsentVersion } from "@/store/types/consent-version";
import { I18N_KEY } from "@/utils/inject";
import Vue from "vue";

describe("SchoolTerms", () => {
	let authModule: jest.Mocked<AuthModule>;
	let schoolsModule: jest.Mocked<SchoolsModule>;
	let termsOfUseModule: jest.Mocked<TermsOfUseModule>;

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
		const el = document.createElement("div");
		el.setAttribute("data-app", "true");
		document.body.appendChild(el);

		authModule = createModuleMocks(AuthModule, {
			getUserPermissions: userPermissions,
		});

		schoolsModule = createModuleMocks(SchoolsModule, {
			getSchool: mockSchool,
		});

		termsOfUseModule = createModuleMocks(TermsOfUseModule, {
			...getters,
		});

		const wrapper: Wrapper<Vue> = shallowMount(SchoolTerms, {
			...createComponentMocks({
				i18n: true,
			}),
			provide: {
				[I18N_KEY as symbol]: { t: (key: string) => key },
				authModule,
				schoolsModule,
				termsOfUseModule,
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
		it("should render download button", () => {
			const wrapper = setup();

			expect(wrapper.find('[data-testid="download-button"]').exists()).toBe(
				true
			);
		});
	});

	describe("when terms of use are not found", () => {
		it("should not render download button", () => {
			const wrapper = setup({
				getTermsOfUse: null,
			});

			expect(wrapper.find('[data-testid="download-button"]').exists()).toBe(
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

			expect(wrapper.find('[data-testid="form-dialog"]').exists()).toBe(true);
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

			expect((wrapper.vm as any).isSchoolTermsFormDialogOpen).toBe(false);
			wrapper.find('[data-testid="edit-button"]').trigger("click");
			expect((wrapper.vm as any).isSchoolTermsFormDialogOpen).toBe(true);
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
