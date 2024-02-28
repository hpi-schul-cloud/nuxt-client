import EnvConfigModule from "@/store/env-config";
import { ExternalToolDisplayData } from "@/store/external-tool/external-tool-display-data";
import { ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import { ContextExternalToolConfigurationStatusFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { externalToolDisplayDataFactory } from "@@/tests/test-utils/factory/externalToolDisplayDataFactory";
import { toolLaunchRequestFactory } from "@@/tests/test-utils/factory/toolLaunchRequestFactory";
import { useExternalToolLaunchState } from "@data-external-tool";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { mount, flushPromises } from "@vue/test-utils";
import { nextTick } from "vue";
import RoomExternalToolCard from "./RoomExternalToolCard.vue";
import RoomDotMenu from "@/components/molecules/RoomDotMenu.vue";
import { ContextExternalToolConfigurationStatusFactory } from "@@/tests/test-utils";

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
		const envConfigModule = createModuleMocks(EnvConfigModule, {
			getCtlContextConfigurationEnabled: true,
		});

		const wrapper = mount(RoomExternalToolCard, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
				},
			},
			props: {
				tool,
				canEdit,
			},
		});

		return {
			wrapper,
		};
	};

	describe("when the component is mounted and the tool is not outdated, incomplete or deactivated", () => {
		it("should load the launch request", async () => {
			getWrapper(
				externalToolDisplayDataFactory.build({
					status: ContextExternalToolConfigurationStatusFactory.build(),
				}),
				false
			);

			await nextTick();

			expect(
				useExternalToolLaunchStateMock.fetchLaunchRequest
			).toHaveBeenCalled();
		});
	});

	describe("tool status", () => {
		describe("when tool status is deactivated", () => {
			const setup = () => {
				const tool: ExternalToolDisplayData =
					externalToolDisplayDataFactory.build({
						status: ContextExternalToolConfigurationStatusFactory.build({
							isDeactivated: true,
						}),
					});

				const { wrapper } = getWrapper(tool, false);

				return {
					wrapper,
					tool,
				};
			};

			it("should display deactivated chip", () => {
				const { wrapper } = setup();

				const statusChip = wrapper.find(
					'[data-testId="tool-card-status-deactivated"]'
				);

				expect(statusChip.text()).toEqual("pages.rooms.tools.deactivated");
			});
		});

		describe("when tool status is not deactivated", () => {
			const setup = () => {
				const tool: ExternalToolDisplayData =
					externalToolDisplayDataFactory.build({
						status: ContextExternalToolConfigurationStatusFactory.build(),
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

		describe("when tool status is outdated on scope context", () => {
			const setup = () => {
				const tool: ExternalToolDisplayData =
					externalToolDisplayDataFactory.build({
						status: ContextExternalToolConfigurationStatusFactory.build({
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

				const statusChip = wrapper.find(
					'[data-testId="tool-card-status-outdated"]'
				);

				expect(statusChip.text()).toEqual("pages.rooms.tools.outdated");
			});
		});

		describe("when tool status is outdated on scope school", () => {
			const setup = () => {
				const tool: ExternalToolDisplayData =
					externalToolDisplayDataFactory.build({
						status: ContextExternalToolConfigurationStatusFactory.build({
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

				const statusChip = wrapper.find(
					'[data-testId="tool-card-status-outdated"]'
				);

				expect(statusChip.text()).toEqual("pages.rooms.tools.outdated");
			});
		});

		describe("when tool status is outdated on scope school and context", () => {
			const setup = () => {
				const tool: ExternalToolDisplayData =
					externalToolDisplayDataFactory.build({
						status: ContextExternalToolConfigurationStatusFactory.build({
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

				const statusChip = wrapper.find(
					'[data-testId="tool-card-status-outdated"]'
				);

				expect(statusChip.text()).toEqual("pages.rooms.tools.outdated");
			});
		});

		describe("when tool status is not outdated", () => {
			const setup = () => {
				const tool: ExternalToolDisplayData =
					externalToolDisplayDataFactory.build({
						status: ContextExternalToolConfigurationStatusFactory.build(),
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

		describe("when tool status is incomplete on scope context", () => {
			const setup = () => {
				const tool: ExternalToolDisplayData =
					externalToolDisplayDataFactory.build({
						status: ContextExternalToolConfigurationStatusFactory.build({
							isIncompleteOnScopeContext: true,
						}),
					});

				const { wrapper } = getWrapper(tool, false);

				return {
					wrapper,
					tool,
				};
			};

			it("should display incomplete chip", () => {
				const { wrapper } = setup();

				const statusChip = wrapper.find(
					'[data-testId="tool-card-status-incomplete"]'
				);

				expect(statusChip.text()).toEqual("pages.rooms.tools.incomplete");
			});
		});

		describe("when tool status is not incomplete", () => {
			const setup = () => {
				const tool: ExternalToolDisplayData =
					externalToolDisplayDataFactory.build({
						status: ContextExternalToolConfigurationStatusFactory.build(),
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
							status: ContextExternalToolConfigurationStatusFactory.build({
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
							status: ContextExternalToolConfigurationStatusFactory.build({
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
							status: ContextExternalToolConfigurationStatusFactory.build({
								isOutdatedOnScopeSchool: true,
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

			describe("when the tool is incomplete on scope context", () => {
				const setup = async () => {
					const toolDisplayData: ExternalToolDisplayData =
						externalToolDisplayDataFactory.build({
							status: ContextExternalToolConfigurationStatusFactory.build({
								isIncompleteOnScopeContext: true,
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

			it("should fetch launch request after launch", async () => {
				const { wrapper } = await setup();

				await wrapper.trigger("click");

				expect(
					useExternalToolLaunchStateMock.fetchLaunchRequest
				).toHaveBeenCalled();
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

			const itemMenu = wrapper.findComponent(RoomDotMenu);

			expect(itemMenu.isVisible()).toEqual(true);
		});

		it("should display the edit menu item", async () => {
			const { wrapper } = setup();

			const menuButton = wrapper
				.findComponent(RoomDotMenu)
				.get('[data-testid="room-tool-three-dot-button"]');
			await menuButton.trigger("click");

			const toolEditMenuItem = wrapper.findComponent(
				'[data-testid="tool-edit"]'
			);

			expect(toolEditMenuItem.exists()).toEqual(true);
		});

		it("should display the delete menu item", async () => {
			const { wrapper } = setup();

			const menuButton = wrapper
				.findComponent(RoomDotMenu)
				.get('[data-testid="room-tool-three-dot-button"]');

			await menuButton.trigger("click");

			const toolDeleteMenuItem = wrapper.findComponent(
				'[data-testId="tool-delete"]'
			);

			expect(toolDeleteMenuItem.exists()).toEqual(true);
		});

		describe("when clicking on the edit menu item", () => {
			it("should emit the edit event", async () => {
				const { wrapper, tool } = setup();

				const menuButton = wrapper
					.findComponent(RoomDotMenu)
					.get('[data-testid="room-tool-three-dot-button"]');
				await menuButton.trigger("click");

				const toolDeleteMenuItem = wrapper.findComponent(
					'[data-testId="tool-edit"]'
				);

				await toolDeleteMenuItem.trigger("click");

				expect(wrapper.emitted("edit")).toContainEqual([tool]);
			});
		});

		describe("when clicking on the delete menu item", () => {
			it("should emit the delete event", async () => {
				const { wrapper, tool } = setup();

				const menuButton = wrapper
					.findComponent(RoomDotMenu)
					.get('[data-testid="room-tool-three-dot-button"]');
				await menuButton.trigger("click");

				const toolDeleteMenuItem = wrapper.findComponent(
					'[data-testId="tool-delete"]'
				);

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
