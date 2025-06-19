import { LanguageType } from "@/serverApi/v3";
import { envConfigModule, schoolsModule } from "@/store";
import AuthModule from "@/store/auth";
import EnvConfigModule from "@/store/env-config";
import SchoolsModule from "@/store/schools";
import { envsFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { createStore } from "vuex";
import GeneralSettings from "./GeneralSettings";

const school = {
	id: "5f2987e020834114b8efd6f8",
	name: "Paul-Gerhardt-Gymnasium",
	federalState: {
		id: "0000b186816abba584714c53",
		counties: [
			{
				id: "5fa55eb53f472a2d986c8812",
				antaresKey: "BRB",
				countyId: 12051,
				name: "Brandenburg an der Havel",
			},
			{
				id: "5fa55eb53f472a2d986c8813",
				antaresKey: "CB",
				countyId: 12052,
				name: "Cottbus",
			},
		],
		name: "Brandenburg",
		abbreviation: "BB",
	},
	county: {
		id: "5fa55eb53f472a2d986c8812",
		antaresKey: "BRB",
		countyId: 12051,
		name: "Brandenburg an der Havel",
	},
	updatedAt: { $date: "2020-07-27T08:21:14.719Z" },
	createdAt: { $date: "2017-01-01T00:06:37.148Z" },
	currentYear: {
		id: "5ebd6dc14a431f75ec9a3e77",
		name: "2021/22",
		startDate: "2021-08-01T00:00:00.000Z",
		endDate: "2022-07-31T00:00:00.000Z",
	},
	purpose: "demo",
	officialSchoolNumber: "123",
	features: [],
};

const syncedSystem = [
	{
		_id: "0000d186816abba584714c90",
		type: "ldap",
		ldapConfig: {
			provider: "iserv-idm",
		},
	},
];
const unsyncedSystem = [
	{
		_id: "0000d186816abba584714c91",
		type: "moodle",
	},
];

const mockStore = createStore({
	"env-config": {
		getters: {
			getTeacherStudentVisibilityIsConfigurable: () => {
				return true;
			},
			getAdminToggleStudentLernstoreViewEnabled: () => {
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
});

const searchStrings = {
	schoolName: ".school-name",
	schoolNumber: ".school-number",
	schoolCounties: ".school-counties",
	schoolLogo: ".school-logo",
	languagesSelect: ".language-select",
	formButton: ".form-button",
	timezone: ".timezone-input",
	saveButton: ".button-save",
};

const mockData = {
	localSchool: {
		...school,
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
		county: {
			id: "5fa55eb53f472a2d986c8813",
			antaresKey: "CB",
			countyId: 12052,
			name: "Cottbus",
		},
		language: "de",
		timezone: "Berlin (GMT+2)",
	},
};

const getWrapper = () => {
	return mount(GeneralSettings, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n(), mockStore],
		},
	});
};

describe("GeneralSettings", () => {
	beforeEach(() => {
		setupStores({
			authModule: AuthModule,
			envConfigModule: EnvConfigModule,
			schoolsModule: SchoolsModule,
		});

		schoolsModule.setSchool(school);

		const envs = envsFactory.build({
			I18N__AVAILABLE_LANGUAGES: [
				LanguageType.De,
				LanguageType.En,
				LanguageType.Es,
			],
		});
		envConfigModule.setEnvs(envs);
	});

	describe("env-config", () => {
		it("should display select element with available languages", async () => {
			const wrapper = getWrapper();
			await wrapper.setData(mockData);

			const ele = wrapper.findComponent(searchStrings.languagesSelect);
			expect(ele.vm.$props.items).toHaveLength(3);
			expect(ele.vm.$props.items[0].name).toStrictEqual(
				"common.words.languages.de"
			);
			expect(ele.vm.$props.items[0].abbreviation).toStrictEqual("de");
			expect(ele.vm.$props.items[1].name).toStrictEqual(
				"common.words.languages.en"
			);
			expect(ele.vm.$props.items[1].abbreviation).toStrictEqual("en");
			expect(ele.vm.$props.items[2].name).toStrictEqual(
				"common.words.languages.es"
			);
			expect(ele.vm.$props.items[2].abbreviation).toStrictEqual("es");
		});
	});

	describe("displaying correct data", () => {
		it("should display the school name", async () => {
			const wrapper = getWrapper();
			await wrapper.setData(mockData);

			const ele = wrapper.findComponent(searchStrings.schoolName);
			expect(ele.vm.value).toBe("Paul-Gerhardt-Gymnasium");
		});

		it("should not be possible to edit the school name if the school is synced", async () => {
			schoolsModule.setSystems(syncedSystem);
			const wrapper = getWrapper();

			const ele = wrapper.findComponent(searchStrings.schoolName);
			expect(ele.vm.disabled).toBeTruthy();
		});

		it("should be possible to edit the school name if the school is not synced", async () => {
			schoolsModule.setSystems(unsyncedSystem);
			const wrapper = getWrapper();

			const ele = wrapper.findComponent(searchStrings.schoolName);
			expect(ele.vm.disabled).toBeFalsy();
		});

		it("should be possible to edit the school name if the school is not attached to a system", async () => {
			schoolsModule.setSystems([]);
			const wrapper = getWrapper();

			const ele = wrapper.findComponent(searchStrings.schoolName);
			expect(ele.vm.disabled).toBeFalsy();
		});

		it("school number text should be disabled if the number is set", async () => {
			const wrapper = getWrapper();
			await wrapper.setData(mockData);

			const ele = wrapper.findComponent(searchStrings.schoolNumber);
			expect(ele.vm.value).toStrictEqual("123");
			expect(ele.vm.disabled).toBeTruthy();
		});

		it("school number text should not be disabled if the number is not set", async () => {
			const wrapper = getWrapper();
			delete school.officialSchoolNumber;
			schoolsModule.setSchool(school);

			await wrapper.setData(mockData);
			const ele = wrapper.findComponent(searchStrings.schoolNumber);

			expect(ele.vm.disabled).toBeFalsy();
		});

		it("county select element should be disabled if the value is set", async () => {
			const wrapper = getWrapper();
			await wrapper.setData(mockData);

			const ele = wrapper.findComponent(searchStrings.schoolCounties);
			expect(ele.vm.disabled).toBeTruthy();
			expect(ele.vm.$props.items).toHaveLength(2);
		});

		it("county select element should NOT be disabled if the value is NOT set", async () => {
			const wrapper = getWrapper();

			mockData.localSchool.county = null;
			await wrapper.setData(mockData);

			const ele = wrapper.findComponent(searchStrings.schoolCounties);

			expect(ele.vm.disabled).toBe(false);
			expect(ele.vm.$props.items).toHaveLength(2);
		});

		it("logo element should be found", async () => {
			const wrapper = getWrapper();

			await wrapper.setData(mockData);

			const ele = wrapper.findAll(searchStrings.schoolLogo);
			expect(ele).toHaveLength(1);
		});

		it("timezone input should display the correct data", async () => {
			const wrapper = getWrapper();

			await wrapper.setData(mockData);

			const ele = wrapper.findComponent(searchStrings.timezone);
			expect(ele.props().label).toStrictEqual(
				"pages.administration.school.index.generalSettings.labels.timezone"
			);
			expect(ele.props().hint).toStrictEqual(
				"pages.administration.school.index.generalSettings.timezoneHint"
			);
		});
	});

	describe("events", () => {
		it("update button should trigger save method", async () => {
			const updateSpy = vi.spyOn(schoolsModule, "update");
			const wrapper = getWrapper();
			await wrapper.setData(mockData);

			const buttonElement = wrapper.find(searchStrings.saveButton);
			buttonElement.trigger("click");
			expect(updateSpy).toHaveBeenCalled();
		});

		it("update works without county", async () => {
			const updateSpy = vi.spyOn(schoolsModule, "update");
			const wrapper = getWrapper();
			const localMockData = {
				localSchool: { ...mockData.localSchool, county: null },
			};
			await wrapper.setData(localMockData);
			schoolsModule.setSchool({ ...school, county: null });

			const buttonElement = wrapper.find(searchStrings.saveButton);
			buttonElement.trigger("click");
			expect(updateSpy).toHaveBeenCalled();
		});
	});

	describe("when title contains < sign directly followed by a string", () => {
		it("should contain validation error", async () => {
			const wrapper = getWrapper();

			const title = wrapper.find('[data-testid="school-name"]').find("input");
			await title.setValue("<abc123");

			expect(wrapper.text()).toContain("common.validation.containsOpeningTag");
		});
	});
});
