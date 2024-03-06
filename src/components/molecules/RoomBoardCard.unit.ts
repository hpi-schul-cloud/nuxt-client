import { mount } from "@vue/test-utils";
import RoomBoardCard from "./RoomBoardCard.vue";
import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";

import { Router, useRouter } from "vue-router";
import { createMock } from "@golevelup/ts-jest";

jest.mock("vue-router");
const useRouterMock = <jest.Mock>useRouter;

const mockDraftBoardData = {
	id: "test-id",
	title: "title",
	published: false,
	createdAt: "2023-05-31T15:34:59.276Z",
	updatedAt: "2023-05-31T15:34:59.276Z",
	columnBoardId: "column-board-id",
};

const mockPublishedBoardData = {
	id: "test-id-2",
	title: "title-2",
	published: true,
	createdAt: "2023-05-31T15:34:59.276Z",
	updatedAt: "2023-05-31T15:34:59.276Z",
	columnBoardId: "column-board-id-2",
};

const mockCourseData = {
	courseId: "test-course-id",
	courseName: "test-course-name",
};

describe("RoomBoardCard", () => {
	const setup = (props: object) => {
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
				courseData: mockCourseData,
				...props,
			},
		});

		return { wrapper, router };
	};

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("when a board card is rendered", () => {
		const role = "teacher";
		it("should be found in dom", () => {
			const { wrapper } = setup({ columnBoardItem: mockDraftBoardData, role });
			expect(wrapper.findComponent(RoomBoardCard).exists()).toBe(true);
		});

		it("should have correct board title", () => {
			const { wrapper } = setup({ columnBoardItem: mockDraftBoardData, role });
			const expectedBoardTitle = "pages.room.boardCard.label.courseBoard";
			const boardTitle = wrapper.find(".board-title").element.textContent;

			expect(boardTitle).toContain(expectedBoardTitle);
		});

		it("should have correct combined card title for draft board", () => {
			const { wrapper } = setup({ columnBoardItem: mockDraftBoardData, role });
			const boardTitle = wrapper.find(".title-board-card").element.textContent;

			expect(boardTitle).toContain(
				`${mockDraftBoardData.title} - common.words.draft`
			);
		});

		it("should use hidden UI only for draft board cards", async () => {
			const { wrapper: wrapperDraft } = setup({
				columnBoardItem: mockDraftBoardData,
				role,
			});
			const boardDraftCard = wrapperDraft.find(".board-card");
			expect(boardDraftCard.element.className).toContain("board-hidden");

			const { wrapper: wrapperPublished } = setup({
				columnBoardItem: mockPublishedBoardData,
				role,
			});
			const boardPublishedCard = wrapperPublished.find(".board-card");
			expect(boardPublishedCard.element.className).not.toContain(
				"board-hidden"
			);
		});

		it("should show three dot menu and find revert button for teachers on published boards", async () => {
			const { wrapper: wrapperPublished } = setup({
				columnBoardItem: mockPublishedBoardData,
				role,
			});

			const threeDotMenuPublished = wrapperPublished.find(".three-dot-button");
			await threeDotMenuPublished.trigger("click");

			const moreActionButtons = wrapperPublished.findAllComponents(
				`[data-testid="content-card-board-menu-revert"]`
			);
			expect(moreActionButtons).toHaveLength(1);
		});

		it("should show publish action button for teachers on draft boards", async () => {
			const { wrapper: wrapperDraft } = setup({
				columnBoardItem: mockDraftBoardData,
				role,
			});

			const cardActionButtons = wrapperDraft.findAllComponents(
				`[data-testid="content-card-board-menu-publish"]`
			);
			expect(cardActionButtons).toHaveLength(1);
		});

		it("should not show three dot menu for students at all or for teachers on draft boards", async () => {
			const { wrapper: wrapperPublishedStudent } = setup({
				columnBoardItem: mockPublishedBoardData,
				role: "student",
			});
			const threeDotMenuPublishedStudent =
				wrapperPublishedStudent.find(".three-dot-button");
			expect(threeDotMenuPublishedStudent.exists()).toBe(false);

			const { wrapper: wrapperDraftStudent } = setup({
				columnBoardItem: mockDraftBoardData,
				role: "student",
			});
			const threeDotMenuDraftStudent =
				wrapperDraftStudent.find(".three-dot-button");
			expect(threeDotMenuDraftStudent.exists()).toBe(false);

			const { wrapper: wrapperDraft } = setup({
				columnBoardItem: mockDraftBoardData,
				role,
			});
			const threeDotMenuDraft = wrapperDraft.find(".three-dot-button");
			expect(threeDotMenuDraft.exists()).toBe(false);
		});

		it("should not show card actions for students at all or for teachers on published boards", async () => {
			const { wrapper: wrapperDraftStudent } = setup({
				columnBoardItem: mockDraftBoardData,
				role: "student",
			});
			const boardDraftCardStudent = wrapperDraftStudent.find(".board-card");
			const actionButtonsDraftStudent =
				boardDraftCardStudent.findAll(".action-button");
			expect(actionButtonsDraftStudent).toHaveLength(0);

			const { wrapper: wrapperPublishedStudent } = setup({
				columnBoardItem: mockPublishedBoardData,
				role: "student",
			});
			const boardPublishedCardStudent =
				wrapperPublishedStudent.find(".board-card");
			const actionButtonsPublishedStudent =
				boardPublishedCardStudent.findAll(".action-button");
			expect(actionButtonsPublishedStudent).toHaveLength(0);

			const { wrapper: wrapperPublished } = setup({
				columnBoardItem: mockPublishedBoardData,
				role,
			});
			const boardPublishedCard = wrapperPublished.find(".board-card");
			const actionButtonsPublished =
				boardPublishedCard.findAll(".action-button");
			expect(actionButtonsPublished).toHaveLength(0);
		});
	});

	describe("when interacting with a board card", () => {
		it("should redirect to column board when clicking on the card", () => {
			const { wrapper, router } = setup({
				columnBoardItem: mockDraftBoardData,
			});
			const boardId = mockDraftBoardData.columnBoardId;
			const boardCard = wrapper.findComponent({ name: "VCard" });

			boardCard.vm.$emit("click");

			expect(router.push).toHaveBeenCalledTimes(1);
			expect(router.push).toHaveBeenCalledWith(`${boardId}/board`);
		});

		it("should redirect to column board when pressing enter on the card", async () => {
			const { wrapper, router } = setup({
				columnBoardItem: mockDraftBoardData,
			});
			const boardId = mockDraftBoardData.columnBoardId;
			const boardCard = wrapper.findComponent({ name: "VCard" });

			await boardCard.trigger("keydown.enter");

			expect(router.push).toHaveBeenCalledTimes(1);
			expect(router.push).toHaveBeenCalledWith(`${boardId}/board`);
		});

		it("should not redirect to column board if a card is dragged", async () => {
			const { wrapper, router } = setup({
				columnBoardItem: mockDraftBoardData,
			});
			await wrapper.setProps({ dragInProgress: true });

			const boardCard = wrapper.findComponent({ name: "VCard" });

			boardCard.vm.$emit("click");
			await wrapper.vm.$nextTick();

			expect(router.push).not.toHaveBeenCalled();
		});

		it("should emit 'onDrag' when pressing space", async () => {
			const { wrapper } = setup({ columnBoardItem: mockDraftBoardData });
			const boardCard = wrapper.findComponent({ name: "VCard" });

			await boardCard.trigger("keydown.space");

			expect(wrapper.emitted("on-drag")).toHaveLength(1);
		});

		it("should emit 'tab-pressed' when pressing tab", async () => {
			const { wrapper } = setup({ columnBoardItem: mockDraftBoardData });
			const boardCard = wrapper.findComponent({ name: "VCard" });

			await boardCard.trigger("keydown.tab");

			expect(wrapper.emitted("tab-pressed")).toHaveLength(1);
		});

		it.each([["up"], ["down"]])(
			"should emit 'move-element' when pressing the %s arrow key and keyDrag is true",
			async (key) => {
				const { wrapper } = setup({ columnBoardItem: mockDraftBoardData });
				await wrapper.setProps({ keyDrag: true });
				const boardCard = wrapper.findComponent({ name: "VCard" });

				await boardCard.trigger(`keydown.${key}`);

				expect(wrapper.emitted("move-element")).toHaveLength(1);
			}
		);

		it.each([["up"], ["down"]])(
			"should not emit 'move-element' when pressing the %s arrow key and keyDrag is false",
			async (key) => {
				const { wrapper } = setup({ columnBoardItem: mockDraftBoardData });
				const boardCard = wrapper.findComponent({ name: "VCard" });

				await boardCard.trigger(`keydown.${key}`);

				expect(wrapper.emitted("move-element")).toBeUndefined();
			}
		);

		it("should emit 'publish-board' when card action button is pressed on draft board", async () => {
			const { wrapper } = setup({
				columnBoardItem: mockDraftBoardData,
				role: "teacher",
			});
			const boardCard = wrapper.find(".board-card");
			const cardActionButtons = boardCard.findAllComponents(
				`[data-testid="content-card-board-menu-publish"]`
			);

			await cardActionButtons[0].trigger("click");
			const emitted = wrapper.emitted("publish-board");
			expect(emitted).toHaveLength(1);
		});

		it("should emit 'revert-board' when three dot menu button and action button is pressed on published board", async () => {
			const { wrapper } = setup({
				columnBoardItem: mockPublishedBoardData,
				role: "teacher",
			});

			const threeDotMenuPublished = wrapper.find(".three-dot-button");
			await threeDotMenuPublished.trigger("click");
			const moreActionButtons = wrapper.findAllComponents(
				`[data-testid="content-card-board-menu-revert"]`
			);

			await moreActionButtons[0].trigger("click");
			const emitted = wrapper.emitted("revert-board");
			expect(emitted).toHaveLength(1);
		});
	});
});
