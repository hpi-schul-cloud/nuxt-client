import {
	SchoolExternalToolSearchListResponse
} from "@store/school-external-tool/school-external-tool-search-list.response";
import { SchoolExternalToolResponse } from "@store/school-external-tool/school-external-tool.response";
import { SchoolExternalToolStatusResponse } from "@store/school-external-tool/school-external-tool-status.response";
import { useSchoolExternalToolUtils } from "./school-external-tool-utils.composable";
import { SchoolExternalToolStatus, SchoolExternalTool } from "@store/types/school-external-tool";
import { DataTableHeader } from "vuetify";
import { externalToolsModule } from "@utils/store-accessor";

jest.mock("@utils/store-accessor", () => ({
	externalToolsModule: {
		getSchoolExternalTools: jest.fn().mockReturnValue([{
			id: 'toolId',
			name: 'toolName',
			version: 1,
			status: SchoolExternalToolStatus.Latest,
		}])
	},
}));

describe('useSchoolExternalToolUtils', () => {
	const setup = () => {
		const expectedTranslation = "translated";
		const tMock = jest.fn().mockReturnValue(expectedTranslation);

		const {
			mapSchoolExternalToolSearchListResponse,
			getHeaders,
			getItems,
		} = useSchoolExternalToolUtils(tMock);

		const toolResponse: SchoolExternalToolResponse = {
			name: 'toolName',
			toolId: 'toolId',
			toolVersion: 1,
			schoolId: 'schoolId',
			parameters: [{
				name: 'name',
				value: 'value'
			}],
			status: SchoolExternalToolStatusResponse.LATEST,
		}
		const listResponse: SchoolExternalToolSearchListResponse = {
			data: [toolResponse]
		}

		return {
			mapSchoolExternalToolSearchListResponse,
			getHeaders,
			getItems,
			listResponse,
			toolResponse,
			tMock,
			expectedTranslation,
		}
	}

	describe('mapSchoolExternalToolSearchListResponse is called', () => {
		describe('when maps the response', () => {
			it('should return a schoolExternalTool array', () => {
				const { mapSchoolExternalToolSearchListResponse, listResponse } = setup();

				const schoolExternalTools: SchoolExternalTool[] = mapSchoolExternalToolSearchListResponse(listResponse);

				expect(Array.isArray(schoolExternalTools)).toBeTruthy();
			});

			it('should map the response correctly', () => {
				const { mapSchoolExternalToolSearchListResponse, listResponse, toolResponse } = setup();

				const schoolExternalTools: SchoolExternalTool[] = mapSchoolExternalToolSearchListResponse(listResponse);

				expect(schoolExternalTools).toEqual(expect.objectContaining<SchoolExternalTool[]>([{
					id: toolResponse.toolId,
					name: toolResponse.name,
					version: toolResponse.toolVersion,
					status: SchoolExternalToolStatus.Latest,
				}]))
			})
		})
	})

	describe('getHeaders is called', () => {
		it('should return a dataTableHeader array', () => {
			const { getHeaders } = setup();

			const headers: DataTableHeader[] = getHeaders;

			expect(Array.isArray(headers)).toBeTruthy();
		})

		describe('when translate the headers', () => {
			it('should call the translation function for name', () => {
				const { getHeaders, tMock } = setup();

				getHeaders;

				expect(tMock).toHaveBeenCalledWith("common.labels.name");
			})

			it('should call the translation function for value', () => {
				const { getHeaders, tMock } = setup();

				getHeaders;

				expect(tMock).toHaveBeenCalledWith("components.administration.externalToolsSection.table.header.status");
			})
		})

		it('should return the correct headers', () => {
			const { getHeaders, expectedTranslation } = setup();

			const headers: DataTableHeader[] = getHeaders;

			expect(headers[0]).toEqual({
				text: expectedTranslation,
				value: "name"
			})
			expect(headers[1]).toEqual({
				text: expectedTranslation,
				value: "status"
			})
			expect(headers[2]).toEqual({
				text: "",
				value: "actions",
				sortable: false,
				align: "end",
				width: "90px",
			})
		})
	})

	describe('getItems is called', () => {
		it('should call the externalToolsModule', () => {
			const { getItems } = setup();

			getItems(externalToolsModule);

			expect(externalToolsModule.getSchoolExternalTools).toHaveBeenCalled();
		})
	})
});
