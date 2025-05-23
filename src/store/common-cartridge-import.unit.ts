import { DeepMocked, createMock } from "@golevelup/ts-jest";
import CommonCartridgeImportModule from "./common-cartridge-import";
import { CoursesApiInterface } from "@/serverApi/v3";
import { CommonCartridgeApiInterface } from "@/commonCartridgeApi/v3";

describe("CommonCartridgeImportModule", () => {
	let sut: CommonCartridgeImportModule;
	let commonCartridgeApiMock: DeepMocked<CommonCartridgeApiInterface>;

	beforeAll(() => {
		sut = new CommonCartridgeImportModule({});
		commonCartridgeApiMock = createMock<CommonCartridgeApiInterface>();

		jest
			.spyOn(sut, "commonCartridgeApi", "get")
			.mockReturnValue(commonCartridgeApiMock);
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("getters", () => {
		it("commonCartridgeApi", () => {
			expect(sut.commonCartridgeApi).toBeDefined();
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

				expect(
					commonCartridgeApiMock.commonCartridgeControllerImportCourse
				).toHaveBeenCalledWith(file);
			});

			it("should set isSuccess to false if the file is undefined", async () => {
				await sut.importCommonCartridgeFile(undefined);

				expect(sut.isSuccess).toBe(false);
				expect(
					commonCartridgeApiMock.commonCartridgeControllerImportCourse
				).not.toHaveBeenCalled();
			});

			it("should set isSuccess to true if the request is successful", async () => {
				const file = new File([""], "file.txt", { type: "text/plain" });

				await sut.importCommonCartridgeFile(file);

				expect(sut.isSuccess).toBe(true);
			});

			it("should set isSuccess to false if the request fails", async () => {
				const file = new File([""], "file.txt", { type: "text/plain" });

				commonCartridgeApiMock.commonCartridgeControllerImportCourse.mockRejectedValue(
					new Error()
				);

				await sut.importCommonCartridgeFile(file);

				expect(sut.isSuccess).toBe(false);
			});
		});

		describe("commonCartridgeApi", () => {
			it("should call commonCartridgeControllerImportCourse with the provided file", async () => {
				// Arrange
				const file = new File([""], "file.txt", { type: "text/plain" });

				// Act
				await sut.importCommonCartridgeFile(file);

				// Assert
				expect(
					commonCartridgeApiMock.commonCartridgeControllerImportCourse
				).toHaveBeenCalledWith(file);
			});
		});
	});
});
