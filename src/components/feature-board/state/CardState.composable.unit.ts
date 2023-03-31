import { shallowMount, Wrapper } from "@vue/test-utils";
import { nextTick } from "vue";
import { useSharedCardRequestPool } from "../CardRequestPool.composable";
import { useCardState } from "./CardState.composable";
import Vue from "vue";

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
jest.mock("../CardRequestPool.composable");
const mockedUseSharedCardRequestPool = jest.mocked(useSharedCardRequestPool);

describe("CardState composable", () => {
	let fetchMock: jest.Mock;
	beforeEach(() => {
		fetchMock = jest.fn().mockResolvedValue({
			id: "abc",
		});
		mockedUseSharedCardRequestPool.mockReturnValue({
			fetchCard: fetchMock,
		});
	});

	it("should fetch card on mount", async () => {
		const cardId = "123124";
		mountComposable(() => useCardState(cardId));

		expect(fetchMock).toHaveBeenCalledWith(cardId);
	});

	it("should return fetch function that updates card and loading state", async () => {
		const cardId1 = "123124a";
		const cardId2 = "123125b";
		const { fetchCard, card, isLoading } = mountComposable(() =>
			useCardState(cardId1)
		);

		await fetchCard(cardId2);
		expect(fetchMock).toHaveBeenLastCalledWith(cardId2);
		expect(card.value?.id).toBe("abc");
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
});
