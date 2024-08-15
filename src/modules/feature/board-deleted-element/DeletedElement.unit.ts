import { ContentElementType, DeletedElementResponse } from "@/serverApi/v3";
import { timestampsResponseFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { useBoardFocusHandler, useBoardPermissions } from "@data-board";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { WarningAlert } from "@ui-alert";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { ComponentProps } from "vue-component-type-helpers";
import DeletedElement from "./DeletedElement.vue";
import DeletedElementMenu from "./DeletedElementMenu.vue";

jest.mock("@data-board");

const DELETED_ELEMENT: DeletedElementResponse = {
	id: "deleted-element-id",
	content: {
		deletedElementType: ContentElementType.ExternalTool,
		title: "Deleted Tool",
	},
	type: ContentElementType.Deleted,
	timestamps: timestampsResponseFactory.build(),
};

describe("DeletedElement", () => {
	let useBoardFocusHandlerMock: DeepMocked<
		ReturnType<typeof useBoardFocusHandler>
	>;
	let useBoardPermissionsMock: DeepMocked<
		ReturnType<typeof useBoardPermissions>
	>;

	beforeEach(() => {
		useBoardFocusHandlerMock =
			createMock<ReturnType<typeof useBoardFocusHandler>>();
		useBoardPermissionsMock = createMock<
			ReturnType<typeof useBoardPermissions>
		>({ isTeacher: true });

		jest.mocked(useBoardFocusHandler).mockReturnValue(useBoardFocusHandlerMock);
		jest.mocked(useBoardPermissions).mockReturnValue(useBoardPermissionsMock);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	const getWrapper = (
		props: ComponentProps<typeof DeletedElement> = {
			element: DELETED_ELEMENT,
			isEditMode: false,
		}
	) => {
		const wrapper = mount(DeletedElement, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props,
		});

		return {
			wrapper,
		};
	};

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("when the user is not a teacher", () => {
		const setup = () => {
			useBoardPermissionsMock.isTeacher = false;

			const { wrapper } = getWrapper({
				element: DELETED_ELEMENT,
				isEditMode: true,
			});

			return {
				wrapper,
			};
		};

		it("should not show the element", async () => {
			const { wrapper } = setup();

			const deletedElement = wrapper.findComponent({ ref: "deletedElement" });

			expect(deletedElement.exists()).toEqual(false);
		});
	});

	describe("Menu", () => {
		describe("when in edit mode", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					element: DELETED_ELEMENT,
					isEditMode: true,
				});

				return {
					wrapper,
				};
			};

			it("should display the tree dot menu", async () => {
				const { wrapper } = setup();

				const threeDotMenu = wrapper.findComponent(DeletedElementMenu);

				expect(threeDotMenu.isVisible()).toEqual(true);
			});
		});

		describe("when not in edit mode", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					element: DELETED_ELEMENT,
					isEditMode: false,
				});

				return {
					wrapper,
				};
			};

			it("should not display the tree dot menu", async () => {
				const { wrapper } = setup();

				const threeDotMenu = wrapper.findComponent(DeletedElementMenu);

				expect(threeDotMenu.exists()).toEqual(false);
			});
		});

		describe("when deleting the element", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					element: DELETED_ELEMENT,
					isEditMode: true,
				});

				return {
					wrapper,
				};
			};

			it("should emit an event", async () => {
				const { wrapper } = setup();

				wrapper.findComponent(DeletedElementMenu).vm.$emit("delete:element");
				await nextTick();

				expect(wrapper.emitted("delete:element")).toEqual([
					[DELETED_ELEMENT.id],
				]);
			});
		});
	});

	describe("Alert", () => {
		describe("when the deleted element was an external tool element", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					element: DELETED_ELEMENT,
					isEditMode: true,
				});

				return {
					wrapper,
				};
			};

			it("should display a warning", async () => {
				const { wrapper } = setup();

				const alert = wrapper.findComponent(WarningAlert);

				expect(alert.text()).toEqual(
					"components.cardElement.deletedElement.warning.externalToolElement"
				);
			});
		});
	});
});
