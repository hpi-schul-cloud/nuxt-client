import { defineComponent, nextTick, provide } from "vue";
import { mount, shallowMount, Wrapper } from "@vue/test-utils";
import * as serverApi from "../../serverApi/v3/api";
import { useSharedCardRequestPool } from "./CardRequestPool.composable";
import { useCardState } from "./CardState.composable";

export interface MountOptions {
	provider?: () => void;
}
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

	//@ts-ignore
	return wrapper.vm.result;
};
jest.mock("./CardRequestPool.composable");
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
		mountComposable(() => useCardState("123124"));

		expect(fetchMock).toHaveBeenCalledWith("123124");
	});
	it("should return fetch function", async () => {
		const { fetchCard, card, isLoading } = mountComposable(() =>
			useCardState("123124")
		);

		await fetchCard("123");
		expect(fetchMock).toHaveBeenLastCalledWith("123");
		expect(card.value?.id).toBe("abc");
		expect(isLoading.value).toBe(false);
	});
});
