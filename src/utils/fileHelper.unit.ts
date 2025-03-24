import {
	FileRecordScanStatus,
	PreviewStatus,
	PreviewWidth,
} from "@/fileStorageApi/v3";
import {
	convertDownloadToPreviewUrl,
	convertFileSize,
	downloadFile,
	formatSecondsToHourMinSec,
	getFileExtension,
	isAudioMimeType,
	isDownloadAllowed,
	isPdfMimeType,
	isPreviewPossible,
	isVideoMimeType,
} from "./fileHelper";

describe("@/utils/fileHelper", () => {
	describe("downloadFile", () => {
		const setup = () => {
			const url = "test-url";
			const fileName = "test-file.ext";
			const link = {
				...document.createElement("a"),
				href: "",
				download: "",
				dataset: { testid: "" },
				click: jest.fn(),
			};
			const createElementSpy = jest
				.spyOn(document, "createElement")
				.mockImplementation(() => link);
			document.body.appendChild = jest.fn();
			document.body.removeChild = jest.fn();

			return { url, fileName, link, createElementSpy };
		};

		it("should download the file", () => {
			const { url, fileName, link, createElementSpy } = setup();

			downloadFile(url, fileName);

			expect(createElementSpy).toBeCalledWith("a");
			expect(link.href).toEqual(url);
			expect(link.download).toEqual(fileName);
			expect(link.hidden).toBe(true);
			expect(link.dataset.testid).toEqual("");
			expect(document.body.appendChild).toBeCalledWith(link);
			expect(link.click).toHaveBeenCalledTimes(1);
			expect(document.body.removeChild).toBeCalledWith(link);
		});
	});

	describe("convertFileSize", () => {
		describe("when file size is < 1024 B", () => {
			it("should return file size in B and unit", () => {
				const result = convertFileSize(666);
				expect(result).toEqual({ convertedSize: 666, unit: "B" });
			});
		});

		describe("when file size is >= 1 KB and < 1 MB", () => {
			it("should return file size in KB and unit", () => {
				const result = convertFileSize(24739);

				expect(result).toEqual({ convertedSize: 24.1591796875, unit: "KB" });
			});
		});
	});

	describe("when file size is >= 1 MB and < 1 GB", () => {
		it("should return file size in MB and unit", () => {
			const result = convertFileSize(2473900);
			expect(result).toEqual({ convertedSize: 2.359294891357422, unit: "MB" });
		});
	});
	describe("when file size is >= 1 GB", () => {
		it("should return file size in GB and unit", () => {
			const result = convertFileSize(2473900000);
			expect(result).toEqual({ convertedSize: 2.3039989173412323, unit: "GB" });
		});
	});

	describe("when file size is at the limits of B range", () => {
		it("should return file size 0 B if file size is negative", () => {
			const result = convertFileSize(-1);
			expect(result).toEqual({ convertedSize: 0, unit: "B" });
		});
		it("should return file size 0 B", () => {
			const result = convertFileSize(0);
			expect(result).toEqual({ convertedSize: 0, unit: "B" });
		});
		it("should return file size 1023 B", () => {
			const result = convertFileSize(1023);
			expect(result).toEqual({ convertedSize: 1023, unit: "B" });
		});
	});

	describe("when file size is at the limits of KB range", () => {
		it("should return file size 1 KB", () => {
			const result = convertFileSize(1024);
			expect(result).toEqual({ convertedSize: 1, unit: "KB" });
		});
		it("should return file size 1024 and unit", () => {
			const result = convertFileSize(1048575);
			expect(result).toEqual({ convertedSize: 1023.9990234375, unit: "KB" });
		});
	});

	describe("when file size is at the limits of MB range", () => {
		it("should return file size 1 MB", () => {
			const result = convertFileSize(1048576);
			expect(result).toEqual({ convertedSize: 1, unit: "MB" });
		});
		it("should return file size 1024 MB", () => {
			const result = convertFileSize(1073741823);
			expect(result).toEqual({ convertedSize: 1023.9999990463257, unit: "MB" });
		});
	});

	describe("when file size is at the limits of GB range", () => {
		it("should return file size 1 GB", () => {
			const result = convertFileSize(1073741824);
			expect(result).toEqual({ convertedSize: 1, unit: "GB" });
		});
		it("should return file size 1024 GB", () => {
			const result = convertFileSize(1099511627775);
			expect(result).toEqual({ convertedSize: 1023.9999999990687, unit: "GB" });
		});
		it("should return file size >= 1024 GB", () => {
			const result = convertFileSize(1099511627776);
			expect(result).toEqual({ convertedSize: 1024, unit: "GB" });
		});
	});

	describe("getFileExtension", () => {
		describe("when input string contains one dot", () => {
			it("should return the part of the input string behing the last dot", () => {
				const result = getFileExtension("test.ext");

				expect(result).toEqual("ext");
			});
		});

		describe("when input string contains several dots", () => {
			it("should return the part of the input string behing the last dot", () => {
				const result = getFileExtension("test.test.test.ext");

				expect(result).toEqual("ext");
			});
		});

		describe("when input string contains no dot", () => {
			it("should return the input string", () => {
				const result = getFileExtension("test");

				expect(result).toEqual("test");
			});
		});
	});

	describe("convertDownloadToPreviewUrl", () => {
		describe("when second argument width is undefined", () => {
			it("should return the preview url", () => {
				const url = "/file/download/233/text.txt";

				const result = convertDownloadToPreviewUrl(url);

				expect(result).toEqual(
					`/file/preview/233/text.txt?outputFormat=image/webp`
				);
			});

			it("should return the preview url with two download words in source", () => {
				const url = "/file/download/233/download";

				const result = convertDownloadToPreviewUrl(url);

				expect(result).toEqual(
					`/file/preview/233/download?outputFormat=image/webp`
				);
			});

			it("should return the preview url with two download words in source with extension", () => {
				const url = "/file/download/233/download.txt";

				const result = convertDownloadToPreviewUrl(url);

				expect(result).toEqual(
					`/file/preview/233/download.txt?outputFormat=image/webp`
				);
			});
		});

		describe("when second argument width is set", () => {
			it("should return the preview url", () => {
				const url = "/file/download/233/text.txt";

				const result = convertDownloadToPreviewUrl(url, PreviewWidth._500);

				expect(result).toEqual(
					`/file/preview/233/text.txt?outputFormat=image/webp&width=500`
				);
			});

			it("should return the preview url with two download words in source", () => {
				const url = "/file/download/233/download";

				const result = convertDownloadToPreviewUrl(url, PreviewWidth._500);

				expect(result).toEqual(
					`/file/preview/233/download?outputFormat=image/webp&width=500`
				);
			});

			it("should return the preview url with two download words in source with extension", () => {
				const url = "/file/download/233/download.txt";

				const result = convertDownloadToPreviewUrl(url, PreviewWidth._500);

				expect(result).toEqual(
					`/file/preview/233/download.txt?outputFormat=image/webp&width=500`
				);
			});

			it("should return the preview url", () => {
				const url = "/file/download/233/text.txt";

				// @ts-expect-error Enum only provides on value currently but will provide more in the future
				const result = convertDownloadToPreviewUrl(url, 1000);

				expect(result).toEqual(
					`/file/preview/233/text.txt?outputFormat=image/webp&width=1000`
				);
			});
		});
	});

	describe("isDownloadAllowed", () => {
		describe("when scan status is not blocked", () => {
			it("should return true", () => {
				const result = isDownloadAllowed(FileRecordScanStatus.VERIFIED);

				expect(result).toBe(true);
			});
		});

		describe("when scan status is blocked", () => {
			it("should return false", () => {
				const result = isDownloadAllowed(FileRecordScanStatus.BLOCKED);

				expect(result).toBe(false);
			});
		});
	});

	describe("isPreviewPossible", () => {
		describe("when preview status is possible", () => {
			it("should return true", () => {
				const result = isPreviewPossible(PreviewStatus.PREVIEW_POSSIBLE);

				expect(result).toBe(true);
			});
		});

		describe("when preview status is AWAITING_SCAN_STATUS", () => {
			it("should return false", () => {
				const result = isPreviewPossible(PreviewStatus.AWAITING_SCAN_STATUS);

				expect(result).toBe(false);
			});
		});

		describe("when preview status is PREVIEW_NOT_POSSIBLE_SCAN_STATUS_ERROR", () => {
			it("should return false", () => {
				const result = isPreviewPossible(
					PreviewStatus.PREVIEW_NOT_POSSIBLE_SCAN_STATUS_ERROR
				);

				expect(result).toBe(false);
			});
		});

		describe("when preview status is PREVIEW_NOT_POSSIBLE_SCAN_STATUS_WONT_CHECK", () => {
			it("should return false", () => {
				const result = isPreviewPossible(
					PreviewStatus.PREVIEW_NOT_POSSIBLE_SCAN_STATUS_WONT_CHECK
				);

				expect(result).toBe(false);
			});
		});

		describe("when preview status is PREVIEW_NOT_POSSIBLE_SCAN_STATUS_BLOCKED", () => {
			it("should return false", () => {
				const result = isPreviewPossible(
					PreviewStatus.PREVIEW_NOT_POSSIBLE_SCAN_STATUS_BLOCKED
				);

				expect(result).toBe(false);
			});
		});

		describe("when preview status is PREVIEW_NOT_POSSIBLE_WRONG_MIME_TYPE", () => {
			it("should return false", () => {
				const result = isPreviewPossible(
					PreviewStatus.PREVIEW_NOT_POSSIBLE_WRONG_MIME_TYPE
				);

				expect(result).toBe(false);
			});
		});
	});

	describe("isVideoMimeType", () => {
		describe("when file has video mime type", () => {
			describe("when file mime type has video/ prefix", () => {
				it("should return true", () => {
					const result = isVideoMimeType("video/mp4");

					expect(result).toBe(true);
				});

				it("should return true", () => {
					const result = isVideoMimeType("video/");

					expect(result).toBe(true);
				});

				it("should return true", () => {
					const result = isVideoMimeType("video/ ");

					expect(result).toBe(true);
				});
			});

			describe("when file mime type has application/ prefix", () => {
				it("should return true", () => {
					const result = isVideoMimeType("application/x-mpegURL");

					expect(result).toBe(true);
				});

				it("should return true", () => {
					const result = isVideoMimeType("application/vnd.ms-asf");

					expect(result).toBe(true);
				});

				it("should return true", () => {
					const result = isVideoMimeType("application/ogg");

					expect(result).toBe(true);
				});
			});
		});

		describe("when file has no video mime type", () => {
			it("should return false", () => {
				const result = isVideoMimeType("image/png");

				expect(result).toBe(false);
			});

			it("should return false", () => {
				const result = isVideoMimeType("application/");

				expect(result).toBe(false);
			});

			it("should return false", () => {
				const result = isVideoMimeType(" ");

				expect(result).toBe(false);
			});

			it("should return false", () => {
				const result = isVideoMimeType("");

				expect(result).toBe(false);
			});
		});
	});

	describe("isAudioMimeType", () => {
		describe("when file has audio mime type", () => {
			describe("when file mime type has audio/ prefix", () => {
				it("should return true", () => {
					const result = isAudioMimeType("audio/mp4");

					expect(result).toBe(true);
				});

				it("should return true", () => {
					const result = isAudioMimeType("audio/");

					expect(result).toBe(true);
				});

				it("should return true", () => {
					const result = isAudioMimeType("audio/ ");

					expect(result).toBe(true);
				});
			});
		});

		describe("when file has no audio mime type", () => {
			it("should return false", () => {
				const result = isAudioMimeType("image/png");

				expect(result).toBe(false);
			});

			it("should return false", () => {
				const result = isAudioMimeType("application/");

				expect(result).toBe(false);
			});

			it("should return false", () => {
				const result = isAudioMimeType(" ");

				expect(result).toBe(false);
			});

			it("should return false", () => {
				const result = isAudioMimeType("");

				expect(result).toBe(false);
			});
		});
	});

	describe("isPdfMimeType", () => {
		describe("when file has pdf mime type", () => {
			it("should return true", () => {
				const result = isPdfMimeType("application/pdf");

				expect(result).toBe(true);
			});
		});

		describe("when file has no pdf mime type", () => {
			it("should return false", () => {
				const result = isPdfMimeType("image/png");

				expect(result).toBe(false);
			});

			it("should return false", () => {
				const result = isPdfMimeType("application/");

				expect(result).toBe(false);
			});

			it("should return false", () => {
				const result = isPdfMimeType(" ");

				expect(result).toBe(false);
			});

			it("should return false", () => {
				const result = isPdfMimeType("");

				expect(result).toBe(false);
			});
		});
	});

	describe("formatSecondsToHourMinSec", () => {
		describe("when file has duration 0", () => {
			it("should display 0 minutes & 0 seconds", () => {
				const result = formatSecondsToHourMinSec(0);

				expect(result).toBe("00:00");
			});
		});

		describe("when file lasts some seconds", () => {
			it("should display it in Minutes, Seconds format", () => {
				const result = formatSecondsToHourMinSec(45);

				expect(result).toBe("00:45");
			});
		});

		describe("when file has duration in hours", () => {
			it("should display it in Hours, Minutes, Seconds format", () => {
				const result = formatSecondsToHourMinSec(1555125);

				expect(result).toBe("23:58:45");
			});
		});
	});
});
