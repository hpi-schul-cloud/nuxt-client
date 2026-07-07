import { useImportFlow } from "./import-flow.composable";
import { expectNotification, mockApi, mockApiResponse, mountComposable } from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup/createTestingI18n";
import * as serverApi from "@api-server";
import { useNotificationStore } from "@data-app";
import * as featureDialog from "@feature-dialog";
import { createTestingPinia } from "@pinia/testing";
import { logger } from "@util-logger";
import { flushPromises } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";

vi.mock("@feature-dialog", () => ({ openDialog: vi.fn(), withGlobalLoadingState: vi.fn() }));

let shareApi: Mocked<serverApi.ShareTokenApiInterface>;

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

		vi.mocked(featureDialog.openDialog).mockResolvedValue({ completed: false, data: undefined });
		vi.mocked(featureDialog.withGlobalLoadingState).mockImplementation(async (fn: () => Promise<unknown>) => fn());
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("executeImport", () => {
		describe("when called with a valid token", () => {
			it("should call openDialog('import') for non-card items", async () => {
				mockValidationResponse();
				vi.mocked(featureDialog.openDialog).mockReturnValue(new Promise(() => undefined));
				const composable = mountImportFlowComposable();
				composable.executeImport("valid-token", []);
				await flushPromises();
				expect(featureDialog.openDialog).toHaveBeenCalledWith("import", expect.anything());
			});

			it("should call openDialog('importCard') for card items", async () => {
				mockValidationResponse({ parentType: serverApi.ShareTokenInfoResponseParentType.CARD });
				vi.mocked(featureDialog.openDialog).mockReturnValue(new Promise(() => undefined));
				const composable = mountImportFlowComposable();
				composable.executeImport("valid-token", []);
				await flushPromises();
				expect(featureDialog.openDialog).toHaveBeenCalledWith("importCard", expect.anything());
			});

			it("should call openDialog('importColumn') for column items", async () => {
				mockValidationResponse({ parentType: serverApi.ShareTokenInfoResponseParentType.COLUMN });
				vi.mocked(featureDialog.openDialog).mockReturnValue(new Promise(() => undefined));
				const composable = mountImportFlowComposable();
				composable.executeImport("valid-token", []);
				await flushPromises();
				expect(featureDialog.openDialog).toHaveBeenCalledWith("importColumn", expect.anything());
			});
		});

		describe("when token validation fails", () => {
			beforeEach(() => {
				vi.spyOn(logger, "error").mockImplementation(vi.fn());
			});

			const setup = () => {
				const composable = mountImportFlowComposable();
				shareApi.shareTokenControllerLookupShareToken.mockRejectedValue(new Error("Validation failed"));
				return { ...composable };
			};

			it("should return an error", async () => {
				const { executeImport } = setup();
				const { result, success, error } = await executeImport("invalid-token", []);
				expect(result).toBeUndefined();
				expect(success).toBe(false);
				expect(error?.message).toBe("Validation failed");
			});
		});

		describe("when import is cancelled", () => {
			const setup = async () => {
				mockValidationResponse();
				vi.mocked(featureDialog.openDialog).mockResolvedValue({ completed: false, data: undefined });
				const composable = mountImportFlowComposable();
				const resultPromise = composable.executeImport("valid-token", []);
				return { ...composable, resultPromise };
			};

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
					mockValidationResponse();
					const importResponse = mockImportResponse();
					vi.mocked(featureDialog.openDialog).mockResolvedValue({
						completed: true,
						data: { newName: "New Item Name", destinations: [] },
					});
					const composable = mountImportFlowComposable();
					const resultPromise = composable.executeImport("valid-token", []);
					return { ...composable, resultPromise, importResponse };
				};

				it("should activate loading state during execution", async () => {
					const { resultPromise } = await setup();
					await resultPromise;
					expect(featureDialog.withGlobalLoadingState).toHaveBeenCalledOnce();
				});

				it("should return the result", async () => {
					const { resultPromise, importResponse } = await setup();
					const { result, success, destinations } = await resultPromise;
					expect(success).toBe(true);
					expect(result).toEqual([importResponse.data]);
					expect(destinations).toEqual([]);
				});

				it("should show a success notification", async () => {
					const { resultPromise } = await setup();
					await resultPromise;
					expectNotification("success");
				});
			});

			describe("and the api call fails", () => {
				beforeEach(() => {
					vi.spyOn(logger, "error").mockImplementation(vi.fn());
				});

				const setup = async () => {
					mockValidationResponse();
					const importError = new Error("Import failed");
					shareApi.shareTokenControllerImportShareToken.mockRejectedValue(importError);
					vi.mocked(featureDialog.openDialog).mockResolvedValue({
						completed: true,
						data: { newName: "New Item Name", destinations: [] },
					});
					const composable = mountImportFlowComposable();
					const resultPromise = composable.executeImport("valid-token", []);
					return { ...composable, resultPromise, importError };
				};

				it("should activate loading state during execution", async () => {
					const { resultPromise } = await setup();
					await resultPromise;
					expect(featureDialog.withGlobalLoadingState).toHaveBeenCalledOnce();
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

			describe("with destinations selected and all succeed", () => {
				const setup = async () => {
					mockValidationResponse();
					const availableItems = [
						{ id: "dest-1", name: "Room A" },
						{ id: "dest-2", name: "Room B" },
					];
					const destinations = [
						{ id: "dest-1", type: "room" as const },
						{ id: "dest-2", type: "room" as const },
					];

					shareApi.shareTokenControllerImportShareToken
						.mockResolvedValueOnce(
							mockApiResponse({
								data: {
									id: "new-1",
									title: "X",
									type: serverApi.CopyElementType.COURSE,
									status: serverApi.CopyStatusEnum.SUCCESS,
									destinationId: "dest-1",
								},
							})
						)
						.mockResolvedValueOnce(
							mockApiResponse({
								data: {
									id: "new-2",
									title: "X",
									type: serverApi.CopyElementType.COURSE,
									status: serverApi.CopyStatusEnum.SUCCESS,
									destinationId: "dest-2",
								},
							})
						);

					vi.mocked(featureDialog.openDialog).mockResolvedValue({
						completed: true,
						data: { newName: "Item", destinations },
					});
					const composable = mountImportFlowComposable();
					return { resultPromise: composable.executeImport("valid-token", availableItems), destinations };
				};

				it("should import to each destination and return success", async () => {
					const { resultPromise, destinations } = await setup();
					const { success, destinations: returned } = await resultPromise;
					expect(shareApi.shareTokenControllerImportShareToken).toHaveBeenCalledTimes(2);
					expect(success).toBe(true);
					expect(returned).toEqual(destinations);
				});

				it("should show a success notification per destination", async () => {
					const { resultPromise } = await setup();
					await resultPromise;
					expect(useNotificationStore().notify).toHaveBeenCalledTimes(2);
				});
			});

			describe("with destinations selected and some fail", () => {
				beforeEach(() => {
					vi.spyOn(logger, "error").mockImplementation(vi.fn());
				});

				it("should return failure and undefined destinations", async () => {
					mockValidationResponse();
					const destinations = [
						{ id: "d1", type: "room" as const },
						{ id: "d2", type: "room" as const },
					];
					shareApi.shareTokenControllerImportShareToken
						.mockResolvedValueOnce(
							mockApiResponse({
								data: {
									id: "1",
									title: "X",
									type: serverApi.CopyElementType.COURSE,
									status: serverApi.CopyStatusEnum.SUCCESS,
									destinationId: "d1",
								},
							})
						)
						.mockRejectedValueOnce(new Error("fail"));
					vi.mocked(featureDialog.openDialog).mockResolvedValue({
						completed: true,
						data: { newName: "Item", destinations },
					});

					const composable = mountImportFlowComposable();
					const { success, destinations: returned } = await composable.executeImport("valid-token", [
						{ id: "d1", name: "A" },
						{ id: "d2", name: "B" },
					]);
					expect(success).toBe(false);
					expect(returned).toBeUndefined();
				});
			});
		});

		it("should pass destinationType to openDialog", async () => {
			mockValidationResponse();
			vi.mocked(featureDialog.openDialog).mockReturnValue(new Promise(() => undefined));
			const composable = mountImportFlowComposable();
			composable.executeImport("valid-token", [], "course");
			await flushPromises();
			expect(featureDialog.openDialog).toHaveBeenCalledWith(
				"import",
				expect.objectContaining({ destinationType: "course" })
			);
		});

		it("should pass availableDestinations to openDialog", async () => {
			mockValidationResponse();
			const items = [{ id: "x", name: "X" }];
			vi.mocked(featureDialog.openDialog).mockReturnValue(new Promise(() => undefined));
			const composable = mountImportFlowComposable();
			composable.executeImport("valid-token", items);
			await flushPromises();
			expect(featureDialog.openDialog).toHaveBeenCalledWith(
				"import",
				expect.objectContaining({ availableDestinations: items })
			);
		});
	});
});
