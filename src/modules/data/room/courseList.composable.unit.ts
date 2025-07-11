import {
	CourseInfoDataResponse,
	CourseInfoListResponse,
	CourseSortProps,
	CourseStatus,
} from "@/serverApi/v3";
import NotifierModule from "@/store/notifier";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	axiosErrorFactory,
	i18nMock,
	mockApiResponse,
	mountComposable,
} from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { BusinessError, Pagination } from "@/store/types/commons";
import { courseInfoDataResponseFactory } from "@@/tests/test-utils/factory";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { useCourseInfoApi } from "./courseInfoApi.composable";
import { useCourseApi } from "./courseApi.composable";
import { useCourseList } from "./courseList.composable";

jest.mock("./courseApi.composable");
jest.mock("./courseInfoApi.composable");

describe("courseList.composable", () => {
	let useCourseApiMock: DeepMocked<ReturnType<typeof useCourseApi>>;
	let useCourseInfoApiMock: DeepMocked<ReturnType<typeof useCourseInfoApi>>;

	const notifierModule: jest.Mocked<NotifierModule> =
		createModuleMocks(NotifierModule);

	beforeEach(() => {
		useCourseApiMock = createMock<ReturnType<typeof useCourseApi>>();
		useCourseInfoApiMock = createMock<ReturnType<typeof useCourseInfoApi>>();

		jest.mocked(useCourseApi).mockReturnValue(useCourseApiMock);
		jest.mocked(useCourseInfoApi).mockReturnValue(useCourseInfoApiMock);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("setSortBy", () => {
		const setup = () => {
			const composable = mountComposable(() => useCourseList(), {
				global: {
					provide: {
						[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
					},
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

			expect(composable.key.value).toEqual<CourseSortProps>(
				CourseSortProps.Name
			);
		});
	});

	describe("setSortOrder", () => {
		const setup = () => {
			const composable = mountComposable(() => useCourseList(), {
				global: {
					provide: {
						[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
					},
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
					provide: {
						[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
					},
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
					provide: {
						[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
					},
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
						provide: {
							[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
						},
						plugins: [createTestingI18n()],
						mocks: i18nMock,
					},
				});

				return {
					composable,
				};
			};

			it("should not have data", async () => {
				const { composable } = setup();

				expect(composable.courses.value).toEqual([]);
			});

			it("should have default values", async () => {
				const { composable } = setup();

				expect(composable.pagination.value).toEqual<Pagination>({
					limit: 10,
					skip: 0,
					total: 0,
				});
				expect(composable.courses.value).toEqual([]);
				expect(composable.page.value).toEqual(1);
				expect(composable.isLoading.value).toEqual(false);
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
				useCourseInfoApiMock.loadCoursesForSchool.mockResolvedValue(
					mockApiResponse({ data: courseList })
				);

				const composable = mountComposable(() => useCourseList(), {
					global: {
						provide: {
							[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
						},
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

				expect(composable.courses.value).toEqual<CourseInfoDataResponse[]>([
					courseInfo,
				]);
			});
		});

		describe("when an error occurs during loading", () => {
			const setup = () => {
				const errorResponse = axiosErrorFactory.build();
				const apiError = mapAxiosErrorToResponseError(errorResponse);

				useCourseInfoApiMock.loadCoursesForSchool.mockRejectedValue(
					errorResponse
				);

				const composable = mountComposable(() => useCourseList(), {
					global: {
						provide: {
							[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
						},
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

				expect(notifierModule.show).toHaveBeenCalledWith({
					text: "error.load",
					status: "error",
				});
			});
		});
	});

	describe("deleteCourse", () => {
		describe("when deleting course", () => {
			const setup = () => {
				const composable = mountComposable(() => useCourseList(), {
					global: {
						provide: {
							[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
						},
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
						provide: {
							[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
						},
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

				expect(notifierModule.show).toHaveBeenCalledWith({
					text: "error.load",
					status: "error",
				});
			});
		});
	});
});
