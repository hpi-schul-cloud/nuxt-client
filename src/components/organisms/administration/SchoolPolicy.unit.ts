import SchoolPolicy from "./SchoolPolicy.vue";
import AuthModule from "@/store/auth";
import SchoolsModule from "@/store/schools";
import PrivacyPolicyModule from "@/store/privacy-policy";
import { createModuleMocks } from "@/utils/mock-store-module";
import { shallowMount, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mockSchool } from "@@/tests/test-utils/mockObjects";
import { ConsentVersion } from "@/store/types/consent-version";
import { I18N_KEY } from "@/utils/inject";
import Vue from "vue";

describe("SchoolPolicy", () => {
	let authModule: jest.Mocked<AuthModule>;
	let schoolsModule: jest.Mocked<SchoolsModule>;
	let privacyPolicyModule: jest.Mocked<PrivacyPolicyModule>;

	const mockPolicy: ConsentVersion = {
		_id: "123",
		schoolId: "mockSchoolId",
		title: "sometitle",
		consentText: "",
		publishedAt: "somedate",
		createdAt: "somedate",
		updatedAt: "somedate",
		consentTypes: ["privacy"],
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
		getters: Partial<PrivacyPolicyModule> = {
			getPrivacyPolicy: mockPolicy,
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

		privacyPolicyModule = createModuleMocks(PrivacyPolicyModule, {
			...getters,
		});

		const wrapper: Wrapper<Vue> = shallowMount(SchoolPolicy, {
			...createComponentMocks({
				i18n: true,
			}),
			provide: {
				[I18N_KEY as symbol]: { t: (key: string) => key },
				authModule,
				schoolsModule,
				privacyPolicyModule,
			},
		});

		return wrapper;
	};

	describe("when school is set", () => {
		it("should call fetch privacy policy", () => {
			setup();

			expect(privacyPolicyModule.fetchPrivacyPolicy).toHaveBeenCalled();
		});
	});

	describe("when privacy policy is loading", () => {
		it("should render progress bar", () => {
			const wrapper = setup({ getStatus: "pending" });

			expect(wrapper.find('[data-testid="progress-bar"]').exists()).toBe(true);
		});
	});

	describe("when privacy policy is loaded", () => {
		it("should render privacy policy list item", () => {
			const wrapper = setup();

			expect(wrapper.find('[data-testid="policy-item"]').exists()).toBe(true);
		});
	});

	describe("when privacy policy is found", () => {
		it("should render download button", () => {
			const wrapper = setup();

			expect(wrapper.find('[data-testid="download-button"]').exists()).toBe(
				true
			);
		});
	});

	describe("when privacy policy is not found", () => {
		it("should not render download button", () => {
			const wrapper = setup({
				getPrivacyPolicy: null,
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
		it("should change isSchoolPolicyFormDialogOpen to true", () => {
			const wrapper = setup();

			expect((wrapper.vm as any).isSchoolPolicyFormDialogOpen).toBe(false);
			wrapper.find('[data-testid="edit-button"]').trigger("click");
			expect((wrapper.vm as any).isSchoolPolicyFormDialogOpen).toBe(true);
		});
	});

	describe("when error is thrown in privacyPolicyModule", () => {
		it("should render error alert", () => {
			const wrapper = setup({
				getStatus: "error",
			});

			expect(wrapper.find('[data-testid="error-alert"]').exists()).toBe(true);
		});
	});
});
