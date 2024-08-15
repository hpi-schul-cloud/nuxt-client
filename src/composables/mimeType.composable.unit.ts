import { useMimeType } from "@/composables/mimeType.composable";

describe("useMimeType", () => {
	describe("isVideoMimeType", () => {
		describe("when file has video mime type", () => {
			describe("when file mime type has video/ prefix", () => {
				it.each(["video/mp4", "video/", "video/ "])(
					"should return true if'%s'",
					(mimeType) => {
						const { isVideoMimeType } = useMimeType(mimeType);

						expect(isVideoMimeType.value).toBe(true);
					}
				);
			});

			describe("when file mime type has application/ prefix", () => {
				it.each([
					"application/x-mpegURL",
					"application/vnd.ms-asf",
					"application/ogg",
				])("should return true if '%s'", (mimeType) => {
					const { isVideoMimeType } = useMimeType(mimeType);

					expect(isVideoMimeType.value).toBe(true);
				});
			});
		});

		describe("when file has no video mime type", () => {
			it.each(["image/png", "application/", " ", ""])(
				"should return false if '%s'",
				(mimeType) => {
					const { isVideoMimeType } = useMimeType(mimeType);

					expect(isVideoMimeType.value).toBe(false);
				}
			);
		});
	});

	describe("isAudioMimeType", () => {
		describe("when file has audio mime type", () => {
			describe("when file mime type has audio/ prefix", () => {
				it.each(["audio/mp4", "audio/", "audio/ "])(
					"should return true if '%s'",
					(mimeType) => {
						const { isAudioMimeType } = useMimeType(mimeType);

						expect(isAudioMimeType.value).toBe(true);
					}
				);
			});
		});

		describe("when file has no audio mime type", () => {
			it.each(["image/png", "application/", " ", ""])(
				"should return false if '%s'",
				(mimeType) => {
					const { isAudioMimeType } = useMimeType(mimeType);

					expect(isAudioMimeType.value).toBe(false);
				}
			);
		});
	});

	describe("isPdfMimeType", () => {
		describe("when file has pdf mime type", () => {
			it("should return true", () => {
				const { isPdfMimeType } = useMimeType("application/pdf");

				expect(isPdfMimeType.value).toBe(true);
			});
		});

		describe("when file has no pdf mime type", () => {
			it.each(["image/png", "application/", " ", ""])(
				"should return false if '%s'",
				(mimeType) => {
					const { isPdfMimeType } = useMimeType(mimeType);

					expect(isPdfMimeType.value).toBe(false);
				}
			);
		});
	});
});
