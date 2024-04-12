import {
	CollaborativeTextEditorElementResponse,
	ContentElementType,
} from "@/serverApi/v3";
import { ConfigResponse } from "@/serverApi/v3/api";
import AuthModule from "@/store/auth";
import EnvConfigModule from "@/store/env-config";
import NotifierModule from "@/store/notifier";
import {
	AUTH_MODULE_KEY,
	ENV_CONFIG_MODULE_KEY,
	NOTIFIER_MODULE_KEY,
} from "@/utils/inject";
import { createModuleMocks } from "@/utils/mock-store-module";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { createMock } from "@golevelup/ts-jest";
import { shallowMount } from "@vue/test-utils";
import CollaborativeTextEditorElement from "./CollaborativeTextEditorElement.vue";
import InnerContent from "./InnerContent.vue";

// Mocks
jest.mock("@data-board", () => ({
	useBoardFocusHandler: jest.fn(),
	useContentElementState: jest.fn(() => ({ modelValue: {} })),
	useDeleteConfirmationDialog: jest.fn(),
}));
jest.mock("@feature-board");

const COLLABORATIVE_TEXTEDITOR_ELEMENT: CollaborativeTextEditorElementResponse =
	{
		id: "test-id",
		type: ContentElementType.CollaborativeTextEditor,
		content: {
			editorId: "editor-id",
		},
		timestamps: {
			createdAt: new Date().toISOString(),
			lastUpdatedAt: new Date().toISOString(),
		},
	};

const mockedEnvConfigModule = createModuleMocks(EnvConfigModule, {
	getEnv: createMock<ConfigResponse>({
		FEATURE_TLDRAW_ENABLED: true,
	}),
});

describe("CollaborativeTextEditorElement", () => {
	const notifierModule = createModuleMocks(NotifierModule);

	const setup = (props: {
		element: CollaborativeTextEditorElementResponse;
		isEditMode: boolean;
	}) => {
		document.body.setAttribute("data-app", "true");

		const authModule = createModuleMocks(AuthModule, {
			getUserRoles: ["teacher"],
		});

		const wrapper = shallowMount(CollaborativeTextEditorElement, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
					[ENV_CONFIG_MODULE_KEY.valueOf()]: mockedEnvConfigModule,
					[AUTH_MODULE_KEY.valueOf()]: authModule,
				},
			},
			propsData: props,
		});
		return { wrapper };
	};

	describe("when component is mounted", () => {
		it("should render the element corrrectly", () => {
			const { wrapper } = setup({
				element: COLLABORATIVE_TEXTEDITOR_ELEMENT,
				isEditMode: false,
			});
			expect(
				wrapper.findComponent(CollaborativeTextEditorElement).isVisible()
			).toBe(true);
		});

		it("should render the InnerContent element correctly", () => {
			const { wrapper } = setup({
				element: COLLABORATIVE_TEXTEDITOR_ELEMENT,
				isEditMode: false,
			});
			expect(wrapper.findComponent(InnerContent).exists()).toBe(true);
		});

		describe("when arrow key down is pressed", () => {
			describe("when component is in edit-mode", () => {
				it('should NOT emit "move-keyboard:edit"', async () => {
					const { wrapper } = setup({
						element: COLLABORATIVE_TEXTEDITOR_ELEMENT,
						isEditMode: true,
					});

					wrapper.findComponent(CollaborativeTextEditorElement).vm.$emit(
						"keydown",
						new KeyboardEvent("keydown", {
							key: "ArrowDown",
							keyCode: 40,
						})
					);

					expect(wrapper.emitted("move-keyboard:edit")).toBeUndefined();
				});

				it("should hide the element", () => {
					const { wrapper } = setup({
						element: COLLABORATIVE_TEXTEDITOR_ELEMENT,
						isEditMode: true,
					});

					expect(
						wrapper.findComponent(CollaborativeTextEditorElement).isVisible()
					).toEqual(true);
				});
			});
		});

		describe("when arrow key up is pressed", () => {
			describe("when component is in edit-mode", () => {
				it('should NOT emit "move-keyboard:edit"', async () => {
					const { wrapper } = setup({
						element: COLLABORATIVE_TEXTEDITOR_ELEMENT,
						isEditMode: true,
					});

					wrapper.findComponent(CollaborativeTextEditorElement).vm.$emit(
						"keydown",
						new KeyboardEvent("keydown", {
							key: "ArrowUp",
							keyCode: 38,
						})
					);

					expect(wrapper.emitted("move-keyboard:edit")).toBeUndefined();
				});

				it("should hide the element", () => {
					const { wrapper } = setup({
						element: COLLABORATIVE_TEXTEDITOR_ELEMENT,
						isEditMode: true,
					});

					expect(
						wrapper.findComponent(CollaborativeTextEditorElement).isVisible()
					).toEqual(true);
				});
			});
		});

		describe("when move down Collaborative Text Editor is clicked", () => {
			it('should emit "move-down" element', async () => {
				const { wrapper } = setup({
					element: COLLABORATIVE_TEXTEDITOR_ELEMENT,
					isEditMode: false,
				});

				wrapper
					.findComponent(CollaborativeTextEditorElement)
					.vm.$emit("move-down");

				expect(wrapper.emitted("move-down")).toBeTruthy();
			});
		});

		describe("when move up Collaborative Text Editor is clicked", () => {
			it('should emit "move-up" element', async () => {
				const { wrapper } = setup({
					element: COLLABORATIVE_TEXTEDITOR_ELEMENT,
					isEditMode: false,
				});

				wrapper
					.findComponent(CollaborativeTextEditorElement)
					.vm.$emit("move-up");

				expect(wrapper.emitted("move-up")).toBeTruthy();
			});
		});

		describe("when delete Collaborative Text Editor is clicked", () => {
			it('should emit "delete" element', async () => {
				const { wrapper } = setup({
					element: COLLABORATIVE_TEXTEDITOR_ELEMENT,
					isEditMode: false,
				});

				wrapper
					.findComponent(CollaborativeTextEditorElement)
					.vm.$emit("delete");

				expect(wrapper.emitted("delete")).toBeTruthy();
			});
		});
	});
});
