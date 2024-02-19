import {
	ContentElementType,
	ExternalToolElementResponse,
} from "@/serverApi/v3";
import { ExternalToolDisplayData } from "@/store/external-tool";
import { ContextExternalTool } from "@/store/external-tool/context-external-tool";
import { BusinessError } from "@/store/types/commons";
import { I18N_KEY } from "@/utils/inject";
import {
	ContextExternalToolConfigurationStatusFactory,
	contextExternalToolFactory,
	externalToolDisplayDataFactory,
	i18nMock,
	schoolToolConfigurationStatusFactory,
	timestampsResponseFactory,
} from "@@/tests/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { useBoardFocusHandler, useContentElementState } from "@data-board";
import {
	useContextExternalToolConfigurationStatus,
	useExternalToolElementDisplayState,
	useExternalToolLaunchState,
} from "@data-external-tool";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { mdiPuzzleOutline } from "@mdi/js";
import { useSharedLastCreatedElement } from "@util-board";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue, { ref } from "vue";
import ExternalToolElement from "./ExternalToolElement.vue";

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
		ReturnType<typeof useExternalToolElementDisplayState>
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
		useExternalToolElementDisplayStateMock =
			createMock<ReturnType<typeof useExternalToolElementDisplayState>>();
		useExternalToolLaunchStateMock =
			createMock<ReturnType<typeof useExternalToolLaunchState>>();
		useSharedLastCreatedElementMock =
			createMock<ReturnType<typeof useSharedLastCreatedElement>>();
		useToolConfigurationStatusMock =
			createMock<
				ReturnType<typeof useContextExternalToolConfigurationStatus>
			>();

		jest
			.mocked(useContentElementState)
			.mockReturnValue(useContentElementStateMock);
		jest.mocked(useBoardFocusHandler).mockReturnValue(useBoardFocusHandlerMock);
		jest
			.mocked(useExternalToolElementDisplayState)
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
		props: {
			element: ExternalToolElementResponse;
			isEditMode: boolean;
		},
		displayData?: ExternalToolDisplayData
	) => {
		document.body.setAttribute("data-app", "true");

		useContentElementStateMock.modelValue = ref(props.element.content);
		useExternalToolElementDisplayStateMock.displayData = ref(displayData);
		useExternalToolElementDisplayStateMock.error = ref(undefined);
		useSharedLastCreatedElementMock.lastCreatedElementId = ref(undefined);

		const wrapper: Wrapper<Vue> = shallowMount(
			ExternalToolElement as MountOptions<Vue>,
			{
				...createComponentMocks({
					i18n: true,
				}),
				propsData: {
					isFirstElement: false,
					isLastElement: false,
					hasMultipleElements: false,
					cardId: "cardId",
					...props,
				},
				provide: {
					[I18N_KEY.valueOf()]: i18nMock,
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

				await Vue.nextTick();

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

				await Vue.nextTick();

				expect(
					useExternalToolLaunchStateMock.fetchLaunchRequest
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
						status: ContextExternalToolConfigurationStatusFactory.build({
							isOutdatedOnScopeContext: true,
							isOutdatedOnScopeSchool: true,
						}),
					})
				);

				await Vue.nextTick();

				expect(
					useExternalToolLaunchStateMock.fetchLaunchRequest
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
						status: ContextExternalToolConfigurationStatusFactory.build({
							isIncompleteOnScopeContext: true,
						}),
					})
				);

				await Vue.nextTick();

				expect(
					useExternalToolLaunchStateMock.fetchLaunchRequest
				).not.toHaveBeenCalled();
			});
		});

		describe("when the element does not have a tool attached", () => {
			it("should open the configuration dialog immediately", async () => {
				const { wrapper } = getWrapper({
					element: EMPTY_TEST_ELEMENT,
					isEditMode: true,
				});

				useSharedLastCreatedElementMock.lastCreatedElementId.value =
					EMPTY_TEST_ELEMENT.id;

				await Vue.nextTick();

				const dialog = wrapper.find(
					'[data-testid="board-external-tool-element-configuration-dialog"]'
				);

				expect(dialog.props("isOpen")).toEqual(true);
			});

			it("should not load the display data", async () => {
				getWrapper({
					element: EMPTY_TEST_ELEMENT,
					isEditMode: false,
				});

				await Vue.nextTick();

				expect(
					useExternalToolElementDisplayStateMock.fetchDisplayData
				).not.toHaveBeenCalled();
			});

			it("should not load the launch request", async () => {
				getWrapper({
					element: EMPTY_TEST_ELEMENT,
					isEditMode: false,
				});

				await Vue.nextTick();

				expect(
					useExternalToolLaunchStateMock.fetchLaunchRequest
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

				expect(title.attributes("loading")).toBeFalsy();
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
				await Vue.nextTick();

				const dialog = wrapper.find(
					'[data-testid="board-external-tool-element-configuration-dialog"]'
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

				const dialog = wrapper.find(
					'[data-testid="board-external-tool-element-configuration-dialog"]'
				);

				dialog.vm.$emit("save", savedTool);
				await Vue.nextTick();

				expect(useContentElementStateMock.modelValue.value).toEqual({
					contextExternalToolId: savedTool.id,
				});
			});

			it("should fetch the display data", async () => {
				const { wrapper, savedTool } = setup();

				const dialog = wrapper.find(
					'[data-testid="board-external-tool-element-configuration-dialog"]'
				);

				dialog.vm.$emit("save", savedTool);
				await Vue.nextTick();

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
				await Vue.nextTick();

				expect(useExternalToolLaunchStateMock.launchTool).toHaveBeenCalled();
			});

			it("should fetch launch request after launch", async () => {
				const { wrapper } = setup();

				const card = wrapper.findComponent({
					ref: "externalToolElement",
				});

				card.vm.$emit("click");
				await Vue.nextTick();

				expect(
					useExternalToolLaunchStateMock.fetchLaunchRequest
				).toHaveBeenCalled();
			});
		});
	});

	describe("Alert", () => {
		describe("when there is an error or the tool is outdated", () => {
			const setup = () => {
				const error: BusinessError = {
					statusCode: 418,
					message: "Loading error",
				};

				const toolOutdatedStatus = schoolToolConfigurationStatusFactory.build({
					isOutdatedOnScopeSchool: true,
				});

				const { wrapper } = getWrapper(
					{
						element: EMPTY_TEST_ELEMENT,
						isEditMode: true,
					},
					externalToolDisplayDataFactory.build({
						status: toolOutdatedStatus,
					})
				);

				useExternalToolElementDisplayStateMock.error.value = error;

				return {
					wrapper,
					error,
					toolOutdatedStatus,
				};
			};

			it("should display an outdated alert", async () => {
				const { wrapper, toolOutdatedStatus } = setup();

				const alert = wrapper.find(
					'[data-testid="board-external-tool-element-alert"]'
				);

				expect(alert.props("toolStatus")).toEqual(toolOutdatedStatus);
			});

			it("should display an error alert", async () => {
				const { wrapper, error } = setup();

				await Vue.nextTick();

				const alert = wrapper.find(
					'[data-testid="board-external-tool-element-alert"]'
				);

				expect(alert.props("error")).toEqual(error);
			});
		});

		describe("when the tool is incomplete", () => {
			const setup = () => {
				const toolIncompleteStatus =
					ContextExternalToolConfigurationStatusFactory.build({
						isIncompleteOnScopeContext: true,
					});

				const { wrapper } = getWrapper(
					{
						element: EMPTY_TEST_ELEMENT,
						isEditMode: true,
					},
					externalToolDisplayDataFactory.build({
						status: toolIncompleteStatus,
					})
				);

				return {
					wrapper,
					toolIncompleteStatus,
				};
			};

			it("should display an incomplete alert", async () => {
				const { wrapper, toolIncompleteStatus } = setup();

				const alert = wrapper.find(
					'[data-testid="board-external-tool-element-alert"]'
				);

				expect(alert.props("toolStatus")).toEqual(toolIncompleteStatus);
			});
		});
	});

	describe("when refresh time is over", () => {
		const setup = () => {
			const { wrapper } = getWrapper(
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
			};
		};

		it("should call tool reference endpoint again", async () => {
			jest.useFakeTimers("legacy");
			setup();
			await Vue.nextTick();

			expect(
				useExternalToolLaunchStateMock.fetchLaunchRequest
			).toHaveBeenCalledTimes(1);

			jest.advanceTimersByTime(300000);
			await Vue.nextTick();

			expect(
				useExternalToolLaunchStateMock.fetchLaunchRequest
			).toHaveBeenCalledTimes(2);
		});
	});
});
