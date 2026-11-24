import {
	findRoomSectionKey,
	rememberDomPosition,
	restoreDomPosition,
	toRoomDrop,
	toRoomMoveCommand,
	UNGROUPED_SECTION_KEY,
} from "./room-arrangement-drop";
import { roomItemFactory } from "@@/tests/test-utils";
import { RoomArrangementView } from "@data-room";
import { SortableEvent } from "sortablejs";

describe("room-arrangement-drop", () => {
	const [r1, r2, r3, r4, r5] = roomItemFactory.buildList(5);
	const view: RoomArrangementView = {
		ungrouped: [r1, r2],
		groups: [
			{ id: "group-a", name: "A", collapsed: false, rooms: [r3, r4, r5] },
			{ id: "group-b", name: "B", collapsed: false, rooms: [] },
		],
	};

	describe("toRoomMoveCommand", () => {
		it("reorders within a section using the room behind the new position as anchor", () => {
			expect(
				toRoomMoveCommand(view, { roomId: r3.id, fromKey: "group-a", toKey: "group-a", oldIndex: 0, newIndex: 1 })
			).toEqual({ roomId: r3.id, sourceGroupId: "group-a", targetGroupId: "group-a", beforeRoomId: r5.id });
		});

		it("appends when a room is moved to the end of its section", () => {
			expect(
				toRoomMoveCommand(view, { roomId: r3.id, fromKey: "group-a", toKey: "group-a", oldIndex: 0, newIndex: 2 })
			).toEqual(expect.objectContaining({ beforeRoomId: null }));
		});

		it("moves a room to the front of its section", () => {
			expect(
				toRoomMoveCommand(view, { roomId: r5.id, fromKey: "group-a", toKey: "group-a", oldIndex: 2, newIndex: 0 })
			).toEqual(expect.objectContaining({ beforeRoomId: r3.id }));
		});

		it("moves an ungrouped room into a group before the room at the drop position", () => {
			expect(
				toRoomMoveCommand(view, {
					roomId: r1.id,
					fromKey: UNGROUPED_SECTION_KEY,
					toKey: "group-a",
					oldIndex: 0,
					newIndex: 1,
				})
			).toEqual({ roomId: r1.id, sourceGroupId: null, targetGroupId: "group-a", beforeRoomId: r4.id });
		});

		it("moves a room into an empty group", () => {
			expect(
				toRoomMoveCommand(view, { roomId: r4.id, fromKey: "group-a", toKey: "group-b", oldIndex: 1, newIndex: 0 })
			).toEqual({ roomId: r4.id, sourceGroupId: "group-a", targetGroupId: "group-b", beforeRoomId: null });
		});

		it("moves a room back to the ungrouped section", () => {
			expect(
				toRoomMoveCommand(view, {
					roomId: r4.id,
					fromKey: "group-a",
					toKey: UNGROUPED_SECTION_KEY,
					oldIndex: 1,
					newIndex: 0,
				})
			).toEqual({ roomId: r4.id, sourceGroupId: "group-a", targetGroupId: null, beforeRoomId: r1.id });
		});

		it("appends when dropped onto a collapsed group", () => {
			expect(
				toRoomMoveCommand(view, {
					roomId: r1.id,
					fromKey: UNGROUPED_SECTION_KEY,
					toKey: "group-a",
					oldIndex: 0,
					newIndex: 0,
					appendOnly: true,
				})
			).toEqual(expect.objectContaining({ targetGroupId: "group-a", beforeRoomId: null }));
		});

		it("returns nothing for a drop at the original position", () => {
			expect(
				toRoomMoveCommand(view, { roomId: r3.id, fromKey: "group-a", toKey: "group-a", oldIndex: 1, newIndex: 1 })
			).toBeUndefined();
		});

		it("returns nothing for unknown sections or rooms", () => {
			expect(
				toRoomMoveCommand(view, { roomId: r3.id, fromKey: "group-a", toKey: "missing", oldIndex: 0, newIndex: 0 })
			).toBeUndefined();
			expect(
				toRoomMoveCommand(view, { roomId: r1.id, fromKey: "group-a", toKey: "group-b", oldIndex: 0, newIndex: 0 })
			).toBeUndefined();
		});
	});

	describe("toRoomDrop", () => {
		const container = (key: string, appendOnly = false) => {
			const element = document.createElement("div");
			element.dataset.sectionKey = key;
			if (appendOnly) element.dataset.appendOnly = "true";
			return element;
		};

		it("reads stable ids from the DOM elements of the event", () => {
			const item = document.createElement("div");
			item.dataset.roomId = r1.id;
			const event = {
				item,
				from: container(UNGROUPED_SECTION_KEY),
				to: container("group-a", true),
				oldIndex: 0,
				newIndex: 0,
			} as unknown as SortableEvent;

			expect(toRoomDrop(event)).toEqual({
				roomId: r1.id,
				fromKey: UNGROUPED_SECTION_KEY,
				toKey: "group-a",
				oldIndex: 0,
				newIndex: 0,
				appendOnly: true,
			});
		});

		it("ignores cancelled drops without indices", () => {
			const item = document.createElement("div");
			item.dataset.roomId = r1.id;
			const event = { item, from: container("a"), to: container("a") } as unknown as SortableEvent;

			expect(toRoomDrop(event)).toBeUndefined();
		});
	});

	describe("restoreDomPosition", () => {
		it("puts an element moved by SortableJS back to its original place", () => {
			const source = document.createElement("div");
			const target = document.createElement("div");
			const [a, b, c] = ["a", "b", "c"].map((id) => {
				const element = document.createElement("span");
				element.id = id;
				return element;
			});
			source.append(a, b, c);
			const origin = rememberDomPosition(b);

			target.append(b);
			restoreDomPosition(b, origin);

			expect([...source.children].map((element) => element.id)).toEqual(["a", "b", "c"]);
			expect(target.children).toHaveLength(0);
		});
	});

	describe("findRoomSectionKey", () => {
		it("finds the section of a room", () => {
			expect(findRoomSectionKey(view, r1.id)).toBe(UNGROUPED_SECTION_KEY);
			expect(findRoomSectionKey(view, r5.id)).toBe("group-a");
			expect(findRoomSectionKey(view, "unknown")).toBeUndefined();
		});
	});
});
