import { computed } from "vue";
import { shallowMount } from "@vue/test-utils";
import BoardColumnHeader from "./BoardColumnHeader.vue";
import BoardAnyTitleInput from "../shared/BoardAnyTitleInput.vue";
import {
	useEditMode,
	useBoardPermissions,
	useBoardFocusHandler,
} from "@data-board";
import {
	BoardPermissionChecks,
	defaultPermissions,
} from "@/types/board/Permissions";
import { BoardMenuActionMoveLeft, BoardMenuActionMoveRight } from "@ui-board";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";

jest.mock("@data-board");
const mockedUserPermissions = jest.mocked(useBoardPermissions);
const mockUseBoardFocusHandler = jest.mocked(useBoardFocusHandler);

describe("BoardColumnHeader", () => {
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

		const wrapper = shallowMount(BoardColumnHeader, {
			global: {
				plugins: [createTestingI18n(), createTestingVuetify()],
			},
			propsData: {
				title: "title-text",
				titlePlaceholder: "Spalte 1",
				columnId: "abc123",
			},
		});
		return wrapper;
	};

	describe("when component is mounted", () => {
		it("should be found in the dom", () => {
			const wrapper = setup();
			expect(wrapper.findComponent(BoardColumnHeader).exists()).toBe(true);
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

	describe("when the column should be moved to the left", () => {
		it("should emit move:column-left", async () => {
			const wrapper = setup();

			const moveLeftButton = wrapper.findComponent(BoardMenuActionMoveLeft);
			moveLeftButton.vm.$emit("click");

			const emitted = wrapper.emitted();
			expect(emitted["move:column-left"]).toBeDefined();
		});
	});

	describe("when the column should be moved to the right", () => {
		it("should emit move:column-right", async () => {
			const wrapper = setup();

			const moveRightButton = wrapper.findComponent(BoardMenuActionMoveRight);
			moveRightButton.vm.$emit("click");

			const emitted = wrapper.emitted();
			expect(emitted["move:column-right"]).toBeDefined();
		});
	});

	describe("user permissions", () => {
		describe("when user is not permitted to delete a column", () => {
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
