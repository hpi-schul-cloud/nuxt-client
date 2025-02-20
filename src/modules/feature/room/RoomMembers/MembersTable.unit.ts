import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import MembersTable from "./MembersTable.vue";
import { nextTick, ref } from "vue";
import { mdiMenuDown, mdiMenuUp, mdiMagnify } from "@icons/material";
import { envsFactory, roomMemberFactory } from "@@/tests/test-utils";
import { DOMWrapper, flushPromises, VueWrapper } from "@vue/test-utils";
import { VDataTable, VTextField } from "vuetify/lib/components/index.mjs";
import { useConfirmationDialog } from "@ui-confirmation-dialog";
import setupConfirmationComposableMock from "@@/tests/test-utils/composable-mocks/setupConfirmationComposableMock";
import { RoleName } from "@/serverApi/v3";
import { ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
import EnvConfigModule from "@/store/env-config";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { RoomMember, useRoomMembers } from "@data-room";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import ActionMenu from "./ActionMenu.vue";
import { KebabMenuActionRemoveMember } from "@ui-kebab-menu";

jest.mock("@ui-confirmation-dialog");
const mockedUseRemoveConfirmationDialog = jest.mocked(useConfirmationDialog);

jest.mock("../../../data/room/roomMembers/roomMembers.composable");
const mockUseRoomMembers = jest.mocked(useRoomMembers);

describe("MembersTable", () => {
	let askConfirmationMock: jest.Mock;
	let mockRoomMemberCalls: DeepMocked<ReturnType<typeof useRoomMembers>>;
	let mockMembers: RoomMember[];

	beforeEach(() => {
		askConfirmationMock = jest.fn();
		setupConfirmationComposableMock({
			askConfirmationMock,
		});
		mockedUseRemoveConfirmationDialog.mockReturnValue({
			askConfirmation: askConfirmationMock,
			isDialogOpen: ref(false),
		});
		mockRoomMemberCalls = createMock<ReturnType<typeof useRoomMembers>>();
		mockUseRoomMembers.mockReturnValue(mockRoomMemberCalls);

		mockMembers = roomMemberFactory(RoleName.Roomadmin).buildList(3);
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
			selectedUserIds: string[];
			windowWidth: number;
		}>
	) => {
		const {
			currentUserRole,
			changePermissionFlag,
			selectedUserIds,
			windowWidth,
		} = {
			currentUserRole: RoleName.Roomadmin,
			changePermissionFlag: true,
			selectedUserIds: [],
			windowWidth: 1280,

			...options,
		};

		Object.defineProperty(window, "innerWidth", {
			writable: true,
			configurable: true,
			value: windowWidth,
		});

		const envConfigModuleMock = createModuleMocks(EnvConfigModule, {
			getEnv: {
				...envsFactory.build(),
				FEATURE_ROOMS_CHANGE_PERMISSIONS_ENABLED: changePermissionFlag,
			},
		});

		const wrapper = mount(MembersTable, {
			attachTo: document.body,
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModuleMock,
				},
			},
			props: {
				members: mockMembers,
				currentUser: {
					...mockMembers[0],
					roomRoleName: currentUserRole,
				},
				selectedUserIds: selectedUserIds,
			},
		});

		return { wrapper };
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
		const { wrapper } = setup();

		const dataTable = wrapper.getComponent(VDataTable);

		expect(dataTable.props("headers")!.map((header) => header.title)).toEqual(
			tableHeaders
		);
		expect(dataTable.props("items")).toEqual(mockMembers);
		expect(dataTable.props("sortAscIcon")).toEqual(mdiMenuDown);
		expect(dataTable.props("sortDescIcon")).toEqual(mdiMenuUp);
	});

	it("should render checkboxes", async () => {
		const { wrapper } = setup();

		const dataTable = wrapper.findComponent(VDataTable);
		const checkboxes = dataTable.findAll("input[type='checkbox']");

		expect(checkboxes.length).toEqual(mockMembers.length + 1); // all checkboxes including header checkbox
	});

	describe("when selecting members", () => {
		it("should select all members when header checkbox is clicked", async () => {
			const { wrapper } = setup();

			const { checkboxes } = await selectCheckboxes([0], wrapper);
			const checkedIndices = getCheckedIndices(checkboxes);
			const expectedIndices = [0, 1, 2, 3];

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

			it("should reset member selection when reset event is emitted", async () => {
				const { wrapper } = setup({
					selectedUserIds: [mockMembers[0].userId, mockMembers[2].userId],
				});

				const actionMenu = wrapper.findComponent(ActionMenu);
				actionMenu.vm.$emit("reset:selected");

				await nextTick();

				const checkboxes = wrapper
					.getComponent(VDataTable)
					.findAll("input[type='checkbox']");

				const checkedIndices = getCheckedIndices(checkboxes);

				expect(checkedIndices).toEqual([]);
			});

			it("should emit change:permissions when change:role event is emitted", async () => {
				const selectedUserIds = [mockMembers[0].userId, mockMembers[2].userId];
				const { wrapper } = setup({ selectedUserIds });

				const actionMenu = wrapper.findComponent(ActionMenu);
				actionMenu.vm.$emit("change:role", selectedUserIds);

				await nextTick();

				const changePermissionsEvent = wrapper.emitted("change:permission");
				expect(changePermissionsEvent).toHaveLength(1);
				expect(changePermissionsEvent![0]).toEqual([selectedUserIds]);
			});

			it("should emit remove:members when selected members remove:selected event emitted", async () => {
				const selectedUserIds = [mockMembers[0].userId, mockMembers[2].userId];
				const { wrapper } = setup({ selectedUserIds });

				askConfirmationMock.mockResolvedValue(true);

				const actionMenu = wrapper.findComponent(ActionMenu);
				actionMenu.vm.$emit("remove:selected", selectedUserIds);
				await flushPromises();

				const removeEvents = wrapper.emitted("remove:members");
				expect(removeEvents).toHaveLength(1);
				expect(removeEvents![0]).toEqual([selectedUserIds]);
			});

			it("should not emit remove:members event when remove was cancled", async () => {
				const selectedUserIds = [mockMembers[0].userId, mockMembers[2].userId];
				const { wrapper } = setup({ selectedUserIds });

				askConfirmationMock.mockResolvedValue(false);

				const actionMenu = wrapper.findComponent(ActionMenu);
				actionMenu.vm.$emit("reset:selected", selectedUserIds);
				await flushPromises();

				expect(wrapper.emitted()).not.toHaveProperty("remove:members");
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
				"should render confirmation dialog with text for $description when remove:selected event is emitted",
				async ({ selectedUserIndices, expectedMessage }) => {
					const selectedUserIds = selectedUserIndices.map(
						(index) => mockMembers[index].userId
					);
					const { wrapper } = setup({ selectedUserIds });

					askConfirmationMock.mockResolvedValue(true);

					const actionMenu = wrapper.findComponent(ActionMenu);
					actionMenu.vm.$emit("remove:selected", selectedUserIds);
					await flushPromises();

					expect(wrapper.emitted()).toHaveProperty("remove:members");

					expect(askConfirmationMock).toHaveBeenCalledWith({
						confirmActionLangKey: "common.actions.remove",
						message: expectedMessage,
					});
				}
			);

			it("should keep selection if confirmation dialog is canceled", async () => {
				const { wrapper } = setup({
					selectedUserIds: [mockMembers[1].userId],
				});

				askConfirmationMock.mockResolvedValue(false);

				const actionMenu = wrapper.findComponent(ActionMenu);
				actionMenu.vm.$emit("remove:selected", [mockMembers[1].userId]);
				await flushPromises();

				const checkboxes = wrapper
					.getComponent(VDataTable)
					.findAll("input[type='checkbox']");

				const checkedIndices = getCheckedIndices(checkboxes);

				expect(checkedIndices.length).toBeGreaterThan(0);
			});
		});
	});

	describe("when no members are selected", () => {
		it("should not render action menu when no members are selected", async () => {
			const { wrapper } = setup();
			const actionMenu = wrapper.findComponent(ActionMenu);

			expect(actionMenu.exists()).toBe(false);
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

			it("should call remove:members event after confirmation", async () => {
				const { wrapper } = setup();

				askConfirmationMock.mockResolvedValue(true);

				await triggerMemberRemoval(2, wrapper);

				expect(wrapper.emitted()).toHaveProperty("remove:members");

				const removeEvents = wrapper.emitted("remove:members");
				expect(removeEvents).toHaveLength(1);
				expect(removeEvents![0]).toEqual([[mockMembers[2].userId]]);
			});

			it("should not call remove:members event when dialog is cancelled", async () => {
				const { wrapper } = setup();

				askConfirmationMock.mockResolvedValue(false);

				await triggerMemberRemoval(2, wrapper);

				expect(wrapper.emitted()).not.toHaveProperty("remove:members");
			});

			describe("when members are roomowner", () => {
				beforeEach(() => {
					mockMembers = roomMemberFactory(RoleName.Roomowner)
						.buildList(3)
						.map((member) => ({ ...member, isSelectable: false }));
				});

				it("should not render remove button for room owner", async () => {
					const { wrapper } = setup();

					const dataTable = wrapper.getComponent(VDataTable);
					const removeButton = dataTable.findComponent(
						KebabMenuActionRemoveMember
					);

					expect(removeButton.exists()).toBe(false);
				});

				it("members should not be selectable", async () => {
					const { wrapper } = setup();

					const dataTable = wrapper.getComponent(VDataTable);

					const checkboxes = dataTable.findAllComponents({
						name: "VSelectionControl",
					});

					expect(checkboxes[1].vm.disabled).toBe(true);
				});
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

		it("should filter the members based on the search value", async () => {
			const { wrapper } = setup();

			const search = wrapper.getComponent(VTextField);
			const searchValue = mockMembers[0].firstName;

			await search.setValue(searchValue);

			const dataTable = wrapper.getComponent(VDataTable);
			const dataTableTextContent = dataTable.text();

			expect(dataTable.props("search")).toEqual(searchValue);
			expect(dataTableTextContent).toContain(mockMembers[0].firstName);
			expect(dataTableTextContent).not.toContain(mockMembers[1].firstName);
			expect(dataTableTextContent).not.toContain(mockMembers[2].firstName);
		});
	});

	describe("when 'fixedPosition' prop is set", () => {
		it("should have 'fixed-position' class", async () => {
			const { wrapper } = setup();

			const elementBefore = wrapper.find(".table-title-header");
			expect(elementBefore.classes("fixed-position")).toBe(false);

			wrapper.setProps({
				fixedPosition: {
					enabled: true,
					positionTop: 0,
				},
			});
			await nextTick();

			const elementAfter = wrapper.find(".table-title-header");
			expect(elementAfter.classes("fixed-position")).toBe(true);
		});
	});

	describe("visibility options", () => {
		describe("isActionColumnVisible", () => {
			it.each([
				{
					description: "when user is roomowner",
					currentUserRole: RoleName.Roomowner,
					expected: true,
				},
				{
					description: "when user is roomadmin",
					currentUserRole: RoleName.Roomadmin,
					expected: true,
				},
				{
					description: "when user is roomeditor",
					currentUserRole: RoleName.Roomeditor,
					expected: false,
				},
				{
					description: "when user is roomviewer",
					currentUserRole: RoleName.Roomviewer,
					expected: false,
				},
			])(
				"should be $expected $description",
				async ({ currentUserRole, expected }) => {
					const { wrapper } = setup({ currentUserRole });
					await nextTick();
					const dataTable = wrapper.getComponent(VDataTable);

					const menu = dataTable.findComponent('[data-testid="kebab-menu-1');

					expect(menu.exists()).toBe(expected);
				}
			);
		});

		describe("isSelectionColumnVisible", () => {
			it.each([
				{
					description: "when user is roomowner",
					currentUserRole: RoleName.Roomowner,
					expected: true,
				},
				{
					description: "when user is roomadmin",
					currentUserRole: RoleName.Roomadmin,
					expected: true,
				},
				{
					description: "when user is roomeditor",
					currentUserRole: RoleName.Roomeditor,
					expected: false,
				},
				{
					description: "when user is roomviewer",
					currentUserRole: RoleName.Roomviewer,
					expected: false,
				},
			])(
				"should be $expected $description",
				async ({ currentUserRole, expected }) => {
					const { wrapper } = setup({ currentUserRole });
					const dataTable = wrapper.getComponent(VDataTable);

					const checkbox = dataTable.findComponent(".v-selection-control");

					expect(checkbox.exists()).toBe(expected);
				}
			);
		});

		describe("isChangeRoleButtonVisible", () => {
			it.each([
				{
					description: "when user is roomowner",
					currentUserRole: RoleName.Roomowner,
					expected: true,
				},
				{
					description: "when user is roomadmin",
					currentUserRole: RoleName.Roomadmin,
					expected: true,
				},
			])(
				"should be $expected $description",
				async ({ currentUserRole, expected }) => {
					const { wrapper } = setup({
						currentUserRole,
						changePermissionFlag: true,
					});
					const dataTable = wrapper.getComponent(VDataTable);

					const menuBtn = dataTable.findComponent('[data-testid="kebab-menu-1');
					await menuBtn.trigger("click");

					const changeRoleButton = wrapper.findComponent(
						'[data-testid="kebab-menu-action-change-permission"]'
					);

					expect(changeRoleButton.exists()).toBe(expected);
				}
			);
		});
	});
});
