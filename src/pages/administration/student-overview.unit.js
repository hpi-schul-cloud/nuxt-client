import { default as StudentPage } from "./StudentOverview.page.vue";
import mock$objects from "../../../tests/test-utils/pageStubs";
import { authModule, envConfigModule, schoolsModule } from "@/store";
import { mockSchool } from "@@/tests/test-utils/mockObjects";
import setupStores from "@@/tests/test-utils/setupStores";
import SchoolsModule from "@/store/schools";
import AuthModule from "@/store/auth";
import EnvConfigModule from "@/store/env-config";

const envs = {
	FALLBACK_DISABLED: false,
	NOT_AUTHENTICATED_REDIRECT_URL: "/login",
	JWT_SHOW_TIMEOUT_WARNING_SECONDS: 3600,
	JWT_TIMEOUT_SECONDS: 7200,
	SC_THEME: process.env.SC_THEME || "default",
	I18N__AVAILABLE_LANGUAGES: "",
	I18N__DEFAULT_LANGUAGE: "",
	I18N__DEFAULT_TIMEZONE: "",
	I18N__FALLBACK_LANGUAGE: "",
	DOCUMENT_BASE_DIR: "",
	SC_TITLE: "",
	SC_SHORT_TITLE: "",
};

const mockData = [
	{
		_id: "0000d231816abba584714c9e",
		firstName: "Marla",
		lastName: "Mathe",
		email: "schueler@schul-cloud.org",
		birthday: "01.01.2000",
	},
	{
		firstName: "Waldemar",
		lastName: "Wunderlich",
		birthday: "01.01.1989",
		email: "waldemar.wunderlich@schul-cloud.org",
	},
];

describe("students/index", () => {
	const deleteUsersStub = jest.fn();
	const OLD_ENV = process.env;

	let mockStore;

	beforeEach(() => {
		jest.useFakeTimers();
		jest.clearAllMocks();

		jest.resetModules(); // reset module registry to avoid conflicts
		process.env = { ...OLD_ENV }; // make a copy

		setupStores({
			auth: AuthModule,
			"env-config": EnvConfigModule,
			schools: SchoolsModule,
		});

		schoolsModule.setSchool({ ...mockSchool, isExternal: false });

		mockStore = {
			classes: {
				actions: {
					find: () => {
						return { data: [] };
					},
				},
			},
			users: {
				actions: {
					findStudents: jest.fn(),
					deleteUsers: deleteUsersStub,
					getQrRegistrationLinks: jest.fn(),
					sendRegistrationLink: jest.fn(),
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
				},
			},
			uiState: {
				getters: {
					get: () => () => ({ page: 1 }),
				},
				mutations: {
					set: jest.fn(),
				},
			},
		};
	});

	const mockUiState = {
		// eslint-disable-next-line no-unused-vars
		get: (key, identifier) => {
			const state = {
				pagination: {},
				sorting: {},
				filter: {},
			};
			return state[key];
		},
		// eslint-disable-next-line no-unused-vars
		set: (key, identifier) => {},
	};

	// always confirm
	const mockDialog = {
		confirm: (params) => {
			params.onConfirm();
		},
	};

	afterAll(() => {
		process.env = OLD_ENV; // restore old environment
	});

	it(...isValidComponent(StudentPage));

	it("should call 'deleteUsers' action", async () => {
		authModule.setUser({
			roles: [
				{
					name: "administrator",
				},
			],
			permissions: ["STUDENT_CREATE", "STUDENT_DELETE"],
		});
		const wrapper = mount(StudentPage, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
				uiState: mockUiState,
				dialog: mockDialog,
			}),
		});
		mock$objects(wrapper);

		await wrapper.vm.$nextTick();

		const userRows = wrapper.findAll('[data-testid="table-data-row"]');
		expect(userRows).toHaveLength(2);

		// select first entry
		const checkbox = userRows
			.at(0)
			.find('.selection-column input[type="checkbox"]');
		checkbox.setChecked();

		// open actions menu
		await wrapper.vm.$nextTick();
		const actionsBtn = wrapper.find(
			".row-selection-info .actions button:first-child"
		);
		actionsBtn.trigger("click");
		await wrapper.vm.$nextTick();

		// click delete menu button
		const deleteBtn = wrapper
			.findAll(".row-selection-info .context-menu button")
			.at(3);
		deleteBtn.trigger("click");

		expect(deleteUsersStub.mock.calls).toHaveLength(1);
		expect(deleteUsersStub.mock.calls[0][1]).toStrictEqual({
			ids: [mockData[0]._id],
			userType: "student",
		});
	});

	it("should dispatch the 'findStudents action on load'", () => {
		mount(StudentPage, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
			}),
		});
		expect(mockStore.users.actions.findStudents).toHaveBeenCalled();
	});

	it("should emit the 'delete' action when deleting a user", async () => {
		const wrapper = mount(StudentPage, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
			}),
		});
		mock$objects(wrapper);
		authModule.addUserPermmission("STUDENT_DELETE");

		// user row exists
		const dataRow = wrapper.find(`[data-testid="table-data-row"]`);
		expect(dataRow.exists()).toBe(true);
		// user row checkbox is clicked
		const checkBox = dataRow.find(".select");
		expect(checkBox.exists()).toBe(true);
		await checkBox.trigger("click");
		jest.runAllTimers();
		// user is selected
		expect(dataRow.vm.selected).toBe(true);

		// selection row component is rendered
		const selectionBar = wrapper.find(".row-selection-info");
		expect(selectionBar.exists()).toBe(true);

		// contextMenu is rendered
		const openContextButton = wrapper.find(".context-menu-open");
		expect(openContextButton.exists()).toBe(true);
		// contextMenu is clicked
		await openContextButton.trigger("click");
		jest.runAllTimers();

		// delete button action is rendered in contextMenu
		const deleteActionButton = wrapper.find(`[data-testid="delete_action"]`);
		expect(deleteActionButton.exists()).toBe(true);
		// delete button is clicked
		await deleteActionButton.trigger("click");
		jest.runAllTimers();

		// delete action is emitted
		expect(selectionBar.emitted("fire-action")[0][0].dataTestId).toStrictEqual(
			"delete_action"
		);
	});

	it("should emit the 'registration_link' action when the action button is clicked", async () => {
		const wrapper = mount(StudentPage, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
			}),
		});
		mock$objects(wrapper);

		// user row exists
		const dataRow = wrapper.find(`[data-testid="table-data-row"]`);
		expect(dataRow.exists()).toBe(true);
		// user row checkbox is clicked
		const checkBox = dataRow.find(".select");
		expect(checkBox.exists()).toBe(true);
		await checkBox.trigger("click");
		// user is selected
		expect(dataRow.vm.selected).toBe(true);

		// selection row component is rendered
		const selectionBar = wrapper.find(".row-selection-info");
		expect(selectionBar.exists()).toBe(true);

		// contextMenu is rendered
		const openContextButton = wrapper.find(".context-menu-open");
		expect(openContextButton.exists()).toBe(true);
		// contextMenu is clicked
		await openContextButton.trigger("click");

		// registration_link button action is rendered in contextMenu
		const registrationButton = wrapper.find(
			`[data-testid="registration_link"]`
		);
		expect(registrationButton.exists()).toBe(true);
		// registration_link button is clicked
		await registrationButton.trigger("click");

		// registration_link action is emitted
		expect(selectionBar.emitted("fire-action")[0][0].dataTestId).toStrictEqual(
			"registration_link"
		);

		// store action is called
		expect(mockStore.users.actions.sendRegistrationLink).toHaveBeenCalled();
	});

	it("should emit the 'qr_code' action when the action button is clicked", async () => {
		const wrapper = mount(StudentPage, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
			}),
		});
		mock$objects(wrapper);

		// user row exists
		const dataRow = wrapper.find(`[data-testid="table-data-row"]`);
		expect(dataRow.exists()).toBe(true);
		// user row checkbox is clicked
		const checkBox = dataRow.find(".select");
		expect(checkBox.exists()).toBe(true);
		await checkBox.trigger("click");
		// user is selected
		expect(dataRow.vm.selected).toBe(true);

		// selection row component is rendered
		const selectionBar = wrapper.find(".row-selection-info");
		expect(selectionBar.exists()).toBe(true);

		// contextMenu is rendered
		const openContextButton = wrapper.find(".context-menu-open");
		expect(openContextButton.exists()).toBe(true);
		// contextMenu is clicked
		await openContextButton.trigger("click");

		// qr_code button action is rendered in contextMenu
		const registrationButton = wrapper.find(`[data-testid="qr_code"]`);
		expect(registrationButton.exists()).toBe(true);

		// qr_code button is clicked
		await registrationButton.trigger("click");

		// qr_code action is emitted
		expect(selectionBar.emitted("fire-action")[0][0].dataTestId).toStrictEqual(
			"qr_code"
		);

		// store action is called
		expect(mockStore.users.actions.getQrRegistrationLinks).toHaveBeenCalled();
	});

	it("should display the same number of elements as in the mockData object", () => {
		const wrapper = mount(StudentPage, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
			}),
		});
		const table = wrapper.find(`[data-testid="students_table"]`);
		expect(table.vm.data).toHaveLength(mockData.length);
	});

	it("should display the edit button if school is not external", () => {
		const wrapper = mount(StudentPage, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
			}),
		});
		const editBtn = wrapper.find(`[data-testid="edit_student_button"]`);
		expect(editBtn.exists()).toBe(true);
	});

	it("should not display the edit button if school is external", () => {
		schoolsModule.setSchool({ ...mockSchool, isExternal: true });
		const wrapper = mount(StudentPage, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
			}),
		});
		const editBtn = wrapper.find(`[data-testid="edit_student_button"]`);
		expect(editBtn.exists()).toBe(false);
	});

	it("editBtn's to property should have the expected URL", () => {
		const expectedURL =
			"/administration/students/0000d231816abba584714c9e/edit";
		const wrapper = mount(StudentPage, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
			}),
		});
		const editBtn = wrapper.find(`[data-testid="edit_student_button"]`);
		expect(editBtn.vm.to).toStrictEqual(expectedURL);
	});

	it("should render the fab-floating component if user has SUDENT_CREATE permission", () => {
		authModule.addUserPermmission("STUDENT_CREATE");
		const wrapper = mount(StudentPage, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
			}),
		});
		const fabComponent = wrapper.find(
			`[data-testid="fab_button_students_table"]`
		);
		expect(fabComponent.exists()).toBe(true);
	});

	it("should not render the fab-floating component if user does not have STUDENT_CREATE permission", () => {
		authModule.setUser({
			roles: [
				{
					name: "administrator",
				},
			],
			permissions: ["STUDENT_DELETE"],
		});
		const customMockStore = { ...mockStore };
		const wrapper = mount(StudentPage, {
			...createComponentMocks({
				i18n: true,
				store: customMockStore,
			}),
		});

		const fabComponent = wrapper.find(
			`[data-testid="fab_button_students_table"]`
		);
		expect(fabComponent.exists()).toBe(false);
	});

	it("should not render the fab-floating component if isExternal is true", () => {
		schoolsModule.setSchool({ ...mockSchool, isExternal: true });

		const wrapper = mount(StudentPage, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
			}),
		});
		const fabComponent = wrapper.find(
			`[data-testid="fab_button_students_table"]`
		);
		expect(fabComponent.exists()).toBe(false);
	});

	it("should render the adminTableLegend component when school is external", () => {
		schoolsModule.setSchool({ ...mockSchool, isExternal: true });

		const wrapper = mount(StudentPage, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
			}),
		});
		const externalHint = wrapper.find(".external-sync-hint");

		expect(externalHint.exists()).toBe(true);
	});

	it("should not render the adminTableLegend component when school is not external", () => {
		const wrapper = mount(StudentPage, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
			}),
		});
		const externalHint = wrapper.find(".external-sync-hint");
		expect(externalHint.exists()).toBe(false);
	});

	it("should call barSearch method when searchbar component's value change", () => {
		const wrapper = mount(StudentPage, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
			}),
		});

		//run all existing timers
		jest.runAllTimers();
		//reset the mock call stack
		mockStore.users.actions.findStudents.mockClear();
		mockStore.uiState.mutations.set.mockClear();

		const searchBarInput = wrapper.find(`input[data-testid="searchbar"]`);
		expect(searchBarInput.exists()).toBe(true);

		searchBarInput.setValue("abc");

		expect(mockStore.uiState.mutations.set).toHaveBeenCalled();

		//run new timer from updating the value
		jest.runAllTimers();

		expect(mockStore.users.actions.findStudents).toHaveBeenCalled();
	});

	// currently disabled, will be reactivated when the new components are in use
	it.skip("should table filter options call uiState after passing props", async () => {
		const wrapper = mount(StudentPage, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
			}),
		});

		mockStore.uiState.mutations.set.mockClear();

		const filterComponent = wrapper.find(`[data-testid="data_filter"]`);
		expect(filterComponent.exists()).toBe(true);

		filterComponent.setProps({ activeFilters: { classes: ["mockclassname"] } });

		await wrapper.vm.$nextTick();

		expect(mockStore.uiState.mutations.set).toHaveBeenCalled();
	});

	it("should display the consent column if ADMIN_TABLES_DISPLAY_CONSENT_COLUMN is true", () => {
		envConfigModule.setEnvs({
			...envs,
			ADMIN_TABLES_DISPLAY_CONSENT_COLUMN: true,
		});
		const wrapper = mount(StudentPage, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
			}),
		});
		expect(envConfigModule.getEnv.ADMIN_TABLES_DISPLAY_CONSENT_COLUMN).toBe(
			true
		);
		expect(
			wrapper.vm.filteredColumns.some((el) => el.field === "consentStatus")
		).toBe(true);
	});

	it("should display the legend's icons if ADMIN_TABLES_DISPLAY_CONSENT_COLUMN is true", () => {
		envConfigModule.setEnvs({
			...envs,
			ADMIN_TABLES_DISPLAY_CONSENT_COLUMN: true,
		});
		const wrapper = mount(StudentPage, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
			}),
		});

		expect(envConfigModule.getEnv.ADMIN_TABLES_DISPLAY_CONSENT_COLUMN).toBe(
			true
		);
		const icons = wrapper.find(`[data-testid="legend-icons"]`);
		expect(icons.exists()).toBe(true);
	});

	it("should not display consent warning icon if FEATURE_CONSENT_NECESSARY is false", () => {
		envConfigModule.setEnvs({
			...envs,
			ADMIN_TABLES_DISPLAY_CONSENT_COLUMN: true,
			FEATURE_CONSENT_NECESSARY: false,
		});
		const wrapper = mount(StudentPage, {
			...createComponentMocks({
				i18n: true,
				store: mockStore,
			}),
		});

		expect(envConfigModule.getEnv.FEATURE_CONSENT_NECESSARY).toBe(false);

		const icons = wrapper.find(`[data-testid="legend-icons"]`);
		expect(icons.exists()).toBe(true);

		expect(wrapper.vm.icons).toStrictEqual([
			{
				icon: "doublecheck",
				color: "var(--color-success)",
				style: "margin: -3px 3px",
				label: "Registrierung abgeschlossen",
			},
			{
				icon: "clear",
				color: "var(--color-danger)",
				label: "Nutzer:in angelegt",
			},
		]);
	});
});
