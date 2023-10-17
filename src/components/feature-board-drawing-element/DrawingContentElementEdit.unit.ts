import { I18N_KEY } from "@/utils/inject";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { shallowMount } from "@vue/test-utils";
import DrawingContentElementEdit from "./DrawingContentElementEdit.vue";
import DrawingContentElementMenu from "./DrawingContentElementMenu.vue";

describe("DrawingContentElementEdit", () => {
	const propsData = {
		lastUpdatedAt: "03.12 15:56",
		isFirstElement: false,
		isLastElement: false,
		hasMultipleElements: false,
	};

	const setup = () => {
		document.body.setAttribute("data-app", "true");

		const wrapper = shallowMount(DrawingContentElementEdit, {
			...createComponentMocks({ i18n: true }),
			propsData,
			provide: {
				[I18N_KEY.valueOf()]: { t: (key: string) => key },
			},
		});

		return {
			wrapper,
			...propsData,
		};
	};

	it("should be found in the DOM", () => {
		const { wrapper } = setup();
		expect(wrapper.exists()).toBe(true);
	});

	it("should display an icon", () => {
		const { wrapper } = setup();
		const drawingIcon = wrapper.find("v-icon-stub");
		expect(drawingIcon.exists()).toBe(true);
	});

	it("should render the DrawingContentElementMenu", () => {
		const { wrapper } = setup();
		const menu = wrapper.findComponent(DrawingContentElementMenu);
		expect(menu.exists()).toBe(true);
	});

	const eventTests = [
		{ eventName: "delete:element", emitName: "delete:element" },
		{ eventName: "move-down:element", emitName: "move-down:element" },
		{ eventName: "move-up:element", emitName: "move-up:element" },
	];

	eventTests.forEach(({ eventName, emitName }) => {
		it(`should forward ${eventName} from DrawingContentElementMenu`, () => {
			const { wrapper } = setup();
			const menu = wrapper.findComponent(DrawingContentElementMenu);
			menu.vm.$emit(eventName);
			expect(wrapper.emitted(emitName)).toHaveLength(1);
		});
	});
});
