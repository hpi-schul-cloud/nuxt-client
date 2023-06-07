import { shallowMount, Wrapper } from "@vue/test-utils";
import { nextTick } from "vue";
import { useSharedCardRequestPool } from "../shared/CardRequestPool.composable";
import { useCardState } from "./CardState.composable";
import Vue from "vue";
import { useBoardApi } from "../shared/BoardApi.composable";
import {
	cardResponseFactory,
	timestampsResponseFactory,
} from "@@/tests/test-utils/factory";

let wrapper: Wrapper<Vue>;

const mountComposable = <R>(composable: () => R): R => {
	const TestComponent = {
		template: "<div></div>",
	};

	wrapper = shallowMount(TestComponent, {
		setup() {
			const result = composable();
			return { result };
		},
	});

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
	return wrapper.vm.result;
};
jest.mock("../shared/CardRequestPool.composable");
const mockedUseSharedCardRequestPool = jest.mocked(useSharedCardRequestPool);

jest.mock("../shared/BoardApi.composable");
const mockedUseBoardApi = jest.mocked(useBoardApi);

describe("CardState composable", () => {
	let fetchMock: jest.Mock;
	let mockedBoardApiCalls: ReturnType<typeof useBoardApi>;
	beforeEach(() => {
		fetchMock = jest.fn().mockResolvedValue({
			id: "abc",
		});
		mockedUseSharedCardRequestPool.mockReturnValue({
			fetchCard: fetchMock,
		});

		mockedBoardApiCalls = {
			updateCardTitle: jest.fn(),
			createColumnCall: jest.fn(),
			createElement: jest.fn(),
			deleteCardCall: jest.fn(),
			deleteColumnCall: jest.fn(),
			moveCardCall: jest.fn(),
			moveColumnCall: jest.fn(),
			updateCardHeightCall: jest.fn(),
			updateColumnTitleCall: jest.fn(),
			updateElementCall: jest.fn(),
			createCardCall: jest.fn(),
		};
		mockedUseBoardApi.mockReturnValue(mockedBoardApiCalls);
	});

	it("should fetch card on mount", async () => {
		const cardId = "123124";
		mountComposable(() => useCardState(cardId));

		expect(fetchMock).toHaveBeenCalledWith(cardId);
	});

	it("should return fetch function that updates card and loading state", async () => {
		const cardId1 = "123124a";
		const cardId2 = "123125b";
		const { fetchCard, isLoading } = mountComposable(() =>
			useCardState(cardId1)
		);

		await fetchCard(cardId2);
		expect(fetchMock).toHaveBeenLastCalledWith(cardId2);
		// expect(card.value?.cardId).toBe("abc"); // TODO: refactor after connected to the backend again
		expect(isLoading.value).toBe(false);
	});

	it("should log on error", async () => {
		const cardId = "123124";
		const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
		const errorToThrow = new Error("something went wrong");

		fetchMock.mockRejectedValue(errorToThrow);
		mountComposable(() => useCardState(cardId));
		await nextTick();
		await nextTick(); // test mounts it twice

		expect(consoleErrorSpy).toHaveBeenCalledWith(errorToThrow);

		consoleErrorSpy.mockRestore();
	});

	describe("updateTitle", () => {
		// WIP
		it("should call updateCardTitle", async () => {
			const testCard = {
				id: `cardid`,
				height: 200,
				title: "old Title",
				elements: [],
				visibility: { publishedAt: },
			};

			const { updateTitle, card } = mountComposable(() =>
				useCardState(testCard.id)
			);
			card.value = testCard;
			await updateTitle("new title");
			await nextTick();
			await nextTick();
			expect(mockedBoardApiCalls.updateCardTitle).toHaveBeenCalledWith(
				testCard.id,
				testCard.title
			);
		});
		it("should update card title", async () => {});
	});
	describe("deleteCard", () => {});
	describe("updateCardHeight", () => {});
	describe("addElement", () => {});
});
