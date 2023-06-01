import { MountOptions, mount, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import Vue from "vue";
import { ContextExternalTool } from "@/store/external-tool/context-external-tool";
import RoomExternalToolCard from "./RoomExternalToolCard.vue";

describe("RoomExternalToolCard", () => {
	const getWrapper = (tool: ContextExternalTool, canEdit: boolean) => {
		document.body.setAttribute("data-app", "true");

		const wrapper: Wrapper<Vue> = mount(
			RoomExternalToolCard as MountOptions<Vue>,
			{
				...createComponentMocks({
					i18n: true,
					mocks: {
						$t: (key: string): string => key,
					},
				}),
				propsData: {
					tool,
					canEdit,
				},
				provide: {
					i18n: undefined,
				},
			}
		);

		return wrapper;
	};

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("when the tool has a name", () => {
		const setup = () => {
			const tool: ContextExternalTool = {
				name: "mockName",
				openInNewTab: true,
			};

			const wrapper: Wrapper<Vue> = getWrapper(tool, true);

			return {
				wrapper,
				tool,
			};
		};

		it("should not display a title", async () => {
			const { wrapper, tool } = setup();

			const title = wrapper.find("h5");

			expect(title.text()).toEqual(tool.name);
		});
	});

	describe("when the tool has a logoUrl", () => {
		const setup = () => {
			const tool: ContextExternalTool = {
				name: "mockName",
				openInNewTab: true,
				logoUrl: "mockLogoUrl",
			};

			const wrapper: Wrapper<Vue> = getWrapper(tool, true);

			return {
				wrapper,
				tool,
			};
		};

		it("should display a logo", async () => {
			const { wrapper } = setup();

			const logo = wrapper.find('[data-testid="tool-card-logo"]');

			expect(logo.exists()).toEqual(true);
		});
	});

	describe("when the tool has no logoUrl", () => {
		const setup = () => {
			const tool: ContextExternalTool = {
				name: "mockName",
				openInNewTab: true,
			};

			const wrapper: Wrapper<Vue> = getWrapper(tool, true);

			return {
				wrapper,
				tool,
			};
		};

		it("should not display a logo", async () => {
			const { wrapper } = setup();

			const logo = wrapper.find('[data-testid="tool-card-logo"]');

			expect(logo.exists()).toEqual(false);
		});
	});

	describe("when the tool is opened in a new tab", () => {
		const setup = () => {
			const tool: ContextExternalTool = {
				name: "mockName",
				openInNewTab: true,
				logoUrl: "mockLogoUrl",
			};

			const wrapper: Wrapper<Vue> = getWrapper(tool, true);

			return {
				wrapper,
				tool,
			};
		};

		it("should display a 'open in new tab'-text", async () => {
			const { wrapper } = setup();

			const newTabText = wrapper.find('[data-testid="tool-card-new-tab-text"]');

			expect(newTabText.text()).toEqual("(pages.rooms.tools.newTab)");
		});
	});

	describe("when the tool is in the same window", () => {
		const setup = () => {
			const tool: ContextExternalTool = {
				name: "mockName",
				openInNewTab: false,
				logoUrl: "mockLogoUrl",
			};

			const wrapper: Wrapper<Vue> = getWrapper(tool, true);

			return {
				wrapper,
				tool,
			};
		};

		it("should not display a 'open in new tab'-text", async () => {
			const { wrapper } = setup();

			const newTabText = wrapper.find('[data-testid="tool-card-new-tab-text"]');

			expect(newTabText.exists()).toEqual(false);
		});
	});

	describe("when the user clicks the card", () => {
		const setup = () => {
			const tool: ContextExternalTool = {
				name: "mockName",
				openInNewTab: true,
				logoUrl: "mockLogoUrl",
			};

			const wrapper: Wrapper<Vue> = getWrapper(tool, true);

			return {
				wrapper,
				tool,
			};
		};

		it("should emit the click event", async () => {
			const { wrapper, tool } = setup();

			await wrapper.trigger("click");

			expect(wrapper.emitted("click")).toContainEqual([tool]);
		});
	});

	describe("when the user can edit the tool card", () => {
		const setup = () => {
			const tool: ContextExternalTool = {
				name: "mockName",
				openInNewTab: true,
				logoUrl: "mockLogoUrl",
			};

			const wrapper: Wrapper<Vue> = getWrapper(tool, true);

			return {
				wrapper,
				tool,
			};
		};

		it("should display the item menu", () => {
			const { wrapper } = setup();

			const itemMenu = wrapper.find('[data-testid="tool-card-menu"]');

			expect(itemMenu.isVisible()).toEqual(true);
		});

		it("should display the edit menu item", async () => {
			const { wrapper } = setup();

			const itemMenu = wrapper.find(
				'[data-testid="tool-card-menu"] > .three-dot-button'
			);
			await itemMenu.trigger("click");

			const toolEditMenuItem = wrapper.find('[data-testid="tool-edit"]');

			expect(toolEditMenuItem.exists()).toEqual(true);
		});

		it("should display the delete menu item", async () => {
			const { wrapper } = setup();

			const itemMenu = wrapper.find(
				'[data-testid="tool-card-menu"] > .three-dot-button'
			);
			await itemMenu.trigger("click");

			const toolDeleteMenuItem = wrapper.find('[data-testid="tool-delete"]');

			expect(toolDeleteMenuItem.exists()).toEqual(true);
		});

		describe("when clicking on the edit menu item", () => {
			it("should emit the edit event", async () => {
				const { wrapper, tool } = setup();

				const itemMenu = wrapper.find(
					'[data-testid="tool-card-menu"] > .three-dot-button'
				);
				await itemMenu.trigger("click");

				const toolDeleteMenuItem = wrapper.find('[data-testid="tool-edit"]');
				await toolDeleteMenuItem.trigger("click");

				expect(wrapper.emitted("edit")).toContainEqual([tool]);
			});
		});

		describe("when clicking on the delete menu item", () => {
			it("should emit the delete event", async () => {
				const { wrapper, tool } = setup();

				const itemMenu = wrapper.find(
					'[data-testid="tool-card-menu"] > .three-dot-button'
				);
				await itemMenu.trigger("click");

				const toolDeleteMenuItem = wrapper.find('[data-testid="tool-delete"]');
				await toolDeleteMenuItem.trigger("click");

				expect(wrapper.emitted("delete")).toContainEqual([tool]);
			});
		});
	});

	describe("when the user cannot edit the tool card", () => {
		const setup = () => {
			const tool: ContextExternalTool = {
				name: "mockName",
				openInNewTab: true,
				logoUrl: "mockLogoUrl",
			};

			const wrapper: Wrapper<Vue> = getWrapper(tool, false);

			return { wrapper };
		};

		it("should not display the item menu", () => {
			const { wrapper } = setup();

			const itemMenu = wrapper.find('[data-testid="tool-card-menu"]');

			expect(itemMenu.exists()).toEqual(false);
		});
	});
});
