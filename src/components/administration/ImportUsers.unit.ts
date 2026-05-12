import ImportUsers from "./ImportUsers.vue";
import { schoolsModule } from "@/store";
import SchoolsModule from "@/store/schools";
import { createTestEnvStore, schoolFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { ImportUserListResponse, ImportUserResponseRoleNames, SchulcloudTheme } from "@api-server";
import { MatchedBy, useImportUsersStore } from "@data-import-users";
import {
	mdiAccountPlus,
	mdiAccountSwitch,
	mdiAccountSwitchOutline,
	mdiAlertCircle,
	mdiFlag,
	mdiFlagOutline,
	mdiPencilOutline,
} from "@icons/material";
import { createTestingPinia } from "@pinia/testing";
import { mount } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";
import { nextTick } from "vue";
import { VDataTable } from "vuetify/components";

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
			roleNames: [ImportUserResponseRoleNames.STUDENT],
			classNames: ["6a"],
		},
		{
			flagged: false,
			importUserId: "61f40e7b0da0925bf739c6c9",
			loginName: "armin.cordes",
			firstName: "Armin",
			lastName: "Cordes",
			roleNames: [ImportUserResponseRoleNames.TEACHER],
			classNames: [],
		},
		{
			flagged: false,
			importUserId: "61f40e7b0da0925bf739c6d3",
			loginName: "bettina.melzer",
			firstName: "Bettina",
			lastName: "Melzer",
			roleNames: [ImportUserResponseRoleNames.ADMIN, ImportUserResponseRoleNames.TEACHER],
			classNames: ["1c"],
		},
	],
};

const mockData: ImportUsersInstance["$data"] = {
	MatchedBy,
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
	mdiAccountPlus,
	mdiAccountSwitch,
	mdiAccountSwitchOutline,
	mdiFlag,
	mdiFlagOutline,
	mdiPencilOutline,
	roles: [
		{ text: "common.roleName.student", value: ImportUserResponseRoleNames.STUDENT },
		{ text: "common.roleName.teacher", value: ImportUserResponseRoleNames.TEACHER },
		{ text: "common.roleName.administrator", value: ImportUserResponseRoleNames.ADMIN },
	],
	searchClasses: "",
	searchFirstName: "",
	searchFlagged: false,
	searchLastName: "",
	searchLoginName: "",
	searchMatchedBy: [],
	searchRole: null,
	mdiAlertCircle,
	options: {
		itemsPerPage: 25,
	},
};

type ImportUsersInstance = InstanceType<typeof ImportUsers>;

const getWrapper = (
	importUsersStore: ReturnType<typeof useImportUsersStore>,
	data?: ImportUsersInstance["$data"],
	options?: object
) => {
	vi.spyOn(importUsersStore, "fetchAllImportUsers").mockResolvedValue();
	return mount(ImportUsers, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
		},
		data() {
			return {
				...data,
			};
		},
		...options,
	});
};

describe("ImportUsers", () => {
	let importUsersStore: ReturnType<typeof useImportUsersStore>;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		importUsersStore = useImportUsersStore();
		createTestEnvStore({ SC_THEME: SchulcloudTheme.DEFAULT });
	});

	beforeEach(() => {
		setupStores({
			schoolsModule: SchoolsModule,
		});
		importUsersStore.importUsersData.list = mockImportUsers;
		schoolsModule.setSchool(
			schoolFactory.build({
				inUserMigration: true,
				inMaintenance: true,
			})
		);
	});

	it("should have correct props", () => {
		const wrapper = getWrapper(importUsersStore, mockData);

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

		const wrapper = getWrapper(importUsersStore, mockData);

		const alertElement = wrapper.findAll(".v-alert");
		expect(alertElement).toHaveLength(1);
		expect(alertElement[0].element.textContent).toContain(wrapper.vm.$t("pages.administration.migration.cannotStart"));

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

		const wrapper = getWrapper(importUsersStore, {
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
		const wrapper = getWrapper(importUsersStore, mockData);

		const dataTableElement = wrapper.findComponent<VDataTable>(".v-data-table");

		expect(dataTableElement.vm.headers).toStrictEqual(wrapper.vm.tableHead);
		expect(dataTableElement.vm.items).toStrictEqual(mockImportUsers.data);
	});

	describe("should search with all columns", () => {
		const setup = () => {
			const fetchAllImportUsersSpy = vi.spyOn(importUsersStore, "fetchAllImportUsers").mockResolvedValue();
			const wrapper = getWrapper(importUsersStore, mockData);

			return {
				wrapper,
				fetchAllImportUsersSpy,
			};
		};

		afterEach(() => {
			vi.clearAllMocks();
		});

		it("should set search data properties when search first name changes", async () => {
			const { wrapper, fetchAllImportUsersSpy } = setup();

			const searchFirstNameElement = wrapper.getComponent('[data-testid="search-first-name"]');

			await searchFirstNameElement.setValue("some text");

			expect(wrapper.vm.searchFirstName).toStrictEqual("some text");
			expect(fetchAllImportUsersSpy).toHaveBeenCalled();
		});

		it("should set search data properties when search last name changes", async () => {
			const { wrapper, fetchAllImportUsersSpy } = setup();

			const searchLastNameElement = wrapper.getComponent('[data-testid="search-last-name"]');
			await searchLastNameElement.setValue("some text");

			expect(wrapper.vm.searchLastName).toStrictEqual("some text");
			expect(fetchAllImportUsersSpy).toHaveBeenCalled();
		});

		it("should set search data properties when search username changes", async () => {
			const { wrapper, fetchAllImportUsersSpy } = setup();

			const searchLoginNameElement = wrapper.getComponent('[data-testid="search-login-name"]');
			await searchLoginNameElement.setValue("some text");

			expect(wrapper.vm.searchLoginName).toStrictEqual("some text");
			expect(fetchAllImportUsersSpy).toHaveBeenCalled();
		});

		it("should set search data properties when search role changes", async () => {
			const { wrapper, fetchAllImportUsersSpy } = setup();

			const searchRoleElement = wrapper.getComponent('[data-testid="search-role"]');
			await searchRoleElement.setValue("role search");

			expect(wrapper.vm.searchRole).toStrictEqual("role search");
			expect(fetchAllImportUsersSpy).toHaveBeenCalled();
		});

		it("should set search data properties when search classes changes", async () => {
			const { wrapper, fetchAllImportUsersSpy } = setup();

			const searchClassesElement = wrapper.getComponent('[data-testid="search-classes"]');
			await searchClassesElement.setValue("class search");

			expect(wrapper.vm.searchClasses).toStrictEqual("class search");
			expect(fetchAllImportUsersSpy).toHaveBeenCalled();
		});

		it("should search data proprieties when match filter is set", async () => {
			const { wrapper } = setup();

			const searchMatchedByNoneElement = wrapper.getComponent('[data-testid="search-matched-by-none"]');
			const searchMatchedByAdminElement = wrapper.getComponent('[data-testid="search-matched-by-admin"]');
			const searchMatchedByAutoElement = wrapper.getComponent('[data-testid="search-matched-by-auto"]');

			// Component initializes with [MatchedBy.None], so clicking "none" deselects it
			await searchMatchedByNoneElement.trigger("click");
			expect(wrapper.vm.searchMatchedBy).toStrictEqual([]);

			// Click "admin" adds it
			await searchMatchedByAdminElement.trigger("click");
			expect(wrapper.vm.searchMatchedBy).toStrictEqual([MatchedBy.Admin]);

			// Click "auto" adds it
			await searchMatchedByAutoElement.trigger("click");
			expect(wrapper.vm.searchMatchedBy).toStrictEqual([MatchedBy.Admin, MatchedBy.Auto]);
		});

		it("should set search data proprieties when flag filter is toggle", async () => {
			const { wrapper, fetchAllImportUsersSpy } = setup();

			const searchFlaggedElement = wrapper.getComponent('[data-testid="search-flagged"]');
			await searchFlaggedElement.trigger("click");
			expect(wrapper.vm.searchFlagged).toBeTruthy();

			await searchFlaggedElement.trigger("click");
			expect(wrapper.vm.searchFlagged).toBeFalsy();

			expect(fetchAllImportUsersSpy).toHaveBeenCalled();
		});
	});

	describe("should sort by column", () => {
		const setup = (mockData: ImportUsersInstance["$data"]) => {
			const wrapper = getWrapper(importUsersStore, mockData);

			return { wrapper };
		};

		it("should sort by first name", async () => {
			const { wrapper } = setup(mockData);
			const wrapperVm = wrapper.vm as unknown as typeof ImportUsers;

			const sortFirstNameElement = wrapper.find('[data-testid="head-first-name"]');
			await sortFirstNameElement.trigger("click");

			expect(wrapperVm.options.sortBy[0].key).toEqual("firstName");
			expect(wrapperVm.options.sortBy[0].order).toEqual("asc");

			await sortFirstNameElement.trigger("click");
			expect(wrapperVm.options.sortBy[0].order).toEqual("desc");
		});

		it("should sort by last name", async () => {
			const { wrapper } = setup(mockData);

			const sortLastNameElement = wrapper.find('[data-testid="head-last-name"]');
			await sortLastNameElement.trigger("click");

			const wrapperVm = wrapper.vm as unknown as typeof ImportUsers;

			expect(wrapperVm.options.sortBy[0].key).toBe("lastName");
			expect(wrapperVm.options.sortBy[0].order).toBe("asc");

			await sortLastNameElement.trigger("click");
			expect(wrapperVm.options.sortBy[0].order).toBe("desc");
		});
	});
});
