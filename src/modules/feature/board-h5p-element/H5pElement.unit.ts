import { H5pElementResponse } from "@/serverApi/v3";
import { h5pElementResponseFactory } from "@@/tests/test-utils";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { useBoardFocusHandler, useContentElementState } from "@data-board";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { mount } from "@vue/test-utils";
import { nextTick, ref } from "vue";
import H5pElement from "./H5pElement.vue";
import H5pElementMenu from "./H5pElementMenu.vue";

jest.mock("@data-board");
jest.mock("@util-board");

describe("H5pElement", () => {
	let useContentElementStateMock: DeepMocked<
		ReturnType<typeof useContentElementState>
	>;
	let useBoardFocusHandlerMock: DeepMocked<
		ReturnType<typeof useBoardFocusHandler>
	>;

	beforeEach(() => {
		useContentElementStateMock =
			createMock<ReturnType<typeof useContentElementState>>();
		useBoardFocusHandlerMock =
			createMock<ReturnType<typeof useBoardFocusHandler>>();

		jest
			.mocked(useContentElementState)
			.mockReturnValue(useContentElementStateMock);
		jest.mocked(useBoardFocusHandler).mockReturnValue(useBoardFocusHandlerMock);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	const getWrapper = (propsData: {
		element: H5pElementResponse;
		isEditMode: boolean;
	}) => {
		useContentElementStateMock.modelValue = ref(propsData.element.content);

		const wrapper = mount(H5pElement, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				columnIndex: 0,
				rowIndex: 1,
				elementIndex: 2,
				...propsData,
			},
		});

		return {
			wrapper,
		};
	};

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("Loading", () => {
		const setup = () => {
			const { wrapper } = getWrapper({
				element: h5pElementResponseFactory.build({
					content: { contentId: "contentId" },
				}),
				isEditMode: true,
			});

			return {
				wrapper,
			};
		};

		it("should be false", () => {
			const { wrapper } = setup();

			const card = wrapper.getComponent({ ref: "elementCard" });

			expect(card.props().loading).toEqual(false);
		});
	});

	describe("when moving the element with arrow keys while in edit mode", () => {
		const setup = () => {
			const { wrapper } = getWrapper({
				element: h5pElementResponseFactory.build({
					content: { contentId: null },
				}),
				isEditMode: true,
			});

			return {
				wrapper,
			};
		};

		it.each(["up", "down"])(
			"should emit 'move-keyboard:edit' when arrow key %s is pressed",
			async (key) => {
				const { wrapper } = setup();

				const card = wrapper.getComponent({ ref: "elementCard" });
				await card.trigger(`keydown.${key}`);

				expect(wrapper.emitted("move-keyboard:edit")).toHaveLength(1);
			}
		);
	});

	describe("Menu", () => {
		describe("when the element is moved up", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					element: h5pElementResponseFactory.build({
						content: { contentId: null },
					}),
					isEditMode: true,
				});

				return {
					wrapper,
				};
			};

			it("should emit 'move-up:edit'", async () => {
				const { wrapper } = setup();

				const menu = wrapper.getComponent(H5pElementMenu);

				menu.vm.$emit("move-up:element");
				await nextTick();

				expect(wrapper.emitted("move-up:edit")).toBeDefined();
			});
		});

		describe("when the element is moved down", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					element: h5pElementResponseFactory.build({
						content: { contentId: null },
					}),
					isEditMode: true,
				});

				return {
					wrapper,
				};
			};

			it("should emit 'move-down:edit'", async () => {
				const { wrapper } = setup();

				const menu = wrapper.getComponent(H5pElementMenu);

				menu.vm.$emit("move-down:element");
				await nextTick();

				expect(wrapper.emitted("move-down:edit")).toBeDefined();
			});
		});

		describe("when the element is moved down", () => {
			const setup = () => {
				const { wrapper } = getWrapper({
					element: h5pElementResponseFactory.build({
						content: { contentId: null },
					}),
					isEditMode: true,
				});

				return {
					wrapper,
				};
			};

			it("should emit 'delete:element'", async () => {
				const { wrapper } = setup();

				const menu = wrapper.getComponent(H5pElementMenu);

				menu.vm.$emit("delete:element");
				await nextTick();

				expect(wrapper.emitted("delete:element")).toBeDefined();
			});
		});
	});
});
