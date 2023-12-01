import EnvConfigModule from "@/store/env-config";
import { ExternalToolDisplayData } from "@/store/external-tool/external-tool-display-data";
import { ENV_CONFIG_MODULE_KEY, I18N_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { externalToolDisplayDataFactory } from "@@/tests/test-utils/factory/externalToolDisplayDataFactory";
import { toolLaunchRequestFactory } from "@@/tests/test-utils/factory/toolLaunchRequestFactory";
import { useExternalToolLaunchState } from "@data-external-tool";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { mount, MountOptions, Wrapper } from "@vue/test-utils";
import flushPromises from "flush-promises";
import Vue from "vue";
import RoomExternalToolCard from "./RoomExternalToolCard.vue";
import { toolConfigurationStatusFactory } from "@@/tests/test-utils";

jest.mock("@data-external-tool");

describe("RoomExternalToolCard", () => {
	let useExternalToolLaunchStateMock: DeepMocked<
		ReturnType<typeof useExternalToolLaunchState>
	>;

	beforeEach(() => {
		useExternalToolLaunchStateMock =
			createMock<ReturnType<typeof useExternalToolLaunchState>>();

		jest
			.mocked(useExternalToolLaunchState)
			.mockReturnValue(useExternalToolLaunchStateMock);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	const getWrapper = (tool: ExternalToolDisplayData, canEdit: boolean) => {
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
				},
			}
		);

		return {
			wrapper,
		};
	};

	describe("when the component is mounted and the tool is not outdated", () => {
		it("should load the launch request", async () => {
			getWrapper(
				externalToolDisplayDataFactory.build({
					status: toolConfigurationStatusFactory.build(),
				}),
				false
			);

			await Vue.nextTick();

			expect(
				useExternalToolLaunchStateMock.fetchLaunchRequest
			).toHaveBeenCalled();
		});
	});

	describe("tool status", () => {
		describe("when tool status is outdated on scope context", () => {
			const setup = () => {
				const tool: ExternalToolDisplayData =
					externalToolDisplayDataFactory.build({
						status: toolConfigurationStatusFactory.build({
							isOutdatedOnScopeContext: true,
						}),
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

			describe("when tool status is outdated on scope school", () => {
				const setup = () => {
					const tool: ExternalToolDisplayData =
						externalToolDisplayDataFactory.build({
							status: toolConfigurationStatusFactory.build({
								isOutdatedOnScopeSchool: true,
							}),
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

			describe("when tool status is outdated on scope school and context", () => {
				const setup = () => {
					const tool: ExternalToolDisplayData =
						externalToolDisplayDataFactory.build({
							status: toolConfigurationStatusFactory.build({
								isOutdatedOnScopeSchool: true,
								isOutdatedOnScopeContext: true,
							}),
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
		});

		describe("when tool status is not outdated", () => {
			const setup = () => {
				const tool: ExternalToolDisplayData =
					externalToolDisplayDataFactory.build({
						status: toolConfigurationStatusFactory.build(),
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

		describe("when the user clicks the card", () => {
			describe("when the tool is outdated on scope school", () => {
				const setup = async () => {
					const toolDisplayData: ExternalToolDisplayData =
						externalToolDisplayDataFactory.build({
							status: toolConfigurationStatusFactory.build({
								isOutdatedOnScopeSchool: true,
							}),
						});

					const { wrapper } = getWrapper(toolDisplayData, true);

					await flushPromises();

					return {
						wrapper,
						toolDisplayData,
					};
				};

				it("should emit the error event", async () => {
					const { wrapper, toolDisplayData } = await setup();

					await wrapper.trigger("click");

					expect(wrapper.emitted("error")).toEqual([[toolDisplayData]]);
				});
			});

			describe("when the tool is outdated on scope context", () => {
				const setup = async () => {
					const toolDisplayData: ExternalToolDisplayData =
						externalToolDisplayDataFactory.build({
							status: toolConfigurationStatusFactory.build({
								isOutdatedOnScopeContext: true,
							}),
						});

					const { wrapper } = getWrapper(toolDisplayData, true);

					await flushPromises();

					return {
						wrapper,
						toolDisplayData,
					};
				};

				it("should emit the error event", async () => {
					const { wrapper, toolDisplayData } = await setup();

					await wrapper.trigger("click");

					expect(wrapper.emitted("error")).toEqual([[toolDisplayData]]);
				});
			});

			describe("when the tool is outdated on scope school and context", () => {
				const setup = async () => {
					const toolDisplayData: ExternalToolDisplayData =
						externalToolDisplayDataFactory.build({
							status: toolConfigurationStatusFactory.build({
								isOutdatedOnScopeContext: true,
							}),
						});

					const { wrapper } = getWrapper(toolDisplayData, true);

					await flushPromises();

					return {
						wrapper,
						toolDisplayData,
					};
				};

				it("should emit the error event", async () => {
					const { wrapper, toolDisplayData } = await setup();

					await wrapper.trigger("click");

					expect(wrapper.emitted("error")).toEqual([[toolDisplayData]]);
				});
			});
		});

		describe("when there was no error while loading launch request", () => {
			const setup = async () => {
				const toolDisplayData: ExternalToolDisplayData =
					externalToolDisplayDataFactory.build();

				useExternalToolLaunchStateMock.toolLaunchRequest.value =
					toolLaunchRequestFactory.build();

				const { wrapper } = getWrapper(toolDisplayData, true);

				await flushPromises();

				return {
					wrapper,
				};
			};

			it("should launch the tool", async () => {
				const { wrapper } = await setup();

				await wrapper.trigger("click");

				expect(useExternalToolLaunchStateMock.launchTool).toHaveBeenCalled();
			});
		});

		describe("when the launch failed and an error is set", () => {
			const setup = async () => {
				const toolDisplayData: ExternalToolDisplayData =
					externalToolDisplayDataFactory.build();

				useExternalToolLaunchStateMock.error.value = {
					message: "mock error",
					statusCode: 400,
				};

				const { wrapper } = getWrapper(toolDisplayData, true);

				await flushPromises();

				return {
					wrapper,
					toolDisplayData,
				};
			};

			it("should emit the error event", async () => {
				const { wrapper, toolDisplayData } = await setup();

				await wrapper.trigger("click");

				expect(wrapper.emitted("error")).toEqual([[toolDisplayData]]);
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
