import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { useBoardFocusHandler } from "@data-board";
import { BoardAnyTitleInput } from "@feature-board";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { shallowMount } from "@vue/test-utils";
import MediaBoardLineHeader from "./MediaBoardLineHeader.vue";

jest.mock("@data-board");

describe("MediaBoardLineHeader", () => {
	let useBoardFocusHandlerMock: DeepMocked<
		ReturnType<typeof useBoardFocusHandler>
	>;

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
		useBoardFocusHandlerMock =
			createMock<ReturnType<typeof useBoardFocusHandler>>();

		jest.mocked(useBoardFocusHandler).mockReturnValue(useBoardFocusHandlerMock);
	});

	afterEach(() => {
		jest.resetAllMocks();
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
