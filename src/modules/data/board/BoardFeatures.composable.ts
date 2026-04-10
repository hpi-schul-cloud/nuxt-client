import { useBoardStore } from "./Board.store";
import { BoardFeature } from "@api-server";

export const useBoardFeatures = () => {
	const { getFeatures } = useBoardStore();

	const features = getFeatures;

	const isFeatureEnabled = (feature: BoardFeature) => features.includes(feature);

	return {
		isFeatureEnabled,
	};
};
