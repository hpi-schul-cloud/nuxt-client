import { ElementWithParentHierarchyResponse } from "@/serverApi/v3";
import ApplicationErrorModule from "@/store/application-error";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { APPLICATION_ERROR_KEY } from "@/utils/inject";
import {
	externalToolElementResponseFactory,
	h5pElementResponseFactory,
	mockApiResponse,
	mountComposable,
} from "@@/tests/test-utils";
import { createModuleMocks } from "@@/tests/test-utils/mock-store-module";
import {
	UpdateElementRequestPayload,
	useBoardApi,
	useCardStore,
} from "@data-board";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { useH5pEditorBoardHooks } from "./h5pEditorBoardHooks.composable";

jest.mock("@data-board");

describe("useH5pEditorBoardHooks", () => {
	let useBoardApiMock: DeepMocked<ReturnType<typeof useBoardApi>>;
	let useCardStoreMock: DeepMocked<ReturnType<typeof useCardStore>>;

	beforeAll(() => {
		setActivePinia(createTestingPinia());
	});

	beforeEach(() => {
		useBoardApiMock = createMock<ReturnType<typeof useBoardApi>>();
		useCardStoreMock = createMock<ReturnType<typeof useCardStore>>();

		jest.mocked(useBoardApi).mockReturnValue(useBoardApiMock);
		jest.mocked(useCardStore).mockReturnValue(useCardStoreMock);
	});

	const getComposable = () => {
		const elementId = "element-id";

		const applicationErrorModule = createModuleMocks(ApplicationErrorModule);

		const composable = mountComposable(
			() => useH5pEditorBoardHooks(elementId),
			{
				global: {
					provide: {
						[APPLICATION_ERROR_KEY.valueOf()]: applicationErrorModule,
					},
				},
			}
		);

		return {
			composable,
			elementId,
			applicationErrorModule,
		};
	};

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("onCreate", () => {
		describe("when a h5p element is loaded", () => {
			const setup = () => {
				const { composable, elementId } = getComposable();

				const element = h5pElementResponseFactory.build({ id: elementId });

				useBoardApiMock.getElementWithParentHierarchyCall.mockResolvedValueOnce(
					mockApiResponse<ElementWithParentHierarchyResponse>({
						data: { element, parentHierarchy: [] },
					})
				);

				return {
					composable,
					elementId,
					element,
				};
			};

			it("should should fetch the element", async () => {
				const { composable, elementId } = setup();

				await composable.onCreate();

				expect(
					useBoardApiMock.getElementWithParentHierarchyCall
				).toHaveBeenCalledWith(elementId);
			});

			it("should set the element state", async () => {
				const { composable, element } = setup();

				await composable.onCreate();

				expect(composable.element.value).toEqual(element);
			});
		});

		describe("when a non h5p element is loaded", () => {
			const setup = () => {
				const { composable, elementId, applicationErrorModule } =
					getComposable();

				const element = externalToolElementResponseFactory.build({
					id: elementId,
				});

				useBoardApiMock.getElementWithParentHierarchyCall.mockResolvedValueOnce(
					mockApiResponse<ElementWithParentHierarchyResponse>({
						data: { element, parentHierarchy: [] },
					})
				);

				return {
					composable,
					elementId,
					element,
					applicationErrorModule,
				};
			};

			it("should set an error", async () => {
				const { composable, elementId, applicationErrorModule } = setup();

				await composable.onCreate();

				expect(applicationErrorModule.setError).toHaveBeenCalledWith(
					createApplicationError(HttpStatusCode.NotFound)
				);
			});

			it("should set the element state", async () => {
				const { composable } = setup();

				await composable.onCreate();

				expect(composable.element.value).toEqual(undefined);
			});
		});
	});

	describe("afterSave", () => {
		describe("when an element exists", () => {
			const setup = () => {
				const { composable, elementId } = getComposable();

				const element = h5pElementResponseFactory.build({
					id: elementId,
					content: { contentId: null },
				});
				const contentId = "contentId";

				composable.element.value = element;

				return {
					composable,
					elementId,
					element,
					contentId,
				};
			};

			it("should save the content id to the element", async () => {
				const { composable, contentId, element } = setup();

				await composable.afterSave(contentId);

				expect(useCardStoreMock.updateElementRequest).toHaveBeenCalledWith<
					[UpdateElementRequestPayload]
				>({
					element: {
						...element,
						content: {
							contentId,
						},
					},
				});
			});
		});

		describe("when no element is defined", () => {
			const setup = () => {
				const { composable } = getComposable();

				composable.element.value = undefined;

				return {
					composable,
				};
			};

			it("should throw an error", async () => {
				const { composable } = setup();

				await expect(composable.afterSave("contentId")).rejects.toThrow();
			});
		});
	});

	describe("onUnmounted", () => {
		it("should disconnect the socket", () => {
			const { composable } = getComposable();

			composable.wrapper.unmount();

			expect(useCardStoreMock.disconnectSocketRequest).toHaveBeenCalled();
		});
	});
});
