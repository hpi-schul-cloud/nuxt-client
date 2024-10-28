import { DrawingElementResponse } from "@/serverApi/v3";
import { ConfigResponse } from "@/serverApi/v3/api";
import EnvConfigModule from "@/store/env-config";
import NotifierModule from "@/store/notifier";
import { ENV_CONFIG_MODULE_KEY, NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { drawingElementResponseFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { createMock } from "@golevelup/ts-jest";
import {
	BoardMenu,
	BoardMenuActionDelete,
	BoardMenuActionMoveDown,
	BoardMenuActionMoveUp,
} from "@ui-board";
import { shallowMount } from "@vue/test-utils";
import DrawingContentElement from "./DrawingContentElement.vue";
import InnerContent from "./InnerContent.vue";

// Mocks
jest.mock("@data-board", () => ({
	useBoardFocusHandler: jest.fn(),
	useContentElementState: jest.fn(() => ({ modelValue: {} })),
	useDeleteConfirmationDialog: jest.fn(),
}));
jest.mock("@feature-board");

const DRAWING_ELEMENT = drawingElementResponseFactory.build();

const mockedEnvConfigModule = createModuleMocks(EnvConfigModule, {
	getEnv: createMock<ConfigResponse>({
		FEATURE_TLDRAW_ENABLED: true,
	}),
});

describe("DrawingContentElement", () => {
	const notifierModule = createModuleMocks(NotifierModule);

	const setup = (props: {
		element: DrawingElementResponse;
		isEditMode: boolean;
	}) => {
		const wrapper = shallowMount(DrawingContentElement, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
					[ENV_CONFIG_MODULE_KEY.valueOf()]: mockedEnvConfigModule,
				},
			},
			propsData: props,
		});

		return { wrapper };
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("when component is mounted", () => {
		it("renders correctly", () => {
			const { wrapper } = setup({
				element: DRAWING_ELEMENT,
				isEditMode: false,
			});
			expect(wrapper.findComponent(InnerContent).exists()).toBe(true);
		});

		it("should have the correct href and target attribute", async () => {
			const { wrapper } = setup({
				element: DRAWING_ELEMENT,
				isEditMode: false,
			});

			const elementCard = wrapper.findComponent({
				ref: "drawingElement",
			});

			expect(elementCard.attributes("href")).toBe(
				`/tldraw?parentId=${DRAWING_ELEMENT.id}`
			);
			expect(elementCard.attributes("target")).toBe("_blank");
		});

		it("should have the correct aria-label", async () => {
			const { wrapper } = setup({
				element: DRAWING_ELEMENT,
				isEditMode: false,
			});

			const elementCard = wrapper.findComponent({
				ref: "drawingElement",
			});

			expect(elementCard.attributes("aria-label")).toBe(
				"components.cardElement.drawingElement, common.ariaLabel.newTab"
			);
		});

		describe("when element is in view mode", () => {
			it.each(["up", "down"])(
				"should not 'emit move-keyboard:edit' when arrow key %s is pressed",
				async (key) => {
					const { wrapper } = setup({
						element: DRAWING_ELEMENT,
						isEditMode: false,
					});

					const elementCard = wrapper.findComponent({
						ref: "drawingElement",
					});

					await elementCard.trigger(`keydown.${key}`);

					expect(wrapper.emitted()).not.toHaveProperty("move-keyboard:edit");
				}
			);

			it("should not render element menu", () => {
				const { wrapper } = setup({
					element: DRAWING_ELEMENT,
					isEditMode: false,
				});

				const elementMenu = wrapper.findComponent(BoardMenu);

				expect(elementMenu.exists()).toBe(false);
			});
		});

		describe("when element is in edit-mode", () => {
			it.each(["up", "down"])(
				"should 'emit move-keyboard:edit' when arrow key %s is pressed",
				async (key) => {
					const { wrapper } = setup({
						element: DRAWING_ELEMENT,
						isEditMode: true,
					});

					const elementCard = wrapper.findComponent({
						ref: "drawingElement",
					});

					await elementCard.trigger(`keydown.${key}`);

					expect(wrapper.emitted()).toHaveProperty("move-keyboard:edit");
				}
			);

			it("should render element menu", () => {
				const { wrapper } = setup({
					element: DRAWING_ELEMENT,
					isEditMode: true,
				});

				const elementMenu = wrapper.findComponent(BoardMenu);

				expect(elementMenu.exists()).toBe(true);
			});

			it("should emit 'delete:element' event when delete menu item is clicked", async () => {
				const { wrapper } = setup({
					element: DRAWING_ELEMENT,
					isEditMode: true,
				});

				const menuItem = wrapper.findComponent(BoardMenuActionDelete);

				await menuItem.trigger("click");

				expect(wrapper.emitted()).toHaveProperty("delete:element");
			});

			it("should emit 'move-up:edit' event when move up menu item is clicked", async () => {
				const { wrapper } = setup({
					element: DRAWING_ELEMENT,
					isEditMode: true,
				});

				const menuItem = wrapper.findComponent(BoardMenuActionMoveUp);

				await menuItem.trigger("click");

				expect(wrapper.emitted()).toHaveProperty("move-up:edit");
			});

			it("should emit 'move:down edit' event when move down menu item is clicked", async () => {
				const { wrapper } = setup({
					element: DRAWING_ELEMENT,
					isEditMode: true,
				});

				const menuItem = wrapper.findComponent(BoardMenuActionMoveDown);

				await menuItem.trigger("click");

				expect(wrapper.emitted()).toHaveProperty("move-down:edit");
			});
		});
	});
});
