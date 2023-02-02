import ExternalToolsModule from "./external-tools";
import * as serverApi from "../serverApi/v3/api";
import {
	SchoolExternalToolResponse,
	SchoolExternalToolResponseStatusEnum,
	SchoolExternalToolSearchListResponse,
	ToolApi,
} from "../serverApi/v3";
import {
	SchoolExternalTool,
	SchoolExternalToolStatusEnum,
} from "./external-tool";
import setupStores from "../../tests/test-utils/setupStores";
import { User } from "./types/auth";
import AuthModule from "@/store/auth";
import { authModule } from "@utils/store-accessor";
import * as useExternalToolUtilsComposable from "@/composables/external-tool-utils.composable";

describe("ExternalToolsModule", () => {
	let module: ExternalToolsModule;

	beforeEach(() => {
		module = new ExternalToolsModule({});
		setupStores({ auth: AuthModule });
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	const mockToolApi = (
		schoolExternalToolMock: Partial<SchoolExternalToolResponse> = {},
		throwError: boolean = false
	) => {
		const searchListResponse: SchoolExternalToolSearchListResponse = {
			data: [
				{
					id: schoolExternalToolMock.id ?? "id",
					schoolId: schoolExternalToolMock.schoolId ?? "schoolId",
					name: schoolExternalToolMock.name ?? "schoolName",
					toolId: schoolExternalToolMock.toolId ?? "toolId",
					parameters: schoolExternalToolMock.parameters ?? [],
					toolVersion: schoolExternalToolMock.toolVersion ?? 1,
					status:
						schoolExternalToolMock.status ??
						SchoolExternalToolResponseStatusEnum.Latest,
				},
			],
		};

		const promise = Promise.resolve({
			data: {
				...searchListResponse,
			},
			status: 200,
			statusText: "OK",
			headers: {},
			config: {},
		});

		const toolSchoolControllerGetSchoolExternalToolsMock = jest.fn(async () => {
			if (throwError) {
				throw new Error();
			}
			return promise;
		});

		const toolSchoolControllerDeleteSchoolExternalToolMock = jest.fn(
			async () => {
				if (throwError) {
					throw new Error();
				}
				return Promise.resolve({
					data: undefined,
					status: 200,
					statusText: "OK",
					headers: {},
					config: {},
				});
			}
		);

		const toolApiMock: Partial<ToolApi> = {
			toolSchoolControllerGetSchoolExternalTools:
				toolSchoolControllerGetSchoolExternalToolsMock,
			toolSchoolControllerDeleteSchoolExternalTool:
				toolSchoolControllerDeleteSchoolExternalToolMock,
		};
		jest
			.spyOn(serverApi, "ToolApiFactory")
			// @ts-ignore
			.mockReturnValue(toolApiMock);
		return { toolApiMock, searchListResponse };
	};

	const setup = () => {
		const schoolId: string = "schoolId";

		const schoolExternalTool: SchoolExternalTool = {
			name: "Test",
			status: SchoolExternalToolStatusEnum.Latest,
			id: "testId",
			version: 1,
		};
		const schoolExternalTools: SchoolExternalTool[] = [
			schoolExternalTool,
			{
				name: "Test2",
				status: SchoolExternalToolStatusEnum.Outdated,
				id: "testId2",
				version: 1,
			},
		];
		module.setSchoolExternalTools(schoolExternalTools);

		return {
			schoolId,
			schoolExternalTool,
			schoolExternalTools,
		};
	};

	describe("getter", () => {
		describe("getSchoolExternalTools is called", () => {
			it("should initialized as empty array", () => {
				module = new ExternalToolsModule({});

				const tools: SchoolExternalTool[] = module.getSchoolExternalTools;

				expect(tools.length).toEqual(0);
			});

			it("should return the state of schoolExternalTools", () => {
				const { schoolExternalTools } = setup();

				const tools: SchoolExternalTool[] = module.getSchoolExternalTools;

				expect(tools).toEqual(schoolExternalTools);
			});
		});
	});

	describe("mutations", () => {
		describe("setLoading is called", () => {
			describe("when is called with true", () => {
				it("should set loading state to true", () => {
					module.setLoading(true);
					expect(module.getLoading).toBeTruthy();
				});

				it("should set loading state to false", () => {
					module.setLoading(false);
					expect(module.getLoading).toBeFalsy();
				});
			});
		});

		describe("setSchoolExternalTools is called", () => {
			it("should set the new state", () => {
				setup();
				const expectedName = "NewTool";

				module.setSchoolExternalTools([
					{
						id: "id",
						name: expectedName,
						status: SchoolExternalToolStatusEnum.Latest,
						version: 1,
					},
				]);

				const tools: SchoolExternalTool[] = module.getSchoolExternalTools;
				expect(tools.length).toEqual(1);
				expect(tools[0].name).toEqual("NewTool");
			});
		});

		describe("removeSchoolExternalTool is called", () => {
			it("should remove the given tool from the state", () => {
				const { schoolExternalTool } = setup();

				let tools: SchoolExternalTool[] = module.getSchoolExternalTools;
				expect(tools.length).toEqual(2);

				module.removeSchoolExternalTool(schoolExternalTool);

				tools = module.getSchoolExternalTools;
				expect(tools.length).toEqual(1);
			});
		});
	});

	describe("actions", () => {
		describe("loadSchoolExternalTools is called", () => {
			const setupWithAuth = () => {
				const { schoolId } = setup();
				const user: User = { schoolId } as User;
				authModule.setUser(user);
				return {
					schoolId,
					user,
				};
			};

			describe("when loading", () => {
				it("should set loading to true and after operation to false", async () => {
					const setLoadingSpy = jest.spyOn(module, "setLoading");

					await module.loadSchoolExternalTools();

					expect(setLoadingSpy).toHaveBeenCalledWith(true);
					expect(setLoadingSpy).toHaveBeenCalledWith(false);
					expect(module.getLoading).toBeFalsy();
				});

				describe("when an error occurs", () => {
					it("should set loading to false", async () => {
						setupWithAuth();
						const setLoadingSpy = jest.spyOn(module, "setLoading");
						mockToolApi({}, true);

						const func = async () => await module.loadSchoolExternalTools();

						await expect(func()).toEqual(Promise.resolve());
						expect(setLoadingSpy).toHaveBeenCalledWith(false);
						expect(module.getLoading).toBeFalsy();
					});
				});
			});

			describe("when schoolId exists", () => {
				it("should call the toolApi.toolSchoolControllerGetSchoolExternalTools", async () => {
					const { schoolId } = setupWithAuth();
					const { toolApiMock } = mockToolApi({});

					await module.loadSchoolExternalTools();

					expect(
						toolApiMock.toolSchoolControllerGetSchoolExternalTools
					).toHaveBeenCalledWith(schoolId);
				});

				it("should call useExternalToolsSectionUtils().mapSchoolExternalToolSearchListResponse", async () => {
					setupWithAuth();
					const { searchListResponse } = mockToolApi();
					const mapSchoolExternalToolSearchListResponseMock = jest
						.fn()
						.mockReturnValue([{ id: "toolId" }]);
					jest
						.spyOn(useExternalToolUtilsComposable, "useExternalToolUtils")
						.mockReturnValue({
							...useExternalToolUtilsComposable.useExternalToolUtils(),
							mapSchoolExternalToolSearchListResponse:
								mapSchoolExternalToolSearchListResponseMock,
						});

					await module.loadSchoolExternalTools();

					expect(
						mapSchoolExternalToolSearchListResponseMock
					).toHaveBeenCalledWith(searchListResponse);
				});

				it("should call set setSchoolExternalTools", async () => {
					setupWithAuth();
					const { searchListResponse } = mockToolApi();

					const setSchoolExternalToolsSpy = jest.spyOn(
						module,
						"setSchoolExternalTools"
					);

					await module.loadSchoolExternalTools();

					expect(setSchoolExternalToolsSpy).toHaveBeenCalledWith([
						{
							id: searchListResponse.data[0].id,
							name: searchListResponse.data[0].name,
							status: SchoolExternalToolStatusEnum.Latest,
							version: searchListResponse.data[0].toolVersion,
						},
					]);
				});
			});
		});

		describe("deleteSchoolExternalTool is called", () => {
			describe("when loading", () => {
				it("should set loading to true and after operation to false", async () => {
					const { schoolExternalTool } = setup();
					const setLoadingSpy = jest.spyOn(module, "setLoading");
					mockToolApi({}, false);

					await module.deleteSchoolExternalTool(schoolExternalTool);

					expect(setLoadingSpy).toHaveBeenCalledWith(true);
					expect(setLoadingSpy).toHaveBeenCalledWith(false);
					expect(module.getLoading).toBeFalsy();
				});

				describe("when an error occurs", () => {
					it("should set loading to false", async () => {
						const { schoolExternalTool } = setup();
						const setLoadingSpy = jest.spyOn(module, "setLoading");
						mockToolApi({}, true);

						const func = async () =>
							await module.deleteSchoolExternalTool(schoolExternalTool);

						await expect(func()).toEqual(Promise.resolve());
						expect(setLoadingSpy).toHaveBeenCalledWith(false);
						expect(module.getLoading).toBeFalsy();
					});
				});
			});

			describe("when toolToDelete is given", () => {
				it("should call the api with id of given tool", async () => {
					const { schoolExternalTool } = setup();
					const { toolApiMock } = mockToolApi();

					await module.deleteSchoolExternalTool(schoolExternalTool);

					expect(
						toolApiMock.toolSchoolControllerDeleteSchoolExternalTool
					).toHaveBeenCalledWith(schoolExternalTool.id);
				});

				it("should call the mutation removeSchoolExternalTool", async () => {
					const { schoolExternalTool } = setup();
					mockToolApi();

					const removeSchoolExternalToolSpy = jest.spyOn(
						module,
						"removeSchoolExternalTool"
					);

					await module.deleteSchoolExternalTool(schoolExternalTool);

					expect(removeSchoolExternalToolSpy).toHaveBeenCalledWith(
						schoolExternalTool
					);
				});
			});
		});
	});
});
