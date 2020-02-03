/**
 * Get value of an object property/path even if it's nested
 * @param {object} obj The Object to extract data from
 * @param {string} path The path to the data, seperated by "." (e.g. "key1.key2")
 * @return The value of the object at obj[key1][key2] ...
 */
export function getValueByPath(obj, path) {
	const value = path.split(".").reduce((o, i) => o[i], obj);
	return value;
}

/**
 * Get all property values of an object property even if it's nested
 */
export function getNestedObjectValues(obj) {
	return Object.values(obj).map((value) => {
		if (typeof value === "object") {
			return getNestedObjectValues(value);
		}
		return value;
	});
}

/**
 * Extension of indexOf method by equality function if specified
 */
export function indexOf(array, obj, fn) {
	if (!array) return -1;

	if (!fn || typeof fn !== "function") return array.indexOf(obj);

	for (let i = 0; i < array.length; i++) {
		if (fn(array[i], obj)) {
			return i;
		}
	}

	return -1;
}
