import { mount } from "@vue/test-utils";
import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { CardElementResponseCardElementTypeEnum } from "@/serverApi/v3";
import CardElementList from "@/components/card-elements/CardElementList.vue";
import {
	CardElement,
	CardElementComponentEnum,
} from "@/store/types/card-element";

const getEditableCardElementsMockData = (): CardElement[] => [
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

const getNotEditableCardElementsMockData = (): CardElement[] => [
	{
		id: "123",
		type: CardElementResponseCardElementTypeEnum.RichText,
		model: "some content",
		props: {
			component: CardElementComponentEnum.RichText,
			placeholder: "common.labels.description",
			editable: false,
		},
	},
	{
		id: "456",
		type: CardElementResponseCardElementTypeEnum.RichText,
		model: "more content",
		props: {
			component: CardElementComponentEnum.RichText,
			placeholder: "common.labels.description",
			editable: false,
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
		provide: {
			i18n: { t: (key: string) => key },
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

	describe("editMode set to true", () => {
		describe("basic functions", () => {
			it("should render component", () => {
				const wrapper = getWrapper({
					value: getEditableCardElementsMockData(),
					editMode: true,
				});
				expect(wrapper.findComponent(CardElementList).exists()).toBe(true);
			});

			it("Should render the correct number of card elements", () => {
				const cardElementsMockData = getEditableCardElementsMockData();
				const wrapper = getWrapper({
					value: cardElementsMockData,
					editMode: true,
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
			describe("deleting elements", () => {
				it("should not show delete dialog without the need to delete element", async () => {
					const cardElementsMockData = getEditableCardElementsMockData();
					const wrapper = getWrapper({
						value: cardElementsMockData,
						editMode: true,
					});
					const deleteDialog: any = wrapper.find({
						ref: "delete-dialog",
					});
					expect(deleteDialog.vm.isOpen).toEqual(false);
				});

				it("should show delete dialog when card element delete button is clicked", async () => {
					const cardElementsMockData = getEditableCardElementsMockData();
					const wrapper = getWrapper({
						value: cardElementsMockData,
						editMode: true,
					});
					const deleteDialog: any = wrapper.find({
						ref: "delete-dialog",
					});
					const firstCardElement = wrapper
						.findAllComponents({
							ref: "card-element",
						})
						.at(0);
					expect(firstCardElement.exists()).toBeTruthy();

					firstCardElement.vm.$emit("delete-element");
					await wrapper.vm.$nextTick();
					expect(deleteDialog.vm.isOpen).toEqual(true);
				});

				it("Should delete card element and close delete dialog after confirming deletion", async () => {
					const cardElementsMockData = getEditableCardElementsMockData();
					const wrapper = getWrapper({
						value: cardElementsMockData,
						editMode: true,
					});
					const deleteDialog: any = wrapper.find({
						ref: "delete-dialog",
					});
					const cardElements = wrapper.findAllComponents({
						ref: "card-element",
					});
					const firstCardElement = wrapper
						.findAllComponents({
							ref: "card-element",
						})
						.at(0);
					expect(cardElements.length).toEqual(2);
					expect(firstCardElement.exists()).toBeTruthy();

					firstCardElement.vm.$emit("delete-element");
					await wrapper.vm.$nextTick();
					expect(deleteDialog.vm.isOpen).toEqual(true);

					deleteDialog.vm.$emit("dialog-confirmed");
					await wrapper.vm.$nextTick();
					const updatedCardElements = wrapper.findAllComponents({
						ref: "card-element",
					});
					expect(deleteDialog.vm.isOpen).toEqual(false);
					expect(updatedCardElements.length).toEqual(1);
				});

				it("Should NOT delete card element and close delete dialog after canceling deletion", async () => {
					const cardElementsMockData = getEditableCardElementsMockData();
					const wrapper = getWrapper({
						value: cardElementsMockData,
						editMode: true,
					});
					const deleteDialog: any = wrapper.find({
						ref: "delete-dialog",
					});
					const cardElements = wrapper.findAllComponents({
						ref: "card-element",
					});
					const firstCardElement = wrapper
						.findAllComponents({
							ref: "card-element",
						})
						.at(0);
					expect(cardElements.length).toEqual(2);
					expect(firstCardElement.exists()).toBeTruthy();

					firstCardElement.vm.$emit("delete-element");
					await wrapper.vm.$nextTick();
					expect(deleteDialog.vm.isOpen).toEqual(true);

					const cancelButton = wrapper.find(`[data-testid="dialog-cancel"]`);
					cancelButton.trigger("click");
					await wrapper.vm.$nextTick();
					const updatedCardElements = wrapper.findAllComponents({
						ref: "card-element",
					});
					expect(deleteDialog.vm.isOpen).toEqual(false);
					expect(updatedCardElements.length).toEqual(2);
				});
			});
			it("Should emit input event after dragging elements", async () => {
				const wrapper = getWrapper({
					value: getEditableCardElementsMockData(),
					editMode: true,
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
					value: getEditableCardElementsMockData(),
					editMode: true,
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
				const cardElementsMockData = getEditableCardElementsMockData();
				const wrapper = getWrapper({
					value: cardElementsMockData,
					editMode: true,
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
		});
	});

	describe("editMode set to false", () => {
		describe("basic functions", () => {
			it("should render component", () => {
				const wrapper = getWrapper({
					value: getNotEditableCardElementsMockData(),
					editMode: false,
				});
				expect(wrapper.findComponent(CardElementList).exists()).toBe(true);
			});

			it("Should render the correct number of card elements", () => {
				const cardElementsMockData = getNotEditableCardElementsMockData();
				const wrapper = getWrapper({
					value: cardElementsMockData,
					editMode: false,
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
			it("Draggable component should not be present ", () => {
				const wrapper = getWrapper({
					value: getNotEditableCardElementsMockData(),
					editMode: false,
				});
				const draggable = wrapper.findComponent({
					ref: "draggable",
				});
				expect(draggable.exists()).toBe(false);
			});

			it("Should not be possible to add card elements", async () => {
				const wrapper = getWrapper({
					value: getNotEditableCardElementsMockData(),
					editMode: false,
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
				expect(cardElements.length).toBe(2);
			});

			it("Should not be possible to delete card elements", async () => {
				const wrapper = getWrapper({
					value: getNotEditableCardElementsMockData(),
					editMode: false,
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
				expect(cardElements.length).toBe(2);
			});
		});
	});
});
