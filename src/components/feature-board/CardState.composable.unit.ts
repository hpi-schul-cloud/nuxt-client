import { shallowMount, Wrapper } from "@vue/test-utils";
import { nextTick } from "vue";
import { useSharedCardRequestPool } from "./CardRequestPool.composable";
import { useCardState } from "./CardState.composable";

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

	it("should return fetch function that updates card and loading state", async () => {
		const { fetchCard, card, isLoading } = mountComposable(() =>
			useCardState("123124")
		);

		await fetchCard("123");
		expect(fetchMock).toHaveBeenLastCalledWith("123");
		expect(card.value?.id).toBe("abc");
		expect(isLoading.value).toBe(false);
	});

	it("should log on error", async () => {
		const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
		const errorToThrow = new Error("something went wrong");

		fetchMock.mockRejectedValue(errorToThrow);
		mountComposable(() => useCardState("123124"));
		await nextTick();
		await nextTick(); // test mounts it twice

		expect(consoleErrorSpy).toHaveBeenCalledWith(errorToThrow);

		consoleErrorSpy.mockRestore();
	});
});
