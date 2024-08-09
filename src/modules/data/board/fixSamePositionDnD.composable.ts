import { reactive } from "vue";

const renderKeyList = reactive<Record<string, number>>({});

const getMaxRenderKey = () => {
	return Object.values(renderKeyList).reduce((a, b) => Math.max(a, b), 0);
};

export const useForceRender = (id: string) => {
	const generateRenderKey = () => {
		renderKeyList[id] = getMaxRenderKey() + 1;
	};

	const getRenderKey = (): number => {
		renderKeyList[id] = renderKeyList[id] || getMaxRenderKey() + 1;
		return renderKeyList[id];
	};

	return {
		renderKeyList,
		generateRenderKey,
		getRenderKey,
	};
};
