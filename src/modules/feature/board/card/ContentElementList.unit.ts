import { ContentElementType } from "@/serverApi/v3";
import EnvConfigModule from "@/store/env-config";
import { ConfigResponse } from "@/serverApi/v3/api";
import { AnyContentElement } from "@/types/board/ContentElement";
import { ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import { DrawingContentElement } from "@feature-board-drawing-element";
import { ExternalToolElement } from "@feature-board-external-tool-element";
import { FileContentElement } from "@feature-board-file-element";
import { LinkContentElement } from "@feature-board-link-element";
import { SubmissionContentElement } from "@feature-board-submission-element";
import { RichTextContentElement } from "@feature-board-text-element";
import { createMock } from "@golevelup/ts-jest";
import { shallowMount } from "@vue/test-utils";
import ContentElementList from "./ContentElementList.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";

describe("ContentElementList", () => {
	const setup = (props: {
		elements: AnyContentElement[];
		isEditMode: boolean;
		isDetailView: boolean;
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

		const wrapper = shallowMount(ContentElementList, {
			global: {
				plugins: [createTestingI18n(), createTestingVuetify()],
				provide: {
					[ENV_CONFIG_MODULE_KEY.valueOf()]: mockedEnvConfigModule,
				},
			},
			props: { ...props },
		});

		return { wrapper };
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup({
				elements: [],
				isEditMode: false,
				isDetailView: false,
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
				const { wrapper } = setup({
					elements: [{ type: elementType } as AnyContentElement],
					isEditMode: false,
					isDetailView: false,
				});
				expect(wrapper.findComponent(component).exists()).toBe(true);
			}
		);

		it.each(elementComponents)(
			"should propagate isEditMode to children of $elementType-elements",
			({ elementType, component }) => {
				const isEditModeResult = true;

				const { wrapper } = setup({
					elements: [{ type: elementType } as AnyContentElement],
					isEditMode: isEditModeResult,
					isDetailView: false,
				});

				const childComponent = wrapper.findComponent(component);

				expect(childComponent.exists()).toBe(true);
				expect(childComponent.props("isEditMode")).toBe(isEditModeResult);
			}
		);
	});
});
