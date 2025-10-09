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

/**
 * Remove an element of an array. Its mutate the array with splice.
 * @param {Array} array - array that should modified
 * @param {*} value - value that should removed
 */
export const removeIdFromArray = (array, value) => {
	const index = array.indexOf(value);
	if (index !== -1) {
		array.splice(index, 1);
	}
	return array;
};

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

export const isCollectionHelper = (properties) => {
	const type = getMetadataAttribute(properties, "cclom:aggregationlevel");
	return type === "2";
};

export const getProvider = (properties) => getMetadataAttribute(properties, "ccm:metadatacontributer_provider");

export const getDescription = (description, properties) =>
	description || getMetadataAttribute(properties, "cclom:general_description");

export const getAuthor = (properties) => getMetadataAttribute(properties, "cm:creator");

export const getTags = (properties) => {
	const tags = properties["cclom:general_keyword"];
	return Array.isArray(tags) ? tags : [];
};

export const getTitle = (resource) => (resource.title ? resource.title : "");

export const getMediatype = (resource) => (resource.mediatype ? resource.mediatype : "");

export const getUrl = (resource) => {
	if (resource.properties && resource.properties["ccm:wwwurl"]) {
		return getMetadataAttribute(resource.properties, "ccm:wwwurl");
	}
	return null;
};

export const isVideoContent = (resource) =>
	resource.size && (resource.mediatype === "file-h5p" || resource.mediatype === "file-video");

export const isMerlinContent = (resource) =>
	resource.properties && getMetadataAttribute(resource.properties, "ccm:replicationsource").includes("merlin");

export const getMerlinReference = (resource) => {
	if (resource.properties && isMerlinContent(resource)) {
		return getMetadataAttribute(resource.properties, "ccm:replicationsourceid");
	}
	return "";
};

export const getID = (resource) => {
	if (resource.properties) {
		return getMetadataAttribute(resource.properties, "ccm:replicationsourceuuid");
	}
	return null;
};

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
