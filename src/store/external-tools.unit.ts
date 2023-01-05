import ExternalToolsModule from "./external-tools";
import {SchoolExternalToolStatus, SchoolExternalTool} from "./types/school-external-tool";

describe('ExternalToolsModule', () => {
	let externalToolsModule: ExternalToolsModule;

	beforeEach(() => {
		externalToolsModule = new ExternalToolsModule({});
	})

	const setup = () => {
		const setSchoolExternalToolsSpy = jest.spyOn(externalToolsModule, "setSchoolExternalTools");
		const loadSchoolExternalToolsSpy = jest.spyOn(externalToolsModule, "loadSchoolExternalTools");

		const schoolExternalTools: SchoolExternalTool[] = [
			{
				name: "Test",
				status: SchoolExternalToolStatus.Latest,
				id: "testId",
				version: 1,
			},
			{
				name: "Test2",
				status: SchoolExternalToolStatus.Outdated,
				id: "testId2",
				version: 1,
			},
		];
		externalToolsModule.schoolExternalTools = schoolExternalTools;

		return {
			setSchoolExternalToolsSpy,
			loadSchoolExternalToolsSpy,
			schoolExternalTools
		}
	}

	describe("getSchoolExternalTools is called", () => {
		describe("when getter is called", () => {
			it("should initialized as empty array", () => {
				externalToolsModule = new ExternalToolsModule({});

				const tools: SchoolExternalTool[] = externalToolsModule.getSchoolExternalTools;

				expect(tools.length).toEqual(0);
			})

			it("should return the state of schoolExternalTools", () => {
				const { schoolExternalTools } = setup();

				const tools: SchoolExternalTool[] = externalToolsModule.getSchoolExternalTools;

				expect(tools).toEqual(schoolExternalTools);
			})
		})
	})

	describe("setSchoolExternalTools is called", () => {
		describe("when setter is called", () => {
			it("should set the new state", () => {
				setup();
				// const expectedName = 'NewTool';

				// externalToolsModule.setSchoolExternalTools([{ id: "id", name: expectedName, status: SchoolExternalToolStatus.Latest }]);

				const tools: SchoolExternalTool[] = externalToolsModule.getSchoolExternalTools;
				expect(tools.length).toEqual(1);
				expect(tools[0].name).toEqual("NewTool");
			})
		})
	})

	describe('loadSchoolExternalTools is called', () => {
		// TODO: test after implementation
	});
});
