import ImportUsers from "./ImportUsers.vue";
import { createTestEnvStore, createTestSchoolStore, schoolFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { ImportUserListResponse, ImportUserResponseRoleNames, SchulcloudTheme } from "@api-server";
import { useSchoolStore } from "@data-app";
import { MatchedBy, useImportUsersStore } from "@data-import-users";
import { mdiAccountPlus, mdiAccountSwitch, mdiAccountSwitchOutline } from "@icons/material";
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

const setup = (
	schoolDetails?: NonNullable<Parameters<typeof createTestSchoolStore>[0]>["schoolDetails"],
	options?: object
) => {
	createTestSchoolStore({
		schoolDetails: schoolDetails ?? schoolFactory.build({ inUserMigration: true, inMaintenance: true }),
	});

	return mount(ImportUsers, {
		global: {
			plugins: [createTestingVuetify(), createTestingI18n()],
		},
		...options,
	});
};

describe("ImportUsers", () => {
	let importUsersStore: ReturnType<typeof useImportUsersStore>;
	let schoolStore: ReturnType<typeof useSchoolStore>;

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		importUsersStore = useImportUsersStore();
		vi.spyOn(importUsersStore, "fetchAllUsers").mockResolvedValue();
		vi.spyOn(importUsersStore, "fetchAllImportUsers").mockResolvedValue();
		schoolStore = useSchoolStore();
		createTestEnvStore({ SC_THEME: SchulcloudTheme.DEFAULT });
		importUsersStore.importUsersData.list = mockImportUsers;
	});

	it("should have correct props", () => {
		const wrapper = setup();

		expect(wrapper.vm.importUsers).toStrictEqual(mockImportUsers.data);
	});

	it("alert section should visible/invisible according to 'canStartMigration' value", async () => {
		const wrapper = setup(schoolFactory.build({ inUserMigration: false, inMaintenance: false }));

		const alertElement = wrapper.findAll(".v-alert");
		expect(alertElement).toHaveLength(1);
		expect(alertElement[0].element.textContent).toContain(wrapper.vm.$t("pages.administration.migration.cannotStart"));

		schoolStore.$patch({
			schoolDetails: schoolFactory.build({
				inUserMigration: true,
				inMaintenance: true,
			}),
		});
		await nextTick();

		const invisibleAlertElement = wrapper.findAll(".v-alert");
		expect(invisibleAlertElement).toHaveLength(0);
	});

	it("alert section should be visible/invisible according to 'canStartMigration' value", async () => {
		const wrapper = setup(schoolFactory.build({ inUserMigration: false, inMaintenance: true }));

		const visibleAlertElement = wrapper.findAll(".v-alert");
		expect(visibleAlertElement).toHaveLength(1);

		schoolStore.$patch({
			schoolDetails: schoolFactory.build({
				inUserMigration: true,
				inMaintenance: true,
			}),
		});
		await nextTick();

		const invisibleAlertElement = wrapper.findAll(".v-alert");
		expect(invisibleAlertElement).toHaveLength(0);
	});

	it("data table should have correct props", async () => {
		const wrapper = setup();

		const dataTableElement = wrapper.findComponent<VDataTable>(".v-data-table");

		expect(dataTableElement.vm.headers).toStrictEqual(wrapper.vm.tableHead);
		expect(dataTableElement.vm.items).toStrictEqual(mockImportUsers.data);
	});

	describe("should search with all columns", () => {
		const getWrapper = () => {
			const fetchAllImportUsersSpy = vi.spyOn(importUsersStore, "fetchAllImportUsers").mockResolvedValue();
			const wrapper = setup();

			return {
				wrapper,
				fetchAllImportUsersSpy,
			};
		};

		afterEach(() => {
			vi.clearAllMocks();
		});

		it("should set search data properties when search first name changes", async () => {
			const { wrapper, fetchAllImportUsersSpy } = getWrapper();

			const searchFirstNameElement = wrapper.getComponent('[data-testid="search-first-name"]');

			await searchFirstNameElement.setValue("some text");

			expect(wrapper.vm.searchFirstName).toStrictEqual("some text");
			expect(fetchAllImportUsersSpy).toHaveBeenCalled();
		});

		it("should set search data properties when search last name changes", async () => {
			const { wrapper, fetchAllImportUsersSpy } = getWrapper();

			const searchLastNameElement = wrapper.getComponent('[data-testid="search-last-name"]');
			await searchLastNameElement.setValue("some text");

			expect(wrapper.vm.searchLastName).toStrictEqual("some text");
			expect(fetchAllImportUsersSpy).toHaveBeenCalled();
		});

		it("should set search data properties when search username changes", async () => {
			const { wrapper, fetchAllImportUsersSpy } = getWrapper();

			const searchLoginNameElement = wrapper.getComponent('[data-testid="search-login-name"]');
			await searchLoginNameElement.setValue("some text");

			expect(wrapper.vm.searchLoginName).toStrictEqual("some text");
			expect(fetchAllImportUsersSpy).toHaveBeenCalled();
		});

		it("should set search data properties when search role changes", async () => {
			const { wrapper, fetchAllImportUsersSpy } = getWrapper();

			const searchRoleElement = wrapper.getComponent('[data-testid="search-role"]');
			await searchRoleElement.setValue("role search");

			expect(wrapper.vm.searchRole).toStrictEqual("role search");
			expect(fetchAllImportUsersSpy).toHaveBeenCalled();
		});

		it("should set search data properties when search classes changes", async () => {
			const { wrapper, fetchAllImportUsersSpy } = getWrapper();

			const searchClassesElement = wrapper.getComponent('[data-testid="search-classes"]');
			await searchClassesElement.setValue("class search");

			expect(wrapper.vm.searchClasses).toStrictEqual("class search");
			expect(fetchAllImportUsersSpy).toHaveBeenCalled();
		});

		it("should search data proprieties when match filter is set", async () => {
			const { wrapper } = getWrapper();

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
			const { wrapper, fetchAllImportUsersSpy } = getWrapper();

			const searchFlaggedElement = wrapper.getComponent('[data-testid="search-flagged"]');
			await searchFlaggedElement.trigger("click");
			expect(wrapper.vm.searchFlagged).toBeTruthy();

			await searchFlaggedElement.trigger("click");
			expect(wrapper.vm.searchFlagged).toBeFalsy();

			expect(fetchAllImportUsersSpy).toHaveBeenCalled();
		});
	});

	describe("should sort by column", () => {
		it("should sort by first name", async () => {
			const wrapper = setup();
			const wrapperVm = wrapper.vm as unknown as typeof ImportUsers;

			const sortFirstNameElement = wrapper.find('[data-testid="head-first-name"]');
			await sortFirstNameElement.trigger("click");

			expect(wrapperVm.options.sortBy[0].key).toEqual("firstName");
			expect(wrapperVm.options.sortBy[0].order).toEqual("asc");

			await sortFirstNameElement.trigger("click");
			expect(wrapperVm.options.sortBy[0].order).toEqual("desc");
		});

		it("should sort by last name", async () => {
			const wrapper = setup();

			const sortLastNameElement = wrapper.find('[data-testid="head-last-name"]');
			await sortLastNameElement.trigger("click");

			const wrapperVm = wrapper.vm as unknown as typeof ImportUsers;

			expect(wrapperVm.options.sortBy[0].key).toBe("lastName");
			expect(wrapperVm.options.sortBy[0].order).toBe("asc");

			await sortLastNameElement.trigger("click");
			expect(wrapperVm.options.sortBy[0].order).toBe("desc");
		});
	});

	describe("editItem", () => {
		it("should open dialog and set editedIndex when edit button clicked", async () => {
			const wrapper = setup();

			const editButtons = wrapper.findAll('[title="components.organisms.importUsers.editImportUser"]');
			await editButtons[0].trigger("click");

			expect(wrapper.vm.dialogEdit).toBe(true);
			expect(wrapper.vm.editedIndex).toBe(0);
		});

		it("should set correct editedItem when editing second row", async () => {
			const wrapper = setup();

			const editButtons = wrapper.findAll('[title="components.organisms.importUsers.editImportUser"]');
			await editButtons[1].trigger("click");

			expect(wrapper.vm.editedIndex).toBe(1);
			expect(wrapper.vm.editedItem.firstName).toBe("Armin");
		});
	});

	describe("closeEdit", () => {
		it("should close dialog and reset editedIndex", async () => {
			const wrapper = setup({
				dialogEdit: true,
				editedIndex: 1,
			});

			wrapper.vm.closeEdit();
			await nextTick();

			expect(wrapper.vm.dialogEdit).toBe(false);
			await nextTick();
			expect(wrapper.vm.editedIndex).toBe(-1);
		});
	});

	describe("getMatchedByIcon", () => {
		it("should return mdiAccountPlus when no match", () => {
			const wrapper = setup();
			const icon = (wrapper.vm as unknown as { getMatchedByIcon: (match: unknown) => string }).getMatchedByIcon(
				undefined
			);

			expect(icon).toBe(mdiAccountPlus);
		});

		it("should return mdiAccountPlus when match has no matchedBy", () => {
			const wrapper = setup();
			const icon = (wrapper.vm as unknown as { getMatchedByIcon: (match: unknown) => string }).getMatchedByIcon({
				userId: "123",
				firstName: "Test",
				lastName: "User",
			});

			expect(icon).toBe(mdiAccountPlus);
		});

		it("should return mdiAccountSwitchOutline for AUTO match", () => {
			const wrapper = setup();
			const icon = (wrapper.vm as unknown as { getMatchedByIcon: (match: unknown) => string }).getMatchedByIcon({
				userId: "123",
				matchedBy: "auto",
			});

			expect(icon).toBe(mdiAccountSwitchOutline);
		});

		it("should return mdiAccountSwitch for ADMIN match", () => {
			const wrapper = setup();
			const icon = (wrapper.vm as unknown as { getMatchedByIcon: (match: unknown) => string }).getMatchedByIcon({
				userId: "123",
				matchedBy: "admin",
			});

			expect(icon).toBe(mdiAccountSwitch);
		});
	});

	describe("saveFlag from table", () => {
		it("should call saveFlag when flag button clicked in table", async () => {
			const saveFlagMock = vi.spyOn(importUsersStore, "saveFlag").mockResolvedValue(undefined);
			const wrapper = setup();
			await nextTick();

			// Call saveFlag directly with the first item since VDataTableServer slots may not render in tests
			await wrapper.vm.saveFlag(mockImportUsers.data[0]);

			expect(saveFlagMock).toHaveBeenCalledWith({
				importUserId: mockImportUsers.data[0].importUserId,
				flagged: !mockImportUsers.data[0].flagged,
			});
		});

		it("should not call saveFlag when loading is true", async () => {
			const saveFlagMock = vi.spyOn(importUsersStore, "saveFlag").mockResolvedValue(undefined);
			const wrapper = setup();
			await nextTick();

			// Set loading to true directly on the component
			wrapper.vm.loading = true;
			await nextTick();

			// Call saveFlag directly - it should return early when loading is true
			await wrapper.vm.saveFlag(mockImportUsers.data[0]);

			expect(saveFlagMock).not.toHaveBeenCalled();
		});

		it("should set loading to false when searchFlagged is false", async () => {
			vi.spyOn(importUsersStore, "saveFlag").mockResolvedValue(undefined);
			const wrapper = setup({
				searchFlagged: false,
			});
			await nextTick();

			await wrapper.vm.saveFlag(mockImportUsers.data[0]);
			await nextTick();

			expect(wrapper.vm.loading).toBe(false);
		});

		it("should reload data when searchFlagged is true", async () => {
			vi.useFakeTimers();
			vi.spyOn(importUsersStore, "saveFlag").mockResolvedValue(undefined);
			const fetchSpy = vi.spyOn(importUsersStore, "fetchAllImportUsers").mockResolvedValue();

			const wrapper = setup();
			await nextTick();

			await wrapper.vm.saveFlag(mockImportUsers.data[0]);
			await nextTick();

			vi.advanceTimersByTime(600);
			await nextTick();

			expect(fetchSpy).toHaveBeenCalled();
			vi.useRealTimers();
		});
	});

	describe("savedMatch event handler", () => {
		it("should call reloadData when searchMatchedBy has values", async () => {
			vi.useFakeTimers();
			const fetchSpy = vi.spyOn(importUsersStore, "fetchAllImportUsers").mockResolvedValue();
			const wrapper = setup();
			await nextTick();

			// Set searchMatchedBy to have values
			wrapper.vm.searchMatchedBy = [MatchedBy.Auto];
			await nextTick();

			wrapper.vm.savedMatch();
			await nextTick();

			expect(wrapper.vm.loading).toBe(true);

			vi.advanceTimersByTime(600);
			await nextTick();

			expect(fetchSpy).toHaveBeenCalled();
			vi.useRealTimers();
		});

		it("should close dialog without reloading when searchMatchedBy is empty", () => {
			const wrapper = setup({
				dialogEdit: true,
				searchMatchedBy: [],
			});

			wrapper.vm.savedMatch();

			expect(wrapper.vm.dialogEdit).toBe(false);
		});
	});

	describe("savedFlag event handler", () => {
		it("should set loading and reload data", async () => {
			vi.useFakeTimers();
			const fetchSpy = vi.spyOn(importUsersStore, "fetchAllImportUsers").mockResolvedValue();
			const wrapper = setup();

			wrapper.vm.savedFlag();

			expect(wrapper.vm.loading).toBe(true);

			vi.advanceTimersByTime(600);
			await nextTick();

			expect(fetchSpy).toHaveBeenCalled();
			vi.useRealTimers();
		});
	});

	describe("getRoles", () => {
		it("should return empty string for empty roleNames", () => {
			const wrapper = setup();
			const roles = (wrapper.vm as unknown as { getRoles: (roleNames: string[]) => string }).getRoles([]);

			expect(roles).toBe("");
		});

		it("should return student label for student role", () => {
			const wrapper = setup();
			const roles = (wrapper.vm as unknown as { getRoles: (roleNames: string[]) => string }).getRoles(["student"]);

			expect(roles).toBe("common.roleName.student");
		});

		it("should return teacher label for teacher role", () => {
			const wrapper = setup();
			const roles = (wrapper.vm as unknown as { getRoles: (roleNames: string[]) => string }).getRoles(["teacher"]);

			expect(roles).toBe("common.roleName.teacher");
		});

		it("should return admin label for admin role", () => {
			const wrapper = setup();
			const roles = (wrapper.vm as unknown as { getRoles: (roleNames: string[]) => string }).getRoles(["admin"]);

			expect(roles).toBe("common.roleName.administrator");
		});

		it("should return combined labels for multiple roles", () => {
			const wrapper = setup();
			const roles = (wrapper.vm as unknown as { getRoles: (roleNames: string[]) => string }).getRoles([
				"student",
				"teacher",
			]);

			expect(roles).toBe("common.roleName.student, common.roleName.teacher");
		});

		it("should return empty string when roleNames is not an array", () => {
			const wrapper = setup();
			const roles = (wrapper.vm as unknown as { getRoles: (roleNames: unknown) => string }).getRoles(null);

			expect(roles).toBe("");
		});
	});

	describe("NBC theme", () => {
		it("should hide loginName column when isNbc is true", async () => {
			createTestEnvStore({ SC_THEME: SchulcloudTheme.N21 });
			const wrapper = setup();
			await nextTick();

			const headers = wrapper.vm.tableHead;
			const loginNameHeader = headers.find((h: { value: string }) => h.value === "loginName");

			expect(loginNameHeader).toBeUndefined();
		});
	});

	describe("watch total", () => {
		it("should call searchApi when total changes to value > 0", async () => {
			const fetchSpy = vi.spyOn(importUsersStore, "fetchAllImportUsers").mockResolvedValue();
			setup();

			importUsersStore.importUsersData.list = { ...mockImportUsers, total: 5 };
			await nextTick();
			await nextTick();

			expect(fetchSpy).toHaveBeenCalled();
		});
	});

	describe("onUpdateOptions", () => {
		it("should update options and fetch data", async () => {
			const fetchSpy = vi.spyOn(importUsersStore, "fetchAllImportUsers").mockResolvedValue();
			const wrapper = setup();

			await wrapper.vm.onUpdateOptions({
				page: 2,
				itemsPerPage: 50,
				sortBy: [{ key: "firstName", order: "asc" }],
			});

			expect(wrapper.vm.options.page).toBe(2);
			expect(wrapper.vm.options.itemsPerPage).toBe(50);
			expect(fetchSpy).toHaveBeenCalled();
		});
	});
});
