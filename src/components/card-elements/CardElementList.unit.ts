import { provide } from "@vue/composition-api";
import { mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { CardElementResponseCardElementTypeEnum } from "@/serverApi/v3";
import CardElementList from "@/components/card-elements/CardElementList.vue";
import {
	CardElement,
	CardElementComponentEnum,
} from "@/store/types/card-element";

const getCardElementsMockData = (): CardElement[] => [
	{
		id: "123",
		type: CardElementResponseCardElementTypeEnum.RichText,
		model: "some content",
		props: {
			component: CardElementComponentEnum.RichText,
			placeholder: "common.labels.description",
			editable: true,
		},
	},
	{
		id: "456",
		type: CardElementResponseCardElementTypeEnum.RichText,
		model: "more content",
		props: {
			component: CardElementComponentEnum.RichText,
			placeholder: "common.labels.description",
			editable: true,
		},
	},
];

class ResizeObserver {
	observe() {}
	unobserve() {}
	disconnect() {}
}

const getWrapper = (props?: object) => {
	return mount(CardElementList, {
		...createComponentMocks({
			i18n: true,
		}),
		setup() {
			provide("i18n", { t: (key: string) => key });
		},
		propsData: props,
	});
};

describe("@components/card-elements/CardElementList", () => {
	beforeEach(() => {
		// Avoids console warnings "[Vuetify] Unable to locate target [data-app]"
		document.body.setAttribute("data-app", "true");
		window.ResizeObserver = ResizeObserver;
	});

	describe("basic functions", () => {
		it("should render component", () => {
			const wrapper = getWrapper({
				value: getCardElementsMockData(),
			});
			expect(wrapper.findComponent(CardElementList).exists()).toBe(true);
		});

		it("Should render the correct number of card elements", () => {
			const cardElementsMockData = getCardElementsMockData();
			const wrapper = getWrapper({
				value: cardElementsMockData,
			});
			const cardElements = wrapper.findAllComponents({
				ref: "card-element",
			});
			expect(cardElements.length).toBe(2);

			expect(cardElements.at(0).props().value).toStrictEqual(
				cardElementsMockData[0].model
			);
			expect(cardElements.at(1).props().value).toStrictEqual(
				cardElementsMockData[1].model
			);
		});
	});

	describe("event handling", () => {
		it("Should emit input event after dragging elements", async () => {
			const wrapper = getWrapper({
				value: getCardElementsMockData(),
			});
			const draggable = wrapper.findComponent({
				ref: "draggable",
			});
			draggable.vm.$emit("input");
			await wrapper.vm.$nextTick();
			expect(wrapper.emitted("input")).toHaveLength(1);
		});

		it("Should add card element", async () => {
			const wrapper = getWrapper({
				value: getCardElementsMockData(),
			});
			const firstCardElement = wrapper
				.findAllComponents({
					ref: "card-element",
				})
				.at(0);
			expect(firstCardElement.exists()).toBeTruthy();

			firstCardElement.vm.$emit("add-element");
			await wrapper.vm.$nextTick();
			const cardElements = wrapper.findAllComponents({
				ref: "card-element",
			});
			expect(cardElements.length).toBe(3);
		});

		it("Should add new card element below", async () => {
			const cardElementsMockData = getCardElementsMockData();
			const wrapper = getWrapper({
				value: cardElementsMockData,
			});
			const firstCardElement = wrapper
				.findAllComponents({
					ref: "card-element",
				})
				.at(0);
			expect(firstCardElement.exists()).toBeTruthy();

			firstCardElement.vm.$emit("add-element");
			await wrapper.vm.$nextTick();
			const cardElements = wrapper.findAllComponents({
				ref: "card-element",
			});

			expect(cardElements.length).toBe(3);
			expect(cardElements.at(0).props().value).toEqual(
				cardElementsMockData[0].model
			);
			expect(cardElements.at(1).props().value).toEqual("");
			expect(cardElements.at(2).props().value).toEqual(
				cardElementsMockData[2].model
			);
		});

		it("Should delete card element", async () => {
			const wrapper = getWrapper({
				value: getCardElementsMockData(),
			});
			const firstCardElement = wrapper
				.findAllComponents({
					ref: "card-element",
				})
				.at(0);
			expect(firstCardElement.exists()).toBeTruthy();

			firstCardElement.vm.$emit("delete-element");
			await wrapper.vm.$nextTick();
			const cardElements = wrapper.findAllComponents({
				ref: "card-element",
			});
			expect(cardElements.length).toBe(1);
		});
	});
});
