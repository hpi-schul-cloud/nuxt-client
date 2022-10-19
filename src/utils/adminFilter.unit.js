import { studentFilter } from "./adminFilter";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // dependent on utc plugin
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import customParseFormat from "dayjs/plugin/customParseFormat";
import setupStores from "@@/tests/test-utils/setupStores";
import AuthModule from "@/store/auth";
import SchoolsModule from "@/store/schools";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

const CTX_MOCK = {
	$t: (i18nMockKey) => {
		return i18nMockKey;
	},
	$store: {
		dispatch: jest.fn(),
		state: {
			classes: { list: [] },
		},
	},
};

setupStores({ auth: AuthModule, schools: SchoolsModule });

const filter = studentFilter(CTX_MOCK);
const filterDateCreatedFromTo = filter[2];

const MOCK_DATA = {
	filterGroupConfig: {
		filter: [{ id: "input-2-0" }, { id: "input-2-1" }],
	},
	emptyDates: {
		"input-2-0": "",
		"input-2-1": "",
	},
	dateValues: {
		"input-2-0": "2021-04-01",
		"input-2-1": "2021-05-01",
	},
	firstDateEmpty: {
		"input-2-0": "",
		"input-2-1": "2021-03-01",
	},
	secondDateEmpty: {
		"input-2-0": "2021-02-01",
		"input-2-1": "",
	},
};

describe("@/utils/adminFilter", () => {
	describe("getFilterDateCreatedFromTo", () => {
		it("returns UTC date values for input values", () => {
			const expected_gte_date = dayjs.tz("2021-04-01").utc().format();
			const expected_lte_date = dayjs
				.tz("2021-05-01")
				.endOf("day")
				.utc()
				.format();

			const { createdAt } = filterDateCreatedFromTo.parser.generator(
				MOCK_DATA.filterGroupConfig,
				MOCK_DATA.dateValues
			);

			expect(createdAt.$gte).toBe(expected_gte_date);
			expect(createdAt.$lte).toBe(expected_lte_date);
		});

		it("returns filter default value if no input", () => {
			const expected_gte_date = dayjs.tz("1900-01-01").utc().format();
			const expected_lte_date = dayjs
				.tz("2099-12-31")
				.endOf("day")
				.utc()
				.format();

			const { createdAt } = filterDateCreatedFromTo.parser.generator(
				MOCK_DATA.filterGroupConfig,
				MOCK_DATA.emptyDates
			);

			expect(createdAt.$gte).toBe(expected_gte_date);
			expect(createdAt.$lte).toBe(expected_lte_date);
		});

		it("returns filter second date value is empty", () => {
			const expected_gte_date = dayjs.tz("2021-02-01").utc().format();
			const expected_lte_date = dayjs
				.tz("2099-12-31")
				.endOf("day")
				.utc()
				.format();

			const { createdAt } = filterDateCreatedFromTo.parser.generator(
				MOCK_DATA.filterGroupConfig,
				MOCK_DATA.secondDateEmpty
			);

			expect(createdAt.$gte).toBe(expected_gte_date);
			expect(createdAt.$lte).toBe(expected_lte_date);
		});

		it("returns filter first date value is empty", () => {
			const expected_gte_date = dayjs.tz("1900-01-01").utc().format();
			const expected_lte_date = dayjs
				.tz("2021-03-01")
				.endOf("day")
				.utc()
				.format();

			const { createdAt } = filterDateCreatedFromTo.parser.generator(
				MOCK_DATA.filterGroupConfig,
				MOCK_DATA.firstDateEmpty
			);

			expect(createdAt.$gte).toBe(expected_gte_date);
			expect(createdAt.$lte).toBe(expected_lte_date);
		});
	});
});
