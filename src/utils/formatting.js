/**
 * @param  {} string
 * @returns string with the first char in uppercase
 */
export const upperCaseFirstChar = (string) =>
	string.charAt(0).toUpperCase() + string.slice(1);

/**
 * @param  {} string
 * @returns string formatted in kebap-case
 */
export const toKebabCase = (string) =>
	string
		.replace(/([\w])(?=[A-Z])/g, (m) => {
			return m[0] + "-";
		})
		.toLowerCase();

toKebabCase("camelCase");
