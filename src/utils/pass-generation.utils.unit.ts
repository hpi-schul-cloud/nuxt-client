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

		it("should return a password that ends with a number", () => {
			const password = generatePassword();

			const numberMatch = password.match(/\d+$/);
			expect(numberMatch).not.toBeNull();
		});

		it("should return a password with number between 1 and 9999", () => {
			const password = generatePassword();

			const numberMatch = password.match(/\d+$/);
			const number = parseInt(numberMatch![0], 10);

			expect(number).toBeGreaterThanOrEqual(1);
			expect(number).toBeLessThanOrEqual(9999);
		});

		it("should return a password in format word + number", () => {
			const password = generatePassword();

			const wordPattern = words.join("|");
			const regex = new RegExp(`^(${wordPattern})\\d+$`);
			expect(password).toMatch(regex);
		});

		it("should generate different passwords on multiple calls", () => {
			const passwords = new Set<string>();

			for (let i = 0; i < 20; i++) {
				passwords.add(generatePassword());
			}

			expect(passwords.size).toBeGreaterThan(1);
		});

		describe("when crypto.getRandomValues is mocked", () => {
			it("should use specific word and number based on mocked values", () => {
				const mockGetRandomValues = vi.spyOn(crypto, "getRandomValues").mockImplementation((array) => {
					if (array instanceof Uint32Array) {
						array[0] = 0;
					}
					return array;
				});

				const password = generatePassword();
				expect(password).toBe("auto1");
				mockGetRandomValues.mockRestore();
			});

			it("should use last word when mocked index equals words length - 1", () => {
				let callCount = 0;
				const mockGetRandomValues = vi.spyOn(crypto, "getRandomValues").mockImplementation((array) => {
					if (array instanceof Uint32Array) {
						if (callCount === 0) {
							array[0] = words.length - 1;
						} else {
							array[0] = 999;
						}
						callCount++;
					}
					return array;
				});

				const password = generatePassword();
				expect(password).toBe("wolke1000");
				mockGetRandomValues.mockRestore();
			});
		});
	});
});
