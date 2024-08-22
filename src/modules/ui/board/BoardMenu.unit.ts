import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { shallowMount } from "@vue/test-utils";
import BoardMenu from "./BoardMenu.vue";
import { BoardMenuScope } from "./board-menu-scope";

describe("BoardMenu Component", () => {
	const setup = () => {
		const wrapper = shallowMount(BoardMenu, {
			global: { plugins: [createTestingVuetify(), createTestingI18n()] },
			slots: {
				default: "<div>Delete Card</div>",
			},
			props: { scope: "card" },
		});

		return wrapper;
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			const wrapper = setup();
			expect(wrapper).toBeDefined();
		});

		it("should have correct slot element", () => {
			const wrapper = setup();
			const htmlElement = wrapper.element.innerHTML;

			expect(htmlElement).toContain("<div>Delete Card</div>");
		});
	});

	describe("screen reader aria-labels", () => {
		const setupScreenreader = (options: { scope: BoardMenuScope }) => {
			const wrapper = mount(BoardMenu, {
				global: { plugins: [createTestingVuetify(), createTestingI18n()] },
				props: { scope: options.scope },
			});

			return { wrapper };
		};

		it("should have correct aria-label for board scope", () => {
			const { wrapper } = setupScreenreader({ scope: "board" });
			wrapper.setProps({ scope: "board" });

			const screenreaderOnlySpan = wrapper.find(
				'[data-testid="board-menu-screen-reader-only"]'
			);

			expect(screenreaderOnlySpan.text()).toEqual(
				"components.board.menu.board"
			);
		});

		it("should have correct aria-label for column scope", () => {
			const { wrapper } = setupScreenreader({ scope: "column" });
			wrapper.setProps({ scope: "column" });

			const screenreaderOnlySpan = wrapper.find(
				'[data-testid="board-menu-screen-reader-only"]'
			);

			expect(screenreaderOnlySpan.text()).toEqual(
				"components.board.menu.column"
			);
		});

		it("should have correct aria-label for card scope", () => {
			const { wrapper } = setupScreenreader({ scope: "card" });

			const screenreaderOnlySpan = wrapper.find(
				'[data-testid="board-menu-screen-reader-only"]'
			);

			expect(screenreaderOnlySpan.text()).toEqual("components.board.menu.card");
		});

		it("should have correct aria-label for collobrativeTextEditorElement scope", () => {
			const { wrapper } = setupScreenreader({
				scope: "collaborativeTextEditorElement",
			});

			const screenreaderOnlySpan = wrapper.find(
				'[data-testid="board-menu-screen-reader-only"]'
			);

			expect(screenreaderOnlySpan.text()).toEqual(
				"components.board.menu.collaborativeTextEditorElement"
			);
		});

		it("should have correct aria-label for drawingElement scope", () => {
			const { wrapper } = setupScreenreader({ scope: "drawingElement" });

			const screenreaderOnlySpan = wrapper.find(
				'[data-testid="board-menu-screen-reader-only"]'
			);

			expect(screenreaderOnlySpan.text()).toEqual(
				"components.board.menu.drawingElement"
			);
		});

		it("should have correct aria-label for externalToolElement scope", () => {
			const { wrapper } = setupScreenreader({ scope: "externalToolElement" });

			const screenreaderOnlySpan = wrapper.find(
				'[data-testid="board-menu-screen-reader-only"]'
			);

			expect(screenreaderOnlySpan.text()).toEqual(
				"components.board.menu.externalToolElement"
			);
		});

		it("should have correct aria-label for fileElement scope", () => {
			const { wrapper } = setupScreenreader({ scope: "fileElement" });

			const screenreaderOnlySpan = wrapper.find(
				'[data-testid="board-menu-screen-reader-only"]'
			);

			expect(screenreaderOnlySpan.text()).toEqual(
				"components.board.menu.fileElement"
			);
		});

		it("should have correct aria-label for linkElement scope", () => {
			const { wrapper } = setupScreenreader({ scope: "linkElement" });

			const screenreaderOnlySpan = wrapper.find(
				'[data-testid="board-menu-screen-reader-only"]'
			);

			expect(screenreaderOnlySpan.text()).toEqual(
				"components.board.menu.linkElement"
			);
		});

		it("should have correct aria-label for submissionElement scope", () => {
			const { wrapper } = setupScreenreader({ scope: "submissionElement" });

			const screenreaderOnlySpan = wrapper.find(
				'[data-testid="board-menu-screen-reader-only"]'
			);

			expect(screenreaderOnlySpan.text()).toEqual(
				"components.board.menu.submissionElement"
			);
		});
	});
});
