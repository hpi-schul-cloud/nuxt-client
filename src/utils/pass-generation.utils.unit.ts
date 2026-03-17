import { generatePassword } from "./pass-generation.utils";

const words = [
	"auto",
	"baum",
	"bein",
	"blumen",
	"flocke",
	"frosch",
	"halsband",
	"hand",
	"haus",
	"herr",
	"horn",
	"kind",
	"kleid",
	"kobra",
	"komet",
	"konzert",
	"kopf",
	"kugel",
	"puppe",
	"rauch",
	"raupe",
	"regenbogen",
	"schuh",
	"seele",
	"spatz",
	"taktisch",
	"traum",
	"trommel",
	"wolke",
];

describe("pass-generation.utils", () => {
	describe("generatePassword", () => {
		it("should return a string", () => {
			const password = generatePassword();
			expect(typeof password).toBe("string");
		});

		it("should return a password that starts with a word from the word list", () => {
			const password = generatePassword();

			const startsWithWord = words.some((word) => password.startsWith(word));
			expect(startsWithWord).toBe(true);
		});

		it("should return a password in format word + number", () => {
			const password = generatePassword();

			const matchingWord = words.find((word) => password.startsWith(word));
			expect(matchingWord).toBeDefined();

			const remainder = password.slice(matchingWord!.length);
			expect(remainder).toMatch(/^\d+$/);
		});
	});
});
