import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import MembersTable from "./MembersTable.vue";
import { computed, nextTick, ref } from "vue";
import { mdiMenuDown, mdiMenuUp, mdiMagnify } from "@icons/material";
import {
	meResponseFactory,
	mockedPiniaStoreTyping,
	roomMemberFactory,
	schoolFactory,
} from "@@/tests/test-utils";
import { DOMWrapper, VueWrapper } from "@vue/test-utils";
import {
	VBtn,
	VDataTable,
	VDialog,
	VTextField,
} from "vuetify/lib/components/index.mjs";
import { useConfirmationDialog } from "@ui-confirmation-dialog";
import setupConfirmationComposableMock from "@@/tests/test-utils/composable-mocks/setupConfirmationComposableMock";
import { RoleName } from "@/serverApi/v3";
import {
	RoomMember,
	useRoomMembersStore,
	useRoomMemberVisibilityOptions,
} from "@data-room";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
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

jest.mock("@ui-confirmation-dialog");
const mockedUseRemoveConfirmationDialog = jest.mocked(useConfirmationDialog);

jest.mock("@data-room/roomMembers/membersVisibleOptions.composable");
const useMemberVisibilityOptions = jest.mocked(useRoomMemberVisibilityOptions);

jest.mock("@util-board/BoardNotifier.composable");
const boardNotifier = jest.mocked(useBoardNotifier);

describe("MembersTable", () => {
	let askConfirmationMock: jest.Mock;
	let memberVisibilityOptions: DeepMocked<
		ReturnType<typeof useRoomMemberVisibilityOptions>
	>;
	let boardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;

	beforeEach(() => {
		askConfirmationMock = jest.fn();
		setupConfirmationComposableMock({
			askConfirmationMock,
		});
		mockedUseRemoveConfirmationDialog.mockReturnValue({
			askConfirmation: askConfirmationMock,
			isDialogOpen: ref(false),
		});

		memberVisibilityOptions =
			createMock<ReturnType<typeof useRoomMemberVisibilityOptions>>();
		useMemberVisibilityOptions.mockReturnValue(memberVisibilityOptions);

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
			isVisibleSelectionColumn: boolean;
			isVisibleActionColumn: boolean;
			isVisibleChangeRoleButton: boolean;
		}>
	) => {
		memberVisibilityOptions.isVisibleSelectionColumn = computed(
			() => options?.isVisibleSelectionColumn ?? true
		);
		memberVisibilityOptions.isVisibleActionColumn = computed(
			() => options?.isVisibleActionColumn ?? true
		);
		memberVisibilityOptions.isVisibleChangeRoleButton = computed(
			() => options?.isVisibleChangeRoleButton ?? true
		);

		const members =
			options?.members ??
			roomMemberFactory.buildList(3, {
				roomRoleName: RoleName.Roomadmin,
			});

		const windowWidth = options?.windowWidth ?? 1280;

		const currentUser = roomMemberFactory.build({});
		const mockMe = meResponseFactory.build({
			user: { id: currentUser.userId },
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
							},
						},
					}),
				],
			},
		});

		const roomMembersStore = mockedPiniaStoreTyping(useRoomMembersStore);
		const roomMembers = roomMembersStore.roomMembers;

		return { wrapper, roomMembersStore, roomMembers };
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
		const { wrapper, roomMembers } = setup();

		const dataTable = wrapper.getComponent(VDataTable);

		expect(dataTable.props("headers")!.map((header) => header.title)).toEqual(
			tableHeaders
		);
		expect(dataTable.props("items")).toEqual(roomMembers);
		expect(dataTable.props("sortAscIcon")).toEqual(mdiMenuDown);
		expect(dataTable.props("sortDescIcon")).toEqual(mdiMenuUp);
	});

	it("should render checkboxes if selection column is visible", async () => {
		const { wrapper, roomMembers } = setup();

		const dataTable = wrapper.findComponent(VDataTable);
		const checkboxes = dataTable.findAll("input[type='checkbox']");

		expect(checkboxes.length).toEqual(roomMembers.length + 1); // all checkboxes including header checkbox
	});

	it("should not render checkboxes if selection column not visible", async () => {
		const { wrapper } = setup({
			isVisibleSelectionColumn: false,
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

		describe("action menu", () => {
			it("should render action menu", async () => {
				const { wrapper } = setup();
				await selectCheckboxes([0], wrapper);

				const actionMenuAfter = wrapper.findComponent(ActionMenu);

				expect(actionMenuAfter.exists()).toBe(true);
			});

			it("should have flex order 2 for extra small display sizes", async () => {
				const { wrapper } = setup({
					windowWidth: 599,
				});
				await selectCheckboxes([1], wrapper);

				const actionMenu = wrapper.findComponent(ActionMenu);

				expect(actionMenu.classes()).toContain("order-2");
			});

			it("should not have flex order 2 display sizes greater than 599px", async () => {
				const { wrapper } = setup({
					windowWidth: 800,
				});
				await selectCheckboxes([1], wrapper);

				const actionMenu = wrapper.findComponent(ActionMenu);

				expect(actionMenu.classes()).not.toContain("order-2");
			});

			it("should reset member selection when reset button is clicked", async () => {
				const { wrapper } = setup();
				await selectCheckboxes([1, 3], wrapper);

				const actionMenu = wrapper.findComponent(ActionMenu);
				actionMenu.vm.$emit("reset:selected");

				await nextTick();

				const checkboxes = wrapper
					.getComponent(VDataTable)
					.findAll("input[type='checkbox']");

				const checkedIndices = getCheckedIndices(checkboxes);

				expect(checkedIndices).toEqual([]);
			});

			it.each([
				{
					description: "single member",
					selectedUserIndices: [0],
					expectedMessage: "pages.rooms.members.remove.confirmation",
				},
				{
					description: "multiple members",
					selectedUserIndices: [0, 1],
					expectedMessage: "pages.rooms.members.multipleRemove.confirmation",
				},
			])(
				"should render confirmation dialog with text for $description when removeMember action is clicked",
				async ({ selectedUserIndices, expectedMessage }) => {
					const { wrapper, roomMembersStore, roomMembers } = setup();
					await selectCheckboxes(
						selectedUserIndices.map((index) => index + 1),
						wrapper
					);

					askConfirmationMock.mockResolvedValue(true);

					const actionMenu = wrapper.findComponent(ActionMenu);
					await nextTick();
					actionMenu.getComponent(VBtn).trigger("click");
					await nextTick();

					const removeButton = wrapper.findComponent(
						KebabMenuActionRemoveMember
					);
					removeButton.trigger("click");
					await nextTick();

					expect(roomMembersStore.removeMembers).toHaveBeenCalledWith(
						selectedUserIndices.map((index) => roomMembers[index].userId)
					);

					expect(askConfirmationMock).toHaveBeenCalledWith({
						confirmActionLangKey: "common.actions.remove",
						message: expectedMessage,
					});
				}
			);

			it("should keep selection if confirmation dialog is canceled", async () => {
				const { wrapper } = setup();
				await selectCheckboxes([2], wrapper);

				askConfirmationMock.mockResolvedValue(false);

				const actionMenu = wrapper.findComponent(ActionMenu);
				await nextTick();
				actionMenu.getComponent(VBtn).trigger("click");
				await nextTick();

				const removeButton = wrapper.findComponent(KebabMenuActionRemoveMember);
				removeButton.trigger("click");
				await nextTick();

				const checkboxes = wrapper
					.getComponent(VDataTable)
					.findAll("input[type='checkbox']");

				const checkedIndices = getCheckedIndices(checkboxes);

				expect(checkedIndices.length).toBeGreaterThan(0);
				expect(checkedIndices).toEqual([2]);
			});
		});
	});

	describe("when no members are selected", () => {
		it("should not render action menu when no members are selected", async () => {
			const { wrapper } = setup();
			const actionMenu = wrapper.findComponent(ActionMenu);

			expect(actionMenu.exists()).toBe(false);
		});

		it("should not render remove button if it shouldn't be there", async () => {
			memberVisibilityOptions.isVisibleRemoveMemberButton.mockReturnValue(
				false
			);

			const { wrapper } = setup();

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
				const { wrapper, roomMembersStore, roomMembers } = setup();

				askConfirmationMock.mockResolvedValue(true);

				await triggerMemberRemoval(2, wrapper);
				expect(roomMembersStore.removeMembers).toHaveBeenCalledWith([
					roomMembers[2].userId,
				]);
			});

			it("should not call removeMembers when dialog is cancelled", async () => {
				const { wrapper, roomMembersStore } = setup();

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

	describe("action column visibility", () => {
		it("should render action column when isVisibleActionColumn is true", () => {
			const { wrapper } = setup();
			const dataTable = wrapper.getComponent(VDataTable);
			const menu = dataTable.findComponent('[data-testid="kebab-menu-1');

			expect(menu.exists()).toBe(true);
		});

		it("should not render action column when isVisibleActionColumn is false", () => {
			const { wrapper } = setup({ isVisibleActionColumn: false });
			const dataTable = wrapper.getComponent(VDataTable);
			const menu = dataTable.findComponent('[data-testid="kebab-menu-1');

			expect(menu.exists()).toBe(false);
		});

		describe("change role button", () => {
			it("should not be visible when is visibleChangeRoleButton is false", async () => {
				const { wrapper } = setup({
					isVisibleChangeRoleButton: false,
				});
				const dataTable = wrapper.getComponent(VDataTable);

				const menuBtn = dataTable.findComponent('[data-testid="kebab-menu-1');
				await menuBtn.trigger("click");

				const changeRoleButton = wrapper.findComponent(
					KebabMenuActionChangePermission
				);

				expect(changeRoleButton.exists()).toBe(false);
			});

			it("should be visible when is visibleChangeRoleButton is true", async () => {
				const { wrapper } = setup();
				const dataTable = wrapper.getComponent(VDataTable);

				const menuBtn = dataTable.findComponent('[data-testid="kebab-menu-1');
				await menuBtn.trigger("click");

				const changeRoleButton = wrapper.findComponent(
					KebabMenuActionChangePermission
				);

				expect(changeRoleButton.exists()).toBe(true);
			});

			it("should open change role dialog when clicked", async () => {
				const { wrapper } = setup();
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
			const { wrapper } = setup();

			const changeRoleDialog = wrapper.findComponent(VDialog);
			await changeRoleDialog.setValue(true);
			expect(changeRoleDialog.props("modelValue")).toBe(true);

			const addMemberComponent = changeRoleDialog.findComponent(ChangeRole);
			await addMemberComponent.vm.$emit("close");

			expect(changeRoleDialog.props("modelValue")).toBe(false);
		});

		it("should close dialog on escape key", async () => {
			const { wrapper } = setup();

			const changeRoleDialog = wrapper.findComponent(VDialog);
			await changeRoleDialog.setValue(true);

			const dialogContent = changeRoleDialog.getComponent(ChangeRole);
			await dialogContent.trigger("keydown.escape");

			expect(changeRoleDialog.props("modelValue")).toBe(false);
		});
	});
});
