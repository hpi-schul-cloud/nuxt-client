import {
	ImportUserListResponse,
	ImportUserResponseRoleNamesEnum,
	SchulcloudTheme,
} from "@/serverApi/v3";
import { envConfigModule, importUsersModule, schoolsModule } from "@/store";
import EnvConfigModule from "@/store/env-config";
import ImportUsersModule, { MatchedBy } from "@/store/import-users";
import SchoolsModule from "@/store/schools";
import { schoolFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { VDataTable } from "vuetify/lib/components/index.mjs";
import ImportUsers from "./ImportUsers.vue";

const mockImportUsers: ImportUserListResponse = {
	total: 3,
	skip: 0,
	limit: 3,
	data: [
		{
			flagged: true,
			importUserId: "61f40e790da0925bf739c12f",
			loginName: "aaronb1",
			firstName: "Aaron",
			lastName: "Bruns",
			roleNames: [ImportUserResponseRoleNamesEnum.Student],
			classNames: ["6a"],
			externalRoleNames: [],
		},
		{
			flagged: false,
			importUserId: "61f40e7b0da0925bf739c6c9",
			loginName: "armin.cordes",
			firstName: "Armin",
			lastName: "Cordes",
			roleNames: [ImportUserResponseRoleNamesEnum.Teacher],
			classNames: [],
			externalRoleNames: [],
		},
		{
			flagged: false,
			importUserId: "61f40e7b0da0925bf739c6d3",
			loginName: "bettina.melzer",
			firstName: "Bettina",
			lastName: "Melzer",
			roleNames: [
				ImportUserResponseRoleNamesEnum.Admin,
				ImportUserResponseRoleNamesEnum.Teacher,
			],
			classNames: ["1c"],
			externalRoleNames: [],
		},
	],
};

const mockData = {
	MatchedBy: { Admin: "admin", Auto: "auto", None: "none" },
	defaultItem: {
		firstName: "",
		lastName: "",
		loginName: "",
		roleNames: [],
		classNames: [],
		match: {},
		flagged: false,
	},
	delay: 500,
	dialogEdit: false,
	editedIndex: -1,
	loading: false,
	mdiAccountPlus: "mdiAccountPlus",
	mdiAccountSwitch: "mdiAccountSwitch",
	mdiAccountSwitchOutline: "mdiAccountSwitchOutline",
	mdiFlag: "mdiFlag",
	mdiFlagOutline: "mdiFlagOutline",
	mdiPencilOutline: "mdiPencilOutline",
	roles: [
		{ text: "Schüler/-in", value: "student" },
		{ text: "Lehrer/-in", value: "teacher" },
		{ text: "Administrator", value: "admin" },
	],
	search: "",
	searchClasses: "",
	searchFirstName: "",
	searchFlagged: false,
	searchLastName: "",
	searchLoginName: "",
	searchMatchedBy: [],
	searchRole: "",
};

const getWrapper = (data?: object, options?: object) => {
	return mount(ImportUsers, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
			mocks: {
				$theme: {
					name: "nbc",
				},
			},
		},
		data: () => data,
		...options,
	});
};

describe("@/components/molecules/importUsers", () => {
	beforeEach(() => {
		document.body.setAttribute("data-app", "true");
		setupStores({
			schoolsModule: SchoolsModule,
			importUsersModule: ImportUsersModule,
			envConfigModule: EnvConfigModule,
		});
		importUsersModule.setImportUsersList(mockImportUsers);
		envConfigModule.env.SC_THEME = SchulcloudTheme.Default;
		schoolsModule.setSchool(
			schoolFactory.build({
				inUserMigration: true,
				inMaintenance: true,
			})
		);
	});

	it("should have correct props", () => {
		const wrapper = getWrapper(mockData);

		expect(wrapper.vm.importUsers).toStrictEqual(mockImportUsers.data);
		expect(wrapper.vm.roles).toStrictEqual(mockData.roles);
	});

	it("alert section should visible/invisible according to 'canStartMigration' value", async () => {
		schoolsModule.setSchool(
			schoolFactory.build({
				inUserMigration: false,
				inMaintenance: false,
			})
		);

		const wrapper = getWrapper(mockData);

		const alertElement = wrapper.findAll(".v-alert");
		expect(alertElement).toHaveLength(1);
		expect(alertElement[0].element.textContent).toContain(
			wrapper.vm.$t("pages.administration.migration.cannotStart")
		);

		schoolsModule.setSchool(
			schoolFactory.build({
				inUserMigration: true,
				inMaintenance: true,
			})
		);
		await nextTick();

		const invisibleAlertElement = wrapper.findAll(".v-alert");
		expect(invisibleAlertElement).toHaveLength(0);
	});

	it("alert section should be visible/invisible according to 'canStartMigration' value", async () => {
		schoolsModule.setSchool(
			schoolFactory.build({
				inUserMigration: false,
				inMaintenance: true,
			})
		);

		const wrapper = getWrapper({
			...mockData,
		});

		const visibleAlertElement = wrapper.findAll(".v-alert");
		expect(visibleAlertElement).toHaveLength(1);

		schoolsModule.setSchool(
			schoolFactory.build({
				inUserMigration: true,
				inMaintenance: true,
			})
		);
		await nextTick();

		const invisibleAlertElement = wrapper.findAll(".v-alert");
		expect(invisibleAlertElement).toHaveLength(0);
	});

	it("data table should have correct props", async () => {
		const wrapper = getWrapper(mockData);

		const dataTableElement = wrapper.findComponent<VDataTable>(".v-data-table");

		expect(dataTableElement.vm.headers).toStrictEqual(wrapper.vm.tableHead);
		expect(dataTableElement.vm.items).toStrictEqual(mockImportUsers.data);
	});

	describe("should search with all columns", () => {
		const setup = () => {
			const wrapper = getWrapper(mockData);

			const getDataFromApiSpy = jest.spyOn(wrapper.vm, "getDataFromApi");

			return {
				wrapper,
				getDataFromApiSpy,
			};
		};

		afterEach(() => {
			jest.clearAllMocks();
		});

		it("should set search data properties when search first name changes", async () => {
			const { wrapper, getDataFromApiSpy } = setup();

			const searchFirstNameElement = wrapper.getComponent(
				'[data-testid="search-first-name"]'
			);

			await searchFirstNameElement.setValue("some text");

			expect(wrapper.vm.searchFirstName).toStrictEqual("some text");
			expect(getDataFromApiSpy).toHaveBeenCalled();
		});

		it("should set search data properties when search last name changes", async () => {
			const { wrapper, getDataFromApiSpy } = setup();

			const searchLastNameElement = wrapper.getComponent(
				'[data-testid="search-last-name"]'
			);
			await searchLastNameElement.setValue("some text");

			expect(wrapper.vm.searchLastName).toStrictEqual("some text");
			expect(getDataFromApiSpy).toHaveBeenCalled();
		});

		it("should set search data properties when search username changes", async () => {
			const { wrapper, getDataFromApiSpy } = setup();

			const searchLoginNameElement = wrapper.getComponent(
				'[data-testid="search-login-name"]'
			);
			await searchLoginNameElement.setValue("some text");

			expect(wrapper.vm.searchLoginName).toStrictEqual("some text");
			expect(getDataFromApiSpy).toHaveBeenCalled();
		});

		it("should set search data properties when search role changes", async () => {
			const { wrapper, getDataFromApiSpy } = setup();

			const searchRoleElement = wrapper.getComponent(
				'[data-testid="search-role"]'
			);
			await searchRoleElement.setValue("role search");

			expect(wrapper.vm.searchRole).toStrictEqual("role search");
			expect(getDataFromApiSpy).toHaveBeenCalled();
		});

		it("should set search data properties when search classes changes", async () => {
			const { wrapper, getDataFromApiSpy } = setup();

			const searchClassesElement = wrapper.getComponent(
				'[data-testid="search-classes"]'
			);
			await searchClassesElement.setValue("class search");

			expect(wrapper.vm.searchClasses).toStrictEqual("class search");
			expect(getDataFromApiSpy).toHaveBeenCalled();
		});

		it("should search data proprieties when match filter is set", async () => {
			const { wrapper } = setup();

			const searchMatchedByNoneElement = wrapper.getComponent(
				'[data-testid="search-matched-by-none"]'
			);
			const searchMatchedByAdminElement = wrapper.getComponent(
				'[data-testid="search-matched-by-admin"]'
			);
			const searchMatchedByAutoElement = wrapper.getComponent(
				'[data-testid="search-matched-by-auto"]'
			);

			await searchMatchedByNoneElement.trigger("click");
			expect(wrapper.vm.searchMatchedBy).toStrictEqual([MatchedBy.None]);

			await searchMatchedByAdminElement.trigger("click");
			expect(wrapper.vm.searchMatchedBy).toStrictEqual([
				MatchedBy.None,
				MatchedBy.Admin,
			]);

			await searchMatchedByAutoElement.trigger("click");
			expect(wrapper.vm.searchMatchedBy).toStrictEqual([
				MatchedBy.None,
				MatchedBy.Admin,
				MatchedBy.Auto,
			]);
		});

		it("should set search data proprieties when flag filter is toggle", async () => {
			const { wrapper, getDataFromApiSpy } = setup();

			const searchFlaggedElement = wrapper.getComponent(
				'[data-testid="search-flagged"]'
			);
			await searchFlaggedElement.trigger("click");
			expect(wrapper.vm.searchFlagged).toBeTruthy();

			await searchFlaggedElement.trigger("click");
			expect(wrapper.vm.searchFlagged).toBeFalsy();

			expect(getDataFromApiSpy).toHaveBeenCalled();
		});
	});

	describe("should sort by column", () => {
		let getDataFromApiSpy: any;
		let wrapper: any;
		beforeEach(async () => {
			getDataFromApiSpy = jest.fn();
			wrapper = getWrapper(mockData);
			wrapper.vm.getDataFromApi = getDataFromApiSpy;
			wrapper.vm.school.inMaintenance = true;
			wrapper.vm.school.inUserMigration = true;
			await nextTick();
		});

		afterEach(() => {
			getDataFromApiSpy.mockClear();
		});

		it("should sort by first name", async () => {
			const sortFirstNameElement = wrapper.find(
				'[data-testid="head-first-name"]'
			);
			await sortFirstNameElement.trigger("click");

			expect(wrapper.vm.options.sortBy[0].key).toEqual("firstName");
			expect(wrapper.vm.options.sortBy[0].order).toEqual("asc");

			await sortFirstNameElement.trigger("click");
			expect(wrapper.vm.options.sortBy[0].order).toEqual("desc");

			getDataFromApiSpy.mockClear();
		});

		it("should sort by last name", async () => {
			const sortLastNameElement = wrapper.find(
				'[data-testid="head-last-name"]'
			);
			await sortLastNameElement.trigger("click");

			expect(wrapper.vm.options.sortBy[0].key).toBe("lastName");
			expect(wrapper.vm.options.sortBy[0].order).toBe("asc");

			await sortLastNameElement.trigger("click");
			expect(wrapper.vm.options.sortBy[0].order).toBe("desc");

			getDataFromApiSpy.mockClear();
		});
	});
});
