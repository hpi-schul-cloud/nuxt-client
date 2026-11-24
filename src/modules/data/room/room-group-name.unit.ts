import { countRoomGroupNameLength, RoomGroupNameValidationResult, validateRoomGroupName } from "./room-group-name";

describe("room-group-name", () => {
	describe("validateRoomGroupName (shared contract fixtures)", () => {
		const existing = [{ id: "group-informatik", name: "Informatik" }];

		const cases: { input: string; expected: RoomGroupNameValidationResult }[] = [
			{ input: "Informatik", expected: { valid: true, normalized: "Informatik" } },
			{ input: "  Deutsch  ", expected: { valid: true, normalized: "Deutsch" } },
			{ input: "Mathe  6a", expected: { valid: true, normalized: "Mathe  6a" } },
			{ input: "Café", expected: { valid: true, normalized: "Café" } },
			{ input: "", expected: { valid: false, reason: "REQUIRED" } },
			{ input: "   \t ", expected: { valid: false, reason: "REQUIRED" } },
			{ input: "a".repeat(100), expected: { valid: true, normalized: "a".repeat(100) } },
			{ input: "a".repeat(101), expected: { valid: false, reason: "TOO_LONG" } },
			{ input: "😀".repeat(100), expected: { valid: true, normalized: "😀".repeat(100) } },
			{ input: "😀".repeat(101), expected: { valid: false, reason: "TOO_LONG" } },
			{ input: "Mathe\n6a", expected: { valid: false, reason: "INVALID_CHARACTERS" } },
			{ input: "Mathe\u0000", expected: { valid: false, reason: "INVALID_CHARACTERS" } },
			{ input: "informatik", expected: { valid: false, reason: "DUPLICATE" } },
			{ input: " INFORMATIK ", expected: { valid: false, reason: "DUPLICATE" } },
		];

		it.each(cases)("validates $input", ({ input, expected }) => {
			expect(validateRoomGroupName(input, input === "Informatik" ? [] : existing)).toEqual(expected);
		});

		it("accepts the precomposed form of Café with a length of 4", () => {
			expect(validateRoomGroupName("Café")).toEqual({ valid: true, normalized: "Café" });
			expect(countRoomGroupNameLength("Café")).toBe(4);
		});

		it("allows renaming a group to a different case of its own name", () => {
			expect(validateRoomGroupName("informatik", existing, "group-informatik")).toEqual({
				valid: true,
				normalized: "informatik",
			});
		});

		it("rejects line and paragraph separators", () => {
			expect(validateRoomGroupName("a b")).toEqual({ valid: false, reason: "INVALID_CHARACTERS" });
			expect(validateRoomGroupName("a b")).toEqual({ valid: false, reason: "INVALID_CHARACTERS" });
		});
	});

	describe("countRoomGroupNameLength", () => {
		it("counts code points of the normalized name", () => {
			expect(countRoomGroupNameLength("  😀😀 ")).toBe(2);
		});
	});
});
