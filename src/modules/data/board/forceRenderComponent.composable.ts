import { ref } from "vue";
import { MoveCardSuccessPayload } from "./boardActions/boardActionPayload";

const renderKeyList = ref<Array<{ id: string; renderKey: number }>>([]);

export const useForceRender = () => {
	const getMaxRenderKey = () => {
		return renderKeyList.value.reduce(
			(prev, current) => (prev.renderKey > current.renderKey ? prev : current),
			{ renderKey: 0 }
		).renderKey;
	};

	const getRenderKey = (id: string) => {
		const element = renderKeyList.value.find((item) => item.id === id);
		if (!element) {
			renderKeyList.value.push({
				id,
				renderKey: getMaxRenderKey() + 1,
			});
		}
		return renderKeyList.value.find((item) => item.id === id)?.renderKey ?? 0;
	};

	const setRenderKeyAfterMoveCard = (action: MoveCardSuccessPayload) => {
		const element = renderKeyList.value.find(
			(element) => element.id === action.fromColumnId
		);
		if (element) {
			element.renderKey = getMaxRenderKey() + 1;
		}
	};

	return {
		getRenderKey,
		setRenderKeyAfterMoveCard,
	};
};
