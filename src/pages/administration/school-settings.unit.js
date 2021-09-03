import SchoolPage from "./school-settings";
import EnvConfigModule from "@/store/env-config";

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

const currentYear = {
	_id: "5ebd6dc14a431f75ec9a3e77",
	name: "2021/22",
	startDate: "2021-08-01T00:00:00.000Z",
	endDate: "2022-07-31T00:00:00.000Z",
	isTeamCreationByStudentsEnabled: true,
};

const generateMockStore = (options = {}) => ({
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
			getSchoolPolicyEnabled: () => {
				return true;
			},
		},
		actions: {
			fetchConsentVersions: jest.fn(),
		},
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
			getFederalState: () => {
				return federalState;
			},
			getSchool: () => {
				return school;
			},
			getLoading: () => {
				return options.loading || false;
			},
			getError: () => {
				return options.error || null;
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
});

describe("SchoolSettingPage", () => {
	beforeAll(() => {
		EnvConfigModule.setEnvs({
			FEATURE_SCHOOL_POLICY_ENABLED: true,
			I18N__AVAILABLE_LANGUAGES: "de,en,es",
			FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED: true,
			LERNSTORE_MODE: "EDUSHARING",
			FEATURE_ADMIN_TOGGLE_STUDENT_VISIBILITY_ENABLED: true,
			FEATURE_VIDEOCONFERENCE_ENABLED: true,
			ROCKETCHAT_SERVICE_ENABLED: true,
			FEATURE_MATRIX_MESSENGER_ENABLED: true,
			MATRIX_MESSENGER__SCHOOL_SETTINGS_VISIBLE: true,
			MATRIX_MESSENGER__STUDENT_ROOM_CREATION: true,
			MATRIX_MESSENGER__SCHOOL_ROOM_ENABLED: true,
			VIDEOCONFERENCE_SALT: "salt",
		});
	});
	it(...isValidComponent(SchoolPage));

	it("breadcrumbs should be visible", async () => {
		const wrapper = mount(SchoolPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: generateMockStore(),
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

	it("page title should be visible", async () => {
		const wrapper = mount(SchoolPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: generateMockStore(),
			}),
		});

		const titleElement = wrapper.find(".page-title");
		expect(titleElement.exists()).toBeTrue();
	});

	it("tests env var school policy being true", async () => {
		const wrapper = mount(SchoolPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: generateMockStore(),
			}),
		});

		expect(wrapper.vm.schoolPolicyEnabled).toBeTrue();
	});

	it("tests env var school policy being false", async () => {
		EnvConfigModule.setEnvs({
			FEATURE_SCHOOL_POLICY_ENABLED: false,
			I18N__AVAILABLE_LANGUAGES: "de,en,es",
		});
		const wrapper = mount(SchoolPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: generateMockStore(),
			}),
		});

		expect(wrapper.vm.schoolPolicyEnabled).toBe(false);
	});

	it("tests whether current school year is computed right", async () => {
		const wrapper = mount(SchoolPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: generateMockStore(),
			}),
		});

		expect(wrapper.vm.currentSchoolYear).toStrictEqual("Schuljahr 2021/22");
	});

	it("systems section should be visible and shows its data", async () => {
		const wrapper = mount(SchoolPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: generateMockStore(),
			}),
		});

		expect(wrapper.vm.systems).toBeArray(true);
		expect(wrapper.vm.systems[0].type).toStrictEqual("itslearning");
	});

	it("should load skeleton while loading", async () => {
		const wrapper = mount(SchoolPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: generateMockStore({ loading: true }),
			}),
		});

		expect(wrapper.find(".v-skeleton-loader").exists()).toBeTrue();
	});

	it("error image should visible if schoolError occured", async () => {
		const wrapper = mount(SchoolPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: generateMockStore({ error: { message: "some error" } }),
			}),
		});

		const schoolError = wrapper.find(".school-error-image");
		const noSchoolError = wrapper.find(".no-school-error");

		expect(schoolError.exists()).toBeTrue();
		expect(noSchoolError.exists()).toBeFalse();
	});
});
