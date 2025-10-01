import { FilterOption, Registration, UpdateFilterParamType } from "../types";
import { useDataTableFilter } from "./filter.composable";
import { mountComposable } from "@@/tests/test-utils";

vi.mock("@vueuse/core", async (importOriginal) => {
	const defaultState = {
		pagination: {},
		filter: {
			"pages.administration.students.index": {
				query: {},
			},
			"pages.administration.teachers.index": {
				query: {},
			},
		},
		sorting: {},
		version: 1,
	};

	const actual = await importOriginal<typeof import("@vueuse/core")>();
	return {
		...actual,
		useStorage: vi.fn().mockReturnValue({ value: defaultState }),
	};
});

vi.mock("vue-i18n", () => ({
	useI18n: vi.fn().mockReturnValue({ t: (key: string) => key }),
}));

const setup = (userType: string) => mountComposable(() => useDataTableFilter(userType));

const removeAllFilters = () => {
	const { removeFilter, selectedFilterType, filterQuery } = setup("student");
	selectedFilterType.value = FilterOption.LAST_MIGRATION_ON;
	removeFilter();
	selectedFilterType.value = FilterOption.REGISTRATION;
	removeFilter();
	selectedFilterType.value = FilterOption.CLASSES;
	removeFilter();
	selectedFilterType.value = FilterOption.CREATION_DATE;
	removeFilter();
	selectedFilterType.value = FilterOption.OBSOLOTE_SINCE;
	removeFilter();
	filterQuery.value = {};
};

describe("filter composable", () => {
	it("should return filterQuery", () => {
		const { filterQuery } = setup("student");

		expect(filterQuery.value).toEqual({});
	});

	it("should return defaultFilterMenuItems", () => {
		const { defaultFilterMenuItems } = setup("student");

		expect(defaultFilterMenuItems.length).toEqual(5);
		expect(defaultFilterMenuItems[0].value).toEqual(FilterOption.REGISTRATION);
		expect(defaultFilterMenuItems[1].value).toEqual(FilterOption.CLASSES);
		expect(defaultFilterMenuItems[2].value).toEqual(FilterOption.CREATION_DATE);
		expect(defaultFilterMenuItems[3].value).toEqual(FilterOption.LAST_MIGRATION_ON);
		expect(defaultFilterMenuItems[4].value).toEqual(FilterOption.OBSOLOTE_SINCE);
	});

	it("should return user based registrationOptions", () => {
		const { registrationOptions } = setup("student");
		const { student, teacher } = registrationOptions;

		expect(1 == 1).toEqual(true);

		expect(student.length).toEqual(3);
		expect(teacher.length).toEqual(2);

		expect(student[0].value).toEqual(Registration.COMPLETE);
		expect(student[1].value).toEqual(Registration.PARENT_AGREED);
		expect(student[2].value).toEqual(Registration.MISSING);

		expect(teacher[0].value).toEqual(Registration.COMPLETE);
		expect(teacher[1].value).toEqual(Registration.MISSING);
	});

	describe("selectedFilterType", () => {
		it("should return correct selectedFilterType", () => {
			const { selectedFilterType } = setup("student");

			expect(selectedFilterType.value).toEqual(undefined);
		});

		it("should return 'isDateFiltering' value to be true", () => {
			const { selectedFilterType, isDateFiltering, isSelectFiltering } = setup("student");
			selectedFilterType.value = FilterOption.CREATION_DATE;

			expect(isDateFiltering.value).toBe(true);
			expect(isSelectFiltering.value).toBe(false);
		});

		it("should return 'isSelectFiltering' value to be true", () => {
			const { selectedFilterType, isDateFiltering, isSelectFiltering } = setup("student");
			selectedFilterType.value = FilterOption.CLASSES;

			expect(isSelectFiltering.value).toBe(true);
			expect(isDateFiltering.value).toBe(false);
		});
	});

	describe("filterMenuItems", () => {
		it("should return default filterMenuItems", () => {
			const { filterMenuItems } = setup("teacher");

			expect(filterMenuItems.value.length).toEqual(5);
			expect(filterMenuItems.value[0].value).toEqual(FilterOption.REGISTRATION);
			expect(filterMenuItems.value[1].value).toEqual(FilterOption.CLASSES);
			expect(filterMenuItems.value[2].value).toEqual(FilterOption.CREATION_DATE);
			expect(filterMenuItems.value[3].value).toEqual(FilterOption.LAST_MIGRATION_ON);
			expect(filterMenuItems.value[4].value).toEqual(FilterOption.OBSOLOTE_SINCE);
		});

		it("should should return the filtered menu items after selection", () => {
			const { filterMenuItems, selectedFilterType, updateFilter } = setup("student");
			selectedFilterType.value = FilterOption.CLASSES;
			updateFilter(["1A"] as UpdateFilterParamType);

			expect(filterMenuItems.value.length).toEqual(4);

			const found = filterMenuItems.value.find((item) => item.value == FilterOption.CLASSES);
			expect(found).toBeUndefined();
		});
	});

	describe("removeFilter", () => {
		beforeEach(() => {
			removeAllFilters();
		});
		it("should remove filter from filterQuery", () => {
			const { filterQuery, removeFilter, selectedFilterType } = setup("student");

			const filters = {
				[FilterOption.CREATION_DATE]: {
					$gte: "2024-01-09T12:21:24.655Z",
					$lte: "2024-01-30T23:00:00.000Z",
				},
				[FilterOption.CLASSES]: ["1A"],
			};

			filterQuery.value = filters;
			selectedFilterType.value = FilterOption.CREATION_DATE;

			removeFilter();

			expect(filterQuery.value).toEqual({ [FilterOption.CLASSES]: ["1A"] });
		});
	});

	describe("setFilterChipTitles", () => {
		it("should set filter chip titles", () => {
			const { filterChipTitles, filterQuery, updateFilter, selectedFilterType } = setup("teacher");

			const filters = {
				[FilterOption.CREATION_DATE]: {
					$gte: "2024-01-09T12:21:24.655Z",
					$lte: "2024-01-30T23:00:00.000Z",
				},
				[FilterOption.CLASSES]: ["1A"],
				[FilterOption.REGISTRATION]: ["ok"],
				[FilterOption.LAST_MIGRATION_ON]: {
					$gte: "2024-01-09T13:07:08.771Z",
					$lte: "2024-01-29T23:00:00.000Z",
				},
				[FilterOption.OBSOLOTE_SINCE]: {
					$gte: "2024-01-09T13:07:19.885Z",
					$lte: "2024-01-21T23:00:00.000Z",
				},
			};

			filterQuery.value = filters;

			selectedFilterType.value = FilterOption.CLASSES;
			updateFilter(filters[FilterOption.CLASSES] as UpdateFilterParamType);

			selectedFilterType.value = FilterOption.CREATION_DATE;
			updateFilter(filters[FilterOption.CREATION_DATE] as UpdateFilterParamType);

			selectedFilterType.value = FilterOption.REGISTRATION;
			updateFilter(filters[FilterOption.REGISTRATION] as UpdateFilterParamType);

			selectedFilterType.value = FilterOption.LAST_MIGRATION_ON;
			updateFilter(filters[FilterOption.LAST_MIGRATION_ON] as UpdateFilterParamType);

			selectedFilterType.value = FilterOption.OBSOLOTE_SINCE;
			updateFilter(filters[FilterOption.OBSOLOTE_SINCE] as UpdateFilterParamType);

			expect(filterChipTitles.value.length).toEqual(5);
			expect(filterChipTitles.value[0].item).toEqual(FilterOption.CREATION_DATE);
			expect(filterChipTitles.value[0].title).toEqual(
				"utils.adminFilter.date.created 09.01.2024 common.words.and 30.01.2024"
			);

			expect(filterChipTitles.value[1].item).toEqual(FilterOption.CLASSES);
			expect(filterChipTitles.value[1].title).toEqual("utils.adminFilter.class.title = 1A");
			expect(filterChipTitles.value[2].item).toEqual(FilterOption.REGISTRATION);
			expect(filterChipTitles.value[2].title).toEqual("pages.administration.students.legend.icon.success");

			expect(filterChipTitles.value[3].item).toEqual(FilterOption.LAST_MIGRATION_ON);
			expect(filterChipTitles.value[3].title).toEqual(
				"utils.adminFilter.lastMigration.title 09.01.2024 common.words.and 29.01.2024"
			);

			expect(filterChipTitles.value[4].item).toEqual(FilterOption.OBSOLOTE_SINCE);
			expect(filterChipTitles.value[4].title).toEqual(
				"utils.adminFilter.outdatedSince.title 09.01.2024 common.words.and 21.01.2024"
			);
		});

		it("should return an empty array when no filter is set ", () => {
			removeAllFilters();
			const { filterChipTitles } = setup("student");

			expect(filterChipTitles.value.length).toEqual(0);
		});
	});

	describe("removeChipFilter", () => {
		it("should remove chip filter", () => {
			const { filterQuery, removeChipFilter } = setup("student");

			const filters = {
				[FilterOption.CREATION_DATE]: {
					$gte: "2024-01-09T12:21:24.655Z",
					$lte: "2024-01-30T23:00:00.000Z",
				},
				[FilterOption.CLASSES]: ["1A"],
			};

			filterQuery.value = filters;

			removeChipFilter(FilterOption.CREATION_DATE);

			expect(filterQuery.value).toEqual({ [FilterOption.CLASSES]: ["1A"] });
		});
	});
});
