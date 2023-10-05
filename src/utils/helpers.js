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

export const getProvider = (properties) => {
	return getMetadataAttribute(properties, "ccm:metadatacontributer_provider");
};

export const getDescription = (description, properties) => {
	return (
		description || getMetadataAttribute(properties, "cclom:general_description")
	);
};

export const getAuthor = (properties) => {
	return getMetadataAttribute(properties, "cm:creator");
};

export const getTags = (properties) => {
	const tags = properties["cclom:general_keyword"];
	return Array.isArray(tags) ? tags : [];
};

export const getTitle = (resource) => {
	return resource.title ? resource.title : "";
};

export const getMediatype = (resource) => {
	return resource.mediatype ? resource.mediatype : "";
};

export const getUrl = (resource) => {
	if (resource.properties && resource.properties["ccm:wwwurl"]) {
		return getMetadataAttribute(resource.properties, "ccm:wwwurl");
	}
	return null;
};

export const isVideoContent = (resource) => {
	return (
		resource.size &&
		(resource.mediatype === "file-h5p" || resource.mediatype === "file-video")
	);
};

export const isMerlinContent = (resource) => {
	return (
		resource.properties &&
		getMetadataAttribute(resource.properties, "ccm:replicationsource").includes(
			"merlin"
		)
	);
};

export const getMerlinReference = (resource) => {
	if (resource.properties && isMerlinContent(resource)) {
		return getMetadataAttribute(resource.properties, "ccm:replicationsourceid");
	}
	return "";
};

export const getID = (resource) => {
	if (resource.properties) {
		return getMetadataAttribute(
			resource.properties,
			"ccm:replicationsourceuuid"
		);
	}
	return null;
};

export const delay = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

// Mobile detection based on : https://github.com/ajerez/vue-mobile-detection
export function detectMobile() {
	/* eslint-disable */
	var check = false;
	(function (a) {
		if (
			/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
				a
			) ||
			/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
				a.substr(0, 4)
			)
		)
			check = true;
	})(navigator.userAgent || navigator.vendor || window.opera);
	return check;
}
