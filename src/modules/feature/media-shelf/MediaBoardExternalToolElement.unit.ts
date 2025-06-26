import EnvConfigModule from "@/store/env-config";
import NotifierModule from "@/store/notifier";
import { AlertPayload } from "@/store/types/alert-payload";
import { ENV_CONFIG_MODULE_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import {
	businessErrorFactory,
	contextExternalToolConfigurationStatusFactory,
	envsFactory,
	externalToolDisplayDataFactory,
	mediaExternalToolElementResponseFactory,
} from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import {
	useContextExternalToolConfigurationStatus,
	useExternalToolDisplayState,
	useExternalToolLaunchState,
} from "@data-external-tool";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { useDragAndDrop } from "@util-board";
import { flushPromises, mount } from "@vue/test-utils";
import { nextTick, ref } from "vue";
import { ComponentProps } from "vue-component-type-helpers";
import { MediaElementDisplay } from "./data";
import MediaBoardElementDisplay from "./MediaBoardElementDisplay.vue";
import MediaBoardExternalToolElement from "./MediaBoardExternalToolElement.vue";
import MediaBoardExternalToolElementMenu from "./MediaBoardExternalToolElementMenu.vue";

jest.mock("@data-external-tool");

describe("MediaBoardExternalToolElement", () => {
	let useExternalToolDisplayStateMock: DeepMocked<
		ReturnType<typeof useExternalToolDisplayState>
	>;
	let useExternalToolLaunchStateMock: DeepMocked<
		ReturnType<typeof useExternalToolLaunchState>
	>;
	let useContextExternalToolConfigurationStatusMock: DeepMocked<
		ReturnType<typeof useContextExternalToolConfigurationStatus>
	>;

	const getWrapper = (
		props: ComponentProps<typeof MediaBoardExternalToolElement>
	) => {
		const refreshTime = 299000;
		const envConfigModule = createModuleMocks(EnvConfigModule, {
			getEnv: envsFactory.build({ CTL_TOOLS_RELOAD_TIME_MS: refreshTime }),
		});
		const notifierModule = createModuleMocks(NotifierModule);

		const wrapper = mount(MediaBoardExternalToolElement, {
			global: {
				plugins: [createTestingI18n(), createTestingVuetify()],
				provide: {
					[ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModule,
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				},
				stubs: {
					MediaBoardExternalToolElementMenu: true,
				},
			},
			props,
		});

		return {
			wrapper,
			notifierModule,
			refreshTime,
		};
	};

	beforeEach(() => {
		useExternalToolDisplayStateMock = createMock<
			ReturnType<typeof useExternalToolDisplayState>
		>({
			displayData: ref(),
			error: ref(),
		});
		useExternalToolLaunchStateMock = createMock<
			ReturnType<typeof useExternalToolLaunchState>
		>({
			error: ref(),
		});
		useContextExternalToolConfigurationStatusMock =
			createMock<
				ReturnType<typeof useContextExternalToolConfigurationStatus>
			>();

		jest
			.mocked(useExternalToolDisplayState)
			.mockReturnValue(useExternalToolDisplayStateMock);
		jest
			.mocked(useExternalToolLaunchState)
			.mockReturnValue(useExternalToolLaunchStateMock);
		jest
			.mocked(useContextExternalToolConfigurationStatus)
			.mockReturnValue(useContextExternalToolConfigurationStatusMock);

		jest.useFakeTimers({ legacyFakeTimers: true });
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("when loading external tool data", () => {
		describe("when the api returns data", () => {
			const setup = async () => {
				const externalToolElement =
					mediaExternalToolElementResponseFactory.build();
				const displayDataResponse = externalToolDisplayDataFactory.build({
					name: "name",
					description: "description",
					logoUrl: "logoUrl",
				});

				useExternalToolDisplayStateMock.displayData.value = displayDataResponse;

				const { wrapper } = getWrapper({
					element: externalToolElement,
				});

				await flushPromises();

				return {
					wrapper,
					externalToolElement,
					displayDataResponse,
				};
			};

			it("should call the api to load display data", async () => {
				const { externalToolElement } = await setup();

				expect(
					useExternalToolDisplayStateMock.fetchDisplayData
				).toHaveBeenCalledWith(
					externalToolElement.content.contextExternalToolId
				);
			});

			it("should call the state to load the launch request", async () => {
				const { externalToolElement } = await setup();

				expect(
					useExternalToolLaunchStateMock.fetchContextLaunchRequest
				).toHaveBeenCalledWith(
					externalToolElement.content.contextExternalToolId
				);
			});

			it("should map to the display props", async () => {
				const { wrapper, displayDataResponse } = await setup();

				const displayComponent = wrapper.findComponent(
					MediaBoardElementDisplay
				);

				expect(displayComponent.props().element).toEqual<MediaElementDisplay>({
					title: displayDataResponse.name,
					domain: displayDataResponse.domain,
					description: displayDataResponse.description,
					thumbnail: displayDataResponse.logoUrl,
				});
			});
		});
	});

	describe("when the refresh time is over", () => {
		const setup = () => {
			const { wrapper, refreshTime } = getWrapper({
				element: mediaExternalToolElementResponseFactory.build(),
			});

			useContextExternalToolConfigurationStatusMock.isOperational.mockReturnValue(
				true
			);
			useExternalToolDisplayStateMock.displayData.value =
				externalToolDisplayDataFactory.build();

			return {
				wrapper,
				refreshTime,
			};
		};

		it("should refresh the display data", async () => {
			const { refreshTime } = setup();
			await nextTick();

			expect(
				useExternalToolLaunchStateMock.fetchContextLaunchRequest
			).toHaveBeenCalledTimes(1);

			jest.advanceTimersByTime(refreshTime + 1000);
			await nextTick();

			expect(
				useExternalToolLaunchStateMock.fetchContextLaunchRequest
			).toHaveBeenCalledTimes(2);
		});
	});

	describe("when clicking the element", () => {
		describe("when a launch request is available", () => {
			const setup = () => {
				const externalToolElement =
					mediaExternalToolElementResponseFactory.build();
				const { wrapper } = getWrapper({
					element: externalToolElement,
				});

				useExternalToolDisplayStateMock.displayData.value =
					externalToolDisplayDataFactory.build();

				return {
					wrapper,
					externalToolElement,
				};
			};

			it("should launch the tool", async () => {
				const { wrapper } = setup();

				await wrapper.trigger("click");

				expect(useExternalToolLaunchStateMock.launchTool).toHaveBeenCalled();
			});

			it("should load the next launch request", async () => {
				const { wrapper, externalToolElement } = setup();

				await wrapper.trigger("click");

				expect(
					useExternalToolLaunchStateMock.fetchContextLaunchRequest
				).toHaveBeenCalledWith(
					externalToolElement.content.contextExternalToolId
				);
			});
		});

		describe("when dragging", () => {
			const setup = () => {
				const externalToolElement =
					mediaExternalToolElementResponseFactory.build();
				const { wrapper } = getWrapper({
					element: externalToolElement,
				});

				useDragAndDrop().dragStart();

				return {
					wrapper,
					externalToolElement,
				};
			};

			it("should not launch the tool", async () => {
				const { wrapper } = setup();

				await wrapper.trigger("click");

				expect(
					useExternalToolLaunchStateMock.launchTool
				).not.toHaveBeenCalled();
			});
		});

		describe("when loading the launch request failed without status information", () => {
			const setup = () => {
				const externalToolElement =
					mediaExternalToolElementResponseFactory.build();
				const { wrapper, notifierModule } = getWrapper({
					element: externalToolElement,
				});

				useExternalToolLaunchStateMock.error.value =
					businessErrorFactory.build();

				useExternalToolDisplayStateMock.displayData.value = undefined;

				return {
					wrapper,
					externalToolElement,
					notifierModule,
				};
			};

			it("should show a general error notification", async () => {
				const { wrapper, notifierModule } = setup();

				await wrapper.trigger("click");

				expect(notifierModule.show).toHaveBeenCalledWith<[AlertPayload]>({
					status: "error",
					text: "error.load",
				});
			});

			it("should not launch the tool", async () => {
				const { wrapper } = setup();

				await wrapper.trigger("click");

				expect(
					useExternalToolLaunchStateMock.launchTool
				).not.toHaveBeenCalled();
			});
		});

		describe("when loading the launch request failed with status information", () => {
			const setup = () => {
				const externalToolElement =
					mediaExternalToolElementResponseFactory.build();
				const { wrapper, notifierModule } = getWrapper({
					element: externalToolElement,
				});

				useContextExternalToolConfigurationStatusMock.isOperational.mockReturnValue(
					false
				);

				const statusMock = contextExternalToolConfigurationStatusFactory.build({
					isDeactivated: true,
				});
				useExternalToolDisplayStateMock.displayData.value =
					externalToolDisplayDataFactory.build({
						status: statusMock,
					});

				return {
					wrapper,
					externalToolElement,
					notifierModule,
					statusMock,
				};
			};

			it("should call composable to determine error message", async () => {
				const { wrapper, notifierModule, statusMock } = setup();

				await wrapper.trigger("click");

				expect(notifierModule.show).toHaveBeenCalled();
				expect(
					useContextExternalToolConfigurationStatusMock.determineMediaBoardElementStatusMessage
				).toHaveBeenCalledWith(statusMock);
			});

			it("should not launch the tool", async () => {
				const { wrapper } = setup();

				await wrapper.trigger("click");

				expect(
					useExternalToolLaunchStateMock.launchTool
				).not.toHaveBeenCalled();
			});
		});
	});

	describe("status chips", () => {
		describe("when medium is deactivated and not licensed", () => {
			const setup = () => {
				const externalToolElement =
					mediaExternalToolElementResponseFactory.build();

				useExternalToolDisplayStateMock.displayData.value =
					externalToolDisplayDataFactory.build({
						status: contextExternalToolConfigurationStatusFactory.build({
							isDeactivated: true,
							isNotLicensed: true,
						}),
					});

				const { wrapper } = getWrapper({
					element: externalToolElement,
				});

				return {
					wrapper,
				};
			};

			it("should show only the deactivated warning chip", () => {
				const { wrapper } = setup();

				const deactivatedChip = wrapper.find(
					'[data-testid="warning-chip-deactivated"]'
				);
				const notLicenseChip = wrapper.find(
					'[data-testid="warning-chip-not-licensed"]'
				);
				const incompleteChip = wrapper.find(
					'[data-testid="warning-chip-incomplete"]'
				);

				expect(deactivatedChip.exists()).toEqual(true);
				expect(notLicenseChip.exists()).toEqual(false);
				expect(incompleteChip.exists()).toEqual(false);
			});
		});

		describe("when medium is not licensed", () => {
			const setup = () => {
				const externalToolElement =
					mediaExternalToolElementResponseFactory.build();

				useExternalToolDisplayStateMock.displayData.value =
					externalToolDisplayDataFactory.build({
						status: contextExternalToolConfigurationStatusFactory.build({
							isNotLicensed: true,
						}),
					});

				const { wrapper } = getWrapper({
					element: externalToolElement,
				});

				return {
					wrapper,
				};
			};

			it("should show only the not licensed warning chip", () => {
				const { wrapper } = setup();

				const deactivatedChip = wrapper.find(
					'[data-testid="warning-chip-deactivated"]'
				);
				const notLicenseChip = wrapper.find(
					'[data-testid="warning-chip-not-licensed"]'
				);
				const incompleteChip = wrapper.find(
					'[data-testid="warning-chip-incomplete"]'
				);

				expect(deactivatedChip.exists()).toEqual(false);
				expect(notLicenseChip.exists()).toEqual(true);
				expect(incompleteChip.exists()).toEqual(false);
			});
		});

		describe("when medium is incomplete", () => {
			const setup = () => {
				const externalToolElement =
					mediaExternalToolElementResponseFactory.build();

				useExternalToolDisplayStateMock.displayData.value =
					externalToolDisplayDataFactory.build({
						status: contextExternalToolConfigurationStatusFactory.build({
							isIncompleteOnScopeContext: true,
						}),
					});

				const { wrapper } = getWrapper({
					element: externalToolElement,
				});

				return {
					wrapper,
				};
			};

			it("should show only the incomplete warning chip", () => {
				const { wrapper } = setup();

				const deactivatedChip = wrapper.find(
					'[data-testid="warning-chip-deactivated"]'
				);
				const notLicenseChip = wrapper.find(
					'[data-testid="warning-chip-not-licensed"]'
				);
				const incompleteChip = wrapper.find(
					'[data-testid="warning-chip-incomplete"]'
				);

				expect(deactivatedChip.exists()).toEqual(false);
				expect(notLicenseChip.exists()).toEqual(false);
				expect(incompleteChip.exists()).toEqual(true);
			});
		});

		describe("when medium is incomplete and deactivated", () => {
			const setup = () => {
				const externalToolElement =
					mediaExternalToolElementResponseFactory.build();

				useExternalToolDisplayStateMock.displayData.value =
					externalToolDisplayDataFactory.build({
						status: contextExternalToolConfigurationStatusFactory.build({
							isDeactivated: true,
							isOutdatedOnScopeContext: true,
						}),
					});

				const { wrapper } = getWrapper({
					element: externalToolElement,
				});

				return {
					wrapper,
				};
			};

			it("should show the deactivated and the incomplete warning chip", () => {
				const { wrapper } = setup();

				const deactivatedChip = wrapper.find(
					'[data-testid="warning-chip-deactivated"]'
				);
				const notLicenseChip = wrapper.find(
					'[data-testid="warning-chip-not-licensed"]'
				);
				const incompleteChip = wrapper.find(
					'[data-testid="warning-chip-incomplete"]'
				);

				expect(deactivatedChip.exists()).toEqual(true);
				expect(notLicenseChip.exists()).toEqual(false);
				expect(incompleteChip.exists()).toEqual(true);
			});
		});
	});

	describe("Three dot menu", () => {
		describe("when deleting the element from the menu", () => {
			const setup = () => {
				const externalToolElement =
					mediaExternalToolElementResponseFactory.build();

				useExternalToolDisplayStateMock.displayData.value =
					externalToolDisplayDataFactory.build();

				const { wrapper } = getWrapper({
					element: externalToolElement,
				});

				return {
					wrapper,
					externalToolElement,
				};
			};

			it("should emit a delete event", async () => {
				const { wrapper, externalToolElement } = setup();

				const menu = wrapper.getComponent(MediaBoardExternalToolElementMenu);
				menu.vm.$emit("delete:element");
				await nextTick();

				expect(wrapper.emitted("delete:element")).toEqual([
					[externalToolElement.id],
				]);
			});
		});
	});
});
