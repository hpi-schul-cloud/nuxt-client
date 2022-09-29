import ShareCourseModule, { SharePayload } from "./share-course";

describe("copy module", () => {
	describe("actions", () => {
		describe("createShareUrl", () => {
			it.skip("should make a 'POST' request to the backend", () => {});
			it("should call setShareUrl mutation", async () => {
				const shareCourseModule = new ShareCourseModule({});

				const setShareUrlMock = jest.spyOn(shareCourseModule, "setShareUrl");

				const payload: SharePayload = {
					schoolInternally: true,
					expiresInSevenDays: true,
					id: "test-id",
				};

				shareCourseModule.createShareUrl(payload);

				expect(setShareUrlMock).toHaveBeenCalledWith("http://example.com"); // WIP change it with real link
			});
		});

		describe("startShareFlow", () => {
			it("should call setCourseId and setShareModalOpen mutations", async () => {
				const shareCourseModule = new ShareCourseModule({});

				const setCourseIdMock = jest.spyOn(shareCourseModule, "setCourseId");
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
				const shareCourseModule = new ShareCourseModule({});

				const setCourseIdMock = jest.spyOn(shareCourseModule, "setCourseId");
				const setShareUrlMock = jest.spyOn(shareCourseModule, "setShareUrl");
				const setShareModalOpenMock = jest.spyOn(
					shareCourseModule,
					"setShareModalOpen"
				);

				shareCourseModule.resetShareFlow();

				expect(setCourseIdMock).toHaveBeenCalledWith(undefined);
				expect(setShareModalOpenMock).toHaveBeenCalledWith(false);
				expect(setShareUrlMock).toHaveBeenCalledWith(undefined);
			});
		});
	});

	describe("mutations", () => {
		it("setShareModalOpen should set 'setShareModalOpen' state", async () => {
			const shareCourseModule = new ShareCourseModule({});

			shareCourseModule.setShareModalOpen(true);

			expect(shareCourseModule.getIsShareModalOpen).toStrictEqual(true);
		});

		it("setShareUrl should set 'shareUrl' state", async () => {
			const shareCourseModule = new ShareCourseModule({});

			const payload = "https://test.url.com";

			shareCourseModule.setShareUrl(payload);

			expect(shareCourseModule.getShareUrl).toStrictEqual(payload);
		});
	});
});
