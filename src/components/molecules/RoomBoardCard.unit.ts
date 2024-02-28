import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount } from "@vue/test-utils";
import RoomBoardCard from "./RoomBoardCard.vue";

import { createMock } from "@golevelup/ts-jest";
import { Router, useRouter } from "vue-router";

jest.mock("vue-router");
const useRouterMock = <jest.Mock>useRouter;

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
	const setup = (props?: { title: string | undefined }) => {
		const router = createMock<Router>();
		useRouterMock.mockReturnValue(router);
		// Note: router has to be mocked before mounting the component
		const wrapper = mount(RoomBoardCard, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			props: {
				dragInProgress: false,
				keyDrag: false,
				columnBoardItem: {
					...mockBoardData,
					title: props ? props.title : mockBoardData.title,
				},
				courseData: mockCourseData,
			},
		});

		return { wrapper, router };
	};

	describe("when a board card is rendered", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup();
			expect(wrapper.findComponent(RoomBoardCard).exists()).toBe(true);
		});

		describe("when board title is defined and not empty", () => {
			it("should have correct board title", () => {
				const { wrapper } = setup();
				const expectedBoardTitle = mockBoardData.title;
				const boardTitle = wrapper.find(".board-title").element.textContent;

				expect(boardTitle).toContain(expectedBoardTitle);
			});
		});

		describe("when title is defined but empty", () => {
			it("should have correct board title", () => {
				const props = { title: "" };
				const { wrapper } = setup(props);
				const expectedBoardTitle = "pages.room.boardCard.label.courseBoard";
				const boardTitle = wrapper.find(".board-title").element.textContent;

				expect(boardTitle).toContain(expectedBoardTitle);
			});
		});

		describe("when title is undefined", () => {
			it("should have correct board title", () => {
				const props = { title: undefined };
				const { wrapper } = setup(props);
				const expectedBoardTitle = "pages.room.boardCard.label.courseBoard";
				const boardTitle = wrapper.find(".board-title").element.textContent;

				expect(boardTitle).toContain(expectedBoardTitle);
			});
		});
	});

	describe("when interacting with a board card", () => {
		it("should redirect to column board when clicking on the card", () => {
			const { wrapper, router } = setup();
			const boardId = mockBoardData.columnBoardId;
			const boardCard = wrapper.findComponent({ name: "VCard" });

			boardCard.vm.$emit("click");

			expect(router.push).toHaveBeenCalledTimes(1);
			expect(router.push).toHaveBeenCalledWith(`${boardId}/board`);
		});

		it("should redirect to column board when pressing enter on the card", async () => {
			const { wrapper, router } = setup();
			const boardId = mockBoardData.columnBoardId;
			const boardCard = wrapper.findComponent({ name: "VCard" });

			await boardCard.trigger("keydown.enter");

			expect(router.push).toHaveBeenCalledTimes(1);
			expect(router.push).toHaveBeenCalledWith(`${boardId}/board`);
		});

		it("should not redirect to column board if a card is dragged", async () => {
			const { wrapper, router } = setup();
			await wrapper.setProps({ dragInProgress: true });

			const boardCard = wrapper.findComponent({ name: "VCard" });

			boardCard.vm.$emit("click");
			await wrapper.vm.$nextTick();

			expect(router.push).not.toHaveBeenCalled();
		});

		it("should emit 'onDrag' when pressing space", async () => {
			const { wrapper } = setup();
			const boardCard = wrapper.findComponent({ name: "VCard" });

			await boardCard.trigger("keydown.space");

			expect(wrapper.emitted("on-drag")).toHaveLength(1);
		});

		it("should emit 'tab-pressed' when pressing tab", async () => {
			const { wrapper } = setup();
			const boardCard = wrapper.findComponent({ name: "VCard" });

			await boardCard.trigger("keydown.tab");

			expect(wrapper.emitted("tab-pressed")).toHaveLength(1);
		});

		it.each([["up"], ["down"]])(
			"should emit 'move-element' when pressing the %s arrow key and keyDrag is true",
			async (key) => {
				const { wrapper } = setup();
				await wrapper.setProps({ keyDrag: true });
				const boardCard = wrapper.findComponent({ name: "VCard" });

				await boardCard.trigger(`keydown.${key}`);

				expect(wrapper.emitted("move-element")).toHaveLength(1);
			}
		);

		it.each([["up"], ["down"]])(
			"should not emit 'move-element' when pressing the %s arrow key and keyDrag is false",
			async (key) => {
				const { wrapper } = setup();
				const boardCard = wrapper.findComponent({ name: "VCard" });

				await boardCard.trigger(`keydown.${key}`);

				expect(wrapper.emitted("move-element")).toBeUndefined();
			}
		);
	});
});
