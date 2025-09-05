import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import MembersTable from "./MembersTable.vue";
import { nextTick, Ref, ref } from "vue";
import {
	mdiMenuDown,
	mdiMenuUp,
	mdiMagnify,
	mdiAccountOutline,
	mdiAccountSchoolOutline,
} from "@icons/material";
import {
	meResponseFactory,
	mockedPiniaStoreTyping,
	roomMemberFactory,
	schoolFactory,
} from "@@/tests/test-utils";
import { DOMWrapper, VueWrapper } from "@vue/test-utils";
import {
	VDataTable,
	VDialog,
	VIcon,
	VTextField,
} from "vuetify/lib/components/index";
import { useConfirmationDialog } from "@ui-confirmation-dialog";
import setupConfirmationComposableMock from "@@/tests/test-utils/composable-mocks/setupConfirmationComposableMock";
import { RoleName } from "@/serverApi/v3";
import {
	RoomMember,
	useRoomMembersStore,
	useRoomAuthorization,
} from "@data-room";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import ActionMenu from "./ActionMenu.vue";
import {
	KebabMenuActionChangePermission,
	KebabMenuActionRemoveMember,
} from "@ui-kebab-menu";
import { createTestingPinia } from "@pinia/testing";
import { useBoardNotifier } from "@util-board";
import setupStores from "@@/tests/test-utils/setupStores";
import SchoolsModule from "@/store/schools";
import AuthModule from "@/store/auth";
import { authModule, schoolsModule } from "@/store";
import { ChangeRole } from "@feature-room";
import { useFocusTrap } from "@vueuse/integrations/useFocusTrap.mjs";
import { Mock } from "vitest";

vi.mock("@ui-confirmation-dialog");
const mockedUseRemoveConfirmationDialog = vi.mocked(useConfirmationDialog);

vi.mock("@util-board/BoardNotifier.composable");
const boardNotifier = vi.mocked(useBoardNotifier);

vi.mock("@vueuse/integrations/useFocusTrap");

vi.mock("@data-room/roomAuthorization.composable");
const roomAuthorizationMock = vi.mocked(useRoomAuthorization);

vi.mock("@vueuse/integrations/useFocusTrap");

type RefPropertiesOnly<T> = {
	[K in keyof T as T[K] extends Ref ? K : never]: boolean;
};

type RoomAuthorizationRefs = RefPropertiesOnly<
	ReturnType<typeof useRoomAuthorization>
>;

describe("MembersTable", () => {
	let askConfirmationMock: Mock;
	let boardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;

	let pauseMock: Mock;
	let unpauseMock: Mock;
	let deactivateMock: Mock;

	beforeEach(() => {
		askConfirmationMock = vi.fn();
		setupConfirmationComposableMock({
			askConfirmationMock,
		});
		mockedUseRemoveConfirmationDialog.mockReturnValue({
			askConfirmation: askConfirmationMock,
			isDialogOpen: ref(false),
		});

		pauseMock = vi.fn();
		unpauseMock = vi.fn();
		deactivateMock = vi.fn();

		(useFocusTrap as Mock).mockReturnValue({
			pause: pauseMock,
			unpause: unpauseMock,
			deactivate: deactivateMock,
		});

		boardNotifierCalls = createMock<ReturnType<typeof useBoardNotifier>>();
		boardNotifier.mockReturnValue(boardNotifierCalls);

		setupStores({
			schoolsModule: SchoolsModule,
			authModule: AuthModule,
		});

		schoolsModule.setSchool(
			schoolFactory.build({
				id: "school-id",
				name: "Paul-Gerhardt-Gymnasium",
			})
		);
	});

	const tableHeaders = [
		"common.labels.firstName",
		"common.labels.lastName",
		"pages.rooms.members.tableHeader.roomRole",
		"pages.rooms.members.tableHeader.schoolRole",
		"common.words.mainSchool",
		"pages.rooms.members.tableHeader.actions",
	];

	const setup = (
		options?: Partial<{
			currentUserRole: RoleName;
			changePermissionFlag: boolean;
			windowWidth: number;
			members: RoomMember[];
			isRoomOwner: boolean;
			currentUserId: string;
			customRoomAuthorization: Partial<RoomAuthorizationRefs>;
		}>
	) => {
		const members =
			options?.members ??
			roomMemberFactory.buildList(3, {
				roomRoleName: RoleName.Roomadmin,
			});

		const windowWidth = options?.windowWidth ?? 1280;

		const roomAuthDefaults = {
			canAddRoomMembers: true,
		};

		const roomAuthorization = {
			...roomAuthDefaults,
			...options?.customRoomAuthorization,
		};
		const authorizationPermissions =
			createMock<ReturnType<typeof useRoomAuthorization>>();

		for (const [key, value] of Object.entries(roomAuthorization ?? {})) {
			authorizationPermissions[key as keyof RoomAuthorizationRefs] = ref(
				value ?? false
			);
		}
		roomAuthorizationMock.mockReturnValue(authorizationPermissions);

		const currentUser = roomMemberFactory.build({});
		const mockMe = meResponseFactory.build({
			user: { id: options?.currentUserId ?? currentUser.userId },
		});
		authModule.setMe(mockMe);

		Object.defineProperty(window, "innerWidth", {
			writable: true,
			configurable: true,
			value: windowWidth,
		});

		const wrapper = mount(MembersTable, {
			attachTo: document.body,
			global: {
				plugins: [
					createTestingVuetify(),
					createTestingI18n(),
					createTestingPinia({
						initialState: {
							roomMembersStore: {
								roomMembers: [...members, currentUser],
								isRoomOwner: vi.fn(),
							},
						},
					}),
				],
			},
			stubs: {
				ChangeRole: true,
			},
		});

		const roomMembersStore = mockedPiniaStoreTyping(useRoomMembersStore);
		roomMembersStore.isRoomOwner.mockReturnValue(options?.isRoomOwner ?? false);
		const roomMembers = roomMembersStore.roomMembers;

		return { wrapper, roomMembersStore, roomMembers, authorizationPermissions };
	};

	// index 0 is the header checkbox
	const selectCheckboxes = async (indices: number[], wrapper: VueWrapper) => {
		const dataTable = wrapper.getComponent(VDataTable);
		const checkboxes = dataTable.findAll("input[type='checkbox']");

		for (const index of indices) {
			const checkbox = checkboxes[index];
			await checkbox.trigger("click");
		}

		return { checkboxes };
	};

	const getCheckedIndices = (checkboxes: DOMWrapper<Element>[]) => {
		const result = checkboxes.reduce((selectedIndices, checkbox, index) => {
			if (checkbox.attributes("checked") === "") {
				selectedIndices.push(index);
			}
			return selectedIndices;
		}, [] as Array<number>);

		return result;
	};

	it("should render members table component", () => {
		const { wrapper } = setup();

		expect(wrapper.exists()).toBe(true);
	});

	it("should have column style for extra small display sizes", async () => {
		const { wrapper } = setup({ windowWidth: 599 });

		const dataTable = wrapper.get(".table-title-header");

		expect(dataTable.classes()).toContain("flex-column");
	});

	it("should not have column style when display size is over 599px", async () => {
		const { wrapper } = setup({ windowWidth: 800 });

		const dataTable = wrapper.get(".table-title-header");

		expect(dataTable.classes()).not.toContain("flex-column");
	});

	it("should render data table", () => {
		const { wrapper, roomMembers } = setup({
			customRoomAuthorization: { canAddRoomMembers: true },
		});

		const dataTable = wrapper.getComponent(VDataTable);

		expect(dataTable.props("headers")!.map((header) => header.title)).toEqual(
			tableHeaders
		);
		expect(dataTable.props("items")).toEqual(roomMembers);
		expect(dataTable.props("sortAscIcon")).toEqual(mdiMenuDown);
		expect(dataTable.props("sortDescIcon")).toEqual(mdiMenuUp);
	});

	describe("school role column", () => {
		const getSchoolRoleCell = (row: DOMWrapper<Element>) =>
			row.findAll("td")[4];

		it.each([
			{
				description: "teacher icon for teacher",
				schoolRoleNames: [RoleName.Teacher],
				expectedIcon: mdiAccountSchoolOutline,
			},
			{
				description: "student icon for students",
				schoolRoleNames: [RoleName.Student],
				expectedIcon: mdiAccountOutline,
			},
			{
				description: "teacher icon if teacher and admin roles are present",
				schoolRoleNames: [RoleName.Administrator, RoleName.Teacher],
				expectedIcon: mdiAccountSchoolOutline,
			},
		])("should render $description", ({ schoolRoleNames, expectedIcon }) => {
			const { wrapper } = setup({
				members: [
					roomMemberFactory.build({
						schoolRoleNames,
					}),
				],
			});

			const dataTable = wrapper.getComponent(VDataTable);
			const row = dataTable.find("tbody tr");

			const schoolRoleCell = getSchoolRoleCell(row);
			expect(schoolRoleCell.findComponent(VIcon).props("icon")).toBe(
				expectedIcon
			);
		});
	});

	it("should render checkboxes if user can add members", async () => {
		const { wrapper, roomMembers } = setup({
			customRoomAuthorization: { canAddRoomMembers: true },
		});

		const dataTable = wrapper.findComponent(VDataTable);
		const checkboxes = dataTable.findAll("input[type='checkbox']");

		expect(checkboxes.length).toEqual(roomMembers.length + 1); // all checkboxes including header checkbox
	});

	it("should not render checkboxes if user can not add members", async () => {
		const { wrapper } = setup({
			customRoomAuthorization: { canAddRoomMembers: false },
		});

		const dataTable = wrapper.findComponent(VDataTable);
		const checkboxes = dataTable.findAll("input[type='checkbox']");
		expect(checkboxes.length).toEqual(0);
	});

	it("non-selectable members should have their checkboxes disabled", async () => {
		const nonSelectableMembers = roomMemberFactory.buildList(3, {
			isSelectable: false,
		});

		const { wrapper } = setup({
			members: nonSelectableMembers,
		});

		const checkboxes = wrapper
			.getComponent(VDataTable)
			.findAll("input[type='checkbox']:disabled");

		expect(checkboxes.length).toEqual(nonSelectableMembers.length);
	});

	it("should not show room applicants", async () => {
		const roomAdmins = roomMemberFactory.buildList(3, {
			roomRoleName: RoleName.Roomadmin,
			displayRoomRole: RoleName.Roomadmin,
		});
		const roomApplicant = roomMemberFactory.build({
			roomRoleName: RoleName.Roomapplicant,
			displayRoomRole: RoleName.Roomapplicant,
		});
		const members = [...roomAdmins, roomApplicant];

		const { wrapper } = setup({
			members,
		});

		expect(wrapper.text()).not.toEqual(
			expect.stringContaining(roomApplicant.firstName)
		);
		expect(wrapper.text()).not.toEqual(
			expect.stringContaining(roomApplicant.lastName)
		);
	});

	describe("when selecting members", () => {
		it("should select all members when header checkbox is clicked", async () => {
			const { wrapper, roomMembers } = setup();

			const { checkboxes } = await selectCheckboxes([0], wrapper);
			const checkedIndices = getCheckedIndices(checkboxes);
			const expectedIndices = Array.from(
				{ length: roomMembers.length + 1 },
				(_, i) => i
			);

			expect(checkedIndices).toEqual(expectedIndices);
		});

		it("should select single member", async () => {
			const { wrapper } = setup();

			const { checkboxes } = await selectCheckboxes([1], wrapper);
			const checkedIndices = getCheckedIndices(checkboxes);
			const expectedIndices = [1];

			expect(checkedIndices).toEqual(expectedIndices);
		});
	});

	describe("when no members are selected", () => {
		it("should not render action menu when no members are selected", async () => {
			const { wrapper } = setup();
			const actionMenu = wrapper.findComponent(ActionMenu);

			expect(actionMenu.exists()).toBe(false);
		});

		it("should not render remove button if it shouldn't be there", async () => {
			const { wrapper } = setup({ isRoomOwner: true });

			const dataTable = wrapper.getComponent(VDataTable);
			const menuButton = dataTable.findComponent(`[data-testid=kebab-menu-1]`);
			await menuButton.trigger("click");
			const removeButton = dataTable.findComponent(KebabMenuActionRemoveMember);

			expect(removeButton.exists()).toBe(false);
		});

		describe("when the remove button in the user row is clicked", () => {
			const triggerMemberRemoval = async (
				index: number,
				wrapper: VueWrapper
			) => {
				const dataTable = wrapper.getComponent(VDataTable);
				const menuButton = dataTable.findComponent(
					`[data-testid=kebab-menu-${index}]`
				);
				await menuButton.trigger("click");
				await nextTick();

				const removeButton = wrapper.findComponent(KebabMenuActionRemoveMember);

				await removeButton.trigger("click");
			};

			it("should open confirmation dialog with remove message for single member", async () => {
				const { wrapper } = setup();

				askConfirmationMock.mockResolvedValue(true);

				await triggerMemberRemoval(2, wrapper);

				expect(askConfirmationMock).toHaveBeenCalledWith({
					confirmActionLangKey: "common.actions.remove",
					message: "pages.rooms.members.remove.confirmation",
				});
			});

			it("should call removeMembers after confirmation", async () => {
				const { wrapper, roomMembersStore, roomMembers } = setup({});

				askConfirmationMock.mockResolvedValue(true);

				await triggerMemberRemoval(2, wrapper);
				expect(roomMembersStore.removeMembers).toHaveBeenCalledWith([
					roomMembers[2].userId,
				]);
			});

			it("should not call removeMembers when dialog is cancelled", async () => {
				const { wrapper, roomMembersStore } = setup({});

				askConfirmationMock.mockResolvedValue(false);

				await triggerMemberRemoval(2, wrapper);

				expect(roomMembersStore.removeMembers).not.toHaveBeenCalled();
			});
		});
	});

	describe("when searching for members", () => {
		it("should render the search component", () => {
			const { wrapper } = setup();

			const search = wrapper.getComponent(VTextField);

			expect(search.props("label")).toEqual("common.labels.search");
			expect(search.props("prependInnerIcon")).toEqual(mdiMagnify);
		});

		it("should render search component with flex order 1 for extra small display sizes", async () => {
			const { wrapper } = setup({
				windowWidth: 599,
			});

			const search = wrapper.findComponent(VTextField);

			expect(search.classes()).toContain("order-1");
		});

		it("should not render search component with flex order 1 for display sizes greater than 599px", async () => {
			const { wrapper } = setup({
				windowWidth: 800,
			});

			const search = wrapper.findComponent(VTextField);

			expect(search.classes()).not.toContain("order-1");
		});

		it("should filter the members based on the search value", async () => {
			const { wrapper, roomMembers } = setup();

			const search = wrapper.getComponent(VTextField);
			const searchValue = roomMembers[0].firstName;

			await search.setValue(searchValue);

			const dataTable = wrapper.getComponent(VDataTable);
			const dataTableTextContent = dataTable.text();

			expect(dataTable.props("search")).toEqual(searchValue);
			expect(dataTableTextContent).toContain(roomMembers[0].firstName);
			expect(dataTableTextContent).not.toContain(roomMembers[1].firstName);
			expect(dataTableTextContent).not.toContain(roomMembers[2].firstName);
		});
	});

	describe("action column", () => {
		it("should be rendered when user can add members", () => {
			const { wrapper } = setup({
				customRoomAuthorization: { canAddRoomMembers: true },
			});
			const dataTable = wrapper.getComponent(VDataTable);
			const menu = dataTable.findComponent('[data-testid="kebab-menu-0');

			expect(menu.exists()).toBe(true);
		});

		it("should not be rendered when user can not add members", () => {
			const { wrapper } = setup({
				customRoomAuthorization: { canAddRoomMembers: false },
			});
			const dataTable = wrapper.getComponent(VDataTable);
			const menu = dataTable.findComponent('[data-testid="kebab-menu-0');

			expect(menu.exists()).toBe(false);
		});

		it("should not be rendered when user is current user", () => {
			const roomOwner = roomMemberFactory.build({
				roomRoleName: RoleName.Roomowner,
				firstName: "TheOwner",
			});
			const { wrapper } = setup({
				members: [roomOwner],
				customRoomAuthorization: { canAddRoomMembers: true },
				currentUserId: roomOwner.userId,
			});
			const dataTable = wrapper.getComponent(VDataTable);
			const menu = dataTable.findComponent('[data-testid="kebab-menu-0');

			expect(menu.exists()).toBe(false);
		});

		describe("change role button", () => {
			it("should be rendered when user can add members", async () => {
				const { wrapper } = setup({
					customRoomAuthorization: { canAddRoomMembers: true },
				});
				const dataTable = wrapper.getComponent(VDataTable);

				const menuBtn = dataTable.findComponent('[data-testid="kebab-menu-1');
				await menuBtn.trigger("click");

				const changeRoleButton = wrapper.findComponent(
					KebabMenuActionChangePermission
				);

				expect(changeRoleButton.exists()).toBe(true);
			});

			it("should open change role dialog when clicked", async () => {
				const { wrapper } = setup({
					customRoomAuthorization: { canAddRoomMembers: true },
				});
				const dataTable = wrapper.getComponent(VDataTable);

				const menuBtn = dataTable.findComponent('[data-testid="kebab-menu-1');
				await menuBtn.trigger("click");

				const changeRoleButton = wrapper.findComponent(
					KebabMenuActionChangePermission
				);
				await changeRoleButton.trigger("click");

				const changeRoleDialog = wrapper.findComponent(VDialog);
				expect(changeRoleDialog.props("modelValue")).toBe(true);
			});
		});
	});

	describe("change role dialog", () => {
		it("should close dialog on @cancel", async () => {
			const { wrapper } = setup({
				customRoomAuthorization: { canAddRoomMembers: true },
			});

			const dataTable = wrapper.getComponent(VDataTable);

			const menuBtn = dataTable.findComponent('[data-testid="kebab-menu-1');
			await menuBtn.trigger("click");

			const changeRoleDialog = wrapper.findComponent(ChangeRole);
			const changeRoleButton = wrapper.findComponent(
				KebabMenuActionChangePermission
			);
			await changeRoleButton.trigger("click");
			expect(changeRoleDialog.props("modelValue")).toBe(true);

			await changeRoleDialog.vm.$emit("close");
			expect(changeRoleDialog.props("modelValue")).toBe(false);
		});

		it("should close dialog on escape key", async () => {
			const { wrapper } = setup();
			const dataTable = wrapper.getComponent(VDataTable);
			const menuBtn = dataTable.findComponent('[data-testid="kebab-menu-1');
			await menuBtn.trigger("click");

			const changeRoleButton = wrapper.findComponent(
				KebabMenuActionChangePermission
			);
			await changeRoleButton.trigger("click");

			const changeRoleDialog = wrapper.findComponent(ChangeRole);
			const card = wrapper.findComponent({ name: "VCard" });
			await card.trigger("keydown.esc");

			expect(changeRoleDialog.props("modelValue")).toBe(false);
		});
	});
});
