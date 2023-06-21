import { downloadFile } from "./fileHelper";

describe("downloadFile", () => {
	it("should download the file", () => {
		const url = "test-url";
		const fileName = "test-file.ext";
		const link = {
			href: "",
			download: "",
			click: jest.fn(),
		} as any;
		const createElementSpy = jest
			.spyOn(document, "createElement")
			.mockImplementation(() => link);
		document.body.appendChild = jest.fn();
		document.body.removeChild = jest.fn();

		downloadFile(url, fileName);

		expect(createElementSpy).toBeCalledWith("a");
		expect(link.href).toEqual(url);
		expect(link.download).toEqual(fileName);
		expect(document.body.appendChild).toBeCalledWith(link);
		expect(link.click).toHaveBeenCalledTimes(1);
		expect(document.body.removeChild).toBeCalledWith(link);
	});
});
