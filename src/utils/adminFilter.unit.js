import { studentFilter } from "./adminFilter";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // dependent on utc plugin
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

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
		it.todo("returns UTC date values for input values");

		it("returns filter default value if no input", () => {
			const expected_gte_date = dayjs.tz("1900-01-01").utc().format();
			const expected_lte_date = dayjs
				.tz("2099-12-31")
				.endOf("day")
				.utc()
				.format();

			const { createdAt } = MyGetFilterDateCreatedFromTo.parser.generator(
				FILTER_GROUP_CONFIG_MOCK,
				DATE_VALUES_MOCK_EMPTY
			);

			expect(createdAt.$gte).toBe(expected_gte_date);
			expect(createdAt.$lte).toBe(expected_lte_date);
		});
	});
});
