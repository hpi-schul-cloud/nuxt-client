import RoomExternalToolCard from "./RoomExternalToolCard.vue";
import { Permission } from "@/serverApi/v3";
import { contextExternalToolConfigurationStatusFactory } from "@@/tests/test-utils";
import { externalToolDisplayDataFactory } from "@@/tests/test-utils/factory/externalToolDisplayDataFactory";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useAppStore } from "@data-app";
import {
	ExternalToolDisplayData,
	useContextExternalToolConfigurationStatus,
	useExternalToolLaunchState,
} from "@data-external-tool";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { RoomDotMenu } from "@ui-room-details";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";

vi.mock("@data-external-tool");
vi.mock("@data-app");

describe("RoomExternalToolCard", () => {
	let useExternalToolLaunchStateMock: DeepMocked<ReturnType<typeof useExternalToolLaunchState>>;

	let useContextExternalToolConfigurationStatusMock: DeepMocked<
		ReturnType<typeof useContextExternalToolConfigurationStatus>
	>;

	beforeEach(() => {
		vi.mocked(useAppStore).mockReturnValue({
			hasPermission: (permission: Permission) => permission === Permission.ContextToolAdmin,
			userRoles: [],
		} as unknown as ReturnType<typeof useAppStore>);

		useExternalToolLaunchStateMock = createMock<ReturnType<typeof useExternalToolLaunchState>>();

		useContextExternalToolConfigurationStatusMock =
			createMock<ReturnType<typeof useContextExternalToolConfigurationStatus>>();

		vi.mocked(useExternalToolLaunchState).mockReturnValue(useExternalToolLaunchStateMock);

		vi.mocked(useContextExternalToolConfigurationStatus).mockReturnValue(useContextExternalToolConfigurationStatusMock);
	});

	afterEach(() => {
		vi.resetAllMocks();
		vi.clearAllMocks();
	});

	const getWrapper = (tool: ExternalToolDisplayData, canEdit: boolean) => {
		const wrapper = mount(RoomExternalToolCard, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
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

	const setup = (options?: {
		canEdit?: boolean;
		isDeactivated?: boolean;
		isNotLicensed?: boolean;
		isOutdatedOnScopeSchool?: boolean;
		isOutdatedOnScopeContext?: boolean;
		isIncompleteOnScopeContext?: boolean;
		isIncompleteOperationalOnScopeContext?: boolean;
	}) => {
		const {
			isDeactivated,
			isNotLicensed,
			isOutdatedOnScopeSchool,
			isOutdatedOnScopeContext,
			isIncompleteOnScopeContext,
			isIncompleteOperationalOnScopeContext,
		} = options ?? {};
		const tool: ExternalToolDisplayData = externalToolDisplayDataFactory.build({
			status: contextExternalToolConfigurationStatusFactory.build({
				isDeactivated,
				isNotLicensed,
				isOutdatedOnScopeSchool,
				isOutdatedOnScopeContext,
				isIncompleteOnScopeContext,
				isIncompleteOperationalOnScopeContext,
			}),
		});

		const { wrapper } = getWrapper(tool, options?.canEdit ?? false);

		return {
			wrapper,
			tool,
		};
	};

	describe("when the component is mounted and the tool is not outdated, incomplete or deactivated", () => {
		it("should load the launch request", async () => {
			setup({ canEdit: false });

			await nextTick();

			expect(useExternalToolLaunchStateMock.fetchContextLaunchRequest).toHaveBeenCalled();
		});
	});

	describe("tool domain", () => {
		it("should display the tool domain", () => {
			const { wrapper, tool } = setup({ isDeactivated: true });

			const domain = wrapper.find("[data-testId=tool-card-domain]");

			expect(domain.text()).toEqual(tool.domain);
		});
	});

	describe("tool status", () => {
		describe("when tool status is deactivated", () => {
			it("should display deactivated chip", () => {
				const { wrapper } = setup({ isDeactivated: true });

				const statusChip = wrapper.find('[data-testId="tool-card-status-deactivated"]');

				expect(statusChip.text()).toEqual("pages.rooms.tools.deactivated");
			});
		});

		describe("when tool status is not deactivated", () => {
			it("should display no chip", () => {
				const { wrapper } = setup({ canEdit: false });

				const statusChip = wrapper.find('[data-testId="tool-card-status-deactivated"]');

				expect(statusChip.exists()).toEqual(false);
			});
		});

		describe("when tool status is not licensed", () => {
			it("should display not licensed chip", () => {
				const { wrapper } = setup({ canEdit: false, isNotLicensed: true });

				const statusChip = wrapper.find('[data-testId="tool-card-status-not-licensed"]');

				expect(statusChip.text()).toEqual("common.medium.chip.notLicensed");
			});
		});

		describe("when tool status is licensed", () => {
			it("should display no chip", () => {
				const { wrapper } = setup({ canEdit: false, isNotLicensed: false });

				const statusChip = wrapper.find('[data-testId="tool-card-status-not-licensed"]');

				expect(statusChip.exists()).toEqual(false);
			});
		});

		describe("when tool status is outdated on scope context", () => {
			it("should display outdated chip", () => {
				const { wrapper } = setup({ isOutdatedOnScopeContext: true, canEdit: true });

				const statusChip = wrapper.find('[data-testId="tool-card-status"]');

				expect(statusChip.text()).toEqual("pages.rooms.tools.outdated");
			});
		});

		describe("when tool status is outdated on scope school", () => {
			it("should display outdated chip", () => {
				const { wrapper } = setup({ canEdit: false, isOutdatedOnScopeSchool: true });

				const statusChip = wrapper.find('[data-testId="tool-card-status"]');

				expect(statusChip.text()).toEqual("pages.rooms.tools.outdated");
			});
		});

		describe("when tool status is outdated on scope school and context", () => {
			it("should display outdated chip", () => {
				const { wrapper } = setup({ canEdit: false, isOutdatedOnScopeSchool: true, isOutdatedOnScopeContext: true });

				const statusChip = wrapper.find('[data-testId="tool-card-status"]');

				expect(statusChip.text()).toEqual("pages.rooms.tools.outdated");
			});
		});

		describe("when tool status is not outdated", () => {
			it("should display no chip", () => {
				const { wrapper } = setup({ canEdit: false });

				const statusChip = wrapper.find('[data-testId="tool-card-status"]');

				expect(statusChip.exists()).toEqual(false);
			});
		});

		describe("when tool status is incomplete on scope context", () => {
			it("should display incomplete chip", () => {
				const { wrapper } = setup({ canEdit: false, isIncompleteOnScopeContext: true });

				const statusChip = wrapper.find('[data-testId="tool-card-status"]');

				expect(statusChip.text()).toEqual("pages.rooms.tools.outdated");
			});
		});

		describe("when tool status is not incomplete", () => {
			it("should display no chip", () => {
				const { wrapper } = setup();

				const statusChip = wrapper.find('[data-testId="tool-card-status"]');

				expect(statusChip.exists()).toEqual(false);
			});
		});

		describe("when tool status is incomplete operational and user can edit tools", () => {
			it("should display incomplete operational chip", () => {
				const { wrapper } = setup({ canEdit: true, isIncompleteOperationalOnScopeContext: true });

				const statusChip = wrapper.get('[data-testId="tool-card-status-incompleteOperational"]');

				expect(statusChip.text()).toEqual("pages.rooms.tools.outdated");
			});
		});

		describe("when tool status is incomplete operational and user can not edit tools", () => {
			it("should display incomplete operational chip", () => {
				const { wrapper } = setup({ canEdit: false, isIncompleteOperationalOnScopeContext: true });

				const statusChip = wrapper.find('[data-testId="tool-card-status-incompleteOperational"]');

				expect(statusChip.exists()).toEqual(false);
			});
		});

		describe("when the user clicks the card", () => {
			describe("when the tool is outdated on scope school", () => {
				it("should emit the error event", async () => {
					const { wrapper, tool } = setup({ canEdit: true, isOutdatedOnScopeSchool: true });

					await wrapper.trigger("click");

					expect(wrapper.emitted("error")).toEqual([[tool]]);
				});
			});

			describe("when the tool is outdated on scope context", () => {
				it("should emit the error event", async () => {
					const { wrapper, tool } = setup({ canEdit: true, isOutdatedOnScopeContext: true });

					await wrapper.trigger("click");

					expect(wrapper.emitted("error")).toEqual([[tool]]);
				});
			});

			describe("when the tool is outdated on scope school and context", () => {
				it("should emit the error event", async () => {
					const { wrapper, tool } = setup({
						canEdit: true,
						isOutdatedOnScopeSchool: true,
						isOutdatedOnScopeContext: true,
					});

					await wrapper.trigger("click");

					expect(wrapper.emitted("error")).toEqual([[tool]]);
				});
			});

			describe("when the tool is incomplete on scope context", () => {
				it("should emit the error event", async () => {
					const { wrapper, tool } = await setup({ canEdit: true, isIncompleteOnScopeContext: true });

					await wrapper.trigger("click");

					expect(wrapper.emitted("error")).toEqual([[tool]]);
				});
			});
		});

		describe("when there was no error while loading launch request", () => {
			it("should launch the tool", async () => {
				const { wrapper } = setup({ canEdit: true });

				await wrapper.trigger("click");

				expect(useExternalToolLaunchStateMock.launchTool).toHaveBeenCalled();
			});

			it("should fetch launch request after launch", async () => {
				const { wrapper } = setup({ canEdit: true });

				await wrapper.trigger("click");

				expect(useExternalToolLaunchStateMock.fetchContextLaunchRequest).toHaveBeenCalled();
			});
		});

		describe("when the launch failed and an error is set", () => {
			it("should emit the error event", async () => {
				const { wrapper, tool } = setup({ canEdit: true });
				useExternalToolLaunchStateMock.error.value = {
					message: "mock error",
					statusCode: 400,
				};

				await wrapper.trigger("click");

				expect(wrapper.emitted("error")).toEqual([[tool]]);
			});
		});
	});

	describe("when the tool is empty", () => {
		const setupEmptyTool = (options: { canEdit: boolean }) => {
			const tool: ExternalToolDisplayData = externalToolDisplayDataFactory.build();

			const { wrapper } = getWrapper(tool, options.canEdit);

			return {
				wrapper,
				tool,
			};
		};

		describe("when the user can edit the tool card", () => {
			it("should display the item menu", () => {
				const { wrapper } = setupEmptyTool({ canEdit: true });

				const itemMenu = wrapper.findComponent(RoomDotMenu);

				expect(itemMenu.isVisible()).toEqual(true);
			});

			it("should display the menu item edit", async () => {
				const { wrapper } = setupEmptyTool({ canEdit: true });

				const menuButton = wrapper.findComponent(RoomDotMenu).get('[data-testid="room-tool-three-dot-button"]');
				await menuButton.trigger("click");
				const toolEditMenuItem = wrapper.findComponent('[data-testid="tool-edit"]');

				expect(toolEditMenuItem.exists()).toEqual(true);
			});

			it("should display the menu item delete", async () => {
				const { wrapper } = setupEmptyTool({ canEdit: true });

				const menuButton = wrapper.findComponent(RoomDotMenu).get('[data-testid="room-tool-three-dot-button"]');
				await menuButton.trigger("click");
				const toolDeleteMenuItem = wrapper.findComponent('[data-testid="tool-delete"]');

				expect(toolDeleteMenuItem.exists()).toEqual(true);
			});

			describe("when clicking on the edit menu item", () => {
				it("should emit the edit event", async () => {
					const { wrapper, tool } = setupEmptyTool({ canEdit: true });

					const menuButton = wrapper.findComponent(RoomDotMenu).get('[data-testid="room-tool-three-dot-button"]');
					await menuButton.trigger("click");

					const toolEditMenuItem = wrapper.findComponent('[data-testid="tool-edit"]');

					await toolEditMenuItem.trigger("click");

					expect(wrapper.emitted("edit")).toContainEqual([tool]);
				});
			});

			describe("when clicking on the delete menu item", () => {
				it("should emit the delete event", async () => {
					const { wrapper, tool } = setupEmptyTool({ canEdit: true });

					const menuButton = wrapper.findComponent(RoomDotMenu).get('[data-testid="room-tool-three-dot-button"]');
					await menuButton.trigger("click");

					const toolDeleteMenuItem = wrapper.findComponent('[data-testId="tool-delete"]');

					await toolDeleteMenuItem.trigger("click");

					expect(wrapper.emitted("delete")).toContainEqual([tool]);
				});
			});

			describe("when the user cannot edit the tool card", () => {
				it("should not display the item menu", () => {
					const { wrapper } = setupEmptyTool({ canEdit: false });

					const threeDotMenu = wrapper.find('[data-testid="room-tool-three-dot-button"]');

					expect(threeDotMenu.exists()).toEqual(false);
				});
			});
		});
	});
});
