import { parentStatisticFactory } from "@@/tests/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { useParentStatisticsStore } from "./ParentStatistics.state";

describe("useParentStatisticsStore", () => {
	const setup = () => {
		setActivePinia(createPinia());

		const store = useParentStatisticsStore();

		return { store };
	};

	it("should set and get a statistic for a parent", () => {
		const { store } = setup();

		const stat = parentStatisticFactory.build();

		store.setStatisticForParent("parent1", stat);

		const result = store.getStatisticByParentId("parent1");

		expect(result).toEqual(stat);
	});

	it("should return undefined for unknown parentId", () => {
		const { store } = setup();

		const result = store.getStatisticByParentId("unknown");

		expect(result).toBeUndefined();
	});
});
