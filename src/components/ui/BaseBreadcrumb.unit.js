import BaseBreadcrumb from "./BaseBreadcrumb";

describe("@components/BaseBreadcrumb", () => {
	it(...isValidComponent(BaseBreadcrumb));

	it("renders BaseLink for Links", () => {
		const internalLink = { to: "/", text: "internal" };
		const externalLink = { href: "https://schul-cloud.org", text: "external" };
		const emptyLink = { to: "/", text: "any" };
		const links = [internalLink, externalLink, emptyLink];
		const { element } = mount(BaseBreadcrumb, {
			...createComponentMocks({ router: true }),
			propsData: {
				inputs: links,
			},
		});

		//: element.querySelector(`[span="${link.to}"]`);
		//expect(linkElement.textContent).toContain(link.text);
		//console.log(links, `links!!:D`);
		links.forEach((link, index) => {
			//console.log(link, `link to`);

			if (links.length - 1 !== index) {
				const linkElement = link.to
					? element.querySelector(`[to="${link.to}"]`)
					: element.querySelector(`[href="${link.href}"]`);
				expect(linkElement.textContent).toContain(link.text);
			}
			// } else {
			// 	const linkElement = link.to;

			// 	element.querySelector(`[span]`);
			// 	expect(linkElement.textContent).toContain(link.text);
			// }
		});
	});

	it("renders plain text", () => {
		const text = "plain text";
		const { element } = mount(BaseBreadcrumb, {
			...createComponentMocks({ router: true }),
			propsData: {
				inputs: [{ text }],
			},
		});
		expect(element.textContent).toContain(text);
	});
});
