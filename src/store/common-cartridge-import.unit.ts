import CommonCartridgeImportModule from "./common-cartridge-import";
import { CommonCartridgeApiFactory, CommonCartridgeApiInterface } from "@/commonCartridgeApi/v3";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { MockedFunction } from "vitest";

vi.mock("@/commonCartridgeApi/v3/api", () => ({
	CommonCartridgeApiFactory: vi.fn(),
}));

describe("CommonCartridgeImportModule", () => {
	let sut: CommonCartridgeImportModule;
	let commonCartridgeApiMock: DeepMocked<CommonCartridgeApiInterface>;

	beforeAll(() => {
		sut = new CommonCartridgeImportModule({});
		commonCartridgeApiMock = createMock<CommonCartridgeApiInterface>();

		vi.spyOn(sut, "commonCartridgeApi", "get").mockReturnValue(commonCartridgeApiMock);
	});

	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("getters", () => {
		it("should return the mocked commonCartridgeApi instance", () => {
			const result = sut.commonCartridgeApi;
			expect(result).toBe(commonCartridgeApiMock);
		});

		it("file", () => {
			expect(sut.file).toBeUndefined();
		});

		it("isOpen", () => {
			expect(sut.isOpen).toBe(false);
		});

		it("isSuccess", () => {
			expect(sut.isSuccess).toBe(false);
		});
	});

	describe("getters (real, for coverage)", () => {
		it("should execute the real getter and call CommonCartridgeApiFactory", () => {
			const realMock = createMock<CommonCartridgeApiInterface>();

			(CommonCartridgeApiFactory as MockedFunction<typeof CommonCartridgeApiFactory>).mockReturnValue(realMock);

			const localSut = new CommonCartridgeImportModule({});
			const result = localSut.commonCartridgeApi;

			expect(result).toBe(realMock);
			expect(CommonCartridgeApiFactory).toHaveBeenCalledWith(undefined, "/v3", undefined);
		});
	});

	describe("mutations", () => {
		it("setFile", () => {
			const file = new File([""], "file.txt");

			sut.setFile(file);

			expect(sut.file).toBe(file);
		});

		it("setIsOpen", () => {
			sut.setIsOpen(true);

			expect(sut.isOpen).toBe(true);
		});

		it("setIsSuccess", () => {
			sut.setIsSuccess(true);

			expect(sut.isSuccess).toBe(true);
		});
	});

	describe("actions", () => {
		describe("importCommonCartridgeFile", () => {
			it("should call commonCartridgeControllerImportCourse with the given file", async () => {
				const file = new File([""], "file.txt", { type: "text/plain" });

				await sut.importCommonCartridgeFile(file);

				expect(commonCartridgeApiMock.commonCartridgeControllerImportCourse).toHaveBeenCalledWith(file);
			});

			it("should set isSuccess to false if the file is undefined", async () => {
				await sut.importCommonCartridgeFile(undefined);

				expect(sut.isSuccess).toBe(false);
				expect(commonCartridgeApiMock.commonCartridgeControllerImportCourse).not.toHaveBeenCalled();
			});

			it("should set isSuccess to true if the request is successful", async () => {
				const file = new File([""], "file.txt", { type: "text/plain" });

				await sut.importCommonCartridgeFile(file);

				expect(sut.isSuccess).toBe(true);
			});

			it("should set isSuccess to false if the request fails", async () => {
				const file = new File([""], "file.txt", { type: "text/plain" });

				commonCartridgeApiMock.commonCartridgeControllerImportCourse.mockRejectedValue(new Error());

				await sut.importCommonCartridgeFile(file);

				expect(sut.isSuccess).toBe(false);
			});
		});
	});
});
