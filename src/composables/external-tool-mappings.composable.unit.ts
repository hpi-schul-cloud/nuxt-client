import {
	SchoolExternalToolResponse,
	SchoolExternalToolResponseStatusEnum,
	SchoolExternalToolSearchListResponse,
} from "../serverApi/v3";
import { useExternalToolMappings } from "./external-tool-mappings.composable";
import {
	SchoolExternalTool,
	SchoolExternalToolStatus,
} from "@/store/external-tool";
import { SchoolExternalToolItem } from "@/components/administration/school-external-tool-item";
import { BusinessError } from "@/store/types/commons";

jest.mock("@/store/store-accessor", () => ({
	externalToolsModule: {
		getSchoolExternalTools: [
			{
				id: "id",
				name: "toolName",
				version: 1,
				status: "Latest",
			},
		],
	},
}));

describe("useExternalToolUtils", () => {
	const setup = () => {
		const {
			mapSchoolExternalToolResponse,
			mapSchoolExternalToolSearchListResponse,
			mapSchoolExternalToolItemToSchoolExternalTool,
			getTranslationKey,
		} = useExternalToolMappings();

		const toolResponse: SchoolExternalToolResponse = {
			id: "id",
			name: "toolName",
			toolId: "toolId",
			toolVersion: 1,
			schoolId: "schoolId",
			parameters: [
				{
					name: "name",
					value: "value",
				},
			],
			status: SchoolExternalToolResponseStatusEnum.Latest,
		};
		const listResponse: SchoolExternalToolSearchListResponse = {
			data: [toolResponse],
		};

		const schoolExternaToolItem: SchoolExternalToolItem = {
			name: toolResponse.name,
			id: toolResponse.id,
			status: SchoolExternalToolStatus.Latest,
			outdated: false,
		};

		return {
			listResponse,
			toolResponse,
			schoolExternaToolItem,
			mapSchoolExternalToolSearchListResponse,
			mapSchoolExternalToolResponse,
			mapSchoolExternalToolItemToSchoolExternalTool,
			getTranslationKey,
		};
	};

	describe("mapSchoolExternalToolSearchListResponse is called", () => {
		describe("when maps the response", () => {
			it("should return a schoolExternalTool array", () => {
				const { mapSchoolExternalToolSearchListResponse, listResponse } =
					setup();

				const schoolExternalTools: SchoolExternalTool[] =
					mapSchoolExternalToolSearchListResponse(listResponse);

				expect(Array.isArray(schoolExternalTools)).toBeTruthy();
			});

			it("should map the response correctly", () => {
				const {
					mapSchoolExternalToolSearchListResponse,
					listResponse,
					toolResponse,
				} = setup();

				const schoolExternalTools: SchoolExternalTool[] =
					mapSchoolExternalToolSearchListResponse(listResponse);

				expect(schoolExternalTools).toEqual(
					expect.objectContaining<SchoolExternalTool[]>([
						{
							id: toolResponse.id,
							name: toolResponse.name,
							version: toolResponse.toolVersion,
							status: SchoolExternalToolStatus.Latest,
						},
					])
				);
			});
		});
	});

	describe("mapSchoolExternalToolItemToSchoolExternalTool is called", () => {
		it("should return mapped schoolExternalTool", () => {
			const {
				mapSchoolExternalToolItemToSchoolExternalTool,
				schoolExternaToolItem,
			} = setup();

			const schoolExternalTool: SchoolExternalTool =
				mapSchoolExternalToolItemToSchoolExternalTool(schoolExternaToolItem);

			expect(schoolExternalTool).toEqual(
				expect.objectContaining<SchoolExternalTool>({
					id: schoolExternaToolItem.id,
					name: schoolExternaToolItem.name,
					status: SchoolExternalToolStatus.Unknown,
				})
			);
		});
	});

	describe("getTranslationKey", () => {
		it("should return translation key when message was found", () => {
			const { getTranslationKey } = setup();
			const error: BusinessError = {
				statusCode: "400",
				message: "tool_param_duplicate: Some validationError was thrown",
			};

			const translationKey = getTranslationKey(error);
			expect(translationKey).toEqual(
				"pages.tool.apiError.tool_param_duplicate"
			);
		});

		it("should return original message when key was not found", () => {
			const { getTranslationKey } = setup();
			const error: BusinessError = {
				statusCode: "400",
				message: "some_error: which is not defined in map",
			};

			const translationKey = getTranslationKey(error);
			expect(translationKey).toEqual(error.message);
		});
	});
});
