import AuthModule from "@/store/auth";
import ContextExternalToolsModule from "@/store/context-external-tool";
import { ContextExternalTool } from "@/store/external-tool/context-external-tool";
import { createModuleMocks } from "@/utils/mock-store-module";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { mount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import ExternalToolsModule from "@/store/external-tools";
import { contextExternalToolFactory } from "@@/tests/test-utils/factory/contextExternalToolFactory";
import RoomExternalToolsOverview from "./RoomExternalToolsOverview.vue";

describe("RoomExternalToolOverview", () => {
	const getWrapper = (tools: ContextExternalTool[]) => {
		document.body.setAttribute("data-app", "true");

		const authModule = createModuleMocks(AuthModule, {
			getUserPermissions: ["CONTEXT_TOOL_ADMIN"],
		});

		const contextExternalToolsModule = createModuleMocks(
			ContextExternalToolsModule,
			{
				getContextExternalTools: tools,
			}
		);

		const externalToolsModule = createModuleMocks(ExternalToolsModule);

		const wrapper: Wrapper<Vue> = mount(RoomExternalToolsOverview, {
			...createComponentMocks({
				i18n: true,
				mocks: {
					$t: (key: string): string => key,
				},
			}),
			provide: {
				authModule,
				contextExternalToolsModule,
				externalToolsModule,
				i18n: undefined,
			},
		});

		return {
			wrapper,
			externalToolsModule,
			authModule,
			contextExternalToolsModule,
		};
	};

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("when no tools are in the list", () => {
		const setup = () => {
			const { wrapper } = getWrapper([]);

			return {
				wrapper,
			};
		};

		it("should display empty state", () => {
			const { wrapper } = setup();

			expect(wrapper.findComponent({ ref: "tools-empty-state" }).exists()).toBe(
				true
			);
		});
	});

	describe("when there are tools in the list", () => {
		const setup = () => {
			const tools: ContextExternalTool[] =
				contextExternalToolFactory.buildList(2);

			const { wrapper } = getWrapper(tools);

			return {
				wrapper,
			};
		};

		it("should display the tools", () => {
			const { wrapper } = setup();

			const cards = wrapper.findAllComponents({
				name: "room-external-tool-card",
			});

			expect(cards.length).toEqual(2);
		});
	});

	describe("when clicking the delete button on a tool", () => {
		const setup = () => {
			const tool: ContextExternalTool = contextExternalToolFactory.build();

			const { wrapper } = getWrapper([tool]);

			return {
				wrapper,
			};
		};

		it("should open the delete dialog", async () => {
			const { wrapper } = setup();

			const card = wrapper.findComponent({
				name: "room-external-tool-card",
			});

			await card.trigger("delete");

			const deleteDialog = wrapper.find('[data-testid="delete-dialog"]');

			expect(deleteDialog.isVisible()).toEqual(true);
		});
	});

	describe("when clicking on a tool", () => {
		const setup = () => {
			const tool: ContextExternalTool = contextExternalToolFactory.build();

			const { wrapper, externalToolsModule } = getWrapper([tool]);

			return {
				wrapper,
				externalToolsModule,
				tool,
			};
		};

		it("should fetch the launch data", async () => {
			const { wrapper, externalToolsModule, tool } = setup();

			const card = wrapper.findComponent({
				name: "room-external-tool-card",
			});

			await card.trigger("click");

			expect(externalToolsModule.getToolLaunchData).toHaveBeenCalledWith(
				tool.id
			);
		});
	});
});
