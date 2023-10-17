import { I18N_KEY } from "@/utils/inject";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { BoardMenuAction } from "@ui-board";
import { shallowMount } from "@vue/test-utils";
import DrawingContentElementMenu from "./DrawingContentElementMenu.vue";

describe("DrawingContentElementMenu", () => {
	const propsData = {
		elementId: "123",
		isFirstElement: false,
		isLastElement: false,
		hasMultipleElements: false,
	};

	const setupWrapper = () => {
		document.body.setAttribute("data-app", "true");

		return shallowMount(DrawingContentElementMenu, {
			...createComponentMocks({ i18n: true }),
			propsData,
			provide: {
				[I18N_KEY.valueOf()]: { t: (key: string) => key },
			},
		});
	};

	it("should be found in the DOM", () => {
		const wrapper = setupWrapper();
		expect(wrapper.exists()).toBe(true);
	});

	const eventTests = [
		{ eventName: "delete:element", emitName: "delete:element" },
		{ eventName: "move-down:element", emitName: "move-down:element" },
		{ eventName: "move-up:element", emitName: "move-up:element" },
		{ eventName: "open:element", emitName: "open:element" },
	];

	eventTests.forEach(({ eventName, emitName }) => {
		it(`should forward ${eventName} from DrawingContentElementMenu`, () => {
			const wrapper = setupWrapper();
			const menu = wrapper.findComponent(DrawingContentElementMenu);
			menu.vm.$emit(eventName);
			expect(wrapper.emitted(emitName)).toHaveLength(1);
		});
	});

	describe("when element is at the beginning of the content elements list", () => {
		const setupFirstElement = () => {
			document.body.setAttribute("data-app", "true");

			const firstElementSetupProps = {
				elementId: "123",
				isFirstElement: true,
				isLastElement: false,
				hasMultipleElements: true,
			};
			const wrapper = shallowMount(DrawingContentElementMenu, {
				...createComponentMocks({ i18n: true }),
				propsData: firstElementSetupProps,
			});

			return {
				wrapper,
			};
		};

		it("should not show the move up action", () => {
			const { wrapper } = setupFirstElement();

			const moveUpTranslation = wrapper.vm
				.$t("components.board.action.moveUp")
				.toString();

			const childComponent = wrapper
				.findAllComponents(BoardMenuAction)
				.filter((c) => c.text().includes(moveUpTranslation));

			expect(childComponent.exists()).toBe(false);
		});

		it("should show the move down action", () => {
			const { wrapper } = setupFirstElement();

			const moveDownTranslation = wrapper.vm
				.$t("components.board.action.moveDown")
				.toString();

			const childComponent = wrapper
				.findAllComponents(BoardMenuAction)
				.filter((c) => c.text().includes(moveDownTranslation))
				.at(0);

			expect(childComponent.exists()).toBe(true);
		});
	});

	describe("when element is at the end of the content elements list", () => {
		const setupLastElement = () => {
			document.body.setAttribute("data-app", "true");

			const lastElementSetupProps = {
				elementId: "123",
				isFirstElement: false,
				isLastElement: true,
				hasMultipleElements: true,
			};
			const wrapper = shallowMount(DrawingContentElementMenu, {
				...createComponentMocks({ i18n: true }),
				propsData: lastElementSetupProps,
			});

			return {
				wrapper,
			};
		};

		it("should show the move up action", () => {
			const { wrapper } = setupLastElement();

			const moveUpTranslation = wrapper.vm
				.$t("components.board.action.moveUp")
				.toString();

			const childComponent = wrapper
				.findAllComponents(BoardMenuAction)
				.filter((c) => c.text().includes(moveUpTranslation))
				.at(0);

			expect(childComponent.exists()).toBe(true);
		});

		it("should not show the move down action", () => {
			const { wrapper } = setupLastElement();

			const moveDownTranslation = wrapper.vm
				.$t("components.board.action.moveDown")
				.toString();
		
			const childComponent = wrapper
				.findAllComponents(BoardMenuAction)
				.filter((c) => c.text().includes(moveDownTranslation));

			expect(childComponent.exists()).toBe(false);
		});
	});

	describe("when only a single element is present", () => {
		const setupSingleElement = () => {
			document.body.setAttribute("data-app", "true");

			const singleElementSetupProps = {
				isFirstElement: false,
				isLastElement: false,
				hasMultipleElements: false,
			};
			const wrapper = shallowMount(DrawingContentElementMenu, {
				...createComponentMocks({ i18n: true }),
				propsData: singleElementSetupProps,
			});

			return {
				wrapper,
			};
		};

		it("should not show the move up action", () => {
			const { wrapper } = setupSingleElement();

			const moveUpTranslation = wrapper.vm
				.$t("components.board.action.moveUp")
				.toString();

			const childComponent = wrapper
				.findAllComponents(BoardMenuAction)
				.filter((c) => c.text().includes(moveUpTranslation));

			expect(childComponent.exists()).toBe(false);
		});

		it("should not show the move down action", () => {
			const { wrapper } = setupSingleElement();

			const moveDownTranslation = wrapper.vm
				.$t("components.board.action.moveDown")
				.toString();

			const childComponent = wrapper
				.findAllComponents(BoardMenuAction)
				.filter((c) => c.text().includes(moveDownTranslation));

			expect(childComponent.exists()).toBe(false);
		});
	});
});
