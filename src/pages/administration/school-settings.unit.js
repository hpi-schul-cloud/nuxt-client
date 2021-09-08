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
	currentYear: { $oid: "5ebd6dc14a431f75ec9a3e77" },
	purpose: "demo",
	enableStudentTeamCreation: false,
	officialSchoolNumber: "123",
	features: {
		rocketChat: true,
		videoconference: true,
		messenger: true,
		messengerSchoolRoom: true,
		messengerStudentRoomCreate: true,
		studentVisibility: true,
	},
	permissions: {
		teacher: {
			STUDENT_LIST: true,
		},
		student: {
			LERNSTORE_VIEW: true,
		},
	},
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
	FEATURE_MATRIX_MESSENGER_ENABLED: true,
	MATRIX_MESSENGER__EMBED_URI: "__vue_devtool_undefined__",
	MATRIX_MESSENGER__URI: "__vue_devtool_undefined__",
	MATRIX_MESSENGER__DISCOVER_URI: "__vue_devtool_undefined__",
	LERNSTORE_MODE: "__vue_devtool_undefined__",
	ADMIN_TABLES_DISPLAY_CONSENT_COLUMN: true,
	FEATURE_ES_COLLECTIONS_ENABLED: true,
	FEATURE_EXTENSIONS_ENABLED: true,
	FEATURE_TEAMS_ENABLED: true,
	FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED: true,
	FEATURE_ADMIN_TOGGLE_STUDENT_VISIBILITY_ENABLED: true,
	FEATURE_SCHOOL_POLICY_ENABLED: true,
	FEATURE_VIDEOCONFERENCE_ENABLED: true,
	ROCKETCHAT_SERVICE_ENABLED: true,
	I18N__AVAILABLE_LANGUAGES: "de,en,es",
	I18N__DEFAULT_LANGUAGE: "de",
	I18N__DEFAULT_TIMEZONE: "Europe/Berlin",
	I18N__FALLBACK_LANGUAGE: "de",
	DOCUMENT_BASE_DIR: "https://s3.hidrive.strato.com/schul-cloud-hpi/",
	MATRIX_MESSENGER__SCHOOL_SETTINGS_VISIBLE: true,
	MATRIX_MESSENGER__STUDENT_ROOM_CREATION: true,
	MATRIX_MESSENGER__SCHOOL_ROOM_ENABLED: true,
	SC_TITLE: "HPI Schul-Cloud",
	SC_SHORT_TITLE: "HPI Schul-Cloud",
};

const mockStore = {
	"env-config": {
		// actions: {
		// 	fetchConsentVersions: jest.fn(),
		// },
	},
	"consent-versions": {
		getters: {
			getConsentVersions: () => {
				return [];
			},
			getLoading: () => {
				return false;
			},
			getError: () => {
				return null;
			},
		},
		actions: {
			addConsentVersion: jest.fn(),
			fetchConsentVersions: jest.fn(),
		},
	},
	schools: {
		getters: {
			getSchool: () => {
				return school;
			},
			getLoading: () => {
				return false;
			},
			getError: () => {
				return null;
			},
			getSystems: () => {
				return [{ _id: "123", type: "itslearning" }];
			},
			getCurrentYear: () => {
				return currentYear;
			},
		},
		actions: {
			update: jest.fn(),
			fetchCurrentYear: jest.fn(),
		},
	},
};

describe("SchoolSettingPage", () => {
	beforeEach(() => {
		// SchoolsModule.setSchool(school);
		// SchoolsModule.setFederalState(federalState);
		SchoolsModule.setCurrentYear(year);
		SchoolsModule.setSystems(systems);
		EnvConfigModule.setEnvs(envs);
	});
	it(...isValidComponent(SchoolPage));

	it("breadcrumbs should be visible", () => {
		const wrapper = mount(SchoolPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
		});

		const breadcrumbs = wrapper.find(".v-breadcrumbs");

		expect(breadcrumbs.exists()).toBeTrue();
		expect(wrapper.vm.$data.breadcrumbs[0].href).toStrictEqual(
			"/administration/"
		);
		expect(wrapper.vm.$data.breadcrumbs[0].text).toStrictEqual(
			"Administration"
		);
		expect(wrapper.vm.$data.breadcrumbs[1].disabled).toBeTrue();
		expect(wrapper.vm.$data.breadcrumbs[1].text).toStrictEqual(
			"Schule verwalten"
		);
	});

	it("page title should be visible", () => {
		const wrapper = mount(SchoolPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
		});

		const titleElement = wrapper.find(".page-title");
		expect(titleElement.exists()).toBeTrue();
	});

	it("tests env var school policy being true", () => {
		const wrapper = mount(SchoolPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
		});

		expect(wrapper.vm.schoolPolicyEnabled).toBeTrue();
	});

	it("tests env var school policy being false", () => {
		EnvConfigModule.setEnvs({
			FEATURE_SCHOOL_POLICY_ENABLED: false,
			I18N__AVAILABLE_LANGUAGES: "de,en,es",
		});
		const wrapper = mount(SchoolPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
		});

		expect(wrapper.vm.schoolPolicyEnabled).toBeFalse();
	});

	it("tests whether current school year is computed right", () => {
		const wrapper = mount(SchoolPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
		});

		expect(wrapper.vm.currentSchoolYear).toStrictEqual("Schuljahr 2021/22");
	});

	it("systems section should be visible and shows its data", () => {
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

	it("should load skeleton while loading", () => {
		SchoolsModule.setLoading(true);
		const wrapper = mount(SchoolPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
		});

		expect(wrapper.find(".v-skeleton-loader").exists()).toBeTrue();
	});

	it("error image should visible if schoolError occured", () => {
		SchoolsModule.setError({ error: { message: "some errors" } });
		const wrapper = mount(SchoolPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
		});

		const schoolError = wrapper.find(".school-error-image");
		const noSchoolError = wrapper.find(".no-school-error");

		expect(schoolError.exists()).toBeTrue();
		expect(noSchoolError.exists()).toBeFalse();
	});
});
