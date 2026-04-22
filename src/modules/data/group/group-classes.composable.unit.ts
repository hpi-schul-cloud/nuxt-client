import { BusinessError, Pagination } from "../../../store/types/commons";
import { SortOrder } from "../../../store/types/sort-order.enum";
import { ClassInfo } from "./types/class-info";
import { initializeAxios, mapAxiosErrorToResponseError } from "@/utils/api";
import {
	axiosErrorFactory,
	classInfoResponseFactory,
	classInfoSearchListResponseFactory,
	mockApi,
	mockAxiosInstance,
} from "@@/tests/test-utils";
import { classInfoFactory } from "@@/tests/test-utils/factory/classInfoFactory";
import { mockApiResponse } from "@@/tests/test-utils/mockApiResponse";
import { ClassInfoResponse, ClassInfoSearchListResponse, GroupApiInterface, SchoolYearQueryType } from "@api-server";
import * as serverApi from "@api-server";
import { AxiosInstance } from "axios";
import { Mocked } from "vitest";

describe("GroupModule", () => {
	let apiMock: Mocked<GroupApiInterface>;
	let axiosMock: Mocked<AxiosInstance>;

	beforeEach(() => {
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
				const classes: ClassInfoResponse[] = [
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

				const response: ClassInfoSearchListResponse = classInfoSearchListResponseFactory.build({
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

				await module.loadClassesForSchool();

				expect(apiMock.groupControllerFindClasses).toHaveBeenCalledWith(
					pagination.skip,
					pagination.limit,
					sortOrder,
					sortBy,
					undefined
				);
			});

			it("should set the state", async () => {
				const { classes, pagination } = setup();

				await module.loadClassesForSchool();

				expect(module.getClasses).toEqual<ClassInfoResponse[]>(classes);
				expect(module.getPagination).toEqual<Pagination>(pagination);
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

			it("should update the stores error", async () => {
				const { apiError } = setup();

				await module.loadClassesForSchool();

				expect(module.getBusinessError).toEqual<BusinessError>({
					error: apiError,
					statusCode: apiError.code,
					message: `${apiError.type}: ${apiError.message}`,
				});
			});
		});
	});

	describe("deleteClass", () => {
		describe("when called", () => {
			const setup = () => {
				const class1: ClassInfo = classInfoFactory.build();

				module.setClasses([class1]);

				return {
					class1,
				};
			};

			it("should delete the class", async () => {
				const { class1 } = setup();

				await module.deleteClass({
					classId: class1.id,
					query: SchoolYearQueryType.CURRENT_YEAR,
				});

				expect(axiosMock.delete).toHaveBeenCalled();
			});

			it("should load classes for school", async () => {
				const { class1 } = setup();

				await module.deleteClass({
					classId: class1.id,
					query: SchoolYearQueryType.CURRENT_YEAR,
				});

				expect(apiMock.groupControllerFindClasses).toHaveBeenCalled();
			});
		});

		describe("when an error occurs during the api call", () => {
			const setup = () => {
				const error = axiosErrorFactory.build();
				const apiError = mapAxiosErrorToResponseError(error);
				const class1: ClassInfo = classInfoFactory.build();
				const class2: ClassInfo = classInfoFactory.build();

				module.setClasses([class1, class2]);
				axiosMock.delete.mockRejectedValue(error);

				return {
					apiError,
					class1,
					class2,
				};
			};

			it("should update the stores error", async () => {
				const { apiError, class1 } = setup();

				await module.deleteClass({
					classId: class1.id,
					query: SchoolYearQueryType.CURRENT_YEAR,
				});

				expect(module.getBusinessError).toEqual<BusinessError>({
					error: apiError,
					statusCode: apiError.code,
					message: `${apiError.type}: ${apiError.message}`,
				});
			});

			it("should not remove the class from the store", async () => {
				const { class1, class2 } = setup();

				await module.deleteClass({
					classId: class1.id,
					query: SchoolYearQueryType.CURRENT_YEAR,
				});

				expect(module.getClasses).toEqual([class1, class2]);
			});
		});
	});
});
