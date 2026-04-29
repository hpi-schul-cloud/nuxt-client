import {
	SchoolExternalTool,
	ToolParameterLocation,
	ToolParameterScope,
	ToolParameterType,
} from "../../../store/external-tool";
import {
	customParameterResponseFactory,
	expectNotification,
	mockApi,
	mockApiResponse,
	schoolExternalToolConfigurationStatusResponseFactory,
	schoolExternalToolConfigurationTemplateResponseFactory,
	schoolExternalToolResponseFactory,
	schoolExternalToolSaveFactory,
	toolParameterEntryFactory,
} from "@@/tests/test-utils";
import { SchoolExternalToolPostParams, ToolApiInterface } from "@api-server";
import * as serverApi from "@api-server";
import { SchoolExternalToolConfigurationTemplate, useSchoolExternalToolConfigurator } from "@data-external-tool";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";

describe("SchoolExternalToolsModule", () => {
	let apiMock: Mocked<ToolApiInterface>;

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		apiMock = mockApi<ToolApiInterface>();

		vi.spyOn(serverApi, "ToolApiFactory").mockReturnValue(apiMock);
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	describe("actions", () => {
		describe("loadSchoolExternalTool is called", () => {
			describe("when it successfully calls the api", () => {
				const setup = () => {
					const schoolExternalTool = schoolExternalToolResponseFactory.build();

					apiMock.toolSchoolControllerGetSchoolExternalTool.mockResolvedValue(
						mockApiResponse({ data: schoolExternalTool })
					);

					return {
						schoolExternalTool,
					};
				};

				it("should call the toolApi.toolConfigurationControllerGetAvailableToolsForSchool", async () => {
					setup();
					const { loadSchoolExternalTool } = useSchoolExternalToolConfigurator();

					await loadSchoolExternalTool("schoolExternalToolId");

					expect(apiMock.toolSchoolControllerGetSchoolExternalTool).toHaveBeenCalledWith("schoolExternalToolId");
				});

				it("should return the school external tool", async () => {
					const { schoolExternalTool } = setup();
					const { loadSchoolExternalTool } = useSchoolExternalToolConfigurator();

					const result = await loadSchoolExternalTool("schoolExternalToolId");

					expect(result).toEqual<SchoolExternalTool>({
						id: schoolExternalTool.id,
						toolId: schoolExternalTool.toolId,
						schoolId: schoolExternalTool.schoolId,
						parameters: [],
						status: schoolExternalToolConfigurationStatusResponseFactory.build(),
						name: schoolExternalTool.name,
						isDeactivated: false,
					});
				});
			});

			describe("when an error occurs", () => {
				it("should notify error", async () => {
					const consoleSpy = vi.spyOn(console, "error").mockImplementation(vi.fn());
					apiMock.toolSchoolControllerGetSchoolExternalTool.mockRejectedValue(new Error("error"));

					const { loadSchoolExternalTool } = useSchoolExternalToolConfigurator();

					await loadSchoolExternalTool("schoolExternalToolId");

					expectNotification("error");
					consoleSpy.mockRestore();
				});
			});
		});

		describe("loadAvailableToolsForSchool is called", () => {
			describe("when it successfully calls the api", () => {
				const setup = () => {
					const toolConfigurationTemplate = schoolExternalToolConfigurationTemplateResponseFactory.build({
						logoUrl: "logoUrl",
						parameters: customParameterResponseFactory.buildList(1, {
							defaultValue: "defaultValue",
							description: "description",
							regex: "regex",
							regexComment: "regexComment",
						}),
					});

					const response = { data: [toolConfigurationTemplate] };

					apiMock.toolConfigurationControllerGetAvailableToolsForSchool.mockResolvedValue(
						mockApiResponse({ data: response })
					);

					return {
						toolConfigurationTemplate,
					};
				};

				it("should call the toolApi.toolConfigurationControllerGetAvailableToolsForSchool", async () => {
					setup();
					const { loadAvailableToolsForSchool } = useSchoolExternalToolConfigurator();

					await loadAvailableToolsForSchool("schoolId");

					expect(apiMock.toolConfigurationControllerGetAvailableToolsForSchool).toHaveBeenCalledWith("schoolId");
				});

				it("should set the state", async () => {
					const { toolConfigurationTemplate } = setup();
					const { schoolExternalToolConfigurationTemplates, loadAvailableToolsForSchool } =
						useSchoolExternalToolConfigurator();

					await loadAvailableToolsForSchool("schoolId");

					expect(schoolExternalToolConfigurationTemplates.value).toEqual<SchoolExternalToolConfigurationTemplate[]>([
						{
							externalToolId: toolConfigurationTemplate.externalToolId,
							name: toolConfigurationTemplate.name,
							baseUrl: toolConfigurationTemplate.baseUrl,
							parameters: [
								{
									name: toolConfigurationTemplate.parameters[0].name,
									displayName: toolConfigurationTemplate.parameters[0].displayName,
									scope: ToolParameterScope.Context,
									type: ToolParameterType.String,
									location: ToolParameterLocation.BODY,
									defaultValue: toolConfigurationTemplate.parameters[0].defaultValue,
									description: toolConfigurationTemplate.parameters[0].description,
									isOptional: toolConfigurationTemplate.parameters[0].isOptional,
									isProtected: toolConfigurationTemplate.parameters[0].isProtected,
									regex: toolConfigurationTemplate.parameters[0].regex,
									regexComment: toolConfigurationTemplate.parameters[0].regexComment,
								},
							],
							logoUrl: toolConfigurationTemplate.logoUrl,
							isDeactivated: false,
						},
					]);
				});
			});

			describe("when an error occurs", () => {
				it("should notify error", async () => {
					const consoleSpy = vi.spyOn(console, "error").mockImplementation(vi.fn());
					apiMock.toolConfigurationControllerGetAvailableToolsForSchool.mockRejectedValue("error");

					const { loadAvailableToolsForSchool } = useSchoolExternalToolConfigurator();

					await loadAvailableToolsForSchool("schoolId");

					expectNotification("error");
					consoleSpy.mockRestore();
				});
			});
		});

		describe("loadConfigurationTemplateForSchoolExternalTool is called", () => {
			describe("when it successfully calls the api", () => {
				const setup = () => {
					const toolConfigurationTemplate = schoolExternalToolConfigurationTemplateResponseFactory.build({
						logoUrl: "logoUrl",
						parameters: customParameterResponseFactory.buildList(1, {
							defaultValue: "defaultValue",
							description: "description",
							regex: "regex",
							regexComment: "regexComment",
						}),
					});

					apiMock.toolConfigurationControllerGetConfigurationTemplateForSchool.mockResolvedValue(
						mockApiResponse({ data: toolConfigurationTemplate })
					);

					return {
						toolConfigurationTemplate,
					};
				};

				it("should call the toolApi.toolConfigurationControllerGetAvailableToolsForSchool", async () => {
					setup();
					const { loadConfigurationTemplateForSchoolExternalTool } = useSchoolExternalToolConfigurator();

					await loadConfigurationTemplateForSchoolExternalTool("schoolExternalToolId");

					expect(apiMock.toolConfigurationControllerGetConfigurationTemplateForSchool).toHaveBeenCalledWith(
						"schoolExternalToolId"
					);
				});

				it("should set the state", async () => {
					const { toolConfigurationTemplate } = setup();
					const { schoolExternalToolConfigurationTemplates, loadConfigurationTemplateForSchoolExternalTool } =
						useSchoolExternalToolConfigurator();

					await loadConfigurationTemplateForSchoolExternalTool("schoolExternalToolId");

					expect(schoolExternalToolConfigurationTemplates.value).toEqual<SchoolExternalToolConfigurationTemplate[]>([
						{
							externalToolId: toolConfigurationTemplate.externalToolId,
							name: toolConfigurationTemplate.name,
							baseUrl: toolConfigurationTemplate.baseUrl,
							parameters: [
								{
									name: toolConfigurationTemplate.parameters[0].name,
									displayName: toolConfigurationTemplate.parameters[0].displayName,
									scope: ToolParameterScope.Context,
									type: ToolParameterType.String,
									location: ToolParameterLocation.BODY,
									defaultValue: toolConfigurationTemplate.parameters[0].defaultValue,
									description: toolConfigurationTemplate.parameters[0].description,
									isOptional: toolConfigurationTemplate.parameters[0].isOptional,
									isProtected: toolConfigurationTemplate.parameters[0].isProtected,
									regex: toolConfigurationTemplate.parameters[0].regex,
									regexComment: toolConfigurationTemplate.parameters[0].regexComment,
								},
							],
							logoUrl: toolConfigurationTemplate.logoUrl,
							isDeactivated: false,
						},
					]);
				});
			});

			describe("when an error occurs", () => {
				it("should notify error", async () => {
					const consoleSpy = vi.spyOn(console, "error").mockImplementation(vi.fn());
					apiMock.toolConfigurationControllerGetConfigurationTemplateForSchool.mockRejectedValue("error");

					const { loadConfigurationTemplateForSchoolExternalTool } = useSchoolExternalToolConfigurator();
					await loadConfigurationTemplateForSchoolExternalTool("schoolExternalToolId");

					expectNotification("error");
					consoleSpy.mockRestore();
				});
			});
		});

		describe("createSchoolExternalTool is called", () => {
			describe("when it successfully calls the api", () => {
				const setup = () => {
					const schoolExternalTool = schoolExternalToolSaveFactory.build({
						parameters: toolParameterEntryFactory.buildList(1),
					});

					return {
						schoolExternalTool,
					};
				};

				it("should call the toolApi.toolSchoolControllerCreateSchoolExternalTool", async () => {
					const { schoolExternalTool } = setup();
					const { createSchoolExternalTool } = useSchoolExternalToolConfigurator();

					await createSchoolExternalTool(schoolExternalTool);

					expect(apiMock.toolSchoolControllerCreateSchoolExternalTool).toHaveBeenCalledWith<
						[SchoolExternalToolPostParams]
					>({
						toolId: schoolExternalTool.toolId,
						schoolId: schoolExternalTool.schoolId,
						parameters: [
							{
								name: schoolExternalTool.parameters[0].name,
								value: schoolExternalTool.parameters[0].value,
							},
						],
						isDeactivated: false,
					});
				});
			});
		});

		describe("updateSchoolExternalTool is called", () => {
			describe("when it successfully calls the api", () => {
				const setup = () => {
					const schoolExternalTool = schoolExternalToolSaveFactory.build();

					return {
						schoolExternalTool,
					};
				};

				it("should call the toolApi.toolSchoolControllerUpdateSchoolExternalTool", async () => {
					const { schoolExternalTool } = setup();
					const { updateSchoolExternalTool } = useSchoolExternalToolConfigurator();

					await updateSchoolExternalTool({
						schoolExternalToolId: "schoolExternalToolId",
						schoolExternalTool: schoolExternalTool,
					});

					expect(apiMock.toolSchoolControllerUpdateSchoolExternalTool).toHaveBeenCalledWith<
						[string, SchoolExternalToolPostParams]
					>("schoolExternalToolId", {
						toolId: schoolExternalTool.toolId,
						schoolId: schoolExternalTool.schoolId,
						parameters: [],
						isDeactivated: false,
					});
				});
			});
		});
	});
});
