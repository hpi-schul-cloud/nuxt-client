import ShareModule, { ShareOptions } from "./share";
import * as serverApi from "../serverApi/v3/api";
import {
	ShareTokenApiInterface,
	ShareTokenBodyParamsParentTypeEnum,
	BoardExternalReferenceType,
} from "../serverApi/v3/api";
import setupStores from "@@/tests/test-utils/setupStores";
import courseRoomDetailsModule from "@/store/course-room-details";

const shareOptions: ShareOptions = {
	hasExpiryDate: true,
	isSchoolInternal: true,
};
const expectedServerPayload = {
	parentType: "courses",
	parentId: "sampleCourseId",
	expiresInDays: 21,
	schoolExclusive: true,
};

describe("share module", () => {
	describe("actions", () => {
		beforeEach(() => {
			setupStores({ courseRoomDetailsModule: courseRoomDetailsModule });
		});

		describe("createShareUrl", () => {
			describe("should make a 'POST' request to the backend", () => {
				const shareTokenMockApi = {
					shareTokenControllerCreateShareToken: jest.fn(async () => ({
						data: {
							token: "sampleToken",
							payload: {
								parentType: "courses",
								parentId: "sampleCourseId",
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
					const shareModule = new ShareModule({});
					shareModule.setParentId("sampleCourseId");
					shareModule.setParentType(ShareTokenBodyParamsParentTypeEnum.Courses);

					await shareModule.createShareUrl(shareOptions);

					expect(
						shareTokenMockApi.shareTokenControllerCreateShareToken
					).toHaveBeenCalledTimes(1);
					expect(
						shareTokenMockApi.shareTokenControllerCreateShareToken
					).toHaveBeenCalledWith(expectedServerPayload);
				});

				it("should call setShareUrl mutation", async () => {
					const shareModule = new ShareModule({});
					shareModule.setParentId("sampleCourseId");
					shareModule.setParentType(ShareTokenBodyParamsParentTypeEnum.Courses);
					const setShareUrlMock = jest.spyOn(shareModule, "setShareUrl");

					await shareModule.createShareUrl(shareOptions);
					const result = setShareUrlMock.mock.calls[0][0];

					expect(result).toContain("rooms/courses-overview?import=sampleToken");
				});

				it("should return undefined on error", async () => {
					const shareModule = new ShareModule({});
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

					shareModule.setParentId("sampleCourseId");

					const errorResult = await shareModule.createShareUrl(shareOptions);
					expect(errorResult).toStrictEqual(undefined);
				});

				it("should return undefined if shareTokenResult is undefined", async () => {
					const shareModule = new ShareModule({});
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

					shareModule.setParentId("sampleCourseId");
					const errorResult = await shareModule.createShareUrl(shareOptions);

					expect(errorResult).toStrictEqual(undefined);
				});
			});
		});

		describe("startShareFlow", () => {
			it("should call setParentId, setParentType, setDestinationType and setShareModalOpen mutations", async () => {
				const shareModule = new ShareModule({});
				const setParentIdMock = jest.spyOn(shareModule, "setParentId");
				const setParentTypeMock = jest.spyOn(shareModule, "setParentType");
				const setDestinationTypeMock = jest.spyOn(
					shareModule,
					"setDestinationType"
				);
				const setShareModalOpenMock = jest.spyOn(
					shareModule,
					"setShareModalOpen"
				);
				const testId = "test-id";
				const type = ShareTokenBodyParamsParentTypeEnum.Courses;
				const destinationType = BoardExternalReferenceType.Room;
				shareModule.startShareFlow({
					id: testId,
					type,
					destinationType,
				});

				expect(setParentIdMock).toHaveBeenCalledWith(testId);
				expect(setParentTypeMock).toHaveBeenCalledWith(type);
				expect(setDestinationTypeMock).toHaveBeenCalledWith(destinationType);
				expect(setShareModalOpenMock).toHaveBeenCalledWith(true);
			});
		});

		describe("resetShareFlow", () => {
			it("should call setCourseId, setShareModalOpen and setShareUrl mutations", async () => {
				const shareModule = new ShareModule({});
				const setIdMock = jest.spyOn(shareModule, "setParentId");
				const setShareUrlMock = jest.spyOn(shareModule, "setShareUrl");
				const setShareModalOpenMock = jest.spyOn(
					shareModule,
					"setShareModalOpen"
				);
				shareModule.resetShareFlow();

				expect(setIdMock).toHaveBeenCalledWith("");
				expect(setShareModalOpenMock).toHaveBeenCalledWith(false);
				expect(setShareUrlMock).toHaveBeenCalledWith(undefined);
			});
		});
	});

	describe("mutations", () => {
		it("setShareModalOpen should set 'setShareModalOpen' state", async () => {
			const shareModule = new ShareModule({});
			shareModule.setShareModalOpen(true);

			expect(shareModule.getIsShareModalOpen).toStrictEqual(true);
		});

		it("setShareUrl should set 'shareUrl' state", async () => {
			const shareModule = new ShareModule({});
			const payload = "https://test.url.com";
			shareModule.setShareUrl(payload);

			expect(shareModule.getShareUrl).toStrictEqual(payload);
		});

		it("setParentType should set 'shareUrl' state", async () => {
			const shareModule = new ShareModule({});
			shareModule.setParentType(ShareTokenBodyParamsParentTypeEnum.Courses);

			expect(shareModule.getParentType).toStrictEqual(
				ShareTokenBodyParamsParentTypeEnum.Courses
			);
		});
	});
});
