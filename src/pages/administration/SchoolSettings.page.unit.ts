import SchoolSettings from "./SchoolSettings.page.vue";
import { createTestEnvStore, maintenanceStatusFactory, schoolFactory } from "@@/tests/test-utils";
import { createTestSchoolStore } from "@@/tests/test-utils/factory/school-test.utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { ConfigResponse, FederalStateResponse, SchulcloudTheme } from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises, shallowMount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import type { Mock } from "vitest";
import { nextTick, reactive, ref } from "vue";
import { useRoute } from "vue-router";

vi.mock("vue-router");

const useRouteMock = <Mock>useRoute;

describe("SchoolSettingsPage", () => {
	const mockSchool = schoolFactory.build();

	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	const mockFederalState: FederalStateResponse = {
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

	const getWrapper = (
		envConfig: Partial<ConfigResponse> = {
			FEATURE_USER_LOGIN_MIGRATION_ENABLED: true,
			FEATURE_SCHOOL_POLICY_ENABLED_NEW: true,
			FEATURE_SCHOOL_TERMS_OF_USE_ENABLED: true,
			SC_THEME: SchulcloudTheme.DEFAULT,
		},
		withApiError = false
	) => {
		createTestEnvStore(envConfig);
		const { schoolStore } = createTestSchoolStore({
			schoolDetails: { ...mockSchool, federalState: mockFederalState },
			schoolSystems: [{ id: "123", type: "itslearning" }],
		});

		useRouteMock.mockImplementation(() => reactive({ path: "home", query: {} }));

		if (withApiError) {
			vi.spyOn(schoolStore, "schoolApiError", "get").mockReturnValue(
				ref(new Error("Some error occurred")) as unknown as Error
			);
		}

		const wrapper = shallowMount(SchoolSettings, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		return { wrapper, schoolStore };
	};

	describe("onMounted", () => {
		it("should fetch maintenance status of school", () => {
			const { schoolStore } = getWrapper();

			expect(schoolStore.fetchMaintenanceStatus).toHaveBeenCalledWith(mockSchool.id);
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
				const { wrapper, schoolStore } = getWrapper();
				schoolStore.$patch({
					schoolMaintenanceStatus: maintenanceStatusFactory.build({
						schoolUsesLdap: true,
					}),
				});

				return {
					wrapper,
				};
			};

			it("should show school year change panel", async () => {
				const { wrapper } = setup();
				await flushPromises();

				expect(wrapper.find('[data-testid="school-year-change-panel"]').exists()).toBe(true);
			});
		});

		describe("when school does not have an active ldap", () => {
			const setup = () => {
				const { wrapper, schoolStore } = getWrapper();
				schoolStore.$patch({
					schoolMaintenanceStatus: maintenanceStatusFactory.build({
						schoolUsesLdap: false,
					}),
				});

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
				const { wrapper, schoolStore } = getWrapper();
				schoolStore.$patch({
					schoolMaintenanceStatus: undefined,
				});

				expect(wrapper.find('[data-testid="school-year-change-panel"]').exists()).toBe(false);
			});
		});
	});

	it("should render alert on error", async () => {
		const { wrapper } = getWrapper(undefined, true);
		const errorAlert = wrapper.findComponent('[data-testid="error-alert"]');

		expect(errorAlert.exists()).toBe(true);
	});

	it("should load needed data from server", async () => {
		const { schoolStore } = getWrapper();
		await nextTick();

		expect(schoolStore.fetchSchoolSystems).toHaveBeenCalled();
	});
});
