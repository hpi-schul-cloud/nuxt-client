import { mount } from "@vue/test-utils";
import ImportUsers from "./ImportUsers.vue";
import ImportUsersModule, { MatchedBy } from "@store/import-users";
import setupStores from "@@/tests/test-utils/setupStores";
import SchoolsModule from "@/store/schools";

declare var createComponentMocks: Function;

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
	editedItem: {
		firstName: "",
		lastName: "",
		loginName: "",
		roleNames: [],
		classNames: [],
		match: {},
		flagged: false,
	},
	importUsers: [
		{
			flagged: true,
			importUserId: "61f40e790da0925bf739c12f",
			loginName: "aaronb1",
			firstName: "Aaron",
			lastName: "Bruns",
			roleNames: ["student"],
			classNames: ["6a"],
		},

		{
			flagged: false,
			importUserId: "61f40e7b0da0925bf739c6c9",
			loginName: "armin.cordes",
			firstName: "Armin",
			lastName: "Cordes",
			roleNames: ["teacher"],
		},

		{
			flagged: false,
			importUserId: "61f40e7b0da0925bf739c6d3",
			loginName: "bettina.melzer",
			firstName: "Bettina",
			lastName: "Melzer",
			roleNames: ["admin", "teacher"],
			classNames: ["1c"],
		},
	],
	loading: false,
	mdiAccountPlus: "mdiAccountPlus",
	mdiAccountSwitch: "mdiAccountSwitch",
	mdiAccountSwitchOutline: "mdiAccountSwitchOutline",
	mdiFlag: "mdiFlag",
	mdiFlagOutline: "mdiFlagOutline",
	mdiPencil: "mdiFlag",
	options: {
		page: 1,
		itemsPerPage: 25,
		sortBy: [],
		sortDesc: [],
		groupBy: [],
		groupDesc: [],
		mustSort: false,
		multiSort: false,
	},
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
	totalImportUsers: 3,
};

const getWrapper: any = (data?: object, options?: object) => {
	return mount(ImportUsers, {
		...createComponentMocks({
			i18n: true,
			vuetify: true,
		}),
		data: () => data,
		...options,
	});
};

describe("@components/molecules/importUsers", () => {
	beforeEach(() => {
		document.body.setAttribute("data-app", "true");
		setupStores({ schools: SchoolsModule, importUsers: ImportUsersModule });
	});

	it("should have correct props", () => {
		const wrapper = getWrapper(mockData);

		expect(wrapper.vm.importUsers).toStrictEqual(mockData.importUsers);
		expect(wrapper.vm.options).toStrictEqual(mockData.options);
		expect(wrapper.vm.roles).toStrictEqual(mockData.roles);
	});

	it("alert section should visible/invisible according to 'canStartMigration' value", async () => {
		const wrapper = getWrapper(mockData);

		const alertElement = wrapper.findAll(".v-alert");
		expect(alertElement).toHaveLength(1);
		expect(alertElement.wrappers[0].element.textContent).toContain(
			wrapper.vm.$i18n.t("pages.administration.migration.cannotStart")
		);

		wrapper.vm.school.inMaintenance = true;
		wrapper.vm.school.inUserMigration = true;
		await wrapper.vm.$nextTick();

		const invisibleAlertElement = wrapper.findAll(".v-alert");
		expect(invisibleAlertElement).toHaveLength(0);
	});

	it("data table should have correct props", async () => {
		const wrapper = getWrapper(mockData);

		const dataTableElement = wrapper.find(".v-data-table");

		expect(dataTableElement.vm.headers).toStrictEqual(wrapper.vm.tableHead);
		expect(dataTableElement.vm.items).toStrictEqual(mockData.importUsers);
	});

	describe("should search with all columns", () => {
		let getDataFromApiSpy: any;
		let wrapper: any;
		beforeEach(() => {
			getDataFromApiSpy = jest.fn();
			wrapper = getWrapper(mockData);
			wrapper.vm.getDataFromApi = getDataFromApiSpy;
		});

		afterEach(() => {
			getDataFromApiSpy.mockClear();
		});

		it("should set search data properties when search first name changes", async () => {
			const searchFirstNameElement = wrapper.find(".searchFirstName");
			searchFirstNameElement.vm.$emit("input", "some text");
			await wrapper.vm.$nextTick();
			expect(wrapper.vm.searchFirstName).toStrictEqual("some text");
			expect(getDataFromApiSpy).toHaveBeenCalled();
		});

		it("should set search data properties when search last name changes", async () => {
			const searchLastNameElement = wrapper.find(".searchLastName");
			searchLastNameElement.vm.$emit("input", "some text");
			await wrapper.vm.$nextTick();
			expect(wrapper.vm.searchLastName).toStrictEqual("some text");
			expect(getDataFromApiSpy).toHaveBeenCalled();
		});

		it("should set search data properties when search username changes", async () => {
			const searchLoginNameElement = wrapper.find(".searchLoginName");
			searchLoginNameElement.vm.$emit("input", "some text");
			await wrapper.vm.$nextTick();
			expect(wrapper.vm.searchLoginName).toStrictEqual("some text");
			expect(getDataFromApiSpy).toHaveBeenCalled();
		});

		it("should set search data properties when search role changes", async () => {
			const searchRoleElement = wrapper.find(".searchRole");
			searchRoleElement.vm.$emit("input", "role search");
			await wrapper.vm.$nextTick();
			await wrapper.vm.$nextTick();
			expect(wrapper.vm.searchRole).toStrictEqual("role search");
			expect(getDataFromApiSpy).toHaveBeenCalled();
		});

		it("should set search data properties when search classes changes", async () => {
			const searchClassesElement = wrapper.find(".searchClasses");
			searchClassesElement.vm.$emit("input", "class search");
			await wrapper.vm.$nextTick();
			await wrapper.vm.$nextTick();
			expect(wrapper.vm.searchClasses).toStrictEqual("class search");
			expect(getDataFromApiSpy).toHaveBeenCalled();
		});

		it("should search data proprieties when match filter is set", async () => {
			const searchMatchedByNoneElement = wrapper.find(".searchMatchedByNone");
			const searchMatchedByAdminElement = wrapper.find(".searchMatchedByAdmin");
			const searchMatchedByAutoElement = wrapper.find(".searchMatchedByAuto");

			searchMatchedByNoneElement.trigger("click");
			await wrapper.vm.$nextTick();
			await wrapper.vm.$nextTick();
			expect(wrapper.vm.searchMatchedBy).toStrictEqual([MatchedBy.None]);

			searchMatchedByAdminElement.trigger("click");
			await wrapper.vm.$nextTick();
			await wrapper.vm.$nextTick();
			expect(wrapper.vm.searchMatchedBy).toStrictEqual([
				MatchedBy.None,
				MatchedBy.Admin,
			]);

			searchMatchedByAutoElement.trigger("click");
			await wrapper.vm.$nextTick();
			await wrapper.vm.$nextTick();
			expect(wrapper.vm.searchMatchedBy).toStrictEqual([
				MatchedBy.None,
				MatchedBy.Admin,
				MatchedBy.Auto,
			]);
		});

		it("should set search data proprieties when flag filter is toggle", async () => {
			const searchFlaggedElement = wrapper.find(".searchFlagged");
			searchFlaggedElement.trigger("click");
			await wrapper.vm.$nextTick();
			await wrapper.vm.$nextTick();
			expect(wrapper.vm.searchFlagged).toBeTruthy();

			searchFlaggedElement.trigger("click");
			await wrapper.vm.$nextTick();
			await wrapper.vm.$nextTick();
			expect(wrapper.vm.searchFlagged).toBeFalsy();

			expect(getDataFromApiSpy).toHaveBeenCalled();
		});
	});

	describe("should sort by column", () => {
		it("should sort by first name", async () => {
			const getDataFromApiSpy = jest.fn();
			const wrapper = getWrapper(mockData);
			wrapper.vm.getDataFromApi = getDataFromApiSpy;

			const sortFirstNameElement = wrapper.find(".head_firstName");
			sortFirstNameElement.trigger("click");
			await wrapper.vm.$nextTick();
			await wrapper.vm.$nextTick();

			expect(wrapper.vm.options.sortBy[0]).toBe("firstName");
			expect(wrapper.vm.options.sortDesc[0]).toBe(false);

			sortFirstNameElement.trigger("click");
			await wrapper.vm.$nextTick();
			expect(wrapper.vm.options.sortDesc[0]).toBe(true);

			getDataFromApiSpy.mockClear();
		});
		it("should sort by last name", async () => {
			const getDataFromApiSpy = jest.fn();
			const wrapper = getWrapper(mockData);
			wrapper.vm.getDataFromApi = getDataFromApiSpy;

			const sortLastNameElement = wrapper.find(".head_lastName");
			sortLastNameElement.trigger("click");
			await wrapper.vm.$nextTick();
			await wrapper.vm.$nextTick();

			expect(wrapper.vm.options.sortBy[0]).toBe("lastName");
			expect(wrapper.vm.options.sortDesc[0]).toBe(false);

			sortLastNameElement.trigger("click");
			await wrapper.vm.$nextTick();
			expect(wrapper.vm.options.sortDesc[0]).toBe(true);

			getDataFromApiSpy.mockClear();
		});
	});
});
