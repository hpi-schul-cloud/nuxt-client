import { useBoardApi } from "../BoardApi.composable";
import { useCardRestApi } from "./cardRestApi.composable";
import { mockApiResponse, mockComposable, mockedPiniaStoreTyping, mountComposable } from "@@/tests/test-utils";
import { cardResponseFactory } from "@@/tests/test-utils/factory/cardResponseFactory";
import { ContentElementType, PreferredToolResponse, ToolContextType } from "@api-server";
import { useCardStore } from "@data-board";
import { useContextExternalToolApi } from "@data-external-tool";
import { createTestingPinia } from "@pinia/testing";
import { useErrorHandler } from "@util-error-handling";
import { setActivePinia } from "pinia";
import type { Mocked } from "vitest";
import { createRouterMock, injectRouterMock } from "vue-router-mock";

vi.mock("@util-error-handling/ErrorHandler.composable");
vi.mock("../BoardApi.composable");
vi.mock("@data-external-tool/contextExternalToolApi.composable");
vi.mock("vue-i18n", () => ({
	useI18n: () => ({ t: (key: string) => key }),
}));

describe("useCardRestApi", () => {
	let boardApi: Mocked<ReturnType<typeof useBoardApi>>;
	let contextExternalToolApi: Mocked<ReturnType<typeof useContextExternalToolApi>>;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		vi.mocked(useErrorHandler).mockReturnValue(mockComposable(useErrorHandler));
		boardApi = mockComposable(useBoardApi);
		vi.mocked(useBoardApi).mockReturnValue(boardApi);
		contextExternalToolApi = mockComposable(useContextExternalToolApi);
		vi.mocked(useContextExternalToolApi).mockReturnValue(contextExternalToolApi);
		injectRouterMock(createRouterMock());
		mountComposable(useCardRestApi);
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	it("creates a preferred element and adds it to the card store", async () => {
		const cardStore = mockedPiniaStoreTyping(useCardStore);
		const card = cardResponseFactory.build();
		const newElement = cardResponseFactory.build().elements[0];
		const preferredTool: PreferredToolResponse = {
			schoolExternalToolId: undefined,
			iconName: "mockIconName",
			name: "Tool Name",
		};
		cardStore.getCard.mockReturnValue(card);
		boardApi.createElementCall.mockResolvedValue(mockApiResponse({ data: newElement }));

		await useCardRestApi().createPreferredElement(
			{ cardId: card.id, type: ContentElementType.RICH_TEXT, toPosition: 0 },
			preferredTool
		);

		expect(cardStore.createElementSuccess).toHaveBeenCalledWith({
			cardId: card.id,
			type: ContentElementType.RICH_TEXT,
			toPosition: 0,
			newElement,
			isOwnAction: true,
		});
	});

	it("loads preferred tools", async () => {
		const preferredTools: PreferredToolResponse[] = [];
		contextExternalToolApi.fetchPreferredTools.mockResolvedValue(mockApiResponse({ data: { data: preferredTools } }));

		const result = await useCardRestApi().getPreferredTools(ToolContextType.BOARD_ELEMENT);

		expect(result).toEqual(preferredTools);
	});
});
