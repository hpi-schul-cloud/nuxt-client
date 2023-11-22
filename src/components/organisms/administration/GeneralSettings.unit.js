import GeneralSettings from "./GeneralSettings";
import { envConfigModule, schoolsModule } from "@/store";
import setupStores from "@@/tests/test-utils/setupStores";
import SchoolsModule from "@/store/schools";
import EnvConfigModule from "@/store/env-config";
import AuthModule from "@/store/auth";

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
	systems: [{ $oid: "0000d186816abba584714c90" }],
	updatedAt: { $date: "2020-07-27T08:21:14.719Z" },
	createdAt: { $date: "2017-01-01T00:06:37.148Z" },
	currentYear: {
		_id: { $oid: "5ebd6dc14a431f75ec9a3e77" },
		name: "2021/22",
		startDate: "2021-08-01T00:00:00.000Z",
		endDate: "2022-07-31T00:00:00.000Z",
	},
	purpose: "demo",
	enableStudentTeamCreation: false,
	officialSchoolNumber: "123",
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

const generateMockStore = {
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
};

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
			antaresKey: "CB",
			_id: "5fa55eb53f472a2d986c8813",
			countyId: 12052,
			name: "Cottbus",
		},
		language: "de",
		timezone: "Berlin (GMT+2)",
	},
};

describe("GeneralSettings", () => {
	beforeEach(() => {
		setupStores({
			authModule: AuthModule,
			envConfigModule: EnvConfigModule,
			schoolsModule: SchoolsModule,
		});

		schoolsModule.setSchool(school);
		schoolsModule.setFederalState(federalState);
		schoolsModule.setSystems(syncedSystem);

		envConfigModule.setEnvs({
			I18N__AVAILABLE_LANGUAGES: "de,en,es",
		});
	});

	describe("env-config", () => {
		it("should display select element with available languages", async () => {
			const wrapper = mount(GeneralSettings, {
				...createComponentMocks({
					i18n: true,
					store: generateMockStore,
					vuetify: true,
				}),
			});

			await wrapper.setData(mockData);

			const ele = wrapper.find(searchStrings.languagesSelect);
			expect(ele.vm.$props.items).toHaveLength(3);
			expect(ele.vm.$props.items[0].name).toStrictEqual("Deutsch");
			expect(ele.vm.$props.items[0].abbreviation).toStrictEqual("de");
			expect(ele.vm.$props.items[1].name).toStrictEqual("Englisch");
			expect(ele.vm.$props.items[1].abbreviation).toStrictEqual("en");
			expect(ele.vm.$props.items[2].name).toStrictEqual("Spanisch");
			expect(ele.vm.$props.items[2].abbreviation).toStrictEqual("es");
		});
	});

	describe("displaying correct data", () => {
		it("should display the school name", async () => {
			const wrapper = mount(GeneralSettings, {
				...createComponentMocks({
					i18n: true,
					store: generateMockStore,
					vuetify: true,
				}),
			});
			await wrapper.setData(mockData);

			const ele = wrapper.find(searchStrings.schoolName);
			expect(ele.vm.value).toBe("Paul-Gerhardt-Gymnasium");
		});

		it("should not be possible to edit the school name if the school is synced", async () => {
			const wrapper = mount(GeneralSettings, {
				...createComponentMocks({
					i18n: true,
					store: generateMockStore,
					vuetify: true,
				}),
			});
			await wrapper.setData(mockData);

			const ele = wrapper.find(searchStrings.schoolName);
			expect(ele.vm.disabled).toBeTruthy();
		});

		it("should be possible to edit the school name if the school is not synced", async () => {
			const wrapper = mount(GeneralSettings, {
				...createComponentMocks({
					i18n: true,
					store: generateMockStore,
					vuetify: true,
				}),
			});
			const localMockData = {
				localSchool: {
					...mockData.localSchool,
					systems: [{ $oid: unsyncedSystem[0]._id }],
				},
			};
			schoolsModule.setSystems(unsyncedSystem);
			await wrapper.setData(localMockData);

			const ele = wrapper.find(searchStrings.schoolName);
			expect(ele.vm.disabled).toBeFalsy();
		});

		it("should be possible to edit the school name if the school is not attached to a system", async () => {
			const wrapper = mount(GeneralSettings, {
				...createComponentMocks({
					i18n: true,
					store: generateMockStore,
					vuetify: true,
				}),
			});
			schoolsModule.setSystems([]);
			await wrapper.setData(mockData);

			const ele = wrapper.find(searchStrings.schoolName);
			expect(ele.vm.disabled).toBeFalsy();
		});

		it("school number text should be disabled if the number is set", async () => {
			const wrapper = mount(GeneralSettings, {
				...createComponentMocks({
					i18n: true,
					store: generateMockStore,
					vuetify: true,
				}),
			});
			await wrapper.setData(mockData);

			const ele = wrapper.find(searchStrings.schoolNumber);
			expect(ele.vm.value).toStrictEqual("123");
			expect(ele.vm.disabled).toBeTruthy();
		});

		it("school number text should not be disabled if the number is not set", async () => {
			const wrapper = mount(GeneralSettings, {
				...createComponentMocks({
					i18n: true,
					store: generateMockStore,
					vuetify: true,
				}),
			});

			delete school.officialSchoolNumber;
			await wrapper.setData(mockData);

			const ele = wrapper.find(searchStrings.schoolNumber);
			expect(ele.vm.disabled).toBeFalsy();
		});

		it("county select element should be disabled if the value is set", async () => {
			const wrapper = mount(GeneralSettings, {
				...createComponentMocks({
					i18n: true,
					store: generateMockStore,
					vuetify: true,
				}),
			});
			await wrapper.setData(mockData);

			const ele = wrapper.find(searchStrings.schoolCounties);
			expect(ele.vm.disabled).toBeTruthy();
			expect(ele.vm.$props.items).toHaveLength(2);
		});

		it("county select element should NOT be disabled if the value is NOT set", async () => {
			const wrapper = mount(GeneralSettings, {
				...createComponentMocks({
					i18n: true,
					store: generateMockStore,
					vuetify: true,
				}),
			});

			mockData.localSchool.county = null;
			await wrapper.setData(mockData);

			const ele = wrapper.find(searchStrings.schoolCounties);

			expect(ele.vm.disabled).toBe(false);
			expect(ele.vm.$props.items).toHaveLength(2);
		});

		it("logo element should be found", async () => {
			const wrapper = mount(GeneralSettings, {
				...createComponentMocks({
					i18n: true,
					store: generateMockStore,
					vuetify: true,
				}),
			});

			await wrapper.setData(mockData);

			const ele = wrapper.findAll(searchStrings.schoolLogo);
			expect(ele).toHaveLength(1);
		});

		it("timezone input should display the correct data", async () => {
			const wrapper = mount(GeneralSettings, {
				...createComponentMocks({
					i18n: true,
					store: generateMockStore,
					vuetify: true,
				}),
			});

			await wrapper.setData(mockData);

			const ele = wrapper.find(searchStrings.timezone);
			expect(ele.element.textContent).toStrictEqual(
				"ZeitzoneUm die Zeitzone für die Schule zu ändern, wenden Sie sich bitte an einen Admin."
			);
		});
	});

	describe("events", () => {
		it("update button should trigger save method", async () => {
			const updateSpy = jest.spyOn(schoolsModule, "update");
			const wrapper = mount(GeneralSettings, {
				...createComponentMocks({
					i18n: true,
					store: generateMockStore,
					vuetify: true,
				}),
			});
			await wrapper.setData(mockData);

			const buttonElement = wrapper.find(searchStrings.saveButton);
			buttonElement.trigger("click");
			expect(updateSpy).toHaveBeenCalled();
		});

		it("update works without county", async () => {
			const updateSpy = jest.spyOn(schoolsModule, "update");
			const wrapper = mount(GeneralSettings, {
				...createComponentMocks({
					i18n: true,
					store: generateMockStore,
					vuetify: true,
				}),
			});
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
});
