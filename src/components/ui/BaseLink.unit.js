import BaseLink from "./BaseLink";

describe("@components/BaseLink", () => {
	it("exports a valid component", () => {
		expect(BaseLink).toBeAComponent();
	});

	it("renders its content", () => {
		const slotContent = "<p>Hello!</p>";
		const { element } = shallowMount(BaseLink, {
			propsData: {
				href: "https://schul-cloud.org",
			},
			slots: {
				default: slotContent,
			},
		});
		expect(element.innerHTML).toContain(slotContent);
	});

	it("renders a-tag for external links", () => {
		const { element } = shallowMount(BaseLink, {
			propsData: {
				href: "https://schul-cloud.org",
			},
		});
		expect(element.outerHTML).toContain("https://schul-cloud.org");
		expect(element.tagName).toEqual("A");
	});

	it("renders NuxtLink-tag for external links", () => {
		createComponentMocks("NuxtLink");
		const { element } = shallowMount(BaseLink, {
			...createComponentMocks({
				stubs: ["NuxtLink"],
			}),
			propsData: {
				to: "/news",
			},
		});
		expect(element.getAttribute("to")).toEqual("/news");
		expect(element.tagName).not.toEqual("A");
	});
});
