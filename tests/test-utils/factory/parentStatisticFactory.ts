import { ParentStatistic } from "@/types/file/File";
import { Factory } from "fishery";

export const parentStatisticFactory = Factory.define<ParentStatistic>(() => ({
	fileCount: 3,
	totalSizeInBytes: 3523452,
}));
