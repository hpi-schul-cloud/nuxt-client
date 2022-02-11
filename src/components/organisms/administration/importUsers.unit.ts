import { mount } from "@vue/test-utils";
import importUsers from "./importUsers.vue";

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
	searchMatchedBy: ["none"],
	searchRole: "",
	totalImportUsers: 3,
};

const getWrapper: any = (data?: object, options?: object) => {
	return mount(importUsers, {
		...createComponentMocks({
			i18n: true,
			vuetify: true,
		}),
		data: () => data,
		...options,
	});
};

describe("@components/molecules/RoomTaskCardTeacher", () => {
	beforeEach(() => {
		document.body.setAttribute("data-app", "true");
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

	describe("should search with all columns", async () => {
		it("should set search data properties when search texts change", async () => {
			const getDataFromApiSpy = jest.fn();
			const wrapper = getWrapper(mockData);
			wrapper.vm.getDataFromApi = getDataFromApiSpy;

			const searchFirstNameElement = wrapper.find(".searchFirstName");
			searchFirstNameElement.vm.$emit("input", "some text");
			await wrapper.vm.$nextTick();
			expect(wrapper.vm.searchFirstName).toStrictEqual("some text");
			expect(getDataFromApiSpy).toHaveBeenCalled();
			getDataFromApiSpy.mockClear();
		});

		it("should set search data properties when search texts change", async () => {
			const getDataFromApiSpy = jest.fn();
			const wrapper = getWrapper(mockData);
			wrapper.vm.getDataFromApi = getDataFromApiSpy;

			const searchLastNameElement = wrapper.find(".searchLastName");
			searchLastNameElement.vm.$emit("input", "some text");
			await wrapper.vm.$nextTick();
			expect(wrapper.vm.searchLastName).toStrictEqual("some text");
			expect(getDataFromApiSpy).toHaveBeenCalled();
			getDataFromApiSpy.mockClear();
		});

		it("should set search data properties when search texts change", async () => {
			const getDataFromApiSpy = jest.fn();
			const wrapper = getWrapper(mockData);
			wrapper.vm.getDataFromApi = getDataFromApiSpy;

			const searchLoginNameElement = wrapper.find(".searchLoginName");
			searchLoginNameElement.vm.$emit("input", "some text");
			await wrapper.vm.$nextTick();
			expect(wrapper.vm.searchLoginName).toStrictEqual("some text");
			expect(getDataFromApiSpy).toHaveBeenCalled();
			getDataFromApiSpy.mockClear();
		});

		it("should set search data properties when search texts change", async () => {
			const getDataFromApiSpy = jest.fn();
			const wrapper = getWrapper(mockData);
			wrapper.vm.getDataFromApi = getDataFromApiSpy;

			const searchRoleElement = wrapper.find(".searchRole");
			searchRoleElement.vm.$emit("input", "role search");
			await wrapper.vm.$nextTick();
			await wrapper.vm.$nextTick();
			expect(wrapper.vm.searchRole).toStrictEqual("role search");
			expect(getDataFromApiSpy).toHaveBeenCalled();
			getDataFromApiSpy.mockClear();
		});

		it("should set search data properties when search texts change", async () => {
			const getDataFromApiSpy = jest.fn();
			const wrapper = getWrapper(mockData);
			wrapper.vm.getDataFromApi = getDataFromApiSpy;

			const searchClassesElement = wrapper.find(".searchClasses");
			searchClassesElement.vm.$emit("input", "class search");
			await wrapper.vm.$nextTick();
			await wrapper.vm.$nextTick();
			expect(wrapper.vm.searchClasses).toStrictEqual("class search");
			expect(getDataFromApiSpy).toHaveBeenCalled();
			getDataFromApiSpy.mockClear();
		});
	});
});
