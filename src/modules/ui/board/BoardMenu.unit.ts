import { BoardMenuScope } from "./board-menu-scope";
import BoardMenu from "./BoardMenu.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { mount, shallowMount } from "@vue/test-utils";

describe("BoardMenu Component", () => {
	describe("when component is mounted", () => {
		const setup = () => {
			const wrapper = shallowMount(BoardMenu, {
				global: { plugins: [createTestingVuetify(), createTestingI18n()] },
				slots: {
					default: "<div>Delete Card</div>",
				},
				props: { scope: BoardMenuScope.CARD },
			});

			return wrapper;
		};

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

		it.each<BoardMenuScope>(Object.values(BoardMenuScope))(
			"should have correct aria-label for %s scope",
			(scope: BoardMenuScope) => {
				const { wrapper } = setupScreenreader({ scope });

				const screenreaderOnlySpan = wrapper.find('[data-testid="board-menu-screen-reader-only"]');

				expect(screenreaderOnlySpan.text()).toEqual(`components.board.menu.${scope}`);
			}
		);
	});
});
