import print from "./print";

const getNewWindowMock = () => {
	let content = "";
	return {
		document: {
			get innerHTML() {
				return content;
			},
			write: vi.fn().mockImplementation((...args) => {
				args.forEach((text) => (content += text));
			}),
			close: vi.fn(),
		},
		addEventListener: vi.fn().mockImplementation((event, cb) => cb()),
		focus: vi.fn(),
		print: vi.fn(),
		close: vi.fn(),
	};
};

let newWindowMock;

describe("@/mixins/print", () => {
	beforeEach(() => {
		newWindowMock = getNewWindowMock();
		vi.spyOn(window, "open")
			.mockImplementation()
			.mockReturnValue(newWindowMock);
	});

	describe("$_print", () => {
		const method = print.methods.$_print;

		it("can print plain content", () => {
			const testContent = "some plain old content";
			method(testContent);
			expect(newWindowMock.document.innerHTML).toContain(testContent);
		});

		it("can print content with custom styles", () => {
			const testContent = "some plain old content";
			const testStyles = "body { margin: 2rem; border: 1px solid blue; }";
			method(testContent, testStyles);
			expect(newWindowMock.document.innerHTML).toContain(testContent);
		});

		it("focuses new window before printing", () => {
			const testContent = "some plain old content";
			method(testContent);

			expect(newWindowMock.document.write).toHaveBeenCalledWith(
				expect.stringContaining(testContent)
			);
			expect(newWindowMock.focus).toHaveBeenCalled();
			expect(newWindowMock.print).toHaveBeenCalled();
		});

		it("closes new window after print", () => {
			const testContent = "some plain old content";
			vi.useFakeTimers();
			method(testContent);
			vi.runAllTimers();
			expect(newWindowMock.print).toHaveBeenCalled();
			expect(newWindowMock.close).toHaveBeenCalled();
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
			expect(newWindowMock.document.innerHTML).toContain(
				testContent[0].qrContent
			);
			expect(newWindowMock.document.innerHTML).toContain(testContent[0].title);
			expect(newWindowMock.document.innerHTML).toContain(
				testContent[0].description
			);
		});

		it("can print items with only QR content", () => {
			const testContent = [
				{
					qrContent: "qrContent",
				},
			];
			method(testContent);
			expect(newWindowMock.document.innerHTML).toContain(
				testContent[0].qrContent
			);
		});

		it("prints an error if no items to print are given", () => {
			method([]);
			expect(newWindowMock.document.innerHTML).toContain(
				"Keine Einträge zu drucken."
			);
		});

		it("can handle no parameters", () => {
			method();
			expect(newWindowMock.document.innerHTML).toContain(
				"Keine Einträge zu drucken."
			);
		});
	});
});
