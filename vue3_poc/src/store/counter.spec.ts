// counterStore.spec.ts
import { setActivePinia, createPinia } from "pinia";
import { useCounterStore } from "./counter";

describe("Counter Store", () => {
	beforeEach(() => {
		// creates a fresh pinia and make it active so it's automatically picked
		// up by any useStore() call without having to pass it to it:
		// `useStore(pinia)`
		setActivePinia(createPinia());
	});

	it("increments", () => {
		const store = useCounterStore();
		expect(store.counter).toBe(0);
		store.increment();
		expect(store.counter).toBe(1);
		expect(store.getCounter).toBe(1);
	});
});
