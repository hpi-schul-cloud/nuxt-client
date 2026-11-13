import CardHostDetailView from "./CardHostDetailView.vue";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useCardRestApi } from "@/modules/data/board/cardActions/cardRestApi.composable";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useCardSocketApi } from "@/modules/data/board/cardActions/cardSocketApi.composable";
import {
	boardResponseFactory,
	cardResponseFactory,
	createTestEnvStore,
	fileElementResponseFactory,
	mockComposable,
} from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { BoardResponseAllowedOperations, CardResponse, Colors } from "@api-server";
import { useBoardAllowedOperations, useCourseBoardEditMode, useSharedEditMode } from "@data-board";
import { createTestingPinia } from "@pinia/testing";
import { useSharedFileSelect, useSharedLastCreatedElement } from "@util-board";
import { type VueWrapper } from "@vue/test-utils";
import { computed, ref } from "vue";
import type { ComponentProps } from "vue-component-type-helpers";
import { VBtn, VDialog } from "vuetify/components";

const { mockSmAndDown, mockHeight } = vi.hoisted(() => ({
	mockSmAndDown: { value: false },
	mockHeight: { value: 800 },
}));

vi.mock("vuetify", async (importOriginal) => ({
	...(await importOriginal<typeof import("vuetify")>()),
	useDisplay: () => ({
		smAndDown: computed(() => mockSmAndDown.value),
		height: computed(() => mockHeight.value),
	}),
}));

const backgroundColor = Colors.BLUE;

const CARD_WITH_ELEMENTS: CardResponse = cardResponseFactory.build({
	elements: fileElementResponseFactory.buildList(2),
	backgroundColor: backgroundColor,
});

vi.mock("@data-board/BoardPermissions.composable");

vi.mock("@data-board/cardActions/cardRestApi.composable");
vi.mocked(useCardRestApi).mockReturnValue(mockComposable(useCardRestApi));

vi.mock("@data-board/cardActions/cardSocketApi.composable");
vi.mocked(useCardSocketApi).mockReturnValue(mockComposable(useCardSocketApi));

vi.mock("@util-board/LastCreatedElement.composable");
vi.mocked(useSharedLastCreatedElement).mockReturnValue(mockComposable(useSharedLastCreatedElement));

vi.mock("@util-board/file-select.composable");
vi.mocked(useSharedFileSelect).mockReturnValue(mockComposable(useSharedFileSelect));

vi.mock("@data-board/board-allowed-operations.composable");

vi.mock("@data-board/edit-mode.composable");
const mockedUseSharedEditMode = vi.mocked(useSharedEditMode);

describe("CardHostDetailView", () => {
	afterEach(() => {
		vi.clearAllMocks();
		mockSmAndDown.value = false;
		mockHeight.value = 800;
	});

	const setup = (
		props: ComponentProps<typeof CardHostDetailView>,
		allowedOperations?: Partial<BoardResponseAllowedOperations>,
		editMode?: boolean,
		isTableOfContentsEnabled = true
	) => {
		const testBoard = allowedOperations
			? boardResponseFactory.build({ allowedOperations })
			: boardResponseFactory.build();

		vi.mocked(useBoardAllowedOperations).mockReturnValue({
			allowedOperations: computed(() => testBoard.allowedOperations as BoardResponseAllowedOperations),
		});

		vi.mocked(useCourseBoardEditMode).mockReturnValue({
			isEditMode: computed(() => editMode ?? false),
			startEditMode: vi.fn(),
			stopEditMode: vi.fn(),
		});

		const mockedSharedEditMode = mockComposable(useSharedEditMode, {
			editModeId: ref(undefined),
			isInEditMode: computed(() => true),
		});
		mockedUseSharedEditMode.mockReturnValue(mockedSharedEditMode);

		const pinia = createTestingPinia({
			initialState: {
				cardStore: {
					cards: {
						[CARD_WITH_ELEMENTS.id]: CARD_WITH_ELEMENTS,
					},
				},
				boardStore: {
					board: testBoard,
				},
			},
			stubActions: false,
		});
		createTestEnvStore({ FEATURE_COLUMN_BOARD_TABLE_OF_CONTENTS_ENABLED: isTableOfContentsEnabled }, undefined, pinia);

		const wrapper = shallowMount(CardHostDetailView, {
			global: {
				plugins: [pinia, createTestingVuetify(), createTestingI18n()],
				stubs: { VTooltip: { template: '<div><slot name="activator" :props="{}" /></div>' } },
			},
			propsData: props,
			attachTo: document.body,
		});

		return {
			wrapper,
		};
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup({
				cardId: CARD_WITH_ELEMENTS.id,
			});
			expect(wrapper.findComponent(CardHostDetailView).exists()).toBe(true);
		});
	});

	describe("pagination buttons", () => {
		it("should render backward and forward navigation buttons", () => {
			const { wrapper } = setup({
				cardId: CARD_WITH_ELEMENTS.id,
			});

			expect(wrapper.find("[data-testid='prev-detail-view-button']").exists()).toBe(true);
			expect(wrapper.find("[data-testid='next-detail-view-button']").exists()).toBe(true);
		});

		describe("when there is a previous card", () => {
			it("should enable the previous button and link to it", () => {
				const previousCardRoute = {
					name: "boards-card-detail",
					params: { boardId: "any-board-id", cardId: "previous-card-id" },
				};
				const { wrapper } = setup({
					cardId: CARD_WITH_ELEMENTS.id,
					previousCardRoute,
				});

				const prevButton = wrapper.findComponent("[data-testid='prev-detail-view-button']") as VueWrapper<
					InstanceType<typeof VBtn>
				>;
				expect(prevButton.props("disabled")).toBe(false);
				expect(prevButton.props("to")).toEqual(previousCardRoute);
			});
		});

		describe("when there is no previous card", () => {
			it("should disable the previous button", () => {
				const { wrapper } = setup({
					cardId: CARD_WITH_ELEMENTS.id,
				});

				const prevButton = wrapper.findComponent("[data-testid='prev-detail-view-button']") as VueWrapper<
					InstanceType<typeof VBtn>
				>;
				expect(prevButton.props("disabled")).toBe(true);
			});
		});

		describe("when there is a next card", () => {
			it("should enable the next button and link to it", () => {
				const nextCardRoute = {
					name: "boards-card-detail",
					params: { boardId: "any-board-id", cardId: "next-card-id" },
				};
				const { wrapper } = setup({
					cardId: CARD_WITH_ELEMENTS.id,
					nextCardRoute,
				});

				const nextButton = wrapper.findComponent("[data-testid='next-detail-view-button']") as VueWrapper<
					InstanceType<typeof VBtn>
				>;
				expect(nextButton.props("disabled")).toBe(false);
				expect(nextButton.props("to")).toEqual(nextCardRoute);
			});
		});

		describe("when there is no next card", () => {
			it("should disable the next button", () => {
				const { wrapper } = setup({
					cardId: CARD_WITH_ELEMENTS.id,
				});

				const nextButton = wrapper.findComponent("[data-testid='next-detail-view-button']") as VueWrapper<
					InstanceType<typeof VBtn>
				>;
				expect(nextButton.props("disabled")).toBe(true);
			});
		});
	});

	describe("when detail view is open", () => {
		it("should display the dialog", () => {
			const { wrapper } = setup({
				cardId: CARD_WITH_ELEMENTS.id,
			});

			expect(wrapper.findComponent(VDialog).exists()).toBe(true);
		});
	});

	describe("user with edit permissions", () => {
		it("should show edit button", async () => {
			const { wrapper } = setup(
				{
					cardId: CARD_WITH_ELEMENTS.id,
				},
				{ deleteCard: true }
			);

			const editButton = wrapper.find("[data-testid='toolbar-edit-button']");
			expect(editButton.exists()).toBe(true);
		});

		describe("when edit mode is activated", () => {
			it("should show view button", () => {
				const { wrapper } = setup(
					{
						cardId: CARD_WITH_ELEMENTS.id,
					},
					{ deleteCard: true },
					true
				);

				const editButton = wrapper.find("[data-testid='toolbar-edit-button']");
				expect(editButton.exists()).toBe(false);

				const viewButton = wrapper.find("[data-testid='toolbar-view-button']");
				expect(viewButton.exists()).toBe(true);
			});
		});
	});

	describe("user without edit permissions", () => {
		it("should not show edit button", () => {
			const { wrapper } = setup(
				{
					cardId: CARD_WITH_ELEMENTS.id,
				},
				{ deleteCard: false }
			);

			const editButton = wrapper.find("[data-testid='toolbar-edit-button']");
			expect(editButton.exists()).toBe(false);
		});
	});

	describe("when close button gets clicked", () => {
		it("should emit close event", () => {
			const { wrapper } = setup({
				cardId: CARD_WITH_ELEMENTS.id,
			});

			const closeButton = wrapper.find("[data-testid='close-detail-view-button']");
			closeButton.trigger("click");

			expect(wrapper.emitted("close:detail-view")).toBeTruthy();
		});
	});

	describe("table of contents", () => {
		const TOC_TOGGLE = "[data-testid='toggle-table-of-contents-button']";

		const findTableOfContents = (wrapper: VueWrapper) => wrapper.findComponent({ name: "CardTableOfContents" });

		describe("when the feature is disabled", () => {
			it("should not render the toggle", () => {
				const { wrapper } = setup({ cardId: CARD_WITH_ELEMENTS.id }, undefined, undefined, false);

				expect(wrapper.find(TOC_TOGGLE).exists()).toBe(false);
			});

			it("should not render the table of contents even if requested open", () => {
				const { wrapper } = setup(
					{ cardId: CARD_WITH_ELEMENTS.id, tableOfContentsOpen: true },
					undefined,
					undefined,
					false
				);

				expect(findTableOfContents(wrapper).exists()).toBe(false);
			});
		});

		describe("when it is closed", () => {
			it("should not move focus to the current card when opened later", async () => {
				const { wrapper } = setup({ cardId: CARD_WITH_ELEMENTS.id });

				await wrapper.setProps({ tableOfContentsOpen: true });

				expect(findTableOfContents(wrapper).props("focusCurrentCard")).toBe(false);
			});

			it("should not render the table of contents", () => {
				const { wrapper } = setup({ cardId: CARD_WITH_ELEMENTS.id });

				expect(findTableOfContents(wrapper).exists()).toBe(false);
			});

			it("should expose the collapsed state on the toggle", () => {
				const { wrapper } = setup({ cardId: CARD_WITH_ELEMENTS.id });

				const toggle = wrapper.find(TOC_TOGGLE);
				expect(toggle.attributes("aria-expanded")).toBe("false");
				expect(toggle.attributes("aria-controls")).toBeUndefined();
			});

			it("should request opening when the toggle is clicked", async () => {
				const { wrapper } = setup({ cardId: CARD_WITH_ELEMENTS.id });

				await wrapper.find(TOC_TOGGLE).trigger("click");

				expect(wrapper.emitted("update:tableOfContentsOpen")).toEqual([[true]]);
			});
		});

		describe("when it is open", () => {
			it("should render the table of contents", () => {
				const { wrapper } = setup({ cardId: CARD_WITH_ELEMENTS.id, tableOfContentsOpen: true }, undefined, true);

				expect(findTableOfContents(wrapper).exists()).toBe(true);
				expect(wrapper.find("#card-detail-view-toc").exists()).toBe(true);
			});

			it("should expose the expanded state on the toggle", () => {
				const { wrapper } = setup({ cardId: CARD_WITH_ELEMENTS.id, tableOfContentsOpen: true }, undefined, true);

				const toggle = wrapper.find(TOC_TOGGLE);
				expect(toggle.attributes("aria-expanded")).toBe("true");
				expect(toggle.attributes("aria-controls")).toBe("card-detail-view-toc");
			});

			it("should request closing when the toggle is clicked", async () => {
				const { wrapper } = setup({ cardId: CARD_WITH_ELEMENTS.id, tableOfContentsOpen: true }, undefined, true);

				await wrapper.find(TOC_TOGGLE).trigger("click");

				expect(wrapper.emitted("update:tableOfContentsOpen")).toEqual([[false]]);
			});

			it("should move focus to the current card when the card was selected in the table of contents", () => {
				const { wrapper } = setup(
					{ cardId: CARD_WITH_ELEMENTS.id, tableOfContentsOpen: true, focusTarget: "table-of-contents" },
					undefined,
					true
				);

				expect(findTableOfContents(wrapper).props("focusCurrentCard")).toBe(true);
			});

			it("should not move focus to the current card when the card was switched otherwise", () => {
				const { wrapper } = setup(
					{ cardId: CARD_WITH_ELEMENTS.id, tableOfContentsOpen: true, focusTarget: "next-card" },
					undefined,
					true
				);

				expect(findTableOfContents(wrapper).props("focusCurrentCard")).toBe(false);
			});

			it("should label the toggle as showing and hiding the table of contents", () => {
				const { wrapper } = setup({ cardId: CARD_WITH_ELEMENTS.id, tableOfContentsOpen: true }, undefined, true);

				expect(wrapper.find(TOC_TOGGLE).attributes("aria-label")).toBe(
					"components.board.dialog.detail-view.tableOfContents.toggle"
				);
			});

			it("should hand the cards of the board and the elements of the card to the table of contents", () => {
				const { wrapper } = setup({ cardId: CARD_WITH_ELEMENTS.id, tableOfContentsOpen: true }, undefined, true);

				const toc = findTableOfContents(wrapper);
				expect(toc.props("elements").map(({ id }: { id: string }) => id)).toEqual(
					CARD_WITH_ELEMENTS.elements.map(({ id }) => id)
				);
				expect(toc.props("sections")).toBeInstanceOf(Array);
			});
		});

		describe("when an element is selected", () => {
			const [firstElement, secondElement] = CARD_WITH_ELEMENTS.elements;

			const setupWithRenderedElements = () => {
				const result = setup({ cardId: CARD_WITH_ELEMENTS.id, tableOfContentsOpen: true }, undefined, true);
				const scroller = result.wrapper.find<HTMLElement>(".detail-view__scroller").element;
				scroller.scrollTo = vi.fn();
				scroller.scrollTop = 100;
				vi.spyOn(scroller, "getBoundingClientRect").mockReturnValue(new DOMRect(0, 50));

				const targets = [firstElement, secondElement].map((element) => {
					const target = document.createElement("div");
					target.dataset.elementId = element.id;
					vi.spyOn(target, "getBoundingClientRect").mockReturnValue(new DOMRect(0, 400));
					scroller.appendChild(target);

					return target;
				});

				return { ...result, scroller, targets };
			};

			it("should scroll the element of the dialog below a gap into view", async () => {
				const { wrapper, scroller } = setupWithRenderedElements();

				await findTableOfContents(wrapper).vm.$emit("select:element", secondElement.id);

				expect(scroller.scrollTo).toHaveBeenCalledWith({ top: 100 + 400 - 50 - 32, behavior: "smooth" });
			});

			it("should mark the selected element as active in the table of contents", async () => {
				const { wrapper } = setupWithRenderedElements();

				await findTableOfContents(wrapper).vm.$emit("select:element", secondElement.id);

				expect(findTableOfContents(wrapper).props("activeElementId")).toBe(secondElement.id);
			});

			it("should move focus to the focusable content of the element", async () => {
				const { wrapper, targets } = setupWithRenderedElements();
				const button = document.createElement("button");
				targets[1].appendChild(button);

				await findTableOfContents(wrapper).vm.$emit("select:element", secondElement.id);

				expect(document.activeElement).toBe(button);
			});

			it("should move focus to the element itself when it has nothing focusable", async () => {
				const { wrapper, targets } = setupWithRenderedElements();

				await findTableOfContents(wrapper).vm.$emit("select:element", secondElement.id);

				expect(document.activeElement).toBe(targets[1]);
			});

			it("should scroll to the top for the first element", async () => {
				const { wrapper, scroller } = setupWithRenderedElements();

				await findTableOfContents(wrapper).vm.$emit("select:element", firstElement.id);

				expect(scroller.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
			});

			it("should not scroll smoothly when the user prefers reduced motion", async () => {
				const matchMedia = window.matchMedia;
				vi.spyOn(window, "matchMedia").mockImplementation((query) => ({ ...matchMedia(query), matches: true }));
				const { wrapper, scroller } = setupWithRenderedElements();

				await findTableOfContents(wrapper).vm.$emit("select:element", secondElement.id);

				expect(scroller.scrollTo).toHaveBeenCalledWith({ top: 418, behavior: "auto" });
			});

			it("should do nothing when the element is not rendered", async () => {
				const { wrapper, scroller } = setupWithRenderedElements();

				await findTableOfContents(wrapper).vm.$emit("select:element", "unknown-element");

				expect(scroller.scrollTo).not.toHaveBeenCalled();
				expect(wrapper.emitted("update:tableOfContentsOpen")).toBeUndefined();
			});

			it("should keep the table of contents open on large screens", async () => {
				const { wrapper } = setupWithRenderedElements();

				await findTableOfContents(wrapper).vm.$emit("select:element", secondElement.id);

				expect(wrapper.emitted("update:tableOfContentsOpen")).toBeUndefined();
			});

			it("should close the table of contents on small screens", async () => {
				mockSmAndDown.value = true;
				const { wrapper } = setupWithRenderedElements();

				await findTableOfContents(wrapper).vm.$emit("select:element", secondElement.id);

				expect(wrapper.emitted("update:tableOfContentsOpen")).toEqual([[false]]);
			});
		});

		describe("when a card is selected", () => {
			it("should keep the table of contents open on large screens", async () => {
				const { wrapper } = setup({ cardId: CARD_WITH_ELEMENTS.id, tableOfContentsOpen: true }, undefined, true);

				await findTableOfContents(wrapper).vm.$emit("select:card");

				expect(wrapper.emitted("update:tableOfContentsOpen")).toBeUndefined();
			});

			it("should hand the focus over to the table of contents of the next card", async () => {
				const { wrapper } = setup({ cardId: CARD_WITH_ELEMENTS.id, tableOfContentsOpen: true }, undefined, true);

				await findTableOfContents(wrapper).vm.$emit("select:card");

				expect(wrapper.emitted("update:focusTarget")?.at(-1)).toEqual(["table-of-contents"]);
			});

			it("should keep the table of contents open on small screens that are too short to stack it", async () => {
				mockSmAndDown.value = true;
				mockHeight.value = 400;
				const { wrapper } = setup({ cardId: CARD_WITH_ELEMENTS.id, tableOfContentsOpen: true }, undefined, true);

				await findTableOfContents(wrapper).vm.$emit("select:card");

				expect(wrapper.emitted("update:tableOfContentsOpen")).toBeUndefined();
				expect(wrapper.find(".detail-view__body--stacked").exists()).toBe(false);
			});

			it("should close the table of contents on small screens", async () => {
				mockSmAndDown.value = true;
				const { wrapper } = setup({ cardId: CARD_WITH_ELEMENTS.id, tableOfContentsOpen: true }, undefined, true);

				await findTableOfContents(wrapper).vm.$emit("select:card");

				expect(wrapper.emitted("update:tableOfContentsOpen")).toEqual([[false]]);
				expect(wrapper.find(".detail-view__body--stacked").exists()).toBe(true);
			});
		});
	});

	describe("focus after a card switch", () => {
		const PREV_BUTTON = "[data-testid='prev-detail-view-button']";
		const NEXT_BUTTON = "[data-testid='next-detail-view-button']";

		it("should consume the focus target handed over by the previous view", () => {
			const { wrapper } = setup({ cardId: CARD_WITH_ELEMENTS.id, focusTarget: "next-card" });

			expect(wrapper.emitted("update:focusTarget")).toEqual([[undefined]]);
		});

		it.each([
			["previous", PREV_BUTTON, "update:focusTarget", "previous-card"],
			["next", NEXT_BUTTON, "update:focusTarget", "next-card"],
		])("should remember the %s button as focus target when it is clicked", async (_name, selector, event, target) => {
			const { wrapper } = setup({ cardId: CARD_WITH_ELEMENTS.id, previousCardRoute: "/prev", nextCardRoute: "/next" });

			await wrapper.findComponent(selector).trigger("click");

			expect(wrapper.emitted(event)?.at(-1)).toEqual([target]);
		});

		it.each([
			["previous-card", PREV_BUTTON],
			["next-card", NEXT_BUTTON],
		] as const)("should move focus back to the button of %s", (focusTarget, selector) => {
			const focus = vi.spyOn(HTMLElement.prototype, "focus");

			const { wrapper } = setup({
				cardId: CARD_WITH_ELEMENTS.id,
				previousCardRoute: "/prev",
				nextCardRoute: "/next",
				focusTarget,
			});

			expect(focus.mock.contexts).toContain(wrapper.find(selector).element);
			focus.mockRestore();
		});

		it("should move focus to the other button when the used one is disabled at the end of the board", () => {
			const focus = vi.spyOn(HTMLElement.prototype, "focus");

			const { wrapper } = setup({
				cardId: CARD_WITH_ELEMENTS.id,
				previousCardRoute: "/prev",
				focusTarget: "next-card",
			});

			expect(focus.mock.contexts).toContain(wrapper.find(PREV_BUTTON).element);
			focus.mockRestore();
		});
	});
});
