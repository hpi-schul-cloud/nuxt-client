import { CollaborativeTextEditorParentType } from "@/serverApi/v3";
import NotifierModule from "@/store/notifier";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import { collaborativeTextEditorElementResponseFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { CollaborativeTextEditorElement } from "@feature-board-collaborative-text-editor-element";
import { createMock } from "@golevelup/ts-jest";
import { ContentElementBar } from "@ui-board";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import CollaborativeTextEditorElementMenu from "./components/CollaborativeTextEditorElementMenu.vue";
import { setupCollaborativeTextEditorApiMock } from "./test-utils/collaborativeTextEditorApiMock";

// Mocks
jest.mock("@data-board", () => ({
	useBoardFocusHandler: jest.fn(),
	useContentElementState: jest.fn(() => ({ modelValue: {} })),
	useDeleteConfirmationDialog: jest.fn(),
}));
jest.mock("@feature-board");
jest.mock("./composables/CollaborativeTextEditorApi.composable");

describe("CollaborativeTextEditorElement", () => {
	const notifierModule = createModuleMocks(NotifierModule);

	const setup = (props: { isEditMode: boolean }) => {
		document.body.setAttribute("data-app", "true");

		const COLLABORATIVE_TEXTEDITOR_ELEMENT =
			collaborativeTextEditorElementResponseFactory.build();

		const getUrlMock = jest
			.fn()
			.mockImplementation(
				(parentId: string, parentType: CollaborativeTextEditorParentType) => {
					return `${parentType}/${parentId}`;
				}
			);

		const { getUrl } = setupCollaborativeTextEditorApiMock({
			getUrlMock,
		});

		const wrapper = mount(CollaborativeTextEditorElement, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				},
			},
			propsData: { ...props, element: COLLABORATIVE_TEXTEDITOR_ELEMENT },
		});

		const windowMock = createMock<Window>();
		jest.spyOn(window, "open").mockImplementation(() => windowMock);

		return {
			wrapper,
			isEditMode: true,
			element: COLLABORATIVE_TEXTEDITOR_ELEMENT,
			getUrl,
		};
	};

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("when component is not in edit-mode", () => {
		it("should render the element corrrectly", () => {
			const { wrapper } = setup({
				isEditMode: false,
			});
			expect(
				wrapper.findComponent(CollaborativeTextEditorElement).isVisible()
			).toBe(true);
		});

		it("should render the ContentElementBar", () => {
			const { wrapper } = setup({
				isEditMode: false,
			});
			expect(wrapper.findComponent(ContentElementBar).exists()).toBe(true);
		});

		it("should not render the BoardMenu", () => {
			const { wrapper } = setup({
				isEditMode: false,
			});

			const boardMenu = wrapper.findComponent(
				CollaborativeTextEditorElementMenu
			);

			expect(boardMenu.exists()).toBe(false);
		});

		describe("when element is clicked", () => {
			it("should call getUrl", async () => {
				const { wrapper, element, getUrl } = setup({
					isEditMode: false,
				});

				const card = wrapper.findComponent({
					ref: "collaborativetextEditorElement",
				});

				await card.trigger("click");

				expect(getUrl).toHaveBeenCalledTimes(1);
				expect(getUrl).toHaveBeenCalledWith(
					element.id,
					CollaborativeTextEditorParentType.ContentElement
				);
			});

			it("should open collaborative text editor in new tab correctly", async () => {
				const { wrapper, element } = setup({
					isEditMode: false,
				});

				const card = wrapper.findComponent({
					ref: "collaborativetextEditorElement",
				});

				await card.trigger("click");

				expect(window.open).toHaveBeenCalledTimes(1);
				expect(window.open).toHaveBeenCalledWith(
					`${CollaborativeTextEditorParentType.ContentElement}/${element.id}`,
					"_blank"
				);
			});
		});
	});

	describe("when component is in edit-mode", () => {
		it("should render BoardMenu element", async () => {
			const { wrapper } = setup({
				isEditMode: true,
			});

			const boardMenu = wrapper.findComponent(
				CollaborativeTextEditorElementMenu
			);
			expect(boardMenu.exists()).toBe(true);
		});

		describe("when move down is emitted by CollaborativeTextEditorElementMenu", () => {
			it('should emit "move-down:edit" collaborative text editor', async () => {
				const { wrapper } = setup({
					isEditMode: true,
				});

				const boardMenu = wrapper.findComponent(
					CollaborativeTextEditorElementMenu
				);
				boardMenu.vm.$emit("move-down:element");

				expect(wrapper.emitted("move-down:edit")).toBeTruthy();
			});
		});

		describe("when move up is clicked", () => {
			it('should emit "move-up" collaborative text editor', async () => {
				const { wrapper } = setup({
					isEditMode: true,
				});

				const boardMenu = wrapper.findComponent(
					CollaborativeTextEditorElementMenu
				);
				boardMenu.vm.$emit("move-up:element");

				expect(wrapper.emitted("move-up:edit")).toBeTruthy();
			});
		});

		describe("when delete is clicked", () => {
			it('should emit "delete" collaborative text editor', async () => {
				const { wrapper } = setup({
					isEditMode: true,
				});

				const boardMenu = wrapper.findComponent(
					CollaborativeTextEditorElementMenu
				);
				boardMenu.vm.$emit("delete:element", Promise.resolve(true));
				await nextTick();

				expect(wrapper.emitted("delete:element")).toBeTruthy();
			});
		});

		describe("when element is clicked", () => {
			it("should call getUrl", async () => {
				const { wrapper, element, getUrl } = setup({
					isEditMode: true,
				});

				const card = wrapper.findComponent({
					ref: "collaborativetextEditorElement",
				});

				await card.trigger("click");

				expect(getUrl).toHaveBeenCalledTimes(1);
				expect(getUrl).toHaveBeenCalledWith(
					element.id,
					CollaborativeTextEditorParentType.ContentElement
				);
			});

			it("should open collaborative text editor in new tab correctly", async () => {
				const { wrapper, element } = setup({
					isEditMode: true,
				});

				const card = wrapper.findComponent({
					ref: "collaborativetextEditorElement",
				});

				await card.trigger("click");

				expect(window.open).toHaveBeenCalledTimes(1);
				expect(window.open).toHaveBeenCalledWith(
					`${CollaborativeTextEditorParentType.ContentElement}/${element.id}`,
					"_blank"
				);
			});
		});
	});
});
