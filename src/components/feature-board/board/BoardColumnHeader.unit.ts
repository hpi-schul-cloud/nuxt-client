import Vue, { computed } from "vue";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import BoardColumnHeader from "./BoardColumnHeader.vue";
import BoardAnyTitleInput from "../shared/BoardAnyTitleInput.vue";
import { useEditMode } from "../shared/EditMode.composable";
import { useBoardPermissions } from "../shared/BoardPermissions.composable";
import {
	BoardPermissionChecks,
	defaultPermissions,
} from "../types/Permissions";
import { I18N_KEY } from "@/utils/inject";

jest.mock("../shared/BoardPermissions.composable");
const mockedUserPermissions = jest.mocked(useBoardPermissions);

jest.mock("../shared/EditMode.composable");

describe("BoardColumnHeader", () => {
	let wrapper: Wrapper<Vue>;

	const mockedUseEditMode = jest.mocked(useEditMode);

	const setup = (options?: {
		permissions?: Partial<BoardPermissionChecks>;
	}) => {
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
				[I18N_KEY.valueOf()]: { t: (key: string) => key },
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
		describe("when user is not permitted to delete a column", () => {
			it("should not be rendered on DOM", () => {
				setup({
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
