export default function generatePassword() {
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
	return (
		words[Math.floor(Math.random() * words.length)] +
		Math.floor(Math.random() * 9998 + 1).toString()
	);
}
