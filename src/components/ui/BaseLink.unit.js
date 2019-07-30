import BaseLink from "./BaseLink";

describe("@components/BaseLink", () => {
	it(...isValidComponent(BaseLink));
	it(
		...rendersDefaultSlotContent(BaseLink, {
			...createComponentMocks({ router: true }),
			propsData: {
				href: "https://schul-cloud.org",
			},
		})
	);
	it(
		...rendersDefaultSlotContent(BaseLink, {
			...createComponentMocks({ router: true }),
			propsData: {
				to: "/news",
			},
		})
	);
	it(
		...rendersDefaultSlotContent(BaseLink, {
			...createComponentMocks({ router: true }),
			propsData: {
				name: "news",
			},
		})
	);

	it("renders a-tag for external links", () => {
		const { element } = shallowMount(BaseLink, {
			propsData: {
				href: "https://schul-cloud.org",
			},
		});
		expect(element.outerHTML).toContain("https://schul-cloud.org");
		expect(element.tagName).toEqual("A");
	});

	it("renders NuxtLink-tag for internal :to links", () => {
		const { element } = shallowMount(BaseLink, {
			...createComponentMocks({ router: true }),
			propsData: {
				to: "/news",
			},
		});
		expect(element.getAttribute("to")).toEqual("/news");
		expect(element.tagName).not.toEqual("A");
	});

	it("renders NuxtLink-tag for internal links by name", () => {
		const { element } = shallowMount(BaseLink, {
			...createComponentMocks({ router: true }),
			propsData: {
				name: "news",
			},
		});
		expect(element.tagName).not.toEqual("A");
	});

	/*
	// disabled for legacy fallback
	it("log warning for internal href links", () => {
		let outputData = "";
		console.warn = jest.fn((inputs) => (outputData += inputs));

		shallowMount(BaseLink, {
			...createComponentMocks({ router: true }),
			propsData: {
				href: "/news",
			},
		});
		expect(outputData).toContain("Invalid href");
	});
	*/

	it("log warning for insecure external urls", () => {
		let outputData = "";
		console.warn = jest.fn((inputs) => (outputData += inputs));

		shallowMount(BaseLink, {
			...createComponentMocks({ router: true }),
			propsData: {
				href: "http://schul-cloud.org",
			},
		});
		expect(outputData).toContain("Insecure href");
	});

	it("log warning for invalid props", () => {
		let outputData = "";
		console.warn = jest.fn((inputs) => (outputData += inputs));

		shallowMount(BaseLink, {
			...createComponentMocks({ router: true }),
		});
		expect(outputData).toContain("Invalid props");
	});
});
