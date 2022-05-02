import BaseLink from "./BaseLink";

describe("@components/base/BaseLink", () => {
	it(...isValidComponent(BaseLink));
	it(
		...rendersSlotContent(BaseLink, ["default"], {
			...createComponentMocks({ router: true }),
			propsData: {
				href: "https://dbildungscloud.de",
			},
		})
	);
	it(
		...rendersSlotContent(BaseLink, ["default"], {
			...createComponentMocks({ router: true }),
			propsData: {
				to: "/news",
			},
		})
	);
	it(
		...rendersSlotContent(BaseLink, ["default"], {
			...createComponentMocks({ router: true }),
			propsData: {
				name: "news",
			},
		})
	);

	it("renders a-tag for external links", () => {
		const { element } = shallowMount(BaseLink, {
			propsData: {
				href: "https://dbildungscloud.de",
			},
		});
		expect(element.outerHTML).toContain("https://dbildungscloud.de");
		expect(element.tagName).toStrictEqual("A");
	});

	it("renders NuxtLink-tag for internal :to links", () => {
		const { element } = shallowMount(BaseLink, {
			...createComponentMocks({ router: true }),
			propsData: {
				to: "/news",
			},
		});
		expect(element.getAttribute("to")).toStrictEqual("/news");
		expect(element.tagName).not.toStrictEqual("A");
	});

	it("renders NuxtLink-tag for internal links by name", () => {
		const { element } = shallowMount(BaseLink, {
			...createComponentMocks({ router: true }),
			propsData: {
				name: "news",
			},
		});
		expect(element.tagName).not.toStrictEqual("A");
	});

	// disabled for legacy fallback
	it.skip("log warning for internal href links", () => {
		const consoleWarn = jest.spyOn(console, "warn").mockImplementation();

		shallowMount(BaseLink, {
			...createComponentMocks({ router: true }),
			propsData: {
				href: "/news",
			},
		});
		expect(consoleWarn).toHaveBeenCalledWith(
			expect.stringContaining("Invalid href")
		);
	});

	it("log warning for insecure external urls", () => {
		// use .mockImplementation() to prevent output to console
		const consoleWarn = jest.spyOn(console, "warn").mockImplementation();
		shallowMount(BaseLink, {
			...createComponentMocks({ router: true }),
			propsData: {
				href: "http://dbildungscloud.de",
			},
		});
		expect(consoleWarn).toHaveBeenCalledWith(
			expect.stringContaining("Insecure href")
		);
	});

	it("log warning for invalid props", () => {
		// use .mockImplementation() to prevent output to console
		const consoleWarn = jest.spyOn(console, "warn").mockImplementation();

		shallowMount(BaseLink, {
			...createComponentMocks({ router: true }),
		});
		expect(consoleWarn).toHaveBeenCalledWith(
			expect.stringContaining("Invalid props")
		);
	});
});
