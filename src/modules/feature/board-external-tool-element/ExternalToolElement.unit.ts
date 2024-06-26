import {
	ConfigResponse,
	ContentElementType,
	ExternalToolElementResponse,
} from "@/serverApi/v3";
import EnvConfigModule from "@/store/env-config";
import { BusinessError } from "@/store/types/commons";
import { ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import {
	contextExternalToolConfigurationStatusFactory,
	contextExternalToolFactory,
	externalToolDisplayDataFactory,
	schoolToolConfigurationStatusFactory,
	timestampsResponseFactory,
} from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { useBoardFocusHandler, useContentElementState } from "@data-board";
import {
	ContextExternalTool,
	ExternalToolDisplayData,
	useContextExternalToolConfigurationStatus,
	useExternalToolDisplayState,
	useExternalToolLaunchState,
} from "@data-external-tool";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { mdiPuzzleOutline } from "@mdi/js";
import { useSharedLastCreatedElement } from "@util-board";
import { shallowMount } from "@vue/test-utils";
import { nextTick, ref } from "vue";
import ExternalToolElement from "./ExternalToolElement.vue";
import ExternalToolElementAlert from "./ExternalToolElementAlert.vue";
import ExternalToolElementConfigurationDialog from "./ExternalToolElementConfigurationDialog.vue";

jest.mock("@data-board");
jest.mock("@data-external-tool");
jest.mock("@util-board");

const EMPTY_TEST_ELEMENT: ExternalToolElementResponse = {
	id: "external-tool-element-id",
	content: {
		contextExternalToolId: null,
	},
	type: ContentElementType.ExternalTool,
	timestamps: timestampsResponseFactory.build(),
};

describe("ExternalToolElement", () => {
	let useContentElementStateMock: DeepMocked<
		ReturnType<typeof useContentElementState>
	>;
	let useBoardFocusHandlerMock: DeepMocked<
		ReturnType<typeof useBoardFocusHandler>
	>;
	let useExternalToolElementDisplayStateMock: DeepMocked<
		ReturnType<typeof useExternalToolDisplayState>
	>;
	let useExternalToolLaunchStateMock: DeepMocked<
		ReturnType<typeof useExternalToolLaunchState>
	>;
	let useSharedLastCreatedElementMock: DeepMocked<
		ReturnType<typeof useSharedLastCreatedElement>
	>;

	let useToolConfigurationStatusMock: DeepMocked<
		ReturnType<typeof useContextExternalToolConfigurationStatus>
	>;

	beforeEach(() => {
		useContentElementStateMock =
			createMock<ReturnType<typeof useContentElementState>>();
		useBoardFocusHandlerMock =
			createMock<ReturnType<typeof useBoardFocusHandler>>();
		useExternalToolElementDisplayStateMock = createMock<
			ReturnType<typeof useExternalToolDisplayState>
		>({ error: ref(), displayData: ref(), isLoading: ref(false) });
		useExternalToolLaunchStateMock = createMock<
			ReturnType<typeof useExternalToolLaunchState>
		>({ error: ref(), toolLaunchRequest: ref(), isLoading: ref(false) });
		useSharedLastCreatedElementMock = createMock<
			ReturnType<typeof useSharedLastCreatedElement>
		>({ lastCreatedElementId: ref() });
		useToolConfigurationStatusMock =
			createMock<
				ReturnType<typeof useContextExternalToolConfigurationStatus>
			>();

		jest
			.mocked(useContentElementState)
			.mockReturnValue(useContentElementStateMock);
		jest.mocked(useBoardFocusHandler).mockReturnValue(useBoardFocusHandlerMock);
		jest
			.mocked(useExternalToolDisplayState)
			.mockReturnValue(useExternalToolElementDisplayStateMock);
		jest
			.mocked(useExternalToolLaunchState)
			.mockReturnValue(useExternalToolLaunchStateMock);
		jest
			.mocked(useSharedLastCreatedElement)
			.mockReturnValue(useSharedLastCreatedElementMock);
		jest
			.mocked(useContextExternalToolConfigurationStatus)
			.mockReturnValue(useToolConfigurationStatusMock);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	const getWrapper = (
		propsData: {
			element: ExternalToolElementResponse;
			isEditMode: boolean;
		},
		displayData?: ExternalToolDisplayData
	) => {
		useContentElementStateMock.modelValue = ref(propsData.element.content);
		useExternalToolElementDisplayStateMock.displayData.value = displayData;

		const refreshTime = 299000;
		const envConfigModuleMock = createModuleMocks(EnvConfigModule, {
			getEnv: { CTL_TOOLS_RELOAD_TIME_MS: refreshTime } as ConfigResponse,
		});

		const wrapper = shallowMount(ExternalToolElement, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: { [ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModuleMock },
			},
			props: {
				isFirstElement: false,
				isLastElement: false,
				hasMultipleElements: false,
				cardId: "cardId",
				...propsData,
			},
		});

		return {
			wrapper,
			refreshTime,
		};
	};

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("when the element is mounted", () => {
		describe("when the element has a tool attached", () => {
			it("should load the display data", async () => {
				getWrapper(
					{
						element: {
							...EMPTY_TEST_ELEMENT,
							content: { contextExternalToolId: "contextExternalToolId" },
						},
						isEditMode: false,
					},
					externalToolDisplayDataFactory.build({
						status: schoolToolConfigurationStatusFactory.build(),
					})
				);

				await nextTick();

				expect(
					useExternalToolElementDisplayStateMock.fetchDisplayData
				).toHaveBeenCalledWith("contextExternalToolId");
			});

			it("should load the launch request", async () => {
				getWrapper(
					{
						element: {
							...EMPTY_TEST_ELEMENT,
							content: { contextExternalToolId: "contextExternalToolId" },
						},
						isEditMode: false,
					},
					externalToolDisplayDataFactory.build({
						status: schoolToolConfigurationStatusFactory.build(),
					})
				);

				await nextTick();

				expect(
					useExternalToolLaunchStateMock.fetchContextLaunchRequest
				).toHaveBeenCalledWith("contextExternalToolId");
			});
		});

		describe("when the element has a tool attached, but it is outdated", () => {
			it("should not load the launch request", async () => {
				getWrapper(
					{
						element: {
							...EMPTY_TEST_ELEMENT,
							content: { contextExternalToolId: "contextExternalToolId" },
						},
						isEditMode: false,
					},
					externalToolDisplayDataFactory.build({
						status: contextExternalToolConfigurationStatusFactory.build({
							isOutdatedOnScopeContext: true,
							isOutdatedOnScopeSchool: true,
						}),
					})
				);

				await nextTick();

				expect(
					useExternalToolLaunchStateMock.fetchContextLaunchRequest
				).not.toHaveBeenCalled();
			});
		});

		describe("when the element has a tool attached, but it is incomplete", () => {
			it("should not load the launch request", async () => {
				getWrapper(
					{
						element: {
							...EMPTY_TEST_ELEMENT,
							content: { contextExternalToolId: "contextExternalToolId" },
						},
						isEditMode: false,
					},
					externalToolDisplayDataFactory.build({
						status: contextExternalToolConfigurationStatusFactory.build({
							isIncompleteOnScopeContext: true,
						}),
					})
				);

				await nextTick();

				expect(
					useExternalToolLaunchStateMock.fetchContextLaunchRequest
				).not.toHaveBeenCalled();
			});
		});

		describe("when the element has a tool attached, but it is deactivated", () => {
			it("should not load the launch request", async () => {
				getWrapper(
					{
						element: {
							...EMPTY_TEST_ELEMENT,
							content: { contextExternalToolId: "contextExternalToolId" },
						},
						isEditMode: false,
					},
					externalToolDisplayDataFactory.build({
						status: contextExternalToolConfigurationStatusFactory.build({
							isDeactivated: true,
						}),
					})
				);

				await nextTick();

				expect(
					useExternalToolLaunchStateMock.fetchContextLaunchRequest
				).not.toHaveBeenCalled();
			});
		});

		describe("when the element has a tool attached, but it is not licensed", () => {
			it("should not load the launch request", async () => {
				getWrapper(
					{
						element: {
							...EMPTY_TEST_ELEMENT,
							content: { contextExternalToolId: "contextExternalToolId" },
						},
						isEditMode: false,
					},
					externalToolDisplayDataFactory.build({
						status: contextExternalToolConfigurationStatusFactory.build({
							isNotLicensed: true,
						}),
					})
				);

				await nextTick();

				expect(
					useExternalToolLaunchStateMock.fetchContextLaunchRequest
				).not.toHaveBeenCalled();
			});
		});

		describe("when the element does not have a tool attached", () => {
			it("should open the configuration dialog immediately", async () => {
				useSharedLastCreatedElementMock.lastCreatedElementId.value =
					EMPTY_TEST_ELEMENT.id;

				const { wrapper } = getWrapper({
					element: EMPTY_TEST_ELEMENT,
					isEditMode: true,
				});

				await nextTick();

				const dialog = wrapper.findComponent(
					ExternalToolElementConfigurationDialog
				);

				expect(dialog.props("isOpen")).toEqual(true);
			});

			it("should not load the display data", async () => {
				getWrapper({
					element: EMPTY_TEST_ELEMENT,
					isEditMode: false,
				});

				await nextTick();

				expect(
					useExternalToolElementDisplayStateMock.fetchDisplayData
				).not.toHaveBeenCalled();
			});

			it("should not load the launch request", async () => {
				getWrapper({
					element: EMPTY_TEST_ELEMENT,
					isEditMode: false,
				});

				await nextTick();

				expect(
					useExternalToolLaunchStateMock.fetchContextLaunchRequest
				).not.toHaveBeenCalled();
			});
		});
	});

	describe("when no tool is selected", () => {
		describe("when not in edit mode", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					element: EMPTY_TEST_ELEMENT,
					isEditMode: false,
				});

				return {
					wrapper,
				};
			};

			it("should hide the element", () => {
				const { wrapper } = setup();

				const element = wrapper.findComponent({ ref: "externalToolElement" });

				expect(element.isVisible()).toEqual(false);
			});
		});

		describe("when in edit mode", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					element: EMPTY_TEST_ELEMENT,
					isEditMode: true,
				});

				return {
					wrapper,
				};
			};

			it("should hide the element", () => {
				const { wrapper } = setup();

				const element = wrapper.findComponent({ ref: "externalToolElement" });

				expect(element.isVisible()).toEqual(true);
			});
		});
	});

	describe("Logo", () => {
		describe("when not logo is defined", () => {
			const setup = () => {
				const contextExternalToolId = "context-external-tool-id";

				const { wrapper } = getWrapper(
					{
						element: {
							...EMPTY_TEST_ELEMENT,
							content: { contextExternalToolId },
						},
						isEditMode: false,
					},
					externalToolDisplayDataFactory.build({
						contextExternalToolId,
						logoUrl: undefined,
					})
				);

				return {
					wrapper,
				};
			};

			it("should show the default icon", () => {
				const { wrapper } = setup();

				const icon = wrapper
					.findComponent({ name: "ContentElementBar" })
					.attributes().icon;

				expect(icon).toEqual(mdiPuzzleOutline);
			});
		});

		describe("when a logo is defined", () => {
			const setup = () => {
				const contextExternalToolId = "context-external-tool-id";

				const { wrapper } = getWrapper(
					{
						element: {
							...EMPTY_TEST_ELEMENT,
							content: { contextExternalToolId },
						},
						isEditMode: false,
					},
					externalToolDisplayDataFactory.build({
						contextExternalToolId,
						logoUrl: "logo-url",
					})
				);

				return {
					wrapper,
				};
			};

			it("should not show the default icon", () => {
				const { wrapper } = setup();

				const icon = wrapper
					.findComponent({ name: "ContentElementBar" })
					.attributes().icon;

				expect(icon).toBeUndefined();
			});
		});
	});

	describe("Loading", () => {
		describe("when the component is loading", () => {
			const setup = () => {
				const contextExternalToolId = "context-external-tool-id";

				useExternalToolElementDisplayStateMock.isLoading = ref(true);

				const { wrapper } = getWrapper({
					element: {
						...EMPTY_TEST_ELEMENT,
						content: { contextExternalToolId },
					},
					isEditMode: false,
				});

				return {
					wrapper,
				};
			};

			it("should display a loading state", () => {
				const { wrapper } = setup();

				const card = wrapper.findComponent({ ref: "externalToolElement" });

				expect(card.attributes("loading")).toEqual("true");
			});
		});

		describe("when the component has finished loading", () => {
			const setup = () => {
				const contextExternalToolId = "context-external-tool-id";

				useExternalToolElementDisplayStateMock.isLoading = ref(false);

				const { wrapper } = getWrapper(
					{
						element: {
							...EMPTY_TEST_ELEMENT,
							content: { contextExternalToolId },
						},
						isEditMode: false,
					},
					externalToolDisplayDataFactory.build({ contextExternalToolId })
				);

				return {
					wrapper,
				};
			};

			it("should display a loading state", () => {
				const { wrapper } = setup();

				const title = wrapper.findComponent({ ref: "externalToolElement" });

				expect(title.attributes("loading")).toBe("false");
			});
		});
	});

	describe("Dialog", () => {
		describe("when clicking on a un-configured tool card in edit mode", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					element: EMPTY_TEST_ELEMENT,
					isEditMode: true,
				});

				return {
					wrapper,
				};
			};

			it("should display the configuration dialog", async () => {
				const { wrapper } = setup();

				const card = wrapper.findComponent({
					ref: "externalToolElement",
				});

				card.vm.$emit("click");
				await nextTick();

				const dialog = wrapper.findComponent(
					ExternalToolElementConfigurationDialog
				);

				expect(dialog.props("isOpen")).toEqual(true);
			});
		});

		describe("when the dialog is saving a tool", () => {
			const setup = () => {
				const savedTool: ContextExternalTool = contextExternalToolFactory.build(
					{
						id: "contextExternalToolId",
					}
				);

				const { wrapper } = getWrapper({
					element: EMPTY_TEST_ELEMENT,
					isEditMode: true,
				});

				return {
					wrapper,
					savedTool,
				};
			};

			it("should update the elements content", async () => {
				const { wrapper, savedTool } = setup();

				const dialog = wrapper.findComponent(
					ExternalToolElementConfigurationDialog
				);

				dialog.vm.$emit("save", savedTool);
				await nextTick();

				expect(useContentElementStateMock.modelValue.value).toEqual({
					contextExternalToolId: savedTool.id,
				});
			});

			it("should fetch the display data", async () => {
				const { wrapper, savedTool } = setup();

				const dialog = wrapper.findComponent(
					ExternalToolElementConfigurationDialog
				);

				dialog.vm.$emit("save", savedTool);
				await nextTick();

				expect(
					useExternalToolElementDisplayStateMock.fetchDisplayData
				).toHaveBeenCalledWith(savedTool.id);
			});
		});
	});

	describe("Launch", () => {
		describe("when clicking on a configured tool card", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					element: {
						...EMPTY_TEST_ELEMENT,
						content: { contextExternalToolId: "contextExternalToolId" },
					},
					isEditMode: false,
				});

				return {
					wrapper,
				};
			};

			it("should launch the tool", async () => {
				const { wrapper } = setup();

				const card = wrapper.findComponent({
					ref: "externalToolElement",
				});

				card.vm.$emit("click");
				await nextTick();

				expect(useExternalToolLaunchStateMock.launchTool).toHaveBeenCalled();
			});

			it("should fetch launch request after launch", async () => {
				const { wrapper } = setup();

				const card = wrapper.findComponent({
					ref: "externalToolElement",
				});

				card.vm.$emit("click");
				await nextTick();

				expect(
					useExternalToolLaunchStateMock.fetchContextLaunchRequest
				).toHaveBeenCalled();
			});
		});
	});

	describe("Alert", () => {
		describe("when there is a display error", () => {
			const setup = () => {
				const error: BusinessError = {
					statusCode: 418,
					message: "Loading error",
				};

				useExternalToolElementDisplayStateMock.error.value = error;

				const { wrapper } = getWrapper(
					{
						element: EMPTY_TEST_ELEMENT,
						isEditMode: true,
					},
					externalToolDisplayDataFactory.build()
				);

				return {
					wrapper,
					error,
				};
			};

			it("should display an error alert", async () => {
				const { wrapper, error } = setup();

				const alert = wrapper.findComponent(ExternalToolElementAlert);

				expect(alert.props().error).toEqual(error);
			});
		});

		describe("when there is a launch error", () => {
			const setup = () => {
				const error: BusinessError = {
					statusCode: 418,
					message: "Loading error",
				};

				useExternalToolLaunchStateMock.error.value = error;

				const { wrapper } = getWrapper(
					{
						element: EMPTY_TEST_ELEMENT,
						isEditMode: true,
					},
					externalToolDisplayDataFactory.build()
				);

				return {
					wrapper,
					error,
				};
			};

			it("should display an error alert", async () => {
				const { wrapper, error } = setup();

				const alert = wrapper.findComponent(ExternalToolElementAlert);

				expect(alert.props().error).toEqual(error);
			});
		});

		describe("when the tool has a status", () => {
			const setup = () => {
				const status = contextExternalToolConfigurationStatusFactory.build({
					isIncompleteOnScopeContext: true,
				});

				const { wrapper } = getWrapper(
					{
						element: EMPTY_TEST_ELEMENT,
						isEditMode: true,
					},
					externalToolDisplayDataFactory.build({
						status,
					})
				);

				return {
					wrapper,
					status,
				};
			};

			it("should display a status alert", async () => {
				const { wrapper, status } = setup();

				const alert = wrapper.findComponent(ExternalToolElementAlert);

				expect(alert.props().toolStatus).toEqual(status);
			});
		});
	});

	describe("when refresh time is over", () => {
		const setup = () => {
			jest.useFakeTimers({ legacyFakeTimers: true });
			const { wrapper, refreshTime } = getWrapper(
				{
					element: {
						...EMPTY_TEST_ELEMENT,
						content: { contextExternalToolId: "contextExternalToolId" },
					},
					isEditMode: false,
				},
				externalToolDisplayDataFactory.build({
					status: schoolToolConfigurationStatusFactory.build(),
				})
			);

			return {
				wrapper,
				refreshTime,
			};
		};

		it("should call tool reference endpoint again", async () => {
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
});
