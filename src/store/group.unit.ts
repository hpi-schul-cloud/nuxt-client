import * as serverApi from "@/serverApi/v3/api";
import {
	ClassInfoResponse,
	ClassInfoSearchListResponse,
	GroupApiInterface,
} from "@/serverApi/v3";
import {
	axiosErrorFactory,
	businessErrorFactory,
	classInfoResponseFactory,
	classInfoSearchListResponseFactory,
} from "@@/tests/test-utils";
import { ClassInfo, ClassRootType } from "./types/class-info";
import { BusinessError, Pagination } from "./types/commons";
import { SortOrder } from "./types/sort-order.enum";
import GroupModule from "./group";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { mockApiResponse } from "@@/tests/test-utils/mockApiResponse";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { classInfoFactory } from "@@/tests/test-utils/factory/classInfoFactory";
import axios from "axios/index";

describe("GroupModule", () => {
	let module: GroupModule;

	let apiMock: DeepMocked<GroupApiInterface>;

	beforeEach(() => {
		module = new GroupModule({});

		apiMock = createMock<GroupApiInterface>();

		jest.spyOn(serverApi, "GroupApiFactory").mockReturnValue(apiMock);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	describe("getter/setter", () => {
		describe("Loading", () => {
			it("should return the default state", () => {
				const result = module.getLoading;

				expect(result).toEqual(false);
			});

			it("should return the changed state", () => {
				module.setLoading(true);

				expect(module.getLoading).toEqual(true);
			});
		});

		describe("Error", () => {
			it("should return the default state", () => {
				const result = module.getBusinessError;

				expect(result).toBeNull();
			});

			it("should return the changed state", () => {
				const businessError = businessErrorFactory.build({
					message: "error message",
				});

				module.setBusinessError(businessError);

				expect(module.getBusinessError).toEqual(businessError);
			});

			it("should reset the error", () => {
				const businessError = businessErrorFactory.build();

				module.setBusinessError(businessError);
				module.resetBusinessError();

				expect(module.getBusinessError).toBeNull();
			});
		});

		describe("Classes", () => {
			it("should return the default state", () => {
				const classes: ClassInfo[] = module.getClasses;

				expect(classes).toEqual([]);
			});

			it("should return the changed state", () => {
				const classes: ClassInfo[] = [
					{
						name: "3a",
						externalSourceName: "Klasse",
						teachers: ["Carlie"],
						type: ClassRootType.Class,
						id: "id",
					},
				];

				module.setClasses(classes);

				expect(module.getClasses).toEqual(classes);
			});
		});

		describe("Pagination", () => {
			it("should return the default state", () => {
				const pagination: Pagination = module.getPagination;

				expect(pagination).toEqual<Pagination>({
					limit: 10,
					skip: 0,
					total: 0,
				});
			});

			it("should return the changed state", () => {
				const pagination: Pagination = {
					limit: 20,
					skip: 10,
					total: 30,
				};

				module.setPagination(pagination);

				expect(module.getPagination).toEqual(pagination);
			});
		});

		describe("SortBy", () => {
			it("should return the default state", () => {
				const sortBy = module.getSortBy;

				expect(sortBy).toEqual("name");
			});

			it("should return the changed state", () => {
				const sortBy = "externalSource";

				module.setSortBy(sortBy);

				expect(module.getSortBy).toEqual(sortBy);
			});
		});

		describe("SortOrder", () => {
			it("should return the default state", () => {
				const sortOrder: SortOrder = module.getSortOrder;

				expect(sortOrder).toEqual(SortOrder.ASC);
			});

			it("should return the changed state", () => {
				const sortOrder: SortOrder = SortOrder.DESC;

				module.setSortOrder(sortOrder);

				expect(module.getSortOrder).toEqual<SortOrder>(sortOrder);
			});
		});

		describe("Page", () => {
			it("should return the default state", () => {
				const page = module.getPage;

				expect(page).toEqual(1);
			});

			it("should return the changed state", () => {
				const page = 2;

				module.setPage(page);

				expect(module.getPage).toEqual(page);
			});
		});
	});

	describe("loadClassesForSchool", () => {
		describe("when the api returns a response", () => {
			const setup = () => {
				const classes: ClassInfoResponse[] = [classInfoResponseFactory.build()];
				const sortBy = "name";
				const sortOrder: SortOrder = SortOrder.ASC;
				const pagination: Pagination = {
					limit: 10,
					skip: 0,
					total: 25,
				};

				const response: ClassInfoSearchListResponse =
					classInfoSearchListResponseFactory.build({
						data: classes,
						total: pagination.total,
						skip: pagination.skip,
						limit: pagination.limit,
					});

				apiMock.groupControllerFindClassesForSchool.mockResolvedValue(
					mockApiResponse({ data: response })
				);

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

				expect(
					apiMock.groupControllerFindClassesForSchool
				).toHaveBeenCalledWith(
					pagination.skip,
					pagination.limit,
					sortOrder,
					sortBy
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

				apiMock.groupControllerFindClassesForSchool.mockRejectedValue(error);

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

	// TODO test deleteClass method by mocking the v1 axios call
	describe("deleteClass", () => {
		describe("when called", () => {
			const setup = () => {
				const clazz: ClassInfo = classInfoFactory.build();
				const classId = clazz.id;

				return {
					classId,
				};
			};

			it("should delete the class", async () => {
				const { classId } = setup();

				await module.deleteClass(classId);

				expect(axios.delete).toHaveBeenCalled();
			});

			it("should load classes", async () => {
				const { classId } = setup();

				await module.deleteClass(classId);

				expect(module.loadClassesForSchool).toHaveBeenCalled();
			});
		});

		describe("when error is returned", () => {
			const setup = () => {
				const error = axiosErrorFactory.build();
				const apiError = mapAxiosErrorToResponseError(error);
				const clazz: ClassInfo = classInfoFactory.build();
				const classId = clazz.id;

				module.loadClassesForSchool.mockRejectedValue(error);

				return {
					apiError,
					classId,
				};
			};

			it("should update the stores error", async () => {
				const { apiError, classId } = setup();

				await module.deleteClass(classId);

				expect(module.getBusinessError).toEqual<BusinessError>({
					error: apiError,
					statusCode: apiError.code,
					message: `${apiError.type}: ${apiError.message}`,
				});
			});
		});
	});
});
