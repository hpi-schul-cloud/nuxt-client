import CardHostDetailView from "./CardHostDetailView.vue";
import CardTitle from "./CardTitle.vue";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useCardRestApi } from "@/modules/data/board/cardActions/cardRestApi.composable";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useCardSocketApi } from "@/modules/data/board/cardActions/cardSocketApi.composable";
import { cardResponseFactory, fileElementResponseFactory } from "@@/tests/test-utils";
import { mockComposable } from "@@/tests/test-utils";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { BoardResponseAllowedOperations, CardResponse } from "@api-server";
import { useCourseBoardEditMode, useSharedEditMode } from "@data-board";
import { createTestingPinia } from "@pinia/testing";
import { useSharedFileSelect, useSharedLastCreatedElement } from "@util-board";
import { shallowMount, type VueWrapper } from "@vue/test-utils";
import { Mocked } from "vitest";
import { computed, nextTick, ref } from "vue";
import type { ComponentProps } from "vue-component-type-helpers";

const CARD_WITH_ELEMENTS: CardResponse = cardResponseFactory.build({
	elements: [fileElementResponseFactory.build()],
});

vi.mock("@util-board");
vi.mock("@data-board/BoardPermissions.composable");
vi.mock("@data-board/edit-mode.composable");
vi.mock("@data-board/cardActions/cardRestApi.composable");

vi.mock("@data-board/cardActions/cardRestApi.composable");
vi.mocked(useCardRestApi).mockReturnValue(mockComposable(useCardRestApi));

vi.mock("@data-board/cardActions/cardSocketApi.composable");
vi.mocked(useCardSocketApi).mockReturnValue(mockComposable(useCardSocketApi));

interface CardHostDetailViewExposed {
	isEditMode: { value: boolean };
	onUpdateCardTitle: (value: string) => void;
	onAddElement: () => void;
	onDeleteCard: () => Promise<void> | void;
}

const getVm = (wrapper: VueWrapper): CardHostDetailViewExposed => wrapper.vm as unknown as CardHostDetailViewExposed;

describe("CardHostDetailView", () => {
	const setup = (
		props: ComponentProps<typeof CardHostDetailView>,

		allowedOperations?: Partial<BoardResponseAllowedOperations>
	) => {
		const wrapper = shallowMount(CardHostDetailView, {
			global: {
				plugins: [
					createTestingPinia({
						initialState: {
							cardStore: {
								cards: {},
							},
							boardStore: {
								board: {
									allowedOperations: allowedOperations,
								},
							},
						},
						stubActions: false,
					}),
					createTestingVuetify(),
					createTestingI18n(),
				],
			},
			propsData: props,
		});

		return {
			wrapper,
		};
	};

	let useSharedFileSelectMock: Mocked<ReturnType<typeof useSharedFileSelect>>;

	beforeEach(() => {
		vi.mocked(useSharedEditMode).mockReturnValue(
			mockComposable(useSharedEditMode, {
				editModeId: ref(undefined),
				isInEditMode: computed(() => true),
			})
		);
		vi.mocked(useCourseBoardEditMode).mockReturnValue(
			mockComposable(useCourseBoardEditMode, {
				isEditMode: computed(() => true),
			})
		);
		vi.mocked(useSharedLastCreatedElement).mockReturnValue(mockComposable(useSharedLastCreatedElement));

		useSharedFileSelectMock = mockComposable(useSharedFileSelect, {
			isFileSelectOnMountEnabled: ref(true),
		});
		vi.mocked(useSharedFileSelect).mockReturnValue(useSharedFileSelectMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			const { wrapper } = setup({
				card: CARD_WITH_ELEMENTS,
				isOpen: true,
				columnIndex: 0,
				rowIndex: 1,
			});
			expect(wrapper.findComponent(CardHostDetailView).exists()).toBe(true);
		});
	});

	describe("when edit button is clicked", () => {
		it("should toggle edit mode", async () => {
			const { wrapper } = setup(
				{
					card: CARD_WITH_ELEMENTS,
					isOpen: true,
					columnIndex: 0,
					rowIndex: 1,
				},
				{ deleteCard: true }
			);

			const button = wrapper.get("[data-testid='toolbar-edit-button']");
			await button.trigger("click");

			await nextTick();

			const cardTitleWrapper = wrapper.getComponent(CardTitle);
			expect(cardTitleWrapper.props("isEditMode")).toBe(true);
		});
	});

	describe("events", () => {
		it("should emit close event when dialog is closed", async () => {
			const { wrapper } = setup({
				card: CARD_WITH_ELEMENTS,
				isOpen: true,
				columnIndex: 0,
				rowIndex: 1,
			});

			await wrapper.vm.$emit("close:detail-view");
			await nextTick();

			expect(wrapper.emitted("close:detail-view")).toBeTruthy();
		});

		it("should emit update:title when title is updated", () => {
			const { wrapper } = setup({
				card: CARD_WITH_ELEMENTS,
				isOpen: true,
				columnIndex: 0,
				rowIndex: 1,
			});

			const newTitle = "New title";
			getVm(wrapper).onUpdateCardTitle(newTitle);

			expect(wrapper.emitted("update:title")?.[0]).toEqual([newTitle]);
		});

		it("should emit add:element and enable edit mode when element is added", () => {
			const { wrapper } = setup({
				card: CARD_WITH_ELEMENTS,
				isOpen: true,
				columnIndex: 0,
				rowIndex: 1,
			});

			getVm(wrapper).onAddElement();

			expect(wrapper.emitted("add:element")).toBeTruthy();
		});
	});
});
