import { applyRoomsMove, findRoomSection, getRestorePlacements } from "./room-arrangement-undo";
import { roomArrangementResponseFactory } from "@@/tests/test-utils";

describe("room-arrangement-undo", () => {
	const arrangement = () =>
		roomArrangementResponseFactory.build({
			ungroupedRoomIds: ["r1", "r2", "r3"],
			groups: [
				{ id: "g1", name: "A", collapsed: false, roomIds: ["r4", "r5"] },
				{ id: "g2", name: "B", collapsed: false, roomIds: [] },
			],
		});

	describe("getRestorePlacements", () => {
		it("returns the original neighbour of a single room", () => {
			expect(getRestorePlacements(arrangement(), ["r4"])).toEqual([
				{ roomId: "r4", groupId: "g1", beforeRoomId: "r5" },
			]);
		});

		it("processes each section from its end so moved neighbours are restored first", () => {
			expect(getRestorePlacements(arrangement(), ["r1", "r2", "r5"])).toEqual([
				{ roomId: "r2", groupId: null, beforeRoomId: "r3" },
				{ roomId: "r1", groupId: null, beforeRoomId: "r2" },
				{ roomId: "r5", groupId: "g1", beforeRoomId: null },
			]);
		});
	});

	describe("applyRoomsMove", () => {
		it("removes the rooms everywhere and appends them to the target in the given order", () => {
			const state = arrangement();
			applyRoomsMove(state, ["r5", "r1"], "g2");

			expect(state.ungroupedRoomIds).toEqual(["r2", "r3"]);
			expect(state.groups[0].roomIds).toEqual(["r4"]);
			expect(state.groups[1].roomIds).toEqual(["r5", "r1"]);
		});

		it("moves rooms already in the target to its end", () => {
			const state = arrangement();
			applyRoomsMove(state, ["r1"], null);

			expect(state.ungroupedRoomIds).toEqual(["r2", "r3", "r1"]);
		});

		it("ignores an unknown target", () => {
			const state = arrangement();
			applyRoomsMove(state, ["r1"], "missing");

			expect(state).toEqual(arrangement());
		});
	});

	describe("findRoomSection", () => {
		it("finds grouped, ungrouped and unknown rooms", () => {
			expect(findRoomSection(arrangement(), "r4")).toEqual({ groupId: "g1" });
			expect(findRoomSection(arrangement(), "r2")).toEqual({ groupId: null });
			expect(findRoomSection(arrangement(), "x")).toBeUndefined();
		});
	});
});
