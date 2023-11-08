import {
	ContentElementType,
	ExternalToolElementResponse,
} from "@/serverApi/v3";
import {
	ExternalToolDisplayData,
	ToolConfigurationStatus,
} from "@/store/external-tool";
import { ContextExternalTool } from "@/store/external-tool/context-external-tool";
import { I18N_KEY } from "@/utils/inject";
import {
	contextExternalToolFactory,
	externalToolDisplayDataFactory,
	i18nMock,
	timestampsResponseFactory,
} from "@@/tests/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { useBoardFocusHandler, useContentElementState } from "@data-board";
import {
	useExternalToolElementDisplayState,
	useExternalToolLaunchState,
} from "@data-external-tool";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { mdiPuzzleOutline } from "@mdi/js";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue, { ref } from "vue";
import ExternalToolElement from "./ExternalToolElement.vue";
import { useSharedLastCreatedElement } from "@util-board";

jest.mock("@data-board");
jest.mock("@data-external-tool");
jest.mock("@ui-confirmation-dialog");
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
	let useSharedExternalToolElementDisplayStateMock: DeepMocked<
		ReturnType<typeof useExternalToolElementDisplayState>
	>;
	let useExternalToolLaunchStateMock: DeepMocked<
		ReturnType<typeof useExternalToolLaunchState>
	>;
	let useSharedLastCreatedElementMock: DeepMocked<
		ReturnType<typeof useSharedLastCreatedElement>
	>;

	beforeEach(() => {
		useContentElementStateMock =
			createMock<ReturnType<typeof useContentElementState>>();
		useBoardFocusHandlerMock =
			createMock<ReturnType<typeof useBoardFocusHandler>>();
		useSharedExternalToolElementDisplayStateMock =
			createMock<ReturnType<typeof useExternalToolElementDisplayState>>();
		useExternalToolLaunchStateMock =
			createMock<ReturnType<typeof useExternalToolLaunchState>>();
		useSharedLastCreatedElementMock =
			createMock<ReturnType<typeof useSharedLastCreatedElement>>();

		jest
			.mocked(useContentElementState)
			.mockReturnValue(useContentElementStateMock);
		jest.mocked(useBoardFocusHandler).mockReturnValue(useBoardFocusHandlerMock);
		jest
			.mocked(useExternalToolElementDisplayState)
			.mockReturnValue(useSharedExternalToolElementDisplayStateMock);
		jest
			.mocked(useExternalToolLaunchState)
			.mockReturnValue(useExternalToolLaunchStateMock);
		jest
			.mocked(useSharedLastCreatedElement)
			.mockReturnValue(useSharedLastCreatedElementMock);
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

		const useDeleteConfirmationDialogReturnValue =
			createMock<ReturnType<typeof useDeleteConfirmationDialog>>();
		jest
			.mocked(useDeleteConfirmationDialog)
			.mockReturnValue(useDeleteConfirmationDialogReturnValue);

		useContentElementStateMock.modelValue = ref(props.element.content);
		useSharedExternalToolElementDisplayStateMock.displayData = ref(displayData);
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
			useDeleteConfirmationDialogReturnValue,
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
						status: ToolConfigurationStatus.Latest,
					})
				);

				await Vue.nextTick();

				expect(
					useSharedExternalToolElementDisplayStateMock.fetchDisplayData
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
						status: ToolConfigurationStatus.Latest,
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
						status: ToolConfigurationStatus.Outdated,
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
					useSharedExternalToolElementDisplayStateMock.fetchDisplayData
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

	describe("Icon", () => {
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
					.findComponent({ ref: "externalToolElement" })
					.findComponent({ name: "v-icon" });

				expect(icon.text()).toEqual(mdiPuzzleOutline);
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

			it("should show the logo", () => {
				const { wrapper } = setup();

				const img = wrapper
					.findComponent({ ref: "externalToolElement" })
					.findComponent({ name: "v-img" });

				expect(img.isVisible()).toEqual(true);
			});
		});
	});

	describe("Title", () => {
		describe("when no tool is selected", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					element: EMPTY_TEST_ELEMENT,
					isEditMode: true,
				});

				return {
					wrapper,
				};
			};

			it("should display a selection text", () => {
				const { wrapper } = setup();

				const title = wrapper
					.findComponent({ ref: "externalToolElement" })
					.find(".title");

				expect(title.text()).toEqual(
					"feature-board-external-tool-element.placeholder.selectTool"
				);
			});
		});

		describe("when the title is loading", () => {
			const setup = () => {
				const contextExternalToolId = "context-external-tool-id";

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

			it("should display '...'", () => {
				const { wrapper } = setup();

				const title = wrapper
					.findComponent({ ref: "externalToolElement" })
					.find(".title");

				expect(title.text()).toEqual("...");
			});
		});

		describe("when the title is available", () => {
			const setup = () => {
				const contextExternalToolId = "context-external-tool-id";
				const toolDisplayData = externalToolDisplayDataFactory.build({
					contextExternalToolId,
					logoUrl: "logo-url",
				});

				const { wrapper } = getWrapper(
					{
						element: {
							...EMPTY_TEST_ELEMENT,
							content: { contextExternalToolId },
						},
						isEditMode: false,
					},
					toolDisplayData
				);

				return {
					wrapper,
					toolDisplayData,
				};
			};

			it("should display the tools name", () => {
				const { wrapper, toolDisplayData } = setup();

				const title = wrapper
					.findComponent({ ref: "externalToolElement" })
					.find(".title");

				expect(title.text()).toEqual(toolDisplayData.name);
			});
		});
	});

	describe("Loading", () => {
		describe("when the component is loading", () => {
			const setup = () => {
				const contextExternalToolId = "context-external-tool-id";

				useSharedExternalToolElementDisplayStateMock.isLoading = ref(true);

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

				useSharedExternalToolElementDisplayStateMock.isLoading = ref(false);

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

	describe("Menu", () => {
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

			it("should display the three dot menu", () => {
				const { wrapper } = setup();

				const menu = wrapper.findComponent({ ref: "externalToolElementMenu" });

				expect(menu.isVisible()).toEqual(true);
			});
		});

		describe("when in display mode", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					element: EMPTY_TEST_ELEMENT,
					isEditMode: false,
				});

				return {
					wrapper,
				};
			};

			it("should not display the three dot menu", () => {
				const { wrapper } = setup();

				const menu = wrapper.findComponent({ ref: "externalToolElementMenu" });

				expect(menu.exists()).toEqual(false);
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
					useSharedExternalToolElementDisplayStateMock.fetchDisplayData
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
		});
	});
});
