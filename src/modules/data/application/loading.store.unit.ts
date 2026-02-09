import { useLoadingStore } from "./loading.store";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";

describe("useLoadingStore", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
	});

	it("should have initial state", () => {
		const store = useLoadingStore();

		expect(store.isLoading).toBe(false);
		expect(store.loadingText).toBe("");
	});

	describe("setLoadingState", () => {
		it("should set loading state to true with text", () => {
			const store = useLoadingStore();
			const text = "Loading...";
			store.setLoadingState(true, text);

			expect(store.isLoading).toBe(true);
			expect(store.loadingText).toBe(text);
		});

		it("should set loading state to false", () => {
			const store = useLoadingStore();
			store.setLoadingState(true, "");
			store.setLoadingState(false);

			expect(store.isLoading).toBe(false);
		});
	});
});
