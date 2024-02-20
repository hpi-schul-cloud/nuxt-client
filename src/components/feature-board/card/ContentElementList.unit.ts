import { ContentElementType } from "@/serverApi/v3";
import EnvConfigModule from "@/store/env-config";
import { ConfigResponse } from "@/serverApi/v3/api";
import { AnyContentElement } from "@/types/board/ContentElement";
import { ENV_CONFIG_MODULE_KEY, I18N_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import { i18nMock } from "@@/tests/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { DrawingContentElement } from "@feature-board-drawing-element";
import { ExternalToolElement } from "@feature-board-external-tool-element";
import { FileContentElement } from "@feature-board-file-element";
import { LinkContentElement } from "@feature-board-link-element";
import { SubmissionContentElement } from "@feature-board-submission-element";
import { RichTextContentElement } from "@feature-board-text-element";
import { createMock } from "@golevelup/ts-jest";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import ContentElementList from "./ContentElementList.vue";

describe("ContentElementList", () => {
	let wrapper: Wrapper<Vue>;

	const setup = (props: {
		elements: AnyContentElement[];
		isEditMode: boolean;
		cardId: string;
	}) => {
		document.body.setAttribute("data-app", "true");

		const mockedEnvConfigModule = createModuleMocks(EnvConfigModule, {
			getEnv: createMock<ConfigResponse>({
				FEATURE_COLUMN_BOARD_SUBMISSIONS_ENABLED: true,
				FEATURE_COLUMN_BOARD_LINK_ELEMENT_ENABLED: true,
				FEATURE_COLUMN_BOARD_EXTERNAL_TOOLS_ENABLED: true,
				FEATURE_TEAMS_ENABLED: true,
			}),
		});

		wrapper = shallowMount(ContentElementList as MountOptions<Vue>, {
			...createComponentMocks({}),
			propsData: { ...props },
			provide: {
				[I18N_KEY.valueOf()]: i18nMock,
				[ENV_CONFIG_MODULE_KEY.valueOf()]: mockedEnvConfigModule,
			},
		});
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			setup({
				elements: [],
				isEditMode: false,
				cardId: "cardId",
			});
			expect(wrapper.findComponent(ContentElementList).exists()).toBe(true);
		});

		const elementComponents = [
			{
				elementType: ContentElementType.RichText,
				component: RichTextContentElement,
			},
			{
				elementType: ContentElementType.File,
				component: FileContentElement,
			},
			{
				elementType: ContentElementType.Link,
				component: LinkContentElement,
			},
			{
				elementType: ContentElementType.SubmissionContainer,
				component: SubmissionContentElement,
			},
			{
				elementType: ContentElementType.ExternalTool,
				component: ExternalToolElement,
			},
			{
				elementType: ContentElementType.Drawing,
				component: DrawingContentElement,
			},
		];

		it.each(elementComponents)(
			"should render $elementType-elements",
			({ elementType, component }) => {
				setup({
					elements: [{ type: elementType } as AnyContentElement],
					isEditMode: false,
					cardId: "cardId",
				});
				expect(wrapper.findComponent(component).exists()).toBe(true);
			}
		);

		it.each(elementComponents)(
			"should propagate isEditMode to children of $elementType-elements",
			({ elementType, component }) => {
				const isEditModeResult = true;

				setup({
					elements: [{ type: elementType } as AnyContentElement],
					isEditMode: isEditModeResult,
					cardId: "cardId",
				});

				const childComponent = wrapper.findComponent(component);

				expect(childComponent.exists()).toBe(true);
				expect(childComponent.props("isEditMode")).toBe(isEditModeResult);
			}
		);
	});
});
