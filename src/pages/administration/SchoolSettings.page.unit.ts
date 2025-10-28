import SchoolSettings from "./SchoolSettings.page.vue";
import { ConfigResponse, SchoolSystemResponse, SchulcloudTheme } from "@/serverApi/v3";
import SchoolsModule from "@/store/schools";
import { FederalState } from "@/store/types/schools";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { SCHOOLS_MODULE_KEY } from "@/utils/inject";
import { createTestEnvStore, maintenanceStatusFactory } from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { mockSchool } from "@@/tests/test-utils/mockObjects";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useSharedSchoolYearChange } from "@data-school";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { shallowMount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import type { Mock, Mocked } from "vitest";
import { nextTick, reactive } from "vue";
import { useRoute } from "vue-router";

vi.mock("vue-router");

const useRouteMock = <Mock>useRoute;

vi.mock("@data-school/schoolYearChange.composable");

describe("SchoolSettingsPage", () => {
	let useSharedSchoolYearChangeApiMock: DeepMocked<ReturnType<typeof useSharedSchoolYearChange>>;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		useSharedSchoolYearChangeApiMock = createMock<ReturnType<typeof useSharedSchoolYearChange>>();

		vi.mocked(useSharedSchoolYearChange).mockReturnValue(useSharedSchoolYearChangeApiMock);
	});

	let schoolsModule: Mocked<SchoolsModule>;

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

	const mockSystems: SchoolSystemResponse[] = [{ id: "123", type: "itslearning" }];

	const getWrapper = (
		envConfig: Partial<ConfigResponse> = {
			FEATURE_USER_LOGIN_MIGRATION_ENABLED: true,
			FEATURE_SCHOOL_POLICY_ENABLED_NEW: true,
			FEATURE_SCHOOL_TERMS_OF_USE_ENABLED: true,
			SC_THEME: SchulcloudTheme.Default,
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
				courseCreationInNextYear: false,
			},
			fetchSystems: vi.fn(),
			...schoolGetters,
		});

		createTestEnvStore(envConfig);

		useRouteMock.mockImplementation(() => reactive({ path: "home", query: {} }));

		const wrapper = shallowMount(SchoolSettings, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[SCHOOLS_MODULE_KEY.valueOf()]: schoolsModule,
				},
			},
		});

		return { wrapper };
	};

	describe("onMounted", () => {
		it("should fetch maintenance status of school", () => {
			getWrapper();

			expect(useSharedSchoolYearChangeApiMock.fetchSchoolYearStatus).toHaveBeenCalledWith(mockSchool.id);
		});
	});

	describe("when feature school policy is enabled", () => {
		it("should render privacy policy expansion panel", () => {
			const { wrapper } = getWrapper();

			expect(wrapper.find('[data-testid="policy-panel"]').exists()).toBe(true);
		});
	});

	describe("when feature school policy is disabled", () => {
		it("should not render privacy policy expansion panel", () => {
			const { wrapper } = getWrapper({
				FEATURE_SCHOOL_POLICY_ENABLED_NEW: false,
			});

			expect(wrapper.find('[data-testid="policy-panel"]').exists()).toBe(false);
		});
	});

	describe("when feature school terms of use is enabled", () => {
		it("should render terms of use expansion panel", () => {
			const { wrapper } = getWrapper();

			expect(wrapper.find('[data-testid="terms-panel"]').exists()).toBe(true);
		});
	});

	describe("when feature school terms of use is disabled", () => {
		it("should not render terms of use expansion panel", () => {
			const { wrapper } = getWrapper({
				FEATURE_SCHOOL_TERMS_OF_USE_ENABLED: false,
			});

			expect(wrapper.find('[data-testid="terms-panel"]').exists()).toBe(false);
		});
	});

	describe("when feature admin migration is enabled", () => {
		it("should render admin migration expansion panel", () => {
			const { wrapper } = getWrapper();

			expect(wrapper.find('[data-testid="migration-panel"]').exists()).toBe(true);
		});
	});

	describe("when feature admin migration is disabled", () => {
		it("should not render admin migration expansion panel", () => {
			const { wrapper } = getWrapper({
				FEATURE_USER_LOGIN_MIGRATION_ENABLED: false,
			});

			expect(wrapper.find('[data-testid="migration-panel"]').exists()).toBe(false);
		});
	});

	describe("school year change", () => {
		describe("when school has an active ldap", () => {
			const setup = () => {
				useSharedSchoolYearChangeApiMock.maintenanceStatus.value = maintenanceStatusFactory.build({
					schoolUsesLdap: true,
				});

				const { wrapper } = getWrapper();

				return {
					wrapper,
				};
			};

			it("should show school year change panel", () => {
				const { wrapper } = setup();

				expect(wrapper.find('[data-testid="school-year-change-panel"]').exists()).toBe(true);
			});
		});

		describe("when school does not have an active ldap", () => {
			const setup = () => {
				useSharedSchoolYearChangeApiMock.maintenanceStatus.value = maintenanceStatusFactory.build({
					schoolUsesLdap: false,
				});

				const { wrapper } = getWrapper();

				return {
					wrapper,
				};
			};

			it("should hide school year change panel", () => {
				const { wrapper } = setup();

				expect(wrapper.find('[data-testid="school-year-change-panel"]').exists()).toBe(false);
			});
		});

		describe("when maintenance status is undefined", () => {
			it("should hide school year change panel", () => {
				useSharedSchoolYearChangeApiMock.maintenanceStatus.value = undefined;
				const { wrapper } = getWrapper();

				expect(wrapper.find('[data-testid="school-year-change-panel"]').exists()).toBe(false);
			});
		});
	});

	it("should compute systems correctly", () => {
		const { wrapper } = getWrapper();

		expect(Array.isArray(wrapper.vm.systems)).toBeTruthy();
		expect(wrapper.vm.systems[0].type).toStrictEqual("itslearning");
	});

	it("should show skeleton while loading", () => {
		const { wrapper } = getWrapper(undefined, {
			getLoading: true,
		});

		expect(wrapper.find('[data-testid="systems-panel-skeleton"]').exists()).toBe(true);
	});

	it("should render alert on error", () => {
		const { wrapper } = getWrapper(undefined, {
			getError: createApplicationError(500, "someKey"),
		});

		const noError = wrapper.findComponent('[data-testid="no-error"]');
		const errorAlert = wrapper.findComponent('[data-testid="error-alert"]');

		expect(noError.exists()).toBe(false);
		expect(errorAlert.exists()).toBe(true);
	});

	it("should load needed data from server", async () => {
		getWrapper();
		await nextTick();

		expect(schoolsModule.fetchSystems).toHaveBeenCalled();
	});
});
