import { formatBytes } from "./fileSize";

describe("@/utils/fileSize", () => {
	describe("formatBytes", () => {
		describe("when formatting common byte values", () => {
			it.each([
				[0, "0 Bytes"],
				[1, "1 Byte"],
				[500, "500 Bytes"],
				[1023, "1023 Bytes"],
			])("should format %p bytes as %p", (bytes, expected) => {
				expect(formatBytes(bytes)).toBe(expected);
			});
		});

		describe("when formatting kilobytes", () => {
			it.each([
				[1024, "1 KB"],
				[1536, "1.5 KB"],
				[2048, "2 KB"],
				[10240, "10 KB"],
				[1048575, "1024 KB"],
			])("should format %p bytes as %p", (bytes, expected) => {
				expect(formatBytes(bytes)).toBe(expected);
			});
		});

		describe("when formatting megabytes", () => {
			it.each([
				[1048576, "1 MB"],
				[1572864, "1.5 MB"],
				[10485760, "10 MB"],
				[104857600, "100 MB"],
			])("should format %p bytes as %p", (bytes, expected) => {
				expect(formatBytes(bytes)).toBe(expected);
			});
		});

		describe("when formatting gigabytes", () => {
			it.each([
				[1073741824, "1 GB"],
				[1610612736, "1.5 GB"],
				[10737418240, "10 GB"],
			])("should format %p bytes as %p", (bytes, expected) => {
				expect(formatBytes(bytes)).toBe(expected);
			});
		});

		describe("when formatting terabytes and beyond", () => {
			it.each([
				[1099511627776, "1 TB"],
				[1125899906842624, "1 PB"],
			])("should format %p bytes as %p", (bytes, expected) => {
				expect(formatBytes(bytes)).toBe(expected);
			});
		});

		describe("when using custom decimal places", () => {
			it("should format with 0 decimal places", () => {
				expect(formatBytes(1536, 0)).toBe("2 KB");
			});

			it("should format with 1 decimal place", () => {
				expect(formatBytes(1536, 1)).toBe("1.5 KB");
			});

			it("should format with 3 decimal places", () => {
				expect(formatBytes(1537, 3)).toBe("1.501 KB");
			});

			it("should remove trailing zeros", () => {
				expect(formatBytes(1024, 3)).toBe("1 KB");
				expect(formatBytes(2048, 2)).toBe("2 KB");
			});
		});

		describe("when handling edge cases", () => {
			it("should handle negative values", () => {
				expect(formatBytes(-1)).toBe("0 Bytes");
				expect(formatBytes(-1024)).toBe("0 Bytes");
			});

			it("should handle Infinity", () => {
				expect(formatBytes(Infinity)).toBe("0 Bytes");
			});

			it("should handle NaN", () => {
				expect(formatBytes(NaN)).toBe("0 Bytes");
			});

			it("should handle negative decimals by treating as 0", () => {
				expect(formatBytes(1536, -1)).toBe("2 KB");
			});
		});

		describe("when formatting real-world file sizes", () => {
			it("should format a typical document size", () => {
				expect(formatBytes(256000)).toBe("250 KB");
			});

			it("should format a typical image size", () => {
				expect(formatBytes(2500000)).toBe("2.38 MB");
			});

			it("should format a typical video size", () => {
				expect(formatBytes(750000000)).toBe("715.26 MB");
			});

			it("should format the default max import size (1 GB)", () => {
				expect(formatBytes(1073741824)).toBe("1 GB");
			});
		});
	});
});
