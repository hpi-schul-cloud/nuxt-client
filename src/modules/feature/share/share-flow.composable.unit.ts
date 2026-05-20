import { useShareFlow } from "./share-flow.composable";
import { ShareOptions } from "./types";
import { expectNotification, mockApi, mockApiResponse, mountComposable } from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import * as serverApi from "@api-server";
import { BoardExternalReferenceType, ShareTokenBodyParamsParentType, ShareTokenResponse } from "@api-server";
import { createTestingPinia } from "@pinia/testing";
import { logger } from "@util-logger";
import { flushPromises } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { Mocked } from "vitest";

let shareApi: Mocked<serverApi.ShareTokenApiInterface>;

const DEFAULT_SHARE_OPTIONS: ShareOptions = {
	isSchoolInternal: false,
	hasExpiryDate: false,
};

const mountShareFlowComposable = () =>
	mountComposable(() => useShareFlow(), {
		global: {
			plugins: [createTestingI18n()],
		},
	});

const mockCreateShareTokenSuccess = (token = "share-token") => {
	const response = mockApiResponse<ShareTokenResponse>({
		data: {
			token,
			payload: {
				parentType: serverApi.ShareTokenPayloadResponseParentType.COURSES,
				parentId: "item-id",
			},
		},
	});
	shareApi.shareTokenControllerCreateShareToken.mockResolvedValue(response);
	return response;
};

describe("useShareFlow", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));

		shareApi = mockApi<serverApi.ShareTokenApiInterface>();
		vi.spyOn(serverApi, "ShareTokenApiFactory").mockReturnValue(shareApi);

		Object.defineProperty(globalThis, "location", {
			value: { origin: "https://school.example.com" },
			writable: true,
			configurable: true,
		});
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("initial state", () => {
		const setup = () => mountShareFlowComposable();

		it("should have the dialog closed", () => {
			const { isShareDialogOpen: isDialogOpen } = setup();
			expect(isDialogOpen.value).toBe(false);
		});

		it("should have no shareItemType", () => {
			const { shareItemType } = setup();
			expect(shareItemType.value).toBeUndefined();
		});

		it("should have no shareUrl", () => {
			const { shareUrl } = setup();
			expect(shareUrl.value).toBeUndefined();
		});
	});

	describe("executeShare", () => {
		describe("when called", () => {
			const setup = () => {
				const composable = mountShareFlowComposable();
				composable.executeShare({
					id: "item-id",
					type: ShareTokenBodyParamsParentType.COURSES,
				});
				return composable;
			};

			it("should open the dialog", () => {
				const { isShareDialogOpen: isDialogOpen } = setup();
				expect(isDialogOpen.value).toBe(true);
			});

			it("should set the shareItemType", () => {
				const { shareItemType } = setup();
				expect(shareItemType.value).toBe(ShareTokenBodyParamsParentType.COURSES);
			});
		});

		describe("when share is cancelled", () => {
			const setup = () => {
				const composable = mountShareFlowComposable();
				const resultPromise = composable.executeShare({
					id: "item-id",
					type: ShareTokenBodyParamsParentType.COURSES,
				});
				composable.onCancel();
				return { ...composable, resultPromise };
			};

			it("should close the dialog", async () => {
				const { isShareDialogOpen: isDialogOpen, resultPromise } = setup();
				await resultPromise;
				expect(isDialogOpen.value).toBe(false);
			});

			it("should clear the shareItemType", async () => {
				const { shareItemType, resultPromise } = setup();
				await resultPromise;
				expect(shareItemType.value).toBeUndefined();
			});

			it("should return failure with cancel message", async () => {
				const { resultPromise } = setup();
				const outcome = await resultPromise;
				expect(outcome).toEqual({
					success: false,
					error: new Error("Share cancelled"),
				});
			});
		});

		describe("when share is confirmed", () => {
			describe("and the api call is successful", () => {
				const setup = () => {
					const response = mockCreateShareTokenSuccess("abc123");
					const composable = mountShareFlowComposable();
					const resultPromise = composable.executeShare({
						id: "item-id",
						type: ShareTokenBodyParamsParentType.COURSES,
					});
					composable.onConfirm(DEFAULT_SHARE_OPTIONS);
					return { ...composable, resultPromise, response };
				};

				it("should call the share api with the correct params", async () => {
					setup();
					await flushPromises();
					expect(shareApi.shareTokenControllerCreateShareToken).toHaveBeenCalledWith({
						parentId: "item-id",
						parentType: ShareTokenBodyParamsParentType.COURSES,
						expiresInDays: null,
						schoolExclusive: false,
					});
				});

				it("should set the shareUrl", async () => {
					const { shareUrl, onDone, resultPromise } = setup();
					await flushPromises();
					expect(shareUrl.value).toBe("https://school.example.com/rooms/courses-overview?import=abc123");
					onDone();
					await resultPromise;
				});

				it("should keep the dialog open until onDone is called", async () => {
					const { isShareDialogOpen: isDialogOpen, onDone, resultPromise } = setup();
					await flushPromises();
					expect(isDialogOpen.value).toBe(true);
					onDone();
					await resultPromise;
					expect(isDialogOpen.value).toBe(false);
				});

				it("should return the result", async () => {
					const { resultPromise, onDone, response } = setup();
					await flushPromises();
					onDone();
					const { result, success } = await resultPromise;
					expect(success).toBe(true);
					expect(result).toEqual(response.data);
				});
			});

			describe("when hasExpiryDate option is set", () => {
				const setup = () => {
					mockCreateShareTokenSuccess();
					const composable = mountShareFlowComposable();
					const resultPromise = composable.executeShare({
						id: "item-id",
						type: ShareTokenBodyParamsParentType.COURSES,
					});
					composable.onConfirm({ isSchoolInternal: false, hasExpiryDate: true });
					return { ...composable, resultPromise };
				};

				it("should pass expiresInDays as 21 to the api", async () => {
					const { onDone, resultPromise } = setup();
					await flushPromises();
					expect(shareApi.shareTokenControllerCreateShareToken).toHaveBeenCalledWith(
						expect.objectContaining({ expiresInDays: 21 })
					);
					onDone();
					await resultPromise;
				});
			});

			describe("when isSchoolInternal option is set", () => {
				const setup = () => {
					mockCreateShareTokenSuccess();
					const composable = mountShareFlowComposable();
					const resultPromise = composable.executeShare({
						id: "item-id",
						type: ShareTokenBodyParamsParentType.COURSES,
					});
					composable.onConfirm({ isSchoolInternal: true, hasExpiryDate: false });
					return { ...composable, resultPromise };
				};

				it("should pass schoolExclusive as true to the api", async () => {
					const { onDone, resultPromise } = setup();
					await flushPromises();
					expect(shareApi.shareTokenControllerCreateShareToken).toHaveBeenCalledWith(
						expect.objectContaining({ schoolExclusive: true })
					);
					onDone();
					await resultPromise;
				});
			});

			describe("and the api call fails", () => {
				beforeEach(() => {
					vi.spyOn(logger, "error").mockImplementation(vi.fn());
				});

				const setup = () => {
					shareApi.shareTokenControllerCreateShareToken.mockRejectedValue(new Error("API Error"));
					const composable = mountShareFlowComposable();
					const resultPromise = composable.executeShare({
						id: "item-id",
						type: ShareTokenBodyParamsParentType.COURSES,
					});
					composable.onConfirm(DEFAULT_SHARE_OPTIONS);
					return { ...composable, resultPromise };
				};

				it("should close the dialog", async () => {
					const { isShareDialogOpen: isDialogOpen, resultPromise } = setup();
					await resultPromise;
					expect(isDialogOpen.value).toBe(false);
				});

				it("should return failure with error message", async () => {
					const { resultPromise } = setup();
					const { success, error } = await resultPromise;
					expect(success).toBe(false);
					expect(error?.message).toBe("Share failed");
				});

				it("should show an error notification", async () => {
					const { resultPromise } = setup();
					await resultPromise;
					expectNotification("error");
				});
			});
		});
	});

	describe("buildSharePath (via shareUrl)", () => {
		it.for([
			{
				type: ShareTokenBodyParamsParentType.COLUMN_BOARD,
				destinationType: undefined,
				expectedPath: "rooms/courses-overview",
			},
			{
				type: ShareTokenBodyParamsParentType.COLUMN_BOARD,
				destinationType: BoardExternalReferenceType.ROOM,
				expectedPath: "rooms",
			},
			{
				type: ShareTokenBodyParamsParentType.CARD,
				destinationType: undefined,
				expectedPath: "rooms/courses-overview",
			},
			{
				type: ShareTokenBodyParamsParentType.CARD,
				destinationType: BoardExternalReferenceType.ROOM,
				expectedPath: "rooms",
			},
			{
				type: ShareTokenBodyParamsParentType.ROOM,
				destinationType: undefined,
				expectedPath: "rooms",
			},
			{
				type: ShareTokenBodyParamsParentType.COURSES,
				destinationType: undefined,
				expectedPath: "rooms/courses-overview",
			},
		])(
			"should use path '$expectedPath' for type $type and destinationType $destinationType",
			async ({ type, destinationType, expectedPath }) => {
				mockCreateShareTokenSuccess("token-123");
				const composable = mountShareFlowComposable();
				const resultPromise = composable.executeShare({ id: "item-id", type, destinationType });
				composable.onConfirm(DEFAULT_SHARE_OPTIONS);
				await flushPromises();
				expect(composable.shareUrl.value).toBe(`https://school.example.com/${expectedPath}?import=token-123`);
				composable.onDone();
				await resultPromise;
			}
		);
	});
});
