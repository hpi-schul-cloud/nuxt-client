import { convertFileSize, getFileExtension } from "./fileHelper";

describe("fileHelper", () => {
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
