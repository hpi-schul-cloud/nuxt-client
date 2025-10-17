import MediaBoardLineHeader from "./MediaBoardLineHeader.vue";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useBoardFocusHandler } from "@data-board";
import { BoardAnyTitleInput } from "@feature-board";
import { shallowMount } from "@vue/test-utils";

vi.mock("@data-board/BoardFocusHandler.composable");

describe("MediaBoardLineHeader", () => {
	const getWrapper = () => {
		const wrapper = shallowMount(MediaBoardLineHeader, {
			global: {
				plugins: [createTestingI18n(), createTestingVuetify()],
			},
			propsData: {
				title: "title-text",
				titlePlaceholder: "Line 1",
				lineId: "lineId",
			},
		});

		return wrapper;
	};

	beforeEach(() => {
		vi.mocked(useBoardFocusHandler).mockReturnValue({});
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	describe("when the title updated", () => {
		it("should emit 'update:title'", () => {
			const wrapper = getWrapper();

			const titleInput = wrapper.findComponent(BoardAnyTitleInput);
			titleInput.vm.$emit("update:value", "newTitle");

			expect(wrapper.emitted("update:title")).toEqual([["newTitle"]]);
		});
	});
});
