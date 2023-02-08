import { createPinia, setActivePinia } from "pinia";
import { useBoardStore } from "./board.store";

describe("board store", () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});

	it("gets the name", () => {
		const store = useBoardStore();
		expect(store.getName).toBe("Board #1");
	});

	it("updates the name", () => {
		const store = useBoardStore();
		store.updateBoardName();
		expect(store.getName).toBe("Board #2");
	});
});
