import { studentFilter } from "./adminFilter";

const CTX_MOCK = {
	$t: (i18nMockKey) => {
		return i18nMockKey;
	},
};

const MyStudentFilter = studentFilter(CTX_MOCK);
const MyGetFilterDateCreatedFromTo = MyStudentFilter[2];

const DATE_VALUES_MOCK_EMPTY = {
	"input-2-0": "",
	"input-2-1": "",
};
const FILTER_GROUP_CONFIG_MOCK = {
	filter: [
		{
			id: "input-2-0",
		},
		{
			id: "input-2-1",
		},
	],
};
describe("@utils/adminFilter", () => {
	describe("getFilterDateCreatedFromTo", () => {
		it.todo("returns UTC date values for empty input values");

		it("returns filter default value if no input", () => {
			const { createdAt } = MyGetFilterDateCreatedFromTo.parser.generator(
				FILTER_GROUP_CONFIG_MOCK,
				DATE_VALUES_MOCK_EMPTY
			);

			expect(createdAt.$gte).toBe("1899-12-31T23:00:00Z");
			expect(createdAt.$lte).toBe("2099-12-31T22:59:59Z");
		});
	});
});
