export const words: readonly string[] = [
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

const getRandomInt = (max: number) => {
	const array = new Uint32Array(1);
	crypto.getRandomValues(array);
	return array[0] % max;
};

export const generatePassword = (): string => {
	const wordIndex = getRandomInt(words.length);
	const number = getRandomInt(9998) + 1;

	return words[wordIndex] + number.toString();
};
