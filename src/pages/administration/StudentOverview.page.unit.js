import mock$objects from "../../../tests/test-utils/pageStubs";
import StudentPage from "./StudentOverview.page.vue";
import BackendDataTable from "@/components/administration/BackendDataTable.vue";
import { useFilterLocalStorage } from "@/components/administration/data-filter/composables/filterLocalStorage.composable";
import DataFilter from "@/components/administration/data-filter/DataFilter.vue";
import { Permission, RoleName, SchulcloudTheme } from "@/serverApi/v3";
import { schoolsModule } from "@/store";
import SchoolsModule from "@/store/schools";
import { createTestAppStore, createTestEnvStore } from "@@/tests/test-utils";
import setupConfirmationComposableMock from "@@/tests/test-utils/composable-mocks/setupConfirmationComposableMock";
import { mockSchool } from "@@/tests/test-utils/mockObjects";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { mdiCheckAll, mdiClose } from "@icons/material";
import { createTestingPinia } from "@pinia/testing";
import { useConfirmationDialog } from "@ui-confirmation-dialog";
import { RouterLinkStub } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { nextTick } from "vue";
import { VCheckbox } from "vuetify/components";
import { createStore } from "vuex";

const mockData = [
	{
		_id: "0000d231816abba584714c9e",
		firstName: "Marla",
		lastName: "Mathe",
		email: "schueler@schul-cloud.org",
		birthday: "01.01.2000",
		lastLoginSystemChange: "2022-01-01T13:36:12.148Z",
	},
	{
		firstName: "Waldemar",
		lastName: "Wunderlich",
		birthday: "01.01.1989",
		email: "waldemar.wunderlich@schul-cloud.org",
		outdatedSince: "2022-02-02T13:36:12.148Z",
	},
];

const envs = {
	FALLBACK_DISABLED: false,
	NOT_AUTHENTICATED_REDIRECT_URL: "/login",
	JWT_SHOW_TIMEOUT_WARNING_SECONDS: 3600,
	JWT_TIMEOUT_SECONDS: 7200,
	SC_THEME: SchulcloudTheme.Default,
	I18N__AVAILABLE_LANGUAGES: [],
	I18N__DEFAULT_LANGUAGE: "",
	I18N__DEFAULT_TIMEZONE: "",
	I18N__FALLBACK_LANGUAGE: "",
	DOCUMENT_BASE_DIR: "",
	SC_TITLE: "",
	ADMIN_TABLES_DISPLAY_CONSENT_COLUMN: true,
};

const createMockStore = () => {
	const storeOptions = {
		modules: {
			classes: {
				namespaced: true,
				actions: {
					find: () => ({ data: [] }),
				},
				state: () => ({
					list: [],
				}),
			},
			schools: {
				namespaced: true,
				getters: {
					schoolIsExternallyManaged: () => false,
				},
			},
			users: {
				namespaced: true,
				actions: {
					findStudents: vi.fn(),
					deleteUsers: vi.fn(),
					getQrRegistrationLinks: vi.fn(),
					sendRegistrationLink: vi.fn(),
				},
				getters: {
					getList: () => mockData,
					getPagination: () => ({
						limit: 25,
						skip: 0,
						total: 2,
						query: "",
					}),
					getActive: () => false,
					getPercent: () => 0,
					getQrLinks: () => [],
					getRegistrationLinks: () => [],
				},
			},
		},
	};

	const mockStore = createStore(storeOptions);
	const usersActionsStubs = storeOptions.modules.users.actions;

	return { mockStore, usersActionsStubs };
};

vi.mock("@/components/administration/data-filter/composables/filterLocalStorage.composable");
const mockedUseFilterLocalStorage = vi.mocked(useFilterLocalStorage);
vi.mock("@ui-confirmation-dialog");
vi.mocked(useConfirmationDialog);

describe("students/index", () => {
	let askConfirmationMock;
	const OLD_ENV = process.env;
	const getFilterState = vi.fn().mockReturnValue({
		searchQuery: "",
	});
	const setFilterState = vi.fn();
	const getSortingState = vi.fn();
	const setSortingState = vi.fn();
	const getPaginationState = vi.fn();
	const setPaginationState = vi.fn();

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		createTestEnvStore();
		vi.useFakeTimers();

		vi.resetModules(); // reset module registry to avoid conflicts
		process.env = { ...OLD_ENV }; // make a copy

		setupStores({
			schoolsModule: SchoolsModule,
		});

		schoolsModule.setSchool({ ...mockSchool, isExternal: false });
		mockedUseFilterLocalStorage.mockReturnValue({
			getFilterState,
			setFilterState,
			getSortingState,
			setSortingState,
			getPaginationState,
			setPaginationState,
		});

		askConfirmationMock = vi.fn();
		setupConfirmationComposableMock({
			askConfirmationMock,
		});
	});

	afterAll(() => {
		process.env = OLD_ENV; // restore old environment
	});

	const setup = (permissions, roleName) => {
		const { mockStore, usersActionsStubs } = createMockStore();

		createTestAppStore({
			me: {
				school: { ...mockSchool, isExternal: false },
				roles: [{ id: roleName, name: roleName }],
				permissions,
			},
		});

		const wrapper = mount(StudentPage, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				mocks: {
					$store: mockStore,
				},
				stubs: { RouterLink: RouterLinkStub },
			},
		});

		mock$objects(wrapper);

		return { wrapper, mockStore, usersActionsStubs };
	};

	describe("useFilterLocalStorage composable", () => {
		it("should call necessary useFilterLocalStorage methods on mount", () => {
			setup();
			expect(getFilterState).toHaveBeenCalled();
			expect(getSortingState).toHaveBeenCalled();
			expect(getPaginationState).toHaveBeenCalled();
		});
	});

	it("should call 'deleteUsers' action", async () => {
		askConfirmationMock.mockResolvedValue(true);
		const { wrapper, usersActionsStubs } = setup([Permission.StudentDelete]);
		await nextTick();

		const userRows = wrapper.findAll('[data-testid="table-data-row"]');
		expect(userRows).toHaveLength(2);

		// select first entry
		const checkbox = userRows.at(0).find("[data-testid='selection-column']").get('input[type="checkbox"]');
		checkbox.setChecked();

		// open actions menu
		await nextTick();
		const actionsBtn = wrapper.find(".row-selection-info .actions button:first-child");
		await actionsBtn.trigger("click");

		// click delete menu button
		const deleteBtn = wrapper.findAll(".row-selection-info .context-menu button").at(3);
		await deleteBtn.trigger("click");

		expect(usersActionsStubs.deleteUsers.mock.calls).toHaveLength(1);
		expect(usersActionsStubs.deleteUsers.mock.calls[0][1]).toStrictEqual({
			ids: [mockData[0]._id],
			userType: "student",
		});
	});

	it("should dispatch the 'findStudents action on load'", () => {
		const { usersActionsStubs } = setup();
		expect(usersActionsStubs.findStudents).toHaveBeenCalled();
	});

	it("should emit the 'delete' action when deleting a user", async () => {
		const { wrapper } = setup([Permission.StudentDelete]);

		// user row exists
		const dataRow = wrapper.findComponent(`[data-testid="table-data-row"]`);
		expect(dataRow.exists()).toBe(true);
		// user row checkbox is clicked
		const checkBox = dataRow.findComponent(VCheckbox);
		expect(checkBox.exists()).toBe(true);
		await checkBox.trigger("click");
		await dataRow.vm.$emit("update:selected", true);
		vi.runAllTimers();
		// user is selected
		expect(dataRow.vm.selected).toBe(true);

		// selection row component is rendered
		const selectionBar = wrapper.findComponent(".row-selection-info");
		expect(selectionBar.exists()).toBe(true);

		// contextMenu is rendered
		const openContextButton = wrapper.find("[data-test-id='context-menu-open']");
		expect(openContextButton.exists()).toBe(true);
		// contextMenu is clicked
		await openContextButton.trigger("click");
		vi.runAllTimers();

		// delete button action is rendered in contextMenu
		const deleteActionButton = wrapper.find(`[data-testid="delete_action"]`);
		expect(deleteActionButton.exists()).toBe(true);
		// delete button is clicked
		await deleteActionButton.trigger("click");
		vi.runAllTimers();

		// delete action is emitted
		expect(selectionBar.emitted("fire-action")[0][0].dataTestId).toStrictEqual("delete_action");
	});

	it("should emit the 'registration_link' action when the action button is clicked", async () => {
		const { wrapper, usersActionsStubs } = setup();

		// user row exists
		const dataRow = wrapper.findComponent(`[data-testid="table-data-row"]`);
		expect(dataRow.exists()).toBe(true);
		// user row checkbox is clicked
		const checkBox = dataRow.findComponent(VCheckbox);
		expect(checkBox.exists()).toBe(true);
		await checkBox.trigger("click");
		await dataRow.vm.$emit("update:selected", true);
		// user is selected
		expect(dataRow.vm.selected).toBe(true);

		// selection row component is rendered
		const selectionBar = wrapper.findComponent(".row-selection-info");
		expect(selectionBar.exists()).toBe(true);

		// contextMenu is rendered
		const openContextButton = wrapper.find("[data-test-id='context-menu-open']");
		expect(openContextButton.exists()).toBe(true);
		// contextMenu is clicked
		await openContextButton.trigger("click");

		// registration_link button action is rendered in contextMenu
		const registrationButton = wrapper.find(`[data-testid="registration_link"]`);
		expect(registrationButton.exists()).toBe(true);
		// registration_link button is clicked
		await registrationButton.trigger("click");

		// registration_link action is emitted
		expect(selectionBar.emitted("fire-action")[0][0].dataTestId).toStrictEqual("registration_link");

		// store action is called
		expect(usersActionsStubs.sendRegistrationLink).toHaveBeenCalled();
	});

	it("should emit the 'qr_code' action when the action button is clicked", async () => {
		const { wrapper, usersActionsStubs } = setup();

		// user row exists
		const dataRow = wrapper.findComponent(`[data-testid="table-data-row"]`);
		expect(dataRow.exists()).toBe(true);
		// user row checkbox is clicked
		const checkBox = dataRow.findComponent(VCheckbox);
		expect(checkBox.exists()).toBe(true);
		await checkBox.trigger("click");
		await dataRow.vm.$emit("update:selected", true);
		// user is selected
		expect(dataRow.vm.selected).toBe(true);

		// selection row component is rendered
		const selectionBar = wrapper.findComponent(".row-selection-info");
		expect(selectionBar.exists()).toBe(true);

		// contextMenu is rendered
		const openContextButton = wrapper.find("[data-test-id='context-menu-open']");
		expect(openContextButton.exists()).toBe(true);
		// contextMenu is clicked
		await openContextButton.trigger("click");

		// qr_code button action is rendered in contextMenu
		const registrationButton = wrapper.find(`[data-testid="qr_code"]`);
		expect(registrationButton.exists()).toBe(true);

		// qr_code button is clicked
		await registrationButton.trigger("click");

		// qr_code action is emitted
		expect(selectionBar.emitted("fire-action")[0][0].dataTestId).toStrictEqual("qr_code");

		// store action is called
		expect(usersActionsStubs.getQrRegistrationLinks).toHaveBeenCalled();
	});

	it("should display the same number of elements as in the mockData object", () => {
		const { wrapper } = setup();

		const table = wrapper.findComponent(`[data-testid="students_table"]`);
		expect(table.vm.data).toHaveLength(mockData.length);
	});

	it("should display the columns behind the migration feature flag", () => {
		createTestEnvStore({ ...envs, FEATURE_USER_LOGIN_MIGRATION_ENABLED: true });
		const { wrapper } = setup();
		const column1 = wrapper.find(`[data-testid="lastLoginSystemChange"]`);
		const column2 = wrapper.find(`[data-testid="outdatedSince"]`);

		expect(column1.exists()).toBe(true);
		expect(column2.exists()).toBe(true);
	});

	it("should not display the columns behind the migration feature flag", () => {
		createTestEnvStore({
			...envs,
			FEATURE_USER_LOGIN_MIGRATION_ENABLED: false,
		});

		const { wrapper } = setup();
		const column1 = wrapper.find(`[data-testid="lastLoginSystemChange"]`);
		const column2 = wrapper.find(`[data-testid="outdatedSince"]`);

		expect(column1.exists()).toBe(false);
		expect(column2.exists()).toBe(false);
	});

	it("should display the edit button if school is not external", () => {
		const { wrapper } = setup();

		const editBtn = wrapper.find(`[data-testid="edit_student_button"]`);
		expect(editBtn.exists()).toBe(true);
	});

	it("should not display the edit button if school is external", () => {
		schoolsModule.setSchool({ ...mockSchool, isExternal: true });
		const { wrapper } = setup();

		const editBtn = wrapper.find(`[data-testid="edit_student_button"]`);
		expect(editBtn.exists()).toBe(false);
	});

	it("editBtn's to property should have the expected URL", () => {
		const expectedURL = "/administration/students/0000d231816abba584714c9e/edit?returnUrl=/administration/students";
		const { wrapper } = setup();

		const editBtn = wrapper.find(`[data-testid="edit_student_button"]`);
		expect(editBtn.attributes("href")).toStrictEqual(expectedURL);
	});

	it("should render the fab-floating component if user has SUDENT_CREATE permission", () => {
		const { wrapper } = setup([Permission.StudentCreate]);

		const fabComponent = wrapper.find(`[data-testid="fab_button_students_table"]`);
		expect(fabComponent.exists()).toBe(true);
	});

	it("should not render the fab-floating component if user does not have STUDENT_CREATE permission", () => {
		const { wrapper } = setup([Permission.StudentDelete, RoleName.Administrator]);

		const fabComponent = wrapper.find(`[data-testid="fab_button_students_table"]`);
		expect(fabComponent.exists()).toBe(false);
	});

	it("should not render the fab-floating component if isExternal is true", () => {
		schoolsModule.setSchool({ ...mockSchool, isExternal: true });

		const { wrapper } = setup();

		const fabComponent = wrapper.find(`[data-testid="fab_button_students_table"]`);
		expect(fabComponent.exists()).toBe(false);
	});

	it("should render the adminTableLegend component when school is external", () => {
		schoolsModule.setSchool({ ...mockSchool, isExternal: true });

		const { wrapper } = setup();

		const externalHint = wrapper.find(".external-sync-hint");

		expect(externalHint.exists()).toBe(true);
	});

	it("should not render the adminTableLegend component when school is not external", () => {
		const { wrapper } = setup();

		const externalHint = wrapper.find(".external-sync-hint");
		expect(externalHint.exists()).toBe(false);
	});

	describe("filtering and calling uiSetFilterState composable's methods", () => {
		describe("when searchbar component's value change", () => {
			it("should call setFilterState method", () => {
				const { wrapper, usersActionsStubs } = setup();

				const searchBarInput = wrapper.find("[data-testid=searchbar]").find("input");
				expect(searchBarInput.exists()).toBe(true);

				searchBarInput.setValue("abc");

				vi.runAllTimers();

				expect(setFilterState).toHaveBeenCalledWith({ searchQuery: "abc" });
				expect(usersActionsStubs.findStudents).toHaveBeenCalled();
			});
		});

		describe("when table filter options change", () => {
			it("should setFilterState method", async () => {
				const { wrapper } = setup();

				await nextTick();
				const filterComponent = wrapper.findComponent(DataFilter);
				expect(filterComponent.exists()).toBe(true);

				const emitValue = {
					consentStatus: ["ok"],
				};

				filterComponent.vm.$emit("update:filter", emitValue);
				await nextTick();

				expect(setFilterState).toHaveBeenCalledWith(emitValue);
			});
		});

		describe("when table sorting options change", () => {
			it("should call setSortingState method", async () => {
				const { wrapper } = setup();

				await nextTick();
				const tableComponent = wrapper.findComponent(BackendDataTable);
				expect(tableComponent.exists()).toBe(true);

				const expectedValue = {
					sortBy: "firstName",
					sortOrder: "asc",
				};

				tableComponent.vm.$emit("update:sort", "firstName", "asc");
				await nextTick();

				expect(setSortingState).toHaveBeenCalledWith(expectedValue);
			});
		});

		describe("when table pagination options change", () => {
			it("should call setPaginationState method when rows per page changes", async () => {
				const { wrapper } = setup();

				await nextTick();
				const tableComponent = wrapper.findComponent(BackendDataTable);
				expect(tableComponent.exists()).toBe(true);

				tableComponent.vm.$emit("update:rows-per-page", 5);
				await nextTick();

				const expectedValue = {
					limit: 5,
					page: 1,
				};

				expect(setPaginationState).toHaveBeenCalledWith(expectedValue);
			});

			it("should call setPaginationState method when page changes", async () => {
				const { wrapper } = setup();

				await nextTick();
				const tableComponent = wrapper.findComponent(BackendDataTable);
				expect(tableComponent.exists()).toBe(true);

				tableComponent.vm.$emit("update:current-page", 2);
				await nextTick();

				const expectedValue = {
					limit: 25,
					page: 2,
				};

				expect(setPaginationState).toHaveBeenCalledWith(expectedValue);
			});
		});
	});

	it("should display the consent column if ADMIN_TABLES_DISPLAY_CONSENT_COLUMN is true", () => {
		createTestEnvStore({ ADMIN_TABLES_DISPLAY_CONSENT_COLUMN: true });
		const { wrapper } = setup();

		expect(wrapper.vm.filteredColumns.some((el) => el.field === "consentStatus")).toBe(true);
	});

	it("should display the legend's icons if ADMIN_TABLES_DISPLAY_CONSENT_COLUMN is true", () => {
		createTestEnvStore({ ADMIN_TABLES_DISPLAY_CONSENT_COLUMN: true });

		const { wrapper } = setup();

		const icons = wrapper.find(`[data-testid="legend-icons"]`);
		expect(icons.exists()).toBe(true);
	});

	it("should not display consent warning icon if FEATURE_CONSENT_NECESSARY is false", () => {
		createTestEnvStore({
			ADMIN_TABLES_DISPLAY_CONSENT_COLUMN: true,
			FEATURE_CONSENT_NECESSARY: false,
		});

		const { wrapper } = setup();

		const icons = wrapper.find(`[data-testid="legend-icons"]`);
		expect(icons.exists()).toBe(true);

		expect(wrapper.vm.icons).toStrictEqual([
			{
				icon: mdiCheckAll,
				color: "rgba(var(--v-theme-success))",
				label: "pages.administration.students.legend.icon.success",
			},
			{
				icon: mdiClose,
				color: "rgba(var(--v-theme-error))",
				label: "utils.adminFilter.consent.label.missing",
			},
		]);
	});
});
