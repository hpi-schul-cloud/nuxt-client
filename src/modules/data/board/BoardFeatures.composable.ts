import { BoardFeature } from "@/serverApi/v3";
import { useBoardStore } from "./Board.store";

export const useBoardFeatures = () => {
	const { getFeatures } = useBoardStore();

	const features = getFeatures;

	const isFeatureEnabled = (feature: BoardFeature) => {
		return features.includes(feature);
	};

	return {
		isFeatureEnabled,
	};
};
