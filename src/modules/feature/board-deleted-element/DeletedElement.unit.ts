import DeletedElement from "./DeletedElement.vue";
import DeletedElementMenu from "./DeletedElementMenu.vue";
import { deletedElementResponseFactory } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useBoardAllowedOperations, useBoardFocusHandler } from "@data-board";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { WarningAlert } from "@ui-alert";
import { mount } from "@vue/test-utils";
import { computed, nextTick } from "vue";
import { ComponentProps } from "vue-component-type-helpers";

vi.mock("@data-board");

describe("DeletedElement", () => {
	let useBoardFocusHandlerMock: DeepMocked<ReturnType<typeof useBoardFocusHandler>>;

	beforeEach(() => {
		useBoardFocusHandlerMock = createMock<ReturnType<typeof useBoardFocusHandler>>();
		vi.mocked(useBoardFocusHandler).mockReturnValue(useBoardFocusHandlerMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	type DeletedElementSetupOptions = {
		isEditMode?: boolean;
		allowedOperations?: Record<string, boolean>;
		props?: Partial<ComponentProps<typeof DeletedElement>>;
	};

	const setup = (options: DeletedElementSetupOptions = {}) => {
		const { isEditMode = false, allowedOperations = { deleteElement: true }, props: overriddenProps = {} } = options;

		const element = overriddenProps.element ?? deletedElementResponseFactory.build();

		vi.mocked(useBoardAllowedOperations).mockReturnValue({
			allowedOperations: computed(() => allowedOperations as unknown),
		} as ReturnType<typeof useBoardAllowedOperations>);

		const wrapper = mount(DeletedElement, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				element,
				isEditMode,
				columnIndex: 0,
				rowIndex: 1,
				elementIndex: 2,
				...overriddenProps,
			},
		});

		return {
			wrapper,
			deletedElement: element,
		};
	};

	afterEach(() => {
		vi.resetAllMocks();
	});

	describe("when the user is not a teacher (aka has not the right to delete elements)", () => {
		describe("when edit mode is active", () => {
			it("should not show the element", async () => {
				const isEditMode = true;
				const allowedOperations = { deleteElement: false };

				const { wrapper } = setup({ isEditMode, allowedOperations });

				const deletedElement = wrapper.findComponent({ ref: "deletedElement" });

				expect(deletedElement.isVisible()).toEqual(false);
			});
		});

		describe("when edit mode is inactive", () => {
			it("should not show the element and not render the menu", async () => {
				const isEditMode = false;
				const allowedOperations = { deleteElement: false };

				const { wrapper } = setup({ isEditMode, allowedOperations });

				const deletedElement = wrapper.findComponent({ ref: "deletedElement" });
				expect(deletedElement.isVisible()).toEqual(false);

				const threeDotMenu = wrapper.findComponent(DeletedElementMenu);
				expect(threeDotMenu.exists()).toEqual(false);
			});
		});
	});

	describe("Menu", () => {
		describe("when in edit mode", () => {
			it("should display the three dot menu", async () => {
				const isEditMode = true;

				const { wrapper } = setup({ isEditMode });

				const threeDotMenu = wrapper.findComponent(DeletedElementMenu);

				expect(threeDotMenu.isVisible()).toEqual(true);
			});
		});

		describe("when not in edit mode", () => {
			it("should not display the three dot menu", async () => {
				const isEditMode = false;

				const { wrapper } = setup({ isEditMode });

				const threeDotMenu = wrapper.findComponent(DeletedElementMenu);

				expect(threeDotMenu.exists()).toEqual(false);
			});
		});

		describe("when deleting the element", () => {
			it("should emit an event", async () => {
				const isEditMode = true;

				const { wrapper, deletedElement } = setup({ isEditMode });

				wrapper.findComponent(DeletedElementMenu).vm.$emit("delete:element");
				await nextTick();

				expect(wrapper.emitted("delete:element")).toEqual([[deletedElement.id]]);
			});
		});
	});

	describe("Alert", () => {
		describe("when the deleted element was an external tool element", () => {
			it("should display a warning", async () => {
				const isEditMode = true;

				const { wrapper } = setup({ isEditMode });

				const alert = wrapper.findComponent(WarningAlert);

				expect(alert.text()).toEqual("components.cardElement.deletedElement.warning.externalToolElement");
			});
		});
	});
});
