import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import RoomBoardCard from "./RoomBoardCard.vue";

const $router = {
	push: jest.fn(),
};

describe("RoomBoardCard", () => {
	let wrapper: Wrapper<Vue>;

	const setup = () => {
		document.body.setAttribute("data-app", "true");
		wrapper = shallowMount(RoomBoardCard as MountOptions<Vue>, {
			...createComponentMocks({ i18n: true }),
			provide: {
				i18n: { t: (key: string) => key },
			},
			propsData: {
				dragInProgress: false,
				keyDrag: false,
				id: "646e1722d921ff87bc02f7df",
			},
			mocks: { $router },
		});
	};

	beforeEach(() => {
		$router.push.mockReset();
	});

	describe("when a board card is rendered", () => {
		it("should be found in dom", () => {
			setup();
			expect(wrapper.findComponent(RoomBoardCard).exists()).toBe(true);
		});

		it("should have correct board title", () => {
			setup();
			const expectedBoardTitle = "Kurs-Board";
			const boardTitle = wrapper.find(".board-title").element.textContent;

			expect(boardTitle).toContain(expectedBoardTitle);
		});
	});

	describe("when interacting with a board card", () => {
		it("should redirect to column board when clicking on the card", () => {
			setup();
			const boardId = wrapper.props().id;
			const boardCard = wrapper.findComponent({ name: "VCard" });

			boardCard.vm.$emit("click");

			expect($router.push).toHaveBeenCalledTimes(1);
			expect($router.push).toHaveBeenCalledWith(`${boardId}/board`);
		});

		it("should redirect to column board when pressing enter on the card", () => {
			setup();
			const boardId = wrapper.props().id;
			const boardCard = wrapper.findComponent({ name: "VCard" });

			boardCard.vm.$emit("keydown.enter");

			expect($router.push).toHaveBeenCalledTimes(1);
			expect($router.push).toHaveBeenCalledWith(`${boardId}/board`);
		});

		it("should not redirect to column board if a card is dragged", async () => {
			setup();
			await wrapper.setProps({ dragInProgress: true });

			const boardCard = wrapper.findComponent({ name: "VCard" });

			boardCard.vm.$emit("click");
			await wrapper.vm.$nextTick();

			expect($router.push).not.toHaveBeenCalled();
		});
	});
});
