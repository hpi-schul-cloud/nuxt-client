import BaseBreadcrumb from "./BaseBreadcrumb";

describe("@components/base/BaseBreadcrumb", () => {
	it(...isValidComponent(BaseBreadcrumb));

	it("renders BaseLink for Links", () => {
		const internalLink = { to: "/", text: "internal" };
		const externalLink = {
			href: "https://dbildungscloud.de",
			text: "external",
		};
		const textOnly = { text: "any" };
		const links = [internalLink, externalLink, textOnly];
		const { element } = mount(BaseBreadcrumb, {
			...createComponentMocks({ router: true }),
			propsData: {
				inputs: links,
			},
		});

		links.forEach((link, index) => {
			if (links.length - 1 !== index) {
				const linkElement = link.to
					? element.querySelector(`[to="${link.to}"]`)
					: element.querySelector(`[href="${link.href}"]`);
				expect(linkElement.textContent).toContain(link.text);
			}
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

	it("renders icon if defined", () => {
		const icon = { source: "fa", icon: "home" };
		const internalLink = { to: "/", text: "internal", icon };
		const textOnly = { text: "plain text" };
		const wrapper = mount(BaseBreadcrumb, {
			...createComponentMocks({ router: true }),
			propsData: {
				inputs: [internalLink, textOnly],
			},
		});
		expect(wrapper.find(".fa.fa-home").exists()).toBe(true);
	});

	it("renders no icon if not defined", () => {
		const internalLink = { to: "/", text: "internal" };
		const textOnly = { text: "plain text" };
		const wrapper = mount(BaseBreadcrumb, {
			...createComponentMocks({ router: true }),
			propsData: {
				inputs: [internalLink, textOnly],
			},
		});
		expect(wrapper.find(".fa").exists()).toBe(false);
	});

	it("last item is not clickable and contains right text ", () => {
		const internalLink = { to: "/", text: "internal" };
		const textOnly = { text: "plain text" };
		const emptyLink = { to: "/", text: "empty" };
		const wrapper = mount(BaseBreadcrumb, {
			...createComponentMocks({ router: true }),
			propsData: {
				inputs: [internalLink, textOnly, emptyLink],
			},
		});
		const span = wrapper.find(".breadcrumb > .link:last-of-type > span");
		expect(span.exists()).toBe(true);
		expect(span.text()).toBe(emptyLink.text);
	});
});
