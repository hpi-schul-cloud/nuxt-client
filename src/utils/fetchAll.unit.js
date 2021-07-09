import {
	fetchAll,
	INVALID_URI_MESSAGE,
	isValidUri,
	paramsSerializer,
	isPaginated,
	cleanupQuery,
	requestHelper,
	isPositiveNumber,
} from "./fetchAll";

import fetchAllFromDefault from "./fetchAll";

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

const axiosHelperWithoutPagination = (data = ressources) => ({
	$get: async () => data,
});

const mockAxiosError = new Error();
mockAxiosError.response = {
	data: {
		error: "error",
		message: "error message",
		statusCode: 404,
	},
};

const axiosHelperThrowError = () => ({
	$get: async () => {
		throw mockAxiosError;
	},
});

describe("@utils/fetchAll", () => {
	describe("file exports works", () => {
		it("default export works", () => {
			expect(typeof fetchAllFromDefault).toBe("function");
		});

		it.each([
			["fetchAll", fetchAll],
			["isValidUri", isValidUri],
			["paramsSerializer", paramsSerializer],
			["isPaginated", isPaginated],
			["cleanupQuery", cleanupQuery],
			["requestHelper", requestHelper],
			["requestHelper", requestHelper],
			["isPositiveNumber", isPositiveNumber],
		])("%p sub export works", (name, func) => {
			expect(typeof func).toBe("function");
		});
	});

	describe("private helpers", () => {
		// requestHelper is tested with fetchAll

		it("INVALID_URI_MESSAGE constant should not be changed", () => {
			// TODO: globel defined error types and codes are missing
			expect(INVALID_URI_MESSAGE).toStrictEqual("Invalid uri input");
		});

		// TODO: only string at the moment
		it("isValidUri", () => {
			expect(isValidUri(123)).toBe(false);
			expect(isValidUri({ url: "http://localhost:3030/endpoint" })).toBe(false);
			expect(isValidUri("http://localhost:3030/endpoint")).toBe(false);
			expect(
				isValidUri("http://localhost:3030/endpoint?key1=123&key2=text")
			).toBe(false);

			expect(isValidUri("/endpoint")).toBe(true);
			expect(isValidUri("/endpoint?key=1&key=text")).toBe(true);
		});

		it("paramsSerializer", () => {
			expect(paramsSerializer()).toStrictEqual("");
			expect(paramsSerializer()).toStrictEqual("");

			const result = paramsSerializer({
				key1: 123,
				key2: "text",
				$key3: "text2",
				key3: { subKey1: 123, subKey2: "test" },
			});
			expect(result).toStrictEqual(
				"key1=123&key2=text&%24key3=text2&key3%5BsubKey1%5D=123&key3%5BsubKey2%5D=test"
			);
		});

		it("isPositiveNumber", () => {
			expect(isPositiveNumber()).toBe(false);
			expect(isPositiveNumber(null)).toBe(false);
			expect(isPositiveNumber("1")).toBe(false);
			expect(isPositiveNumber({})).toBe(false);
			expect(isPositiveNumber([])).toBe(false);
			expect(isPositiveNumber(-1)).toBe(false);

			expect(isPositiveNumber(0)).toBe(true);
			expect(isPositiveNumber(1)).toBe(true);
		});

		it("isPaginated", () => {
			expect(isPaginated()).toBe(false);
			expect(isPaginated(null)).toBe(false);
			expect(isPaginated([])).toBe(false);
			expect(isPaginated({ total: 0, data: [] })).toBe(false);
			expect(isPaginated({ total: 0, limit: -1, data: [] })).toBe(false);
			expect(isPaginated({ total: -1, limit: 0, data: [] })).toBe(false);
			expect(isPaginated({ total: "0", limit: 0, data: [] })).toBe(false);
			expect(isPaginated({ total: 0, limit: "0", data: [] })).toBe(false);
			expect(isPaginated({ total: 0, limit: "0", data: {} })).toBe(false);

			expect(isPaginated({ total: 0, limit: 0, data: [] })).toBe(true);
			expect(isPaginated({ total: 0, limit: 0, skip: 0, data: [] })).toBe(true);
		});

		it("cleanupQuery", () => {
			expect(cleanupQuery()).toStrictEqual({});
			expect(cleanupQuery(null)).toStrictEqual({});

			expect(cleanupQuery({})).toStrictEqual({});
			expect(cleanupQuery({ skip: 1 })).toStrictEqual({});
			expect(cleanupQuery({ limit: 1 })).toStrictEqual({});
			expect(cleanupQuery({ $skip: 1 })).toStrictEqual({});
			expect(cleanupQuery({ $limit: 1 })).toStrictEqual({});
			expect(cleanupQuery({ sort: 1 })).toStrictEqual({ sort: 1 });
		});
	});

	describe("fetchAll", () => {
		it("work for not paginated endpoints", async () => {
			const response = await fetchAll(axiosHelperWithoutPagination(), "/");
			expect(response).toHaveLength(10);
		});

		it("should throw error from server up to called instance", async () => {
			await expect(fetchAll(axiosHelperThrowError(), "/")).rejects.toThrow(
				mockAxiosError
			);
		});

		it("works for ressources that are lower than pagination total", async () => {
			const ressources2 = [{ id: 0 }, { id: 1 }];
			const response = await fetchAll(axiosHelper(ressources2), "/");
			expect(response).toStrictEqual(ressources2);
		});

		it("works for pagianted ressources that need multiple iterations to fetch all", async () => {
			const response = await fetchAll(axiosHelper(), "/");
			expect(response).toStrictEqual(ressources);
		});

		it("works without passing a query", async () => {
			const response = await fetchAll(axiosHelper(), "/");
			expect(response).toHaveLength(10);
		});

		it("throw error if invalid url or uri", async () => {
			await expect(fetchAll(axiosHelper(), 132)).rejects.toThrow(
				new Error(INVALID_URI_MESSAGE)
			);
		});
	});
});
