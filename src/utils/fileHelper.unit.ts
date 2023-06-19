import { convertFileSizeToHumanReadable, getFileExtension } from "./fileHelper";

describe("fileHelper", () => {
	describe("convertFileSizeToHumanReadable", () => {
		describe("when default value for maximumFractionDigits is used", () => {
			describe("when file size is < 1024 B", () => {
				it("should return human readable file size in B with max 2 digits", () => {
					const result = convertFileSizeToHumanReadable(666);

					expect(result).toEqual("666 B");
				});
			});

			describe("when file size is >= 1 KB and < 1 MB", () => {
				it("should return human readable file size in KB with max 2 digits", () => {
					const result = convertFileSizeToHumanReadable(24739);

					expect(result).toEqual("24,16 KB");
				});
			});

			describe("when file size is >= 1 MB and < 1 GB", () => {
				it("should return human readable file size in MB with max 2 digits", () => {
					const result = convertFileSizeToHumanReadable(2473900);

					expect(result).toEqual("2,36 MB");
				});
			});

			describe("when file size is >= 1 GB", () => {
				it("should return human readable file size in GB with max 2 digits", () => {
					const result = convertFileSizeToHumanReadable(2473900000);

					expect(result).toEqual("2,3 GB");
				});
			});
		});

		describe("when value for maximumFractionDigits is set", () => {
			it("should return human readable file size with max corresponding number of digits", () => {
				const result = convertFileSizeToHumanReadable(666666, 3);

				expect(result).toEqual("651,041 KB");
			});
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
