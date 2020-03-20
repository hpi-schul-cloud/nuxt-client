import print from "@mixins/print";

const getNewWindowMock = () => ({
	document: {
		write: jest.fn(),
		close: jest.fn(),
	},
	addEventListener: jest.fn().mockImplementation((event, cb) => cb()),
	focus: jest.fn(),
	print: jest.fn(),
	close: jest.fn(),
});

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

			expect(newWindowMock.document.write).toHaveBeenCalledWith(
				expect.stringContaining(testContent)
			);
			expect(newWindowMock.print).toHaveBeenCalled();
		});

		it("focuses new window before printing", () => {
			const testContent = "some plain old content";
			method(testContent);

			expect(newWindowMock.document.write).toHaveBeenCalledWith(
				expect.stringContaining(testContent)
			);
			expect(newWindowMock.focus).toHaveBeenCalledBefore(newWindowMock.print);
			expect(newWindowMock.focus).toHaveBeenCalled();
			expect(newWindowMock.print).toHaveBeenCalled();
		});

		it("closes new window after print", () => {
			const testContent = "some plain old content";
			jest.useFakeTimers();
			method(testContent);
			jest.runAllTimers();
			expect(newWindowMock.close).toHaveBeenCalledAfter(newWindowMock.print);
			expect(newWindowMock.print).toHaveBeenCalled();
			expect(newWindowMock.close).toHaveBeenCalled();
		});
	});
});
