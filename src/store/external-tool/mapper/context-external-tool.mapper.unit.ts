import { ToolContextType } from "@/serverApi/v3";
import {
	contextExternalToolConfigurationTemplateFactory,
	contextExternalToolConfigurationTemplateResponseFactory,
} from "@@/tests/test-utils";
import { ContextExternalToolSave } from "../context-external-tool";
import { ContextExternalToolMapper } from "./context-external-tool.mapper";
import { ContextExternalToolConfigurationTemplate } from "@/store/external-tool";

describe("ContextExternalToolMapper", () => {
	describe("mapTemplateToContextExternalToolSave", () => {
		describe("when the display name is provided", () => {
			const setup = () => {
				const template =
					contextExternalToolConfigurationTemplateFactory.build();
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
				const contextType = ToolContextType.Course;

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
						contextType
					);

				expect(result).toEqual(
					expect.objectContaining<Partial<ContextExternalToolSave>>({
						displayName: template.name,
					})
				);
			});
		});
	});

	describe("mapToContextExternalToolConfigurationTemplate", () => {
		const setup = () => {
			const template =
				contextExternalToolConfigurationTemplateResponseFactory.build();

			return {
				template,
			};
		};

		it("should set isDeactivated to undefined", () => {
			const { template } = setup();

			const result: ContextExternalToolConfigurationTemplate =
				ContextExternalToolMapper.mapToContextExternalToolConfigurationTemplate(
					template
				);

			expect(result).toEqual(
				expect.objectContaining<
					Partial<ContextExternalToolConfigurationTemplate>
				>({
					isDeactivated: undefined,
				})
			);
		});
	});
});
