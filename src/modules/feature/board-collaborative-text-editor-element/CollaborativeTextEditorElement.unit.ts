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
import { collaborativeTextEditorElementResponseFactory } from "@@/tests/test-utils";
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
import { nextTick } from "vue";
import CollaborativeTextEditorElement from "./CollaborativeTextEditorElement.vue";
import CollaborativeTextEditor from "./content/CollaborativeTextEditor.vue";

// Mocks
jest.mock("@data-board", () => ({
	useBoardFocusHandler: jest.fn(),
	useContentElementState: jest.fn(() => ({ modelValue: {} })),
	useDeleteConfirmationDialog: jest.fn(),
}));
jest.mock("@feature-board");

const mockedEnvConfigModule = createModuleMocks(EnvConfigModule, {
	getEnv: createMock<ConfigResponse>({
		FEATURE_TLDRAW_ENABLED: true,
	}),
});

describe("CollaborativeTextEditorElement", () => {
	const notifierModule = createModuleMocks(NotifierModule);

	const setup = (props: { isEditMode: boolean; isTeacher?: boolean }) => {
		document.body.setAttribute("data-app", "true");

		const authModule = createModuleMocks(AuthModule, {
			getUserRoles: ["teacher"],
		});

		const COLLABORATIVE_TEXTEDITOR_ELEMENT =
			collaborativeTextEditorElementResponseFactory.build();

		const wrapper = shallowMount(CollaborativeTextEditorElement, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[NOTIFIER_MODULE_KEY.valueOf()]: notifierModule,
					[ENV_CONFIG_MODULE_KEY.valueOf()]: mockedEnvConfigModule,
					[AUTH_MODULE_KEY.valueOf()]: authModule,
				},
			},
			propsData: { ...props, element: COLLABORATIVE_TEXTEDITOR_ELEMENT },
		});
		return { wrapper, isEditMode: true, isTeacher: true };
	};

	describe("when component is mounted", () => {
		it("should render the element corrrectly", () => {
			const { wrapper } = setup({
				isEditMode: false,
			});
			expect(
				wrapper.findComponent(CollaborativeTextEditorElement).isVisible()
			).toBe(true);
		});

		it("should render the InnerContent element correctly", () => {
			const { wrapper } = setup({
				isEditMode: false,
			});
			expect(wrapper.findComponent(CollaborativeTextEditor).exists()).toBe(
				true
			);
		});

		it("should render BoardMenu element correctly", async () => {
			const { wrapper } = setup({
				isEditMode: true,
			});

			const board = wrapper.findComponent(BoardMenu);
			expect(board.exists()).toBe(true);
		});

		it("should render BoardMenuActionMoveUp element correctly", async () => {
			const { wrapper } = setup({
				isEditMode: true,
			});

			const moveUp = wrapper.findComponent(BoardMenuActionMoveUp);
			expect(moveUp.exists()).toBe(true);
		});

		it("should render BoardMenuActionMoveDown element correctly", async () => {
			const { wrapper } = setup({
				isEditMode: true,
			});

			const moveDown = wrapper.findComponent(BoardMenuActionMoveDown);
			expect(moveDown.exists()).toBe(true);
		});

		it("should render BoardMenuActionDelete element correctly", async () => {
			const { wrapper } = setup({
				isEditMode: true,
			});

			const actionDelete = wrapper.findComponent(BoardMenuActionDelete);
			expect(actionDelete.exists()).toBe(true);
		});

		describe("when component is in edit-mode", () => {
			describe("when move down is clicked", () => {
				it('should emit "move-down" collaborative text editor', async () => {
					const { wrapper } = setup({
						isEditMode: true,
					});

					wrapper.findComponent(BoardMenuActionMoveDown).vm.$emit("click");

					expect(wrapper.emitted("move-down:edit")).toBeTruthy();
				});
			});

			describe("when move up is clicked", () => {
				it('should emit "move-up" collaborative text editor', async () => {
					const { wrapper } = setup({
						isEditMode: true,
					});

					wrapper.findComponent(BoardMenuActionMoveUp).vm.$emit("click");

					expect(wrapper.emitted("move-up:edit")).toBeTruthy();
				});
			});

			describe("when delete is clicked", () => {
				it('should emit "delete" collaborative text editor', async () => {
					const { wrapper } = setup({
						isEditMode: true,
					});

					wrapper
						.findComponent(BoardMenuActionDelete)
						.vm.$emit("click", Promise.resolve(true));
					await nextTick();
					expect(wrapper.emitted("delete:element")).toBeTruthy();
				});
			});
		});

		describe("when component is NOT in edit-mode", () => {
			it('should NOT emit "move-down" collaborative text editor', async () => {
				const { wrapper } = setup({
					isEditMode: false,
					isTeacher: false,
				});

				expect(wrapper.findComponent(BoardMenuActionMoveDown).exists()).toBe(
					false
				);
			});

			it('should NOT emit "move-up" collaborative text editor', async () => {
				const { wrapper } = setup({
					isEditMode: false,
					isTeacher: false,
				});

				expect(wrapper.findComponent(BoardMenuActionMoveUp).exists()).toBe(
					false
				);
			});

			it('should NOT emit "delete" collaborative text editor', async () => {
				const { wrapper } = setup({
					isEditMode: false,
					isTeacher: false,
				});

				expect(wrapper.findComponent(BoardMenuActionDelete).exists()).toBe(
					false
				);
			});
		});

		describe("when element is clicked", () => {
			it("should open collaborative text editor in new tab correctly", async () => {
				const { wrapper } = setup({
					isEditMode: false,
				});
				const divElement = wrapper.find("div");
				window.open = jest.fn();

				await divElement.trigger("click");

				wrapper.vm.$nextTick(() =>
					window.open(`/tldraw?roomName=test-id`, "_blank")
				);

				expect(window.open).toHaveBeenCalledTimes(1);
			});
		});
	});
});
