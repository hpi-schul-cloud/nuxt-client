import SchoolPage from "./SchoolSettings.page.vue";
import { envConfigModule, schoolsModule } from "@/store";
import setupStores from "@@/tests/test-utils/setupStores";
import EnvConfigModule from "@/store/env-config";
import SchoolsModule from "@/store/schools";
import AuthModule from "@/store/auth";
import { ApplicationError } from "@/store/types/application-error";

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

const federalState = {
	_id: "00001234597947823",
	counties: [
		{
			antaresKey: "BRB",
			_id: "00001234597998793",
			countyId: 12051,
			name: "Brandenburg an der Havel",
		},
		{
			antaresKey: "CB",
			_id: "00001234597913216",
			countyId: 12052,
			name: "Cottbus",
		},
	],
	name: "Brandenburg",
	abbreviation: "BB",
	logoUr:
		"https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Brandenburg_Wappen.svg/354px-Brandenburg_Wappen.svg.png",
	__v: 0,
};

const systems = [{ _id: "123", type: "itslearning" }];

const envs = {
	NOT_AUTHENTICATED_REDIRECT_URL: "/login",
	JWT_SHOW_TIMEOUT_WARNING_SECONDS: 3600,
	JWT_TIMEOUT_SECONDS: 7200,
	SC_THEME: "default",
	LERNSTORE_MODE: "__vue_devtool_undefined__",
	ADMIN_TABLES_DISPLAY_CONSENT_COLUMN: true,
	FEATURE_ES_COLLECTIONS_ENABLED: true,
	FEATURE_EXTENSIONS_ENABLED: true,
	FEATURE_TEAMS_ENABLED: true,
	FEATURE_ADMIN_TOGGLE_STUDENT_LERNSTORE_VIEW_ENABLED: true,
	TEACHER_STUDENT_VISIBILITY__IS_CONFIGURABLE: true,
	FEATURE_SCHOOL_POLICY_ENABLED: true,
	FEATURE_VIDEOCONFERENCE_ENABLED: true,
	FEATURE_SCHOOL_SANIS_USER_MIGRATION_ENABLED: true,
	ROCKETCHAT_SERVICE_ENABLED: true,
	I18N__AVAILABLE_LANGUAGES: "de,en,es",
	I18N__DEFAULT_LANGUAGE: "de",
	I18N__DEFAULT_TIMEZONE: "Europe/Berlin",
	I18N__FALLBACK_LANGUAGE: "de",
	DOCUMENT_BASE_DIR: "https://s3.hidrive.strato.com/cloud-instances/",
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
				return year;
			},
		},
		actions: {
			update: jest.fn(),
			fetchCurrentYear: jest.fn(),
		},
	},
};

setupStores({
	authModule: AuthModule,
	envConfigModule: EnvConfigModule,
	schoolsModule: SchoolsModule,
});

const fetchYearSpy = jest
	.spyOn(schoolsModule, "fetchCurrentYear")
	.mockImplementation(() => {
		schoolsModule.setCurrentYear(year);
	});
const fetchSystemsSpy = jest
	.spyOn(schoolsModule, "fetchSystems")
	.mockImplementation(() => {
		schoolsModule.setSystems(systems);
	});
const fetchFederalStateSpy = jest
	.spyOn(schoolsModule, "fetchFederalState")
	.mockImplementation(() => {
		schoolsModule.setFederalState(federalState);
	});
const short_name = "instance name";

describe("SchoolSettingPage", () => {
	beforeEach(() => {
		// schoolsModule.setSchool(school);
		// schoolsModule.setFederalState(federalState);
		schoolsModule.setCurrentYear(year);
		schoolsModule.setSystems([]);
		schoolsModule.setFederalState(federalState);
		envConfigModule.setEnvs(envs);
	});
	it("tests env var school policy being true", () => {
		const wrapper = shallowMount(SchoolPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
			mocks: {
				$theme: {
					short_name,
				},
			},
		});

		expect(wrapper.vm.schoolPolicyEnabled).toBeTruthy();
	});

	it("tests env var school policy being false", () => {
		envConfigModule.setEnvs({
			FEATURE_SCHOOL_POLICY_ENABLED: false,
			I18N__AVAILABLE_LANGUAGES: "de,en,es",
		});
		const wrapper = shallowMount(SchoolPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
			mocks: {
				$theme: {
					short_name,
				},
			},
		});

		expect(wrapper.vm.schoolPolicyEnabled).toBeFalsy();
	});

	it("tests env var school oauth migration being true", () => {
		envConfigModule.setEnvs({
			FEATURE_SCHOOL_SANIS_USER_MIGRATION_ENABLED: true,
			I18N__AVAILABLE_LANGUAGES: "de,en,es",
		});
		const wrapper = shallowMount(SchoolPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
			mocks: {
				$theme: {
					short_name,
				},
			},
		});

		expect(wrapper.vm.isOauthMigrationEnabled).toBe(true);
	});

	it("tests env var school oauth migration being false", () => {
		envConfigModule.setEnvs({
			FEATURE_SCHOOL_SANIS_USER_MIGRATION_ENABLED: false,
			I18N__AVAILABLE_LANGUAGES: "de,en,es",
		});
		const wrapper = shallowMount(SchoolPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
			mocks: {
				$theme: {
					short_name,
				},
			},
		});

		expect(wrapper.vm.isOauthMigrationEnabled).toBe(false);
	});

	it("tests whether current school year is computed right", () => {
		const wrapper = shallowMount(SchoolPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			mocks: {
				$theme: {
					short_name,
				},
			},
		});

		expect(wrapper.vm.currentSchoolYear).toStrictEqual("Schuljahr 2021/22");
	});

	it("systems section should be visible and shows its data", () => {
		const wrapper = shallowMount(SchoolPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			mocks: {
				$theme: {
					short_name,
				},
			},
		});

		expect(Array.isArray(wrapper.vm.systems)).toBeTruthy();
		expect(wrapper.vm.systems[0].type).toStrictEqual("itslearning");
	});

	it("AdminMigrationSection should be visible", () => {
		const wrapper = shallowMount(SchoolPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
				store: mockStore,
			}),
			mocks: {
				$theme: {
					short_name,
				},
			},
		});

		expect(
			wrapper.findComponent({ name: "admin-migration-section" }).exists()
		).toStrictEqual(true);
	});

	it("AdminMigrationSection should not be visible", () => {
		envConfigModule.setEnvs({
			FEATURE_SCHOOL_SANIS_USER_MIGRATION_ENABLED: false,
			I18N__AVAILABLE_LANGUAGES: "de,en,es",
		});
		const wrapper = shallowMount(SchoolPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			mocks: {
				$theme: {
					short_name,
				},
			},
		});

		expect(
			wrapper.findComponent({ name: "admin-migration-section" }).exists()
		).toStrictEqual(false);
	});

	it("should load skeleton while loading", () => {
		schoolsModule.setLoading(true);
		const wrapper = shallowMount(SchoolPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			mocks: {
				$theme: {
					short_name,
				},
			},
		});

		expect(wrapper.findComponent({ name: "v-skeleton-loader" }).exists()).toBe(
			true
		);
	});

	it("error image should visible if schoolError occurred", () => {
		schoolsModule.setError({ error: { message: "some errors" } });
		const wrapper = shallowMount(SchoolPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			mocks: {
				$theme: {
					short_name,
				},
			},
		});

		const schoolError = wrapper.find(".school-error-image");
		const noSchoolError = wrapper.find(".no-school-error");

		expect(schoolError.exists()).toBeTruthy();
		expect(noSchoolError.exists()).toBeFalsy();
	});

	it("error message in should be visible if schoolError occurred", () => {
		schoolsModule.setError(
			new ApplicationError(500, "pages.administration.school.index.error")
		);
		const wrapper = shallowMount(SchoolPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			mocks: {
				$theme: {
					short_name,
				},
			},
		});

		const text = wrapper.findComponent({ name: "v-alert" }).text();

		expect(text).toStrictEqual(
			"Beim Laden der Schule ist ein Fehler aufgetreten"
		);
	});

	it("should load needed data form server", async () => {
		const wrapper = shallowMount(SchoolPage, {
			...createComponentMocks({
				i18n: true,
				vuetify: true,
			}),
			mocks: {
				$theme: {
					short_name,
				},
			},
		});
		await wrapper.vm.$nextTick();
		expect(fetchYearSpy).toHaveBeenCalled();
		expect(fetchSystemsSpy).toHaveBeenCalled();
		expect(fetchFederalStateSpy).toHaveBeenCalled();
	});
});
