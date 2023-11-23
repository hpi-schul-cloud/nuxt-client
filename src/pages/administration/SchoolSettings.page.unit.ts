import SchoolSettings from "./SchoolSettings.page.vue";
import EnvConfigModule from "@/store/env-config";
import SchoolsModule from "@/store/schools";
import { createModuleMocks } from "@/utils/mock-store-module";
import { shallowMount, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { FederalState } from "@/store/types/schools";
import { mockSchool } from "@@/tests/test-utils/mockObjects";
import {
	I18N_KEY,
	ENV_CONFIG_MODULE_KEY,
	SCHOOLS_MODULE_KEY,
} from "@/utils/inject";
import { i18nMock } from "@@/tests/test-utils";
import { useApplicationError } from "@/composables/application-error.composable";
import VueRouter from "vue-router";

jest.mock<typeof import("@/utils/pageTitle")>("@/utils/pageTitle", () => ({
	buildPageTitle: (pageTitle) => pageTitle ?? "",
}));

describe("SchoolSettingsPage", () => {
	let envConfigModule: jest.Mocked<EnvConfigModule>;
	let schoolsModule: jest.Mocked<SchoolsModule>;

	const mockFederalState: FederalState = {
		id: "00001234597947823",
		counties: [
			{
				antaresKey: "BRB",
				countyId: 12051,
				name: "Brandenburg an der Havel",
			},
			{
				antaresKey: "CB",
				countyId: 12052,
				name: "Cottbus",
			},
		],
		name: "Brandenburg",
		abbreviation: "BB",
		logoUrl:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Brandenburg_Wappen.svg/354px-Brandenburg_Wappen.svg.png",
	};

	const mockSystems: any[] = [{ _id: "123", type: "itslearning" }];

	const setup = (
		envConfigGetters: Partial<EnvConfigModule> = {
			getFeatureSchoolSanisUserMigrationEnabled: true,
			getSchoolPolicyEnabled: true,
			getSchoolTermsOfUseEnabled: true,
		},
		schoolGetters: Partial<SchoolsModule> = {}
	) => {
		schoolsModule = createModuleMocks(SchoolsModule, {
			getSchool: mockSchool,
			getFederalState: mockFederalState,
			getSystems: mockSystems,
			getCurrentYear: {
				id: "123",
				name: "School Year 3000",
				startDate: "",
				endDate: "",
			},
			...schoolGetters,
		});

		envConfigModule = createModuleMocks(EnvConfigModule, {
			...envConfigGetters,
		});

		const componentOptions = createComponentMocks({ i18n: true });
		const { localVue } = componentOptions;
		localVue.use(VueRouter);
		const router = new VueRouter({ routes: [{ path: "home" }] });

		const wrapper: Wrapper<any> = shallowMount(SchoolSettings, {
			...componentOptions,
			provide: {
				[I18N_KEY.valueOf()]: i18nMock,
				[SCHOOLS_MODULE_KEY.valueOf()]: schoolsModule,
				[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
			},
			router,
		});

		return wrapper;
	};

	describe("when feature school policy is enabled", () => {
		it("should render privacy policy expansion panel", () => {
			const wrapper = setup();

			expect(wrapper.find('[data-testid="policy-panel"]').exists()).toBe(true);
		});
	});

	describe("when feature school policy is disabled", () => {
		it("should not render privacy policy expansion panel", () => {
			const wrapper = setup({
				getSchoolPolicyEnabled: false,
			});

			expect(wrapper.find('[data-testid="policy-panel"]').exists()).toBe(false);
		});
	});

	describe("when feature school terms of use is enabled", () => {
		it("should render terms of use expansion panel", () => {
			const wrapper = setup();

			expect(wrapper.find('[data-testid="terms-panel"]').exists()).toBe(true);
		});
	});

	describe("when feature school terms of use is disabled", () => {
		it("should not render terms of use expansion panel", () => {
			const wrapper = setup({
				getSchoolTermsOfUseEnabled: false,
			});

			expect(wrapper.find('[data-testid="terms-panel"]').exists()).toBe(false);
		});
	});

	describe("when feature admin migration is enabled", () => {
		it("should render admin migration expansion panel", () => {
			const wrapper = setup();

			expect(wrapper.find('[data-testid="migration-panel"]').exists()).toBe(
				true
			);
		});
	});

	describe("when feature admin migration is disabled", () => {
		it("should not render admin migration expansion panel", () => {
			const wrapper = setup({
				getFeatureSchoolSanisUserMigrationEnabled: false,
			});

			expect(wrapper.find('[data-testid="migration-panel"]').exists()).toBe(
				false
			);
		});
	});

	it("should compute systems correctly", () => {
		const wrapper = setup();

		expect(Array.isArray(wrapper.vm.systems)).toBeTruthy();
		expect(wrapper.vm.systems[0].type).toStrictEqual("itslearning");
	});

	it("should show skeleton while loading", () => {
		const wrapper = setup(undefined, {
			getLoading: true,
		});

		expect(
			wrapper.find('[data-testid="systems-panel-skeleton"]').exists()
		).toBe(true);
	});

	it("should render alert on error", () => {
		const wrapper = setup(undefined, {
			getError: useApplicationError().createApplicationError(500, "someKey"),
		});

		const noError = wrapper.find('[data-testid="no-error"]');
		const errorAlert = wrapper.find('[data-testid="error-alert"]');

		expect(noError.exists()).toBe(false);
		expect(errorAlert.exists()).toBe(true);
	});
});
