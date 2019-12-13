import NavigationBar from "./NavigationBar";
import BaseLink from "@components/base/BaseLink";

describe("@components/NavigationBar", () => {
	it(...isValidComponent(NavigationBar));

	it("links get rendered", () => {
		const wrapper = mount(NavigationBar, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				links: [
					{
						title: "Projekt",
						href: "/about",
					},
					{
						title: "Mitmachen",
						href: "/community",
					},
					{
						title: "Blog",
						href: "https://blog.schul-cloud.org/",
					},
				],
				img: "@assets/img/logo/logo-image-color.svg",
			},
		});
		expect(wrapper.props().links).toHaveLength(3);
	});

	it("links get rendered", () => {
		const wrapper = mount(NavigationBar, {
			...createComponentMocks({ i18n: true }),
			propsData: {
				links: [
					{
						title: "Projekt",
						href: "/about",
					},
					{
						title: "Mitmachen",
						href: "/community",
					},
					{
						title: "Blog",
						href: "https://blog.schul-cloud.org/",
					},
				],
				img: "@assets/img/logo/logo-image-color.svg",
			},
		});
		expect(wrapper.find(BaseLink).exists()).toBe(true);
		expect(wrapper.props().img).toBe("@assets/img/logo/logo-image-color.svg");
		expect(wrapper.find(".link-container").exists()).toBe(true);
	});

	it("computes right colWidth desktop, tablet", () => {
		global.location.pathname = "/mint-ec/willkommenspaket";
		const wrapper = mount(NavigationBar, {
			propsData: {
				links: [
					{
						title: "Projekt",
						href: "/about",
					},
					{
						title: "Mitmachen",
						href: "/community",
					},
					{
						title: "Erste Schritte",
						href: "/mint-ec/willkommenspaket",
					},
				],
				img: "@assets/img/logo/logo-image-color.svg",
			},
		});

		expect(wrapper.find(".active").exists()).toBe(true);
	});

	xit("setActive function sets active link accordingly", () => {});
});
