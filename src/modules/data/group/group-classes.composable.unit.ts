import { Pagination } from "../../../store/types/commons";
import { SortOrder } from "../../../store/types/sort-order.enum";
import { useGroupClasses } from "./group-classes.composable";
import { initializeAxios, mapAxiosErrorToResponseError } from "@/utils/api";
import {
	axiosErrorFactory,
	classInfoResponseFactory,
	classInfoSearchListResponseFactory,
	expectNotification,
	mockApi,
	mockAxiosInstance,
} from "@@/tests/test-utils";
import { classInfoFactory } from "@@/tests/test-utils/factory/classInfoFactory";
import { mockApiResponse } from "@@/tests/test-utils/mockApiResponse";
import { GroupApiInterface, SchoolYearQueryType } from "@api-server";
import * as serverApi from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { AxiosInstance } from "axios";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";

describe("GroupModule", () => {
	let apiMock: Mocked<GroupApiInterface>;
	let axiosMock: Mocked<AxiosInstance>;

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		apiMock = mockApi<GroupApiInterface>();
		axiosMock = mockAxiosInstance();

		initializeAxios(axiosMock);
		vi.spyOn(serverApi, "GroupApiFactory").mockReturnValue(apiMock);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe("loadClassesForSchool", () => {
		describe("when the api returns a response", () => {
			const setup = () => {
				const classes = [
					classInfoResponseFactory.build({
						synchronizedCourses: [
							{
								id: "courseId",
								name: "courseName",
							},
						],
					}),
				];
				const sortBy = "name";
				const sortOrder: SortOrder = SortOrder.ASC;
				const pagination: Pagination = {
					limit: 10,
					skip: 0,
					total: 25,
				};

				const response = classInfoSearchListResponseFactory.build({
					data: classes,
					total: pagination.total,
					skip: pagination.skip,
					limit: pagination.limit,
				});

				apiMock.groupControllerFindClasses.mockResolvedValue(mockApiResponse({ data: response }));

				return {
					response,
					classes,
					sortBy,
					sortOrder,
					pagination,
				};
			};

			it("should update the classes", async () => {
				const { pagination, sortBy, sortOrder } = setup();
				const { fetchClassesForSchool } = useGroupClasses();

				await fetchClassesForSchool();

				expect(apiMock.groupControllerFindClasses).toHaveBeenCalledWith(
					pagination.skip,
					pagination.limit,
					sortOrder,
					sortBy,
					undefined
				);
			});

			it("should set the state", async () => {
				const { classes: expectedClasses, pagination: expectedPagination } = setup();
				const { fetchClassesForSchool, classes, pagination } = useGroupClasses();

				await fetchClassesForSchool();

				expect(classes.value).toEqual(expectedClasses);
				expect(pagination.value).toEqual(expectedPagination);
			});
		});

		describe("when the api returns an error", () => {
			const setup = () => {
				const error = axiosErrorFactory.build();
				const apiError = mapAxiosErrorToResponseError(error);

				apiMock.groupControllerFindClasses.mockRejectedValue(error);

				return {
					apiError,
				};
			};

			it("should noitify error", async () => {
				const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(vi.fn());
				setup();
				const { fetchClassesForSchool } = useGroupClasses();

				await fetchClassesForSchool();

				expectNotification("error");

				consoleErrorSpy.mockRestore();
			});
		});
	});

	describe("deleteClass", () => {
		describe("when called", () => {
			const setup = () => {
				const existingClasses = classInfoFactory.buildList(2);
				const { deleteClass, classes } = useGroupClasses();

				classes.value = existingClasses;

				apiMock.groupControllerFindClasses.mockResolvedValue(
					mockApiResponse({ data: classInfoSearchListResponseFactory.build({}) })
				);

				return { existingClasses, deleteClass };
			};

			it("should delete the class", async () => {
				const { deleteClass, existingClasses } = setup();

				await deleteClass({
					classId: existingClasses[0].id,
					query: SchoolYearQueryType.CURRENT_YEAR,
				});

				expect(axiosMock.delete).toHaveBeenCalled();
			});

			it("should fetch classes for school", async () => {
				const { deleteClass, existingClasses } = setup();

				await deleteClass({
					classId: existingClasses[0].id,
					query: SchoolYearQueryType.CURRENT_YEAR,
				});

				expect(apiMock.groupControllerFindClasses).toHaveBeenCalled();
			});
		});

		describe("when an error occurs during the api call", () => {
			let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

			beforeEach(() => {
				consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(vi.fn());
			});

			afterEach(() => {
				consoleErrorSpy.mockRestore();
			});

			const setup = () => {
				const existingClasses = classInfoFactory.buildList(2);
				const { deleteClass, classes } = useGroupClasses();
				classes.value = existingClasses;

				const error = axiosErrorFactory.build();
				axiosMock.delete.mockRejectedValue(error);

				return {
					existingClasses,
					classes,
					deleteClass,
				};
			};

			it("should notify error", async () => {
				const { existingClasses, deleteClass } = setup();

				await deleteClass({
					classId: existingClasses[0].id,
					query: SchoolYearQueryType.CURRENT_YEAR,
				});
				expectNotification("error");
			});

			it("should not remove the class", async () => {
				const { deleteClass, existingClasses, classes } = setup();

				await deleteClass({
					classId: existingClasses[0].id,
					query: SchoolYearQueryType.CURRENT_YEAR,
				});

				expect(classes.value).toEqual(existingClasses);
			});
		});
	});
});
