import NotifierModule from "@/store/notifier";
import { NOTIFIER_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import { collaborativeTextEditorElementResponseFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { createMock } from "@golevelup/ts-jest";
import { ContentElementBar } from "@ui-board";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import CollaborativeTextEditorElement from "./CollaborativeTextEditorElement.vue";
import CollaborativeTextEditorElementMenu from "./components/CollaborativeTextEditorElementMenu.vue";

// Mocks
jest.mock("@data-board", () => ({
	useBoardFocusHandler: jest.fn(),
	useContentElementState: jest.fn(() => ({ modelValue: {} })),
	useDeleteConfirmationDialog: jest.fn(),
}));
jest.mock("@feature-board");

describe("CollaborativeTextEditorElement", () => {
	const notifierModule = createModuleMocks(NotifierModule);

	const setup = (props: { isEditMode: boolean }) => {
		document.body.setAttribute("data-app", "true");

		const COLLABORATIVE_TEXTEDITOR_ELEMENT =
			collaborativeTextEditorElementResponseFactory.build();

		const wrapper = mount(CollaborativeTextEditorElement, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
				},
			},
			propsData: { ...props, element: COLLABORATIVE_TEXTEDITOR_ELEMENT },
			attachTo: document.body,
		});

		return { wrapper, isEditMode: true };
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
			it("should open collaborative text editor in new tab correctly", async () => {
				const { wrapper } = setup({
					isEditMode: false,
				});

				const windowMock = createMock<Window>();
				const spy = jest
					.spyOn(window, "open")
					.mockImplementation(() => windowMock);

				const card = wrapper.find(
					"[data-testId=collaborative-text-editor-element]"
				);

				card.trigger("click");
				await nextTick();

				expect(spy).toHaveBeenCalledTimes(1);
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
	});
});
