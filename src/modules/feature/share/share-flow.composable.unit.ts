import { useShareFlow } from "./share-flow.composable";
import { ShareOptions } from "./types";
import { expectNotification, mockApi, mockApiResponse, mountComposable } from "@@/tests/test-utils";
import { createTestingI18n } from "@@/tests/test-utils/setup";
import * as serverApi from "@api-server";
import { BoardExternalReferenceType, ShareTokenBodyParamsParentType, ShareTokenResponse } from "@api-server";
import * as featureDialog from "@feature-dialog";
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

vi.mock("@feature-dialog", () => ({ openDialog: vi.fn() }));

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

		vi.mocked(featureDialog.openDialog).mockResolvedValue({ completed: false, data: undefined });
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("executeShare", () => {
		describe("when called", () => {
			const setup = () => {
				vi.mocked(featureDialog.openDialog).mockReturnValue(new Promise(() => {}));
				const composable = mountShareFlowComposable();
				composable.executeShare({
					id: "item-id",
					type: ShareTokenBodyParamsParentType.COURSES,
				});
				return composable;
			};

			it("should call openDialog with the correct shareItemType", () => {
				setup();
				expect(featureDialog.openDialog).toHaveBeenCalledWith(
					"share",
					expect.objectContaining({ shareItemType: ShareTokenBodyParamsParentType.COURSES })
				);
			});
		});

		describe("when share is cancelled", () => {
			const setup = () => {
				vi.mocked(featureDialog.openDialog).mockResolvedValue({ completed: false, data: undefined });
				const composable = mountShareFlowComposable();
				const resultPromise = composable.executeShare({
					id: "item-id",
					type: ShareTokenBodyParamsParentType.COURSES,
				});
				return { ...composable, resultPromise };
			};

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
					vi.mocked(featureDialog.openDialog).mockImplementation(async (_type, props: any) => {
						await props.onConfirm(DEFAULT_SHARE_OPTIONS);
						return { completed: true, data: undefined };
					});
					const composable = mountShareFlowComposable();
					const resultPromise = composable.executeShare({
						id: "item-id",
						type: ShareTokenBodyParamsParentType.COURSES,
					});
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

				it("should return the result", async () => {
					const { resultPromise, response } = setup();
					const { result, success } = await resultPromise;
					expect(success).toBe(true);
					expect(result).toEqual(response.data);
				});
			});

			describe("when hasExpiryDate option is set", () => {
				const setup = () => {
					mockCreateShareTokenSuccess();
					vi.mocked(featureDialog.openDialog).mockImplementation(async (_type, props: any) => {
						await props.onConfirm({ isSchoolInternal: false, hasExpiryDate: true });
						return { completed: true, data: undefined };
					});
					const composable = mountShareFlowComposable();
					const resultPromise = composable.executeShare({
						id: "item-id",
						type: ShareTokenBodyParamsParentType.COURSES,
					});
					return { ...composable, resultPromise };
				};

				it("should pass expiresInDays as 21 to the api", async () => {
					setup();
					await flushPromises();
					expect(shareApi.shareTokenControllerCreateShareToken).toHaveBeenCalledWith(
						expect.objectContaining({ expiresInDays: 21 })
					);
				});
			});

			describe("when isSchoolInternal option is set", () => {
				const setup = () => {
					mockCreateShareTokenSuccess();
					vi.mocked(featureDialog.openDialog).mockImplementation(async (_type, props: any) => {
						await props.onConfirm({ isSchoolInternal: true, hasExpiryDate: false });
						return { completed: true, data: undefined };
					});
					const composable = mountShareFlowComposable();
					const resultPromise = composable.executeShare({
						id: "item-id",
						type: ShareTokenBodyParamsParentType.COURSES,
					});
					return { ...composable, resultPromise };
				};

				it("should pass schoolExclusive as true to the api", async () => {
					setup();
					await flushPromises();
					expect(shareApi.shareTokenControllerCreateShareToken).toHaveBeenCalledWith(
						expect.objectContaining({ schoolExclusive: true })
					);
				});
			});

			describe("and the api call fails", () => {
				beforeEach(() => {
					vi.spyOn(logger, "error").mockImplementation(vi.fn());
				});

				const setup = () => {
					shareApi.shareTokenControllerCreateShareToken.mockRejectedValue(new Error("API Error"));
					vi.mocked(featureDialog.openDialog).mockImplementation(async (_type, props: any) => {
						try {
							await props.onConfirm(DEFAULT_SHARE_OPTIONS);
						} catch {
							// dialog catches the error and cancels
						}
						return { completed: false, data: undefined };
					});
					const composable = mountShareFlowComposable();
					const resultPromise = composable.executeShare({
						id: "item-id",
						type: ShareTokenBodyParamsParentType.COURSES,
					});
					return { ...composable, resultPromise };
				};

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

	describe("buildSharePath (via onConfirm return value)", () => {
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
				let capturedUrl: string | undefined;
				vi.mocked(featureDialog.openDialog).mockImplementation(async (_type, props: any) => {
					capturedUrl = await props.onConfirm(DEFAULT_SHARE_OPTIONS);
					return { completed: true, data: undefined };
				});
				const composable = mountShareFlowComposable();
				await composable.executeShare({ id: "item-id", type, destinationType });
				expect(capturedUrl).toBe(`https://school.example.com/${expectedPath}?import=token-123`);
			}
		);
	});
});
