import { fetchAll } from "./fetchAll";

const ressources = [
	{ id: 0 },
	{ id: 1 },
	{ id: 2 },
	{ id: 3 },
	{ id: 4 },
	{ id: 5 },
	{ id: 6 },
	{ id: 7 },
	{ id: 8 },
	{ id: 9 },
];

const axiosHelper = (data = ressources) => ({
	$get: async (url, { params }) => {
		// paramsSerializer as second input
		const { skip = 0 } = params;
		const limit = 3;
		return {
			limit,
			total: data.length,
			data: data.slice(skip, skip + limit),
			skip,
		};
	},
});

describe("@utils/fetchAll", () => {
	/* it("work for not paginated endpoints", async () => {
		const response = await fetchAll(axiosHelper(), "");
	}); */

	// should throw error from server up to called instance

	it("return paginated result", async () => {
		const response = await fetchAll(axiosHelper(), "");
		expect(response).toHaveProperty("total");
		expect(response).toHaveProperty("data");
		expect(response).toHaveProperty("skip");
		expect(response).toHaveProperty("limit");
	});

	it("works for ressources that are lower then pagination total", async () => {
		const ressources2 = [{ id: 0 }, { id: 1 }];
		const response = await fetchAll(axiosHelper(ressources2), "");
		expect(response.data).toHaveLength(2);
	});

	it("works for pagianted ressources that are need multiple iterations to fetch all", async () => {
		const response = await fetchAll(axiosHelper(), "");
		expect(response.data).toHaveLength(10);
	});
	// serialize query

	// cleanup incomming query from skip and total

	// let pass additional query parameter that are not skip and total

	// work without passing query

	// validate url input
});
