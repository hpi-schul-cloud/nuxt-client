import { CourseInfoListResponse, CourseStatusQueryType } from "@/serverApi/v3";
import NotifierModule from "@/store/notifier";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import {
	axiosErrorFactory,
	i18nMock,
	mockApiResponse,
	mountComposable,
} from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { CourseInfo, useCourseApi, useCourseList } from "./index";
import { courseInfoDataResponseFactory } from "@@/tests/test-utils/factory/courseInfoDataResponseFactory";
import { Pagination } from "@/store/types/commons";
import { courseInfoFactory } from "@@/tests/test-utils/factory/courseInfoFactory";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { useCourseInfoApi } from "./courseInfoApi.composable";

jest.mock("@data-room/CourseApi.composable");
jest.mock("@data-room/CourseInfoApi.composable");

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

				await composable.fetchCourses(CourseStatusQueryType.Current);

				expect(useCourseInfoApiMock.loadCoursesForSchool).toHaveBeenCalledWith(
					"current",
					10,
					0,
					undefined,
					"asc"
				);
			});

			it("should set the pagination", async () => {
				const { composable } = setup();

				await composable.fetchCourses(CourseStatusQueryType.Current);

				expect(composable.pagination.value).toEqual<Pagination>({
					limit: 10,
					skip: 0,
					total: 10,
				});
			});

			it("should set courses", async () => {
				const { composable, courseList } = setup();

				const course = courseList.data[0];

				const courseInfo = courseInfoFactory.build({
					id: course.id,
					name: course.name,
					classNames: course.classNames,
					teacherNames: course.teacherNames,
					syncedWithGroup: course.syncedGroup,
				});

				await composable.fetchCourses(CourseStatusQueryType.Current);

				expect(composable.courses.value).toEqual<CourseInfo[]>([courseInfo]);
			});
		});

		describe("when an error occurs during loading", () => {
			const setup = () => {
				const errorResponse = axiosErrorFactory.build();
				const apiError = mapAxiosErrorToResponseError(errorResponse);

				useCourseInfoApiMock.loadCoursesForSchool.mockRejectedValue(apiError);

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

			it("should set loading to false", async () => {
				const { composable } = setup();

				await composable.fetchCourses(CourseStatusQueryType.Current);

				expect(composable.isLoading.value).toEqual(false);
			});

			it("should show notification", async () => {
				const { composable } = setup();

				await composable.fetchCourses(CourseStatusQueryType.Current);

				expect(notifierModule.show).toHaveBeenCalledWith({
					text: "error.load",
					status: "error",
				});
			});
		});
	});
});
