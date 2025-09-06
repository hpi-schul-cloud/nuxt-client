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
import { envsFactory, meResponseFactory } from "@@/tests/test-utils";
import { mockSchool } from "@@/tests/test-utils/mockObjects";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { nextTick } from "vue";
import { createStore } from "vuex";
import mock$objects from "../../../tests/test-utils/pageStubs";
import StudentPage from "./StudentOverview.page.vue";
import { RouterLinkStub } from "@vue/test-utils";
import { mdiCheckAll, mdiClose } from "@icons/material";

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
					find: () => {
						return { data: [] };
					},
				},
				state: () => ({
					list: [],
				}),
			},
			authModule: {
				namespaced: true,
				getters: {
					getSchool: () => () => ({ ...mockSchool, isExternal: false }),
				},
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
			uiState: {
				namespaced: true,
				getters: {
					get: () => () => ({ page: 1 }),
				},
				mutations: {
					set: vi.fn(),
				},
			},
		},
	};

	const mockStore = createStore(storeOptions);
	const usersActionsStubs = storeOptions.modules.users.actions;
	const uiStateMutationsStubs = storeOptions.modules.uiState.mutations;

	return { mockStore, usersActionsStubs, uiStateMutationsStubs };
};

describe("students/index", () => {
	const OLD_ENV = process.env;

	beforeEach(() => {
		vi.useFakeTimers();

		vi.resetModules(); // reset module registry to avoid conflicts
		process.env = { ...OLD_ENV }; // make a copy

		setupStores({
			authModule: AuthModule,
			envConfigModule: EnvConfigModule,
			schoolsModule: SchoolsModule,
			notifierModule: NotifierModule,
		});

		schoolsModule.setSchool({ ...mockSchool, isExternal: false });
		const mockMe = meResponseFactory.build();
		authModule.setMe(mockMe);
	});

	afterAll(() => {
		process.env = OLD_ENV; // restore old environment
	});

	const mockUiState = {
		get: (key) => {
			const state = {
				pagination: {},
				sorting: {},
				filter: {},
			};
			return state[key];
		},
		set: () => ({}),
	};

	const setup = () => {
		const { mockStore, usersActionsStubs, uiStateMutationsStubs } =
			createMockStore();

		const wrapper = mount(StudentPage, {
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
		authModule.addUserPermission("STUDENT_DELETE");

		await nextTick();

		const userRows = wrapper.findAll('[data-testid="table-data-row"]');
		expect(userRows).toHaveLength(2);

		// select first entry
		const checkbox = userRows
			.at(0)
			.find(".selection-column")
			.get('input[type="checkbox"]');
		checkbox.setChecked();

		// open actions menu
		await nextTick();
		const actionsBtn = wrapper.find(
			".row-selection-info .actions button:first-child"
		);
		await actionsBtn.trigger("click");

		// click delete menu button
		const deleteBtn = wrapper
			.findAll(".row-selection-info .context-menu button")
			.at(3);
		await deleteBtn.trigger("click");

		const confirmBtn = wrapper.findComponent(
			"[data-testid='btn-dialog-confirm']"
		);
		await confirmBtn.trigger("click");

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
		const { wrapper } = setup();

		authModule.addUserPermission("STUDENT_DELETE");

		// user row exists
		const dataRow = wrapper.findComponent(`[data-testid="table-data-row"]`);
		expect(dataRow.exists()).toBe(true);
		// user row checkbox is clicked
		const checkBox = dataRow.find(".select");
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
		const openContextButton = wrapper.find(
			"[data-test-id='context-menu-open']"
		);
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
		expect(selectionBar.emitted("fire-action")[0][0].dataTestId).toStrictEqual(
			"delete_action"
		);
	});

	it("should emit the 'registration_link' action when the action button is clicked", async () => {
		const { wrapper, usersActionsStubs } = setup();

		// user row exists
		const dataRow = wrapper.findComponent(`[data-testid="table-data-row"]`);
		expect(dataRow.exists()).toBe(true);
		// user row checkbox is clicked
		const checkBox = dataRow.find(".select");
		expect(checkBox.exists()).toBe(true);
		await checkBox.trigger("click");
		await dataRow.vm.$emit("update:selected", true);
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
		expect(usersActionsStubs.sendRegistrationLink).toHaveBeenCalled();
	});

	it("should emit the 'qr_code' action when the action button is clicked", async () => {
		const { wrapper, usersActionsStubs } = setup();

		// user row exists
		const dataRow = wrapper.findComponent(`[data-testid="table-data-row"]`);
		expect(dataRow.exists()).toBe(true);
		// user row checkbox is clicked
		const checkBox = dataRow.find(".select");
		expect(checkBox.exists()).toBe(true);
		await checkBox.trigger("click");
		await dataRow.vm.$emit("update:selected", true);
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
		expect(usersActionsStubs.getQrRegistrationLinks).toHaveBeenCalled();
	});

	it("should display the same number of elements as in the mockData object", () => {
		const { wrapper } = setup();

		const table = wrapper.findComponent(`[data-testid="students_table"]`);
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

		const editBtn = wrapper.find(`[data-testid="edit_student_button"]`);
		expect(editBtn.exists()).toBe(true);
	});

	it("should not display the edit button if school is external", () => {
		schoolsModule.setSchool({ ...mockSchool, isExternal: true });
		const { wrapper } = setup();

		const editBtn = wrapper.find(`[data-testid="edit_student_button"]`);
		expect(editBtn.exists()).toBe(false);
	});

	it("editBtn's to property should have the expected URL", async () => {
		const expectedURL =
			"/administration/students/0000d231816abba584714c9e/edit?returnUrl=/administration/students";
		const { wrapper } = setup();

		const editBtn = wrapper.find(`[data-testid="edit_student_button"]`);
		expect(editBtn.attributes("href")).toStrictEqual(expectedURL);
	});

	it("should render the fab-floating component if user has SUDENT_CREATE permission", () => {
		authModule.addUserPermission("STUDENT_CREATE");
		const { wrapper } = setup();

		const fabComponent = wrapper.find(
			`[data-testid="fab_button_students_table"]`
		);
		expect(fabComponent.exists()).toBe(true);
	});

	it("should not render the fab-floating component if user does not have STUDENT_CREATE permission", () => {
		authModule.setMe({
			roles: [
				{
					name: "administrator",
				},
			],
			permissions: ["STUDENT_DELETE"],
		});
		const { wrapper } = setup();

		const fabComponent = wrapper.find(
			`[data-testid="fab_button_students_table"]`
		);
		expect(fabComponent.exists()).toBe(false);
	});

	it("should not render the fab-floating component if isExternal is true", () => {
		schoolsModule.setSchool({ ...mockSchool, isExternal: true });

		const { wrapper } = setup();

		const fabComponent = wrapper.find(
			`[data-testid="fab_button_students_table"]`
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

		const externalHint = wrapper.find(".external-sync-hint");
		expect(externalHint.exists()).toBe(false);
	});

	it("should call barSearch method when searchbar component's value change", () => {
		const { wrapper, usersActionsStubs, uiStateMutationsStubs } = setup();

		//run all existing timers
		vi.runAllTimers();

		const searchBarInput = wrapper.find(`input[data-testid="searchbar"]`);
		expect(searchBarInput.exists()).toBe(true);

		searchBarInput.setValue("abc");

		//run new timer from updating the value
		vi.runAllTimers();

		expect(uiStateMutationsStubs.set).toHaveBeenCalled();

		expect(usersActionsStubs.findStudents).toHaveBeenCalled();
	});

	// currently disabled, will be reactivated when the new components are in use
	it.skip("should table filter options call uiState after passing props", async () => {
		const { wrapper, uiStateMutationsStubs } = setup();

		uiStateMutationsStubs.set.mockClear();

		const filterComponent = wrapper.find(`[data-testid="data_filter"]`);
		expect(filterComponent.exists()).toBe(true);

		filterComponent.setProps({ activeFilters: { classes: ["mockclassname"] } });

		await nextTick();

		expect(uiStateMutationsStubs.set).toHaveBeenCalled();
	});

	it("should display the consent column if ADMIN_TABLES_DISPLAY_CONSENT_COLUMN is true", () => {
		const envBuild = envsFactory.build({
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

	it("should not display consent warning icon if FEATURE_CONSENT_NECESSARY is false", () => {
		const envBuild = envsFactory.build({
			ADMIN_TABLES_DISPLAY_CONSENT_COLUMN: true,
			FEATURE_CONSENT_NECESSARY: false,
		});
		envConfigModule.setEnvs(envBuild);
		const { wrapper } = setup();

		expect(envConfigModule.getEnv.FEATURE_CONSENT_NECESSARY).toBe(false);

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
