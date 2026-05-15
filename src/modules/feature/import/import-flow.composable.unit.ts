import { useImportFlow } from "./import-flow.composable";
import {
	expectNotification,
	mockApi,
	mockApiResponse,
	mockedPiniaStoreTyping,
	mountComposable,
} from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup/createTestingI18n";
import * as serverApi from "@api-server";
import { useLoadingStore, useNotificationStore } from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";

let shareApi: Mocked<serverApi.ShareTokenApiInterface>;

let mockWithLoadingState: ReturnType<typeof vi.fn>;

const mountImportFlowComposable = () =>
	mountComposable(() => useImportFlow(), {
		global: {
			plugins: [createTestingI18n()],
		},
	});

const mockValidationResponse = (overrides: Partial<serverApi.ShareTokenInfoResponse> = {}) => {
	const validationResponse = mockApiResponse<serverApi.ShareTokenInfoResponse>({
		data: {
			token: "valid-token",
			parentType: serverApi.ShareTokenInfoResponseParentType.COURSES,
			parentName: "Item Name",
			...overrides,
		},
	});
	shareApi.shareTokenControllerLookupShareToken.mockResolvedValue(validationResponse);

	return validationResponse;
};

const mockImportResponse = (overrides: Partial<serverApi.CopyApiResponse> = {}) => {
	const importResponse = mockApiResponse<serverApi.CopyApiResponse>({
		data: {
			id: "new-item-id",
			title: "Imported Item",
			type: serverApi.CopyElementType.COURSE,
			status: serverApi.CopyStatusEnum.SUCCESS,
			...overrides,
		},
	});
	shareApi.shareTokenControllerImportShareToken.mockResolvedValue(importResponse);

	return importResponse;
};

describe("useImportflow", () => {
	beforeEach(async () => {
		setActivePinia(createTestingPinia({ stubActions: false }));

		shareApi = mockApi<serverApi.ShareTokenApiInterface>();
		vi.spyOn(serverApi, "ShareTokenApiFactory").mockReturnValue(shareApi);

		const loadingStore = mockedPiniaStoreTyping(useLoadingStore);
		mockWithLoadingState = vi.fn().mockImplementation(async (fn) => fn());
		vi.spyOn(loadingStore, "withLoadingState").mockImplementation(mockWithLoadingState);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("initial state", () => {
		const setup = () => mountImportFlowComposable();

		it("should have the dialog closed", () => {
			const { isCardImportDialogOpen, isGenericImportDialogOpen } = setup();
			expect(isCardImportDialogOpen.value).toBe(false);
			expect(isGenericImportDialogOpen.value).toBe(false);
		});

		it("should have no share token info", () => {
			const { shareTokenInfo } = setup();
			expect(shareTokenInfo.value).toBeUndefined();
		});
	});

	describe("executeImport", () => {
		describe("when called with a valid token", () => {
			const setup = () => {
				const composable = mountImportFlowComposable();
				const validationResponse = mockValidationResponse();
				return { ...composable, validationResponse };
			};

			it("should set the shareTokenInfo", async () => {
				const { shareTokenInfo, validationResponse, executeImport } = setup();
				executeImport("valid-token");
				await flushPromises();
				expect(shareTokenInfo.value).toEqual(validationResponse.data);
			});

			it("should open the generic import dialog for non-card items", async () => {
				const { isGenericImportDialogOpen, isCardImportDialogOpen, executeImport } = setup();
				executeImport("valid-token");
				await flushPromises();
				expect(isGenericImportDialogOpen.value).toBe(true);
				expect(isCardImportDialogOpen.value).toBe(false);
			});

			it("should open the card import dialog for card items", async () => {
				const { isGenericImportDialogOpen, isCardImportDialogOpen, executeImport, shareTokenInfo } = setup();
				executeImport("valid-token");
				await flushPromises();
				shareTokenInfo.value = {
					...shareTokenInfo.value!,
					parentType: serverApi.ShareTokenInfoResponseParentType.CARD,
				}; // Simulate card type
				expect(isGenericImportDialogOpen.value).toBe(false);
				expect(isCardImportDialogOpen.value).toBe(true);
			});
		});

		describe("when token validation fails", () => {
			const setup = () => {
				const composable = mountImportFlowComposable();
				const validationError = new Error("Validation failed");
				shareApi.shareTokenControllerLookupShareToken.mockRejectedValue(validationError);

				return { ...composable, validationError };
			};

			it("should return an error", async () => {
				const { executeImport, validationError } = setup();
				const { result, success, error } = await executeImport("invalid-token");
				expect(result).toBeUndefined();
				expect(success).toBe(false);
				expect(error).toEqual(validationError);
			});
		});

		describe("when import is cancelled", () => {
			const setup = async () => {
				const composable = mountImportFlowComposable();
				mockValidationResponse();
				const resultPromise = composable.executeImport("valid-token");
				await flushPromises();
				composable.onCancelImport();
				return { ...composable, resultPromise };
			};

			it("should set the dialog to closed", async () => {
				const { isGenericImportDialogOpen, isCardImportDialogOpen, resultPromise } = await setup();
				await resultPromise;
				expect(isGenericImportDialogOpen.value).toBe(false);
				expect(isCardImportDialogOpen.value).toBe(false);
			});

			it("should return error", async () => {
				const { resultPromise } = await setup();
				const { success, error } = await resultPromise;
				expect(success).toBe(false);
				expect(error).toBeInstanceOf(Error);
				expect(error?.message).toBe("Import cancelled");
			});
		});

		describe("when import dialog is completed", () => {
			describe("and the api call is successful", () => {
				const setup = async () => {
					const composable = mountImportFlowComposable();
					mockValidationResponse();
					const importResponse = mockImportResponse();
					const resultPromise = composable.executeImport("valid-token");
					await flushPromises();
					composable.onConfirmImport({ newName: "New Item Name" });
					return { ...composable, resultPromise, importResponse };
				};

				it("should set the dialog to closed", async () => {
					const { isGenericImportDialogOpen, isCardImportDialogOpen, resultPromise } = await setup();
					await resultPromise;
					expect(isGenericImportDialogOpen.value).toBe(false);
					expect(isCardImportDialogOpen.value).toBe(false);
				});

				it("should activate loading state during execution", async () => {
					const { resultPromise } = await setup();
					await resultPromise;
					expect(mockWithLoadingState).toHaveBeenCalledOnce();
				});

				it("should return the result", async () => {
					const { resultPromise, importResponse } = await setup();
					const { result, success } = await resultPromise;
					expect(success).toBe(true);
					expect(result).toEqual(importResponse.data);
				});

				it("should show a success notification", async () => {
					const { resultPromise } = await setup();
					await resultPromise;
					expectNotification("success");
				});
			});

			describe("and the api call fails", () => {
				const setup = async () => {
					const composable = mountImportFlowComposable();
					mockValidationResponse();
					const importError = new Error("Import failed");
					shareApi.shareTokenControllerImportShareToken.mockRejectedValue(importError);
					const resultPromise = composable.executeImport("valid-token");
					await flushPromises();
					composable.onConfirmImport({ newName: "New Item Name" });
					return { ...composable, resultPromise, importError };
				};

				it("should set the dialog to closed", async () => {
					const { isGenericImportDialogOpen, isCardImportDialogOpen, resultPromise } = await setup();
					await resultPromise;
					expect(isGenericImportDialogOpen.value).toBe(false);
					expect(isCardImportDialogOpen.value).toBe(false);
				});

				it("should activate loading state during execution", async () => {
					const { resultPromise } = await setup();
					await resultPromise;
					expect(mockWithLoadingState).toHaveBeenCalledOnce();
				});

				it("should return the error", async () => {
					const { resultPromise, importError } = await setup();
					const { success, error: returnedError } = await resultPromise;
					expect(success).toBe(false);
					expect(returnedError?.message).toBe(importError.message);
				});

				it("should show an error notification", async () => {
					const { resultPromise } = await setup();
					await resultPromise;
					expectNotification("error");
					expect(useNotificationStore().notify).not.toHaveBeenCalledWith(
						expect.objectContaining({ status: "success" })
					);
				});
			});
		});
	});
});
