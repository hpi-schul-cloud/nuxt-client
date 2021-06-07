import qs from "qs";

export const INVALID_URI_MESSAGE = "Invalid uri input";

export const paramsSerializer = (params = {}) => qs.stringify(params);

export const cleanupQuery = (query = {}) => {
	if (query === null) {
		return {};
	}
	delete query.limit;
	delete query.skip;
	delete query.$limit;
	delete query.$skip;
	return query;
};

export const isPositiveNumber = (n) => typeof n === "number" && n >= 0;

export const isPaginated = (r = {}) =>
	r !== null &&
	isPositiveNumber(r.total) &&
	isPositiveNumber(r.limit) &&
	Array.isArray(r.data);

export const isValidUri = (uri) =>
	typeof uri === "string" && uri.charAt(0) === "/";

export const requestHelper = (axios, url) => async (query) =>
	axios.$get(url, {
		params: query,
		paramsSerializer,
	});

/**
 * Fetch all ressources from paginated endpoints and solve the pagination limits.
 * @param {AxiosInstance} axios - this.axios instance
 * @param {URI} uri - the uri of the endpoint /task /task/overview
 * @param {Object} query - a query as object, it cleanup all $skip, $limit, limit, skip
 * @returns {Array} - of ressources
 */
export const fetchAll = async (axios, uri, query = {}) => {
	if (!isValidUri(uri)) {
		throw new Error(INVALID_URI_MESSAGE);
	}
	const request = requestHelper(axios, uri);
	const internalQuery = cleanupQuery(query);

	const firstResponse = await request(internalQuery);
	if (!isPaginated(firstResponse)) {
		return firstResponse;
	}

	// use default limit
	const { total, limit, data } = firstResponse;
	let totalData = data;
	internalQuery.skip = 0;
	while (totalData.length < total) {
		internalQuery.skip += limit;
		// backward compatibility for feather-mongoose services
		internalQuery.$skip = internalQuery.skip;
		const response = await request(internalQuery);
		totalData = [...totalData, ...response.data];
	}

	return totalData;
};
export default fetchAll;
