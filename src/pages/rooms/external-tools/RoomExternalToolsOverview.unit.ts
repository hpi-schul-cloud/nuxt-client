import { mount, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import Vue from "vue";
import AuthModule from "@/store/auth";
import { createModuleMocks } from "@/utils/mock-store-module";
import ContextExternalToolsModule from "@/store/context-external-tool";
import { ContextExternalTool } from "@/store/external-tool/context-external-tool";
import RoomExternalToolsOverview from "./RoomExternalToolsOverview.vue";
import { I18N_KEY } from "@/utils/inject";

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
				[I18N_KEY as symbol]: {
					$t: (key: string): string => key,
					tc: (key: string): string => key,
				},
			},
		});

		return wrapper;
	};

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("when no tools are in the list", () => {
		const setup = () => {
			const wrapper: Wrapper<Vue> = getWrapper([]);

			return {
				wrapper,
			};
		};

		it("should display a empty state text", () => {
			const { wrapper } = setup();

			const title = wrapper.find('[data-testid="tools-empty-state"] > h4');

			expect(title.text()).toEqual("pages.rooms.tools.emptyState");
		});
	});

	describe("when there are tools in the list", () => {
		const setup = () => {
			const tool: ContextExternalTool = {
				name: "mockTool",
				openInNewTab: false,
			};

			const wrapper: Wrapper<Vue> = getWrapper([tool, tool]);

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
			const tool: ContextExternalTool = {
				name: "mockTool",
				openInNewTab: false,
			};

			const wrapper: Wrapper<Vue> = getWrapper([tool]);

			return {
				wrapper,
			};
		};

		it("should open the delete dialog", async () => {
			const { wrapper } = setup();

			const card = wrapper.findComponent({
				name: "room-external-tool-card",
			});
			card.trigger("delete");

			const deleteDialog = wrapper.find('[data-testid="delete-dialog"]');

			expect(deleteDialog.isVisible()).toEqual(true);
		});
	});
});
