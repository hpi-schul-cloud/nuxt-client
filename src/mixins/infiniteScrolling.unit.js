import infiniteScrolling from "./infiniteScrolling";

const getInstance = () => {
	vi.spyOn(window, "scrollTo").mockImplementation();

	return mount(
		{
			template: "<div/>",
		},
		{
			mixins: [infiniteScrolling],
		}
	);
};
describe("@/mixins/infiniteScrolling", () => {
	it("can be used as a mixin", () => {
		expect(getInstance).not.toThrow();
	});
	it("$_backToTop scroll to the top", () => {
		const scrollToMock = vi.spyOn(window, "scrollTo");
		const wrapper = getInstance();
		wrapper.vm.$_backToTop();
		expect(scrollToMock.mock.calls.pop()[0]).toStrictEqual(
			expect.objectContaining({
				top: 0,
			})
		);
	});
	it.each([
		// [scrollY, viewportHeight, pageHeight, result]
		[0, 100, 200, false], // not scrolled on normal page
		[0, 500, 200, true], // page smaller than viewport
		[300, 300, 500, true], // scrolled to bottom
	])(
		"calculates bottom intersection correctly for scrollY %p, viewportHeight %p and pageHeight %p",
		(scrollY, clientHeight, scrollHeight, result) => {
			vi.spyOn(
				document.documentElement,
				"clientHeight",
				"get"
			).mockImplementation(() => clientHeight);
			vi.spyOn(
				document.documentElement,
				"scrollHeight",
				"get"
			).mockImplementation(() => scrollHeight);
			window.scrollY = scrollY;
			const wrapper = getInstance();
			expect(wrapper.vm.$_isBottomReached()).toBe(result);
		}
	);
	it("removes window event listeners on destroy", () => {
		vi.spyOn(window, "removeEventListener")
			.mockImplementation()
			.mockImplementation();
		const wrapper = getInstance();
		wrapper.unmount();
		expect(window.removeEventListener.mock.calls[0]).toContain("scroll");
	});
	it("updates data on scroll event", () => {
		vi.spyOn(
			document.documentElement,
			"clientHeight",
			"get"
		).mockImplementation(() => 500);
		vi.spyOn(
			document.documentElement,
			"scrollHeight",
			"get"
		).mockImplementation(() => 200);
		window.scrollY = scrollY;

		vi.spyOn(window, "addEventListener").mockImplementation((event, cb) =>
			cb()
		);
		const wrapper = getInstance();

		expect(wrapper.vm.bottom).toBe(true);
		expect(wrapper.vm.scrollY).toBe(300);
	});
});
