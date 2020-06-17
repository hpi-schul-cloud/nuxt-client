import NavigationBar from "./NavigationBar";
import BaseLink from "@components/base/BaseLink";

describe("@components/legacy/NavigationBar", () => {
	it(...isValidComponent(NavigationBar));

	it("links get rendered", () => {
		const wrapper = mount(NavigationBar, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				links: [
					{
						title: "Über das Projekt",
						href: "/about",
					},
					{
						title: "Erste Schritte",
						href: "/mint-ec/willkommenspaket",
					},
					{
						title: "Blog",
						href: "https://blog.schul-cloud.org/",
					},
					{
						title: "FAQ",
						href: "https://blog.schul-cloud.org/faq",
					},
				],
				img: "@assets/img/logo/logo-image-color.svg",
			},
		});

		expect(wrapper.props().links).toHaveLength(4);
	});

	it("logo get rendered", () => {
		const wrapper = mount(NavigationBar, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				links: [
					{
						title: "Über das Projekt",
						href: "/about",
					},
					{
						title: "Erste Schritte",
						href: "/mint-ec/willkommenspaket",
					},
					{
						title: "Blog",
						href: "https://blog.schul-cloud.org/",
					},
					{
						title: "FAQ",
						href: "https://blog.schul-cloud.org/faq",
					},
				],
				img: "@assets/img/logo/logo-image-color.svg",
			},
		});

		expect(wrapper.findComponent(BaseLink).exists()).toBe(true);
		expect(wrapper.props().img).toBe("@assets/img/logo/logo-image-color.svg");
		expect(wrapper.find(".link-container").exists()).toBe(true);
		expect(wrapper.find(".buttons-container").exists()).toBe(true);
	});

	it("computes right colWidth desktop, tablet", () => {
		global.location.pathname = "/mint-ec/willkommenspaket";
		const wrapper = mount(NavigationBar, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				links: [
					{
						title: "Über das Projekt",
						href: "/about",
					},
					{
						title: "Erste Schritte",
						href: "/mint-ec/willkommenspaket",
					},
					{
						title: "Blog",
						href: "https://blog.schul-cloud.org/",
					},
					{
						title: "FAQ",
						href: "https://blog.schul-cloud.org/faq",
					},
				],
				img: "@assets/img/logo/logo-image-color.svg",
			},
		});

		expect(wrapper.find(".active").exists()).toBe(true);
	});
});
