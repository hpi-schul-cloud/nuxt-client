import { RoomStatsItemResponse } from "@/serverApi/v3/api";
import { schoolsModule } from "@/store";
import SchoolsModule from "@/store/schools";
import {
	mockedPiniaStoreTyping,
	roomStatsItemResponseFactory,
	schoolFactory,
} from "@@/tests/test-utils";
import setupConfirmationComposableMock from "@@/tests/test-utils/composable-mocks/setupConfirmationComposableMock";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { useAdministrationRoomStore } from "@data-room";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { mdiAlert } from "@icons/material";
import { createTestingPinia } from "@pinia/testing";
import { useConfirmationDialog } from "@ui-confirmation-dialog";
import { DataTable } from "@ui-data-table";
import { KebabMenu } from "@ui-kebab-menu";
import { useBoardNotifier } from "@util-board";
import { Mock } from "vitest";
import { nextTick, ref } from "vue";
import { VIcon } from "vuetify/components";
import RoomAdminTable from "./RoomAdminTable.vue";

vi.mock("@ui-confirmation-dialog");
const mockedUseRemoveConfirmationDialog = vi.mocked(useConfirmationDialog);

vi.mock("@util-board/BoardNotifier.composable");
const mockedUseBoardNotifier = vi.mocked(useBoardNotifier);

describe("RoomAdminTable", () => {
	let askConfirmationMock: Mock;
	let mockedBoardNotifierCalls: DeepMocked<ReturnType<typeof useBoardNotifier>>;
	const ownSchool = {
		id: "school-id",
		name: "Paul-Gerhardt-Gymnasium",
	};

	beforeEach(() => {
		askConfirmationMock = vi.fn();
		setupConfirmationComposableMock({
			askConfirmationMock,
		});
		mockedUseRemoveConfirmationDialog.mockReturnValue({
			askConfirmation: askConfirmationMock,
			isDialogOpen: ref(false),
		});

		mockedBoardNotifierCalls =
			createMock<ReturnType<typeof useBoardNotifier>>();
		mockedUseBoardNotifier.mockReturnValue(mockedBoardNotifierCalls);
		setupStores({
			schoolsModule: SchoolsModule,
		});
		schoolsModule.setSchool(schoolFactory.build(ownSchool));
	});
	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = (
		options?: Partial<{
			roomList: RoomStatsItemResponse[];
		}>
	) => {
		const roomList =
			options?.roomList ||
			roomStatsItemResponseFactory.buildList(2, {
				schoolId: ownSchool.id,
			});
		const wrapper = mount(RoomAdminTable, {
			attachTo: document.body,
			global: {
				plugins: [
					createTestingI18n(),
					createTestingVuetify(),
					createTestingPinia({
						initialState: {
							administrationRoomStore: {
								roomList,
								isEmptyList: true,
								isLoading: false,
							},
						},
					}),
				],
			},
			stubs: {
				KebabMenuActionRoomMembers: true,
				KebabMenuAction: true,
				DataTable: true,
			},
		});

		const adminRoomStore = mockedPiniaStoreTyping(useAdministrationRoomStore);

		return {
			wrapper,
			adminRoomStore,
			roomList,
		};
	};

	it("should render the component", () => {
		const { wrapper } = setup();

		expect(wrapper.exists()).toBe(true);
	});

	describe("DataTable", () => {
		const tableHeaders = [
			"pages.rooms.administration.table.header.roomName",
			"pages.rooms.administration.table.header.roomOwner",
			"pages.rooms.administration.table.header.totalMember",
			"pages.rooms.administration.table.header.internalMember",
			"pages.rooms.administration.table.header.externalMember",
			"pages.rooms.administration.table.header.creationDate",
			"pages.rooms.administration.table.header.mainSchool",
			"pages.rooms.administration.table.header.actions",
		];

		it("should pass the correct items and headers prop to DataTable", () => {
			const { wrapper, roomList } = setup();

			const dataTable = wrapper.getComponent(DataTable);
			expect(dataTable.props("items")).toEqual(roomList);
			expect(
				dataTable.props("tableHeaders")!.map((header) => header.title)
			).toEqual(tableHeaders);
		});

		it("should render icon with text if room has no owner", () => {
			const roomWithoutOwner = roomStatsItemResponseFactory.build({
				owner: "",
			});
			const { wrapper } = setup({
				roomList: [roomWithoutOwner],
			});

			const dataTable = wrapper.getComponent(DataTable);
			const warningIcon = dataTable
				.findAllComponents(VIcon)
				.find((icon) => icon.props("icon") === mdiAlert);

			expect(warningIcon?.exists()).toBe(true);
			expect(dataTable.text()).toContain(
				"pages.rooms.administration.table.row.owner.notExist"
			);
		});

		it("should only render text if room has owner", () => {
			const roomWithOwner = roomStatsItemResponseFactory.build({
				owner: "Elisa Esel",
			});
			const { wrapper } = setup({
				roomList: [roomWithOwner],
			});
			const dataTable = wrapper.getComponent(DataTable);
			const warningIcon = dataTable
				.findAllComponents(VIcon)
				.find((icon) => icon.props("icon") === mdiAlert);

			expect(warningIcon).toBeUndefined();
			expect(dataTable.text()).toContain(roomWithOwner.owner);
		});

		describe("kebab menu", () => {
			it("should render kebab menu for each room", () => {
				const rooms = roomStatsItemResponseFactory.buildList(4);
				const { wrapper } = setup({
					roomList: rooms,
				});

				const dataTable = wrapper.getComponent(DataTable);
				const actionMenus = dataTable.findAllComponents(KebabMenu);

				expect(actionMenus).toHaveLength(4);
			});

			describe("delete action", () => {
				describe("when room is from own school", () => {
					it("should render delete menu item", async () => {
						const { wrapper, roomList } = setup();

						const kebabMenu = wrapper.findComponent(
							`[data-testid="kebab-menu-room-${roomList[0].roomId}"]`
						);
						await kebabMenu.trigger("click");
						const deleteAction = wrapper.findComponent(
							`[data-testid="menu-delete-room-${roomList[0].roomId}"]`
						);

						expect(deleteAction.exists()).toBe(true);
					});

					it("should render confirmation dialog with correct text", async () => {
						const { wrapper, roomList } = setup();

						askConfirmationMock.mockResolvedValue(true);

						const kebabMenu = wrapper.findComponent(
							`[data-testid="kebab-menu-room-${roomList[0].roomId}"]`
						);
						await kebabMenu.trigger("click");

						const deleteAction = wrapper.findComponent(
							`[data-testid="menu-delete-room-${roomList[0].roomId}"]`
						);
						await deleteAction.trigger("click");

						expect(askConfirmationMock).toHaveBeenCalledWith({
							confirmActionLangKey: "common.actions.delete",
							message: "pages.room.itemDelete.text",
						});
					});

					it("should call deleteRoom when deletion is confirmed", async () => {
						const { wrapper, adminRoomStore, roomList } = setup();

						askConfirmationMock.mockResolvedValue(true);

						const kebabMenu = wrapper.findComponent(
							`[data-testid="kebab-menu-room-${roomList[0].roomId}"]`
						);
						await kebabMenu.trigger("click");

						const deleteAction = wrapper.findComponent(
							`[data-testid="menu-delete-room-${roomList[0].roomId}"]`
						);
						await deleteAction.trigger("click");

						expect(adminRoomStore.deleteRoom).toHaveBeenCalledWith(
							roomList[0].roomId
						);
					});

					it("should not call deleteRoom when deletion is cancelled", async () => {
						const { wrapper, adminRoomStore, roomList } = setup();

						askConfirmationMock.mockResolvedValue(false);

						const kebabMenu = wrapper.findComponent(
							`[data-testid="kebab-menu-room-${roomList[0].roomId}"]`
						);
						await kebabMenu.trigger("click");

						const deleteAction = wrapper.findComponent(
							`[data-testid="menu-delete-room-${roomList[0].roomId}"]`
						);
						await deleteAction.trigger("click");

						expect(adminRoomStore.deleteRoom).not.toHaveBeenCalled();
					});
				});

				describe("when room is from another school", () => {
					it("should not render delete menu item", () => {
						const room = roomStatsItemResponseFactory.build({
							schoolId: "other-school-id",
						});
						const { wrapper, roomList } = setup({ roomList: [room] });

						const kebabMenu = wrapper.findComponent(
							`[data-testid="kebab-menu-room-${roomList[0].roomId}"]`
						);
						expect(kebabMenu.exists()).toBe(true);

						const deleteAction = wrapper.findComponent(
							`[data-testid="menu-delete-room-${roomList[0].roomId}"]`
						);
						expect(deleteAction.exists()).toBe(false);
					});
				});
			});

			describe("manage room members", () => {
				describe("when manage room members menu clicked", () => {
					it("should call 'fetchRoomDetails' method", async () => {
						const { wrapper, roomList, adminRoomStore } = setup();

						await nextTick();

						const kebabMenu = wrapper.findComponent(
							`[data-testid="kebab-menu-room-${roomList[0].roomId}"]`
						);
						await kebabMenu.trigger("click");

						const manageMenu = wrapper.findComponent(
							`[data-testid="menu-manage-room-${roomList[0].roomId}"]`
						);

						await manageMenu.trigger("click");

						expect(adminRoomStore.fetchRoomDetails).toHaveBeenCalledWith(
							roomList[0].roomId
						);
					});
				});
			});
		});
	});
});
