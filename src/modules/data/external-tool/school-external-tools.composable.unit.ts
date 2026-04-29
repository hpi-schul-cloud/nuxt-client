import { SchoolExternalTool } from "./types";
import {
	expectNotification,
	mockApi,
	mockApiResponse,
	schoolExternalToolConfigurationStatusResponseFactory,
	schoolExternalToolFactory,
	schoolExternalToolResponseFactory,
} from "@@/tests/test-utils";
import { SchoolExternalToolSearchListResponse, ToolApiInterface } from "@api-server";
import * as serverApi from "@api-server";
import { useSchoolExternalTools } from "@data-external-tool";
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
		describe("loadSchoolExternalTools is called", () => {
			describe("when it successfully calls the api", () => {
				const setup = () => {
					const schoolExternalToolResponse = schoolExternalToolResponseFactory.build({
						parameters: [{ name: "param1", value: "value1" }],
					});

					const schoolExternalTools: SchoolExternalToolSearchListResponse = {
						data: [schoolExternalToolResponse],
					};

					apiMock.toolSchoolControllerGetSchoolExternalTools.mockResolvedValue(
						mockApiResponse({ data: schoolExternalTools })
					);

					return {
						schoolExternalToolResponse,
					};
				};

				it("should call the toolApi.toolSchoolControllerGetSchoolExternalTools", async () => {
					setup();
					const { loadSchoolExternalTools } = useSchoolExternalTools();

					await loadSchoolExternalTools("schoolId");

					expect(apiMock.toolSchoolControllerGetSchoolExternalTools).toHaveBeenCalledWith("schoolId");
				});

				it("should set the state", async () => {
					const { schoolExternalToolResponse } = setup();
					const { loadSchoolExternalTools, schoolExternalTools } = useSchoolExternalTools();

					await loadSchoolExternalTools("schoolId");

					expect(schoolExternalTools.value).toEqual<SchoolExternalTool[]>([
						{
							id: schoolExternalToolResponse.id,
							toolId: schoolExternalToolResponse.toolId,
							schoolId: schoolExternalToolResponse.schoolId,
							name: schoolExternalToolResponse.name,
							parameters: [
								{
									name: schoolExternalToolResponse.parameters[0].name,
									value: schoolExternalToolResponse.parameters[0].value,
								},
							],
							status: schoolExternalToolConfigurationStatusResponseFactory.build(),
							isDeactivated: false,
						},
					]);
				});
			});

			describe("when the api call fails", () => {
				it("should not update the state", async () => {
					const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(vi.fn());
					apiMock.toolSchoolControllerGetSchoolExternalTools.mockRejectedValue(new Error("API error"));
					const { loadSchoolExternalTools, schoolExternalTools } = useSchoolExternalTools();

					await loadSchoolExternalTools("schoolId");

					expect(schoolExternalTools.value).toEqual([]);
					consoleErrorSpy.mockRestore();
				});
			});
		});

		describe("deleteSchoolExternalTool is called", () => {
			describe("when it successfully calls the api", () => {
				it("should call the toolApi.toolSchoolControllerDeleteSchoolExternalTool", async () => {
					const schoolExternalTool = schoolExternalToolFactory.build();
					const { deleteSchoolExternalTool } = useSchoolExternalTools();

					await deleteSchoolExternalTool(schoolExternalTool.id);

					expect(apiMock.toolSchoolControllerDeleteSchoolExternalTool).toHaveBeenCalledWith(schoolExternalTool.id);
				});

				it("should remove the tool from the state", async () => {
					const toolToDelete = schoolExternalToolFactory.build();
					const otherTool = schoolExternalToolFactory.build();
					const { deleteSchoolExternalTool, schoolExternalTools } = useSchoolExternalTools();

					schoolExternalTools.value = [toolToDelete, otherTool];

					await deleteSchoolExternalTool(toolToDelete.id);

					expect(schoolExternalTools.value).toEqual([otherTool]);
				});

				it("should notify success", async () => {
					const schoolExternalTool = schoolExternalToolFactory.build();
					const { deleteSchoolExternalTool } = useSchoolExternalTools();

					await deleteSchoolExternalTool(schoolExternalTool.id);

					expectNotification("success");
				});
			});

			describe("when an error occurs", () => {
				it("should set the businessError", async () => {
					const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(vi.fn());
					apiMock.toolSchoolControllerDeleteSchoolExternalTool.mockRejectedValue("error");
					const { deleteSchoolExternalTool } = useSchoolExternalTools();

					await deleteSchoolExternalTool("schoolExternalToolId");

					expectNotification("error");

					consoleErrorSpy.mockRestore();
				});
			});
		});
	});
});
