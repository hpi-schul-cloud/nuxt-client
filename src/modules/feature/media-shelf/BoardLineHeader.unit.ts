import {
	useBoardFocusHandler,
	useBoardPermissions,
	useEditMode,
} from "@data-board";
import { BoardMenuActionMoveLeft, BoardMenuActionMoveRight } from "@ui-board";
import { shallowMount } from "@vue/test-utils";
import { computed } from "vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "../../../../tests/test-utils/setup";
import {
	BoardPermissionChecks,
	defaultPermissions,
} from "../../../types/board/Permissions";
import BoardAnyTitleInput from "../board/shared/BoardAnyTitleInput.vue";
import BoardLineHeader from "./BoardLineHeader.vue";

jest.mock("@data-board");
const mockedUserPermissions = jest.mocked(useBoardPermissions);
const mockUseBoardFocusHandler = jest.mocked(useBoardFocusHandler);

describe("BoardLineHeader", () => {
	const mockedUseEditMode = jest.mocked(useEditMode);

	const setup = (options?: {
		permissions?: Partial<BoardPermissionChecks>;
	}) => {
		const isEditMode = computed(() => true);
		mockedUseEditMode.mockReturnValue({
			isEditMode,
			startEditMode: jest.fn(),
			stopEditMode: jest.fn(),
		});
		mockedUserPermissions.mockReturnValue({
			...defaultPermissions,
			...options?.permissions,
		});
		mockUseBoardFocusHandler.mockReturnValue({
			isFocusContained: undefined,
		});

		const wrapper = shallowMount(BoardLineHeader, {
			global: {
				plugins: [createTestingI18n(), createTestingVuetify()],
			},
			propsData: {
				title: "title-text",
				titlePlaceholder: "Spalte 1",
				lineId: "abc123",
			},
		});
		return wrapper;
	};

	describe("when component is mounted", () => {
		it("should be found in the dom", () => {
			const wrapper = setup();
			expect(wrapper.findComponent(BoardLineHeader).exists()).toBe(true);
		});
	});

	describe("when the title updated", () => {
		it("should emit 'update:title'", () => {
			const wrapper = setup();

			const titleInput = wrapper.findComponent(BoardAnyTitleInput);
			titleInput.vm.$emit("update:value");

			const emitted = wrapper.emitted();
			expect(emitted["update:title"]).toBeDefined();
		});
	});

	describe("when the line should be moved to the left", () => {
		it("should emit move:line-left", async () => {
			const wrapper = setup();

			const moveLeftButton = wrapper.findComponent(BoardMenuActionMoveLeft);
			moveLeftButton.vm.$emit("click");

			const emitted = wrapper.emitted();
			expect(emitted["move:line-left"]).toBeDefined();
		});
	});

	describe("when the line should be moved to the right", () => {
		it("should emit move:line-right", async () => {
			const wrapper = setup();

			const moveRightButton = wrapper.findComponent(BoardMenuActionMoveRight);
			moveRightButton.vm.$emit("click");

			const emitted = wrapper.emitted();
			expect(emitted["move:line-right"]).toBeDefined();
		});
	});

	describe("user permissions", () => {
		describe("when user is not permitted to delete a line", () => {
			it("should not be rendered on DOM", () => {
				const wrapper = setup({
					permissions: { hasDeletePermission: false },
				});

				const boardMenuComponent = wrapper.findAllComponents({
					name: "BoardMenu",
				});

				expect(boardMenuComponent.length).toStrictEqual(0);
			});
		});
	});
});
