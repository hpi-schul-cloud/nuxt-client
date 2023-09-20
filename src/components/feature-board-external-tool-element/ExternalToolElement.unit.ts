import {
	ContentElementType,
	ExternalToolElementResponse,
} from "@/serverApi/v3";
import ContextExternalToolsModule from "@/store/context-external-tools";
import { ExternalToolDisplayData } from "@/store/external-tool";
import { CONTEXT_EXTERNAL_TOOLS_MODULE_KEY, I18N_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import {
	externalToolDisplayDataFactory,
	i18nMock,
	timestampsResponseFactory,
} from "@@/tests/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { createMock } from "@golevelup/ts-jest";
import { mdiPuzzleOutline } from "@mdi/js";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import ExternalToolElement from "./ExternalToolElement.vue";

jest.mock("@data-board", () => {
	return {
		useBoardFocusHandler: jest.fn(),
	};
});
jest.mock("@ui-confirmation-dialog");

const TEST_ELEMENT: ExternalToolElementResponse = {
	id: "external-tool-element-id",
	content: {},
	type: ContentElementType.ExternalTool,
	timestamps: timestampsResponseFactory.build(),
};

describe("ExternalToolElement", () => {
	const getWrapper = (
		props: {
			element: ExternalToolElementResponse;
			isEditMode: boolean;
		},
		displayData: ExternalToolDisplayData[] = []
	) => {
		document.body.setAttribute("data-app", "true");

		const contextExternalToolsModule = createModuleMocks(
			ContextExternalToolsModule,
			{
				getExternalToolDisplayDataList: displayData,
			}
		);

		const useDeleteConfirmationDialogReturnValue =
			createMock<ReturnType<typeof useDeleteConfirmationDialog>>();
		jest
			.mocked(useDeleteConfirmationDialog)
			.mockReturnValue(useDeleteConfirmationDialogReturnValue);

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
					...props,
				},
				provide: {
					[I18N_KEY.valueOf()]: i18nMock,
					[CONTEXT_EXTERNAL_TOOLS_MODULE_KEY.valueOf()]:
						contextExternalToolsModule,
				},
			}
		);

		return {
			wrapper,
			contextExternalToolsModule,
			useDeleteConfirmationDialogReturnValue,
		};
	};

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("when no tool is selected", () => {
		describe("when not in edit mode", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					element: TEST_ELEMENT,
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
					element: TEST_ELEMENT,
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
							...TEST_ELEMENT,
							content: { contextExternalToolId },
						},
						isEditMode: false,
					},
					[
						externalToolDisplayDataFactory.build({
							contextExternalToolId,
							logoUrl: undefined,
						}),
					]
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
							...TEST_ELEMENT,
							content: { contextExternalToolId },
						},
						isEditMode: false,
					},
					[
						externalToolDisplayDataFactory.build({
							contextExternalToolId,
							logoUrl: "logo-url",
						}),
					]
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
					element: TEST_ELEMENT,
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

				const { wrapper } = getWrapper(
					{
						element: {
							...TEST_ELEMENT,
							content: { contextExternalToolId },
						},
						isEditMode: false,
					},
					[]
				);

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
							...TEST_ELEMENT,
							content: { contextExternalToolId },
						},
						isEditMode: false,
					},
					[toolDisplayData]
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

				const { wrapper } = getWrapper(
					{
						element: {
							...TEST_ELEMENT,
							content: { contextExternalToolId },
						},
						isEditMode: false,
					},
					[]
				);

				return {
					wrapper,
				};
			};

			it("should display a loading state", () => {
				const { wrapper } = setup();

				const title = wrapper.findComponent({ ref: "externalToolElement" });

				expect(title.attributes("loading")).toEqual("true");
			});
		});

		describe("when the component has finished loading", () => {
			const setup = () => {
				const contextExternalToolId = "context-external-tool-id";

				const { wrapper } = getWrapper(
					{
						element: {
							...TEST_ELEMENT,
							content: { contextExternalToolId },
						},
						isEditMode: false,
					},
					[externalToolDisplayDataFactory.build({ contextExternalToolId })]
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
					element: TEST_ELEMENT,
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
					element: TEST_ELEMENT,
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

		describe("when deleting the element", () => {
			const setup = () => {
				const contextExternalToolId = "context-external-tool-id";
				const toolDisplayData = externalToolDisplayDataFactory.build({
					contextExternalToolId,
					logoUrl: "logo-url",
				});

				const { wrapper, useDeleteConfirmationDialogReturnValue } = getWrapper(
					{
						element: {
							...TEST_ELEMENT,
							content: { contextExternalToolId },
						},
						isEditMode: true,
					},
					[toolDisplayData]
				);

				return {
					wrapper,
					useDeleteConfirmationDialogReturnValue,
					toolDisplayData,
				};
			};

			it("should display a delete dialog", () => {
				const {
					wrapper,
					useDeleteConfirmationDialogReturnValue,
					toolDisplayData,
				} = setup();

				const menu = wrapper.findComponent({ ref: "externalToolElementMenu" });

				menu.vm.$emit("delete:element");

				expect(
					useDeleteConfirmationDialogReturnValue.askDeleteConfirmation
				).toHaveBeenCalledWith(toolDisplayData.name, "boardElement");
			});
		});
	});
});
