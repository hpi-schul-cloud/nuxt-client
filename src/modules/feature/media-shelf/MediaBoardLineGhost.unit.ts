import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { BoardSectionCreationHeader } from "@ui-board";
import { mount } from "@vue/test-utils";
import { Sortable } from "sortablejs-vue3";
import { nextTick } from "vue";
import MediaBoardLineGhost from "./MediaBoardLineGhost.vue";

describe("MediaBoardLineGhost", () => {
	const getWrapper = () => {
		const wrapper = mount(MediaBoardLineGhost, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
		});

		return {
			wrapper,
		};
	};

	afterEach(() => {
		vi.resetAllMocks();
	});

	describe("when the new line button is clicked", () => {
		it("should emit 'create:line'", async () => {
			const { wrapper } = getWrapper();

			const header = wrapper.findComponent(BoardSectionCreationHeader);

			header.vm.$emit("add-column");
			await nextTick();

			expect(wrapper.emitted("create:line")).toBeDefined();
		});
	});

	describe("Container component", () => {
		it("should be found in DOM", () => {
			const { wrapper } = getWrapper();

			const containerComponent = wrapper.findComponent(Sortable);

			expect(containerComponent.isVisible()).toEqual(true);
		});
	});
});
