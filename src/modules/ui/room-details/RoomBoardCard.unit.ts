import {
	createTestingI18n,
	createTestingVuetify,
} from "@@/tests/test-utils/setup";
import { mount, VueWrapper } from "@vue/test-utils";
import RoomBoardCard from "./RoomBoardCard.vue";

import {
	BoardLayout,
	ConfigResponse,
	ImportUserResponseRoleNamesEnum,
} from "@/serverApi/v3";
import EnvConfigModule from "@/store/env-config";
import { ENV_CONFIG_MODULE_KEY } from "@/utils/inject";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import { createMock } from "@golevelup/ts-vitest";
import { Router, useRouter } from "vue-router";
import { VListItem, VMenu } from "vuetify/lib/components/index";
vi.mock("vue-router");
const useRouterMock = <vi.Mock>useRouter;

type BoardData = {
	id: string;
	title?: string;
	published: boolean;
	createdAt: string;
	updatedAt: string;
	columnBoardId: string;
	layout: BoardLayout;
};

const mockDraftBoardData = {
	id: "test-id",
	title: "title",
	published: false,
	createdAt: "2023-05-31T15:34:59.276Z",
	updatedAt: "2023-05-31T15:34:59.276Z",
	columnBoardId: "column-board-id",
	layout: BoardLayout.Columns,
};

const mockPublishedBoardData = {
	id: "test-id-2",
	title: "title-2",
	published: true,
	createdAt: "2023-05-31T15:34:59.276Z",
	updatedAt: "2023-05-31T15:34:59.276Z",
	columnBoardId: "column-board-id-2",
	layout: BoardLayout.Columns,
};

const mockDraftListBoardData = {
	id: "test-id-3",
	title: "title-3",
	published: false,
	createdAt: "2023-05-31T15:34:59.276Z",
	updatedAt: "2023-05-31T15:34:59.276Z",
	columnBoardId: "list-board-id",
	layout: BoardLayout.List,
};

const mockPublishedListBoardData = {
	id: "test-id-4",
	title: "title-4",
	published: true,
	createdAt: "2023-05-31T15:34:59.276Z",
	updatedAt: "2023-05-31T15:34:59.276Z",
	columnBoardId: "list-board-id-2",
	layout: BoardLayout.List,
};

const mockCourseData = {
	courseId: "test-course-id",
	courseName: "test-course-name",
};

describe("RoomBoardCard", () => {
	const setup = (
		props: { boardData: BoardData; userRole: ImportUserResponseRoleNamesEnum },
		options?: object,
		envs?: Partial<ConfigResponse>
	) => {
		const router = createMock<Router>();
		useRouterMock.mockReturnValue(router);
		// Note: router has to be mocked before mounting the component
		const envConfigModuleMock = createModuleMocks(EnvConfigModule, {
			getEnv: { ...envs } as ConfigResponse,
		});

		const wrapper = mount(RoomBoardCard, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
				provide: { [ENV_CONFIG_MODULE_KEY.valueOf()]: envConfigModuleMock },
			},
			props: {
				dragInProgress: false,
				keyDrag: false,
				columnBoardItem: {
					...props.boardData,
				},
				courseData: mockCourseData,
				userRole: props.userRole,
				boardCardIndex: 0,
			},
			...options,
		});

		return { wrapper, router };
	};

	afterEach(() => {
		vi.resetAllMocks();
	});

	describe("when a board card is rendered", () => {
		const userRole = ImportUserResponseRoleNamesEnum.Teacher;

		it("should be found in dom", () => {
			const { wrapper } = setup({ boardData: mockDraftBoardData, userRole });
			expect(wrapper.findComponent(RoomBoardCard).exists()).toBe(true);
		});

		describe("when board title is defined and not empty", () => {
			it("should have correct board title", () => {
				const { wrapper } = setup({ boardData: mockDraftBoardData, userRole });
				const expectedBoardTitle = mockDraftBoardData.title;
				const boardTitle = wrapper.find(`[data-testid="board-title-0"]`).element
					.textContent;

				expect(boardTitle).toContain(expectedBoardTitle);
			});
		});

		describe("when title is defined but empty", () => {
			it("should have correct board title", () => {
				const { wrapper } = setup({
					boardData: { ...mockDraftBoardData, title: "" },
					userRole,
				});
				const expectedBoardTitle = "pages.room.boardCard.label.courseBoard";
				const boardTitle = wrapper.find(`[data-testid="board-title-0"]`).element
					.textContent;

				expect(boardTitle).toContain(expectedBoardTitle);
			});
		});

		describe("when title is undefined", () => {
			it("should have correct board title", () => {
				const { wrapper } = setup({
					boardData: { ...mockDraftBoardData, title: undefined },
					userRole,
				});
				const expectedBoardTitle = "pages.room.boardCard.label.courseBoard";
				const boardTitle = wrapper.find(`[data-testid="board-title-0"]`).element
					.textContent;

				expect(boardTitle).toContain(expectedBoardTitle);
			});
		});

		describe("when user is a teacher", () => {
			const setupTeacherMenu = (envs?: Partial<ConfigResponse>) => {
				const { wrapper } = setup(
					{
						boardData: mockPublishedBoardData,
						userRole,
					},
					{},
					envs
				);

				return { wrapper };
			};
			it("should show three dot menu", () => {
				const { wrapper } = setupTeacherMenu();
				const threeDotMenu = wrapper.find(".three-dot-button");
				expect(threeDotMenu.exists()).toBe(true);
			});

			describe("three dot menu", () => {
				const getMenuItem = async (wrapper: VueWrapper, dataTestid: string) => {
					const threeDotMenu = wrapper.find(".three-dot-button");

					await threeDotMenu.trigger("click");

					const menu = wrapper.findComponent(VMenu);
					const menuItems = menu.findAllComponents(VListItem);

					const menuItem = menuItems.find(
						(item) => item.attributes("data-testid") === dataTestid
					);

					return menuItem;
				};

				it("should include the 'edit' item", async () => {
					const { wrapper } = setupTeacherMenu();

					const menuItem = await getMenuItem(
						wrapper,
						"board-card-menu-action-edit-0"
					);
					expect(menuItem?.exists()).toBe(true);
				});

				it("should include the 'copy' item", async () => {
					const { wrapper } = setupTeacherMenu();

					const menuItem = await getMenuItem(
						wrapper,
						"board-card-menu-action-copy-0"
					);
					expect(menuItem?.exists()).toBe(true);
				});

				describe("when share feature is enabled", () => {
					it("should include the 'share' item", async () => {
						const { wrapper } = setupTeacherMenu({
							FEATURE_COLUMN_BOARD_SHARE: true,
						});

						const menuItem = await getMenuItem(
							wrapper,
							"board-card-menu-action-share-0"
						);
						expect(menuItem?.exists()).toBe(true);
					});
				});

				describe("when share feature is disabled", () => {
					it("should include the 'share' item", async () => {
						const { wrapper } = setupTeacherMenu({
							FEATURE_COLUMN_BOARD_SHARE: false,
						});

						const menuItem = await getMenuItem(
							wrapper,
							"board-card-menu-action-share-0"
						);
						expect(menuItem).toBeUndefined();
					});
				});

				it("should include the 'remove' item", async () => {
					const { wrapper } = setupTeacherMenu();

					const menuItem = await getMenuItem(
						wrapper,
						"board-card-menu-action-remove-0"
					);
					expect(menuItem?.exists()).toBe(true);
				});

				describe("when 'copy' item is clicked", () => {
					it("should emit 'copy-board' event", async () => {
						const { wrapper } = setupTeacherMenu();

						const menuItem = await getMenuItem(
							wrapper,
							"board-card-menu-action-copy-0"
						);

						await menuItem?.trigger("click");

						expect(wrapper.emitted("copy-board")).toHaveLength(1);
					});
				});

				describe("when 'share' item is clicked", () => {
					it("should emit 'share-board' event", async () => {
						const { wrapper } = setupTeacherMenu({
							FEATURE_COLUMN_BOARD_SHARE: true,
						});

						const menuItem = await getMenuItem(
							wrapper,
							"board-card-menu-action-share-0"
						);

						await menuItem?.trigger("click");

						expect(wrapper.emitted("share-board")).toHaveLength(1);
					});
				});
			});

			describe("when board is a draft", () => {
				describe("when board is a column board", () => {
					it("should have correct combined card title", () => {
						const { wrapper } = setup({
							boardData: mockDraftBoardData,
							userRole,
						});
						const boardCardTitle = wrapper.find(
							`[data-testid="board-card-title-0"]`
						).element.textContent;

						expect(boardCardTitle).toContain(
							"pages.room.boardCard.label.columnBoard - common.words.draft"
						);
					});
				});

				describe("when board is a list board", () => {
					it("should have correct combined card title", () => {
						const { wrapper } = setup({
							boardData: mockDraftListBoardData,
							userRole,
						});
						const boardCardTitle = wrapper.find(
							`[data-testid="board-card-title-0"]`
						).element.textContent;

						expect(boardCardTitle).toContain(
							"pages.room.boardCard.label.listBoard - common.words.draft"
						);
					});
				});

				it("should use hidden UI", () => {
					const { wrapper: wrapperDraft } = setup({
						boardData: mockDraftBoardData,
						userRole,
					});
					const boardDraftCard = wrapperDraft.find(".board-card");
					expect(boardDraftCard.element.className).toContain("board-hidden");

					const { wrapper: wrapperPublished } = setup({
						boardData: mockPublishedBoardData,
						userRole,
					});
					const boardPublishedCard = wrapperPublished.find(".board-card");
					expect(boardPublishedCard.element.className).not.toContain(
						"board-hidden"
					);
				});

				it("should show publish action button in menu", () => {
					const { wrapper: wrapperDraft } = setup({
						boardData: mockDraftBoardData,
						userRole,
					});

					const cardActionButtons = wrapperDraft.findAllComponents(
						`[data-testid="board-card-action-publish-0"]`
					);
					expect(cardActionButtons).toHaveLength(1);
				});

				it("should show publish card action", () => {
					const { wrapper: wrapperDraft } = setup({
						boardData: mockDraftBoardData,
						userRole,
					});
					const boardPublishedCard = wrapperDraft.find(".board-card");
					const actionButtonsPublished =
						boardPublishedCard.findAll(".action-button");

					expect(actionButtonsPublished).toHaveLength(1);
				});
			});

			describe("when board is published", () => {
				describe("when board is a column board", () => {
					it("should have correct combined card title", () => {
						const { wrapper } = setup({
							boardData: mockPublishedBoardData,
							userRole,
						});
						const boardCardTitle = wrapper.find(
							`[data-testid="board-card-title-0"]`
						).element.textContent;

						expect(boardCardTitle).toContain(
							"pages.room.boardCard.label.columnBoard"
						);
					});
				});

				describe("when board is a list board", () => {
					it("should have correct combined card title", () => {
						const { wrapper } = setup({
							boardData: mockPublishedListBoardData,
							userRole,
						});
						const boardCardTitle = wrapper.find(
							`[data-testid="board-card-title-0"]`
						).element.textContent;

						expect(boardCardTitle).toContain(
							"pages.room.boardCard.label.listBoard"
						);
					});
				});

				it("should show unpublish button in menu", async () => {
					const { wrapper: wrapperPublished } = setup({
						boardData: mockPublishedBoardData,
						userRole,
					});

					const threeDotMenuPublished =
						wrapperPublished.find(".three-dot-button");
					await threeDotMenuPublished.trigger("click");

					const moreActionButtons = wrapperPublished.findAllComponents(
						`[data-testid="board-card-menu-action-unpublish-0"]`
					);
					expect(moreActionButtons).toHaveLength(1);
				});

				it("should not show publish card action", () => {
					const { wrapper: wrapperPublished } = setup({
						boardData: mockPublishedBoardData,
						userRole,
					});
					const boardPublishedCard = wrapperPublished.find(".board-card");
					const actionButtonsPublished =
						boardPublishedCard.findAll(".action-button");
					expect(actionButtonsPublished).toHaveLength(0);
				});
			});
		});

		describe("when user is a student", () => {
			const userRole = ImportUserResponseRoleNamesEnum.Student;

			it("should not show three dot menu", () => {
				const { wrapper: wrapperPublishedStudent } = setup({
					boardData: mockPublishedBoardData,
					userRole,
				});
				const threeDotMenuPublishedStudent =
					wrapperPublishedStudent.find(".three-dot-button");
				expect(threeDotMenuPublishedStudent.exists()).toBe(false);

				const { wrapper: wrapperDraftStudent } = setup({
					boardData: mockDraftBoardData,
					userRole,
				});
				const threeDotMenuDraftStudent =
					wrapperDraftStudent.find(".three-dot-button");
				expect(threeDotMenuDraftStudent.exists()).toBe(false);
			});

			it("should not show card actions", () => {
				const { wrapper: wrapperDraftStudent } = setup({
					boardData: mockDraftBoardData,
					userRole,
				});
				const boardDraftCardStudent = wrapperDraftStudent.find(".board-card");
				const actionButtonsDraftStudent =
					boardDraftCardStudent.findAll(".action-button");
				expect(actionButtonsDraftStudent).toHaveLength(0);

				const { wrapper: wrapperPublishedStudent } = setup({
					boardData: mockPublishedBoardData,
					userRole,
				});
				const boardPublishedCardStudent =
					wrapperPublishedStudent.find(".board-card");
				const actionButtonsPublishedStudent =
					boardPublishedCardStudent.findAll(".action-button");
				expect(actionButtonsPublishedStudent).toHaveLength(0);
			});
		});
	});

	describe("when interacting with a board card", () => {
		const userRole = ImportUserResponseRoleNamesEnum.Teacher;

		it("should redirect to column board when clicking on the card", () => {
			const { wrapper, router } = setup({
				boardData: mockDraftBoardData,
				userRole,
			});
			const boardId = mockDraftBoardData.columnBoardId;
			const boardCard = wrapper.findComponent({ name: "VCard" });

			boardCard.vm.$emit("click");

			expect(router.push).toHaveBeenCalledTimes(1);
			expect(router.push).toHaveBeenCalledWith(`/boards/${boardId}`);
		});

		it("should redirect to column board when pressing enter on the card", async () => {
			const { wrapper, router } = setup({
				boardData: mockDraftBoardData,
				userRole,
			});
			const boardId = mockDraftBoardData.columnBoardId;
			const boardCard = wrapper.findComponent({ name: "VCard" });

			await boardCard.trigger("keydown.enter");

			expect(router.push).toHaveBeenCalledTimes(1);
			expect(router.push).toHaveBeenCalledWith(`/boards/${boardId}`);
		});

		it("should not redirect to column board if a card is dragged", async () => {
			const { wrapper, router } = setup({
				boardData: mockDraftBoardData,
				userRole,
			});
			await wrapper.setProps({ dragInProgress: true });

			const boardCard = wrapper.findComponent({ name: "VCard" });

			boardCard.vm.$emit("click");
			await wrapper.vm.$nextTick();

			expect(router.push).not.toHaveBeenCalled();
		});

		it("should emit 'onDrag' when pressing space", async () => {
			const { wrapper } = setup({ boardData: mockDraftBoardData, userRole });
			const boardCard = wrapper.findComponent({ name: "VCard" });

			await boardCard.trigger("keydown.space");

			expect(wrapper.emitted("on-drag")).toHaveLength(1);
		});

		it("should emit 'tab-pressed' when pressing tab", async () => {
			const { wrapper } = setup({ boardData: mockDraftBoardData, userRole });
			const boardCard = wrapper.findComponent({ name: "VCard" });

			await boardCard.trigger("keydown.tab");

			expect(wrapper.emitted("tab-pressed")).toHaveLength(1);
		});

		it.each([["up"], ["down"]])(
			"should emit 'move-element' when pressing the %s arrow key and keyDrag is true",
			async (key) => {
				const { wrapper } = setup({ boardData: mockDraftBoardData, userRole });
				await wrapper.setProps({ keyDrag: true });
				const boardCard = wrapper.findComponent({ name: "VCard" });

				await boardCard.trigger(`keydown.${key}`);

				expect(wrapper.emitted("move-element")).toHaveLength(1);
			}
		);

		it.each([["up"], ["down"]])(
			"should not emit 'move-element' when pressing the %s arrow key and keyDrag is false",
			async (key) => {
				const { wrapper } = setup({ boardData: mockDraftBoardData, userRole });
				const boardCard = wrapper.findComponent({ name: "VCard" });

				await boardCard.trigger(`keydown.${key}`);

				expect(wrapper.emitted("move-element")).toBeUndefined();
			}
		);

		it("should emit 'update-visibility' when card action button is pressed on draft board", async () => {
			const { wrapper } = setup(
				{ boardData: mockDraftBoardData, userRole },
				{ userRole: "teacher" }
			);
			const boardCard = wrapper.find(".board-card");
			const cardActionButton = boardCard.findComponent(
				`[data-testid="board-card-action-publish-0"]`
			);

			await cardActionButton.trigger("click");
			const emitted = wrapper.emitted("update-visibility");
			expect(emitted).toHaveLength(1);
		});

		it("should emit 'update-visibility' when three dot menu button and action button is pressed on published board", async () => {
			const { wrapper } = setup(
				{ boardData: mockPublishedBoardData, userRole },
				{ userRole: "teacher" }
			);

			const threeDotMenuPublished = wrapper.find(".three-dot-button");
			await threeDotMenuPublished.trigger("click");
			const moreActionButton = wrapper.findComponent(
				`[data-testid="board-card-menu-action-unpublish-0"]`
			);

			await moreActionButton.trigger("click");
			const emitted = wrapper.emitted("update-visibility");
			expect(emitted).toHaveLength(1);
		});
	});
});
