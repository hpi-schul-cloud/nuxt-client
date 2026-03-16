import { ParentStatistic } from "@/types/file/File";
import { ParentStatisticResponse } from "@api-file-storage";
import { defineStore } from "pinia";

interface ParentStatisticsState {
	statisticsByParent: Map<string, ParentStatisticResponse>;
}

export const useParentStatisticsStore = defineStore("parentStatistics", {
	state: (): ParentStatisticsState => ({
		statisticsByParent: new Map(),
	}),

	actions: {
		getStatisticByParentId(parentId: string): ParentStatistic | undefined {
			return this.statisticsByParent.get(parentId);
		},
		setStatisticForParent(parentId: string, statistic: ParentStatistic): void {
			this.statisticsByParent.set(parentId, statistic);
		},
	},
});
