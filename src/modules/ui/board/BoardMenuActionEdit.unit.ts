import { BoardMenuScope } from "./board-menu-scope";
import { MENU_SCOPE } from "./injection-tokens";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { BoardMenuActionEdit } from "@ui-board";
import { mount } from "@vue/test-utils";
import BoardMenuAction from "./BoardMenuAction.vue";
import {
	mdiPencilOutline,
	mdiRenameOutline,
} from "@/components/icons/material";

describe("BoardMenuActionEdit Component", () => {
	const setup = (options: { scope: BoardMenuScope }) => {
		const wrapper = mount(BoardMenuActionEdit, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: {
					[MENU_SCOPE as symbol]: options.scope,
				},
			},
		});

		return wrapper;
	};

	describe("when component is mounted", () => {
		it("should render", () => {
			const wrapper = setup({ scope: "board" });
			const action = wrapper.findComponent(BoardMenuAction);

			expect(action.exists()).toBe(true);
		});
	});

	describe("when rendered within a board menu", () => {
		it("should render the rename icon", () => {
			const wrapper = setup({ scope: "board" });

			const action = wrapper.findComponent(BoardMenuAction);
			const props = action.props();

			expect(props.icon).toBe(mdiRenameOutline);
		});

		it("should render rename action name", () => {
			const wrapper = setup({ scope: "board" });

			const action = wrapper.findComponent(BoardMenuAction);

			expect(action.text()).toContain("common.actions.rename");
		});

		describe("when rendered within a column menu", () => {
			it("should render the rename icon", () => {
				const wrapper = setup({ scope: "column" });

				const action = wrapper.findComponent(BoardMenuAction);
				const props = action.props();

				expect(props.icon).toBe(mdiRenameOutline);
			});

			it("should render rename action name", () => {
				const wrapper = setup({ scope: "column" });

				const action = wrapper.findComponent(BoardMenuAction);

				expect(action.text()).toContain("common.actions.rename");
			});
		});

		describe("when rendered within a card menu", () => {
			it("should render the edit icon", () => {
				const wrapper = setup({ scope: "card" });

				const action = wrapper.findComponent(BoardMenuAction);
				const props = action.props();

				expect(props.icon).toBe(mdiPencilOutline);
			});

			it("should render rename action name", () => {
				const wrapper = setup({ scope: "card" });

				const action = wrapper.findComponent(BoardMenuAction);

				expect(action.text()).toContain("common.actions.edit");
			});
		});
	});
});
