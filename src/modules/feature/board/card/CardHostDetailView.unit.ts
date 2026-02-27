import CardHostDetailView from "./CardHostDetailView.vue";
import CardTitle from "./CardTitle.vue";
import { CardResponse } from "@/serverApi/v3";
import { cardResponseFactory, fileElementResponseFactory } from "@@/tests/test-utils";
import setupDeleteConfirmationComposableMock from "@@/tests/test-utils/composable-mocks/setupDeleteConfirmationComposableMock";
import { createTestingI18n, createTestingVuetify } from "@@/tests/test-utils/setup";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import { shallowMount, type VueWrapper } from "@vue/test-utils";
import { nextTick, ref } from "vue";
import type { ComponentProps } from "vue-component-type-helpers";

const CARD_WITH_ELEMENTS: CardResponse = cardResponseFactory.build({
	elements: [fileElementResponseFactory.build()],
});

vi.mock("@data-board/BoardPermissions.composable");
vi.mock("@ui-confirmation-dialog");
const mockedUseDeleteConfirmationDialog = vi.mocked(useDeleteConfirmationDialog);

interface CardHostDetailViewExposed {
	isEditMode: { value: boolean };
	onUpdateCardTitle: (value: string) => void;
	onAddElement: () => void;
	onDeleteCard: () => Promise<void> | void;
}

const getVm = (wrapper: VueWrapper): CardHostDetailViewExposed => wrapper.vm as unknown as CardHostDetailViewExposed;

describe("CardHostDetailView", () => {
	let askDeleteConfirmationMock: () => Promise<boolean>;

	const setup = (props: ComponentProps<typeof CardHostDetailView>) => {
		const wrapper = shallowMount(CardHostDetailView, {
			global: {
				plugins: [createTestingVuetify(), createTestingI18n()],
			},
			propsData: props,
		});

		return {
			wrapper,
		};
	};

	beforeEach(() => {
		askDeleteConfirmationMock = vi.fn().mockResolvedValue(true);
		setupDeleteConfirmationComposableMock({
			askDeleteConfirmationMock,
		});

		mockedUseDeleteConfirmationDialog.mockReturnValue({
			askDeleteConfirmation: askDeleteConfirmationMock,
			isDeleteDialogOpen: ref(false),
		});
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
			const { wrapper } = setup({
				card: CARD_WITH_ELEMENTS,
				isOpen: true,
				columnIndex: 0,
				rowIndex: 1,
			});

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

	describe("delete card", () => {
		it("should emit delete:card when confirmation is accepted", async () => {
			askDeleteConfirmationMock = vi.fn().mockResolvedValue(true);
			mockedUseDeleteConfirmationDialog.mockReturnValue({
				askDeleteConfirmation: askDeleteConfirmationMock,
				isDeleteDialogOpen: ref(false),
			});

			const { wrapper } = setup({
				card: CARD_WITH_ELEMENTS,
				isOpen: true,
				columnIndex: 0,
				rowIndex: 1,
			});

			await getVm(wrapper).onDeleteCard();
			await nextTick();

			expect(askDeleteConfirmationMock).toHaveBeenCalledWith(CARD_WITH_ELEMENTS.title, "components.boardCard");
			expect(wrapper.emitted("delete:card")).toBeTruthy();
		});

		it("should not emit delete:card when confirmation is cancelled", async () => {
			askDeleteConfirmationMock = vi.fn().mockResolvedValue(false);
			mockedUseDeleteConfirmationDialog.mockReturnValue({
				askDeleteConfirmation: askDeleteConfirmationMock,
				isDeleteDialogOpen: ref(false),
			});

			const { wrapper } = setup({
				card: CARD_WITH_ELEMENTS,
				isOpen: true,
				columnIndex: 0,
				rowIndex: 1,
			});

			await getVm(wrapper).onDeleteCard();
			await nextTick();

			expect(wrapper.emitted("delete:card")).toBeFalsy();
		});
	});
});
