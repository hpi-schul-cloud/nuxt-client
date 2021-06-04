const requestHelper = (axios, url) => async (query) => {
	return axios.$get(url, {
		params: query,
		paramsSerializer: (params) => {
			return qs.stringify(params);
		},
	});
};

const cleanupQuery = (query = {}) => {
	delete query.$limit;
	delete query.$skip;
	return query;
};

const isPaginated = (response) => {
	return response.total && response.limit && Array.isArray(response.data);
};

// TODO: test at url or uri
const validUrl = (url) => {
	return typeof url === "string";
};

export async function fetchAll(axios, url, query = {}) {
	if (!validUrl) {
		throw new Error("Invalid url or uri input");
	}
	const request = requestHelper(axios, url);
	const cleanQuery = cleanupQuery(query);

	const firstResponse = await request(cleanQuery);
	if (!isPaginated(firstResponse)) {
		return firstResponse;
	}

	const { total, limit, data } = firstResponse;
	const totalData = [...data];

	for (let skip = totalData.length; skip + limit < total; skip += limit) {
		cleanQuery.skip = skip;
		const response = await request(cleanQuery);
		totalData = [...totalData, ...response.data];
	}

	return {
		data: totalData,
		total,
		skip: 0,
		limit,
	};
}
