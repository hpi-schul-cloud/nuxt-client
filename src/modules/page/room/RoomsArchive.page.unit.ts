import RoomsArchivePage from "./RoomsArchive.page.vue";
import * as confirmDialogUtils from "@/utils/confirmation-dialog.utils";
import { createTestRoomStore, roomArchivedItemResponseFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { RoomArchivedItemResponse } from "@api-server";
import { useNotificationStore } from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import { DataTable } from "@ui-data-table";
import { EmptyState } from "@ui-empty-state";
import { KebabMenuAction } from "@ui-kebab-menu";
import { flushPromises, VueWrapper } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { createRouterMock, injectRouterMock } from "vue-router-mock";
import { VSkeletonLoader } from "vuetify/components";

describe("RoomsArchivePage", () => {
	const setup = (archivedRooms: RoomArchivedItemResponse[] = [], isLoading = false) => {
		setActivePinia(createTestingPinia({ stubActions: false }));

		const router = createRouterMock();
		injectRouterMock(router);

		const { roomStore } = createTestRoomStore();
		roomStore.$patch({ archivedRooms });
		roomStore.isLoading = isLoading;
		roomStore.fetchArchivedRooms.mockResolvedValue();
		roomStore.unarchiveRoom.mockResolvedValue({ success: true, result: undefined, error: undefined } as never);
		roomStore.deleteRoom.mockResolvedValue({ success: true, result: undefined, error: undefined } as never);

		const wrapper = mount(RoomsArchivePage, {
			global: {
				plugins: [createTestingI18n(), createTestingVuetify()],
				stubs: { RouterLink: true },
			},
		});

		return { wrapper, roomStore, router };
	};

	const findAction = (wrapper: VueWrapper, testId: string) =>
		wrapper.findAllComponents(KebabMenuAction).find((action) => action.attributes("data-testid") === testId);

	const openRowMenu = async (wrapper: VueWrapper, roomId: string) => {
		await wrapper.find(`[data-testid="kebab-menu-archived-room-${roomId}"]`).trigger("click");
	};

	const openBulkMenu = async (wrapper: VueWrapper) => {
		await wrapper.find('[data-testid="action-menu-button"]').trigger("click");
	};

	describe("when the page is mounted", () => {
		it("should fetch the archived rooms", () => {
			const { roomStore } = setup();

			expect(roomStore.fetchArchivedRooms).toHaveBeenCalled();
		});

		it("should set the page title", () => {
			setup();

			expect(document.title).toContain("pages.rooms.archived.title");
		});

		it("should render the breadcrumb from rooms to archived rooms", () => {
			const { wrapper } = setup();

			const breadcrumbs = wrapper.getComponent({ name: "Breadcrumbs" });
			expect(breadcrumbs.props("breadcrumbs")).toEqual([
				{ title: "pages.rooms.title", to: "/rooms" },
				{ title: "pages.rooms.archived.title", disabled: true },
			]);
		});
	});

	describe("when archived rooms are loading", () => {
		it("should render a loading skeleton", () => {
			const { wrapper } = setup([], true);

			expect(wrapper.findComponent(VSkeletonLoader).exists()).toBe(true);
		});
	});

	describe("when there are no archived rooms", () => {
		it("should render the empty state", () => {
			const { wrapper } = setup([]);

			const emptyState = wrapper.findComponent(EmptyState);
			expect(emptyState.exists()).toBe(true);
			expect(emptyState.props("title")).toBe("pages.rooms.archived.emptyState");
		});
	});

	describe("when there are archived rooms", () => {
		it("should render them in the table", () => {
			const rooms = roomArchivedItemResponseFactory.buildList(2);
			const { wrapper } = setup(rooms);

			const table = wrapper.findComponent(DataTable);
			expect(table.props("items")).toHaveLength(2);
		});

		describe("row actions", () => {
			it("should show restore for a room the user can archive, and hide it otherwise", async () => {
				const restorable = roomArchivedItemResponseFactory.build({
					allowedOperations: { archiveRoom: true, deleteRoom: false },
				});
				const notRestorable = roomArchivedItemResponseFactory.build({
					allowedOperations: { archiveRoom: false, deleteRoom: true },
				});
				const { wrapper } = setup([restorable, notRestorable]);

				await openRowMenu(wrapper, restorable.id);
				await openRowMenu(wrapper, notRestorable.id);

				expect(findAction(wrapper, `menu-restore-room-${restorable.id}`)?.exists()).toBe(true);
				expect(findAction(wrapper, `menu-restore-room-${notRestorable.id}`)).toBeUndefined();
			});

			it("should show delete for a room the user can delete, and hide it otherwise", async () => {
				const deletable = roomArchivedItemResponseFactory.build({
					allowedOperations: { archiveRoom: false, deleteRoom: true },
				});
				const notDeletable = roomArchivedItemResponseFactory.build({
					allowedOperations: { archiveRoom: true, deleteRoom: false },
				});
				const { wrapper } = setup([deletable, notDeletable]);

				await openRowMenu(wrapper, deletable.id);
				await openRowMenu(wrapper, notDeletable.id);

				expect(findAction(wrapper, `menu-delete-room-${deletable.id}`)?.exists()).toBe(true);
				expect(findAction(wrapper, `menu-delete-room-${notDeletable.id}`)).toBeUndefined();
			});

			it("should restore a room and refetch the list when the restore action is clicked", async () => {
				const room = roomArchivedItemResponseFactory.build({
					allowedOperations: { archiveRoom: true },
				});
				const { wrapper, roomStore } = setup([room]);
				roomStore.fetchArchivedRooms.mockClear();

				await openRowMenu(wrapper, room.id);
				await findAction(wrapper, `menu-restore-room-${room.id}`)!.trigger("click");
				await flushPromises();

				expect(roomStore.unarchiveRoom).toHaveBeenCalledWith(room.id);
				expect(roomStore.fetchArchivedRooms).toHaveBeenCalled();
			});

			it("should show a success notification after restoring a room", async () => {
				const room = roomArchivedItemResponseFactory.build({
					allowedOperations: { archiveRoom: true },
				});
				const { wrapper } = setup([room]);

				await openRowMenu(wrapper, room.id);
				await findAction(wrapper, `menu-restore-room-${room.id}`)!.trigger("click");
				await flushPromises();

				expect(useNotificationStore().notify).toHaveBeenCalledWith(
					expect.objectContaining({ text: "pages.rooms.archived.restore.success", status: "success" })
				);
			});

			it("should ask for confirmation before deleting a room, and only delete when confirmed", async () => {
				const askDeletionSpy = vi.spyOn(confirmDialogUtils, "askDeletionForItem").mockResolvedValue(false);
				const room = roomArchivedItemResponseFactory.build({
					allowedOperations: { deleteRoom: true },
				});
				const { wrapper, roomStore } = setup([room]);

				await openRowMenu(wrapper, room.id);
				await findAction(wrapper, `menu-delete-room-${room.id}`)!.trigger("click");
				await flushPromises();

				expect(askDeletionSpy).toHaveBeenCalledWith(room.name, "common.labels.room");
				expect(roomStore.deleteRoom).not.toHaveBeenCalled();

				askDeletionSpy.mockResolvedValue(true);
				await openRowMenu(wrapper, room.id);
				await findAction(wrapper, `menu-delete-room-${room.id}`)!.trigger("click");
				await flushPromises();

				expect(roomStore.deleteRoom).toHaveBeenCalledWith(room.id);
			});
		});

		describe("bulk actions", () => {
			const selectRooms = async (wrapper: VueWrapper, roomIds: string[]) => {
				const table = wrapper.findComponent(DataTable);
				await table.vm.$emit("update:selected-ids", roomIds);
				await flushPromises();
			};

			it("should only restore the selected rooms the user is allowed to restore", async () => {
				const restorable = roomArchivedItemResponseFactory.build({
					allowedOperations: { archiveRoom: true },
				});
				const notRestorable = roomArchivedItemResponseFactory.build({
					allowedOperations: { archiveRoom: false },
				});
				const { wrapper, roomStore } = setup([restorable, notRestorable]);
				roomStore.fetchArchivedRooms.mockClear();

				await selectRooms(wrapper, [restorable.id, notRestorable.id]);
				await openBulkMenu(wrapper);

				await findAction(wrapper, "rooms-archive-restore-selected")!.trigger("click");
				await flushPromises();

				expect(roomStore.unarchiveRoom).toHaveBeenCalledTimes(1);
				expect(roomStore.unarchiveRoom).toHaveBeenCalledWith(restorable.id);
			});

			it("should warn when only some of the selected rooms could be restored", async () => {
				const restorable = roomArchivedItemResponseFactory.build({
					allowedOperations: { archiveRoom: true },
				});
				const notRestorable = roomArchivedItemResponseFactory.build({
					allowedOperations: { archiveRoom: false },
				});
				const { wrapper } = setup([restorable, notRestorable]);

				await selectRooms(wrapper, [restorable.id, notRestorable.id]);
				await openBulkMenu(wrapper);
				await findAction(wrapper, "rooms-archive-restore-selected")!.trigger("click");
				await flushPromises();

				expect(useNotificationStore().notify).toHaveBeenCalledWith(
					expect.objectContaining({ text: "pages.rooms.archived.restore.partial", status: "warning" })
				);
			});

			it("should not offer a bulk restore action when no selected room can be restored", async () => {
				const notRestorable = roomArchivedItemResponseFactory.build({
					allowedOperations: { archiveRoom: false },
				});
				const { wrapper } = setup([notRestorable]);

				await selectRooms(wrapper, [notRestorable.id]);
				await openBulkMenu(wrapper);

				expect(findAction(wrapper, "rooms-archive-restore-selected")).toBeUndefined();
			});

			it("should ask for confirmation and only delete the selected rooms the user is allowed to delete", async () => {
				const askDeletionSpy = vi.spyOn(confirmDialogUtils, "askDeletionForType").mockResolvedValue(true);
				const deletable = roomArchivedItemResponseFactory.build({
					allowedOperations: { deleteRoom: true },
				});
				const notDeletable = roomArchivedItemResponseFactory.build({
					allowedOperations: { deleteRoom: false },
				});
				const { wrapper, roomStore } = setup([deletable, notDeletable]);

				await selectRooms(wrapper, [deletable.id, notDeletable.id]);
				await openBulkMenu(wrapper);
				await findAction(wrapper, "rooms-archive-delete-selected")!.trigger("click");
				await flushPromises();

				expect(askDeletionSpy).toHaveBeenCalledWith("common.labels.room");
				expect(roomStore.deleteRoom).toHaveBeenCalledTimes(1);
				expect(roomStore.deleteRoom).toHaveBeenCalledWith(deletable.id);
			});

			it("should warn when only some of the selected rooms could be deleted", async () => {
				vi.spyOn(confirmDialogUtils, "askDeletionForType").mockResolvedValue(true);
				const deletable = roomArchivedItemResponseFactory.build({
					allowedOperations: { deleteRoom: true },
				});
				const notDeletable = roomArchivedItemResponseFactory.build({
					allowedOperations: { deleteRoom: false },
				});
				const { wrapper } = setup([deletable, notDeletable]);

				await selectRooms(wrapper, [deletable.id, notDeletable.id]);
				await openBulkMenu(wrapper);
				await findAction(wrapper, "rooms-archive-delete-selected")!.trigger("click");
				await flushPromises();

				expect(useNotificationStore().notify).toHaveBeenCalledWith(
					expect.objectContaining({ text: "pages.rooms.archived.delete.partial", status: "warning" })
				);
			});
		});
	});

	describe("navigation", () => {
		it("should link each room to its room details page", () => {
			const room = roomArchivedItemResponseFactory.build();
			const { wrapper } = setup([room]);

			const link = wrapper.find(`[data-testid="rooms-archive-room-link-${room.id}"]`);
			expect(link.exists()).toBe(true);
			expect(link.text()).toBe(room.name);
		});
	});
});
