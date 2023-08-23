import { ContextExternalToolSave } from "../context-external-tool";
import { ContextExternalToolMapper } from "./context-external-tool.mapper";
import { contextExternalToolConfigurationTemplateFactory } from "@@/tests/test-utils";
import { ToolContextType } from "@/store/external-tool";

describe("ContextExternalToolMapper", () => {
	describe("mapTemplateToContextExternalToolSave", () => {
		describe("when the display name is provided", () => {
			const setup = () => {
				const template =
					contextExternalToolConfigurationTemplateFactory.build();
				const contextId = "contextId";
				const contextType = ToolContextType.COURSE;
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

				const result =
					ContextExternalToolMapper.mapTemplateToContextExternalToolSave(
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

		describe("when the display name is not provided", () => {
			const setup = () => {
				const template = contextExternalToolConfigurationTemplateFactory.build({
					name: "toolName",
				});
				const contextId = "contextId";
				const contextType = ToolContextType.COURSE;

				return {
					template,
					contextId,
					contextType,
				};
			};

			it("should map the tool name to display name", () => {
				const { template, contextId, contextType } = setup();

				const result =
					ContextExternalToolMapper.mapTemplateToContextExternalToolSave(
						template,
						[],
						contextId,
						contextType,
						undefined
					);

				expect(result).toEqual(
					expect.objectContaining<Partial<ContextExternalToolSave>>({
						displayName: template.name,
					})
				);
			});
		});
	});
});
