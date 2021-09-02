import SchoolPage from "./school-settings";
import EnvConfigModule from "@/store/env-config";
import SchoolsModule from "@/store/schools";

const school = {
	_id: { $oid: "5f2987e020834114b8efd6f8" },
	name: "Paul-Gerhardt-Gymnasium",
	federalState: { $oid: "0000b186816abba584714c53" },
	county: {
		antaresKey: "BRB",
		_id: { $oid: "5fa55eb53f472a2d986c8812" },
		countyId: 12051,
		name: "Brandenburg an der Havel",
	},
	systems: [
		{ $oid: "0000d186816abba584714c91" },
		{ $oid: "0000d186816abba584714c90" },
	],
	updatedAt: { $date: "2020-07-27T08:21:14.719Z" },
	createdAt: { $date: "2017-01-01T00:06:37.148Z" },
	__v: 0,
	currentYear: { $oid: "5ebd6dc14a431f75ec9a3e77" },
	purpose: "demo",
	enableStudentTeamCreation: false,
	officialSchoolNumber: "123",
	features: {
		rocketChat: false,
		videoconference: false,
		messenger: false,
		studentVisibility: false,
		messengerSchoolRoom: false,
		messengerStudentRoomCreate: false,
	},
};

const federalState = {
	_id: "0000b186816abba584714c53",
	counties: [
		{
			antaresKey: "BRB",
			_id: "5fa55eb53f472a2d986c8812",
			countyId: 12051,
			name: "Brandenburg an der Havel",
		},
		{
			antaresKey: "CB",
			_id: "5fa55eb53f472a2d986c8813",
			countyId: 12052,
			name: "Cottbus",
		},
	],
	name: "Brandenburg",
	abbreviation: "BB",
};

const year = {
	_id: "5ebd6dc14a431f75ec9a3e77",
	name: "2021/22",
	startDate: "2021-08-01T00:00:00.000Z",
	endDate: "2022-07-31T00:00:00.000Z",
	isTeamCreationByStudentsEnabled: true,
};

const systems = [{ _id: "123", type: "itslearning" }];

const envs = {
	NOT_AUTHENTICATED_REDIRECT_URL: "/login",
	JWT_SHOW_TIMEOUT_WARNING_SECONDS: 3600,
	JWT_TIMEOUT_SECONDS: 7200,
	SC_THEME: "default",
	FEATURE_MATRIX_MESSENGER_ENABLED: false,
	MATRIX_MESSENGER__EMBED_URI: "__vue_devtool_undefined__",
	MATRIX_MESSENGER__URI: "__vue_devtool_undefined__",
	MATRIX_MESSENGER__DISCOVER_URI: "__vue_devtool_undefined__",
	LERNSTORE_MODE: "__vue_devtool_undefined__",
	ADMIN_TABLES_DISPLAY_CONSENT_COLUMN: true,
	FEATURE_ES_COLLECTIONS_ENABLED: false,
	FEATURE_EXTENSIONS_ENABLED: true,
	FEATURE_TEAMS_ENABLED: true,
	FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED: true,
	FEATURE_ADMIN_TOGGLE_STUDENT_VISIBILITY_ENABLED: true,
	FEATURE_SCHOOL_POLICY_ENABLED: false,
	FEATURE_VIDEOCONFERENCE_ENABLED: true,
	ROCKETCHAT_SERVICE_ENABLED: false,
	I18N__AVAILABLE_LANGUAGES: "de,en,es",
	I18N__DEFAULT_LANGUAGE: "de",
	I18N__DEFAULT_TIMEZONE: "Europe/Berlin",
	I18N__FALLBACK_LANGUAGE: "de",
	DOCUMENT_BASE_DIR: "https://s3.hidrive.strato.com/schul-cloud-hpi/",
	MATRIX_MESSENGER__SCHOOL_SETTINGS_VISIBLE: false,
	MATRIX_MESSENGER__STUDENT_ROOM_CREATION: false,
	MATRIX_MESSENGER__SCHOOL_ROOM_ENABLED: false,
	SC_TITLE: "HPI Schul-Cloud",
	SC_SHORT_TITLE: "HPI Schul-Cloud",
};

const mockStore = {
	"consent-versions": {
		actions: {
			addConsentVersion: jest.fn(),
			fetchConsentVersions: jest.fn(),
		},
		getters: {
			getError: () => {},
			getLoading: () => false,
			getConsentVersions: () => {},
		},
	},
};

describe("SchoolSettingPage", () => {
	beforeEach(() => {
		SchoolsModule.setSchool(school);
		SchoolsModule.setFederalState(federalState);
		SchoolsModule.setCurrentYear(year);
		SchoolsModule.setSystems(systems);
		EnvConfigModule.setEnvs(envs);
	});
	it(...isValidComponent(SchoolPage));

	describe("testing getters", () => {
		it("Tests env var school policy being true", async () => {
			EnvConfigModule.setEnvs({ ...envs, FEATURE_SCHOOL_POLICY_ENABLED: true });
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
				...envs,
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
