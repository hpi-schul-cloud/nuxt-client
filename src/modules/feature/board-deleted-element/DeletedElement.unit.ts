import DeletedElement from "./DeletedElement.vue";
import DeletedElementMenu from "./DeletedElementMenu.vue";
import { deletedElementResponseFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useBoardFocusHandler, useBoardPermissions } from "@data-board";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { WarningAlert } from "@ui-alert";
import { mount } from "@vue/test-utils";
import { nextTick, ref } from "vue";
import { ComponentProps } from "vue-component-type-helpers";

vi.mock("@data-board");

describe("DeletedElement", () => {
	let useBoardFocusHandlerMock: DeepMocked<ReturnType<typeof useBoardFocusHandler>>;
	let useBoardPermissionsMock: DeepMocked<ReturnType<typeof useBoardPermissions>>;

	beforeEach(() => {
		useBoardFocusHandlerMock = createMock<ReturnType<typeof useBoardFocusHandler>>();
		useBoardPermissionsMock = createMock<ReturnType<typeof useBoardPermissions>>({ isTeacher: ref(true) });

		vi.mocked(useBoardFocusHandler).mockReturnValue(useBoardFocusHandlerMock);
		vi.mocked(useBoardPermissions).mockReturnValue(useBoardPermissionsMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const getWrapper = (
		props: ComponentProps<typeof DeletedElement> = {
			element: deletedElementResponseFactory.build(),
			isEditMode: false,
			columnIndex: 0,
			rowIndex: 1,
			elementIndex: 2,
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
		vi.resetAllMocks();
	});

	describe("when the user is not a teacher", () => {
		const setup = () => {
			useBoardPermissionsMock.isTeacher.value = false;

			const { wrapper } = getWrapper({
				element: deletedElementResponseFactory.build(),
				isEditMode: true,
				columnIndex: 0,
				rowIndex: 1,
				elementIndex: 2,
			});

			return {
				wrapper,
			};
		};

		it("should not show the element", async () => {
			const { wrapper } = setup();

			const deletedElement = wrapper.findComponent({ ref: "deletedElement" });

			expect(deletedElement.isVisible()).toEqual(false);
		});
	});

	describe("Menu", () => {
		describe("when in edit mode", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					element: deletedElementResponseFactory.build(),
					isEditMode: true,
					columnIndex: 0,
					rowIndex: 1,
					elementIndex: 2,
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
					element: deletedElementResponseFactory.build(),
					isEditMode: false,
					columnIndex: 0,
					rowIndex: 1,
					elementIndex: 2,
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
				const deletedElement = deletedElementResponseFactory.build();
				const { wrapper } = getWrapper({
					element: deletedElement,
					isEditMode: true,
					columnIndex: 0,
					rowIndex: 1,
					elementIndex: 2,
				});

				return {
					wrapper,
					deletedElement,
				};
			};

			it("should emit an event", async () => {
				const { wrapper, deletedElement } = setup();

				wrapper.findComponent(DeletedElementMenu).vm.$emit("delete:element");
				await nextTick();

				expect(wrapper.emitted("delete:element")).toEqual([[deletedElement.id]]);
			});
		});
	});

	describe("Alert", () => {
		describe("when the deleted element was an external tool element", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					element: deletedElementResponseFactory.build(),
					isEditMode: true,
					columnIndex: 0,
					rowIndex: 1,
					elementIndex: 2,
				});

				return {
					wrapper,
				};
			};

			it("should display a warning", async () => {
				const { wrapper } = setup();

				const alert = wrapper.findComponent(WarningAlert);

				expect(alert.text()).toEqual("components.cardElement.deletedElement.warning.externalToolElement");
			});
		});
	});
});
