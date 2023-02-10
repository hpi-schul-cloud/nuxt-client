import { SharePayload } from "./share-course";
import ShareTaskModule from "./share-task";
import * as serverApi from "../serverApi/v3/api";
import { ShareTokenApiInterface } from "../serverApi/v3/api";
import setupStores from "@@/tests/test-utils/setupStores";
import RoomModule from "@/store/room";

const id = "sampleTaskId";
const parentType = "tasks";
const sharePayload: SharePayload = {
	id,
	hasExpiryDate: true,
	isSchoolInternal: true,
};
const expectedServerPayload = {
	parentType,
	parentId: id,
	expiresInDays: 21,
	schoolExclusive: true,
};

describe("share-task module", () => {
	describe("actions", () => {
		beforeEach(() => {
			setupStores({ roomModule: RoomModule });
		});

		describe("createShareUrl", () => {
			describe("should make a 'POST' request to the backend", () => {
				const shareTokenMockApi = {
					shareTokenControllerCreateShareToken: jest.fn(async () => ({
						data: {
							token: "sampleToken",
							payload: {
								parentType,
								parentId: id,
							},
							expiresAt: "2022-10-12T05:25:58.908Z",
						},
					})),
				};
				jest
					.spyOn(serverApi, "ShareTokenApiFactory")
					.mockReturnValue(
						shareTokenMockApi as unknown as ShareTokenApiInterface
					);

				it("should call the backend with the correct payload", async () => {
					const shareModule = new ShareTaskModule({});
					shareModule.setTaskId(id);

					await shareModule.createShareUrl(sharePayload);

					expect(
						shareTokenMockApi.shareTokenControllerCreateShareToken
					).toHaveBeenCalledTimes(1);
					expect(
						shareTokenMockApi.shareTokenControllerCreateShareToken
					).toHaveBeenCalledWith(expectedServerPayload);
				});

				it("should call setShareUrl mutation", async () => {
					const shareModule = new ShareTaskModule({});
					shareModule.setTaskId(id);
					const setShareUrlMock = jest.spyOn(shareModule, "setShareUrl");

					await shareModule.createShareUrl(sharePayload);
					const result = setShareUrlMock.mock.calls[0][0];

					expect(result).toContain("rooms-overview?import=sampleToken");
				});

				it("should return undefined on error", async () => {
					const shareModule = new ShareTaskModule({});
					const error = { statusCode: 418, message: "server error" };
					const shareTokenErrorMockApi = {
						shareTokenControllerCreateShareToken: jest.fn(() =>
							Promise.reject({ ...error })
						),
					};
					jest
						.spyOn(serverApi, "ShareTokenApiFactory")
						.mockReturnValue(
							shareTokenErrorMockApi as unknown as ShareTokenApiInterface
						);

					shareModule.setTaskId(id);

					const errorResult = await shareModule.createShareUrl(sharePayload);
					expect(errorResult).toStrictEqual(undefined);
				});

				it("should return undefined if shareTokenResult is undefined", async () => {
					const shareModule = new ShareTaskModule({});
					const shareTokenErrorMockApi = {
						shareTokenControllerCreateShareToken: jest.fn(() =>
							Promise.resolve(undefined)
						),
					};
					jest
						.spyOn(serverApi, "ShareTokenApiFactory")
						.mockReturnValue(
							shareTokenErrorMockApi as unknown as ShareTokenApiInterface
						);

					shareModule.setTaskId(id);
					const errorResult = await shareModule.createShareUrl(sharePayload);

					expect(errorResult).toStrictEqual(undefined);
				});
			});
		});

		describe("startShareFlow", () => {
			it("should call setCourseId and setShareModalOpen mutations", async () => {
				const shareCourseModule = new ShareTaskModule({});
				const setCourseIdMock = jest.spyOn(shareCourseModule, "setTaskId");
				const setShareModalOpenMock = jest.spyOn(
					shareCourseModule,
					"setShareModalOpen"
				);
				const testId = "test-id";
				shareCourseModule.startShareFlow(testId);

				expect(setCourseIdMock).toHaveBeenCalledWith(testId);
				expect(setShareModalOpenMock).toHaveBeenCalledWith(true);
			});
		});

		describe("resetShareFlow", () => {
			it("should call setCourseId, setShareModalOpen and setShareUrl mutations", async () => {
				const shareCourseModule = new ShareTaskModule({});
				const setCourseIdMock = jest.spyOn(shareCourseModule, "setTaskId");
				const setShareUrlMock = jest.spyOn(shareCourseModule, "setShareUrl");
				const setShareModalOpenMock = jest.spyOn(
					shareCourseModule,
					"setShareModalOpen"
				);
				shareCourseModule.resetShareFlow();

				expect(setCourseIdMock).toHaveBeenCalledWith("");
				expect(setShareModalOpenMock).toHaveBeenCalledWith(false);
				expect(setShareUrlMock).toHaveBeenCalledWith(undefined);
			});
		});
	});

	describe("mutations", () => {
		it("setShareModalOpen should set 'setShareModalOpen' state", async () => {
			const shareCourseModule = new ShareTaskModule({});
			shareCourseModule.setShareModalOpen(true);

			expect(shareCourseModule.getIsShareModalOpen).toStrictEqual(true);
		});

		it("setShareUrl should set 'shareUrl' state", async () => {
			const shareCourseModule = new ShareTaskModule({});
			const payload = "https://test.url.com";
			shareCourseModule.setShareUrl(payload);

			expect(shareCourseModule.getShareUrl).toStrictEqual(payload);
		});
	});
});
