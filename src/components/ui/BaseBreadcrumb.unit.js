import BaseBreadcrumb from "./BaseBreadcrumb";

describe("@components/BaseBreadcrumb", () => {
	it(...isValidComponent(BaseBreadcrumb));

	it("renders BaseLink for Links", () => {
		const internalLink = { to: "/", text: "internal" };
		const externalLink = { href: "https://schul-cloud.org", text: "external" };
		const links = [internalLink, externalLink];
		const { element } = mount(BaseBreadcrumb, {
			...createComponentMocks({ router: true }),
			propsData: {
				inputs: links,
			},
		});

		links.forEach((link) => {
			const linkElement = link.to
				? element.querySelector(`[to="${link.to}"]`)
				: element.querySelector(`[href="${link.href}"]`);
			expect(element.textContent).toContain(link.text);
		});
	});

	it("renders plain text", () => {
		const text = "plain text";
		const { element } = mount(BaseBreadcrumb, {
			...createComponentMocks({ router: true }),
			propsData: {
				inputs: [text],
			},
		});
		expect(element.textContent).toContain(text);
	});
});
