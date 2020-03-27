import print from "@mixins/print";

const getNewWindowMock = () => {
	let content = "";
	return {
		document: {
			get innerHTML() {
				return content;
			},
			write: jest.fn().mockImplementation((...args) => {
				args.forEach((text) => (content += text));
			}),
			close: jest.fn(),
		},
		addEventListener: jest.fn().mockImplementation((event, cb) => cb()),
		focus: jest.fn(),
		print: jest.fn(),
		close: jest.fn(),
	};
};

let newWindowMock;

describe("@mixins/print", () => {
	beforeEach(() => {
		newWindowMock = getNewWindowMock();
		jest
			.spyOn(window, "open")
			.mockImplementation()
			.mockReturnValue(newWindowMock);
	});

	describe("$_print", () => {
		const method = print.methods.$_print;

		it("can print plain content", () => {
			const testContent = "some plain old content";
			method(testContent);
			expect(newWindowMock.document.innerHTML).toMatchSnapshot();
		});

		it("can print content with custom styles", () => {
			const testContent = "some plain old content";
			const testStyles = "body { margin: 2rem; border: 1px solid blue; }";
			method(testContent, testStyles);
			expect(newWindowMock.document.innerHTML).toMatchSnapshot();
		});

		it("focuses new window before printing", () => {
			const testContent = "some plain old content";
			method(testContent);

			expect(newWindowMock.document.write).toHaveBeenCalledWith(
				expect.stringContaining(testContent)
			);
			expect(newWindowMock.focus).toHaveBeenCalled();
			expect(newWindowMock.print).toHaveBeenCalled();
			expect(newWindowMock.focus).toHaveBeenCalledBefore(newWindowMock.print);
		});

		it("closes new window after print", () => {
			const testContent = "some plain old content";
			jest.useFakeTimers();
			method(testContent);
			jest.runAllTimers();
			expect(newWindowMock.print).toHaveBeenCalled();
			expect(newWindowMock.close).toHaveBeenCalled();
			expect(newWindowMock.close).toHaveBeenCalledAfter(newWindowMock.print);
		});
	});

	describe("$_printQRs", () => {
		const method = print.methods.$_printQRs;

		it("can print items with all options", () => {
			const testContent = [
				{
					qrContent: "qrContent",
					title: "title",
					description: "description",
				},
			];
			method(testContent);
			expect(newWindowMock.document.innerHTML).toMatchSnapshot();
		});

		it("can print items with only QR content", () => {
			const testContent = [
				{
					qrContent: "qrContent",
				},
			];
			method(testContent);
			expect(newWindowMock.document.innerHTML).toMatchSnapshot();
		});

		it("prints an error if no items to print are given", () => {
			method([]);
			expect(newWindowMock.document.innerHTML).toMatchSnapshot();
		});

		it("can handle no parameters", () => {
			method();
			expect(newWindowMock.document.innerHTML).toMatchSnapshot();
		});
	});
});
