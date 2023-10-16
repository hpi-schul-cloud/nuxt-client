import { mount, MountOptions, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import Vue from "vue";
import { ExternalToolDisplayData } from "@/store/external-tool/external-tool-display-data";
import { externalToolDisplayDataFactory } from "@@/tests/test-utils/factory/externalToolDisplayDataFactory";
import EnvConfigModule from "@/store/env-config";
import { createModuleMocks } from "@/utils/mock-store-module";
import RoomExternalToolCard from "./RoomExternalToolCard.vue";
import {
	ENV_CONFIG_MODULE_KEY,
	EXTERNAL_TOOLS_MODULE_KEY,
	I18N_KEY,
} from "@/utils/inject";
import { ToolConfigurationStatus } from "@/store/external-tool";
import ExternalToolsModule from "@/store/external-tools";
import flushPromises from "flush-promises";
import { toolLaunchRequestResponseFactory } from "@@/tests/test-utils";
import { ToolLaunchRequestResponse } from "@/serverApi/v3";

describe("RoomExternalToolCard", () => {
	const getWrapper = (
		tool: ExternalToolDisplayData,
		canEdit: boolean,
		externalToolsModuleMock = createModuleMocks(ExternalToolsModule)
	) => {
		document.body.setAttribute("data-app", "true");

		const envConfigModule = createModuleMocks(EnvConfigModule, {
			getCtlContextConfigurationEnabled: true,
		});

		const wrapper: Wrapper<Vue> = mount(
			RoomExternalToolCard as MountOptions<Vue>,
			{
				...createComponentMocks({
					i18n: true,
				}),
				propsData: {
					tool,
					canEdit,
				},
				provide: {
					[I18N_KEY.valueOf()]: {
						$t: (key: string): string => key,
						tc: (key: string): string => key,
					},
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
					[EXTERNAL_TOOLS_MODULE_KEY.valueOf()]: externalToolsModuleMock,
				},
			}
		);

		return {
			wrapper,
		};
	};

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("tool status", () => {
		describe("when tool status is outdated", () => {
			const setup = () => {
				const tool: ExternalToolDisplayData =
					externalToolDisplayDataFactory.build({
						status: ToolConfigurationStatus.Outdated,
					});

				const { wrapper } = getWrapper(tool, false);

				return {
					wrapper,
					tool,
				};
			};

			it("should display outdated chip", () => {
				const { wrapper } = setup();

				const statusChip = wrapper.find('[data-testId="tool-card-status"]');

				expect(statusChip.text()).toEqual("pages.rooms.tools.outdated");
			});
		});

		describe("when tool status is not outdated", () => {
			const setup = () => {
				const tool: ExternalToolDisplayData =
					externalToolDisplayDataFactory.build({
						status: ToolConfigurationStatus.Latest,
					});

				const { wrapper } = getWrapper(tool, false);

				return {
					wrapper,
					tool,
				};
			};

			it("should display no chip", () => {
				const { wrapper } = setup();

				const statusChip = wrapper.find(
					'[data-testId="tool-card-status-text"]'
				);

				expect(statusChip.exists()).toEqual(false);
			});
		});
	});

	describe("when the user clicks the card", () => {
		describe("when there was no error while loading launch request", () => {
			const setup = async () => {
				const toolDisplayData: ExternalToolDisplayData =
					externalToolDisplayDataFactory.build();

				const launchRequest: ToolLaunchRequestResponse =
					toolLaunchRequestResponseFactory.build();

				const externalToolsModuleMock = createModuleMocks(ExternalToolsModule);
				externalToolsModuleMock.loadToolLaunchData.mockResolvedValueOnce(
					launchRequest
				);

				const { wrapper } = getWrapper(
					toolDisplayData,
					true,
					externalToolsModuleMock
				);

				await flushPromises();

				return {
					wrapper,
					toolDisplayData,
					launchRequest,
				};
			};

			it("should emit the click event", async () => {
				const { wrapper, toolDisplayData, launchRequest } = await setup();

				await wrapper.trigger("click");

				expect(wrapper.emitted("click")).toContainEqual([
					launchRequest,
					toolDisplayData,
				]);
			});
		});

		describe("when loading error is set", () => {
			const setup = async () => {
				const toolDisplayData: ExternalToolDisplayData =
					externalToolDisplayDataFactory.build();

				const launchRequest: ToolLaunchRequestResponse =
					toolLaunchRequestResponseFactory.build();

				const externalToolsModuleMock = createModuleMocks(ExternalToolsModule);
				externalToolsModuleMock.loadToolLaunchData.mockRejectedValueOnce(
					new Error()
				);

				const { wrapper } = getWrapper(
					toolDisplayData,
					true,
					externalToolsModuleMock
				);

				await flushPromises();

				return {
					wrapper,
					toolDisplayData,
					launchRequest,
				};
			};

			it("should emit the error event", async () => {
				const { wrapper, toolDisplayData } = await setup();

				await wrapper.trigger("click");

				expect(wrapper.emitted("error")).toContainEqual([toolDisplayData]);
			});
		});
	});

	describe("when the user can edit the tool card", () => {
		const setup = () => {
			const tool: ExternalToolDisplayData =
				externalToolDisplayDataFactory.build();

			const { wrapper } = getWrapper(tool, true);

			return {
				wrapper,
				tool,
			};
		};

		it("should display the item menu", () => {
			const { wrapper } = setup();

			const itemMenu = wrapper.find('[data-testId="tool-card-menu"]');

			expect(itemMenu.isVisible()).toEqual(true);
		});

		it("should display the edit menu item", async () => {
			const { wrapper } = setup();

			const itemMenu = wrapper.find(
				'[data-testId="tool-card-menu"] > .three-dot-button'
			);
			await itemMenu.trigger("click");

			const toolEditMenuItem = wrapper.find('[data-testId="tool-edit"]');

			expect(toolEditMenuItem.exists()).toEqual(true);
		});

		it("should display the delete menu item", async () => {
			const { wrapper } = setup();

			const itemMenu = wrapper.find(
				'[data-testId="tool-card-menu"] > .three-dot-button'
			);
			await itemMenu.trigger("click");

			const toolDeleteMenuItem = wrapper.find('[data-testId="tool-delete"]');

			expect(toolDeleteMenuItem.exists()).toEqual(true);
		});

		describe("when clicking on the edit menu item", () => {
			it("should emit the edit event", async () => {
				const { wrapper, tool } = setup();

				const itemMenu = wrapper.find(
					'[data-testId="tool-card-menu"] > .three-dot-button'
				);
				await itemMenu.trigger("click");

				const toolDeleteMenuItem = wrapper.find('[data-testId="tool-edit"]');
				await toolDeleteMenuItem.trigger("click");

				expect(wrapper.emitted("edit")).toContainEqual([tool]);
			});
		});

		describe("when clicking on the delete menu item", () => {
			it("should emit the delete event", async () => {
				const { wrapper, tool } = setup();

				const itemMenu = wrapper.find(
					'[data-testId="tool-card-menu"] > .three-dot-button'
				);
				await itemMenu.trigger("click");

				const toolDeleteMenuItem = wrapper.find('[data-testId="tool-delete"]');
				await toolDeleteMenuItem.trigger("click");

				expect(wrapper.emitted("delete")).toContainEqual([tool]);
			});
		});
	});

	describe("when the user cannot edit the tool card", () => {
		const setup = () => {
			const tool: ExternalToolDisplayData =
				externalToolDisplayDataFactory.build();

			const { wrapper } = getWrapper(tool, false);

			return { wrapper };
		};

		it("should not display the item menu", () => {
			const { wrapper } = setup();

			const itemMenu = wrapper.find('[data-testId="tool-card-menu"]');

			expect(itemMenu.exists()).toEqual(false);
		});
	});
});
