import { contextExternalToolConfigurationTemplateFactory } from "@@/tests/test-utils";
import { ContextExternalToolSave } from "../context-external-tool";
import { ToolContextType } from "../tool-context-type.enum";
import { ContextExternalToolMapper } from "./context-external-tool.mapper";

describe("ContextExternalToolMapper", () => {
	describe("mapTemplateToContextExternalToolSave", () => {
		const setup = () => {
			const template = contextExternalToolConfigurationTemplateFactory.build();
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
});
