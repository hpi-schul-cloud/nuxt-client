import {
	ContentElementType,
	ExternalToolElementResponse,
} from "@/serverApi/v3";
import ContextExternalToolsModule from "@/store/context-external-tools";
import { CONTEXT_EXTERNAL_TOOLS_MODULE_KEY, I18N_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import { i18nMock, timestampsResponseFactory } from "@@/tests/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { createMock } from "@golevelup/ts-jest";
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
	const getWrapper = (props: {
		element: ExternalToolElementResponse;
		isEditMode: boolean;
	}) => {
		document.body.setAttribute("data-app", "true");

		const contextExternalToolsModule = createModuleMocks(
			ContextExternalToolsModule,
			{
				getExternalToolDisplayDataList: [],
			}
		);

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

		const useDeleteConfirmationDialogMock = jest.mocked(
			useDeleteConfirmationDialog
		);
		const useDeleteConfirmationDialogReturnValue =
			createMock<ReturnType<typeof useDeleteConfirmationDialog>>();
		useDeleteConfirmationDialogMock.mockReturnValue(
			useDeleteConfirmationDialogReturnValue
		);

		return {
			wrapper,
			contextExternalToolsModule,
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
});
