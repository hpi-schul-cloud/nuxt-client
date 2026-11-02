import { filterRoomsByName } from "./roomSearch";

describe("filterRoomsByName", () => {
	const rooms = [{ name: "Biologie 6a" }, { name: "Ökologie AG" }, { name: "Mathematik 7b" }, { name: "AG Biologie" }];

	it("keeps the rooms whose name contains the query", () => {
		expect(filterRoomsByName(rooms, "Mathe")).toEqual([{ name: "Mathematik 7b" }]);
	});

	it("ignores upper and lower case", () => {
		expect(filterRoomsByName(rooms, "mathematik")).toEqual([{ name: "Mathematik 7b" }]);
	});

	it("ignores umlauts", () => {
		expect(filterRoomsByName(rooms, "okologie")).toEqual([{ name: "Ökologie AG" }]);
	});

	it("ignores umlauts in the query", () => {
		expect(filterRoomsByName([{ name: "Okologie AG" }], "Öko")).toEqual([{ name: "Okologie AG" }]);
	});

	it("ignores spaces around the query", () => {
		expect(filterRoomsByName(rooms, "  Mathe  ")).toEqual([{ name: "Mathematik 7b" }]);
	});

	it("keeps the original order of the rooms", () => {
		expect(filterRoomsByName(rooms, "Biologie")).toEqual([{ name: "Biologie 6a" }, { name: "AG Biologie" }]);
	});

	it("returns every room for an empty query", () => {
		expect(filterRoomsByName(rooms, "   ")).toEqual(rooms);
	});

	it("returns nothing when no name matches", () => {
		expect(filterRoomsByName(rooms, "Chemie")).toEqual([]);
	});
});
