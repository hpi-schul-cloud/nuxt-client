import { DeepMocked, createMock } from "@golevelup/ts-jest";
import CommonCartridgeImportModule from "./common-cartridge-import";
import { CoursesApiInterface } from "@/serverApi/v3";

describe("CommonCartridgeImportModule", () => {
	let sut: CommonCartridgeImportModule;
	let coursesApiMock: DeepMocked<CoursesApiInterface>;

	beforeAll(() => {
		sut = new CommonCartridgeImportModule({});
		coursesApiMock = createMock<CoursesApiInterface>();

		jest.spyOn(sut, "coursesApi", "get").mockReturnValue(coursesApiMock);
	});

	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("getters", () => {
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
			it("should call courseControllerImportCourse with the given file", async () => {
				const file = new File([""], "file.txt", { type: "text/plain" });

				await sut.importCommonCartridgeFile(file);

				expect(
					coursesApiMock.courseControllerImportCourse
				).toHaveBeenCalledWith(file);
			});

			it("should set isSuccess to false if the file is undefined", async () => {
				await sut.importCommonCartridgeFile(undefined);

				expect(sut.isSuccess).toBe(false);
				expect(
					coursesApiMock.courseControllerImportCourse
				).not.toHaveBeenCalled();
			});

			it("should set isSuccess to true if the request is successful", async () => {
				const file = new File([""], "file.txt", { type: "text/plain" });

				await sut.importCommonCartridgeFile(file);

				expect(sut.isSuccess).toBe(true);
			});

			it("should set isSuccess to false if the request fails", async () => {
				const file = new File([""], "file.txt", { type: "text/plain" });

				coursesApiMock.courseControllerImportCourse.mockRejectedValue(
					new Error()
				);

				await sut.importCommonCartridgeFile(file);

				expect(sut.isSuccess).toBe(false);
			});
		});
	});
});
