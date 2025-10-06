import { useCourseApi } from "./courseApi.composable";
import { useCourseInfoApi } from "./courseInfoApi.composable";
import { useCourseList } from "./courseList.composable";
import { CourseInfoDataResponse, CourseInfoListResponse, CourseSortProps, CourseStatus } from "@/serverApi/v3";
import { BusinessError, Pagination } from "@/store/types/commons";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { axiosErrorFactory, expectNotification, i18nMock, mockApiResponse, mountComposable } from "@@/tests/test-utils";
import { courseInfoDataResponseFactory } from "@@/tests/test-utils/factory";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";

vi.mock("./courseApi.composable");
vi.mock("./courseInfoApi.composable");

describe("courseList.composable", () => {
	let useCourseApiMock: DeepMocked<ReturnType<typeof useCourseApi>>;
	let useCourseInfoApiMock: DeepMocked<ReturnType<typeof useCourseInfoApi>>;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		useCourseApiMock = createMock<ReturnType<typeof useCourseApi>>();
		useCourseInfoApiMock = createMock<ReturnType<typeof useCourseInfoApi>>();

		vi.mocked(useCourseApi).mockReturnValue(useCourseApiMock);
		vi.mocked(useCourseInfoApi).mockReturnValue(useCourseInfoApiMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("setSortBy", () => {
		const setup = () => {
			const composable = mountComposable(() => useCourseList(), {
				global: {
					plugins: [createTestingI18n()],
					mocks: i18nMock,
				},
			});

			return {
				composable,
			};
		};
		it("should set value", () => {
			const { composable } = setup();

			composable.setSortBy(CourseSortProps.Name);

			expect(composable.key.value).toEqual<CourseSortProps>(CourseSortProps.Name);
		});
	});

	describe("setSortOrder", () => {
		const setup = () => {
			const composable = mountComposable(() => useCourseList(), {
				global: {
					plugins: [createTestingI18n()],
					mocks: i18nMock,
				},
			});

			return {
				composable,
			};
		};
		it("should set value", () => {
			const { composable } = setup();

			composable.setSortOrder("desc");

			expect(composable.sortOrder.value).toEqual<"asc" | "desc">("desc");
		});
	});

	describe("setPage", () => {
		const setup = () => {
			const composable = mountComposable(() => useCourseList(), {
				global: {
					plugins: [createTestingI18n()],
					mocks: i18nMock,
				},
			});

			return {
				composable,
			};
		};
		it("should set value", () => {
			const { composable } = setup();

			composable.setPage(5);

			expect(composable.page.value).toEqual<number>(5);
		});
	});

	describe("setPagination", () => {
		const setup = () => {
			const composable = mountComposable(() => useCourseList(), {
				global: {
					plugins: [createTestingI18n()],
					mocks: i18nMock,
				},
			});
			return {
				composable,
			};
		};
		it("should set value", () => {
			const { composable } = setup();

			composable.setPagination({ limit: 5, total: 5, skip: 1 });

			expect(composable.pagination.value).toEqual<Pagination>({
				limit: 5,
				total: 5,
				skip: 1,
			});
		});
	});

	describe("fetchCourses", () => {
		describe("when no data is loaded", () => {
			const setup = () => {
				const composable = mountComposable(() => useCourseList(), {
					global: {
						plugins: [createTestingI18n()],
						mocks: i18nMock,
					},
				});

				return {
					composable,
				};
			};

			it("should not have data", () => {
				const { composable } = setup();

				expect(composable.courses.value).toEqual([]);
			});

			it("should have default values", () => {
				const { composable } = setup();

				expect(composable.pagination.value).toEqual<Pagination>({
					limit: 10,
					skip: 0,
					total: 0,
				});
				expect(composable.courses.value).toEqual([]);
				expect(composable.page.value).toEqual(1);
				expect(composable.isLoading.value).toEqual(false);
				expect(composable.withoutTeacher.value).toBe(false);
			});
		});

		describe("when data is loaded ", () => {
			const setup = () => {
				const courseList: CourseInfoListResponse = {
					data: [
						courseInfoDataResponseFactory.build({
							syncedGroup: "",
							teacherNames: [],
							classNames: [],
							name: "name",
						}),
					],
					limit: 10,
					skip: 0,
					total: 10,
				};
				useCourseInfoApiMock.loadCoursesForSchool.mockResolvedValue(mockApiResponse({ data: courseList }));

				const composable = mountComposable(() => useCourseList(), {
					global: {
						plugins: [createTestingI18n()],
						mocks: i18nMock,
					},
				});
				return {
					courseList,
					composable,
				};
			};

			it("should call the api to get courses", async () => {
				const { composable } = setup();

				await composable.fetchCourses(CourseStatus.Current);

				expect(useCourseInfoApiMock.loadCoursesForSchool).toHaveBeenCalledWith(
					"current",
					false,
					10,
					0,
					undefined,
					"asc"
				);
			});

			it("should set the pagination", async () => {
				const { composable } = setup();

				await composable.fetchCourses(CourseStatus.Current);

				expect(composable.pagination.value).toEqual<Pagination>({
					limit: 10,
					skip: 0,
					total: 10,
				});
			});

			it("should set courses", async () => {
				const { composable, courseList } = setup();

				const course = courseList.data[0];

				const courseInfo = courseInfoDataResponseFactory.build({
					id: course.id,
					name: course.name,
					classNames: course.classNames,
					teacherNames: course.teacherNames,
					syncedGroup: course.syncedGroup,
				});

				await composable.fetchCourses(CourseStatus.Current);

				expect(composable.courses.value).toEqual<CourseInfoDataResponse[]>([courseInfo]);
			});

			describe("and withoutTeacher is set to true", () => {
				it("should call the api with withoutTeacher set to true", async () => {
					const { composable } = setup();
					composable.withoutTeacher.value = true;
					await composable.fetchCourses(CourseStatus.Current);

					expect(useCourseInfoApiMock.loadCoursesForSchool).toHaveBeenCalledWith(
						"current",
						true,
						10,
						0,
						undefined,
						"asc"
					);
				});
			});
		});

		describe("when an error occurs during loading", () => {
			const setup = () => {
				const errorResponse = axiosErrorFactory.build();
				const apiError = mapAxiosErrorToResponseError(errorResponse);

				useCourseInfoApiMock.loadCoursesForSchool.mockRejectedValue(errorResponse);

				const composable = mountComposable(() => useCourseList(), {
					global: {
						plugins: [createTestingI18n()],
						mocks: i18nMock,
					},
				});
				return {
					composable,
					apiError,
				};
			};

			it("should set loading to false", async () => {
				const { composable } = setup();

				await composable.fetchCourses(CourseStatus.Current);

				expect(composable.isLoading.value).toEqual(false);
			});

			it("should set the error", async () => {
				const { composable, apiError } = setup();

				await composable.fetchCourses(CourseStatus.Current);

				expect(composable.error.value).toEqual<BusinessError>({
					error: apiError,
					statusCode: apiError.code,
					message: apiError.message,
				});
			});

			it("should show notification", async () => {
				const { composable } = setup();

				await composable.fetchCourses(CourseStatus.Current);

				expectNotification("error");
			});
		});
	});

	describe("deleteCourse", () => {
		describe("when deleting course", () => {
			const setup = () => {
				const composable = mountComposable(() => useCourseList(), {
					global: {
						plugins: [createTestingI18n()],
						mocks: i18nMock,
					},
				});

				return {
					composable,
				};
			};

			it("should call useCourseApi", async () => {
				const { composable } = setup();

				await composable.deleteCourse("id");

				expect(useCourseApiMock.deleteCourseById).toHaveBeenCalledWith("id");
			});

			it("should set isLoading to false", async () => {
				const { composable } = setup();

				await composable.deleteCourse("id");

				expect(composable.isLoading.value).toBe(false);
			});
		});

		describe("when error occur during delete course", () => {
			const setup = () => {
				const errorResponse = axiosErrorFactory.build();
				const apiError = mapAxiosErrorToResponseError(errorResponse);

				useCourseApiMock.deleteCourseById.mockRejectedValueOnce(errorResponse);

				const composable = mountComposable(() => useCourseList(), {
					global: {
						plugins: [createTestingI18n()],
						mocks: i18nMock,
					},
				});

				return {
					composable,
					apiError,
				};
			};

			it("should set isLoading to false", async () => {
				const { composable } = setup();

				await composable.deleteCourse("id");

				expect(composable.isLoading.value).toBe(false);
			});

			it("should set the error", async () => {
				const { composable, apiError } = setup();

				await composable.deleteCourse("id");

				expect(composable.error.value).toEqual<BusinessError>({
					error: apiError,
					statusCode: apiError.code,
					message: apiError.message,
				});
			});

			it("should show notification", async () => {
				const { composable } = setup();

				await composable.deleteCourse("id");

				expectNotification("error");
			});
		});
	});
});
