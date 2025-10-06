import { ContextExternalToolMapper } from "./context-external-tool.mapper";
import { ContextExternalToolSave } from "./types";
import { ToolContextType } from "@/serverApi/v3";
import { contextExternalToolConfigurationTemplateFactory } from "@@/tests/test-utils";

describe("ContextExternalToolMapper", () => {
	describe("mapTemplateToContextExternalToolSave", () => {
		describe("when the display name is provided", () => {
			const setup = () => {
				const template = contextExternalToolConfigurationTemplateFactory.build();
				const contextId = "contextId";
				const contextType = ToolContextType.Course;
				const displayName = "Test Name";

				return {
					template,
					contextId,
					contextType,
					displayName,
				};
			};

			it("should map the display name", () => {
				const { template, contextId, contextType, displayName } = setup();

				const result = ContextExternalToolMapper.mapTemplateToContextExternalToolSave(
					template,
					[],
					contextId,
					contextType,
					displayName
				);

				expect(result).toEqual(
					expect.objectContaining<Partial<ContextExternalToolSave>>({
						displayName,
					})
				);
			});
		});

		describe("when the display name is empty", () => {
			const setup = () => {
				const template = contextExternalToolConfigurationTemplateFactory.build({
					name: "toolName",
				});
				const contextId = "contextId";
				const contextType = ToolContextType.Course;

				return {
					template,
					contextId,
					contextType,
				};
			};

			it("should not set a display name", () => {
				const { template, contextId, contextType } = setup();

				const result = ContextExternalToolMapper.mapTemplateToContextExternalToolSave(
					template,
					[],
					contextId,
					contextType,
					""
				);

				expect(result).toEqual(
					expect.objectContaining<Partial<ContextExternalToolSave>>({
						displayName: undefined,
					})
				);
			});
		});
	});
});
