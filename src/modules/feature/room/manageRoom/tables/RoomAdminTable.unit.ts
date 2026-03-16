import RoomAdminTable from "./RoomAdminTable.vue";
import { schoolsModule } from "@/store";
import SchoolsModule from "@/store/schools";
import * as confirmDialogUtils from "@/utils/confirm-dialog.utils";
import { mockedPiniaStoreTyping, roomStatsItemResponseFactory, schoolFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import setupStores from "@@/tests/test-utils/setupStores";
import { RoomStatsItemResponse } from "@api-server";
import { useAdministrationRoomStore } from "@data-room";
import { mdiAlert } from "@icons/material";
import { createTestingPinia } from "@pinia/testing";
import { DataTable } from "@ui-data-table";
import { KebabMenu } from "@ui-kebab-menu";
import { nextTick } from "vue";
import { VIcon } from "vuetify/components";

describe("RoomAdminTable", () => {
	const ownSchool = {
		id: "school-id",
		name: "Paul-Gerhardt-Gymnasium",
	};

	beforeEach(() => {
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
			expect(dataTable.props("tableHeaders")!.map((header) => header.title)).toEqual(tableHeaders);
		});

		it("should render icon with text if room has no owner", () => {
			const roomWithoutOwner = roomStatsItemResponseFactory.build({
				owner: "",
			});
			const { wrapper } = setup({
				roomList: [roomWithoutOwner],
			});

			const dataTable = wrapper.getComponent(DataTable);
			const warningIcon = dataTable.findAllComponents(VIcon).find((icon) => icon.props("icon") === mdiAlert);

			expect(warningIcon?.exists()).toBe(true);
			expect(dataTable.text()).toContain("pages.rooms.administration.table.row.owner.notExist");
		});

		it("should only render text if room has owner", () => {
			const roomWithOwner = roomStatsItemResponseFactory.build({
				owner: "Elisa Esel",
			});
			const { wrapper } = setup({
				roomList: [roomWithOwner],
			});
			const dataTable = wrapper.getComponent(DataTable);
			const warningIcon = dataTable.findAllComponents(VIcon).find((icon) => icon.props("icon") === mdiAlert);

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

						const kebabMenu = wrapper.findComponent(`[data-testid="kebab-menu-room-${roomList[0].roomId}"]`);
						await kebabMenu.trigger("click");
						const deleteAction = wrapper.findComponent(`[data-testid="menu-delete-room-${roomList[0].roomId}"]`);

						expect(deleteAction.exists()).toBe(true);
					});

					it("should call deleteRoom when deletion is confirmed", async () => {
						vi.spyOn(confirmDialogUtils, "askDeletion").mockResolvedValue(true);
						const { wrapper, adminRoomStore, roomList } = setup();

						const kebabMenu = wrapper.findComponent(`[data-testid="kebab-menu-room-${roomList[0].roomId}"]`);
						await kebabMenu.trigger("click");

						const deleteAction = wrapper.findComponent(`[data-testid="menu-delete-room-${roomList[0].roomId}"]`);
						await deleteAction.trigger("click");

						expect(confirmDialogUtils.askDeletion).toHaveBeenCalledWith(
							expect.any(String),
							"pages.rooms.administration.table.delete.infoMessage"
						);
						expect(adminRoomStore.deleteRoom).toHaveBeenCalledWith(roomList[0].roomId);
					});

					it("should not call deleteRoom when deletion is cancelled", async () => {
						vi.spyOn(confirmDialogUtils, "askDeletion").mockResolvedValue(false);
						const { wrapper, adminRoomStore, roomList } = setup();

						const kebabMenu = wrapper.findComponent(`[data-testid="kebab-menu-room-${roomList[0].roomId}"]`);
						await kebabMenu.trigger("click");

						const deleteAction = wrapper.findComponent(`[data-testid="menu-delete-room-${roomList[0].roomId}"]`);
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

						const kebabMenu = wrapper.findComponent(`[data-testid="kebab-menu-room-${roomList[0].roomId}"]`);
						expect(kebabMenu.exists()).toBe(true);

						const deleteAction = wrapper.findComponent(`[data-testid="menu-delete-room-${roomList[0].roomId}"]`);
						expect(deleteAction.exists()).toBe(false);
					});
				});
			});

			describe("manage room members", () => {
				describe("when manage room members menu clicked", () => {
					it("should emit 'manage-room-members' event", async () => {
						const { wrapper, roomList } = setup();

						await nextTick();

						const kebabMenu = wrapper.findComponent(`[data-testid="kebab-menu-room-${roomList[0].roomId}"]`);
						await kebabMenu.trigger("click");

						const manageMenu = wrapper.findComponent(`[data-testid="menu-manage-room-${roomList[0].roomId}"]`);

						await manageMenu.trigger("click");
						await nextTick();

						expect(wrapper.emitted()["manage-room-members"][0]).toStrictEqual([roomList[0].roomId]);
					});
				});
			});
		});
	});
});
