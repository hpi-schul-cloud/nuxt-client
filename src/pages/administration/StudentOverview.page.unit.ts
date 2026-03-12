import StudentPage from "./StudentOverview.page.vue";
import AdminTableLegend from "@/components/administration/AdminTableLegend.vue";
import BackendDataTable from "@/components/administration/BackendDataTable.vue";
import { useFilterLocalStorage } from "@/components/administration/data-filter/composables/filterLocalStorage.composable";
import DataFilter from "@/components/administration/data-filter/DataFilter.vue";
import DeleteUserDialog from "@/components/administration/DeleteUserDialog.vue";
import store from "@/plugins/store";
import { Permission, RoleName } from "@api-server";
import { schoolsModule } from "@/store";
import SchoolsModule from "@/store/schools";
import { createTestAppStore, createTestEnvStore, expectNotification, userResponseFactory } from "@@/tests/test-utils";
import setupConfirmationComposableMock from "@@/tests/test-utils/composable-mocks/setupConfirmationComposableMock";
import { mockSchool } from "@@/tests/test-utils/mockObjects";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { useClasses } from "@data-classes";
import { useUsers } from "@data-users";
import { mdiCheck, mdiCheckAll, mdiClose } from "@icons/material";
import { createTestingPinia } from "@pinia/testing";
import { useConfirmationDialog } from "@ui-confirmation-dialog";
import { SvsSearchField } from "@ui-controls";
import { flushPromises, RouterLinkStub, VueWrapper } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { Mock } from "vitest";
import { computed, nextTick, ref } from "vue";
import { useRouter } from "vue-router";
import { VCheckbox } from "vuetify/components";

vi.mock("@/components/administration/data-filter/composables/filterLocalStorage.composable");
const mockedUseFilterLocalStorage = vi.mocked(useFilterLocalStorage);

vi.mock("@ui-confirmation-dialog");
const mockedUseRemoveConfirmationDialog = vi.mocked(useConfirmationDialog);

vi.mock("@data-users/users.composable");
const mockedUseUsers = vi.mocked(useUsers);

vi.mock("@data-classes/classes.composable");
const mockedUseClasses = vi.mocked(useClasses);

vi.mock("vue-router");
const useRouterMock = <Mock>useRouter;

vi.mock("@util-browser");

function writableComputed<T>(initial: T) {
	const r = ref(initial);
	return computed<T>({
		get: () => r.value,
		set: (val: T) => {
			r.value = val;
		},
	});
}

describe("student overview page", () => {
	let askConfirmationMock: Mock;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		createTestEnvStore();

		askConfirmationMock = vi.fn();
		setupConfirmationComposableMock({
			askConfirmationMock,
		});

		mockedUseRemoveConfirmationDialog.mockReturnValue({
			askConfirmation: askConfirmationMock,
			isDialogOpen: ref(false),
		});

		setupStores({
			schoolsModule: SchoolsModule,
		});
		schoolsModule.setSchool({ ...mockSchool, isExternal: false });

		window.open = vi.fn();
		window.scrollTo = vi.fn();
	});

	afterEach(() => {
		vi.resetModules();
	});

	const setup = (options?: Partial<{ permissions: Permission[]; roleName: RoleName }>) => {
		const { permissions, roleName } = {
			permissions: options?.permissions ?? [],
			roleName: options?.roleName ?? RoleName.ADMINISTRATOR,
			...options,
		};

		createTestAppStore({
			me: {
				school: mockSchool,
				roles: [{ id: roleName, name: roleName }],
				permissions: permissions,
			},
		});

		const useFilterLocalStorageMockReturn: ReturnType<typeof useFilterLocalStorage> = {
			currentFilterQuery: writableComputed({}),
			page: writableComputed(1),
			limit: writableComputed(10),
			sortBy: writableComputed("firstName"),
			sortOrder: writableComputed("asc"),
			searchQuery: writableComputed(""),
		};
		mockedUseFilterLocalStorage.mockReturnValue(useFilterLocalStorageMockReturn);

		const useClassesMockReturn: ReturnType<typeof useClasses> = {
			fetchClasses: vi.fn(),
			classNameList: ref([]),
		};
		mockedUseClasses.mockReturnValue(useClassesMockReturn);

		const userResponseList = userResponseFactory.buildList(10);
		const useUserMock: ReturnType<typeof useUsers> = {
			fetchUsers: vi.fn(),
			createUser: vi.fn(),
			deleteUsers: vi.fn(),
			getQrRegistrationLinks: vi.fn(),
			sendRegistrationLink: vi.fn(),
			userList: ref(userResponseList),
			deletingProgress: ref({
				active: false,
				percent: 0,
			}),
			pagination: ref({
				limit: 0,
				skip: 0,
				total: 0,
			}),
			qrLinks: ref([]),
		};
		mockedUseUsers.mockReturnValue(useUserMock);

		useRouterMock.mockReturnValue({
			push: vi.fn(),
		});

		const wrapper = mount(StudentPage, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n(), store],
				stubs: { RouterLink: RouterLinkStub },
			},
		});

		return {
			wrapper,
			useUserMock,
			useFilterLocalStorageMockReturn,
			useClassesMockReturn,
			firstUser: userResponseList[0],
		};
	};

	it("should render the component", () => {
		const { wrapper } = setup();

		expect(wrapper.exists()).toBe(true);
	});

	describe("on mounted", () => {
		it("should fetch user", () => {
			const { useUserMock, useFilterLocalStorageMockReturn } = setup();

			expect(useUserMock.fetchUsers).toHaveBeenCalled();
			expect(useUserMock.fetchUsers).toHaveBeenCalledWith({
				$limit: useFilterLocalStorageMockReturn.limit.value,
				$skip: 0,
				$sort: { firstName: 1 },
				searchQuery: useFilterLocalStorageMockReturn.searchQuery.value,
			});
		});

		it("should fetch classes", () => {
			const { useClassesMockReturn } = setup();

			expect(useClassesMockReturn.fetchClasses).toHaveBeenCalledWith({
				$limit: 1000,
				year: schoolsModule.getCurrentYear?.id,
			});
		});
	});

	describe("context menu for bulk actions", () => {
		const openContextMenu = async (wrapper: VueWrapper, userIndex: number) => {
			const userRows = wrapper.findAll('[data-testid="table-data-row"]');
			const checkbox = userRows[userIndex].getComponent(VCheckbox);
			await checkbox.setValue(true);

			const actionsBtn = wrapper.get("[data-test-id='context-menu-open']");
			await actionsBtn.trigger("click");
		};

		it("should call delete users, notify success and refresh the user list", async () => {
			askConfirmationMock.mockResolvedValue(true);
			const { wrapper, useUserMock, firstUser } = setup({ permissions: [Permission.STUDENT_DELETE] });

			await openContextMenu(wrapper, 0);

			// click delete menu button
			const deleteBtn = wrapper.get(`[data-testid="delete_action"]`);
			await deleteBtn.trigger("click");

			wrapper.findComponent(DeleteUserDialog).vm.$emit("confirm");
			await flushPromises();

			expect(useUserMock.deleteUsers).toHaveBeenCalled();
			expect(useUserMock.deleteUsers).toHaveBeenCalledWith([firstUser._id]);
			expectNotification("success");
			expect(useUserMock.fetchUsers).toHaveBeenCalled();
		});

		it("should notify error when delete users fails", async () => {
			askConfirmationMock.mockResolvedValue(true);
			const { wrapper, useUserMock, firstUser } = setup({ permissions: [Permission.STUDENT_DELETE] });
			(useUserMock.deleteUsers as Mock).mockRejectedValue(new Error("Delete failed"));

			await openContextMenu(wrapper, 0);

			// click delete menu button
			const deleteBtn = wrapper.get(`[data-testid="delete_action"]`);
			await deleteBtn.trigger("click");

			wrapper.findComponent(DeleteUserDialog).vm.$emit("confirm");
			await flushPromises();

			expectNotification("error");
			expect(useUserMock.deleteUsers).toHaveBeenCalledWith([firstUser._id]);
		});

		it("should handle bulk registration emails", async () => {
			const { wrapper, useUserMock, firstUser } = setup();

			await openContextMenu(wrapper, 0);

			const bulkEmailBtn = wrapper.get(`[data-testid="registration_link"]`);
			await bulkEmailBtn.trigger("click");

			expect(useUserMock.sendRegistrationLink).toHaveBeenCalledWith({
				userIds: [firstUser._id],
				selectionType: "inclusive",
			});
		});

		it("should handle bulk qr code generation", async () => {
			const { wrapper, useUserMock, firstUser } = setup();
			useUserMock.qrLinks.value = [
				{ title: "qrLink1", qrContent: "content1" },
				{ title: "qrLink2", qrContent: "content2" },
			];

			await openContextMenu(wrapper, 0);

			const qrCodeBtn = wrapper.get(`[data-testid="qr_code"]`);
			await qrCodeBtn.trigger("click");

			expect(useUserMock.getQrRegistrationLinks).toHaveBeenCalledWith({
				userIds: [firstUser._id],
				selectionType: "inclusive",
			});
		});

		it("should notify when no qr links are available", async () => {
			const { wrapper, useUserMock } = setup();
			useUserMock.qrLinks.value = [];

			await openContextMenu(wrapper, 0);

			const qrCodeBtn = wrapper.get(`[data-testid="qr_code"]`);
			await qrCodeBtn.trigger("click");

			expectNotification("info");
		});

		it("should handle bulk consent ", async () => {
			const { wrapper } = setup();

			await openContextMenu(wrapper, 0);

			const bulkConsentBtn = wrapper.get(`[data-testid="consent_action"]`);
			await bulkConsentBtn.trigger("click");

			expect(useRouterMock().push).toHaveBeenCalledWith({ path: "/administration/students/consent" });
		});
	});

	it("should display the same number of elements as in the mockData object", () => {
		const { wrapper, useUserMock } = setup();

		const table = wrapper.find(`[data-testid="students_table"]`).findComponent(BackendDataTable);
		expect(table.props("data")).toHaveLength(useUserMock.userList.value.length);
	});

	it("should display the columns behind the migration feature flag", () => {
		createTestEnvStore({ FEATURE_USER_LOGIN_MIGRATION_ENABLED: true });
		const { wrapper } = setup();
		const column1 = wrapper.find(`[data-testid="lastLoginSystemChange"]`);
		const column2 = wrapper.find(`[data-testid="outdatedSince"]`);

		expect(column1.exists()).toBe(true);
		expect(column2.exists()).toBe(true);
	});

	it("should not display the columns behind the migration feature flag", () => {
		createTestEnvStore({
			FEATURE_USER_LOGIN_MIGRATION_ENABLED: false,
		});

		const { wrapper } = setup();
		const column1 = wrapper.find(`[data-testid="lastLoginSystemChange"]`);
		const column2 = wrapper.find(`[data-testid="outdatedSince"]`);

		expect(column1.exists()).toBe(false);
		expect(column2.exists()).toBe(false);
	});

	it("editBtn's to property should have the expected URL", () => {
		const { wrapper, firstUser } = setup();
		const expectedURL = `/administration/students/${firstUser._id}/edit?returnUrl=/administration/students`;

		const editBtn = wrapper.find(`[data-testid="edit_student_button"]`);
		expect(editBtn.attributes("href")).toStrictEqual(expectedURL);
	});

	it("should render the fab-floating component if user has SUDENT_CREATE permission", () => {
		const { wrapper } = setup({ permissions: [Permission.STUDENT_CREATE] });

		const fabComponent = wrapper.find(`[data-testid="fab_button_students_table"]`);
		expect(fabComponent.exists()).toBe(true);
	});

	it("should not render the fab-floating component if user does not have STUDENT_CREATE permission", () => {
		const { wrapper } = setup({ permissions: [Permission.STUDENT_DELETE], roleName: RoleName.ADMINISTRATOR });

		const fabComponent = wrapper.find(`[data-testid="fab_button_students_table"]`);
		expect(fabComponent.exists()).toBe(false);
	});

	describe("when school is external", () => {
		it("should render the adminTableLegend component", () => {
			schoolsModule.setSchool({ ...mockSchool, isExternal: true });

			const { wrapper } = setup();

			const adminTableLegend = wrapper.findComponent(AdminTableLegend);
			expect(adminTableLegend.props().showExternalSyncHint).toBe(true);
		});

		it("should not render the fab-floating component", () => {
			schoolsModule.setSchool({ ...mockSchool, isExternal: true });

			const { wrapper } = setup();

			const fabComponent = wrapper.find(`[data-testid="fab_button_students_table"]`);
			expect(fabComponent.exists()).toBe(false);
		});

		it("should not display the edit button", () => {
			schoolsModule.setSchool({ ...mockSchool, isExternal: true });
			const { wrapper } = setup();

			const editBtn = wrapper.find(`[data-testid="edit_student_button"]`);
			expect(editBtn.exists()).toBe(false);
		});
	});
	describe("when school is not external", () => {
		it("should not render the adminTableLegend component", () => {
			const { wrapper } = setup();

			const adminTableLegend = wrapper.findComponent(AdminTableLegend);
			expect(adminTableLegend.props().showExternalSyncHint).toBe(false);
		});

		it("should display the edit button", () => {
			const { wrapper } = setup();

			const editBtn = wrapper.find(`[data-testid="edit_student_button"]`);
			expect(editBtn.exists()).toBe(true);
		});
	});

	describe("filtering", () => {
		describe("when searchbar component's value change", () => {
			it("should set search query and fetch filtered users", async () => {
				const { wrapper, useFilterLocalStorageMockReturn, useUserMock } = setup();

				const searchBarInput = wrapper.findComponent(SvsSearchField);
				await searchBarInput.setValue("abc");
				await flushPromises();

				expect(useFilterLocalStorageMockReturn.searchQuery.value).toBe("abc");
				expect(useFilterLocalStorageMockReturn.page.value).toBe(1);
				expect(useUserMock.fetchUsers).toHaveBeenCalled();
			});
		});

		describe("when table filter options change", () => {
			it("should set filter query and fetch filtered users", async () => {
				const { wrapper, useFilterLocalStorageMockReturn, useUserMock } = setup();

				const filterComponent = wrapper.findComponent(DataFilter);
				expect(filterComponent.exists()).toBe(true);

				const emitValue = {
					consentStatus: ["ok"],
				};

				filterComponent.vm.$emit("update:filter", emitValue);
				await nextTick();

				expect(useFilterLocalStorageMockReturn.currentFilterQuery.value).toEqual(emitValue);
				expect(useUserMock.fetchUsers).toHaveBeenCalled();
			});
		});

		describe("when table sorting options change", () => {
			it("should fetch filtered users", async () => {
				const { wrapper, useUserMock, useFilterLocalStorageMockReturn } = setup();

				const tableComponent = wrapper.findComponent(BackendDataTable);
				expect(tableComponent.exists()).toBe(true);

				const newSortBy = "firstName";
				const newSortOrder = "asc";

				tableComponent.vm.$emit("update:sort", newSortBy, newSortOrder);
				await nextTick();

				expect(useFilterLocalStorageMockReturn.sortBy.value).toBe(newSortBy);
				expect(useFilterLocalStorageMockReturn.sortOrder.value).toBe(newSortOrder);
				expect(useUserMock.fetchUsers).toHaveBeenCalled();
			});
		});

		describe("when table pagination options change", () => {
			describe("when rows per page changes", () => {
				it("should fetch filtered users", async () => {
					const { wrapper, useUserMock, useFilterLocalStorageMockReturn } = setup();

					const tableComponent = wrapper.findComponent(BackendDataTable);
					expect(tableComponent.exists()).toBe(true);

					const newLimit = 5;

					tableComponent.vm.$emit("update:rows-per-page", newLimit);
					await nextTick();

					expect(useFilterLocalStorageMockReturn.limit.value).toBe(newLimit);
					expect(useFilterLocalStorageMockReturn.page.value).toBe(1);
					expect(useUserMock.fetchUsers).toHaveBeenCalled();
				});
			});

			describe("when page changes", () => {
				it("should fetch filtered users", async () => {
					const { wrapper, useUserMock, useFilterLocalStorageMockReturn } = setup();

					const tableComponent = wrapper.findComponent(BackendDataTable);
					expect(tableComponent.exists()).toBe(true);

					const newPage = 2;
					tableComponent.vm.$emit("update:current-page", newPage);
					await nextTick();

					expect(useFilterLocalStorageMockReturn.page.value).toBe(newPage);
					expect(useUserMock.fetchUsers).toHaveBeenCalled();
				});
			});
		});
	});

	it("should display the consent column if ADMIN_TABLES_DISPLAY_CONSENT_COLUMN is true", () => {
		createTestEnvStore({ ADMIN_TABLES_DISPLAY_CONSENT_COLUMN: true });
		const { wrapper } = setup();
		const backendDataTable = wrapper.getComponent(BackendDataTable);
		const columns = backendDataTable.props().columns as { field: string }[];

		expect(columns?.some((el) => el.field === "consentStatus")).toBe(true);
	});

	it("should display the legend's icons if ADMIN_TABLES_DISPLAY_CONSENT_COLUMN is true", () => {
		createTestEnvStore({ ADMIN_TABLES_DISPLAY_CONSENT_COLUMN: true });

		const { wrapper } = setup();
		const adminTableLegend = wrapper.findComponent(AdminTableLegend);
		expect(adminTableLegend.props().showIcons).toBe(true);
	});

	it("should display the consent warning icon if FEATURE_CONSENT_NECESSARY is true", () => {
		createTestEnvStore({
			ADMIN_TABLES_DISPLAY_CONSENT_COLUMN: true,
			FEATURE_CONSENT_NECESSARY: true,
		});

		const { wrapper } = setup();

		const adminTableLegend = wrapper.findComponent(AdminTableLegend);
		const icons = adminTableLegend.props().icons;

		expect(icons).toContainEqual({
			icon: mdiCheck,
			color: "warning",
			label: "utils.adminFilter.consent.label.parentsAgreementMissing",
		});
	});

	it("should not display consent warning icon if FEATURE_CONSENT_NECESSARY is false", () => {
		createTestEnvStore({
			ADMIN_TABLES_DISPLAY_CONSENT_COLUMN: true,
			FEATURE_CONSENT_NECESSARY: false,
		});

		const { wrapper } = setup();

		const adminTableLegend = wrapper.findComponent(AdminTableLegend);
		const icons = adminTableLegend.props().icons;

		expect(icons).toStrictEqual([
			{
				icon: mdiCheckAll,
				color: "success",
				label: "pages.administration.students.legend.icon.success",
			},
			{
				icon: mdiClose,
				color: "error",
				label: "utils.adminFilter.consent.label.missing",
			},
		]);
	});
});
