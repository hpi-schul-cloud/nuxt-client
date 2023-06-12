import createComponentMocks from "@@/tests/test-utils/componentMocks";
import { MountOptions, shallowMount, Wrapper } from "@vue/test-utils";
import Vue, { ref } from "vue";
import { useCardState } from "../state/CardState.composable";
import { BoardCard, BoardCardSkeleton } from "../types/Card";
import CardHost from "./CardHost.vue";
import { useBoardPermissions } from "../shared/BoardPermissions.composable";
import { BoardPermissionsTypes } from "../types/Board";
import { I18N_KEY } from "@/utils/inject";

jest.mock("../shared/BoardPermissions.composable");
const mockedUserPermissions = jest.mocked(useBoardPermissions);

const defaultPermissions = {
	hasDeletePermission: true,
};

const CARD_SKELETON: BoardCardSkeleton = {
	height: 200,
	cardId: "0123456789abcdef00067000",
};

const CARD_WITHOUT_ELEMENTS: BoardCard = {
	id: "0123456789abcdef00067000",
	title: "Empty Card",
	height: 200,
	elements: [],
	visibility: { publishedAt: "2022-01-01 20:00:00" },
};

jest.mock("../state/CardState.composable");
const mockedUseCardState = jest.mocked(useCardState);

describe("CardHost", () => {
	let wrapper: Wrapper<Vue>;

	const setup = (options?: {
		card: BoardCard;
		isLoading?: boolean;
		permissions?: BoardPermissionsTypes;
	}) => {
		const { card, isLoading } = options ?? {};
		document.body.setAttribute("data-app", "true");
		mockedUseCardState.mockReturnValue({
			fetchCard: jest.fn(),
			updateTitle: jest.fn(),
			deleteCard: jest.fn(),
			updateCardHeight: jest.fn(),
			addElement: jest.fn(),
			card: ref(card),
			isLoading: ref(isLoading ?? false),
		});
		mockedUserPermissions.mockReturnValue({
			...defaultPermissions,
			...options?.permissions,
		});

		wrapper = shallowMount(CardHost as MountOptions<Vue>, {
			...createComponentMocks({}),
			provide: {
				i18n: { t: (key: string) => key },
			},
			propsData: CARD_SKELETON,
			provide: {
				[I18N_KEY as symbol]: { t: (key: string) => key },
			},
		});
	};

	describe("when component is mounted", () => {
		it("should be found in dom", () => {
			setup({ card: CARD_WITHOUT_ELEMENTS });
			expect(wrapper.findComponent(CardHost).exists()).toBe(true);
		});

		describe("'CardSkeleton' component", () => {
			it("should be rendered if loading is set 'true'", () => {
				setup({ card: CARD_WITHOUT_ELEMENTS, isLoading: true });
				expect(wrapper.findComponent({ name: "CardSkeleton" }).exists()).toBe(
					true
				);
			});

			it("should not be rendered if loading is set 'false'", () => {
				setup({ card: CARD_WITHOUT_ELEMENTS });
				expect(wrapper.findComponent({ name: "CardSkeleton" }).exists()).toBe(
					false
				);
			});
		});
	});

	describe("user permissions", () => {
		describe("when user is not permitted to delete", () => {
			it("should not be rendered on DOM", () => {
				setup({
					card: CARD_WITHOUT_ELEMENTS,
					permissions: { hasDeletePermission: false },
				});

				const boardMenuComponent = wrapper.findAllComponents({
					name: "BoardMenu",
				});

				expect(boardMenuComponent.length).toStrictEqual(0);
			});
		});
	});
});
