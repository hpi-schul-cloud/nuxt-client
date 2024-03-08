import {
	BoardPermissionChecks,
	defaultPermissions,
} from "@/types/board/Permissions";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import {
	useBoardFocusHandler,
	useBoardPermissions,
	useEditMode,
} from "@data-board";
import { BoardMenuActionEdit } from "@ui-board";
import { shallowMount } from "@vue/test-utils";
import { computed } from "vue";
import BoardAnyTitleInput from "../shared/BoardAnyTitleInput.vue";
import BoardHeader from "./BoardHeader.vue";

jest.mock("@data-board");
const mockedUserPermissions = jest.mocked(useBoardPermissions);
const mockUseBoardFocusHandler = jest.mocked(useBoardFocusHandler);

describe("BoardHeader", () => {
	const mockedUseEditMode = jest.mocked(useEditMode);

	const setup = (options?: {
		permissions?: Partial<BoardPermissionChecks>;
	}) => {
		const isEditMode = computed(() => true);
		const mockedStartEditMode = jest.fn();
		mockedUseEditMode.mockReturnValue({
			isEditMode,
			startEditMode: mockedStartEditMode,
			stopEditMode: jest.fn(),
		});
		mockedUserPermissions.mockReturnValue({
			...defaultPermissions,
			...options?.permissions,
		});
		mockUseBoardFocusHandler.mockReturnValue({
			isFocusContained: undefined,
		});

		const wrapper = shallowMount(BoardHeader, {
			global: {
				plugins: [createTestingI18n(), createTestingVuetify()],
			},
			propsData: {
				title: "title-text",
				titlePlaceholder: "Board 1",
				boardId: "abc123",
			},
		});
		return { startEditMode: mockedStartEditMode, wrapper };
	};

	describe("when component is mounted", () => {
		it("should be found in the dom", () => {
			const { wrapper } = setup();
			expect(wrapper.findComponent(BoardHeader).exists()).toBe(true);
		});
	});

	describe("when the title is updated", () => {
		it("should emit 'update:title'", () => {
			jest.useFakeTimers(); // Mock timers

			const { wrapper } = setup();

			const titleInput = wrapper.findComponent(BoardAnyTitleInput);
			titleInput.vm.$emit("update:value", "new-title");

			jest.runAllTimers(); // Run all timers

			const emitted = wrapper.emitted("update:title");
			expect(emitted).toBeDefined();
		});
	});

	describe("when the 'edit' menu button is clicked", () => {
		it("should call startEditMode", async () => {
			const { startEditMode, wrapper } = setup();

			const editButton = wrapper.findComponent(BoardMenuActionEdit);
			editButton.vm.$emit("click");

			expect(startEditMode).toBeCalled();
		});
	});

	describe("user permissions", () => {
		describe("when user is not permitted to edit the board", () => {
			it("should not find the BoardMenu in the DOM", () => {
				const { wrapper } = setup({
					permissions: { hasEditPermission: false },
				});

				const boardMenuComponent = wrapper.findAllComponents({
					name: "BoardMenu",
				});

				expect(boardMenuComponent.length).toStrictEqual(0);
			});
		});
	});
});
