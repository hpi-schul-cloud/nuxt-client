import { BoardFeature } from "@/serverApi/v3";
import { useBoardStore } from "@data-board";

export const useBoardFeatures = () => {
	const { getFeatures } = useBoardStore();

	const features: BoardFeature[] = getFeatures;

	const isFeatureEnabled = (feature: BoardFeature) => {
		return features.includes(feature);
	};

	return {
		isFeatureEnabled,
	};
};
