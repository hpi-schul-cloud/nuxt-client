import { downloadFile } from "./fileHelper";

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
			expect(document.body.appendChild).toBeCalledWith(link);
			expect(link.click).toHaveBeenCalledTimes(1);
			expect(document.body.removeChild).toBeCalledWith(link);
		});
	});
});
