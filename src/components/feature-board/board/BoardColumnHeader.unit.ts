import Vue, { computed } from "vue";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import BoardColumnHeader from "./BoardColumnHeader.vue";
import BoardAnyTitleInput from "../shared/BoardAnyTitleInput.vue";
import { useEditMode } from "../shared/EditMode.composable";
import { useBoardPermissions } from "../shared/BoardPermissions.composable";
import { BoardPermissionsType } from "../types/Board";

jest.mock("../shared/BoardPermissions.composable");
const mockedUserPermissions = jest.mocked(useBoardPermissions);

const defaultPermissions = {
	hasBoardDeletePermission: true,
};
jest.mock("../shared/EditMode.composable");

describe("BoardColumnHeader", () => {
	let wrapper: Wrapper<Vue>;

	const mockedUseEditMode = jest.mocked(useEditMode);

	const setup = (options?: { permissions?: BoardPermissionsType }) => {
		document.body.setAttribute("data-app", "true");
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

		wrapper = shallowMount(BoardColumnHeader as MountOptions<Vue>, {
			...createComponentMocks({ i18n: true }),
			provide: {
				i18n: { t: (key: string) => key },
			},
			propsData: {
				title: "title-text",
				titlePlaceholder: "Spalte 1",
				columnId: "abc123",
			},
		});
	};

	describe("when component is mounted", () => {
		it("should be found in the dom", () => {
			setup();
			expect(wrapper.findComponent(BoardColumnHeader).exists()).toBe(true);
		});
	});

	describe("when the title updated", () => {
		it("should emit 'update:title'", () => {
			setup();

			const titleInput = wrapper.findComponent(BoardAnyTitleInput);
			titleInput.vm.$emit("update:value");

			const emitted = wrapper.emitted();
			expect(emitted["update:title"]).toBeDefined();
		});
	});

	describe("user permissions", () => {
		describe("when hasBoardDeletePermission is set false", () => {
			it("should not be rendered on DOM", () => {
				setup({
					permissions: { hasBoardDeletePermission: false },
				});

				const boardMenuComponent = wrapper.findAllComponents({
					name: "BoardMenu",
				});

				expect(boardMenuComponent.length).toStrictEqual(0);
			});
		});
	});
});
