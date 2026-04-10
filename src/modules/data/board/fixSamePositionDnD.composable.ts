import { reactive } from "vue";

const renderKeyList = reactive<Record<string, number>>({});

const getMaxRenderKey = () => Object.values(renderKeyList).reduce((a, b) => Math.max(a, b), 0);

/*
 * This artificial generating renderKey forces a component to re-render by changing the element key.
 * It is used to fix issue described on https://ticketsystem.dbildungscloud.de/browse/BC-7806
 *
 * This solution is based on the article on https://michaelnthiessen.com/force-re-render/
 */
export const useForceRender = (id: string) => {
	const generateRenderKey = () => {
		renderKeyList[id] = getMaxRenderKey() + 1;
	};

	const getRenderKey = (): number => {
		if (!renderKeyList[id]) generateRenderKey();
		return renderKeyList[id];
	};

	return {
		generateRenderKey,
		getRenderKey,
	};
};
