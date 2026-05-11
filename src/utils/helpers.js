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
 * Returns the value of the property by key
 * @param {*} properties - properties
 * @param {String} key - key of the propertie
 * @returns The value of the propertie or null
 */
export const getMetadataAttribute = (properties, key) => {
	if (Array.isArray(properties[key])) {
		return properties[key][0];
	}
	return null;
};

export const getUrl = (resource) => {
	if (resource.properties && resource.properties["ccm:wwwurl"]) {
		return getMetadataAttribute(resource.properties, "ccm:wwwurl");
	}
	return null;
};

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
