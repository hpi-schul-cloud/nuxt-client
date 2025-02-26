import BaseDialog from "@/components/base/BaseDialog/BaseDialog.vue";
import BaseInput from "@/components/base/BaseInput/BaseInput.vue";
import BaseLink from "@/components/base/BaseLink.vue";
import BaseModal from "@/components/base/BaseModal.vue";
import { SchulcloudTheme } from "@/serverApi/v3";
import { authModule, envConfigModule, schoolsModule } from "@/store";
import AuthModule from "@/store/auth";
import EnvConfigModule from "@/store/env-config";
import NotifierModule from "@/store/notifier";
import SchoolsModule from "@/store/schools";
import { envsFactory } from "@@/tests/test-utils";
import { mockSchool } from "@@/tests/test-utils/mockObjects";
import mock$objects from "@@/tests/test-utils/pageStubs";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { nextTick } from "vue";
import { createStore } from "vuex";
import TeacherPage from "./TeacherOverview.page.vue";
import { RouterLinkStub } from "@vue/test-utils";

const mockData = [
	{
		_id: "0000d231816abba584714c9e",
		firstName: "Carl",
		lastName: "Cord",
		email: "lehrer@schul-cloud.org",
		classes: [],
		consentStatus: "ok",
		createdAt: "2017-01-01T00:06:37.148Z",
		lastLoginSystemChange: "2022-01-01T13:36:12.148Z",
	},
	{
		_id: "0000d231816abba584714c9f",
		firstName: "Max",
		lastName: "Mustermann",
		email: "mustermann@schul-cloud.org",
		classes: [],
		consentStatus: "ok",
		createdAt: "2017-01-01T00:06:37.148Z",
		outdatedSince: "2022-02-02T13:36:12.148Z",
	},
];

const envs = {
	FALLBACK_DISABLED: false,
	NOT_AUTHENTICATED_REDIRECT_URL: "/login",
	JWT_SHOW_TIMEOUT_WARNING_SECONDS: 3600,
	JWT_TIMEOUT_SECONDS: 7200,
	SC_THEME: process.env.SC_THEME || SchulcloudTheme.Default,
	ADMIN_TABLES_DISPLAY_CONSENT_COLUMN: false,
	FEATURE_ES_COLLECTIONS_ENABLED: null,
	FEATURE_EXTENSIONS_ENABLED: null,
	FEATURE_TEAMS_ENABLED: null,
	I18N__AVAILABLE_LANGUAGES: [],
	I18N__DEFAULT_LANGUAGE: "",
	I18N__DEFAULT_TIMEZONE: "",
	I18N__FALLBACK_LANGUAGE: "",
	DOCUMENT_BASE_DIR: "",
	SC_TITLE: "",
};

const createMockStore = () => {
	const storeOptions = {
		modules: {
			classes: {
				namespaced: true,
				actions: {
					find: () => {
						return { data: [] };
					},
				},
				state: () => ({
					list: [],
				}),
			},
			users: {
				namespaced: true,
				actions: {
					findTeachers: jest.fn(),
					deleteUsers: jest.fn(),
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
				namespaced: true,
				getters: {
					get: () => () => ({ page: 1 }),
				},
				mutations: {
					set: jest.fn(),
				},
			},
		},
	};

	const mockStore = createStore(storeOptions);
	const usersActionsStubs = storeOptions.modules.users.actions;
	const uiStateMutationsStubs = storeOptions.modules.uiState.mutations;

	return { mockStore, usersActionsStubs, uiStateMutationsStubs };
};

describe("teachers/index", () => {
	const OLD_ENV = process.env;

	beforeEach(() => {
		jest.useFakeTimers();

		jest.resetModules(); // reset module registry to avoid conflicts
		process.env = { ...OLD_ENV }; // make a copy

		setupStores({
			authModule: AuthModule,
			envConfigModule: EnvConfigModule,
			schoolsModule: SchoolsModule,
			notifierModule: NotifierModule,
		});

		schoolsModule.setSchool({ ...mockSchool, isExternal: false });
		authModule.setMe({
			roles: [
				{
					name: "administrator",
				},
			],
			permissions: ["TEACHER_CREATE", "TEACHER_DELETE"],
		});
	});

	afterAll(() => {
		process.env = OLD_ENV; // restore old environment
	});

	const mockUiState = {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		get: (key, identifier) => {
			const state = {
				pagination: {},
				sorting: {},
				filter: {},
			};
			return state[key];
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		set: (key, identifier) => ({}),
	};

	const setup = () => {
		const { mockStore, usersActionsStubs, uiStateMutationsStubs } =
			createMockStore();

		const wrapper = mount(TeacherPage, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				mocks: {
					$store: mockStore,
					uiState: mockUiState,
				},
				components: {
					"base-input": BaseInput,
					"base-link": BaseLink,
					"base-dialog": BaseDialog,
					"base-modal": BaseModal,
				},
				stubs: { RouterLink: RouterLinkStub },
			},
		});

		mock$objects(wrapper);

		return { wrapper, mockStore, usersActionsStubs, uiStateMutationsStubs };
	};

	it("should call 'deleteUsers' action", async () => {
		const { wrapper, usersActionsStubs } = setup();

		await nextTick();

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
			.at(2);
		await deleteBtn.trigger("click");

		const confirmBtn = wrapper.findComponent(
			"[data-testid='btn-dialog-confirm']"
		);
		await confirmBtn.trigger("click");

		expect(usersActionsStubs.deleteUsers.mock.calls).toHaveLength(1);
		expect(usersActionsStubs.deleteUsers.mock.calls[0][1]).toStrictEqual({
			ids: [mockData[0]._id],
			userType: "teacher",
		});
	});

	it("should dispatch the 'findTeachers' action on load'", () => {
		const { usersActionsStubs } = setup();

		expect(usersActionsStubs.findTeachers).toHaveBeenCalled();
	});

	it("should emit the 'delete' action when deleting a user", async () => {
		const { wrapper } = setup();

		await nextTick();

		// user row exists
		const dataRow = wrapper.findComponent(`[data-testid="table-data-row"]`);
		expect(dataRow.exists()).toBe(true);
		// user row checkbox is clicked
		const checkBox = dataRow.find(".select");
		expect(checkBox.exists()).toBe(true);
		await checkBox.trigger("click");
		await dataRow.vm.$emit("update:selected", true);
		jest.runAllTimers();
		// user is selected
		expect(dataRow.vm.selected).toBe(true);

		// selection row component is rendered
		const selectionBar = wrapper.findComponent(".row-selection-info");
		expect(selectionBar.exists()).toBe(true);

		// contextMenu is rendered
		const openContextButton = wrapper.find(
			"[data-test-id='context-menu-open']"
		);
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
		const { wrapper } = setup();

		// user row exists
		const dataRow = wrapper.findComponent(`[data-testid="table-data-row"]`);
		expect(dataRow.exists()).toBe(true);
		// user row checkbox is clicked
		const checkBox = dataRow.find(".select");
		expect(checkBox.exists()).toBe(true);
		await checkBox.trigger("click");
		await dataRow.vm.$emit("update:selected", true);
		jest.runAllTimers();
		// user is selected
		expect(dataRow.vm.selected).toBe(true);

		// selection row component is rendered
		const selectionBar = wrapper.findComponent(".row-selection-info");
		expect(selectionBar.exists()).toBe(true);

		// contextMenu is rendered
		const openContextButton = wrapper.find(
			"[data-test-id='context-menu-open']"
		);
		expect(openContextButton.exists()).toBe(true);
		// contextMenu is clicked
		await openContextButton.trigger("click");
		jest.runAllTimers();

		// registration_link button action is rendered in contextMenu
		const registrationButton = wrapper.find(
			`[data-testid="registration_link"]`
		);
		expect(registrationButton.exists()).toBe(true);
		// registration_link button is clicked
		await registrationButton.trigger("click");
		jest.runAllTimers();

		// registration_link action is emitted
		expect(selectionBar.emitted("fire-action")[0][0].dataTestId).toStrictEqual(
			"registration_link"
		);
	});

	it("should emit the 'qr_code' action when the action button is clicked", async () => {
		const { wrapper } = setup();

		// user row exists
		const dataRow = wrapper.findComponent(`[data-testid="table-data-row"]`);
		expect(dataRow.exists()).toBe(true);
		// user row checkbox is clicked
		const checkBox = dataRow.find(".select");
		expect(checkBox.exists()).toBe(true);
		await checkBox.trigger("click");
		await dataRow.vm.$emit("update:selected", true);
		jest.runAllTimers();
		// user is selected
		expect(dataRow.vm.selected).toBe(true);

		// selection row component is rendered
		const selectionBar = wrapper.findComponent(".row-selection-info");
		expect(selectionBar.exists()).toBe(true);

		// contextMenu is rendered
		const openContextButton = wrapper.find(
			"[data-test-id='context-menu-open']"
		);
		expect(openContextButton.exists()).toBe(true);
		// contextMenu is clicked
		await openContextButton.trigger("click");
		jest.runAllTimers();

		// qr_code button action is rendered in contextMenu
		const registrationButton = wrapper.find(`[data-testid="qr_code"]`);
		expect(registrationButton.exists()).toBe(true);
		// qr_code button is clicked
		await registrationButton.trigger("click");
		jest.runAllTimers();

		// qr_code action is emitted
		expect(selectionBar.emitted("fire-action")[0][0].dataTestId).toStrictEqual(
			"qr_code"
		);
	});

	it("should display the same number of elements as in the mockData object", () => {
		const { wrapper } = setup();

		const table = wrapper.findComponent(`[data-testid="teachers_table"]`);
		expect(table.vm.data).toHaveLength(mockData.length);
	});

	it("should display the columns behind the migration feature flag", () => {
		const envBuild = envsFactory.build({
			...envs,
			FEATURE_USER_LOGIN_MIGRATION_ENABLED: true,
		});
		envConfigModule.setEnvs(envBuild);
		const { wrapper } = setup();

		const column1 = wrapper.find(`[data-testid="lastLoginSystemChange"]`);
		const column2 = wrapper.find(`[data-testid="outdatedSince"]`);

		expect(envConfigModule.getEnv.FEATURE_USER_LOGIN_MIGRATION_ENABLED).toBe(
			true
		);
		expect(column1.exists()).toBe(true);
		expect(column2.exists()).toBe(true);
	});

	it("should not display the columns behind the migration feature flag", () => {
		const envBuild = envsFactory.build({
			...envs,
			FEATURE_USER_LOGIN_MIGRATION_ENABLED: false,
		});
		envConfigModule.setEnvs(envBuild);
		const { wrapper } = setup();

		const column1 = wrapper.find(`[data-testid="lastLoginSystemChange"]`);
		const column2 = wrapper.find(`[data-testid="outdatedSince"]`);

		expect(envConfigModule.getEnv.FEATURE_USER_LOGIN_MIGRATION_ENABLED).toBe(
			false
		);
		expect(column1.exists()).toBe(false);
		expect(column2.exists()).toBe(false);
	});

	it("should display the edit button if school is not external", () => {
		const { wrapper } = setup();

		const editBtn = wrapper.find(`[data-testid="edit_teacher_button"]`);
		expect(editBtn.exists()).toBe(true);
	});

	it("should not display the edit button if school is external", () => {
		schoolsModule.setSchool({ ...mockSchool, isExternal: true });
		const { wrapper } = setup();

		const editBtn = wrapper.find(`[data-testid="edit_teacher_button"]`);
		expect(editBtn.exists()).toBe(false);
	});

	it("editBtn's to property should have the expected URL", () => {
		const expectedURL =
			"/administration/teachers/0000d231816abba584714c9e/edit?returnUrl=/administration/teachers";
		const { wrapper } = setup();

		const editBtn = wrapper.find(`[data-testid="edit_teacher_button"]`);
		expect(editBtn.attributes("href")).toStrictEqual(expectedURL);
	});

	it("should render the fab-floating component if user has TEACHER_CREATE permission", () => {
		const { wrapper } = setup();

		const fabComponent = wrapper.find(
			`[data-testid="fab_button_teachers_table"]`
		);
		expect(fabComponent.exists()).toBe(true);
	});

	it("should not render the fab-floating component if user does not have TEACHER_CREATE permission", () => {
		const { wrapper } = setup();

		const fabComponent = wrapper.find(".external-sync-hint");
		expect(fabComponent.exists()).toBe(false);
	});

	it("should not render the fab-floating component if isExternal is true", () => {
		schoolsModule.setSchool({ ...mockSchool, isExternal: true });
		const { wrapper } = setup();

		const fabComponent = wrapper.find(
			`[data-testid="fab_button_teachers_table"]`
		);
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

		const externalHint = wrapper.find(`.external-sync-hint`);
		expect(externalHint.exists()).toBe(false);
	});

	it("should call barSearch method when searchbar component's value change", () => {
		const { wrapper, usersActionsStubs, uiStateMutationsStubs } = setup();

		// run all existing timers
		jest.runAllTimers();

		const searchBarInput = wrapper
			.find(`[data-testid="searchbar"]`)
			.get("input");
		expect(searchBarInput.exists()).toBe(true);

		searchBarInput.setValue("abc");

		//run new timer from updating the value
		jest.runAllTimers();

		expect(uiStateMutationsStubs.set).toHaveBeenCalled();
		expect(usersActionsStubs.findTeachers).toHaveBeenCalled();
	});

	// currently disabled, will be reactivated when the new components are in use
	it.skip("should table filter options call uiState after passing props", () => {
		const { wrapper, uiStateMutationsStubs } = setup();

		jest.runAllTimers();

		const filterComponent = wrapper.findComponent(
			`[data-testid="data_filter"]`
		);
		expect(filterComponent.exists()).toBe(true);

		filterComponent.setProps({ activeFilters: { classes: ["mockclassname"] } });

		jest.runAllTimers();

		expect(uiStateMutationsStubs.set).toHaveBeenCalled();
	});

	it("should display the consent column if ADMIN_TABLES_DISPLAY_CONSENT_COLUMN is true", () => {
		const envBuild = envsFactory.build({
			...envs,
			ADMIN_TABLES_DISPLAY_CONSENT_COLUMN: true,
		});
		envConfigModule.setEnvs(envBuild);
		const { wrapper } = setup();
		expect(envConfigModule.getEnv.ADMIN_TABLES_DISPLAY_CONSENT_COLUMN).toBe(
			true
		);
		expect(
			wrapper.vm.filteredColumns.some((el) => el.field === "consentStatus")
		).toBe(true);
	});

	it("should display the legend's icons if ADMIN_TABLES_DISPLAY_CONSENT_COLUMN is true", () => {
		const envBuild = envsFactory.build({
			...envs,
			ADMIN_TABLES_DISPLAY_CONSENT_COLUMN: true,
		});
		envConfigModule.setEnvs(envBuild);
		const { wrapper } = setup();
		expect(envConfigModule.getEnv.ADMIN_TABLES_DISPLAY_CONSENT_COLUMN).toBe(
			true
		);
		const icons = wrapper.find(`[data-testid="legend-icons"]`);
		expect(icons.exists()).toBe(true);
	});
});
