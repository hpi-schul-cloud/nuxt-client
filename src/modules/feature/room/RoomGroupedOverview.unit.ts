import RoomGroupDeleteDialog from "./RoomGroupDeleteDialog.vue";
import RoomGroupedOverview from "./RoomGroupedOverview.vue";
import RoomGroupNameDialog from "./RoomGroupNameDialog.vue";
import RoomGroupSection from "./RoomGroupSection.vue";
import RoomMoveDialog from "./RoomMoveDialog.vue";
import { RoomItem } from "@/types/room/Room";
import {
	mockApi,
	mockApiResponse,
	roomArrangementResponseFactory,
	roomGroupResponseFactory,
	roomItemFactory,
} from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import {
	RoomApiFactory,
	RoomArrangementApiFactory,
	RoomArrangementResponse,
	RoomItemResponseAllowedOperations,
	RoomListResponse,
} from "@api-server";
import { useNotificationStore } from "@data-app";
import { applyRoomMove, applyRoomsMove, useRoomArrangementStore } from "@data-room";
import { createTestingPinia } from "@pinia/testing";
import { logger } from "@util-logger";
import { flushPromises } from "@vue/test-utils";
import { AxiosError, AxiosHeaders } from "axios";
import { cloneDeep, omit } from "lodash-es";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";

vi.mock("@api-server");

type ArrangementApi = ReturnType<typeof RoomArrangementApiFactory>;

const arrangeable = { arrangeRooms: true } as unknown as RoomItemResponseAllowedOperations;

describe("RoomGroupedOverview", () => {
	let wrapper: ReturnType<typeof mount<typeof RoomGroupedOverview>> | undefined;
	let arrangementApi: Mocked<ArrangementApi>;
	let rooms: RoomItem[];

	const groupA = roomGroupResponseFactory.build({ id: "aaaaaaaaaaaaaaaaaaaaaaaa", name: "Informatik" });
	const groupB = roomGroupResponseFactory.build({ id: "bbbbbbbbbbbbbbbbbbbbbbbb", name: "Deutsch" });

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		arrangementApi = mockApi<ArrangementApi>();
		const roomApi = mockApi<ReturnType<typeof RoomApiFactory>>();
		vi.mocked(RoomArrangementApiFactory).mockReturnValue(arrangementApi);
		vi.mocked(RoomApiFactory).mockReturnValue(roomApi);
		vi.spyOn(logger, "error").mockImplementation(vi.fn());

		rooms = roomItemFactory.buildList(3, { allowedOperations: arrangeable });
		roomApi.roomControllerGetRooms.mockImplementation(async () =>
			mockApiResponse<RoomListResponse>({ data: { data: rooms } })
		);
	});

	afterEach(() => {
		wrapper?.unmount();
	});

	const respond = (arrangement: RoomArrangementResponse) => mockApiResponse({ data: arrangement });

	const setup = async (arrangement: Partial<RoomArrangementResponse> = {}) => {
		const initial = roomArrangementResponseFactory.build({
			revision: 5,
			ungroupedRoomIds: rooms.slice(0, 1).map((room) => room.id),
			groups: [
				{ ...groupA, roomIds: rooms.slice(1).map((room) => room.id) },
				{ ...groupB, roomIds: [] },
			],
			...arrangement,
		});
		const server = useFakeArrangementServer(initial);
		await useRoomArrangementStore().loadOverview();

		wrapper = mount(RoomGroupedOverview, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				stubs: { RouterLink: true, UseFocusTrap: true },
			},
			attachTo: document.body,
		});
		await flushPromises();
		return { wrapper, initial, server };
	};

	// Applies every mutation like the backend does, so undo sequences can be followed end to end.
	const useFakeArrangementServer = (initial: RoomArrangementResponse) => {
		let state = cloneDeep(initial);
		let createdCount = 0;
		const commit = () => {
			state = { ...state, revision: state.revision + 1 };
			return respond(cloneDeep(state));
		};
		arrangementApi.roomArrangementControllerGetArrangement.mockImplementation(async () => respond(cloneDeep(state)));
		arrangementApi.roomArrangementControllerMoveRoom.mockImplementation(async (body) => {
			applyRoomMove(state, body);
			return commit();
		});
		arrangementApi.roomArrangementControllerMoveRooms.mockImplementation(async (body) => {
			applyRoomsMove(state, body.roomIds, body.targetGroupId);
			return commit();
		});
		arrangementApi.roomArrangementControllerUpdateGroup.mockImplementation(async (groupId, body) => {
			const group = state.groups.find((g) => g.id === groupId);
			if (group && body.collapsed !== undefined) group.collapsed = body.collapsed;
			if (group && body.name !== undefined) group.name = body.name;
			return commit();
		});
		arrangementApi.roomArrangementControllerUpdateGroupsCollapsed.mockImplementation(async (body) => {
			state.groups.forEach((group) => {
				group.collapsed = body.collapsed;
			});
			return commit();
		});
		arrangementApi.roomArrangementControllerUpdateGroupOrder.mockImplementation(async (body) => {
			state.groups = body.groupIds.map((id) => state.groups.find((g) => g.id === id)).filter((g) => g !== undefined);
			return commit();
		});
		arrangementApi.roomArrangementControllerDeleteGroup.mockImplementation(async (groupId) => {
			const group = state.groups.find((g) => g.id === groupId);
			state.groups = state.groups.filter((g) => g.id !== groupId);
			state.ungroupedRoomIds.push(...(group?.roomIds ?? []));
			return commit();
		});
		arrangementApi.roomArrangementControllerUpdatePreferences.mockImplementation(async (body) => {
			Object.assign(state, omit(body, "expectedRevision"));
			return commit();
		});
		arrangementApi.roomArrangementControllerCreateGroup.mockImplementation(async (body) => {
			createdCount++;
			const id = `${createdCount}`.padStart(24, "c");
			state.groups.push({ id, name: body.name, collapsed: false, roomIds: [] });
			const response = commit();
			return mockApiResponse({ data: { ...response.data, createdGroupId: id } });
		});
		return { getState: () => state };
	};

	const sections = () => wrapper?.findAllComponents(RoomGroupSection) ?? [];
	// Undo is offered through the shared success notification with an undo action (same as archiving).
	const undoNotification = () => useNotificationStore().notifierItems.find((item) => item.action !== undefined);
	const undoSnackbarText = () => undoNotification()?.text ?? "";
	const clickInDocument = (selector: string) => document.querySelector<HTMLElement>(selector)?.click();

	describe("rendering", () => {
		it("renders the fixed ungrouped section first, followed by the named groups in saved order", async () => {
			await setup();

			const testIds = sections().map((section) => section.attributes("data-testid"));
			expect(testIds).toEqual(["room-group-ungrouped", "room-group-0", "room-group-1"]);
			expect(sections()[0].classes()).not.toContain("room-group-sortable-item");
		});

		it("renders empty groups", async () => {
			await setup();

			expect(wrapper?.find("[data-testid='room-group-1'] [data-testid='room-group-empty']").exists()).toBe(true);
		});

		it("keeps index based room test ids unique across the overview", async () => {
			await setup();

			const ids = wrapper?.findAll("[data-testid^='board-grid-item-']").map((item) => item.attributes("data-testid"));
			expect(ids).toEqual(["board-grid-item-0", "board-grid-item-1", "board-grid-item-2"]);
		});

		it("offers adding a group with zero rooms and without room creation permission", async () => {
			rooms = [];
			await setup({ ungroupedRoomIds: [], groups: [] });

			const addButton = wrapper?.get("[data-testid='room-group-add']");
			expect(addButton?.attributes("disabled")).toBeUndefined();
		});

		it("shows a retry state instead of an empty arrangement when the arrangement cannot be loaded", async () => {
			arrangementApi.roomArrangementControllerGetArrangement.mockRejectedValue(new Error("failed"));
			await useRoomArrangementStore().loadOverview();
			wrapper = mount(RoomGroupedOverview, {
				global: { plugins: [createTestingVuetify(), createTestingI18n()], stubs: { RouterLink: true } },
			});

			expect(wrapper.find("[data-testid='room-groups-load-error']").exists()).toBe(true);
			expect(wrapper.find("[data-testid='room-group-add']").exists()).toBe(false);
			expect(wrapper.findAll("[data-testid^='board-grid-item-']")).toHaveLength(3);
			expect(wrapper.find("[data-testid='room-group-grid']").exists()).toBe(false);

			arrangementApi.roomArrangementControllerGetArrangement.mockResolvedValue(
				respond(roomArrangementResponseFactory.build())
			);
			await wrapper.get("[data-testid='room-groups-retry']").trigger("click");
			await flushPromises();

			expect(wrapper.find("[data-testid='room-groups-load-error']").exists()).toBe(false);
		});
	});

	describe("moving rooms", () => {
		it("moves a room via the move dialog with exactly one appending command", async () => {
			await setup();

			sections()[0].vm.$emit("move-to-group", rooms[0]);
			await flushPromises();
			const dialog = wrapper?.findComponent(RoomMoveDialog);
			expect(dialog?.props("currentKey")).toBe("ungrouped");
			dialog?.vm.$emit("confirm", groupB.id);
			await flushPromises();

			expect(arrangementApi.roomArrangementControllerMoveRoom).toHaveBeenCalledTimes(1);
			expect(arrangementApi.roomArrangementControllerMoveRoom).toHaveBeenCalledWith({
				expectedRevision: 5,
				roomId: rooms[0].id,
				sourceGroupId: null,
				targetGroupId: groupB.id,
				beforeRoomId: null,
			});
		});

		it("confirms a move into a collapsed group visibly and focuses that group's toggle", async () => {
			await setup({
				groups: [
					{ ...groupA, roomIds: rooms.slice(1).map((room) => room.id) },
					{ ...groupB, roomIds: [], collapsed: true },
				],
			});

			sections()[0].vm.$emit("move-to-group", rooms[0]);
			await flushPromises();
			wrapper?.findComponent(RoomMoveDialog).vm.$emit("confirm", groupB.id);
			await flushPromises();
			wrapper?.findComponent(RoomMoveDialog).vm.$emit("after-leave");
			await flushPromises();

			expect(undoSnackbarText()).toContain("pages.rooms.groups.notification.movedIntoCollapsed");
			expect(document.activeElement?.getAttribute("data-testid")).toBe("room-group-toggle");
			expect(document.activeElement?.closest("[data-group-id]")?.getAttribute("data-group-id")).toBe(groupB.id);
		});

		it("offers moving rooms of the ungrouped section only when a group exists", async () => {
			await setup({ groups: [] });

			expect(sections()[0].props("hasMoveTargets")).toBe(false);
		});

		it("converts a completed drag between sections into exactly one command", async () => {
			await setup();
			const sortable = sections()[0].findComponent({ name: "Sortable" });
			const target = wrapper?.get("[data-testid='room-group-0'] [data-testid='room-group-grid']").element;
			const source = sortable.element;
			const item = wrapper?.get(`[data-room-id='${rooms[0].id}']`).element;

			sortable.vm.$emit("start", { item });
			sortable.vm.$emit("end", { item, from: source, to: target, oldIndex: 0, newIndex: 1 });
			await flushPromises();

			expect(arrangementApi.roomArrangementControllerMoveRoom).toHaveBeenCalledTimes(1);
			expect(arrangementApi.roomArrangementControllerMoveRoom).toHaveBeenCalledWith({
				expectedRevision: 5,
				roomId: rooms[0].id,
				sourceGroupId: null,
				targetGroupId: groupA.id,
				beforeRoomId: rooms[2].id,
			});
		});

		it("writes nothing for a drop at the original position", async () => {
			await setup();
			const sortable = sections()[1].findComponent({ name: "Sortable" });
			const item = wrapper?.get(`[data-room-id='${rooms[1].id}']`).element;

			sortable.vm.$emit("end", { item, from: sortable.element, to: sortable.element, oldIndex: 0, newIndex: 0 });
			await flushPromises();

			expect(arrangementApi.roomArrangementControllerMoveRoom).not.toHaveBeenCalled();
		});

		it("moves a room later via its menu", async () => {
			await setup();

			await wrapper?.get(`[data-room-id='${rooms[1].id}'] [data-testid='room-card-menu']`).trigger("click");
			clickInDocument("[data-testid='room-card-menu-move-later']");
			await flushPromises();

			expect(arrangementApi.roomArrangementControllerMoveRoom).toHaveBeenCalledWith(
				expect.objectContaining({
					roomId: rooms[1].id,
					sourceGroupId: groupA.id,
					targetGroupId: groupA.id,
					beforeRoomId: null,
				})
			);
		});
	});

	describe("groups", () => {
		it("persists collapsing a group", async () => {
			const { initial } = await setup();
			arrangementApi.roomArrangementControllerUpdateGroup.mockResolvedValue(
				respond({ ...initial, revision: 6, groups: [{ ...initial.groups[0], collapsed: true }, initial.groups[1]] })
			);

			await wrapper?.get("[data-testid='room-group-0'] [data-testid='room-group-toggle']").trigger("click");
			await flushPromises();

			expect(arrangementApi.roomArrangementControllerUpdateGroup).toHaveBeenCalledWith(groupA.id, {
				expectedRevision: 5,
				collapsed: true,
			});
			expect(
				wrapper?.get("[data-testid='room-group-0'] [data-testid='room-group-toggle']").attributes("aria-expanded")
			).toBe("false");
		});

		it("creates a group and closes the dialog on success", async () => {
			const { initial } = await setup();
			const createdId = "cccccccccccccccccccccccc";
			arrangementApi.roomArrangementControllerCreateGroup.mockResolvedValue(
				mockApiResponse({
					data: {
						...initial,
						revision: 6,
						groups: [...initial.groups, { id: createdId, name: "Mathe", collapsed: false, roomIds: [] }],
						createdGroupId: createdId,
					},
				})
			);

			await wrapper?.get("[data-testid='room-group-add']").trigger("click");
			const dialog = wrapper?.findComponent(RoomGroupNameDialog);
			expect(dialog?.props("modelValue")).toBe(true);
			dialog?.vm.$emit("submit", "Mathe");
			await flushPromises();

			expect(useNotificationStore().notifierItems[0]).toMatchObject({
				status: "success",
				text: "pages.rooms.groups.announce.created",
			});
			expect(arrangementApi.roomArrangementControllerCreateGroup).toHaveBeenCalledWith({
				expectedRevision: 5,
				name: "Mathe",
			});
			expect(dialog?.props("modelValue")).toBe(false);
			expect(wrapper?.find(`[data-group-id='${createdId}']`).exists()).toBe(true);
		});

		it("keeps the name dialog open with an inline error when the server rejects the name", async () => {
			await setup();
			arrangementApi.roomArrangementControllerCreateGroup.mockRejectedValue(
				new AxiosError("Bad Request", "ERR_BAD_REQUEST", undefined, undefined, {
					status: 400,
					statusText: "",
					headers: {},
					config: { headers: new AxiosHeaders() },
					data: { code: 400, type: "ROOM_GROUP_NAME_DUPLICATE", title: "", message: "", details: { field: "name" } },
				})
			);

			await wrapper?.get("[data-testid='room-group-add']").trigger("click");
			const dialog = wrapper?.findComponent(RoomGroupNameDialog);
			dialog?.vm.$emit("submit", "Informatik");
			await flushPromises();

			expect(dialog?.props("modelValue")).toBe(true);
			expect(dialog?.props("serverError")).toBe("DUPLICATE");
		});

		it("asks for confirmation before deleting and sends the opt-out with the delete", async () => {
			await setup();

			sections()[1].vm.$emit("delete");
			await flushPromises();
			const dialog = wrapper?.findComponent(RoomGroupDeleteDialog);
			expect(dialog?.props("modelValue")).toBe(true);
			expect(arrangementApi.roomArrangementControllerDeleteGroup).not.toHaveBeenCalled();

			dialog?.vm.$emit("confirm", true);
			await flushPromises();

			expect(arrangementApi.roomArrangementControllerDeleteGroup).toHaveBeenCalledWith(groupA.id, {
				expectedRevision: 5,
				disableFutureConfirmation: true,
			});
		});

		it("does not delete when the confirmation is cancelled", async () => {
			await setup();

			sections()[1].vm.$emit("delete");
			await flushPromises();
			wrapper?.findComponent(RoomGroupDeleteDialog).vm.$emit("cancel");
			await flushPromises();

			expect(wrapper?.findComponent(RoomGroupDeleteDialog).props("modelValue")).toBe(false);
			expect(arrangementApi.roomArrangementControllerDeleteGroup).not.toHaveBeenCalled();
		});

		describe("focus after a dialog is cancelled", () => {
			it("returns focus to the add button after cancelling the create dialog", async () => {
				await setup();

				clickInDocument("[data-testid='room-group-add']");
				await flushPromises();
				const dialog = wrapper?.findComponent(RoomGroupNameDialog);
				dialog?.vm.$emit("cancel");
				dialog?.vm.$emit("after-leave");
				await flushPromises();

				expect(document.activeElement?.getAttribute("data-testid")).toBe("room-group-add");
			});

			it("returns focus to the group menu after cancelling the delete dialog", async () => {
				await setup();

				sections()[1].vm.$emit("delete");
				await flushPromises();
				const dialog = wrapper?.findComponent(RoomGroupDeleteDialog);
				dialog?.vm.$emit("cancel");
				dialog?.vm.$emit("after-leave");
				await flushPromises();

				const focusedGroup = document.activeElement?.closest("[data-group-id]");
				expect(document.activeElement?.getAttribute("data-testid")).toBe("room-group-menu");
				expect(focusedGroup?.getAttribute("data-group-id")).toBe(groupA.id);
			});

			it("returns focus to the room menu after cancelling the move dialog", async () => {
				await setup();

				sections()[0].vm.$emit("move-to-group", rooms[0]);
				await flushPromises();
				const dialog = wrapper?.findComponent(RoomMoveDialog);
				dialog?.vm.$emit("cancel");
				dialog?.vm.$emit("after-leave");
				await flushPromises();

				const focusedRoom = document.activeElement?.closest("[data-room-id]");
				expect(focusedRoom?.getAttribute("data-room-id")).toBe(rooms[0].id);
			});
		});

		it("does not save a rename that keeps the name", async () => {
			await setup();

			sections()[1].vm.$emit("rename");
			await flushPromises();
			wrapper?.findComponent(RoomGroupNameDialog).vm.$emit("submit", groupA.name);
			await flushPromises();

			expect(arrangementApi.roomArrangementControllerUpdateGroup).not.toHaveBeenCalled();
			expect(wrapper?.findComponent(RoomGroupNameDialog).props("modelValue")).toBe(false);
		});

		it("deletes directly with visible feedback when confirmations are disabled", async () => {
			await setup({ confirmGroupDeletion: false });

			sections()[1].vm.$emit("delete");
			await flushPromises();

			expect(wrapper?.findComponent(RoomGroupDeleteDialog).props("modelValue")).toBe(false);
			expect(arrangementApi.roomArrangementControllerDeleteGroup).toHaveBeenCalledWith(groupA.id, {
				expectedRevision: 5,
			});
			expect(undoSnackbarText()).toContain("pages.rooms.groups.announce.deleted");
		});

		it("moves a group down via its menu", async () => {
			await setup();

			sections()[1].vm.$emit("move-down");
			await flushPromises();

			expect(arrangementApi.roomArrangementControllerUpdateGroupOrder).toHaveBeenCalledWith({
				expectedRevision: 5,
				groupIds: [groupB.id, groupA.id],
			});
		});

		it("reorders groups after a completed group drag", async () => {
			await setup();
			const groupSortable = wrapper
				?.findAllComponents({ name: "Sortable" })
				.find((sortable) => sortable.classes().includes("room-group-list"));
			const item = wrapper?.get("[data-testid='room-group-1']").element;

			groupSortable?.vm.$emit("end", { item, oldIndex: 1, newIndex: 0 });
			await flushPromises();

			expect(arrangementApi.roomArrangementControllerUpdateGroupOrder).toHaveBeenCalledTimes(1);
			expect(arrangementApi.roomArrangementControllerUpdateGroupOrder).toHaveBeenCalledWith({
				expectedRevision: 5,
				groupIds: [groupB.id, groupA.id],
			});
		});
	});

	describe("while a change is being saved", () => {
		const keepPending = () => new Promise<never>(() => undefined);

		it("ignores further group and room actions", async () => {
			await setup();
			arrangementApi.roomArrangementControllerUpdateGroup.mockReturnValue(keepPending());

			sections()[1].vm.$emit("toggle", true);
			await flushPromises();
			sections()[1].vm.$emit("delete");
			sections()[1].vm.$emit("move-down");
			sections()[1].vm.$emit("rename");
			sections()[0].vm.$emit("move-to-group", rooms[0]);
			await flushPromises();

			expect(sections()[1].props("disabled")).toBe(true);
			expect(wrapper?.findComponent(RoomGroupDeleteDialog).props("modelValue")).toBe(false);
			expect(wrapper?.findComponent(RoomMoveDialog).props("modelValue")).toBe(false);
			expect(wrapper?.findComponent(RoomGroupNameDialog).props("modelValue")).toBe(false);
			expect(arrangementApi.roomArrangementControllerUpdateGroup).toHaveBeenCalledTimes(1);
			expect(arrangementApi.roomArrangementControllerUpdateGroupOrder).not.toHaveBeenCalled();
		});

		it("keeps the delete dialog open and not dismissible until the request finished", async () => {
			await setup();
			arrangementApi.roomArrangementControllerDeleteGroup.mockReturnValue(keepPending());
			sections()[1].vm.$emit("delete");
			await flushPromises();
			const dialog = wrapper?.findComponent(RoomGroupDeleteDialog);

			dialog?.vm.$emit("confirm", false);
			await flushPromises();
			dialog?.vm.$emit("cancel");
			await flushPromises();

			expect(dialog?.props("modelValue")).toBe(true);
			expect(dialog?.props("isDeleting")).toBe(true);
			expect(dialog?.findComponent({ name: "SvsDialog" }).props("persistent")).toBe(true);
		});

		it("keeps the move dialog open and not dismissible until the request finished", async () => {
			await setup();
			arrangementApi.roomArrangementControllerMoveRoom.mockReturnValue(keepPending());
			sections()[0].vm.$emit("move-to-group", rooms[0]);
			await flushPromises();
			const dialog = wrapper?.findComponent(RoomMoveDialog);

			dialog?.vm.$emit("confirm", groupB.id);
			await flushPromises();
			dialog?.vm.$emit("cancel");
			await flushPromises();

			expect(dialog?.props("modelValue")).toBe(true);
			expect(dialog?.props("isMoving")).toBe(true);
			expect(dialog?.findComponent({ name: "SvsDialog" }).props("persistent")).toBe(true);
		});

		it("keeps the name dialog not dismissible while saving", async () => {
			await setup();
			arrangementApi.roomArrangementControllerCreateGroup.mockReturnValue(keepPending());
			await wrapper?.get("[data-testid='room-group-add']").trigger("click");
			const dialog = wrapper?.findComponent(RoomGroupNameDialog);

			dialog?.vm.$emit("submit", "Mathe");
			await flushPromises();
			dialog?.vm.$emit("cancel");
			await flushPromises();

			expect(dialog?.props("modelValue")).toBe(true);
			expect(dialog?.findComponent({ name: "SvsDialog" }).props("persistent")).toBe(true);
		});
	});

	describe("heading hierarchy", () => {
		it("renders room titles as h2 when no named group exists", async () => {
			await setup({ ungroupedRoomIds: rooms.map((room) => room.id), groups: [] });

			expect(wrapper?.find("[data-testid='room-group-title']").exists()).toBe(false);
			expect(wrapper?.findAll(".room-grid-item h2")).toHaveLength(3);
			expect(wrapper?.findAll(".room-grid-item h3")).toHaveLength(0);
		});

		it("renders room titles as h3 below the section headings when groups exist", async () => {
			await setup();

			expect(wrapper?.findAll("h2 [data-testid='room-group-title']")).toHaveLength(3);
			expect(wrapper?.findAll(".room-grid-item h3")).toHaveLength(3);
		});
	});

	describe("first-run guidance", () => {
		it("shows a hint with an add group action while no group exists and there are at least two rooms", async () => {
			await setup({ ungroupedRoomIds: rooms.map((room) => room.id), groups: [] });

			expect(wrapper?.find("[data-testid='room-groups-onboarding']").text()).toContain(
				"pages.rooms.groups.onboarding.text"
			);
			await wrapper?.get("[data-testid='room-groups-onboarding-add']").trigger("click");

			expect(wrapper?.findComponent(RoomGroupNameDialog).props("modelValue")).toBe(true);
		});

		it("hides the hint once a group exists", async () => {
			await setup();

			expect(wrapper?.find("[data-testid='room-groups-onboarding-add']").exists()).toBe(false);
		});

		it("hides the hint with fewer than two rooms", async () => {
			rooms = rooms.slice(0, 1);
			await setup({ ungroupedRoomIds: [rooms[0].id], groups: [] });

			expect(wrapper?.find("[data-testid='room-groups-onboarding-add']").exists()).toBe(false);
		});
	});

	describe("selecting several rooms", () => {
		const startSelecting = async () => {
			wrapper?.vm.startSelection();
			await flushPromises();
		};

		const selectRoom = async (roomId: string) => {
			await wrapper?.get(`[data-room-id='${roomId}'] [data-testid='room-card-select'] input`).setValue(true);
		};

		it("moves the selected rooms with one request, ends the selection and offers undo", async () => {
			const { server } = await setup();
			await startSelecting();

			expect(wrapper?.findAll("[data-testid='room-card-select']")).toHaveLength(3);
			expect(wrapper?.find("[data-testid='room-card-menu']").exists()).toBe(false);
			await selectRoom(rooms[2].id);
			await selectRoom(rooms[0].id);
			expect(wrapper?.get("[data-testid='room-selection-bar']").text()).toContain("pages.rooms.groups.selection.count");

			await wrapper?.get("[data-testid='room-selection-move']").trigger("click");
			const dialog = wrapper?.findComponent(RoomMoveDialog);
			expect(dialog?.props("roomCount")).toBe(2);
			expect(dialog?.props("currentKey")).toBeUndefined();
			dialog?.vm.$emit("confirm", groupB.id);
			await flushPromises();

			expect(arrangementApi.roomArrangementControllerMoveRooms).toHaveBeenCalledTimes(1);
			expect(arrangementApi.roomArrangementControllerMoveRooms).toHaveBeenCalledWith({
				expectedRevision: 5,
				roomIds: [rooms[0].id, rooms[2].id],
				targetGroupId: groupB.id,
			});
			expect(server.getState().groups[1].roomIds).toEqual([rooms[0].id, rooms[2].id]);
			expect(wrapper?.find("[data-testid='room-selection-bar']").exists()).toBe(false);
			expect(undoSnackbarText()).toContain("pages.rooms.groups.undo.roomsMoved");
		});

		it("disables dragging while selecting", async () => {
			await setup();
			await startSelecting();

			expect(wrapper?.find(".room-grid-item.draggable").exists()).toBe(false);
		});

		it("ends the selection with Escape and with cancel", async () => {
			await setup();
			await startSelecting();

			document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
			await flushPromises();
			expect(wrapper?.find("[data-testid='room-selection-bar']").exists()).toBe(false);

			wrapper?.vm.startSelection();
			await flushPromises();
			await wrapper?.get("[data-testid='room-selection-cancel']").trigger("click");
			expect(wrapper?.find("[data-testid='room-selection-bar']").exists()).toBe(false);
		});

		it("does not offer moving before a room is selected", async () => {
			await setup();
			wrapper?.vm.startSelection();
			await flushPromises();

			expect(wrapper?.get("[data-testid='room-selection-move']").attributes("disabled")).toBeDefined();
		});
	});

	describe("undo", () => {
		const clickUndo = async () => {
			await undoNotification()?.action?.handler();
			await flushPromises();
		};

		it("moves a room back to its original place", async () => {
			const { server } = await setup();
			sections()[1].vm.$emit("move-to-group", rooms[1]);
			await flushPromises();
			wrapper?.findComponent(RoomMoveDialog).vm.$emit("confirm", groupB.id);
			await flushPromises();
			expect(server.getState().groups[1].roomIds).toEqual([rooms[1].id]);

			await clickUndo();

			expect(server.getState().groups[0].roomIds).toEqual([rooms[1].id, rooms[2].id]);
			expect(server.getState().groups[1].roomIds).toEqual([]);
			expect(useRoomArrangementStore().isUndoOffered).toBe(false);
		});

		it("offers undo after a keyboard reorder", async () => {
			await setup();

			sections()[1].vm.$emit("drop", {
				roomId: rooms[1].id,
				fromKey: groupA.id,
				toKey: groupA.id,
				oldIndex: 0,
				newIndex: 1,
			});
			await flushPromises();

			expect(undoSnackbarText()).toContain("pages.rooms.groups.undo.roomReordered");
		});

		it("restores a deleted group at its position with its rooms", async () => {
			const { server } = await setup({
				groups: [
					{ ...groupA, roomIds: rooms.slice(1).map((room) => room.id) },
					{ ...groupB, roomIds: [] },
				],
			});
			sections()[1].vm.$emit("delete");
			await flushPromises();
			wrapper?.findComponent(RoomGroupDeleteDialog).vm.$emit("confirm", false);
			await flushPromises();
			expect(server.getState().groups.map((g) => g.name)).toEqual(["Deutsch"]);

			await clickUndo();

			expect(server.getState().groups.map((g) => g.name)).toEqual(["Informatik", "Deutsch"]);
			expect(server.getState().groups[0].roomIds).toEqual(rooms.slice(1).map((room) => room.id));
			expect(server.getState().ungroupedRoomIds).toEqual([rooms[0].id]);
		});
	});

	describe("collapse toggles while a change is saved", () => {
		it("shows the toggle result at once and persists it afterwards", async () => {
			await setup();
			let resolveOrder: () => void = () => undefined;
			const orderImplementation = arrangementApi.roomArrangementControllerUpdateGroupOrder.getMockImplementation();
			arrangementApi.roomArrangementControllerUpdateGroupOrder.mockImplementationOnce(
				(body) =>
					new Promise((resolve) => {
						resolveOrder = () => orderImplementation && resolve(orderImplementation(body));
					})
			);

			sections()[1].vm.$emit("move-down");
			await flushPromises();
			await wrapper?.get(`[data-group-id='${groupB.id}'] [data-testid='room-group-toggle']`).trigger("click");
			await flushPromises();

			expect(
				wrapper?.get(`[data-group-id='${groupB.id}'] [data-testid='room-group-toggle']`).attributes("aria-expanded")
			).toBe("false");
			expect(arrangementApi.roomArrangementControllerUpdateGroup).not.toHaveBeenCalled();

			resolveOrder();
			await flushPromises();

			expect(arrangementApi.roomArrangementControllerUpdateGroup).toHaveBeenCalledWith(groupB.id, {
				expectedRevision: 6,
				collapsed: true,
			});
		});
	});

	describe("focus targets", () => {
		it("focuses the accordion button of a newly created group", async () => {
			await setup();
			await wrapper?.get("[data-testid='room-group-add']").trigger("click");

			wrapper?.findComponent(RoomGroupNameDialog).vm.$emit("submit", "Mathe");
			await flushPromises();

			expect(document.activeElement?.getAttribute("data-testid")).toBe("room-group-toggle");
			expect(document.activeElement?.querySelector("[data-testid='room-group-title']")?.textContent).toBe("Mathe");
		});

		it("focuses the accordion button of the neighbouring group after a delete", async () => {
			await setup({ confirmGroupDeletion: false });

			sections()[1].vm.$emit("delete");
			await flushPromises();

			expect(document.activeElement?.closest("[data-group-id]")?.getAttribute("data-group-id")).toBe(groupB.id);
			expect(document.activeElement?.getAttribute("data-testid")).toBe("room-group-toggle");
		});
	});

	describe("round 4", () => {
		it("does not announce the first-run hint as an alert", async () => {
			await setup({ ungroupedRoomIds: rooms.map((room) => room.id), groups: [] });

			const hint = wrapper?.get("[data-testid='room-groups-onboarding']");
			expect(hint?.attributes("role")).toBeUndefined();
			expect(hint?.find("[role='alert']").exists()).toBe(false);
			expect(hint?.find(".v-alert").exists()).toBe(false);
		});

		it("hides the first-run hint for this page session and moves focus to adding a group", async () => {
			await setup({ ungroupedRoomIds: rooms.map((room) => room.id), groups: [] });

			await wrapper?.get("[data-testid='room-groups-onboarding-dismiss']").trigger("click");
			await flushPromises();

			expect(wrapper?.find("[data-testid='room-groups-onboarding']").exists()).toBe(false);
			expect(useRoomArrangementStore().isOnboardingDismissed).toBe(true);
			expect(document.activeElement?.getAttribute("data-testid")).toBe("room-group-add");
		});

		it("reports the selection mode so the page can hide covering controls", async () => {
			await setup();

			wrapper?.vm.startSelection();
			await flushPromises();
			await wrapper?.get("[data-testid='room-selection-cancel']").trigger("click");
			await flushPromises();

			expect(wrapper?.emitted("selection-change")).toEqual([[true], [false]]);
		});

		it("uses large hit targets in the selection bar", async () => {
			await setup();
			wrapper?.vm.startSelection();
			await flushPromises();

			for (const testId of ["room-selection-move", "room-selection-cancel"]) {
				expect(wrapper?.get(`[data-testid='${testId}']`).classes()).toContain("v-btn--size-large");
			}
		});

		it("toggles a room when its card body is clicked while selecting", async () => {
			await setup();
			wrapper?.vm.startSelection();
			await flushPromises();

			await wrapper?.get(`[data-room-id='${rooms[0].id}'] .v-card-item`).trigger("click");

			expect(wrapper?.get("[data-testid='room-selection-count']").text()).toBe("pages.rooms.groups.selection.count");
			expect(wrapper?.get(`[data-room-id='${rooms[0].id}']`).classes()).toContain("room-grid-item--selected");
		});
	});

	describe("round 5", () => {
		const setWindowWidth = (width: number) =>
			Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: width });

		afterEach(() => setWindowWidth(1024));

		it("shows the first-run hint as a quiet line above the rooms", async () => {
			await setup({ ungroupedRoomIds: rooms.map((room) => room.id), groups: [] });

			const hint = wrapper?.get("[data-testid='room-groups-onboarding']");
			expect(hint?.get(".room-groups-onboarding-text").classes()).toEqual(
				expect.arrayContaining(["text-body-2", "text-medium-emphasis"])
			);
			expect(hint?.get("[data-testid='room-groups-onboarding-add']").attributes("style")).toContain("height: 40px");
			const order = wrapper?.findAll("[data-testid='room-groups-onboarding'], [data-testid='room-group-list']");
			expect(order?.[0].attributes("data-testid")).toBe("room-groups-onboarding");
		});

		it("puts the first-run hint after the rooms on phones", async () => {
			setWindowWidth(400);
			await setup({ ungroupedRoomIds: rooms.map((room) => room.id), groups: [] });

			const order = wrapper?.findAll("[data-testid='room-groups-onboarding'], [data-testid='room-group-list']");
			expect(order?.map((element) => element.attributes("data-testid"))).toEqual([
				"room-group-list",
				"room-groups-onboarding",
			]);
		});

		it("selects all arrangeable rooms of a section and disables adding groups while selecting", async () => {
			await setup();
			wrapper?.vm.startSelection();
			await flushPromises();

			await wrapper?.get("[data-testid='room-group-0'] [data-testid='room-group-select-all'] input").setValue(true);

			expect(wrapper?.get("[data-testid='room-selection-move']").attributes("disabled")).toBeUndefined();
			expect(wrapper?.findAll(".room-grid-item--selected")).toHaveLength(2);
			expect(wrapper?.get("[data-testid='room-group-add']").attributes("disabled")).toBeDefined();
		});

		it("shows the selection instruction from sm up", async () => {
			await setup();
			wrapper?.vm.startSelection();
			await flushPromises();

			const instruction = wrapper?.get("[data-testid='room-selection-instruction']");
			expect(instruction?.text()).toBe("pages.rooms.groups.selection.instruction");
			expect(instruction?.classes()).not.toContain("d-sr-only");
		});

		it("keeps the instruction for screen readers only and stacks the bar on phones", async () => {
			setWindowWidth(400);
			await setup();
			wrapper?.vm.startSelection();
			await flushPromises();

			expect(wrapper?.get("[data-testid='room-selection-instruction']").classes()).toContain("d-sr-only");
			expect(wrapper?.get("[data-testid='room-selection-bar']").classes()).toContain("room-selection-bar--xs");
		});
	});

	describe("round 5 addendum", () => {
		const cancelNameDialog = async () => {
			const dialog = wrapper?.findComponent(RoomGroupNameDialog);
			dialog?.vm.$emit("cancel");
			dialog?.vm.$emit("after-leave");
			await flushPromises();
		};

		it("returns focus to the onboarding button that opened the create dialog", async () => {
			await setup({ ungroupedRoomIds: rooms.map((room) => room.id), groups: [] });
			await wrapper?.get("[data-testid='room-groups-onboarding-add']").trigger("click");

			await cancelNameDialog();

			expect(document.activeElement?.getAttribute("data-testid")).toBe("room-groups-onboarding-add");
		});

		it("returns focus to the add row when the create dialog was opened there", async () => {
			await setup();
			await wrapper?.get("[data-testid='room-group-add']").trigger("click");

			await cancelNameDialog();

			expect(document.activeElement?.getAttribute("data-testid")).toBe("room-group-add");
		});

		it("returns focus to a trigger outside of the overview", async () => {
			const trigger = document.createElement("button");
			trigger.dataset.testid = "rooms-menu";
			document.body.appendChild(trigger);
			await setup();

			wrapper?.vm.openCreateDialog("[data-testid='rooms-menu']");
			await flushPromises();
			await cancelNameDialog();

			expect(document.activeElement).toBe(trigger);
			trigger.remove();
		});

		it("leaves room below the content for the sticky selection bar while selecting", async () => {
			await setup();
			expect(wrapper?.classes()).not.toContain("room-grouped-overview--selecting");

			wrapper?.vm.startSelection();
			await flushPromises();

			expect(wrapper?.classes()).toContain("room-grouped-overview--selecting");
		});
	});

	describe("round 6", () => {
		it("hides the bottom add row while the first-run line is shown", async () => {
			await setup({ ungroupedRoomIds: rooms.map((room) => room.id), groups: [] });

			expect(wrapper?.find("[data-testid='room-groups-onboarding']").exists()).toBe(true);
			expect(wrapper?.find("[data-testid='room-group-add']").exists()).toBe(false);
		});

		it("offers undo after moving a group via its menu", async () => {
			const { server } = await setup();

			sections()[1].vm.$emit("move-down");
			await flushPromises();
			expect(undoSnackbarText()).toContain("pages.rooms.groups.undo.groupMoved");

			await undoNotification()?.action?.handler();
			await flushPromises();

			expect(server.getState().groups.map((g) => g.id)).toEqual([groupA.id, groupB.id]);
		});
	});

	describe("persisted hint dismissal", () => {
		it("saves the dismissal as a preference and hides the hint at once", async () => {
			const { server } = await setup({ ungroupedRoomIds: rooms.map((room) => room.id), groups: [] });

			await wrapper?.get("[data-testid='room-groups-onboarding-dismiss']").trigger("click");

			expect(wrapper?.find("[data-testid='room-groups-onboarding']").exists()).toBe(false);
			await flushPromises();
			expect(arrangementApi.roomArrangementControllerUpdatePreferences).toHaveBeenCalledWith({
				expectedRevision: 5,
				groupingHintDismissed: true,
			});
			expect(server.getState().groupingHintDismissed).toBe(true);
		});

		it("shows the hint again when saving the dismissal fails", async () => {
			await setup({ ungroupedRoomIds: rooms.map((room) => room.id), groups: [] });
			arrangementApi.roomArrangementControllerUpdatePreferences.mockRejectedValue(
				new AxiosError("Forbidden", "ERR_BAD_REQUEST", undefined, undefined, {
					status: 403,
					statusText: "",
					headers: {},
					config: { headers: new AxiosHeaders() },
					data: { code: 403, type: "FORBIDDEN", title: "", message: "" },
				})
			);

			await wrapper?.get("[data-testid='room-groups-onboarding-dismiss']").trigger("click");
			await flushPromises();

			expect(wrapper?.find("[data-testid='room-groups-onboarding']").exists()).toBe(true);
		});

		it("does not show the hint when it was dismissed before", async () => {
			await setup({ ungroupedRoomIds: rooms.map((room) => room.id), groups: [], groupingHintDismissed: true });

			expect(wrapper?.find("[data-testid='room-groups-onboarding']").exists()).toBe(false);
			expect(wrapper?.find("[data-testid='room-group-add']").exists()).toBe(true);
		});
	});
});
