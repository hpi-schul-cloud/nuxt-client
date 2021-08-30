import SchoolPage from "./school-settings";
import EnvConfigModule from "@/store/env-config";

const mockStore = {
	"env-config": {
		getters: {
			getAdminToggleStudentVisibilityEnabled: () => {
				return true;
			},
			getAdminToggleStudentLernstoreViewEnabled: () => {
				return true;
			},
			getMatrixConfig: () => {
				return true;
			},
			getRocketChatEnabled: () => {
				return true;
			},
			getVideoConferenceEnabled: () => {
				return true;
			},
		},
	},
	schools: {
		getters: {
			getFederalState: () => {
				return federalState;
			},
			getSchool: () => {
				return school;
			},
			getFileStorageTotal: () => {
				return [{ total: 0, totalSize: 0 }];
			},
			getLoading: () => {
				return false;
			},
			getError: () => {
				return {};
			},
			getSystems: () => {
				return [{ _id: "123", type: "itslearning" }];
			},
			getCurrentYear: () => {
				return {
					_id: "5ebd6dc14a431f75ec9a3e77",
					name: "2021/22",
					startDate: "2021-08-01T00:00:00.000Z",
					endDate: "2022-07-31T00:00:00.000Z",
					isTeamCreationByStudentsEnabled: true,
				};
			},
		},
		actions: {
			fetchFileStorageTotal: jest.fn(),
			update: jest.fn(),
			fetchCurrentYear: jest.fn(),
		},
	},
};

// const mockStore = {
// 	schools: {
// 		getters: {
// 			getSystems: () => {
// 				return [
// 					{ _id: "0000d186816abba584714c91", type: "itslearning" },
// 					{
// 						_id: "0000d186816abba584714c90",
// 						type: "moodle",
// 					},
// 				];
// 			},
// 			getCurrentYear: () => {
// 				return {
// 					_id: "5ebd6dc14a431f75ec9a3e77",
// 					name: "2021/22",
// 					// startDate: "2021-08-01T00:00:00.000Z",
// 					// endDate: "2022-07-31T00:00:00.000Z",
// 					// isTeamCreationByStudentsEnabled: true,
// 				};
// 			},
// 			getLoading: () => {
// 				return false;
// 			},
// 			getError: () => {
// 				return null;
// 			},
// 			getSchool: () => {
// 				return {};
// 			},
// 			getFederalState: () => {
// 				return {};
// 			},
// 		},
// 	},
// };

describe("SchoolSettingPage", () => {
	it(...isValidComponent(SchoolPage));

	describe("testing getters", () => {
		it("Tests env var school policy being true", async () => {
			EnvConfigModule.setEnvs({
				FEATURE_SCHOOL_POLICY_ENABLED: true,
			});
			const wrapper = mount(SchoolPage, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
					store: mockStore,
				}),
			});

			expect(wrapper.vm.schoolPolicyEnabled).toBe(true);
		});

		it("Tests env var school policy being false", async () => {
			EnvConfigModule.setEnvs({
				FEATURE_SCHOOL_POLICY_ENABLED: false,
			});
			const wrapper = mount(SchoolPage, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
					store: mockStore,
				}),
			});

			expect(wrapper.vm.schoolPolicyEnabled).toBe(false);
		});

		it("Tests whether current school year is computed right", async () => {
			const wrapper = mount(SchoolPage, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
					store: mockStore,
				}),
			});

			expect(wrapper.vm.currentSchoolYear).toStrictEqual("Schuljahr 2021/22");
		});

		it("Tests systems", async () => {
			const wrapper = mount(SchoolPage, {
				...createComponentMocks({
					i18n: true,
					vuetify: true,
					store: mockStore,
				}),
			});

			expect(wrapper.vm.systems).toBeArray(true);
			expect(wrapper.vm.systems[0].type).toStrictEqual("itslearning");
		});
	});

	// describe("existence of elements based on conditions", () => {
	// 	it("should load skeleton while loading", async () => {
	// 		const wrapper = mount(SchoolPage, {
	// 			...createComponentMocks({
	// 				i18n: true,
	// 				vuetify: true,
	// 				store: mockStore,
	// 			}),
	// 		});
	// 		// wrapper.setData({ loading: true });

	// 		// TODO: This destroys the value completely (not a computed property anymore). Find a way to mock the loading computed property.
	// 		// Object.defineProperty(wrapper.vm, "loading", {
	// 		// 	value: true,
	// 		// 	writable: true,
	// 		// });

	// 		await wrapper.vm.$nextTick();

	// 		expect(wrapper.find(".v-skeleton-loader").exists()).toBe(true);
	// 		// expect(wrapper.find(".v-expansion-panels").exists()).toBe(false);
	// 		// expect(wrapper.find(".v-list-group").exists()).toBe(false);
	// 	});
	// });
});
