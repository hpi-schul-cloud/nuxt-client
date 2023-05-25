import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import RoomBoardCard from "./RoomBoardCard.vue";

const $router = {
	push: jest.fn(),
};

describe("RoomBoardCard", () => {
	let wrapper: Wrapper<Vue>;

	const setup = (props: { dragInProgress: boolean; keyDrag: boolean }) => {
		document.body.setAttribute("data-app", "true");
		wrapper = shallowMount(RoomBoardCard as MountOptions<Vue>, {
			...createComponentMocks({ i18n: true }),
			provide: {
				i18n: { t: (key: string) => key },
			},
			propsData: props,
			mocks: { $router },
		});
	};
	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			setup({ dragInProgress: false, keyDrag: false });
			expect(wrapper.findComponent(RoomBoardCard).exists()).toBe(true);
		});
	});

	describe("when a board card is rendered", () => {
		it("should have correct board title", () => {
			setup({ dragInProgress: false, keyDrag: false });
			const expectedBoardTitle = "Kurs-Board";
			const boardTitle = wrapper.find(".board-title").element.textContent;

			expect(boardTitle).toContain(expectedBoardTitle);
		});

		it("should redirect to column board when clicking on the card", () => {
			setup({ dragInProgress: false, keyDrag: false });
			const boardCard = wrapper.findComponent({ name: "VCard" });

			boardCard.vm.$emit("click");

			expect($router.push).toHaveBeenCalledTimes(1);
			expect($router.push).toHaveBeenCalledWith(
				"646e1722d921ff87bc02f7df/board"
			);
		});

		it("should not redirect to column board if a card is dragged", async () => {
			setup({ dragInProgress: true, keyDrag: false });
			const boardCard = wrapper.findComponent({ name: "VCard" });

			boardCard.vm.$emit("click");
			await wrapper.vm.$nextTick();

			expect($router.push).not.toHaveBeenCalled();
		});
	});
});
