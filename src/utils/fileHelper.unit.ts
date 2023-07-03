import { convertFileSize, downloadFile, getFileExtension } from "./fileHelper";

describe("@/utils/fileHelper", () => {
	describe("downloadFile", () => {
		const setup = () => {
			const url = "test-url";
			const fileName = "test-file.ext";
			const link = {
				...document.createElement("a"),
				href: "",
				download: "",
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
});
