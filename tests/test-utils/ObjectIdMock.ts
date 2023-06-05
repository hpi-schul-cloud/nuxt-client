export const ObjectIdMock = () => {
	const charSet = "abcdefgh0123456789";
	let randomString = "";
	for (let i = 0; i < 24; i++) {
		const randomPoz = Math.floor(Math.random() * charSet.length);
		randomString += charSet.substring(randomPoz, randomPoz + 1);
	}
	return randomString;
};
