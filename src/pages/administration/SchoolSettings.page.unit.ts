import SchoolSettings from "./SchoolSettings.page.vue";
import EnvConfigModule from "@/store/env-config";
import SchoolsModule from "@/store/schools";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { shallowMount } from "@vue/test-utils";
import { FederalState } from "@/store/types/schools";
import { mockSchool } from "@@/tests/test-utils/mockObjects";
import { ENV_CONFIG_MODULE_KEY, SCHOOLS_MODULE_KEY } from "@/utils/inject";
import { useApplicationError } from "@/composables/application-error.composable";
import { RouteLocationNormalizedLoaded, useRoute } from "vue-router";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { nextTick, reactive } from "vue";
import { SchoolSystemResponse } from "@/serverApi/v3";
jest.mock("vue-router");

const useRouteMock = <jest.Mock<Partial<RouteLocationNormalizedLoaded>>>(
	useRoute
);

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
				id: "00001234597998793",
				antaresKey: "BRB",
				countyId: 12051,
				name: "Brandenburg an der Havel",
			},
			{
				id: "00001234597913216",
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

	const mockSystems: SchoolSystemResponse[] = [
		{ id: "123", type: "itslearning" },
	];

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

		useRouteMock.mockImplementation(() =>
			reactive({ path: "home", query: {} })
		);

		const wrapper = shallowMount(SchoolSettings, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[SCHOOLS_MODULE_KEY.valueOf()]: schoolsModule,
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
				},
			},
		});

		return { wrapper };
	};

	describe("when feature school policy is enabled", () => {
		it("should render privacy policy expansion panel", () => {
			const { wrapper } = setup();

			expect(wrapper.find('[data-testid="policy-panel"]').exists()).toBe(true);
		});
	});

	describe("when feature school policy is disabled", () => {
		it("should not render privacy policy expansion panel", () => {
			const { wrapper } = setup({
				getSchoolPolicyEnabled: false,
			});

			expect(wrapper.find('[data-testid="policy-panel"]').exists()).toBe(false);
		});
	});

	describe("when feature school terms of use is enabled", () => {
		it("should render terms of use expansion panel", () => {
			const { wrapper } = setup();

			expect(wrapper.find('[data-testid="terms-panel"]').exists()).toBe(true);
		});
	});

	describe("when feature school terms of use is disabled", () => {
		it("should not render terms of use expansion panel", () => {
			const { wrapper } = setup({
				getSchoolTermsOfUseEnabled: false,
			});

			expect(wrapper.find('[data-testid="terms-panel"]').exists()).toBe(false);
		});
	});

	describe("when feature admin migration is enabled", () => {
		it("should render admin migration expansion panel", () => {
			const { wrapper } = setup();

			expect(wrapper.find('[data-testid="migration-panel"]').exists()).toBe(
				true
			);
		});
	});

	describe("when feature admin migration is disabled", () => {
		it("should not render admin migration expansion panel", () => {
			const { wrapper } = setup({
				getFeatureSchoolSanisUserMigrationEnabled: false,
			});

			expect(wrapper.find('[data-testid="migration-panel"]').exists()).toBe(
				false
			);
		});
	});

	it("should compute systems correctly", () => {
		const { wrapper } = setup();

		expect(Array.isArray(wrapper.vm.systems)).toBeTruthy();
		expect(wrapper.vm.systems[0].type).toStrictEqual("itslearning");
	});

	it("should show skeleton while loading", () => {
		const { wrapper } = setup(undefined, {
			getLoading: true,
		});

		expect(
			wrapper.find('[data-testid="systems-panel-skeleton"]').exists()
		).toBe(true);
	});

	it("should render alert on error", () => {
		const { wrapper } = setup(undefined, {
			getError: useApplicationError().createApplicationError(500, "someKey"),
		});

		const noError = wrapper.findComponent('[data-testid="no-error"]');
		const errorAlert = wrapper.findComponent('[data-testid="error-alert"]');

		expect(noError.exists()).toBe(false);
		expect(errorAlert.exists()).toBe(true);
	});

	it("should load needed data from server", async () => {
		const fetchSystemsSpy = jest.spyOn(schoolsModule, "fetchSystems");

		setup();
		await nextTick();

		expect(fetchSystemsSpy).toHaveBeenCalled();
	});
});
