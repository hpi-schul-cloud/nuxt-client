import * as serverApi from "@/serverApi/v3/api";
import { ClassInfoSearchListResponse, GroupApiInterface } from "@/serverApi/v3";
import { classInfoSearchListResponseFactory } from "@@/tests/test-utils";
import { ClassInfo } from "./types/class-info";
import { Pagination } from "./types/commons";
import { SortOrder } from "./types/sort-order.enum";
import GroupModule from "./group";
import { DeepMocked, createMock } from "@golevelup/ts-jest";
import { mockApiResponse } from "@@/tests/test-utils/mockApiResponse";
import { AxiosError } from "axios";

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
				const result = module.getError;

				expect(result).toBeNull();
			});

			it("should return the changed state", () => {
				const error = new Error();

				module.setError(error);

				expect(module.getError).toEqual(error);
			});

			it("should reset the error", () => {
				const error = new Error();
				module.setError(error);

				module.resetError();

				expect(module.getError).toBeNull();
			});
		});

		describe("Classes", () => {
			it("should return the default state", () => {
				const classes: ClassInfo[] = module.getClasses;

				expect(classes).toEqual([]);
			});

			it("should return the changed state", () => {
				const classes: ClassInfo[] = [
					{ name: "3a", externalSourceName: "Klasse", teachers: ["Carlie"] },
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
					total: 30,
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
				const response: ClassInfoSearchListResponse =
					classInfoSearchListResponseFactory.build();

				const sortBy = "name";
				const sortOrder: SortOrder = SortOrder.ASC;
				const pagination: Pagination = {
					limit: 10,
					skip: 0,
					total: 30,
				};

				apiMock.groupControllerFindClassesForSchool.mockResolvedValue(
					mockApiResponse({ data: response })
				);

				return {
					response,
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
		});

		describe("when the api returns an error", () => {
			const setup = () => {
				const error = new AxiosError();

				apiMock.groupControllerFindClassesForSchool.mockRejectedValue(error);

				return { error };
			};

			it("should update the stores error", async () => {
				const { error } = setup();

				await module.loadClassesForSchool();

				expect(module.getError).toEqual(error);
			});
		});
	});
});
