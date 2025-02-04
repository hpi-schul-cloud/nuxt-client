export const containsOpeningTagFollowedByString = (input: string): boolean => {
	const regex = /<\S+/;
	const result = regex.test(input);

	return result;
};
