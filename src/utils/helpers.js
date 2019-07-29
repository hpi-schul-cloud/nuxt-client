/**
 * Get value of an object property/path even if it's nested
 */
export function getValueByPath(obj, path) {
	const value = path.split(".").reduce((o, i) => o[i], obj);
	return value;
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
