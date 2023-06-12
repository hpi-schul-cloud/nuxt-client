import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, mount, Wrapper } from "@vue/test-utils";
import Vue from "vue";
import RoomBoardCard from "./RoomBoardCard.vue";

const $router = {
	push: jest.fn(),
};

const mockBoardData = {
	id: "test-id",
	title: "title",
	published: false,
	createdAt: "2023-05-31T15:34:59.276Z",
	updatedAt: "2023-05-31T15:34:59.276Z",
	columnBoardId: "column-board-id",
};

const mockCourseData = {
	courseId: "test-course-id",
	courseName: "test-course-name",
};

describe("RoomBoardCard", () => {
	let wrapper: Wrapper<Vue>;

	const setup = () => {
		document.body.setAttribute("data-app", "true");
		wrapper = mount(RoomBoardCard as MountOptions<Vue>, {
			...createComponentMocks({ i18n: true }),
			provide: {
				i18n: { t: (key: string) => key },
			},
			propsData: {
				dragInProgress: false,
				keyDrag: false,
				columnBoardItem: mockBoardData,
				courseData: mockCourseData,
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
			const boardId = wrapper.props().columnBoardItem.columnBoardId;
			const boardCard = wrapper.findComponent({ name: "VCard" });

			boardCard.vm.$emit("click");

			expect($router.push).toHaveBeenCalledTimes(1);
			expect($router.push).toHaveBeenCalledWith(`${boardId}/board`);
		});

		it("should redirect to column board when pressing enter on the card", async () => {
			setup();
			const boardId = wrapper.props().columnBoardItem.columnBoardId;
			const boardCard = wrapper.findComponent({ name: "VCard" });

			await boardCard.trigger("keydown.enter");

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

		it("should emit 'onDrag' when pressing space", async () => {
			setup();
			const boardCard = wrapper.findComponent({ name: "VCard" });

			await boardCard.trigger("keydown.space");

			expect(wrapper.emitted("on-drag")).toHaveLength(1);
		});

		it("should emit 'tab-pressed' when pressing tab", async () => {
			setup();
			const boardCard = wrapper.findComponent({ name: "VCard" });

			await boardCard.trigger("keydown.tab");

			expect(wrapper.emitted("tab-pressed")).toHaveLength(1);
		});

		it.each([["up"], ["down"]])(
			"should emit 'move-element' when pressing the %s arrow key and keyDrag is true",
			async (key) => {
				setup();
				await wrapper.setProps({ keyDrag: true });
				const boardCard = wrapper.findComponent({ name: "VCard" });

				await boardCard.trigger(`keydown.${key}`);

				expect(wrapper.emitted("move-element")).toHaveLength(1);
			}
		);

		it.each([["up"], ["down"]])(
			"should not emit 'move-element' when pressing the %s arrow key and keyDrag is false",
			async (key) => {
				setup();
				const boardCard = wrapper.findComponent({ name: "VCard" });

				await boardCard.trigger(`keydown.${key}`);

				expect(wrapper.emitted("move-element")).toBeUndefined();
			}
		);
	});
});
